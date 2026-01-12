const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const Investment = require("../model/investment");
const Transaction = require("../model/transaction");

const verifyToken = require("../token/verifyToken");
const validate_cancel_investment = require("../validation/validate_cancel_investment");

const current_date = () => {
  let currentdate = new Date();
  let datetime = `${currentdate.getFullYear()}-${
    currentdate.getMonth() + 1
  }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
  return datetime;
};

Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_cancel_investment(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    let investment = await Investment.findOne({_id:req.body.investment,virtual:false});
    let user = await User.findById(req.body.user);
    // console.log("invest...", investment, "user ", user)

    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "please login again to cancel an investment",
      });
    if (investment.length <=0)
      return res.status(400).json({
        error: true,
        errMessage:
          "the investment you requested to cancel no longer exist please refresh and try again",
      });

        user.set({
          final_balance: parseInt(user.final_balance) + parseInt(investment.amount),
          // parseInt(investment.profit) -
          // investment.loss,
          active_investment:
            parseInt(user.active_investment) - parseInt(investment.amount),
        });
    await Investment.findByIdAndDelete(req.body.investment);

    const transaction = await new Transaction({
      user: req.body.user,
      refrence_number: `#Cancelled Trade`,
      transaction_date:current_date(),
      credit: `+$${parseInt(investment.amount)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      status: "success",
    });

    Promise.all([ user.save(), transaction.save()])
// console.log("transaction", transaction)
    res
      .status(200)
      .json({ error: false, message: "success, you canceled an investment" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;



// console.log