import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Dashboard.css';
import axiosInstance from '../utils/axiosInstance';
import SensorGraph from '../components/SensorGraphs';

function Dashboard() {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    soilMoisture: 0,
    lightIntensity: 0,
  });
  const [cropData, setCropData] = useState({
    crop: '',
    cultivationDate: '',
    quantity: '',
    description: '',
  });
  const [suggestedCrops, setSuggestedCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch sensor data
  const fetchSensorData = async () => {
    try {
      const response = await axiosInstance.get('/sensor-data');
      console.log('Sensor Data:', response.data);
      setSensorData(response.data);
      suggestCrops(); // Update crop suggestions based on new sensor data
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  // Suggest crops based on sensor data and the current month
  const suggestCrops = () => {
    const month = getCurrentMonth();
    let crops = [];
    console.log('Suggesting crops for month:', month);

    if (month === 11 || month === 0) { // Winter
      if (sensorData.soilMoisture > 50) {
        crops.push({
          name: "Wheat",
          reason: "Wheat grows well in cooler temperatures and requires moderate moisture.",
        });
      } else {
        crops.push({
          name: "Barley",
          reason: "Barley is ideal for low-moisture soil conditions in cold weather.",
        });
      }
    } else if (month >= 2 && month <= 5) { // Spring to early Summer
      if (sensorData.temperature > 25 && sensorData.lightIntensity > 60) {
        crops.push({
          name: "Tomatoes",
          reason: "Tomatoes thrive in warm weather with plenty of sunlight.",
        });
      } else {
        crops.push({
          name: "Lettuce",
          reason: "Lettuce is ideal for cooler climates and moderate sunlight.",
        });
      }
    } else if (month >= 6 && month <= 8) { // Summer
      if (sensorData.soilMoisture > 60) {
        crops.push({
          name: "Rice",
          reason: "Rice requires high water levels and warm conditions.",
        });
      } else {
        crops.push({
          name: "Corn",
          reason: "Corn grows best in warm temperatures with moderate soil moisture.",
        });
      }
    } else { // Fall
      if (sensorData.humidity > 60) {
        crops.push({
          name: "Spinach",
          reason: "Spinach is a cool-weather crop and thrives in high humidity.",
        });
      } else {
        crops.push({
          name: "Pumpkins",
          reason: "Pumpkins require moderate humidity and cooler conditions.",
        });
      }
    }

    console.log('Suggested Crops:', crops);
    setSuggestedCrops(crops);
  };

  const getCurrentMonth = () => {
    const date = new Date();
    return date.getMonth();
  };

  const handleAddSuggestedCrop = (crop) => {
    setCropData({
      ...cropData,
      crop: crop.name,
      description: crop.reason,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCropData({ ...cropData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosInstance.post('/records', cropData);
      alert('Crop record added successfully!');
      setCropData({ crop: '', cultivationDate: '', quantity: '', description: '' });
    } catch (error) {
      console.error('Error adding crop record:', error);
      alert('Failed to add crop record. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Smart Agriculture Dashboard</h1>
        <div className="graphs">
          <SensorGraph sensorType="Air Humidity" />
          <SensorGraph sensorType="Soil Moisture" />
          <SensorGraph sensorType="Light Intensity" />
        </div>
        <div className="crop-suggestions">
          <h2>Crop Suggestions</h2>
          <p>Based on current environmental data, we recommend:</p>
          <ul>
            {suggestedCrops.length > 0 ? (
              suggestedCrops.map((crop, index) => (
                <li key={index}>
                  <strong>{crop.name}:</strong> {crop.reason}
                  <button onClick={() => handleAddSuggestedCrop(crop)}>Add to Record</button>
                </li>
              ))
            ) : (
              <p>No crop suggestions available at the moment.</p>
            )}
          </ul>
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
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
