const connectDB = require("./dbConnector");
const mongoose = require("mongoose");
connectDB("connected to admin database");

const adminSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    maxlength: 1000,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
