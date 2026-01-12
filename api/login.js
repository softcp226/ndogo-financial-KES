const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const genToken = require("../token/genToken");
const verifyPassword = require("../hash/comparePassword");
const validateLogin = require("../validation/validateLogin");
const check_investment_expiration_on_login = require("../api_func/check_investment_expiration_on_login");

Router.post("/", async (req, res) => {
  console.log(req.body);
  const isvalid = validateLogin(req.body);
  if (isvalid != true)
    return res.status(400).json({ error: true, errMessage: isvalid });
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("use", user);
    if (!user)
      return res
        .status(400)
        .json({ error: true, errMessage: "invalid Email or Password " });

   
    const passwordIsverified = await verifyPassword(
      req.body.password,
      user.password,
    );
    console.log(passwordIsverified);
    if (passwordIsverified != true)
      return res
        .status(400)
        .json({ error: true, errMessage: "invalid Email or password " });

 

    const token = genToken(user._id);

    const check_inv_exp_result = await check_investment_expiration_on_login(
      user._id,
    );
    // console.log(await check_inv_exp_result);

    res.status(200).json({
      error: false,
      message: { user: user._id },
      token,
    });
  } catch (err) {
 console.log(err)
    res.status(400).json({ error: true, errMessage: err.message });
  }
});

module.exports = Router;

