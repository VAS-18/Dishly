import { error } from "console";
import Recipe from "../models/recipeModel.js";
import User from "../models/userModel.js";

import { recipeSchema } from "../utils/validation.js";

//create recipe
export const createRecipe = async (req, res) => {
  try {
    const validateBody = recipeSchema.parse(req.body);

    const newRecipe = new Recipe({
      ...validateBody,
      author: req.user._id,
    });

    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({
      error: "Controller err",
      message: error.message,
    });
  }
};

//get recipe
export const getRecipe = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("author", "username");
    res.json(recipes);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const getRecipe = await Recipe
      .findById(req.params.id)
      .populate("author", "username");
    if (!recipe) {
      return res.status(404).json({
        error: "Recipe Not Found",
      });
    }

    res.json(getRecipe);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const validateBody = Recipe.parse(req.body);
    const findRecipe = await Recipe.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.userId,
      },
      validateBody,
      { new: true }
    );

    if (!findRecipe) {
        return res.status(404).json({ error: 'Recipe not found or unauthorized' });
      }
      res.json(findRecipe);


  } catch (error) {
    res.status(500).json({
      error: error.error,
      message: error.message,
    });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete({
      _id: req.params.id,
      author: req.userId,
    });

    if (!recipe) {
      return res.status(404).json({
        error: "Recipe Not Found",
      });
    }
    res.json({ message: "recipe deleted successfully" });
  } catch (error) {
    res.status(400).json({
      error: error.error,
      message: error.message,
    })
  }
};
