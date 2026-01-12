require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
// const config = require("config");
const connectDB = (message) => {
  const db_link = process.env.db_Url;
  // console.log(db_link);
  // const db_link = config.get("db_Url");
  mongoose
    .connect(db_link)
    .then(() => console.log(message))
    .catch((err) => console.log(err.message));
};
module.exports = connectDB;
