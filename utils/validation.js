import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters long")
    .max(20, "Username cannot be more than 20 characters long")
    .trim(),
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string"
  }),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string"
  }).min(8, "Password must be at least 8 characters")
});


export const recipeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "Ingredient name is required"),
        quantity: z.number().min(0.1, "Quantity must be greater than 0"),
        unit: z.string().min(1, "Unit is required"),
      })
    )
    .nonempty("At least one ingredient is required"),
  instructions: z
    .array(z.string().min(5, "Instruction must be at least 5 characters"))
    .nonempty("At least one instruction is required"),
  cookingTime: z.number().min(1, "Cooking time must be at least 1 minute"),
  prepTime: z.number().min(0, "Prep time cannot be negative").default(0),
  servings: z.number().min(1, "Servings must be at least 1").default(1),
  cuisine: z.string().min(3, "Cuisine must be at least 3 characters"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  tags: z.array(z.string()).optional(),
});


export const registerSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters long")
    .max(20, "Username cannot be more than 20 characters long")
    .trim(),
  email: z.string().email("Please enter a valid email address").trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password cannot be more than 50 characters long"),
  bio: z
    .string()
    .max(500, "Bio cannot be more than 500 characters long")
    .optional(),
});

export const postValidationSchema = z.object({
  author: z.string(),
  caption: z.string().max(500, "Caption cannot be more than 500 characters long"),
  media: z.string(),
  likes: z.array(z.string()).optional(),
});
