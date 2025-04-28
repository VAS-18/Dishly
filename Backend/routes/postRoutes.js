import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
} from "../controllers/postController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post(
  "/",
  authMiddleware,
  upload.fields([{ name: "image", maxCount: 3 }]),
  createPost
);
router.delete("/:id", authMiddleware, deletePost);

export default router;
