import express from "express";
import { profileUpload } from "../middleware/uploadMiddleware.js";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(profileUpload ,register);

router.route("/login").post(login);

export default router;
