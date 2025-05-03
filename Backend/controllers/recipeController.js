import Recipe from "../models/recipeModel.js";

//create recipe
export const createRecipe = async (req, res) => {
  try {
    // Zod validation removed, use req.body directly
    const recipeData = req.body;
    if (!req.file) {
      return res.status(400).json({
        error: "Please upload a file",
      });
    }

    const fileUrl = req.file.path;

    const newRecipe = new Recipe({
      ...recipeData,
      author: req.user._id,
      images: fileUrl,
    });

    await newRecipe.save();

    res.status(201).json({
      message: "Recipe created successfully",
      newRecipe
    });

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
    // Zod validation removed, use req.body directly
    const updateData = req.body;
    const findRecipe = await Recipe.findOneAndUpdate(
      {
        _id: req.params.id,
        author: req.user._id,
      },
      updateData,
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
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
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
