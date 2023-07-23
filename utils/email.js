const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const emailSender = async(options)=>{
    const transporter = nodemailer.createTransport({
        service: process.env.service,
        auth: {
            user: process.env.user,
            pass: process.env.pass,
            secure: false
        }
    });
 
    const mailOptions = {
        from:process.env.USER,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions);
};

module.exports = emailSender