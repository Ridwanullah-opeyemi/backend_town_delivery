import bcrypt from "bcryptjs";
import userModel from "../model/userModel.js";
import crypto from "crypto";
import sendResetMail from "../server/resetpasswrd.js";


const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: true, 
                message: "If an account with that email exists, a password reset link has been sent."
            });
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        
        const passwordResetToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        
        user.passwordResetToken = passwordResetToken;
        user.passwordResetExpires = Date.now() + 60 * 60 * 1000; 
        await user.save({ validateBeforeSave: false });

        
        await sendResetMail(resetToken, user.name || user.email, user.email);

        res.json({
            success: true,
            message: "Password reset link sent successfully to your email.",
        });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        
        if (user) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
        }

        res.status(500).json({ success: false, message: "Error sending reset email." });
    }
};


const PasswordeResetToken = async (req, res) => {
    const tokenFromUrl = req.params.token;
    
    const passwordResetToken = crypto
        .createHash("sha256")
        .update(tokenFromUrl)
        .digest("hex");
        
    const { newpassword } = req.body;
    
    try {
        const user = await userModel.findOne({ 
            passwordResetToken,
            passwordResetExpires: { $gt: Date.now() } 
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired password reset link. Please request a new one."
            });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashingpassword = await bcrypt.hash(newpassword, salt);
        
        user.password = hashingpassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save(); 

        res.json({
            success: true,
            message: "password reset successful. You can now log in.",
        });
    } catch (error) {
        console.error("Password Reset Error:", error);
        res.status(500).json({
            success: false,
            message: "Error processing password reset."
        });
    }
};

export { 
    forgotPassword, 
    PasswordeResetToken 
};