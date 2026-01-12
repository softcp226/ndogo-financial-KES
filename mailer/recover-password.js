const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { datetime } = require("./system-variables");

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

//   auth: {
//     user: process.env.company_mail,
//     pass: process.env.mail_password,
//   },
// });

let create_mail_options = (userInfo) => {
  return (mailOptions = {
    from: userInfo.reciever,
    // from:"michelleannschlloser@outlook.com",
    to: userInfo.reciever_mail,
    subject: `PASSWORD RECOVERY`,
    //   text:"just wanna know if this works",
    html: `
     <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Recovery</title>
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
              <h1 style="color:#ffffff; font-size: 22px; margin-top: 20px;">Password Reset Request</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
              <p>Dear <strong>${userInfo.full_name}</strong>,</p>

              <p>We received a request to reset the password for your Ndogo-Financial account. If you made this request, you can reset your password securely by clicking the button below:</p>

              <p style="text-align: center; margin: 30px 0;">
                <a href="${userInfo.reset_link}" style="background-color:#0c0e28; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:600;">
                  Reset Password
                </a>
              </p>

              <p>If the button above doesn’t work, copy and paste the link below into your browser:</p>
              <p style="word-break: break-word; color: #555;">${userInfo.reset_link}</p>

              <p>If you did not request a password reset, you may safely ignore this email. Your account remains secure.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color:#f9fafb; color:#999999; font-size:13px; text-align:center;">
              This message was sent from Ndogo-Financial's secure platform. No action is required if you did not request this password reset.
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


 `,
  });
};
module.exports = { create_mail_options, transporter };
// transporter.sendMail(mailOptions, (err, info) => {
//   if (err)softjovial
//     return res
//       .status(400)
//       .json({ error: true, errMessage: `an error occured: ${err.message}` });
//   // console.log(info)
//   return res.status(200).json({ error: false, message: "message sent" });
//   // console.log("message sent",info)
// });

// //   if (err)
// //     return { error: true, errMessage: `an error occured: ${err.message}` };
// //   // console.log(info)
// //   return { error: false, message: "message sent" };
// // });
// };
