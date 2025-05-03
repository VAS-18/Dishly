import User from "../models/userModel.js";
import Post from "../models/postModel.js";

export const uploadProfilePictureController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a file" });
    }

    const fileUrl = req.file.path;
    const user = await User.findById(req.user._id);
    user.profilePicture = fileUrl;
    await user.save();
    res.status(200).json({ message: "Profile Picture Uploaded Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const uploadPostPictureController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a file" });
    }

    const fileUrl = req.file.path;

    const post = new Post({
      ...req.body,
      picture: fileUrl,
    });
  } catch (error) {}
};

export const followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    if (!userToFollow) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userToFollow._id.equals(req.user._id)) {
      return res.status(400).json({ error: "Cannot Follow Your Self" });
    }

    if (!userToFollow.followers.includes(req.user._id)) {
      userToFollow.followers.push(req.user._id);
      await userToFollow.save();
    }

    const currentUser = await User.findById(req.user._id);
    if (!currentUser.following.includes(userToFollow._id)) {
      currentUser.following.push(userToFollow._id);
      await currentUser.save();
    }
    res.json({ message: "Followed user" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        if (!userToUnfollow) return res.status(404).json({ error: "User not found" });

        userToUnfollow.followers = userToUnfollow.followers.filter(
            (id) => id.toString() !== req.user._id.toString()
        );
        await userToUnfollow.save();

        const currentUser = await User.findById(req.user._id);
        currentUser.following = currentUser.following.filter(
            (id) => id.toString() !== userToUnfollow._id.toString()
        );
        await currentUser.save();

        res.json({ message: "Unfollowed user" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update profile
export const updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select("-password -refreshToken");
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Search users
export const searchUsers = async (req, res) => {
    try {
        const { q } = req.query;
        const users = await User.find({
            $or: [
                { username: { $regex: q, $options: "i" } },
                { email: { $regex: q, $options: "i" } },
            ],
        }).select("username email profileImage bio");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password -refreshToken")
      .populate("posts", "-user")
      .populate("followers", "-password -refreshToken")
      .populate("following", "-password -refreshToken");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}