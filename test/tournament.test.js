import assert from 'node:assert';
import { generateRoundRobinFixtures } from '../src/utils/fixtureGenerator.js';

console.log('--- RUNNING NEXUS TOURNAMENT LOGIC TESTS ---');

// Test 1: Exactly 5 teams produce 10 matches
const mockTeams = [
  { id: 'team-1', name: 'SENTINELS' },
  { id: 'team-2', name: 'FNATIC' },
  { id: 'team-3', name: 'PAPER REX' },
  { id: 'team-4', name: 'LOUD' },
  { id: 'team-5', name: 'DRX' },
];

const fixtures = generateRoundRobinFixtures(mockTeams);

assert.strictEqual(fixtures.length, 10, 'Must generate exactly 10 fixtures for 5 teams');
console.log('✓ Test 1 Passed: Exactly 10 round-robin fixtures generated.');

// Test 2: Every fixture has valid match number 1 to 10
fixtures.forEach((f, idx) => {
  assert.strictEqual(f.matchNumber, idx + 1, `Match number should be ${idx + 1}`);
  assert.strictEqual(f.status, 'UPCOMING', 'Match status should default to UPCOMING');
  assert.strictEqual(f.roundName, 'ROUND ROBIN', 'Round name should be ROUND ROBIN');
  assert.notStrictEqual(f.teamAId, f.teamBId, 'A team cannot play itself');
});
console.log('✓ Test 2 Passed: Fixture properties, match numbers and status verified.');

// Test 3: All 10 pairs are unique
const pairSet = new Set();
fixtures.forEach((f) => {
  const pairKey = [f.teamAId, f.teamBId].sort().join('::');
  assert(!pairSet.has(pairKey), `Duplicate matchup found: ${pairKey}`);
  pairSet.add(pairKey);
});
assert.strictEqual(pairSet.size, 10, 'Must have 10 unique matchups');
console.log('✓ Test 3 Passed: All 10 matches are unique round-robin pairs.');

// Test 4: Each team plays exactly 4 matches (every other team once)
const matchCounts = {};
mockTeams.forEach((t) => (matchCounts[t.id] = 0));
fixtures.forEach((f) => {
  matchCounts[f.teamAId]++;
  matchCounts[f.teamBId]++;
});
Object.entries(matchCounts).forEach(([teamId, count]) => {
  assert.strictEqual(count, 4, `Team ${teamId} should play exactly 4 matches`);
});
console.log('✓ Test 4 Passed: Each team plays exactly 4 matches against all opponents.');

// Test 5: Error handling when teams < 5 or > 5
assert.throws(() => {
  generateRoundRobinFixtures(mockTeams.slice(0, 4));
}, /Exactly 5 teams are required/);

assert.throws(() => {
  generateRoundRobinFixtures([...mockTeams, { id: 'team-6', name: 'EXTRA' }]);
}, /Exactly 5 teams are required/);

assert.throws(() => {
  generateRoundRobinFixtures(null);
}, /Exactly 5 teams are required/);

console.log('✓ Test 5 Passed: Strict team count validation enforced.');

console.log('\n>>> ALL 5 TESTS PASSED SUCCESSFULLY! <<<');
