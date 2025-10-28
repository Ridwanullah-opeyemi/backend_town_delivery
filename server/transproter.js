import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // no 'host' or 'port' needed when using service
  auth: {
    user: process.env.appEmail,
    pass: process.env.appPassword, // must be an App Password, not your normal Gmail password
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error verifying transporter:", error);
  } else {
    console.log("✅ Server is ready to send mail via Gmail.");
  }
});

export default transporter;
