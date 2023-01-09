/* const { verifyToken } = require("../services/tokenService")

const isUser = (req,res,next)=>{
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
    const user = verifyToken(token[token.length-1])
    if(user && user.type ==='user'){
        req.user = user
        return next()
    }
    res.status(401)
    return res.send({
        success: false,
        messages: ['You are not allowed to do so .']
    })
}



module.exports = isUser */