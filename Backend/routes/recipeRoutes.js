import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  updateRecipe,
  getRecipeById,
} from "../controllers/recipeController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { recipeUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.route("/").get(getRecipe);
router.route("/:id").get(getRecipeById);

//Protected Routes which requires authentication
router
  .route("/")
  .post(authMiddleware, recipeUpload.array("recipe-images", 5), createRecipe);
router
  .route("/:id")
  .put(authMiddleware, recipeUpload.array("recipe-images", 5), updateRecipe);

router.route("/:id").delete(authMiddleware, deleteRecipe);

export default router;
