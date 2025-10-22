const jwt = require("jsonwebtoken")

const Authprotect =  async(req, res, next) =>{
    try {
        const authheader = req.headers.authorization
        console.log(authheader);
        
        if (!authheader || !authheader.startsWith("Bearer")) {
           return res.status(401).json({message:"header is missing."}) 
        }
        const token = authheader.split(" ")[1]
        if (!token) {
           return res.status(401).json({message:"Invalid token."}) 
        }
       const verifiedToken =  await jwt.verify(token, process.env.SECRETKEY)
       if (!verifiedToken) {
           return res.status(400).json({message:"token verification failed."}) 
       }
       req.user = verifiedToken?.id
       next()
    } catch (error) {
     return res.status(500).json({message:error.message}) 
    }
}

module.exports = Authprotect