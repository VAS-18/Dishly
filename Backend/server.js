import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

//Register Route
app.use("/api/auth", authRoutes);

//Recipe Route
app.use("/api/recipe", recipeRoutes);

//test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Welcome to Dishly" });
});

app.use((err, req, res, next) => {
  // Set default status code if none provided
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error("Error:", err); // Add logging for debugging

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
});

//handling 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

//server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
