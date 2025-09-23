const express = require("express")
const app = express()
 const ejs =   require("ejs")
 const mongoose = require("mongoose")
require("dotenv").config()
const connect = require("./Database/db.connect")
const usermodel = require("./model/user.model")
const userrouter = require("./route/user.route")

 // midddlewares
 app.set("view engine", "ejs")
 app.use(express.urlencoded())
app.use("/", userrouter)


let currentUser = ''
 let errormessage = ''

 // CRUD CREATE READ UPDATE DELETE
 // QUERIES

const todoschema = new mongoose.Schema({
  title:{type:String, required:true},
  description:{type:String, required:true},
  user:{type:mongoose.Schema.Types.ObjectId,ref:"users" }
})
const todomodel =  mongoose.model("todo", todoschema)

   
const user = []

 


  

  app.get("/user/:id",(req, res)=>{
    console.log(req.params.id);
   const oneuser =  allusers.find((user)=> user.id == req.params.id)
      console.log(oneuser);
      res.json({oneuser})
  })

  app.get("/signup",(req, res)=>{
   res.render("signup", {errormessage})

  })

  app.get("/login",(req, res)=>{
       res.render("login",{errormessage})
  })

  const todo = []

  app.get("/todo", async(req, res)=>{
     if (!currentUser) {
         res.redirect("/login")
     }else {
      const alltodo = await todomodel.find({user:currentUser}).populate("user","username")
      console.log(alltodo);
      
      res.render("todo",{alltodo})      
     }
  })

  app.get("/edittodo/:id", async (req, res)=>{
    console.log(req.params);
    const {id} = req.params
    // console.log(todo[index]);
    const onetodo = await todomodel.findOne({
      _id:id
    })
    res.render("edit",{onetodo, id})
  })

  app.post("/addtodo", async (req, res) =>{
   try {
      console.log(req.body);
    const {title , description} = req.body
    if (!title || !description) {
      message = "All fields are mandatory"
      return res.redirect('/todo') 
    }
     const createdtodo =  await todomodel.create({
      title,
      description,
      user:currentUser
     })
     if (createdtodo) {
         return res.redirect('/todo') 
     }
   } catch (error) {
    console.log(error);
    
   }
  })
  
  app.post("/todo/delete", async(req ,res)=>{
    try {
         console.log(req.body.id);
         const {id} = req.body
     const deletedtodo = await todomodel.findByIdAndDelete(id)
     if (deletedtodo) {
      res.redirect("/todo")
     }
      
    } catch (error) {
      console.log(error);
      
   }
  })
  app.post("/todo/update/:id", async(req, res)=>{
   try {
       const { id } = req.params
       console.log(req.body);
       const {title, description} = req.body
     const updated =  await  todomodel.findByIdAndUpdate(
        id,
        {$set:{title,description}}
      )
      if (updated) {
         res.redirect("/todo")
      }
     
   } catch (error) {
    console.log(error);
    
   }
  })
  app.post("/user/signup", async (req, res)=>{
   try {
       console.log(req.body);
     const newuser =  await usermodel.create(req.body)
       console.log(newuser);
       if (newuser) {
        res.redirect("/login")
       }
   } catch (error) {
    console.log(error);
    if (error.message.includes("Septembersecondcohort.users index: email_1 dup key")) {
      errormessage = "User already exist"
     return res.redirect("/signup")
    }
    if (error.message.includes("users validation failed")) {
      errormessage = "All fields are mandatory"
       return res.redirect("/signup")
    }
     errormessage = "Network error"
     return res.redirect("/signup")
   }
  })

  app.post("/user/login", async (req, res)=>{
     console.log(req.body);
     const { email, password} = req.body
    const existuser = await usermodel.findOne ({email})
    console.log(existuser);
    
    if (existuser && existuser.password == password) {
      console.log("login successful");
      currentUser = existuser._id
      console.log(currentUser);
      
      res.redirect("/todo")
    }else{
      console.log("invalid user ");
      errormessage = "user does not exist , please Signup!!!."
      res.redirect("/login")
      
    }
   
     
  })


  
 connect()

  const port = 8005
  app.listen(port,()=>{
      console.log(`app started at port ${port}`);
      
  })






  