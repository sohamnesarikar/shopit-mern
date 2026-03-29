import nodemailer from "nodemailer";
import { config } from "../config/config.js";

export const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: config.MAILTRAP_HOST,
    port: config.MAILTRAP_PORT,
    auth: {
      user: config.MAILTRAP_USER,
      pass: config.MAILTRAP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `${config.MAILTRAP_SMTP_FROM_NAME} <${config.MAILTRAP_SMTP_FROM_EMAIL}>`, // sender address
    to: options.email, // list of recipients
    subject: options.subject, // subject line
    html: options.html, // HTML body
  };

  await transport.sendMail(mailOptions);
};
