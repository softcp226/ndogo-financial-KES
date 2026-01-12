const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const verifyToken = require("../token/verifyToken");
const validate_transfer_fund = require("../validation/validate_transfer_fund");
// const Withdrawal_request = require("../model/withdrawal_request");
// const { create_mail_options, transporter } = require("../mailer/withdrawal");
const create_transfer_transaction = require("../shape-model/create_transfer_transaction");
const {debit_mail_option,debit_transporter }=require("../mailer/debit_mail")
const {credit_mail_option,credit_transporter}= require("../mailer/credit_mail")

Router.post("/", verifyToken, async (req, res) => {
  console.log(req.body)
  const request_isvalid = validate_transfer_fund(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });
  try {
    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(404).json({
        error: true,
        errMessage: "invalid request, please login again to make a withdrawal",
      });

    if (parseInt(req.body.transfer_amount) > user.final_balance)
      return res.status(400).json({
        error: true,
        errMessage:
          "Insufficient fund, please deposit more funds to your account to make this transfer",
      });


         const user_for_transfer= await User.findOne({email:req.body.email})
  if (!user_for_transfer)           
    return res.status(400).json({
      error: true,
      errMessage: "The user you are trying to transfer funds to does not exist",
    });

    if(user_for_transfer._id.toString() === user._id.toString())    
    return res.status(400).json({
      error: true,
      errMessage: "You cannot transfer funds to yourself",
    });

      if(user.billing){
          return res.status(400).json({error:true, errMessage:user.bill_message})
      }

    // if (user.has_made_deposit !== true)
    //   return res.status(400).json({
    //     error: true,
    //     errMessage:
    //       "To make a withdrawal of your money or registration bonus , you need to atleast make a first deposit",
    //   });

    //  if (parseInt(req.body.transfer_amount) < 1500)
    //    return res.status(400).json({
    //      error: true,
    //      errMessage:
    //        "You have exceeded your trading limit for the basic plan, please deposit atleast $1,500 into your account to continue trading/withdrawal on the premium plan",
    //    });


    user.set({
      final_balance: user.final_balance - parseInt(req.body.transfer_amount),
    });
    user_for_transfer.set({
      final_balance: user_for_transfer.final_balance + parseInt(req.body.transfer_amount),    
    });
    let currentdate = new Date();
    let datetime = `${currentdate.getFullYear()}-${
      currentdate.getMonth() + 1
    }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

    withdrawal_transaction=await create_transfer_transaction(req,user, user_for_transfer);
    // console.log("withdrawal request result",withdrawal_transaction)

    // const withdrawal_request = await new Withdrawal_request({
    //   user: req.body.user,
    //   transaction_date: datetime,
    //   // transfer_amount: req.body.transfer_amount,
    //   // withdrawal_method: req.body.withdrawal_method,
    //   // wallet: req.body.wallet,
    //   transaction:withdrawal_transaction._id,

    //   transaction_bank: req.body.transaction_bank ,
    // account_number:req.body.account_number ,
    // account_name: req.body.account_name,
    // transfer_amount: req.body.transfer_amount,
    // });


    // await user.save();
    // await withdrawal_request.save();
    Promise.all([
      user.save(),
      user_for_transfer.save(),
    //   withdrawal_request.save(),
    ]);
    debit_transporter.sendMail(
      debit_mail_option({
       full_name: user.full_name,
        reciever: user.email,
      //  currency:user.account_type =="KES" ? "KSH" : "$",
        amount: req.body.transfer_amount.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      }),
      (err, info) => {
        if (err) return console.log(err.message);
   console.log("debit mail sent", info.response);
      }
    );

    credit_transporter.sendMail(            

        credit_mail_option({        
            full_name: user_for_transfer.full_name,
            reciever: user_for_transfer.email,      
            amount: req.body.transfer_amount.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            sender: user.full_name   
        }),
      (err, info) => {          
        if (err) return console.log(err.message);
          console.log("credit mail sent", info.response);

      }         
    );

    res.status(200).json({
      error: false,
      message: "you successfully initiated a transfer",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;


