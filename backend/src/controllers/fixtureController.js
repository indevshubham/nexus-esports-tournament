import { fixtureService } from '../services/fixtureService.js';

export const fixtureController = {
  /**
   * GET /api/fixtures
   * Fetch all fixtures
   */
  getFixtures: async (req, res, next) => {
    try {
      const fixtures = await fixtureService.getFixtures();
      res.status(200).json({
        success: true,
        count: fixtures.length,
        data: fixtures,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/fixtures/generate
   * Generates round-robin fixtures if 5 teams exist
   */
  generateFixtures: async (req, res, next) => {
    try {
      const result = await fixtureService.generateFixtures();
      
      const message = result.alreadyExists
        ? 'Fixtures already exist. Returning current schedule.'
        : 'Fixtures generated successfully';

      res.status(result.alreadyExists ? 200 : 201).json({
        success: true,
        message,
        data: result.fixtures,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /api/fixtures/reset
   * Clears all fixtures
   */
  resetFixtures: async (req, res, next) => {
    try {
      await fixtureService.resetFixtures();
      res.status(200).json({
        success: true,
        message: 'Fixtures reset successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
