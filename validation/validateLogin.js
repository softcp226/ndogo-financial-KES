const Joi=require("joi")

const validateLogin=(req)=>{
const schema=Joi.object({
    Email:Joi.string().email().required().max(1000),
    password:Joi.string().required().max(1000)
})

const result=schema.validate({Email:req.email,password:req.password})
if(result.error)return result.error.message
return true
}

module.exports=validateLogin


