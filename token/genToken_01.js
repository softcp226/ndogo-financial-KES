const jwt = require("jsonwebtoken");

const genToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.token_key01);
  return token;
};

module.exports = genToken;
