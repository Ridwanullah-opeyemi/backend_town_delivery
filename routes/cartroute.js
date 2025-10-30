import express, { Router } from "express"
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js"
import authMiddlewere from "../middleware/auth.js"

const cartRouter = express.Router()

cartRouter.post("/add", authMiddlewere,addToCart)
cartRouter.post("/remove",authMiddlewere, removeFromCart)
cartRouter.post("/get",authMiddlewere, getCart)

export default cartRouter
