const adminTransformer = (admin)=>{
    //here we will change something
    console.log(admin)
    if(admin?.dataValues?.password){
        delete admin.dataValues.password
    }
    
    
    return admin
    }
    
    module.exports = {
        adminTransformer
    }