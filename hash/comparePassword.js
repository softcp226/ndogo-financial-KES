const bcrypt=require("bcrypt")

const checkPassword=async(password,hashedPassword)=>{
console.log("checking password", password, hashedPassword)
const checkedPassword=await bcrypt.compare(password,hashedPassword)
return checkedPassword

}

module.exports=checkPassword