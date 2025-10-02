const express =  require("express")
const app = express()
require("dotenv").config()
const connect = require("./database/db.connect")
const userrouter = require("./route/user.route")

app.use(express.json())
app.use("/user", userrouter)


connect()
const port = 8005
app.listen(port,()=>{
    console.log(`app started at port ${port}`);
    
})