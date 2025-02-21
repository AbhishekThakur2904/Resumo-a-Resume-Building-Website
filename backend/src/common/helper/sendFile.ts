import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Basic send email function

// Function to send email with file attachment
export const sendFile = async ({
  email,
  subject,
  html,
  filePath,
  fileName,
}: {
  email: string;
  subject: string;
  html: string;
  filePath: string;  // Path to the file
  fileName: string;  // Name for the attachment in the email
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject,
      html,
      attachments: [
        {
          filename: fileName, // The file name as shown in the email
          path: filePath, // Path to the file
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.log("Error sending email with attachment:", err);
    return false;
  }
};
