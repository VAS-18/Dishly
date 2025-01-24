import User from "../models/userModel.js";
import Post from "../models/postModel.js";

export const uploadProfilePictureController = async (req, res) => {
    try {

        const {title, description} = req.body;
        
        if(!req.file){
            return res.status(400).json({error: "Please upload a file"});
        }

        const fileUrl = req.file.path;
        const user = await User.findById(req.user._id);
        user.profilePicture = fileUrl;
        await user.save();
        res.status(200).json({message: "Profile Picture Uploaded Successfully"});
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const uploadPostPictureController = async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).json({error: "Please upload a file"});
        }

        const fileUrl = req.file.path;

        const post = new Post({
            ...req.body,
            picture: fileUrl,
        });
        
    } catch (error) {
        
    }
}