const Joi = require("joi");

const validateupdateUser = (req) => {
  const Schema = Joi.object({
    user: Joi.string().required(),
    full_name: Joi.string().required(),
    // last_name: Joi.string().required(),
    email: Joi.string().required(),
    phone_number: Joi.string().required(),
    country:Joi.string().required(),
  }).options({ stripUnknown: true });
  const result = Schema.validate({
    user: req.user,
    full_name: req.full_name,
    // last_name:req.last_name,
    email: req.email,
    phone_number: req.phone_number,
    country:req.country
  });

  if (result.error) return result.error.message;
  return true;
};

module.exports = validateupdateUser;
