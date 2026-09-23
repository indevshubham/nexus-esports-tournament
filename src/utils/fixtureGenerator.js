/**
 * Round Robin Fixture Generator for NEXUS Esports Championship
 * Computes all unique pair combinations for the registered teams (n*(n-1)/2).
 * For 5 teams: exactly 10 unique round-robin fixtures.
 */
export function generateRoundRobinFixtures(teams) {
  if (!Array.isArray(teams) || teams.length !== 5) {
    throw new Error('Exactly 5 teams are required to generate tournament fixtures.');
  }

  const fixtures = [];
  let matchNumber = 1;

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const matchId = `match-${String(matchNumber).padStart(2, '0')}`;
      fixtures.push({
        id: matchId,
        matchNumber,
        teamAId: teams[i].id,
        teamBId: teams[j].id,
        teamA: {
          id: teams[i].id,
          name: teams[i].name,
          index: i + 1,
        },
        teamB: {
          id: teams[j].id,
          name: teams[j].name,
          index: j + 1,
        },
        roundName: 'ROUND ROBIN',
        status: 'UPCOMING',
      });
      matchNumber++;
    }
  }

  return fixtures;
}
