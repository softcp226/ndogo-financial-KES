const express = require("express");
const Router = express.Router();
const validateUser = require("../validation/validate_user01");
const genToken = require("../token/genToken");
const hashPassword = require("../hash/hashPassword");
const User = require("../model/user");
const {
  create_mail_options,
  transporter,
} = require("../mailer/reg_success_mail");


Router.post("/", async (req, res) => {
  console.log(req.body)
  const isvalid = validateUser(req.body);
  if (isvalid != true)
    return res.status(400).json({ error: true, errMessage: isvalid });

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .json({ error: true, errMessage: "User already exists" });

            const password = await hashPassword(req.body.password);
     


             let currentdate = new Date();
  let datetime = `${currentdate.getFullYear()}-${
    currentdate.getMonth() + 1
  }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
  let ref = Math.floor(Math.random() * 100);

    const newUser = await new User({
      full_name: req.body.full_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      country: req.body.country,
      password, 
      referral: req.body.referral,
     registration_date: datetime,
    });

  newUser.set({
      referral_link: `https://ndogo-financial.com?${newUser._id}`,
    });

    const result = await newUser.save();

        transporter.sendMail(
      create_mail_options({
        full_name: req.body.full_name,
        reciever: req.body.email,
      }),
      (err, info) => {
        if (err) return console.log(`there was an error on the server${err}`);
        console.log(info);
        // return res.status(400).json({
        //   error: true,
        //   errMessage: `Encounterd an error while trying to send an email to you: ${err.message}, try again`,
        // });
      },
    );

    // console.log("user", result);
    const token = genToken(result._id);
    res.status(200).json({
      error: false,
      message: { user: result._id},
      token,
    });
  } catch (err) {
      console.log(err)

    return res.status(400).json({ error: true, errMessage: err.message });
  }
});

module.exports = Router;
// console.log