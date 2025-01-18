import mongoose from "mongoose";

//Post Schema

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
    required: true,
    trim: true,
    maxlength: [500, "Caption cannot be more than 500 characters long"],
  },
  media: [{
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }],
  
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },

      text: {
        type: String,
        required: true,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default Post = mongoose.model("Post", postSchema);