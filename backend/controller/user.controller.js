const usermodel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendVerificationMail = require("../utils/mailer")



const UserSignup = async(req, res) =>{
    try {
        console.log(req.body);
        const {username , email, password} = req.body
        if (!username || !email || !password) {
          return res.status(400).json({message:"All fields are mandatory", status:false})  
        } 
       const hashedPassword =  await bcrypt.hash(password, 10)
         const otp = Math.floor(Math.random() * 10000)
        const verificationLink = `http://localhost:8005/user/email/verify/${otp}`
         sendVerificationMail(email, username,verificationLink)
      const newUser =  await usermodel.create({username, email, password:hashedPassword,otp})

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

const UserLogin = async (req,res) =>{
  const {email , password} = req.body
  try {
    if (!email || !password) {
          return res.status(400).json({message:"All fields are mandatory", status:false})  
    }
   const existUser = await usermodel.findOne({email})
   if (!existUser) {
          return res.status(400).json({message:"User not Found , Please Sign UP!!!", status:false})  
   }
   const correctPassword = await bcrypt.compare(password, existUser.password)
   if (!correctPassword) {
       return res.status(400).json({message:"User not Found , Please Sign UP!!!", status:false})  
   }
    const token = await jwt.sign({email, id:existUser._id},process.env.SECRETKEY, {expiresIn:300} )
    return res.status(400).json({message:"Login Successful", status:true, token})  
  } catch (error) {
     return res.status(500).json({message:error.message, status:false})  
  }
}

const VerifyToken = async (req, res) =>{
  try {
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    if (!token) {
       return res.status(400).json({message:"Token Not found.", status:false})   
    }
  const verifiedToken =  await jwt.verify(token, process.env.SECRETKEY)
   if (verifiedToken) {
      const user =  await usermodel.findById(verifiedToken.id).select("_id username email verified")
      console.log(user);
     return res.status(200).json({message:"token verified", status:false, user})  
   }
  } catch (error) {
    console.log(error);
     return res.status(500).json({message:error.message, status:false})  
  }
}

const Verifypage = async (req,res) =>{
 try {
    const {otp} = req.params
    const validotp =  await usermodel.findOneAndUpdate(
      {otp},
      {$set:{verified:true},
      $unset:{otp}
      }
    )
    if (!validotp) {
      return res.send("Email verification failed")
    }
    return res.render("verify")
 } catch (error) {
  console.log(error);
 }
}
module.exports = {UserSignup, UserLogin, VerifyToken, Verifypage}