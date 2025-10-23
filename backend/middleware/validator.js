
const validator = (schema) => async(req, res , next) =>{
   try {
       const body = req.body
      const validated = await schema.validate(body)
      if (validated) {
        next()
      }
   } catch (error) {
     return res.status(400).json({message:error.message})
   }
}


module.exports = validator