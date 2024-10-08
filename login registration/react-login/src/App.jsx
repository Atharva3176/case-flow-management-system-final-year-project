import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Dashboard from './dashboard';
import CaseFiling from './CaseFiling';
import Litigent from './Litigent';
import './App.css'; 
//import Navbar from './Navbar.jsx';


function App() {

  return (
    <div>
      <BrowserRouter>
          {/* <Navbar /> */}
          <Routes>
            <Route path='/api/register' element = {<Signup/>}></Route>
            <Route path='/login' element = {<Login/>}></Route>
            <Route path='/Home' element = {<Home/>}></Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/case-filing" element={<CaseFiling/>} />
            <Route path="/litigent" element={<Litigent/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
