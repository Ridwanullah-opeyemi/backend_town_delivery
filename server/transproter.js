import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host: process.env.transhost, 
    port: 465,
    secure: true, 
    requireTLS: true,
    service: process.env.transService,
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