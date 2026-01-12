const Joi = require("joi");

const validate_user = (req) => {
  const schema = Joi.object({
    user:Joi.string().required().max(1000),
    first_name: Joi.string().required().max(1000),
    last_name: Joi.string().required().max(1000),
    password: Joi.string().required().max(1000),
  });
  const result = schema.validate({
    user:req.user,
    first_name: req.first_name,
    last_name: req.last_name,
    password: req.password,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_user;
