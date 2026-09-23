import express from 'express';
import { teamController } from '../controllers/teamController.js';

const router = express.Router();

router.route('/')
  .get(teamController.getTeams)
  .post(teamController.createTeam);

router.post('/reset', teamController.resetTournament);

router.route('/:id')
  .get(teamController.getTeamById)
  .delete(teamController.deleteTeam);

export default router;
