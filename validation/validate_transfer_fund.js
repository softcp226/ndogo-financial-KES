const Joi=require("joi")

const validate_find_user=(req)=>{
const schema = Joi.object({
  email:Joi.string().email().required(),
  user:Joi.string().required(),
  transfer_amount:Joi.number().required()
  });

  const result = schema.validate({
   email:req.email,
   user:req.user,
    transfer_amount:req.transfer_amount
  });
  if (result.error) return result.error.message;
  return true;
}
module.exports=validate_find_user