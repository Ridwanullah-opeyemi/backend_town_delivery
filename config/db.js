import mongoose from "mongoose";
import env from "dotenv"
env.config()

const mongoDbUrl = process.env.mongoDb_Url

const connectDb = async () => {
    console.log("Connecting to DB...");
    
    try {
        const connected = await mongoose.connect(mongoDbUrl);
        if(connected){
            console.log("DB connected ✅");
        }
    } catch (error) {
        console.error("DB connection error:", error);
    }
}

export default connectDb;