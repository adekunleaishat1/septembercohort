const express = require("express")
const app = express()
 const ejs =   require("ejs")


let currentUser = ''
 // midddlewares
 app.set("view engine", "ejs")
 app.use(express.urlencoded())
 let errormessage = ''
   
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
   res.render("signup")

  })

  app.get("/login",(req, res)=>{
       res.render("login",{errormessage})
  })

  const todo = []

  app.get("/todo",(req, res)=>{
    //  if (!currentUser) {
    //      res.redirect("/login")
    //  }else {
      res.render("todo",{todo})      
    //  }
  })

  app.get("/edittodo/:index",(req, res)=>{
    console.log(req.params);
    const {index} = req.params
    // console.log(todo[index]);
    const onetodo = todo[index]
    res.render("edit",{onetodo, index})
  })

  app.post("/addtodo", (req, res) =>{
    console.log(req.body);
    const {title , description} = req.body
    if (!title || !description) {
      message = "All fields are mandatory"
      return res.redirect('/todo') 
    }
    todo.push(req.body)
    console.log(todo);
    return res.redirect('/todo') 
  })
  
  app.post("/todo/delete",(req ,res)=>{
    console.log(req.body.index);
    todo.splice(req.body.index, 1)
    res.redirect("/todo")
  })
  app.post("/user/signup",(req, res)=>{
    console.log(req.body);
    user.push(req.body)
    res.redirect("/login")
  })

  app.post("/user/login",(req, res)=>{
     console.log(req.body);
     const { email, password} = req.body
    const existuser = user.find((user)=> user.email === email)
    console.log(existuser);
    
    if (existuser && existuser.password == password) {
      console.log("login successful");
      currentUser = existuser.email
      console.log(currentUser);
      
      res.redirect("/todo")
    }else{
      console.log("invalid user ");
      errormessage = "user does not exist , please Signup!!!."
      res.redirect("/login")
      
    }
     
     
  })
  
  const port = 8005
  app.listen(port,()=>{
      console.log(`app started at port ${port}`);
      
  })
