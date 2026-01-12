const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { datetime } = require("./system-variables");
// const transporter = nodemailer.createTransport(
//   smtpTransport({
//     host: "mail.crescentpips.com",
//     secureConnection: false,
//     tls: {
//       rejectUnauthorized: false,
//     },
//     port: 587,
//     auth: {
//       user: "support@crescentpips.com",
//       pass: "crescentpips1@1",
//     },
//   }),
// );

let limit_transporter =  nodemailer.createTransport(
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

let limit_mail_options = (userInfo) => {
  return (mailOptions = {
    from: process.env.mail,
    // from:"michelleannschlloser@outlook.com",
    to: userInfo.reciever,
    subject: `YOU HAVE REACHED YOUR TRIAL VAULT PLAN LIMIT, We COULDN'T APPROVE YOUR DEPOSIT`,
    html:`
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Trial Vault Plan Limit Reached</title>
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
              <h1 style="color:#ffffff; font-size: 22px; margin-top: 20px;">Trial Plan Limit Reached</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
              <p>Dear <strong>${userInfo.full_name}</strong>,</p>

              <p>We hope you're enjoying your experience with Ndogo-Financial. We noticed you've reached your limit for the <strong>Trial Vault Plan</strong>. So we couldn't approve your deposit</p>

              <p>To continue accessing our platform without limitations and unlock more features like higher trade volume, instant withdrawals, and capital growth strategies, consider upgrading to the Biashara Vault plan</p>

              <p>
                <a href="https://ndogo-financial.com/signin.html" style="background-color: #0c0e28; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Upgrade My Plan</a>
              </p>

              <p>If you have any questions or need help choosing the right plan, we’re always here to assist. Reach us any time at 
                <a href="mailto:support@ndogo-financial.com" style="color: #007BFF; text-decoration: none;">support@ndogo-financial.com</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color:#f9fafb; color:#999999; font-size:13px; text-align:center;">
              This message was sent to you securely by Ndogo-Financial. If you believe this was a mistake, please contact our support team.
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

//     html: `
   
//         <div class="mail_template"
//             style="max-width: 600px; margin: auto; font-family: 'Poppins', sans-serif; background-color: #f2f2f2; padding: 20px; border-radius: 10px; border: 1px solid #ccc;">
//             <div style="text-align: center;">
//                 <img src="https://crescentpips.com/ke/assets/images/logo'.png"   alt="Company Logo" style="max-width: 100%; max-height: 2rem;">
//             </div>
//             <div style="text-align: center; margin-top: 20px;">
//                 <h3 style="font-size: 24px; font-weight: bold; color: #333;">DEPOSIT REQUEST NOTIFICATION</h3>
//             </div>
//             <div style="margin-top: 30px;">
//                 <p style="font-size: 18px; color: #555;">Dear ${userInfo.first_name} ${userInfo.last_name},</p>
//                 <p style="font-size: 18px; color: #555;">  we have recieved a deposit of ${userInfo.currency}${userInfo.amount} request you made on <b>${datetime}</b> Go ahead and complete your deposit</p>
//             </div>
//             <div style="margin-top: 30px;">
//                 <p style="font-size: 18px; color: #555;"> For more detailed informations, please login to your account</p>
//             </div>
           
//             <div style="margin-top: 40px;">
//                 <p style="font-size: 14px; color: #999; text-align: center;">This message was generated via crescentpips secured channel. Please do not take any action if you did not make this request.</p>
//             </div>
//         </div>
        
//         <style>
//             @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
//         </style>
//  `,
  });
};
module.exports = { limit_mail_options, limit_transporter };
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
