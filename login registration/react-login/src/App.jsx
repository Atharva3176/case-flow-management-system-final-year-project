import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Dashboard from './dashboard';
import CaseFiling from './CaseFiling';
import Litigent from './Litigent';
import CaseDetails from './CaseDetails';
<<<<<<< HEAD
import './App.css'; 
=======
import './App.css';
>>>>>>> 1e0b9105ea93d3d61f97e784e345a1943194b3e3
//import Navbar from './Navbar.jsx';


function App() {

  return (
    <div>
      <BrowserRouter>
<<<<<<< HEAD
          {/* <Navbar /> */}
          <Routes>
            <Route path='/api/register' element = {<Signup/>}></Route>
            <Route path='/login' element = {<Login/>}></Route>
            <Route path='/Home' element = {<Home/>}></Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/case-filing" element={<CaseFiling/>} />
            <Route path="/litigent" element={<Litigent/>}/>
            <Route path="/case-details" element={<CaseDetails/>}/>
          </Routes>
=======
        {/* <Navbar /> */}
        <Routes>
          <Route path='/api/register' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/Home' element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/case-filing" element={<CaseFiling />} />
          <Route path="/litigent" element={<Litigent />} />
          <Route path="/case-details" element={<CaseDetails />} />
        </Routes>
>>>>>>> 1e0b9105ea93d3d61f97e784e345a1943194b3e3
      </BrowserRouter>
    </div>
  )
}

export default App
