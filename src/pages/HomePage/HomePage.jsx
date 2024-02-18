import React from 'react';
import './HomePage.css';
import { Link } from "react-router-dom";


export default function HomePage(props){
   

    return (
        <>
        <section id = 'home'>
            <div className='words' id='welcome'>MacroCount Macro Tracker</div>
            <Link to='/signup'><div className='words' id="signup">Sign Up</div></Link>
            <Link to='/login'><div className='words' id = 'login'>Log In</div></Link>
        </section>
        </>
      );
}

