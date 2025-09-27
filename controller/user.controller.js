const todomodel = require("../model/todo.model")
const usermodel = require("../model/user.model")
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


 let errormessage = ''

const getlandingPage = (req, res) =>{
   console.log(__dirname, "dirname");
      res.render("index",{allusers, gender:"female"})
}

const getUserPage = (req, res) =>{
  res.json({
        "users":allusers
     })
}

const getSignup = (req, res) =>{
     res.render("signup", {errormessage})
}
const getlogin = (req, res)=>{
     res.render("login",{errormessage})
}

const gettodo = async (req, res) =>{
     if (!currentUser) {
         res.redirect("/login")
     }else {
      const alltodo = await todomodel.find({user:currentUser}).populate("user","username")
      console.log(alltodo);
      
      res.render("todo",{alltodo})      
     }
}

const Signupuser = async (req, res) =>{
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
}


const LoginUser =async (req, res) =>{
    try {
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
   
    } catch (error) {
        console.log(error);
        
    }
}



module.exports = {getlandingPage, getUserPage, getSignup, getlogin, gettodo, Signupuser, LoginUser}