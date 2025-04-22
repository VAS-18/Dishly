import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";

export const likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const existing = await Like.findOne({ user: req.user._id, post: postId });
    if (existing) return res.status(400).json({ error: "Already liked" });
    const like = await Like.create({ user: req.user._id, post: postId });
    await Post.findByIdAndUpdate(postId, { $push: { likes: req.user._id } });
    res.status(201).json(like);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    await Like.findOneAndDelete({ user: req.user._id, post: postId });
    await Post.findByIdAndUpdate(postId, { $pull: { likes: req.user._id } });
    res.json({ message: "Unliked" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};