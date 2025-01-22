import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid Email address"),
  password: z.string().min(8, "Password must be 8 characters"),
});


export const recipeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  author: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Author must be a valid ObjectId"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "Ingredient name is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        unit: z.string().min(1, "Unit is required"),
      })
    )
    .nonempty("At least one ingredient is required"),
  instructions: z
    .array(z.string().min(5, "Instruction must be at least 5 characters"))
    .nonempty("At least one instruction is required"),
  cookingTime: z.number().min(1, "Cooking time must be at least 1 minute"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  cuisine: z.string().min(3, "Cuisine must be at least 3 characters"),
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
