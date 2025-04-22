import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const comment = await Comment.create({
      user: req.user._id,
      post: postId,
      text,
    });
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    if (comment.user.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Unauthorized" });
    await comment.deleteOne();
    await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};