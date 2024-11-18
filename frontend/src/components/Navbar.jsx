import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">AlgoOnline</div>
      <div className="nav-links">
        <Link to="/dashboard">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/records">Previous Records</Link>
        <Link to="/about">About</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
