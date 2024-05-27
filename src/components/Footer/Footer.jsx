import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <Link to="/meal" className="footer-link">Meals</Link>
      <Link to="/daily" className="footer-link">Daily Meals</Link>
      <Link to="/" className="footer-link footer-link-center">Overview</Link>
      <Link to="/profile" className="footer-link">Profile</Link>
      <Link to="/exercise" className="footer-link">Exercise</Link>
    </footer>
  );
}

export default Footer;
