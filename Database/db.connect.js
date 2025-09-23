const mongoose = require("mongoose")

const uri = process.env.MONGOURI

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

module.exports = connect