const Joi = require("joi");

const validate_user01 = (req) => {
  const schema = Joi.object({
    full_name: Joi.string().required(),
    Email: Joi.string().email().required().max(1000),
    phone_number: Joi.string().required().max(1000),
    country: Joi.string().required().max(1000),
    password: Joi.string().required().min(8).max(1000),
    referral: Joi.string().allow(""),
  });

  const result = schema.validate({
    full_name: req.full_name,
    Email: req.email,
    phone_number: req.phone_number,
    country: req.country,
    password: req.password,
    referral: req.referral,
  });
  if (result.error) return result.error.message;
  return true;
};

module.exports = validate_user01;
