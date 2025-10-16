const mongoose = require("mongoose")


const userschema = new mongoose.Schema({
   username:{type:String, required:true, trim:true},
   email:{type:String, unique:true, required:true, trim:true},
   password:{type:String, required:true, trim:true},
   verified:{type:Boolean, default:false},
   profilepicture:{
      url:{type:String},
      public_id:{type:String}
   },
   otp:{type:String, required:true}
},{timestamps:true})

const usermodel =  mongoose.model("users", userschema)

module.exports = usermodel