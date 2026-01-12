const Joi=require("joi")

const validate_find_user=(req)=>{
const schema = Joi.object({
  email:Joi.string().email().required(),
  user:Joi.string().required()
  });

  const result = schema.validate({
   email:req.email,
   user:req.user
  });
  if (result.error) return result.error.message;
  return true;
}
module.exports=validate_find_user