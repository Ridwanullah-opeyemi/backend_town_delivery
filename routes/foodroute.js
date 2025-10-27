import express from 'express';
import multer from 'multer';
import { addFood, listFood, removeFood } from '../controllers/foodController.js'; 

const foodrouter = express.Router();

// --- Image Storage Engine ---

const storage = multer.diskStorage({
    destination: "uploads", 
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`); 
    }
});

// --- Multer Instance ---
const uploads = multer({ storage: storage });

// --- API Endpoint ---
foodrouter.post("/add", uploads.single("image"), addFood);
foodrouter.get("/list", listFood)
foodrouter.post("/remove", removeFood)
 
 
export default foodrouter;