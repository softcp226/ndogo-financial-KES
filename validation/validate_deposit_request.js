const Joi = require("joi");

const validate_deposit_request = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().max(1000),
    deposit_amount: Joi.number().required().min(0),
    plan_name: Joi.string().required().max(1000),

  });

  const result = schema.validate({
    user: req.user,
    deposit_amount: req.deposit_amount,
    plan_name:req.plan_name
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_deposit_request;
