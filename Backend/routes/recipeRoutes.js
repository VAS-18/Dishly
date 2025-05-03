import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  updateRecipe,
  getRecipeById,
} from "../controllers/recipeController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
// import { recipeUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.route("/").get(getRecipe);
router.route("/:id").get(getRecipeById);

//Protected Routes which requires authentication
router
  .route("/")
  .post(authMiddleware,createRecipe);
router
  .route("/:id")
  .put(authMiddleware,  updateRecipe);

router.route("/:id").delete(authMiddleware, deleteRecipe);

export default router;
