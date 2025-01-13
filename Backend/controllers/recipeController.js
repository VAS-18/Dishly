import { error } from "console";
import reciSchema from "../models/recipeModel";

import { recipeSchema } from "../utils/validation";
import { get } from "http";

//create recipe
export const createRecipe = async (req, res) => {
  try {
    const validateBody = recipeSchema.parse(req.body);

    const newRecipe = new reciSchema({
      ...validateBody,
      author: req.userId,
    });

    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({
      error: error.error,
      message: error.message,
    });
  }
};

//get recipe
export const getRecipe = async (req, res) => {
  try {
    const recipes = await reciSchema.find().populate("author", "username");
    res.json(recipes);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const getRecipe = await reciSchema
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
    const validateBody = reciSchema.parse(req.body);
    const findRecipe = await reciSchema.findOneAndUpdate(
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
    const recipe = await reciSchema.findByIdAndDelete({
      _id: req.params.id,
      author: req.userId,
    });

    if (!recipe) {
      return res.status(404).json({
        error: "Recipe Not Found",
      });
    }
    res.json({ message: "recipe deleted successfully" });
  } catch (error) {}
};
