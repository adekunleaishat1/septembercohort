import React from 'react'
import Signup from './Pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import { ToastContainer } from 'react-toastify'
import Dashboard from './Pages/Dashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App