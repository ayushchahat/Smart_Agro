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
        <Link to="/dashboard" className="nav-link">Home</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/records" className="nav-link">Previous Records</Link>
        <Link to="/manual-automation" className="nav-link">Manual Automation</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/" className="nav-link">Logout</Link>
      </div>
      <div className="navbar-dropdown">
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          &#9776;
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
