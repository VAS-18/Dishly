import { uploadOnCloudinary } from "../config/cloudinary.js";
import Recipe from "../models/recipeModel.js";

import { recipeSchema } from "../utils/validation.js";

//create recipe
export const createRecipe = async (req, res) => {
  try {
    console.log("Received body:", req.body);

    const ingredients = req.body.ingredients.map(ing => ({
      name: ing.name,
      quantity: parseFloat(ing.quantity),
      unit: ing.unit || 'units' 
    }));

    const instructions = req.body.instructions;

    const tags = Array.isArray(req.body.tags) ? req.body.tags : [];

    const recipeData = {
      title: req.body.title,
      description: req.body.description,
      ingredients: ingredients,
      instructions: instructions,
      cookingTime: parseInt(req.body.cookingTime),
      prepTime: parseInt(req.body.prepTime || 0),
      servings: parseInt(req.body.servings || 1),
      cuisine: req.body.cuisine,
      difficulty: req.body.difficulty,
      tags: tags.length > 0 ? tags : []
    };

    console.log("Recipe data before validation:", recipeData);


    const validateBody = recipeSchema.parse(recipeData);
    
    if (!req.files?.images || req.files.images.length === 0) {
      return res.status(400).json({
        error: "Please upload at least one image"
      });
    }

    // Upload all images to Cloudinary
    const imagePromises = req.files.images.map(file => uploadOnCloudinary(file.path));
    const uploadedImages = await Promise.all(imagePromises);
    
    if (!uploadedImages.length || uploadedImages.some(img => !img?.url)) {
      return res.status(400).json({
        error: "Failed to upload one or more images"
      });
    }

    const imageURLs = uploadedImages.map(image => image.url);


    const newRecipe = new Recipe({
      ...validateBody,
      author: req.user._id,
      images: imageURLs
    });

    await newRecipe.save();

    const populatedRecipe = await Recipe.findById(newRecipe._id).populate("author", "username");

    res.status(201).json({
      message: "Recipe created successfully",
      recipe: populatedRecipe
    });

  } catch (error) {
    console.error("Recipe creation error:", error);
    res.status(400).json({
      error: error.message || "Failed to create recipe"
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
    if (!getRecipe) {
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

    const updatedData = {...validateBody};

    if(req.file){
      const newImagePath = req.files?.images[0]?.path;
      const newImage = await uploadOnCloudinary(newImagePath);
      updatedData.image = newImage.url;
    }


    const findRecipe = await Recipe.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user._id,
      },
      updatedData,
      { new: true , runValidators: true}
    );

    if (!findRecipe) {
        return res.status(404).json({ error: 'Recipe not found or unauthorized' });
      }
      res.json(findRecipe);


  } catch (error) {
    res.status(400).json({
      error: error.error,
      message: error.message,
    });
  }
};





export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
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
