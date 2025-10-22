import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const [image, setimage]  =useState(null)
    useEffect(() => {
      axios.get("http://localhost:8005/user/verify",{
        headers:{
            "Authorization":`bearer ${token}`,
            "Content-Type":"Application/json",
            "Accept":"Application/json"
        }
      }).then((res)=>{
        console.log(res);
        
      }).catch((error)=>{
        const errormessage =  error.response.data?.message
        if (errormessage == "jwt expired") {
          localStorage.removeItem("token")
          navigate("/login")
        }
       
      })
    }, [])
    
    const handleFileChange = (e) =>{
        const imagefile = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(imagefile )
       reader.onload = (e) =>{
          console.log(e.target.result);
          setimage(e.target.result)
       }
    }
    const ProfileUpload = () =>{
       axios.patch("http://localhost:8005/user/profile/update",{image},{
        headers:{
            "Authorization":`Bearer ${token}`,
            "Content-Type":"Application/json",
            "Accept":"Application/json"
        }
      }).then((res)=>{
        console.log(res);
        
      }).catch((error)=>{
        const errormessage =  error.response.data?.message
        console.log(errormessage);
        
       
      })
    }

  return (
    <div>
         <input onChange={handleFileChange} type="file" />
         <button onClick={ProfileUpload}>Upload</button>
    </div>
  )
}

export default Dashboard