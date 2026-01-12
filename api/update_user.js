const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const validate_updateuser = require("../validation/validateupdateuser.js");
const verifyToken = require("../token/verifyToken.js");

const validate_updateuser_profile = require("../validation/validateUpdateUserProfile.js");
const cloudinary = require("../file_handler/cloudinary");
const upload = require("../file_handler/multer");
const fs = require("fs");

Router.post("/", verifyToken, async (req, res) => {
  try {
    const request_isvalid = validate_updateuser(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });

    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "user not found, please login and try again",
      });
      // const email_exist = await User.findOne({email:req.body.email});
      // if(email_exist)return res.status(400).json({error:true, errMessage:`You can't use the email ${req.body.email} as it is already in use `})
    user.set({
      full_name: req.body.full_name,
      // last_name:req.body.last_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      country: req.body.country,
    });
    await user.save();
    return res.status(400).json({ error: false, message: user });
  } catch (error) {
    // console.log(error)
    res.status(400).json({ error: true, errMessage: error.message });
  }
});





Router.post(
  "/setprofile",
  upload.any("passport"),
  verifyToken,
  async (req, res) => {
    // console.log(req.body);
    // console.log(req.files);
    try {
      const request_isvalid = validate_updateuser_profile(req.body);
      if (request_isvalid != true)
        return res
          .status(400)
          .json({ error: true, errMessage: request_isvalid });

      const user = await User.findById(req.body.user);
      if (!user)
        return res.status(400).json({
          error: true,
          errMessage: "user not found, please login and try again",
        });

      const uploader = async (path) =>
        await cloudinary.uploads(path, "passport");
      let passport_url;
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        passport_url = newPath;
        fs.unlinkSync(path);
      }
      // console.log(passport_url);
      if (passport_url.error)
        return res.status(400).json({
          error: true,
          errMessage:
            "Something went wrong in the server while trying to upload your passport, please check passport and try again",
        });
      user.set({ passport: passport_url.url });
      await user.save();
      res.status(200).json({ error: false, message: user });
    } catch (error) {
      res.status(400).json({ error: true, errMessage: error.message });
    }
  },
);
module.exports = Router;


