const express = require("express");
const Router = express.Router();
const verifyToken = require("../secure-admin-api/verifyToken");
const User = require("../model/user");
const Admin = require("../model/admin");
const validate_admin_set_billing = require("../validation/validate_admin_set_billing");

Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_admin_set_billing(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "the user you requested to set bill for was not found",
      });
  
user.set({
    billing : true,
    bill_message:req.body.bill_message
})
await user.save()
res.status(400).json({error:false, message:"success" })

  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
