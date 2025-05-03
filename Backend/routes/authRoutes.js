import express from "express";
import { register, login } from "../controllers/authController.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

const router = express.Router();

router.route("/register").post(
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  register
);

router.route("/login").post(login);

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password -refreshToken")
      .populate("followers", "username profileImage")
      .populate("following", "username profileImage");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch user",
    });
  }
});

export default router;
