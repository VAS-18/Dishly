import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  updateRecipe,
  getRecipeById,
} from "../controllers/recipeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.route("/").get(getRecipe);
router.route("/:id").get(getRecipeById);

//Protected Routes which requires authentication
router                                          //Creation Route
  .route("/") 
  .post(
    authMiddleware,
    upload.fields([
      {
        name: "images",
        maxCount: 5  // Allow up to 5 images
      }
    ]), 
    createRecipe
  );

router                                          //Update Route
  .route("/:id")        
  .put(
    authMiddleware,
    upload.fields([
      {
        name: "images",
        maxCount: 5  // Allow up to 5 images for updates too
      }
    ]),
    updateRecipe
  );

router.route("/:id").delete(authMiddleware, deleteRecipe);

export default router;
