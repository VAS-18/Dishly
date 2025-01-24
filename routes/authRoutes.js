import express from "express";
import { register, login } from "../controllers/authController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.route("/register").post(
    upload.fields([
        {
            name: "profileImage",
            maxCount: 1,
        }
    ]),
    register);

router.route("/login").post(login);

export default router;
