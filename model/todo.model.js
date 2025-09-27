
const mongoose = require("mongoose")
const todoschema = new mongoose.Schema({
  title:{type:String, required:true},
  description:{type:String, required:true},
  user:{type:mongoose.Schema.Types.ObjectId,ref:"users" }
})
const todomodel =  mongoose.model("todo", todoschema)


module.exports = todomodel