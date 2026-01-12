const mongoose = require("mongoose");
const connect = require("./dbConnector");
connect("connected to transaction database");
require("./user");
require("../model/deposit_request");

const transaction_Schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  transaction_date: {
    type: String,
    required: true,
    // default: Date.now(),
  },
  // deposit_request:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "deposit_request",
  //   required: true
  // },
 refrence:String,
  debit: String,
  credit: String,
  status: {
    type: String,
    required: true,
    enum: ["pending", "success", "failed"],
  },
  // virtual:{
  //   type: Boolean,
  //   required:true,
  //   default:false

  // }
});

const Transaction = mongoose.model("transaction", transaction_Schema);
module.exports = Transaction;
