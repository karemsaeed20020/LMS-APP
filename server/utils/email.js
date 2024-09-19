const nodemailer = require("nodemailer");
const asyncHandler = require("./asyncHandler.js");
const sendEmail = asyncHandler(async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: "Kareem  <hello@jonas.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
});
module.exports = sendEmail;
