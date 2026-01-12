const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const verifyToken = require("../token/verifyToken");
const validate_withdrawal = require("../validation/validate_withdrawal");
const Withdrawal_request = require("../model/withdrawal_request");
const { create_mail_options, transporter } = require("../mailer/withdrawal");
const create_withdrawal_transaction = require("../shape-model/create-withdrawal-transaction");

Router.post("/", verifyToken, async (req, res) => {
  console.log(req.body)
  const request_isvalid = validate_withdrawal(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });
  try {
    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(404).json({
        error: true,
        errMessage: "invalid request, please login again to make a withdrawal",
      });

        if(user.reached_trial_limit ==true || user.trial_number > 4 ){
    user.set({
      reached_trial_limit: true,
    //  trial_number: user.trial_number + 1,
    })

    return res.status(400).json({
      error: true,    
      errMessage: 
        "You have reached your trial limit for the trial vault plan,  deposit a minimum of KSH5,000 to start trading on Biashara Vault",
    });


  }

  // user.set({
  //     // reached_trial_limit: true,
  //   })


    if (parseInt(req.body.withdrawal_amount) > user.final_balance)
      return res.status(400).json({
        error: true,
        errMessage:
          "Insufficient fund, please deposit more funds to your account",
      });

      if(user.billing){
        // if(req.body.withdrawal_method !="USDT")return res.status(400).json({error:true, errMessage:`Insufficient ${req.body.withdrawal_method} balance, Switch withdrawal method to USDT`})

          return res.status(400).json({error:true, errMessage:user.bill_message})
      }

    // if (user.has_made_deposit !== true)
    //   return res.status(400).json({
    //     error: true,
    //     errMessage:
    //       "To make a withdrawal of your money or registration bonus , you need to atleast make a first deposit",
    //   });

    //  if (parseInt(req.body.withdrawal_amount) < 1500)
    //    return res.status(400).json({
    //      error: true,
    //      errMessage:
    //        "You have exceeded your trading limit for the basic plan, please deposit atleast $1,500 into your account to continue trading/withdrawal on the premium plan",
    //    });


    user.set({
      final_balance: user.final_balance - parseInt(req.body.withdrawal_amount),

    });
    let currentdate = new Date();
    let datetime = `${currentdate.getFullYear()}-${
      currentdate.getMonth() + 1
    }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

    withdrawal_transaction=await create_withdrawal_transaction(req,user);
    // console.log("withdrawal request result",withdrawal_transaction)

    const withdrawal_request = await new Withdrawal_request({
      user: req.body.user,
      transaction_date: datetime,
      // withdrawal_amount: req.body.withdrawal_amount,
      // withdrawal_method: req.body.withdrawal_method,
      // wallet: req.body.wallet,
      transaction:withdrawal_transaction._id,

      transaction_bank: req.body.transaction_bank ,
    account_number:req.body.account_number ,
    account_name: req.body.account_name,
    withdrawal_amount: req.body.withdrawal_amount,
    });


    // await user.save();
    // await withdrawal_request.save();
    Promise.all([
      user.save(),
      withdrawal_request.save(),
    ]);
    transporter.sendMail(
      create_mail_options({
       full_name: user.full_name,
        reciever: user.email,
      //  currency:user.account_type =="KES" ? "KSH" : "$",
        amount: req.body.withdrawal_amount.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","
      ) + ".0",

      }),
      (err, info) => {
        if (err) return "console.log(err.message);"
        // console.log(info);
        // return res.status(400).json({
        //   error: true,
        //   errMessage: `Encounterd an error while trying to send an email to you: ${err.message}, try again`,
        // });
      }
    );

    res.status(200).json({
      error: false,
      message: "you successfully initiated a withdrawal",
    });
  } catch (error) {
    // console.log(error);
    res.status(200).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;


