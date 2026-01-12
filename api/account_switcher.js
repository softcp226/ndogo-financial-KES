const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const verifyToken = require("../token/verifyToken");
const validate_user = require("../validation/validate_account_switcher");
const check_inv_expiration = require("../api_func/check_invest_exp");
Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_user(req.body);
  if (request_isvalid != true)
    res.status(400).json({ error: true, errMessage: request_isvalid });
  try {
    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(404).json({
        error: true,
        errMessage: "invalid request, please login to view your investments",
      });

    const check_inv_exp_result = await check_inv_expiration(req);
    // console.log(await check_inv_exp_result);

  user.set({last_login:req.body.account_type})
  await user.save()
  // console.log(user)
  res.status(200).json({error:false, message:user})
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;


