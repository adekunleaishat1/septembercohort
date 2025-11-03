import React, {useRef} from 'react'
import Signup from './Pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import { ToastContainer } from 'react-toastify'
import Dashboard from './Pages/Dashboard'
import socketClient from 'socket.io-client'
import Chat from './Pages/Chat'


const App = () => {
  const SERVER_URL = "http://localhost:8005"
 const socket = useRef(socketClient(SERVER_URL))

  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/chat' element={<Chat socket={socket.current}/>}/>
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App