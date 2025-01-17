import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const profileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "profile-pictures",
        allowed_formats: ["jpg", "png" , "jpeg"],
    },
});

const recipeStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "recipe-pictures",
        allowed_formats: ["jpg", "png", "jpe"],
    },
});

const postStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "post-pictures",
        allowed_formats: ["jpg", "png", "jpe"],
    },
});


const profileUpload = multer({
    storage: profileStorage,
    limits: { fileSize: 5*1024*1024 }, //Limits File Size to 5MB
});

const postUpload = multer({
    storage: postStorage,
    limits: { fileSize: 8*1024*1024 }, //Limits File Size to 8MB
});


export { profileUpload, postUpload };