// Email Library Requirements
import nodemailer from "nodemailer";
// Email Library Nodemailer Transporter
// Used to define Gmail's requirements for sending an email by code
const TRANSPORTER = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false,
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
// Email Library Main Function
// Used to send an email as HTML
export default function SendEmail(html: string) {
  return TRANSPORTER.sendMail({
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Problema Reportado de Mateory",
    html: html,
  });
}