import mongoose from "mongoose";

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
        "^[w-.]+@([w-]+.)+[w-]{2,4}$",
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password Must be at least 8 characters long"],
    },
    ProfileImage: {
      type: String,
      default: "default.jpg",
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot be more than 500 characters long"],
    },
  },
  { timestamps: true }
);


const User = mongoose.model('User', UserSchema);

export default User;
