import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axiosInstance";
import "../styles/about.css";

function AboutPage() {
  const [sensors, setSensors] = useState([]);
  const [crops, setCrops] = useState([]);
  const [sensorFormVisible, setSensorFormVisible] = useState(false);
  const [cropFormVisible, setCropFormVisible] = useState(false);
  const [newSensor, setNewSensor] = useState({
    image: "",
    name: "",
    description: "",
    features: "",
  });
  const [newCrop, setNewCrop] = useState({ image: "", about: "", season: "" });
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    fetchSensors();
    fetchCrops();
  }, []);

  const fetchSensors = async () => {
    try {
      const response = await axiosInstance.get("/sensors");
      setSensors(response.data.sensors);
    } catch (error) {
      console.error("Error fetching sensors:", error);
    }
  };

  const fetchCrops = async () => {
    try {
      const response = await axiosInstance.get("/crops");
      setCrops(response.data.crops);
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };

  const handleFileUpload = (e, setNewItem) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewItem((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSensorSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/sensors", newSensor);
      setSensors([...sensors, response.data.sensor]);
      setSensorFormVisible(false);
      setNewSensor({ image: "", name: "", description: "", features: "" });
    } catch (error) {
      console.error("Error adding sensor:", error);
    }
  };

  const handleCropSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/crops", newCrop);
      setCrops([...crops, response.data.crop]);
      setCropFormVisible(false);
      setNewCrop({ image: "", about: "", season: "" });
    } catch (error) {
      console.error("Error adding crop:", error);
    }
  };

  const deleteSensor = async (id) => {
    try {
      await axiosInstance.delete(`/sensors/${id}`);
      setSensors(sensors.filter((sensor) => sensor._id !== id));
    } catch (error) {
      console.error("Error deleting sensor:", error);
    }
  };

  const deleteCrop = async (id) => {
    try {
      await axiosInstance.delete(`/crops/${id}`);
      setCrops(crops.filter((crop) => crop._id !== id));
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="about-container">
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
              fertility.
            </p>
          )}
          <button
            onClick={() => setReadMore(!readMore)}
            className="read-more-btn"
          >
            {readMore ? "Read Less" : "Read More"}
          </button>
        </section>

        <section className="section objectives">
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

        <section className="section sensors">
          <h2>Sensors</h2>
          <button onClick={() => setSensorFormVisible(!sensorFormVisible)}>
            Add Sensor
          </button>
          {sensorFormVisible && (
            <form onSubmit={handleSensorSubmit} className="form">
              <label>
                Sensor Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, setNewSensor)}
                />
              </label>
              <label>
                Sensor Name:
                <input
                  type="text"
                  value={newSensor.name}
                  onChange={(e) =>
                    setNewSensor({ ...newSensor, name: e.target.value })
                  }
                />
              </label>
              <label>
                Description:
                <textarea
                  value={newSensor.description}
                  onChange={(e) =>
                    setNewSensor({ ...newSensor, description: e.target.value })
                  }
                />
              </label>
              <label>
                Features:
                <textarea
                  value={newSensor.features}
                  onChange={(e) =>
                    setNewSensor({ ...newSensor, features: e.target.value })
                  }
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          )}
          <div className="item-list">
            {sensors.map((sensor) => (
              <div key={sensor._id} className="item-card">
                <img src={sensor.image} alt={sensor.name} />
                <div>
                  <h3>{sensor.name}</h3>
                  <p>{sensor.description}</p>
                  <p>
                    <strong>Features:</strong> {sensor.features}
                  </p>
                </div>
                <button onClick={() => deleteSensor(sensor._id)}>Delete</button>
              </div>
            ))}
          </div>
        </section>

        <section className="section crops">
          <h2>Crops</h2>
          <button onClick={() => setCropFormVisible(!cropFormVisible)}>
            Add Crop
          </button>
          {cropFormVisible && (
            <form onSubmit={handleCropSubmit} className="form">
              <label>
                Crop Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, setNewCrop)}
                />
              </label>
              <label>
                Crop Name:
                <input
                  type="text"
                  value={newCrop.about}
                  onChange={(e) =>
                    setNewCrop({ ...newCrop, about: e.target.value })
                  }
                />
              </label>
              <label>
                Season:
                <input
                  type="text"
                  value={newCrop.season}
                  onChange={(e) =>
                    setNewCrop({ ...newCrop, season: e.target.value })
                  }
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          )}
          <div className="item-list">
            {crops.map((crop) => (
              <div key={crop._id} className="item-card">
                <img src={crop.image} alt={crop.about} />
                <div>
                  <h3>{crop.about}</h3>
                  <p>
                    <strong>Season:</strong> {crop.season}
                  </p>
                </div>
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
