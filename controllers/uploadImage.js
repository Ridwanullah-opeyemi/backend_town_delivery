import multer from "multer";

import CloudinaryStorage from "multer-storage-cloudinary"
import cloudinary from "cloudinary"

// Configure the storage engine for Multer
const newStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "star_images", // Folder in your Cloudinary account
        allowedFormats: ["jpeg", "png", "jpg"],
        transformation: [{ width: 500, height: 500, crop: "limit" }],
    }
});

// Create the Multer instance
const uploadImage = multer({ storage: newStorage });

export default uploadImage;