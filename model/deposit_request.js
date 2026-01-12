const mongoose = require("mongoose");
const connect = require("./dbConnector");
connect("connected to deposit_request database");
require("./user");
require("../model/transaction");
const deposit_request_Schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  deposit_amount: {
    type: Number,
    required: true,
  },

  selected_plan: {
    type: String,
    required: true,
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "transaction",
    required: true,
  },
  receipt:String,
 
});

const Deposit_request = mongoose.model(
  "deposit_request",
  deposit_request_Schema,
);
module.exports = Deposit_request;
