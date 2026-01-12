const Transaction = require("../model/transaction");

const create_transfer_transaction = async (req,user,user_for_transfer) => {

    try {
        
 

  let currentdate = new Date();
  let datetime = `${currentdate.getFullYear()}-${
    currentdate.getMonth() + 1
  }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
  let ref = Math.floor(Math.random() * 100);

  const debit_transaction = await new Transaction({
    user: user._id,
    refrence: `Transfer to ${user_for_transfer.full_name}`,
    transaction_date: datetime,
    debit: `-KSH${req.body.transfer_amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    status: "success",
  });

    const credit_transaction = await new Transaction({  
    user: user_for_transfer._id,
    refrence: `Transfer from ${user.full_name}`,
    transaction_date: datetime,
        
    credit: `+KSH${req.body.transfer_amount
      .toString()       
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    status: "success",  
    });

    Promise.all([
      debit_transaction.save(),
      credit_transaction.save(),
    ]);
    return {
      error: false,
      message: "Transaction created successfully",
      debit_transaction,
      credit_transaction,
    };
//   await transaction.save();
//   return transaction;
   } catch (error) {
       return { error: true, errMessage: error.message }; 
    }
};

module.exports = create_transfer_transaction;
