import nodemailer from 'nodemailer';


export const sendResetPasswordEmail = async (
  id: string,
  firstname: string,
  email: string,
  title: string,
  token: string,
  url: string
) => {
  try {
    //create transporter
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
      from: process.env.GOOGLE_CLIENT_ID,
      to: email, //list of receivers
      subject: title,
      html: `<p>Hi ${firstname}!! \n<a href="http://localhost:3000/reset-password/${token}">\nPlease click on this link to reset password.</p>`
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