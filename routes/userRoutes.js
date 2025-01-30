import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getFeed } from '../controllers/feedController.js';

const router = express.Router();


router.route("/feed").get(authMiddleware, getFeed);

export default router;