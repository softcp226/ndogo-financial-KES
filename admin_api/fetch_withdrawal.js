const express = require("express");
const Router = express.Router();
const verifyToken = require("../secure-admin-api/verifyToken");
const Withdrawal_request = require("../model/withdrawal_request");
const Admin = require("../model/admin");
const validate_admin_fetchuser = require("../validation/validate-admin-fetchuser");
const validate_admin_delete_withdrawal = require("../validation/validate-admin-delete-withdrawal");
const User=require("../model/user")
const Transaction = require("../model/transaction")
const {
  create_mail_options,
  transporter
} = require("../mailer/approve_withdrawal");

Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_admin_fetchuser(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
    const withdrawal = await Withdrawal_request.find().populate("user").populate("transaction");
    if (withdrawal.length < 1)
      return res.status(400).json({
        error: true,
        errMessage: "No one has initiated a withdraw transaction at the moment",
      });
    res.status(200).json({ error: false, message: withdrawal });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});



Router.post("/withdrawal/approval", verifyToken, async (req, res) => {

  const request_isvalid = validate_admin_delete_withdrawal(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });



    const withdrawal_request = await Withdrawal_request.findById(req.body.withdrawal_request);

    if (!withdrawal_request) return res.status(400).json({ error: true, errMessage: "The withdrawal you tried to approve no longer exist" })



    const user = await User.findById(withdrawal_request.user);

    if (!user)
      return res.status(400).json({
        error: true,
        errMessage:
          "the user that made the withdrawal you are trying to approve no longer exist",
      });

    const transaction = await Transaction.findById(withdrawal_request.transaction)
    if (!transaction) return res.status(400).json({ error: true, errMessage: "Transaction not found, please try again" })

    withdrawal_request.set({is_approved:true})
    transaction.set({ status: "success" })
    Promise.all([withdrawal_request.save(),transaction.save()])

    transporter.sendMail(
      create_mail_options({
        first_name: user.first_name,
        last_name: user.last_name,
        reciever: user.email,
        amount:withdrawal_request.withdrawal_amount
      }),
      (err, info) => {
        if (err) return console.log(err.message);
        console.log(info);
        // return res.status(400).json({
        //   error: true,
        //   errMessage: `Encounterd an error while trying to send an email to you: ${err.message}, try again`,
        // });
      },
    );


    res.status(200).json({
      error: false,
      message: "success",
    });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }

})



Router.delete("/withdrawal/delete", verifyToken, async (req, res) => {
  const request_isvalid = validate_admin_delete_withdrawal(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
    await Withdrawal_request.findByIdAndDelete(req.body.withdrawal_request);
    res.status(200).json({
      error: false,
      message: "you successfully deleted a withdrawal request",
    });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

module.exports = Router;
