const express = require("express")
const userrouter = express.Router()

const {UserSignup, UserLogin, VerifyToken, Verifypage, ProfileUpdate} = require("../controller/user.controller")


userrouter.post("/signup",UserSignup)
userrouter.post("/login",UserLogin)
userrouter.get("/verify",VerifyToken)
userrouter.get("/email/verify/:otp",Verifypage)
userrouter.patch("/profile/update",ProfileUpdate)


module.exports = userrouter