const express = require("express")
const app = express()
 const ejs =   require("ejs")
 const mongoose = require("mongoose")
const { type } = require("os")
const { ref } = require("process")




 // midddlewares
 app.set("view engine", "ejs")
 app.use(express.urlencoded())



let currentUser = ''
 let errormessage = ''

 // CRUD CREATE READ UPDATE DELETE
 // QUERIES

const userschema = new mongoose.Schema({
   username:{type:String, required:true, trim:true},
   email:{type:String, unique:true, required:true, trim:true},
   password:{type:String, required:true, trim:true},
   verified:{type:Boolean, default:false},
   profilepicture:{type:String}
},{timestamps:true})

const usermodel =  mongoose.model("users", userschema)

const todoschema = new mongoose.Schema({
  title:{type:String, required:true},
  description:{type:String, required:true},
  user:{type:mongoose.Schema.Types.ObjectId,ref:"users" }
})
const todomodel =  mongoose.model("todo", todoschema)

   
const user = []
  const allusers = [
            {"id":"1","name":"patrick", "food":"semo", "class":"node"},
            {"id":"2","name":"lanre", "food":"rice", "class":"flutter"},
            {"id":"3","name":"Umar", "food":"baens", "class":"react"},
            {"id":"4","name":"ayomide", "food":"spagheti", "class":"angular"},
            {"id":"5","name":"ore", "food":"money", "class":"node"},
            {"id":"6","name":"yomi", "food":"amala", "class":"react"},
            {"id":"7","name":"john", "food":"shawama", "class":"vue"},
            {"id":"8","name":"bimpe", "food":"bread", "class":"node"},
            {"id":"9","name":"gbolahan", "food":"plantain", "class":"react"},
            {"id":"10","name":"ojett", "food":"bread", "class":"node"},
        ]


  app.get("/",(request, response)=>{
   console.log(__dirname, "dirname");
      response.render("index",{allusers, gender:"female"})
  })


  app.get("/user", (req, res)=>{
     res.json({
        "users":allusers
     })
  })


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

  app.get("/edittodo/:index",(req, res)=>{
    console.log(req.params);
    const {index} = req.params
    // console.log(todo[index]);
    const onetodo = todo[index]
    res.render("edit",{onetodo, index})
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
  
  app.post("/todo/delete",(req ,res)=>{
    console.log(req.body.index);
    todo.splice(req.body.index, 1)
    res.redirect("/todo")
  })
  app.post("/todo/update/:index",(req, res)=>{
     const {index } = req.params
     todo[index] = req.body
     res.redirect("/todo")
     
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


  const uri = "mongodb+srv://aishatadekunle877:aishat@cluster0.t92x8pf.mongodb.net/Septembersecondcohort?retryWrites=true&w=majority&appName=Cluster0"

    const connect = async () =>{
      try {
        const connect = await  mongoose.connect(uri)
        if (connect) {
          console.log("database connected successfully");
          
        }
      } catch (error) {
        console.log(error);
        
      }
    }

connect()

  
  const port = 8005
  app.listen(port,()=>{
      console.log(`app started at port ${port}`);
      
  })
