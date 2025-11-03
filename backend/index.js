const express =  require("express")
const app = express()
require("dotenv").config()
const connect = require("./database/db.connect")
const userrouter = require("./route/user.route")
const {productRouter} = require("./route/product.route")
const cors = require("cors")
const ejs = require("ejs")
const {errorhandler}= require("./middleware/Errorhandler")
const socket = require("socket.io")
const Chat = require("./model/chat.model")
const usermodel = require("./model/user.model")

app.use(express.json({limit:"50mb"}))
app.use(cors({origin:"*"}))
app.use("/user", userrouter)
app.use("/product", productRouter)
app.set("view engine", "ejs")
app.use(errorhandler)



connect()
const port = 8005
const connection = app.listen(8005, () => {
    console.log(`app started at port 8005`);
})


const io = socket(connection,{
   cors:{origin:"*" } 
})

io.on("connection", async(socket)=>{
    console.log("new user connected", socket.id);
    socket.on("sendmessage",async (data)=>{
        console.log("message received:", data);
        await Chat.create({
            senderId: data.user,
            message: data.message
        })
        socket.emit("receivemessage", data)
    })
   const allchat = await Chat.find().populate("senderId","username email profilepicture")
   console.log("All chat:" , allchat);
   
   socket.emit("allmessages", allchat)
})