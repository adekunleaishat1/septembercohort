const usermodel = require("../model/user.model")

const UserSignup = async(req, res) =>{
    try {
        console.log(req.body);
        const {username , email, password} = req.body
        if (!username || !email || !password) {
          return res.status(400).json({message:"All fields are mandatory", status:false})  
        } 
      const newUser =  await usermodel.create({username, email, password})
      if (newUser) {
          return res.status(200).json({message:"User Signup successful", status:true})  
      }
    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
         return res.status(500).json({message:"User already exist", status:false})      
        }
     return res.status(500).json({message:error.message, status:false})  
    }
}

module.exports = {UserSignup}