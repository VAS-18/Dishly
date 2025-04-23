import express from "express";
import {
  followUser,
  unfollowUser,
  updateProfile,
  searchUsers,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Follow a user
router.post("/:id/follow", authMiddleware, followUser);

// Unfollow a user
router.post("/:id/unfollow", authMiddleware, unfollowUser);

// Update profile
router.put("/profile", authMiddleware, updateProfile);

// Search users
router.get("/search", searchUsers);

export default router;