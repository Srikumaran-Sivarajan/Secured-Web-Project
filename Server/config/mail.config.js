
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use 'hotmail', 'yahoo', 'outlook'
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASSWORD // use App Password if using Gmail
  }
});

const mailOptions = {
  from: process.env.USER_EMAIL,
  to: 'sendemail@gmail.com',
  subject: 'Test Email using Nodemailer',
  text: 'Hello! This is a test email sent using Node.js and Nodemailer.'
};

// Step 3: Send the mail
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred:', error);
  } else {
    console.log('Email sent successfully:', info.response);
  }
});