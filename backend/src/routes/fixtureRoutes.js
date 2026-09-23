import express from 'express';
import { fixtureController } from '../controllers/fixtureController.js';

const router = express.Router();

router.route('/')
  .get(fixtureController.getFixtures);

router.post('/generate', fixtureController.generateFixtures);

router.delete('/reset', fixtureController.resetFixtures);

export default router;
