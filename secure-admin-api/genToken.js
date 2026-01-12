const jwt = require("jsonwebtoken");
const privatekey = process.env.admin_tokenKey;

const genToken = (user_id) => {
  const token = jwt.sign({ user_id }, privatekey);
  return token;
};
// console.log(genToken("929haji98298hahjhj"))
module.exports = genToken;
