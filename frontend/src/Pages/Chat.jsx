import React,{useState} from 'react'

const Chat = ({socket}) => {
    console.log(socket);
    const user = JSON.parse(localStorage.getItem("cur_user"))
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const sendMessage = ()=>{
       console.log(message);
       const messagedetail = {
        user:user._id,
        message:message
       }
       socket.emit("sendmessage",messagedetail)
    }
    socket.on("receivemessage",(data)=>{
        console.log("message from server:", data);
        setMessages([...messages, data])
    })
    socket.on("allmessages",(data)=>{
        console.log("all messages from server:", data);
        setMessages(data)
    })
    
  return (
    <div>
        <h1>Chat Page</h1>
         <input onChange={(e)=>setMessage(e.target.value)} type="text" />
         <button onClick={sendMessage}>Send</button>
        {messages.map((msg,i)=>(
            <p key={i}>{msg.message}</p>
        ))}
    </div>
  )
}

export default Chat