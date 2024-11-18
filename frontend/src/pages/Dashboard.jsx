import React, { useState } from 'react';
import Navbar from '../components/Navbar';
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
        <h1>Dashboard</h1>

        {/* Sensor Data Graph */}
        <SensorGraph />

        {/* Crop Data Form */}
        <div>
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
      </div>
    </>
  );
}

export default Dashboard;
