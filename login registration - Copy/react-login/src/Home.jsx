import React from "react";
import Navbar from "./Navbar";
import sample from './assets/court.jpg';

function Home(){
    return(
        <div>
        <Navbar/>    
        <img src={sample} alt="A sample" style={{ width: '100%', height: '675px',paddingTop:'61px' }} />
        </div>
    )
}

export default Home;