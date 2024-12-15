import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart"; // Import the Cart component
import "../styles/about.css";

function AboutPage() {
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <Navbar />
      <div className="about-container">
        {/* Hero Section */}
        <header className="hero-section">
          <div className="hero-content">
            <h1>About Smart Agro</h1>
            <p>
              Revolutionizing agriculture through IoT technology to monitor and
              control field conditions efficiently and sustainably.
            </p>
          </div>
          <img
            src="/image/logo-SA.jpg"
            alt="Agriculture Hero"
            className="hero-image"
          />
        </header>

        {/* Introduction Section */}
        <section className="section introduction">
          <h2>Introduction</h2>
          <p>
            IoT-based agriculture monitoring revolutionizes farming by utilizing
            connected devices to collect real-time data. This approach combines
            crop and soil monitoring with meteorological data, enabling farmers
            to enhance output and sustainability.
          </p>
          {readMore && (
            <p>
              The project focuses on automating tasks such as irrigation, light
              intensity monitoring, and climate control using IoT. Devices like
              DHT11 sensors measure temperature and humidity, while soil
              moisture sensors ensure optimal water usage. This integration
              helps maintain crop quality, optimize resources, and protect soil
              fertility. Agriculture monitoring via IoT-Based approach is the
              integration of connected devices and sensors collecting real-time
              information about various agri-fields. This allows farmers to
              access valuable knowledge regarding the status of their crops and
              soil, combined with key weather/meteorological data important for
              farmers enabling them to make well-informed decisions that improve
              output while maintaining sustainability.<br />
              <strong>Benefits of IoT-Based Agriculture Monitoring</strong>
              <ul>
                <li>Improved Resource Management</li>
                <li>Enhanced Crop Quality</li>
                <li>Cost Reduction</li>
              </ul>
            </p>
          )}
          <button
            onClick={() => setReadMore(!readMore)}
            className="read-more-btn"
          >
            {readMore ? "Read Less" : "Read More"}
          </button>
        </section>

        {/* Objectives Section */}
        <section className="section objectives">
          <h2>Objectives</h2>
          <ul>
            <li>Monitor and control temperature and humidity using DHT11.</li>
            <li>Automate irrigation with soil moisture sensors and water pumps.</li>
            <li>Measure light intensity to regulate photosynthesis and growth.</li>
          </ul>
        </section>

        {/* Cart for Sensors and Crops */}
        <section className="section cart-section">
          <Cart /> {/* Add Cart component */}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
