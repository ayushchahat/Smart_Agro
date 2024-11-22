import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Dashboard.css';
import axiosInstance from '../utils/axiosInstance';
import SensorGraph from '../components/SensorGraphs';

function Dashboard() {
  const [cropData, setCropData] = useState({
    crop: '',
    cultivationDate: '',
    quantity: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCropData({ ...cropData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/records', cropData);
      alert('Crop record added successfully!');
      setCropData({ crop: '', cultivationDate: '', quantity: '', description: '' });
    } catch (error) {
      console.error('Error adding crop record:', error);
      alert('Failed to add crop record. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Smart Agriculture Dashboard</h1>
        <div className="graphs">
          <SensorGraph sensorType="Temperature & Humidity" />
          <SensorGraph sensorType="Soil Moisture" />
          <SensorGraph sensorType="Light Intensity" />
        </div>
        <div className="form-section">
          <h2>Submit Crop Data</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="crop"
              placeholder="Current Crop"
              value={cropData.crop}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="cultivationDate"
              value={cropData.cultivationDate}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity Produced (kg)"
              value={cropData.quantity}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={cropData.description}
              onChange={handleChange}
              rows="4"
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="crop-suggestions">
          <h2>Crop Suggestions</h2>
          <p>Based on current environmental data, we recommend:</p>
          <ul>
            <li>Crop A: Ideal for high humidity</li>
            <li>Crop B: Suitable for low light conditions</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
