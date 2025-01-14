import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      error: "No token provided, authorization denied",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // res.status(200).json({ decoded });

    const user = await User.findById(decoded?.userId).select(
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
