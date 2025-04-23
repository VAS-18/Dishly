import express from "express";
import { likePost, unlikePost } from "../controllers/likeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/like", authMiddleware, likePost);
router.post("/unlike", authMiddleware, unlikePost);

export default router;