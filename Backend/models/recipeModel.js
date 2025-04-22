import mongoose from "mongoose";

//Recipe Schema

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,

      required: true,
    },

    author: {
      type: mongoose.Schema.ObjectId,

      ref: "User",

      required: true,
    },

    description: {
      type: String,

      required: true,
    },

    ingredients: [
      {
        name: {
          type: String,

          required: true,
        },

        quantity: {
          type: Number,

          required: true,
        },

        unit: {
          type: String,

          required: true,
        },
      },
    ],

    instructions: {
      type: [String],

      required: true,
    },

    cookingTime: {
      type: Number,

      required: true,
    },

    cuisine: {
      type: String,

      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    likes: {
      type: Number,

      default: 0,
    },

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,

          ref: "User",
        },

        text: {
          type: String,

          required: true,
        },

        createdAt: {
          type: Date,

          default: Date.now,
        },
      },
    ],

    tags: {
      type: [String],
    },

    aiSuggestions: {
      variations: {
        type: String,
      },

      nutritionalInfo: {
        type: Object,
      },

      pairings: [
        {
          type: String,
        },
      ],
    },
  },

  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
