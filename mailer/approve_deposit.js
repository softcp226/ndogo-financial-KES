const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { datetime } = require("./system-variables");

// let transporter = nodemailer.createTransport({
//   service: "Gmail",
//   secure: false,

//   auth: {
//     user: process.env.company_mail,
//     pass: process.env.mail_password,
//   },
// });

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

// let currentdate = new Date();
// let datetime = `${currentdate.getFullYear()}-${
//   currentdate.getMonth() + 1
// }-${currentdate.getDate()} ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

let create_mail_options = (userInfo) => {
  return (mailOptions = {
    from: process.env.mail,
    // from:"michelleannschlloser@outlook.com",
    to: userInfo.reciever,
    subject: `Deposit Confirmation Notification`,

    html: `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Deposit Confirmation</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0; padding:0; background-color:#f2f4f6; font-family:'Inter', sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f2f4f6; padding: 30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border-radius:10px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(90deg, #0c0e28, #1e1f4b); padding: 30px; text-align: center;">
              <img src="https://ndogo-financial.com/css/assets/logo.jpg" alt="Ndogo-Financial Logo" style="height: 50px;">
              <h1 style="color:#ffffff; font-size: 22px; margin-top: 20px;">Deposit Confirmed</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
              <p style="margin: 0 0 10px;">Dear <strong>${userInfo.full_name}</strong>,</p>

              <p style="margin: 0 0 15px;">
                We’re happy to let you know that your deposit of <strong style="color:#0c0e28;">KSH${userInfo.deposit_amount}</strong>
                was successfully processed on <strong>${datetime}</strong>.
              </p>

              <p style="margin: 0 0 15px;">
                The funds have been credited to your <strong>Ndogo-Financial</strong> active investment wallet and your investment would return after one week.
              </p>

                            <p>Your funds are now working for you in our trusted micro-capital and trade-based ventures. We appreciate your commitment and look forward to delivering weekly results with transparency and consistency.</p>

              <p style="margin: 0 0 25px;">
                You can view your investment details by logging in to your Ndogo-Financial account below.
              </p>

              <p style="text-align: center;">
                <a href="https://ndogo-financial.com/dashboard.html" style="background-color:#0c0e28; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:600;">
                  Go to Dashboard
                </a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color:#f9fafb; color:#999999; font-size:13px; text-align:center;">
              This email was sent securely via Ndogo-Financial. If you didn’t make this deposit, please ignore this message.
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
