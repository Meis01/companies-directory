
const models = require('../models');
const {hashPassword, verifyPassword} = require('../services/passwordService')
const { validateName, validateEmail, validatePassword } = require("../services/validationService");
const { userTransformer } = require('../transformers/user');

const store =  async(req,res,next)=>{
    const result={
        success: true,
        data:null,
        messages: []
    }
const {name='', email='', password=''}=req.body
// validation

if (!validateName(name)){
    result.success=false,
    result.messages.push('Please enter a valid name')

}
if (!validateEmail(email)){
    result.success=false,
    result.messages.push('Please enter a valid email')

}
if (!validatePassword(password)){
    result.success=false,
    result.messages.push('Please enter a valid password')

}
if(!result.success){
    // validation failed
    res.send(result)
    return 
}


// store in database
const [user,created] = await models.User.findOrCreate(
  {
    where: {
        email: email
    },
    defaults: {
        name,
        password: hashPassword(password)
    }
  }
   
)
/* console.log('New USer',created)
console.log('user instance',user) */
if(created){
result.messages.push('User created successfully')
}
else{
    result.success = false
    result.messages.push("You are already registered!")
}
// send response
return res.send(result)
}

//Login
const login = async(req,res,next)=>{
    const result={
        success: true,
        data:null,
        messages: []
    }
    const {email='',password=''} = req.body
    if (!validateEmail(email)){
        result.success=false,
        result.messages.push('Please enter a valid email')
    
    }
    if (!validatePassword(password)){
        result.success=false,
        result.messages.push('Please enter a valid password')
    
    }
    if(!result.success){
        // validation failed
        res.send(result)
        return 
    }
    //Validation passed - get the user
    const user = await models.User.findOne({
        where:{
            email //we don't need pasword 
        }
    })
   // console.log(user)
   if(user) {
    //compare password
    if(verifyPassword(password,user.password)){
        result.data =  userTransformer(user)//user
        result.messages.push("logged in successfully...")
        //send token later
    }else{
        result.success = false
        result.messages.push("Invalid Password!") 
    }
   // result.data = user

   }
   else{
    result.success = false
    result.messages.push("You don't have an account but you are welcome!")
   }
   return res.send(result)
}


module.exports={
    store,
    login
}