import assert from 'node:assert';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Team } from '../src/models/Team.js';
import { Fixture } from '../src/models/Fixture.js';
import app from '../src/server.js';

dotenv.config();

const DB_URI = process.env.TEST_MONGODB_URI || 'mongodb://127.0.0.1:27017/nexus_tournament_test';
const PORT = 5098; // isolated port for e2e flow test

console.log('--- STARTING SECTION 22 END-TO-END FLOW VERIFICATION ---');

const runE2E = async () => {
  try {
    // 1. Start MongoDB connection
    await mongoose.connect(DB_URI);
    console.log('Step 1: MongoDB connection established.');

    // Reset database to ensure clean initial state
    await Team.deleteMany({});
    await Fixture.deleteMany({});
    console.log('Database verified empty.');

    // 2. Start backend
    const server = app.listen(PORT);
    console.log(`Step 2: Backend server listening on port ${PORT}.`);

    const API_BASE = `http://localhost:${PORT}/api`;

    // 4. Open website / health check
    const healthRes = await fetch(`${API_BASE}/health`);
    const healthJson = await healthRes.json();
    assert.strictEqual(healthJson.status, 'ok');
    console.log('Step 3 & 4: API health checked - status OK.');

    // 5. Navigate to Tournament - check initial teams & fixtures are 0
    const getTeamsInit = await fetch(`${API_BASE}/teams`);
    const teamsInitJson = await getTeamsInit.json();
    assert.strictEqual(teamsInitJson.data.length, 0);

    const getFixturesInit = await fetch(`${API_BASE}/fixtures`);
    const fixturesInitJson = await getFixturesInit.json();
    assert.strictEqual(fixturesInitJson.data.length, 0);
    console.log('Step 5: Tournament page loads 0 teams, 0 fixtures (pristine empty state).');

    // 6 - 10. Create 5 teams with 5 players each
    const squadRosters = [
      { name: 'SENTINELS', players: ['TenZ', 'zekken', 'johnqt', 'Sacy', 'Zellsis'] },
      { name: 'FNATIC', players: ['Boaster', 'Derke', 'Alfajer', 'Chronicle', 'Leo'] },
      { name: 'PAPER REX', players: ['f0rsakeN', 'mindfreak', 'd4v41', 'something', 'Jinggg'] },
      { name: 'LOUD', players: ['Saadhak', 'Less', 'cauanzin', 'tuyz', 'qck'] },
      { name: 'DRX', players: ['stax', 'BuZz', 'MaKo', 'Flashback', 'Foxy9'] },
    ];

    const createdSquads = [];

    for (let i = 0; i < squadRosters.length; i++) {
      const roster = squadRosters[i];
      const res = await fetch(`${API_BASE}/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roster),
      });
      const data = await res.json();
      assert.strictEqual(res.status, 201, `Failed creating team ${roster.name}: ${data.message}`);
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.data.name, roster.name);
      assert.strictEqual(data.data.players.length, 5);
      createdSquads.push(data.data);
      console.log(`Step ${6 + i}: Created Team ${i + 1} (${roster.name}) with 5 players.`);
    }

    // 11. Verify 5/5 teams
    const verifyTeamsRes = await fetch(`${API_BASE}/teams`);
    const verifyTeamsJson = await verifyTeamsRes.json();
    assert.strictEqual(verifyTeamsJson.data.length, 5, 'Should have exactly 5 teams');
    console.log('Step 11: Verified 5 / 5 teams registered.');

    // 12. Verify 25/25 players
    let totalPlayers = 0;
    verifyTeamsJson.data.forEach((t) => (totalPlayers += t.players.length));
    assert.strictEqual(totalPlayers, 25, 'Should have exactly 25 players');
    console.log('Step 12: Verified 25 / 25 players registered.');

    // 13. Click Generate Fixtures
    const genRes = await fetch(`${API_BASE}/fixtures/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const genJson = await genRes.json();
    assert.strictEqual(genRes.status, 201);
    assert.strictEqual(genJson.success, true);
    console.log('Step 13: Generate Fixtures triggered.');

    // 14. Verify exactly 10 fixtures
    assert.strictEqual(genJson.data.length, 10, 'Should have exactly 10 matches');
    console.log('Step 14: Verified exactly 10 fixtures generated.');

    // 15. Verify every team plays every other team once
    const teamMatchCounts = {};
    createdSquads.forEach((s) => (teamMatchCounts[s.id || s._id] = 0));

    const clashPairs = new Set();
    genJson.data.forEach((f) => {
      assert.strictEqual(f.status, 'UPCOMING');
      const idA = f.teamA.id || f.teamA._id;
      const idB = f.teamB.id || f.teamB._id;
      assert.notStrictEqual(idA, idB, 'Team cannot play against itself');
      teamMatchCounts[idA]++;
      teamMatchCounts[idB]++;

      const pairKey = [idA, idB].sort().join('::');
      assert(!clashPairs.has(pairKey), `Duplicate clash found: ${pairKey}`);
      clashPairs.add(pairKey);
    });

    assert.strictEqual(clashPairs.size, 10, 'Must have 10 unique pair matchups');
    Object.values(teamMatchCounts).forEach((count) => {
      assert.strictEqual(count, 4, 'Every team must play exactly 4 matches');
    });
    console.log('Step 15: Verified every team plays every other team once (4 matches each).');

    // 16. Refresh browser (re-query GET /teams and GET /fixtures)
    const refreshTeams = await fetch(`${API_BASE}/teams`);
    const refreshTeamsJson = await refreshTeams.json();

    const refreshFixtures = await fetch(`${API_BASE}/fixtures`);
    const refreshFixturesJson = await refreshFixtures.json();

    // 17. Verify teams still exist
    assert.strictEqual(refreshTeamsJson.data.length, 5);
    console.log('Step 16 & 17: Browser refresh simulated - all 5 teams still exist in MongoDB.');

    // 18. Verify fixtures still exist
    assert.strictEqual(refreshFixturesJson.data.length, 10);
    console.log('Step 18: Browser refresh simulated - all 10 fixtures still exist in MongoDB.');

    // 19 & 20. Try creating Team 6, verify backend rejects Team 6
    const sixthRes = await fetch(`${API_BASE}/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'CLOUD9',
        players: ['vanity', 'Xeppaa', 'OXY', 'runi', 'Moose'],
      }),
    });
    const sixthJson = await sixthRes.json();
    assert.strictEqual(sixthRes.status, 400);
    assert.strictEqual(sixthJson.success, false);
    assert.strictEqual(sixthJson.message, 'Tournament already has 5 registered teams.');
    console.log('Step 19 & 20: Team 6 creation attempted - properly rejected with 400 error.');

    // 21 & 22. Try generating fixtures again, verify duplicate fixtures are NOT created
    const dupGenRes = await fetch(`${API_BASE}/fixtures/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const dupGenJson = await dupGenRes.json();
    assert.strictEqual(dupGenRes.status, 200);
    assert.strictEqual(dupGenJson.success, true);
    assert.strictEqual(dupGenJson.data.length, 10);
    assert(dupGenJson.message.includes('Fixtures already exist'));

    const countInDB = await Fixture.countDocuments();
    assert.strictEqual(countInDB, 10, 'Database fixture count must remain exactly 10');
    console.log('Step 21 & 22: Duplicate fixture generation prevented, exact 10 matches preserved.');

    // Cleanup test data from DB and close server
    await Team.deleteMany({});
    await Fixture.deleteMany({});
    server.close();
    await mongoose.disconnect();

    console.log('\n>>> COMPLETE SECTION 22 FLOW VERIFIED 100% SUCCESSFULLY! <<<');
    process.exit(0);
  } catch (err) {
    console.error('E2E Flow verification failed:', err);
    process.exit(1);
  }
};

runE2E();
