
import express from "express"
import { loginUser, registerUser, verifyEmail } from "../controllers/userController.js"
import verifyAccount from "../controllers/accountVerify.js"
import { forgotPassword, PasswordeResetToken } from "../controllers/passreset.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser) 
userRouter.post("/login", loginUser)
userRouter.route("/verify-email").get(verifyEmail); 
userRouter.get("/verify/:token", verifyAccount)
userRouter.post("/passwordreset/:token", PasswordeResetToken)
userRouter.post("/forgotpassword", forgotPassword)

export default userRouter;