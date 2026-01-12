const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

// let transporter = nodemailer.createTransport({
//   service: "Gmail",
//   secure: false,

//   auth: {
//     user: "panteramining642@gmail.com",
//     // pass: "desolidboy1",
//     pass: "cvqydopvaddyfnfi",
//     // secure:false,
//   },
// });

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


let currentdate = new Date();
let datetime = `${currentdate.getFullYear()}-${
  currentdate.getMonth() + 1
}-${currentdate.getDate()} ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

let create_mail_options = (userInfo) => {
  return (mailOptions = {
    from: process.env.mail,
    // from:"michelleannschlloser@outlook.com",
    to: userInfo.reciever,
    subject: `Withdrawal Request Notification`,
  

    html: `
   
     <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Withdrawal Notification</title>
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
              <h1 style="color:#ffffff; font-size: 22px; margin-top: 20px;">Withdrawal Request Received</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
              <p>Dear <strong>${userInfo.full_name}</strong>,</p>

              <p>We have successfully received your withdrawal request of <strong>KSH ${userInfo.amount}</strong> from your Ndogo-Financial account.</p>

              <p>Your request is currently under review. Once approved, the funds will be processed and sent to your chosen payment method.</p>

              <p>If you have any questions or need support, feel free to contact our team at 
                <a href="mailto:support@ndogo-financial.com" style="color: #007BFF; text-decoration: none;">
                  support@ndogo-financial.com
                </a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color:#f9fafb; color:#999999; font-size:13px; text-align:center;">
              This email was sent securely by Ndogo-Financial. If you did not initiate this request, please ignore this message.
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
//   if (err)
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
