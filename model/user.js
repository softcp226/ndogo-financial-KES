const mongoose = require("mongoose");
const connect = require("./dbConnector");
connect("connected to user database");
require("./user");


const userSchema = mongoose.Schema({
   full_name: {
    type: String,   
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

  final_balance: {
    type: Number,
    default: 0,
  },
  accumulated_profit:{
    type: Number,
    default: 0,
  },
  // virtual_final_balance:{
  //   type: Number,
  //   default: 1000,
  // },
  // profit_loss: {
  //   type: Number,
  //   default: 0,
  // },
  // virtual_profit_loss:{
  //   type: Number,
  //   default: 0,
  // },
  active_investment: {
    type: Number,
    default: 0,
  },
  virtual_active_investment: {
    type: Number,
    default: 0,
  },
  
  referral_bonus: {
    type: Number,
    default: 0,
  },
  referral_link: String,
  referral: String,
  
  min_investment: {
    type: Number,
    required: true,
    default: 0,
  },
  made_first_deposit: {
    type: Boolean,
    required: true,
    default: false,
  },
  first_deposit: {
    type: Number,
    default: 0,
    required: true,



  },

  // last_login:{
  //   type:String,
  //   required:true,
  //   default:"real_account",
  //   enum:["demo_account", "real_account"]
  // },
  // account_type:{
  //    type:String,
  //   required:true,
  //   default:"USD",
  //   enum:["KES","USD"],
  // },
  // created_same_investment_ealier: {
  //   type: Number,
  //   default: 0,
  // },
  // prev_investment: {
  //   type: Number,
  //   default: 0,
  // },
  billing:{
type:Boolean,
required:true,
default:false
  },
  billing_message:{
    type:String,
    required:true,
    default:"**Error:** Your trading signal has expired. Add a new signal to enjoy unlimited trading."

  },

  registration_date:{
    type:String,
    required:true,

  },

  password: {
    type: String,
    required: true,
  },

  reached_trial_limit: {
    type: Boolean,    
    required: true,
    default: false,     
  },
  trial_number: {
    type: Number,
    default: 0,
  }

});

const User = mongoose.model("user", userSchema);
module.exports = User;
// country