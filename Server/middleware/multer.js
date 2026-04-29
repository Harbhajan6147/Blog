import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
 import cloudinary from "../configs/CloudUpload.js";
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "uploads-blogs-images",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
});

const upload = multer({ storage });

export default upload;