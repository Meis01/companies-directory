/* const { verifyToken } = require("../services/tokenService")

const isCompany = (req,res,next)=>{
    const auth = req?.headers?.authorization
    //console.log(req.headers)
    if(!auth){
        //return an error
        res.status(401)
        return res.send({
            success: false,
            messages: ['Please provide a valid auth header']
        })
    }
    const  token = auth.split(' ')
    console.log(verifyToken(token[token.length-1]))
    const company = verifyToken(token[token.length-1])
    if(company && company.type ==='company'){
        req.admin = admin
        return next()
    }
    res.status(401)
    return res.send({
        success: false,
        messages: ['You are not allowed to do so .']
    })
}



module.exports = isCompany */