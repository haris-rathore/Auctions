import './App.css'
import { io } from 'socket.io-client'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './components/Home'
import Browse from './components/Browse'
import Profile from './components/Profile'
import CreateAuction from './components/CreateAuction'
import SpecificAuction from './components/SpecificAuction'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import _userContext from './components/UserContext'
import _socketContext from './components/socketContext'
import ChangePasswordForm from './components/ChangePassword'
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="" element = {<SignUp/>}/>
      <Route path="/Login" element = {<Login/>}/>
      <Route path="/Home" element = {<Home/>}/>
      {/* <Route path="/Navbar" element = {<Navbar/>}/> */}
      <Route path="/Browse" element = {<Browse/>}/>
      <Route path="/Profile" element = {<Profile />}/>
      <Route path="/CreateAuction" element = {<CreateAuction/>}/>
      <Route path="/SpecificAuction" element = {<SpecificAuction/>}/>
      <Route path="/ChangePassword" element = {<ChangePasswordForm/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
