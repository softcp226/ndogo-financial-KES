const Joi = require("joi");
const validate_create_investment = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().max(1000),
    amount: Joi.number().required().min(0),
    plan_name: Joi.string().required().max(1000),
    // currency: Joi.string().required().max(1000),
    // return_time: Joi.string().required().max(1000),
    // profit: Joi.number().required().min(0),
  });
  const result = schema.validate({
    user: req.user,
    amount: req.investment_amount,
    plan_name: req.plan_name,
    // currency: req.currency,
    // return_time: req.return_time,
    // profit: req.profit,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_create_investment;
