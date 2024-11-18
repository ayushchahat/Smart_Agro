import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axiosInstance from '../utils/axiosInstance';
import './about.css';

function AboutPage() {
  const [sensors, setSensors] = useState([]);
  const [crops, setCrops] = useState([]);
  const [sensorFormVisible, setSensorFormVisible] = useState(false);
  const [cropFormVisible, setCropFormVisible] = useState(false);
  const [newSensor, setNewSensor] = useState({ image: '', name: '', description: '', features: '' });
  const [newCrop, setNewCrop] = useState({ image: '', about: '', season: '' });
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    fetchSensors();
    fetchCrops();
  }, []);

  // Fetch Sensors
  const fetchSensors = async () => {
    try {
      const response = await axiosInstance.get('/sensors');
      setSensors(response.data.sensors);
    } catch (error) {
      console.error('Error fetching sensors:', error);
    }
  };

  // Fetch Crops
  const fetchCrops = async () => {
    try {
      const response = await axiosInstance.get('/crops');
      setCrops(response.data.crops);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
  };

  // Add a Sensor
  const handleSensorSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/sensors', newSensor);
      setSensors([...sensors, response.data.sensor]);
      setSensorFormVisible(false);
      setNewSensor({ image: '', name: '', description: '', features: '' });
    } catch (error) {
      console.error('Error adding sensor:', error);
    }
  };

  // Add a Crop
  const handleCropSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/crops', newCrop);
      setCrops([...crops, response.data.crop]);
      setCropFormVisible(false);
      setNewCrop({ image: '', about: '', season: '' });
    } catch (error) {
      console.error('Error adding crop:', error);
    }
  };

  // Delete a Sensor
  const deleteSensor = async (id) => {
    try {
      await axiosInstance.delete(`/sensors/${id}`);
      setSensors(sensors.filter((sensor) => sensor._id !== id));
    } catch (error) {
      console.error('Error deleting sensor:', error);
    }
  };

  // Delete a Crop
  const deleteCrop = async (id) => {
    try {
      await axiosInstance.delete(`/crops/${id}`);
      setCrops(crops.filter((crop) => crop._id !== id));
    } catch (error) {
      console.error('Error deleting crop:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="about-container">
        <h1>About Smart Agro</h1>
        <p className="intro">
          Smart Agro integrates IoT with agriculture to monitor real-time data
          from fields, enabling informed decisions for sustainable farming.
        </p>

        {/* Introduction Section */}
        <section>
          <h2>Introduction</h2>
          <p>
            IoT-based agriculture monitoring revolutionizes farming by utilizing
            connected devices to collect real-time data. This approach combines
            crop and soil monitoring with meteorological data, enabling farmers
            to enhance output and sustainability.
          </p>
          <p className={`more-content ${readMore ? 'visible' : ''}`}>
            The project focuses on automating tasks such as irrigation, light
            intensity monitoring, and climate control using IoT. Devices like
            DHT11 sensors measure temperature and humidity, while soil moisture
            sensors ensure optimal water usage. This integration helps maintain
            crop quality, optimize resources, and protect soil fertility.
          </p>
          <button onClick={() => setReadMore(!readMore)}>
            {readMore ? 'Read Less' : 'Read More'}
          </button>
        </section>

        {/* Objectives Section */}
        <section>
          <h2>Objectives</h2>
          <ul>
            <li>Monitor and control temperature and humidity using DHT11.</li>
            <li>
              Automate irrigation with soil moisture sensors and water pumps.
            </li>
            <li>
              Measure light intensity to regulate photosynthesis and growth.
            </li>
          </ul>
        </section>

        {/* Sensors Section */}
        <section>
          <h2>Sensors</h2>
          <button onClick={() => setSensorFormVisible(!sensorFormVisible)}>Add Sensor</button>
          {sensorFormVisible && (
            <form onSubmit={handleSensorSubmit}>
              <input
                type="text"
                placeholder="Image URL"
                value={newSensor.image}
                onChange={(e) => setNewSensor({ ...newSensor, image: e.target.value })}
              />
              <input
                type="text"
                placeholder="Sensor Name"
                value={newSensor.name}
                onChange={(e) => setNewSensor({ ...newSensor, name: e.target.value })}
              />
              <textarea
                placeholder="Sensor Description"
                value={newSensor.description}
                onChange={(e) => setNewSensor({ ...newSensor, description: e.target.value })}
              ></textarea>
              <textarea
                placeholder="Sensor Features"
                value={newSensor.features}
                onChange={(e) => setNewSensor({ ...newSensor, features: e.target.value })}
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          )}
          <div className="sensor-list">
            {sensors.map((sensor) => (
              <div key={sensor._id} className="sensor-card">
                <img src={sensor.image} alt={sensor.name} />
                <h3>{sensor.name}</h3>
                <p>{sensor.description}</p>
                <p>
                  <strong>Features:</strong> {sensor.features}
                </p>
                <button onClick={() => deleteSensor(sensor._id)}>Delete</button>
              </div>
            ))}
          </div>
        </section>

        {/* Crops Section */}
        <section>
          <h2>Crops</h2>
          <button onClick={() => setCropFormVisible(!cropFormVisible)}>Add Crop</button>
          {cropFormVisible && (
            <form onSubmit={handleCropSubmit}>
              <input
                type="text"
                placeholder="Image URL"
                value={newCrop.image}
                onChange={(e) => setNewCrop({ ...newCrop, image: e.target.value })}
              />
              <input
                type="text"
                placeholder="Crop Name"
                value={newCrop.about}
                onChange={(e) => setNewCrop({ ...newCrop, about: e.target.value })}
              />
              <input
                type="text"
                placeholder="Season"
                value={newCrop.season}
                onChange={(e) => setNewCrop({ ...newCrop, season: e.target.value })}
              />
              <button type="submit">Submit</button>
            </form>
          )}
          <div className="crop-list">
            {crops.map((crop) => (
              <div key={crop._id} className="crop-card">
                <img src={crop.image} alt={crop.about} />
                <h3>{crop.about}</h3>
                <p>
                  <strong>Season:</strong> {crop.season}
                </p>
                <button onClick={() => deleteCrop(crop._id)}>Delete</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default AboutPage;
