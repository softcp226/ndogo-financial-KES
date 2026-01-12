const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const Investment = require("../model/investment");
const verifyToken = require("../token/verifyToken");
const validate_cancel_investment = require("../validation/validate_cancel_investment");
const Transaction = require("../model/transaction");

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
    let investment = await Investment.findOne({_id:req.body.investment, virtual:true});
    let user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "please login again to cancel an investment",
      });
    if (!investment)
      return res.status(400).json({
        error: true,
        errMessage:
          "the investment you requested to cancel no longer exist please refresh and try again",
      });

        user.set({
          virtual_final_balance: user.virtual_final_balance + parseInt(investment.amount),
          // parseInt(investment.profit) -
          // investment.loss,
          virtual_active_investment:
            parseInt(user.virtual_active_investment) - parseInt(investment.amount),
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
      virtual:true
    });

    Promise.all([user.save(), transaction.save()])
console.log(transaction)

    res
      .status(200)
      .json({ error: false, message: "success, you canceled an investment" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
