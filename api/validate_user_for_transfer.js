const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const verifyToken = require("../token/verifyToken");
const validate_find_user = require("../validation/validate_user_for_transfer.js");
// const check_inv_expiration = require("../api_func/check_invest_exp");

Router.post("/", verifyToken, async (req, res) => {
  // console.log(req.body)
  const request_isvalid = validate_find_user(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });
  const user = await User.findById(req.body.user);

  if (!user)
    return res.status(400).json({
      error: true,
      errMessage:
        "an unexpected error occured please login again to make this request",
    });

    const user_for_transfer= await User.findOne({email:req.body.email})
  if (!user_for_transfer)           
    return res.status(400).json({
      error: true,
      errMessage: "user with that email does not exist",
    });

    if(user_for_transfer._id.toString() === user._id.toString())    
    return res.status(400).json({
      error: true,
      errMessage: "You cannot transfer funds to yourself",
    });

//   const check_inv_exp_result = await check_inv_expiration(req);
  // console.log(await check_inv_exp_result);

  res.status(200).json({ error: false, message: user_for_transfer.full_name });
});
module.exports = Router;
// console.log