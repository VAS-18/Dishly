import { uploadOnCloudinary } from "../config/cloudinary.js";
import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
  try {
    const files = req.files?.image
      ? Array.isArray(req.files.image)
        ? req.files.image
        : [req.files.image]
      : [];

    const uploadPromises = files.map((f) =>
      uploadOnCloudinary(f.path).then((result) => result?.url)
    );
    const imageUrls = await Promise.all(uploadPromises);

    const post = await Post.create({
          ...req.body,
          user: req.user._id,
          image: imageUrls
        });

    return res.status(201).json(post);
  } catch (error) {
    console.error("createPost error:", error);
    return res.status(400).json({ error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username profileImage")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username profileImage",
        },
      })
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "username profileImage")
      .populate({
        path: "comments",
        populate: { path: "user", select: "username profileImage" },
      });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.user.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Unauthorized" });
    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
