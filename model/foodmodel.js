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
        type: String, // Corrected: lowercase 'type'. This stores the image filename/path.
        required: true
    },
    category: {
        type: String, // Corrected: lowercase 'type'
        required: true
    }
});

// This standard line ensures that the model is only compiled once,
// preventing the 'OverwriteModelError' in development/hot-reloading environments.
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;