
import express, { Router } from "express"
import authMiddlewere from "../middleware/auth.js"
import { listOrders, placeOrder, upDateStatus, userOrder, verifyOrder } from "../controllers/orderController.js"

const orderRouter = express.Router()

orderRouter.post("/place", authMiddlewere,placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userOrders",authMiddlewere, userOrder)
orderRouter.get("/list", listOrders)
orderRouter.post("/status", upDateStatus)

export default orderRouter; 