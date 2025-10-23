const express = require("express")
const userrouter = express.Router()

const {UserSignup, UserLogin, VerifyToken, Verifypage, ProfileUpdate} = require("../controller/user.controller")
const Authprotect = require("../middleware/Authmiddleware")
const userValidation = require("../middleware/userValidation")
const validator = require("../middleware/validator")

userrouter.post("/signup",validator(userValidation),UserSignup)
userrouter.post("/login",UserLogin)
userrouter.get("/verify",VerifyToken)
userrouter.get("/email/verify/:otp",Verifypage)
userrouter.patch("/profile/update", Authprotect,ProfileUpdate)


module.exports = userrouter