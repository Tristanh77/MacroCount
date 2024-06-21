import React from 'react';
import './HomePage.css';
import { Link } from "react-router-dom";

export default function HomePage(props) {
    return (
        <>
            <section id='home'>
                <div className='words' id='welcome'>MacroCount Macro Tracker</div>
                <Link to='/signup'>
                    <button className='button' id='signup'>Sign Up</button>
                </Link>
                <Link to='/login'>
                    <button className='button' id='login'>Log In</button>
                </Link>
            </section>
        </>
    );
}
