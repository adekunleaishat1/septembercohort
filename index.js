const express = require("express")
const app = express()
 const ejs =   require("ejs")



 // midddlewares
 app.set("view engine", "ejs")
 app.use(express.urlencoded())
   
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

  app.post("/user/signup",(req, res)=>{
    console.log(req.body);
    user.push(req.body)
    res.redirect("/signup")
  })
  
  const port = 8005
  app.listen(port,()=>{
      console.log(`app started at port ${port}`);
      
  })
