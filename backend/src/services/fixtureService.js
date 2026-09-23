import { Team } from '../models/Team.js';
import { Fixture } from '../models/Fixture.js';

export const fixtureService = {
  /**
   * Generates round-robin fixtures for 5 teams (producing 10 matches).
   * Prevents duplicates and verifies 5 teams are registered.
   */
  generateFixtures: async () => {
    // 1. Check if fixtures already exist; if so, return existing fixtures rather than duplicating
    const existingFixtures = await Fixture.find()
      .populate('teamA')
      .populate('teamB')
      .sort({ matchNumber: 1 });

    if (existingFixtures.length === 10) {
      return {
        alreadyExists: true,
        fixtures: existingFixtures,
      };
    }

    // 2. Fetch all registered teams ordered by creation time
    const teams = await Team.find().sort({ createdAt: 1 });

    if (teams.length !== 5) {
      const error = new Error('Register all 5 teams before generating fixtures.');
      error.statusCode = 400;
      throw error;
    }

    // 3. Clear any partial/stale fixtures if count was not 10
    if (existingFixtures.length > 0) {
      await Fixture.deleteMany({});
    }

    // 4. Algorithmic Round-Robin Generator (5 teams => 10 matches)
    // Team 1 vs Team 2
    // Team 1 vs Team 3
    // Team 1 vs Team 4
    // Team 1 vs Team 5
    // Team 2 vs Team 3
    // Team 2 vs Team 4
    // Team 2 vs Team 5
    // Team 3 vs Team 4
    // Team 3 vs Team 5
    // Team 4 vs Team 5
    const fixtureDocs = [];
    let matchNumber = 1;

    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        fixtureDocs.push({
          matchNumber,
          teamA: teams[i]._id,
          teamB: teams[j]._id,
          status: 'UPCOMING',
          roundName: 'ROUND ROBIN',
        });
        matchNumber++;
      }
    }

    const created = await Fixture.insertMany(fixtureDocs);

    // Populate team details for return payload
    const populatedFixtures = await Fixture.find({ _id: { $in: created.map((f) => f._id) } })
      .populate('teamA')
      .populate('teamB')
      .sort({ matchNumber: 1 });

    return {
      alreadyExists: false,
      fixtures: populatedFixtures,
    };
  },

  /**
   * Retrieves all tournament fixtures populated with team details
   */
  getFixtures: async () => {
    return await Fixture.find()
      .populate('teamA')
      .populate('teamB')
      .sort({ matchNumber: 1 });
  },

  /**
   * Clears all fixtures
   */
  resetFixtures: async () => {
    await Fixture.deleteMany({});
    return true;
  },
};
