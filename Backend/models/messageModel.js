import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;