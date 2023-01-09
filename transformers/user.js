const userTransformer = (user)=>{
//here we will change something
console.log(user)
if(user?.dataValues?.password){
    delete user.dataValues.password
}


return user
}

module.exports = {
    userTransformer
}