import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import './App.css'; // Add this line to include custom CSS
import Navbar from './Navbar.jsx';


function App() {

  return (
    <div>
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/api/register' element = {<Signup/>}></Route>
            <Route path='/login' element = {<Login/>}></Route>
            <Route path='/Home' element = {<Home/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
