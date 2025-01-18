import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15mb
  fileFilter: (req, file, cb) => {
    const filetypes = ["image/jpeg", "image/png", "image/jpg"];
    if (filetypes.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(new Error("Invalid file type. Only jpg, jpeg, png allowed"));
    }
  },
});

const profileUpload = upload.single("profileImage");

const recipeUpload = upload.array("images", 5);

const uploadCloudinary = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });
    return result.secure_url;
  } catch (error) {
    throw new Error("Error uploading image to cloudinary" + error.message);
  } finally {
    fs.unlinkSync(filePath);
  }
};


export { profileUpload, recipeUpload, uploadCloudinary };