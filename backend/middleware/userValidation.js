const yup = require("yup")

const userValidation = yup.object({
    username:yup.string().trim().min(4, "Username cannot be less than three character").matches(/^[a-zA-Z0-9_]+$/,"Username must be unique").required("Username is required"),
    email:yup.string().trim().email("Use a valid email").required("email is required"),
    password:yup.string().trim().min(6, "password cannot be less than 6 characters").required("password is required")
})



module.exports = userValidation