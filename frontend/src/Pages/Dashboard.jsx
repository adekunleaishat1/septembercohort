import React,{useEffect} from 'react'
import axios from 'axios'

const Dashboard = () => {
    const token = localStorage.getItem("token")
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
        console.log(error);
        
      })
    }, [])
    
  return (
    <div>
        
    </div>
  )
}

export default Dashboard