import mongoose from "mongoose";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

//User Schema

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,

      required: true,

      unique: true,

      trim: true,

      minlength: [4, "Username must be at least 4 characters long"],
    },

    email: {
      type: String,

      required: true,

      unique: true,

      match: [
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,

        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,

      required: true,

      minlength: [8, "Password Must be at least 8 characters long"],
    },

    profileImage: {
      type: String,
    },

    bio: {
      type: String,

      maxlength: [500, "Bio cannot be more than 500 characters long"],
    },

    refreshToken: {
      type: String,
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    stories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
  },

  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Error comparing password");
  }
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const User = mongoose.model("User", UserSchema);

export default User;
