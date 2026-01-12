const Transaction = require("../model/transaction");





const create_withdrawal_transaction = async (req,userdetails) => {
  let currentdate = new Date();
  let datetime = `${currentdate.getFullYear()}-${
    currentdate.getMonth() + 1
  }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
  let ref = Math.floor(Math.random() * 100);

  const transaction = await new Transaction({
    user: req.body.user,
    refrence: `Withdrawal `,
    transaction_date: datetime,
    debit: `-KSH${req.body.withdrawal_amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    status: "pending",
  });

  await transaction.save();
  return transaction;
};

module.exports = create_withdrawal_transaction;
