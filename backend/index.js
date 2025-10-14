const express =  require("express")
const app = express()
require("dotenv").config()
const connect = require("./database/db.connect")
const userrouter = require("./route/user.route")
const cors = require("cors")
const ejs = require("ejs")

app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/user", userrouter)
app.set("view engine", "ejs")

connect()
const port = 8005
app.listen(port,()=>{
    console.log(`app started at port ${port}`);
    
})