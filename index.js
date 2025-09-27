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



   
const user = []

 


  

  app.get("/user/:id",(req, res)=>{
    console.log(req.params.id);
   const oneuser =  allusers.find((user)=> user.id == req.params.id)
      console.log(oneuser);
      res.json({oneuser})
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


  
 connect()

  const port = 8005
  app.listen(port,()=>{
      console.log(`app started at port ${port}`);
      
  })






  