import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host: process.env.transhost,
    port: 587,
    service: process.env.transService,
    secure: false,
    auth: {
        user: process.env.appEmail,
        pass: process.env.appPassword
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Error verifying transporter:", error);
    } else {
        console.log("Server ready to send mail.");
    }
});

export default transporter;
