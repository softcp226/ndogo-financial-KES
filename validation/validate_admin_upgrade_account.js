const Joi = require("joi");
const validate_admin_upgrade_account = (req) => {
  const schema = Joi.object({
    admin: Joi.string().required().max(1000),
    user: Joi.string().required().max(1000),
    min_investment:Joi.string().required().max(1000)
  });
  const result = schema.validate({
    admin: req.admin,
    user: req.user,
    min_investment: req.min_investment,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_admin_upgrade_account;
