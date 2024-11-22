import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Dashboard from './dashboard';
import CaseFiling from './CaseFiling';
import Litigent from './Litigent';
import CaseDetails from './CaseDetails';
import CaseFiling1 from './caseFilling1';
import PortfolioPage from './PortfolioPage';
import Priority from './Priority';
import EmailForm from './EmailForm';
import New from './New';
import './App.css'; 
//import chat from './Chatbot'
import Chatbot from './Chatbot'
//import Navbar from './Navbar.jsx';


function App() {

  return (
    <div>
      <BrowserRouter>
          {/* <Navbar /> */}
          <Routes>
            <Route path='/' element = {<Home/>}></Route>
            <Route path='/api/register' element = {<Signup/>}></Route>
            <Route path='/login' element = {<Login/>}></Route>
            <Route path='/Home' element = {<Home/>}></Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/case-filing" element={<CaseFiling/>} />
            <Route path="/litigent" element={<Litigent/>}/>
            <Route path="/case-details" element={<CaseDetails/>}/>
            <Route path="/case-submit" element={<CaseFiling1/>}/>
            <Route path="/portfolio" element={<PortfolioPage/>}/>
            <Route path="/sapdla" element={<New/>}/>
            <Route path="/urgent" element={<Priority/>}/>
            <Route path="/chat" element={<Chatbot/>}/>
            <Route path="/malamailtak" element={<EmailForm/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
