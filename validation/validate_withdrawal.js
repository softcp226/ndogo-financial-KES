const Joi = require("joi");
const validate_admin_fetchuser = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().max(1000),
    transaction_bank: Joi.string(),
     account_number:Joi.number().min(0),
    account_name: Joi.string(),
    withdrawal_amount: Joi.number().min(0),
    
    
  });
  const result = schema.validate({
    user: req.user,
     transaction_bank: req.transaction_bank,
     account_number:req.account_number,
    account_name:req.account_name,
    withdrawal_amount: req.withdrawal_amount,
    
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_admin_fetchuser;
