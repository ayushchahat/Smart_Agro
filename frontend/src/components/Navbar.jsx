import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/image/logo.png" alt="Smart Agro Logo" className="navbar-logo-image" />
        <div className="navbar-logo">Smart_Agro</div>
      </div>
      <div className={`nav-links ${isDropdownOpen ? 'open' : ''}`}>
        <Link to="/dashboard">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/records">Previous Records</Link>
        <Link to="/manual-automation">Manual Automation</Link> {/* Added Manual Automation */}
        <Link to="/about">About</Link>
        <Link to="/">Logout</Link>
      </div>
      <div className="navbar-dropdown">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          &#9776; {/* Hamburger icon */}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
