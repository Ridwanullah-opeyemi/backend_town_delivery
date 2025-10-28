import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; 

import { addFood, listFood, removeFood } from '../controllers/foodController.js'; 

const foodrouter = express.Router();

const newStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "star_images", 
        allowedFormats: ["jpeg", "png", "jpg"],
        transformation: [{ width: 500, height: 500, crop: "limit" }],
    }
});
 
const uploads = multer({ storage: newStorage });

foodrouter.post("/add", uploads.single("image"), addFood); 
foodrouter.get("/list", listFood)
foodrouter.post("/remove", removeFood)
 
 
export default foodrouter;