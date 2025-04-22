import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", LikeSchema);

export default Like;