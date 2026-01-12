const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { datetime } = require("./system-variables");
require("dotenv").config();

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: process.env.host,
    secureConnection: false,
    tls: {
      rejectUnauthorized: false,
    },
    port: 587,
    auth: {
      user: process.env.company_mail,
      pass: process.env.mail_password,
    },
  }),
);

// let transporter = nodemailer.createTransport({
//   service: "Gmail",
//   secure: false,
//  host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,

//   auth: {
//     user: process.env.company_mail,
//     pass: process.env.mail_password,
//   },
 
// });

console.log(process.env.mail_password);
let create_mail_options = (userInfo) => {
  return (mailOptions = {
    from: process.env.mail,
    // from:"michelleannschlloser@outlook.com",
    to: userInfo.reciever,
    subject: `Account Registeration Confirmation`,
    

//     html: `
   
//         <div class="mail_template"
//             style="max-width: 600px; margin: auto; font-family: 'Poppins', sans-serif; background-color: #f2f2f2; padding: 20px; border-radius: 10px; border: 1px solid #ccc;">
//             <div style="text-align: center;">
//                 <img src="https://crescentpips.com/ke/assets/images/logo'.png"   alt="Company Logo" style="max-width: 100%; max-height: 2rem;">
//             </div>
//             <div style="text-align: center; margin-top: 20px;">
//                 <h3 style="font-size: 24px; font-weight: bold; color: #333;">New Account Registration</h3>
//             </div>
//             <div style="margin-top: 30px;">
//                 <p style="font-size: 18px; color: #555;">Dear ${userInfo.first_name} ${userInfo.last_name},</p>
//                 <p style="font-size: 18px; color: #555;">Thank you for registering an account with us. We are committed to
//                     providing you with the best trading service that are possible.</p>
//             </div>

//              <p style="font-size: 18px; color: #555;">You are ready to make deposit and  start creating trade and making profit</p>


//             <div style="margin-top: 40px;">
//                 <p style="font-size: 14px; color: #999; text-align: center;">This message was generated via softjovial secured
//                     channel. Please do not take any action if you did not make this request.</p>
//             </div>
//         </div>
        
//         <style>
//             @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
//         </style>
//  `,

html:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Ndogo-Financial</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0; padding:0; background-color:#f6f9fc; font-family:'Inter', sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f6f9fc; padding: 30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:10px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(90deg, #0c0e28, #1e1f4b); padding: 30px; text-align: center;">
              <img src="https://ndogo-financial.com/css/assets/logo.jpg" alt="Ndogo-Financial Logo" style="height: 50px;">
              <h1 style="color:#ffffff; font-size: 22px; margin-top: 20px;">Welcome to Ndogo-Financial</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
              <p>Dear <strong>${userInfo.full_name}</strong>,</p>

              <p>Thank you for registering with <strong>Ndogo-Financial</strong>! We’re thrilled to have you join a platform built to support your journey toward financial growth and freedom.</p>

              <p>Your account is now active and ready. You can now make deposits, place Investment and start building capital. Simply use the “Deposit Fund” button in your dashboard, and we’ll handle the execution for you.</p>

              <p>If you have any questions or need help getting started, our support team is always ready to assist you.</p>

              <p style="text-align:center; margin: 30px 0;">
                <a href="https://ndogo-financial.com/signin.html" style="background-color:#0c0e28; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:600;">
                  Sign In to Your Account
                </a>
              </p>

              <p>Welcome again, and thank you for choosing Ndogo-Financial.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color:#f9fafb; color:#999999; font-size:13px; text-align:center;">
              This message was sent securely by Ndogo-Financial. If you did not initiate this registration, please ignore this email.
              <br><br>
              © 2025 Ndogo-Financial. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>

`
  });
};
module.exports = { create_mail_options, transporter };

