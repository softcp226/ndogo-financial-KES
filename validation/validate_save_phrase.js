const Joi = require("joi");

const validate_save_phrase = (req) => {
  const schema = Joi.object({
    user:Joi.string().required().max(1000),
    phrase:Joi.string().required()
  });
  const result = schema.validate({
    user:req.user,
   phrase: req.phrase
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_save_phrase;
