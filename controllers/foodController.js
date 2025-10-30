
import foodModel from "../model/foodmodel.js";
import fs from "fs"


// add food item
const addFood = async (req,res) => {
    
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No image provided"
            });
        }

        const image_filename = `${req.file.filename}`
        const food = await foodModel.create({
            ...req.body,
            image: image_filename
        });

        res.status(200).json({
            success: true,
            message: "food added successfully",
            food
        }); 

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error uploading items",
        })
    }


}


// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find().sort({ createdAt: -1 }); 
        res.status(200).json({
            success: true, 
            data: foods
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error feching food",
        })
    }
};

//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id); 
        
        if (!food) {
            return res.json({
                success: false,
                message: "Food item not found"
            });
        }

        fs.unlink(`uploads/${food.image}`, (err)=>{
            if (err) {
                console.error("Error deleting image file:", err);
            }
        }); 

        await foodModel.findByIdAndDelete(req.body.id);

        res.status(200).json({
            success: true, 
            message: "Food item removed successfully"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error removing item",
        })
    }
};


export {
    addFood,
    listFood,
    removeFood
}