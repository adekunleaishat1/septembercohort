const express = require("express")
const userrouter = express.Router()
const {getlandingPage,getUserPage, getSignup,getlogin, gettodo, Signupuser, LoginUser} = require("../controller/user.controller")

  

 userrouter.get("/", getlandingPage)
userrouter.get("/user", getUserPage)
 userrouter.get("/signup",getSignup)
  userrouter.get("/login",getlogin)
  userrouter.get("/todo",gettodo)
  userrouter.post("/user/signup",Signupuser)
  userrouter.post("/user/login", LoginUser)

module.exports = userrouter


