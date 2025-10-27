import express from "express";
import cors from "cors";
import connectDb from "./config/db.js"; // Note: Use .js extension for relative paths in ES Modules
import foodrouter from "./routes/foodroute.js"; // Assuming foodrouter uses 'export default'
import userRouter from "./routes/userRoute.js";
import transporter from "./server/transproter.js"
import cartRouter from "./routes/cartroute.js";
import orderRouter from "./routes/orderRoute.js";

// --- APP CONFIG ---
const app = express();
const port = 4002; // Renamed 'post' to 'port' for clarity

// --- MIDDLEWARE --- 
app.use(express.json()); // Parses incoming JSON requests (THIS IS THE FIX!)
app.use(cors());         // Enables CORS

// --- DB CONNECT ---
connectDb();

// --- API ENDPOINTS ---
app.use("/api/food", foodrouter);
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send('API working');
});

// --- SERVER START ---
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
