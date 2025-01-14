import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  updateRecipe,
  getRecipeById,
} from "../controllers/recipeController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getRecipe);
router.get("/:id", getRecipeById);

//Protected Routes which requires authentication
router.route("/").post(authMiddleware, createRecipe);
router.put("/:id", authMiddleware, updateRecipe);
router.delete("/:id", authMiddleware, deleteRecipe);

export default router;
