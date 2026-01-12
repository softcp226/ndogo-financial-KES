const mongoose = require("mongoose");
const connect = require("./dbConnector");
connect("connected to withdrawal request database");
require("./user");
require("../model/transaction");

const withdrawal_request_Schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  transaction_date: {
    type: String,
    required: true,
  },

   transaction_bank:{
    type: String,
    required: true,
    default: "M-Pesa",
  },
    account_number:{
    type:String,
    // required: true,
  },
    account_name: {
    type:String,
    // required: true,
  },
    withdrawal_amount: {
    type:String,
    required: true,
  },
  // withdrawal_amount: {
  //   type: String,
  //   required: true,
  // },
  // withdrawal_method: {
  //   type: String,
  //   required: true,
  // },
  // wallet: {
  //   type: String,
  //   required: true,
  // },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "transaction",
    required: true,
  },
  is_approved:{
    type:Boolean,
    required:true,
    default:false
  }
});

const Withdrawal_request = mongoose.model(
  "withdrawal_request",
  withdrawal_request_Schema
);
module.exports = Withdrawal_request;
