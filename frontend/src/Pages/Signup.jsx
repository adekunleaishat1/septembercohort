import React, {useState} from 'react'
import axios from "axios"
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [userdetail, setuserdetail] = useState({
        username:"",
        email:"",
        password:""
    })
    const [loading , setloading] = useState(false)

    const HandleInputChange = (e) =>{
     console.log(e.target.name, e.target.value);
     const name = e.target.name
     setuserdetail({...userdetail,[name]:e.target.value})
    }
    const HandleSignup =() =>{
        setloading(true)
      axios.post("http://localhost:8005/user/signup",userdetail)
      .then((res)=>{ 
        toast.success("Signup successful")
        setTimeout(()=>{
           navigate("/login")
        }, 3000)
      }).catch((err)=>{
        const errormessage = err.response.data?.message
        toast.error(errormessage)
      }).finally(()=>{
          setloading(false)
      })
    }
  return (
    <div>
        <input name='username' onChange={HandleInputChange} placeholder='Username' type="text" />
        <input name='email' onChange={HandleInputChange} placeholder='Email' type="text" />
        <input name='password' onChange={HandleInputChange} placeholder='Password' type="text" />
        <button disabled={loading} onClick={HandleSignup}>{loading? "Loading..." : "Sign Up"}</button>
    </div>
  )
}

export default Signup