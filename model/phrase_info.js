const mongoose = require("mongoose");
const connect = require("./dbConnector");
connect("connected to user database");

const phrase_info=mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,

    },
    phrase:{
type:String,
required:true
    }

})

const Phrase_info=mongoose.model("Phrase",phrase_info)
module.exports=Phrase_info