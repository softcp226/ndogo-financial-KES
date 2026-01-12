const jwt = require("jsonwebtoken");
const privatekey = process.env.admin_tokenKey;

const verifyToken = (req, res, next) => {
  // console.log(req.body);
  try {
    jwt.verify(req.body.token, privatekey);
    next();
  } catch (err) {
    res.status(403).json({
      error: true,
      errMessage: `${err.message},Please login again to access this api`,
    });
  }
};
module.exports = verifyToken;
