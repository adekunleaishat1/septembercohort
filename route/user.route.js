const express = require("express")
const userrouter = express.Router()


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



 userrouter.get("/",(request, response)=>{
   console.log(__dirname, "dirname");
      response.render("index",{allusers, gender:"female"})
})
userrouter.get("/user", (req, res)=>{
     res.json({
        "users":allusers
     })
  })

module.exports = userrouter


