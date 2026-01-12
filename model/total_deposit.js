const mongoose = require("mongoose");
const connect = require("./dbConnector");
connect("connected to user database");

const total_deposit_Schema = mongoose.Schema({
  total_deposit: {
    type: Number,
    required: true,
    
  },
});

const Total_deposit = mongoose.model("total_deposit", total_deposit_Schema);
module.exports = Total_deposit;
