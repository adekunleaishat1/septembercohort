const express = require("express")
const userrouter = express.Router()

const {UserSignup} = require("../controller/user.controller")


userrouter.post("/signup",UserSignup)


module.exports = userrouter