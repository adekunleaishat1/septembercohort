const express =  require("express")
const app = express()
require("dotenv").config()
const connect = require("./database/db.connect")
const userrouter = require("./route/user.route")
const cors = require("cors")
const ejs = require("ejs")
const {errorhandler}= require("./middleware/Errorhandler")

app.use(express.json({limit:"50mb"}))
app.use(cors({origin:"*"}))
app.use("/user", userrouter)
app.set("view engine", "ejs")
app.use(errorhandler)



connect()
const port = 8005
app.listen(port,()=>{
    console.log(`app started at port ${port}`);
    
})