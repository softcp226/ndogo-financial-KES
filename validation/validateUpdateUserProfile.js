const Joi = require("joi");

const validate_updateuser_profile = (req) => {
  const Schema = Joi.object({
    user: Joi.string().required(),
  });
  const result = Schema.validate({
    user: req.user,
  });

  if (result.error) return result.error.message;
  return true;
};

module.exports = validate_updateuser_profile;
