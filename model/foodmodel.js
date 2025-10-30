
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String, // Corrected: lowercase 'type'
        required: true
    },
    description: {
        type: String, // Corrected: lowercase 'type'
        required: true
    },
    price: {
        type: Number, // Improved: Use Number for price for mathematical operations
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    category: {
        type: String, 
        required: true
    }
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;