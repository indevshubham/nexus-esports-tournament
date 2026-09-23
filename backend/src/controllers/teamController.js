import { Team } from '../models/Team.js';
import { Fixture } from '../models/Fixture.js';

export const teamController = {
  /**
   * GET /api/teams
   * Fetch all registered teams (up to 5)
   */
  getTeams: async (req, res, next) => {
    try {
      const teams = await Team.find().sort({ createdAt: 1 });
      res.status(200).json({
        success: true,
        count: teams.length,
        data: teams,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/teams/:id
   * Fetch a single team by ID
   */
  getTeamById: async (req, res, next) => {
    try {
      const team = await Team.findById(req.params.id);
      if (!team) {
        return res.status(404).json({
          success: false,
          message: 'Team not found',
        });
      }
      res.status(200).json({
        success: true,
        data: team,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/teams
   * Create a new squad (hard limit of 5 teams)
   */
  createTeam: async (req, res, next) => {
    try {
      const { name, players } = req.body;

      // 1. Hard backend limit check
      const currentTeamCount = await Team.countDocuments();
      if (currentTeamCount >= 5) {
        return res.status(400).json({
          success: false,
          message: 'Tournament already has 5 registered teams.',
        });
      }

      // 2. Name validation
      if (!name || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Team name is required.',
        });
      }

      const trimmedName = name.trim();

      // 3. Unique name check (case-insensitive)
      const existingTeam = await Team.findOne({
        name: { $regex: new RegExp(`^${trimmedName}$`, 'i') },
      });
      if (existingTeam) {
        return res.status(400).json({
          success: false,
          message: 'A squad with this name already exists.',
        });
      }

      // 4. Players validation
      if (!Array.isArray(players) || players.length !== 5) {
        return res.status(400).json({
          success: false,
          message: 'Exactly 5 players are required to register a squad.',
        });
      }

      const formattedPlayers = [];
      const seenNames = new Set();

      for (let i = 0; i < players.length; i++) {
        const rawPlayer = players[i];
        const pName = typeof rawPlayer === 'object' && rawPlayer !== null ? rawPlayer.name : rawPlayer;
        const cleanName = (pName || '').trim();

        if (!cleanName) {
          return res.status(400).json({
            success: false,
            message: `Player ${i + 1} name cannot be empty.`,
          });
        }

        const lowerName = cleanName.toLowerCase();
        if (seenNames.has(lowerName)) {
          return res.status(400).json({
            success: false,
            message: `Duplicate player name "${cleanName}" in the same squad.`,
          });
        }
        seenNames.add(lowerName);
        formattedPlayers.push({ name: cleanName });
      }

      // 5. Create team document
      const team = await Team.create({
        name: trimmedName,
        players: formattedPlayers,
      });

      // 6. Invalidate existing fixtures if roster changed
      await Fixture.deleteMany({});

      res.status(201).json({
        success: true,
        message: 'Team created successfully',
        data: team,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /api/teams/:id
   * Delete team by ID (and invalidate fixtures)
   */
  deleteTeam: async (req, res, next) => {
    try {
      const team = await Team.findByIdAndDelete(req.params.id);
      if (!team) {
        return res.status(404).json({
          success: false,
          message: 'Team not found',
        });
      }

      // Invalidate fixtures since roster modified
      await Fixture.deleteMany({});

      res.status(200).json({
        success: true,
        message: 'Team deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/teams/reset
   * Reset all teams and fixtures in tournament
   */
  resetTournament: async (req, res, next) => {
    try {
      await Team.deleteMany({});
      await Fixture.deleteMany({});

      res.status(200).json({
        success: true,
        message: 'Tournament reset successfully',
      });
    } catch (error) {
      next(error);
    }
  },
};
