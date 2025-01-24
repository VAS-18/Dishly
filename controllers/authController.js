import User from "../models/userModel.js";
import { registerSchema, loginSchema } from "../utils/validation.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

const generateRefreshAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new Error("Error generating tokens: " + error.message);
  }
};

export const register = async (req, res) => {
  try {
    const validateBody = registerSchema.parse(req.body);

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [{ email: validateBody.email }, { username: validateBody.username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const profileImagePath = req.files?.profileImage[0]?.path;

    if (!profileImagePath) {
      return res.status(400).json({
        error: "Please upload a profile image",
      });
    }

    // Upload image to Cloudinary
    const profileImage = await uploadOnCloudinary(profileImagePath);

    if (!profileImage) {
      return res.status(400).json({
        error: "Profile image upload failed",
      });
    }

    const user = await User.create({
      username: validateBody.username,
      email: validateBody.email,
      password: validateBody.password,
      profileImage: profileImage.url,
    });

    await user.save();

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
};



export const login = async (req, res) => {
  try {
    const {username,email,password} = req.body

    if(!username && !email){
      return res.status(400).json({
        error: "Please provide email or user",
      })
    }

    const user = await User.findOne({$or : [{username},{email}]});


    if (!user) {
      return res.status(404).json({
        error: "User does not exist",
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const { accessToken, refreshToken } = await generateRefreshAndAccessToken(
      user._id
    );

    return res.status(200).json({
      message: "Login Successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
