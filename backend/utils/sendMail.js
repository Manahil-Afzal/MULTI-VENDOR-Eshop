// const nodemailer = require ("nodemailer");
// require("dotenv").config();

// const sendMail = async (options) => {
//      const transporter = nodemailer.createTransport({
//      host:"smtp.gmail.com",
//      port: process.env.SMTP_PORT,
//      auth:{
//          user: process.env.SMTP_MAIL,
//          pass: process.env.SMTP_PASSWORD,
//      },
// });
//      const mailOptions = {
//         from: process.env.SMTP_SENDER_MAIL,
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//      };
//    await transporter.sendMail(mailOptions);
// };

// module.exports = sendMail;


// const nodemailer = require ("nodemailer");
// require("dotenv").config();

// const sendMail = async (options) => {
//      const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//      port: process.env.SMTP_PORT,
//      service: process.env.SMTP_SERVICE,
//      auth:{
//          user: process.env.SMTP_MAIL,
//          pass: process.env.SMTP_PASSWORD,
//      },
// });
//      const mailOptions = {
//         from: process.env.SMTP_SENDER_MAIL,
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//      };
//    await transporter.sendMail(mailOptions);
// };

// module.exports = sendMail;



const nodemailer = require("nodemailer");

require("dotenv").config();
const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSW,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_SENDER_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;