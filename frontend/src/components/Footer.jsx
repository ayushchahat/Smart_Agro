import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
          <h1>Smart_Agro</h1>
        </div>

        {/* Contact Information */}
        <div className="footer-contact">
          <p>Email: <a href="mailto:ayushkumar110903@gmail.com">ayushkumar110903@gmail.com</a></p>
          <p>Phone: <a href="tel:+919693194437">+91-9693194437</a></p>
          <p>GitHub: <a href="https://github.com/ayushchahat/Smart_Agro" target="_blank" rel="noopener noreferrer">Smart_Agro Repository</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/ayush-kumar11" target="_blank" rel="noopener noreferrer">Ayush Kumar</a></p>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            © 2024 Smart Agro. All rights reserved. 🌾 Happy Farming with Smart Agro!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
