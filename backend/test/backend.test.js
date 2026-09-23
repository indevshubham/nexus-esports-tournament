import assert from 'node:assert';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Team } from '../src/models/Team.js';
import { Fixture } from '../src/models/Fixture.js';
import { fixtureService } from '../src/services/fixtureService.js';
import app from '../src/server.js';

dotenv.config();

const TEST_DB_URI = process.env.TEST_MONGODB_URI || 'mongodb://127.0.0.1:27017/nexus_tournament_test';

console.log('--- STARTING BACKEND INTEGRATION & LOGIC TESTS ---');

const runTests = async () => {
  try {
    // 1. Connect to test database
    await mongoose.connect(TEST_DB_URI);
    console.log(`Connected to test database: ${TEST_DB_URI}`);

    // Clear test collections
    await Team.deleteMany({});
    await Fixture.deleteMany({});

    // Start server on a test port
    const server = app.listen(5099);
    const baseUrl = 'http://localhost:5099/api';

    // Test 1: Empty state initially
    const initTeamsRes = await fetch(`${baseUrl}/teams`);
    const initTeamsJson = await initTeamsRes.json();
    assert.strictEqual(initTeamsJson.success, true);
    assert.strictEqual(initTeamsJson.data.length, 0, 'Initial team count should be 0');
    console.log('✓ Test 1 Passed: Initial database is empty with 0 teams.');

    // Test 2: Validation - reject team with fewer than 5 players
    const invalidPlayersRes = await fetch(`${baseUrl}/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'INVALID SQUAD',
        players: ['Player 1', 'Player 2', 'Player 3'],
      }),
    });
    const invalidPlayersJson = await invalidPlayersRes.json();
    assert.strictEqual(invalidPlayersRes.status, 400);
    assert.strictEqual(invalidPlayersJson.success, false);
    console.log('✓ Test 2 Passed: Rejected team with fewer than 5 players.');

    // Test 3: Validation - reject team with duplicate players within squad
    const dupPlayersRes = await fetch(`${baseUrl}/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'DUP SQUAD',
        players: ['Ace', 'Ace', 'Joker', 'King', 'Queen'],
      }),
    });
    const dupPlayersJson = await dupPlayersRes.json();
    assert.strictEqual(dupPlayersRes.status, 400);
    assert.strictEqual(dupPlayersJson.success, false);
    console.log('✓ Test 3 Passed: Rejected squad with duplicate player names.');

    // Test 4: Register 5 valid teams
    const teamNames = ['SENTINELS', 'FNATIC', 'PAPER REX', 'LOUD', 'DRX'];
    for (let i = 0; i < 5; i++) {
      const createRes = await fetch(`${baseUrl}/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: teamNames[i],
          players: [
            `P${i + 1}-Alpha`,
            `P${i + 1}-Bravo`,
            `P${i + 1}-Charlie`,
            `P${i + 1}-Delta`,
            `P${i + 1}-Echo`,
          ],
        }),
      });
      const createJson = await createRes.json();
      assert.strictEqual(createRes.status, 201);
      assert.strictEqual(createJson.success, true);
      assert.strictEqual(createJson.data.name, teamNames[i]);
      assert.strictEqual(createJson.data.players.length, 5);
    }
    console.log('✓ Test 4 Passed: Successfully registered exactly 5 teams with 5 players each.');

    // Test 5: Hard limit - reject 6th team
    const sixthTeamRes = await fetch(`${baseUrl}/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'SIXTH SQUAD',
        players: ['O1', 'O2', 'O3', 'O4', 'O5'],
      }),
    });
    const sixthTeamJson = await sixthTeamRes.json();
    assert.strictEqual(sixthTeamRes.status, 400);
    assert.strictEqual(sixthTeamJson.success, false);
    assert.strictEqual(sixthTeamJson.message, 'Tournament already has 5 registered teams.');
    console.log('✓ Test 5 Passed: Hard backend limit of 5 teams enforced (6th team rejected).');

    // Test 6: Generate fixtures produces exactly 10 round-robin matches
    const genRes = await fetch(`${baseUrl}/fixtures/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const genJson = await genRes.json();
    assert.strictEqual(genRes.status, 201);
    assert.strictEqual(genJson.success, true);
    assert.strictEqual(genJson.data.length, 10, 'Must generate exactly 10 matches');

    // Verify all 10 pairs are unique and teams have populated objects
    const pairs = new Set();
    genJson.data.forEach((f, idx) => {
      assert.strictEqual(f.matchNumber, idx + 1);
      assert.strictEqual(f.status, 'UPCOMING');
      assert(f.teamA._id && f.teamB._id);
      assert.notStrictEqual(f.teamA._id, f.teamB._id);
      const pair = [f.teamA._id, f.teamB._id].sort().join('::');
      assert(!pairs.has(pair), `Duplicate pair ${pair}`);
      pairs.add(pair);
    });
    assert.strictEqual(pairs.size, 10);
    console.log('✓ Test 6 Passed: Generated 10 unique round-robin fixtures referencing teams.');

    // Test 7: Prevent duplicate fixture generation
    const genAgainRes = await fetch(`${baseUrl}/fixtures/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const genAgainJson = await genAgainRes.json();
    assert.strictEqual(genAgainRes.status, 200);
    assert.strictEqual(genAgainJson.success, true);
    assert.strictEqual(genAgainJson.data.length, 10, 'Should not create duplicate fixtures');
    const totalFixtureCount = await Fixture.countDocuments();
    assert.strictEqual(totalFixtureCount, 10, 'Database should still have exactly 10 fixtures');
    console.log('✓ Test 7 Passed: Duplicate fixture generation prevented, returns existing schedule.');

    // Test 8: Tournament reset endpoint clears all teams and fixtures
    const resetRes = await fetch(`${baseUrl}/teams/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const resetJson = await resetRes.json();
    assert.strictEqual(resetRes.status, 200);
    assert.strictEqual(resetJson.success, true);

    const postResetTeams = await Team.countDocuments();
    const postResetFixtures = await Fixture.countDocuments();
    assert.strictEqual(postResetTeams, 0);
    assert.strictEqual(postResetFixtures, 0);
    console.log('✓ Test 8 Passed: Reset clears all teams and fixtures from MongoDB.');

    // Cleanup & Close
    await Team.deleteMany({});
    await Fixture.deleteMany({});
    server.close();
    await mongoose.disconnect();
    console.log('\n>>> ALL 8 BACKEND TESTS PASSED SUCCESSFULLY! <<<');
    process.exit(0);
  } catch (error) {
    console.error('Test Failed:', error);
    process.exit(1);
  }
};

runTests();
