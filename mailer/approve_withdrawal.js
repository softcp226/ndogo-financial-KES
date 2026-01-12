const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

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
let currentdate = new Date();
let datetime = `${currentdate.getFullYear()}-${
  currentdate.getMonth() + 1
}-${currentdate.getDate()} ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

let create_mail_options = (userInfo) => {
  return (mailOptions = {
    from: process.env.mail,
    // from:"michelleannschlloser@outlook.com",
    to: userInfo.reciever,
    subject: `Withdrawal Completed`,
    //   text:"just wanna know if this works",
    //     html: `
    // <link rel="preconnect" href="https://fonts.googleapis.com" />
    // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    // <link
    //   href="https://fonts.googleapis.com/css2?family=Nunito&family=Roboto&display=swap"
    //   rel="stylesheet"
    // />
    // <main
    //   style="
    //     font-family: 'Nunito', sans-serif;
    //     font-family: 'Roboto', sans-serif;
    //     background-image: url(https://edustair.com/assets/img/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg);
    //     width: 100%;
    //     background-size: cover;
    //   "
    // >
    //   <div class="maincontainer"  style="
    //     font-family: 'Nunito', sans-serif;
    //     font-family: 'Roboto', sans-serif;
    //     background-image: url(https://edustair.com/assets/img/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg);
    //     width: 100%;
    //     background-size: cover;
    //   ">
    //     <div class="head-txt">
    //       <h1 style="text-align: center; font-size: 16px; color: #825ee4">
    //         crescentpips.COM
    //       </h1>
    //       <h3 style="font-size: 15px">WITHDRAWAL WAS INNITIATED</h3>
    //     </div>

    //     <p class="sm-p">
    //       Dear ${userInfo.first_name} ${userInfo.last_name}, you have successfully
    //       initiated a withdrawal of crypto that amounts $${userInfo.amount} from
    //       your crescentpips account on <b>${datetime}</b>.your withdrawal is still pending as our system is still verifying your request to avoid loss of funds and your money would be sent immediately after verification
    //     </p>

    //     <p class="sm-p">
    //       incase you have any questions do not hesitate to contact us and we will
    //       reach out to you as soon as possible
    //     </p>
    //     <br />
    //    <h1
    //       style="
    //         font-size: 18px;
    //         text-align: center;
    //         background: #eee;
    //         color: #0c0e28;
    //       "
    //     >
    //       crescentpips.BIZ
    //     </h1>
    //     <p class="disclaimer" style="font-size: 12px; font-weight: bolder">
    //       Disclaimer: this message was automatically generated via crescentpips
    //       secured channel,please do not reply to this message all correspondence
    //       should be addressed to crescentpips.biz or your relationship officer
    //     </p>
    //   </div>
    // </main>

    //  `,

    html: `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Withdrawal Completed</title>
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
              <h1 style="color:#ffffff; font-size: 22px; margin-top: 20px;">Withdrawal Approved</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px; color: #333333; font-size: 16px; line-height: 1.6;">
              <p style="margin: 0 0 10px;">Dear <strong>${userInfo.full_name}</strong>,</p>

              <p style="margin: 0 0 15px;">
                We’re pleased to inform you that your withdrawal of <strong style="color:#0c0e28;">KSH${userInfo.amount}</strong>
                has been successfully processed.
              </p>

              <p style="margin: 0 0 15px;">
                The funds have been transferred to the bank details you provided during the withdrawal request.
              </p>

              <p style="margin: 0 0 25px;">
                You can review your transaction history by logging in to your Ndogo-Financial account below.
              </p>

              <p style="text-align: center;">
                <a href="https://ndogo-financial.com/signin.html" style="background-color:#0c0e28; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:600;">
                  Go to Dashboard
                </a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color:#f9fafb; color:#999999; font-size:13px; text-align:center;">
              This email was sent securely via Ndogo-Financial. If you did not request this withdrawal, please ignore this message or contact support.
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
