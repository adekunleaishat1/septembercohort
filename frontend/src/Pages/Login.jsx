import React,{useState} from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate()
     const [userdetail, setuserdetail] = useState({
            email:"",
            password:""
        })
        const [loading , setloading] = useState(false)
    
        const HandleInputChange = (e) =>{
         console.log(e.target.name, e.target.value);
         const name = e.target.name
         setuserdetail({...userdetail,[name]:e.target.value})
        }
         const HandleLogin =() =>{
                setloading(true)
              axios.post("http://localhost:8005/user/login",userdetail)
              .then((res)=>{
                if (res.data?.token) {
                    localStorage.setItem("token", res.data.token)
                }
                toast.success("Login successful")
                navigate("/dashboard")
              }).catch((err)=>{
                const errormessage = err.response.data?.message
                toast.error(errormessage)
              }).finally(()=>{
                  setloading(false)
              })
            }
  return (
    <div>
        <h1>Login</h1>
        <input name='email' onChange={HandleInputChange} placeholder='Email' type="text" />
        <input name='password' onChange={HandleInputChange} placeholder='Password' type="text" />
        <button disabled={loading} onClick={HandleLogin}>{loading? "Loading..." : "Login"}</button>
    </div>
  )
}

export default Login