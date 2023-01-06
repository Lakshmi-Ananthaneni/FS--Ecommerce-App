import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

export type emailData = {
  email: string;
  subject: string;
  html: string;
};

export const sendVerificationEmail = async (emailData: emailData) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GOOGLE_CLIENT_ID,
        pass: process.env.GOOGLE_CLIENT_SECRET,
      }
    });

    const mailOptions = {
      from: process.env.GOOGLE_CLIENT_ID, // sender address
      to: emailData.email, //list of receivers
      subject: emailData.subject,
      html: emailData.html
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: %s', info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};