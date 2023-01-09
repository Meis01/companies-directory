/* const language = (req,res,next)=>{
    console.log(req.headers)
    const languages = ['en','ar']
    let lng = languages[0]
    const userLanguages = req?.headers?.['accept-language']
    if(languages.indexOf(userLanguages) > -1) {
lng = userLanguages
    }
    req.lng = lng
    console.log(lng)
   return next ()
   
}/*  */ 