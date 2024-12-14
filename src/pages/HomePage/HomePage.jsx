import React from 'react';
import { Link } from "react-router-dom";
import './HomePage.css';

export default function HomePage() {
    return (
        <div id="home">
            <div className="background"></div>
            <div className="content-wrapper">
                <h1 className="hero-title">MacroCount</h1>
                <p className="hero-tagline">Track Your Macros, Transform Your Life</p>
                
                <ul className="features-list">
                    <li>Set personalized calorie & macro goals</li>
                    <li>Log meals and exercises with ease</li>
                    <li>Visualize daily progress with dynamic charts</li>
                    <li>Stay motivated with daily resets & streaks</li>
                </ul>

                <div className="glass-card">
                    <div className="macro-row">
                        <div className="macro-item protein">
                            <div className="macro-circle"></div>
                            <span>Protein</span>
                        </div>
                        <div className="macro-item carbs">
                            <div className="macro-circle"></div>
                            <span>Carbs</span>
                        </div>
                        <div className="macro-item fats">
                            <div className="macro-circle"></div>
                            <span>Fats</span>
                        </div>
                        <div className="macro-item calories">
                            <div className="macro-circle"></div>
                            <span>Calories</span>
                        </div>
                    </div>
                    <div className="cta-row">
                        <Link to="/signup">
                            <button className="cta primary-cta">Sign Up</button>
                        </Link>
                        <Link to="/login">
                            <button className="cta secondary-cta">Log In</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}