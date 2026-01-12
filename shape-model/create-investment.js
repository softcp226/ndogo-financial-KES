const Investment = require("../model/investment");
const Transaction = require("../model/transaction");

const investment_end_date = (req) => {
  let date3 = new Date();
  date3.setDate(date3.getDate() + 1);
  let end_date3 = date3.getTime();
  return end_date3;
}

const return_on_investment = (req) => {

  switch (req.body.plan_name) {
    case "Trial Plan":
      const percentage = Math.random() * (10 - 9) + 9;
      const profit = Math.round(req.body.investment_amount / 100 * percentage);
      return profit;
      break;

    case "Biashara Vault":
      const percentage2 = Math.random() * (15 - 11) + 11;
      const profit2 = Math.round(req.body.investment_amount / 100 * percentage2);
      return profit2;
      break;

    case "Imara Vault":
      const percentage3 = Math.random() * (16 - 12) + 12;
      const profit3 = Math.round(req.body.investment_amount / 100 * percentage3);
      return profit3;
      break;

    case "Uwezo Vault":
      const percentage4 = Math.random() * (21 - 18) + 18;   
      const profit4 = Math.round(req.body.investment_amount / 100 * percentage4);
      return profit4;       
      break;
     
      case "Legacy Vault":
        const percentage5 = Math.random() * (25 - 20) + 20;     
        const profit5 = Math.round(req.body.investment_amount / 100 * percentage5);
        return profit5;
        break;


    default:
      return 0;
      break;
  }

}


// if (req.body.return_time == "daily_return") {
//   // let currentdate = new Date();
//   // currentdate.setDate(currentdate.getDate() + 1);
//   // let datetime = `${currentdate.getFullYear()}-${
//   //   currentdate.getMonth() + 1
//   // }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
//   // return datetime;
//   let date = new Date();
//   date.setDate(date.getDate() + 1);
//   let end_date = date.getTime();
//   return end_date;
// } else {
//   // let currentdate = new Date();
//   // currentdate.setDate(currentdate.getDate() + 7);
//   // let datetime = `${currentdate.getFullYear()}-${
//   //   currentdate.getMonth() + 1
//   // }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
//   // return datetime;

//   let date = new Date();
//   date.setDate(date.getDate() + 7);
//   let end_date = date.getTime();
//   return end_date;
// }

const create_investment = async (req, userdetails) => {
  let currentdate = new Date();
  let datetime = `${currentdate.getFullYear()}-${currentdate.getMonth() + 1
    }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
  let ref = Math.floor(Math.random() * 1000);
  console.log("end time", investment_end_date(req));

  const investment = await new Investment({
    user: req.body.user,
    plan_name: req.body.plan_name,
    transaction_date: datetime,
    // refrence_number: `Ref#${++ref} `,
    amount: req.body.investment_amount,
    pending_profit: return_on_investment(req),
    investment_end_date: investment_end_date(req),
  });


  const transaction = await new Transaction({
    user: req.body.user,
    refrence: `Reinvested`,
    transaction_date: datetime,
    debit: `-KSH${req.body.investment_amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,

    status: "success",
  });
  console.log(transaction)

  Promise.all([transaction.save(), investment.save()])

  return investment;
};
module.exports = create_investment;
