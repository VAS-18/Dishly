import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "No token provided, authorization denied",
    });
  }
  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(401).json({
        error: "User not found, authorization denied",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Invalid or expired token, authorization denied",
      message: error.message,
    });
  }
};
