const User = require("../model/user");
const Investment = require("../model/investment");
const Transaction = require("../model/transaction");

const current_date = () => {
  let currentdate = new Date();
  let datetime = `${currentdate.getFullYear()}-${
    currentdate.getMonth() + 1
  }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
  return datetime;
};
const cancel_investment = async (investment) => {
  try {
    const user = await User.findById(investment.user);
    if (!user)
      return {
        error: true,
        errMessage:
          "invalid request, user please login again to fetch investment",
      };

    user.set({
        virtual_final_balance:
        parseInt(user.virtual_final_balance) +
        parseInt(investment.amount) +
        parseInt(investment.pending_profit),

        virtual_active_investment:
        parseInt(user.virtual_active_investment) - parseInt(investment.amount),
    });


    const transaction = await new Transaction({
      user: investment.user,
      refrence_number: `#Trade Return`,
      transaction_date:current_date(),
      credit: `+$${parseInt(investment.amount+investment.pending_profit)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      status: "success",
      virtual:true
    });
  
    await Investment.findByIdAndDelete(investment._id);
   Promise.all([ user.save(), transaction.save()])
    return { error: false, message: "success, you cancelled an investment" };
  } catch (error) {
    return { error: true, errMessage: error.message };
  }
};

const check_inv_expiration = async (req) => {
  try {
    const investments = await Investment.find({ user: req.body.user,virtual:true });

    if (investments.length < 1)
      return {
        error: true,
        errMessage: "sorry,you have not made any investment",
      };
    let up_date = new Date();
    up_date.setDate(up_date.getDate());
    let today = up_date.getTime();

    investments.forEach(async (investment) => {
      if (parseInt(investment.investment_end_date) <= parseInt(today)) {
        console.log(investment);

        return await cancel_investment(investment);
        // return c_inv;
      } else {
        return {
          error: false,
          message: "investment is still in proccess and has'nt ended",
        };
      }
    });
  } catch (error) {
    return { error: true, errMessage: error.message };
  }
};
module.exports = check_inv_expiration;
