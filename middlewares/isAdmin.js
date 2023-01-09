/* const { verifyToken } = require("../services/tokenService")

const isAdmin = (req,res,next)=>{
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
    const admin = verifyToken(token[token.length-1])
    if(admin && admin.type ==='admin'){
        req.admin = admin
        return next()
    }
    res.status(401)
    return res.send({
        success: false,
        messages: ['You are not allowed to do so .']
    })
}



module.exports = isAdmin */

const isAuthorized = require('./isAuthorized')

const isAdmin = (req, res, next) => {
    return isAuthorized(req, res, next, {
        admin: {matchId: false}
    })
}

module.exports = isAdmin