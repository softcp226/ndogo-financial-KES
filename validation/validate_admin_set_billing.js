const Joi = require("joi");
const validate_admin_upgrade_account = (req) => {
  const schema = Joi.object({
    admin: Joi.string().required().max(1000),
    user: Joi.string().required().max(1000),
    billing_message:Joi.string().required().max(1000)
  });
  const result = schema.validate({
    admin: req.admin,
    user: req.user,
    billing_message: req.billing_message,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_admin_upgrade_account;
