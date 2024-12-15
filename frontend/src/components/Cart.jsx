import React, { useState } from "react";
import "../styles/Cart.css"; // Import styling

const Cart = () => {
  // Sensor data including new sensors from the document
  const sensors = [
    
    {
      id: 1,
      name: "DHT11 Sensor",
      description: "DHT11 Sensor is a versatile and affordable device that accurately measures both humidity and temperature. Ideal for various applications, from smart homes to weather monitoring systems, it provides reliable data for improved automation and environmental control.",
      image: "/image/sensor_dht11.jpeg",
    },
    {
      id: 2,
      name: "Soil Moisture Sensor",
      description: "AM2315C consists of an all-new-design ASIC dedicated chip, an improved MEMS capacitive humidity sensor and a standard on-chip temperature sensor. The performance and reliability have been greatly improved, surpassing the level of the previous generations.",
      image: "/image/sensor_soil_moisture.jpeg",
    },
    {
      id: 3,
      name: "Light Intensity Sensor",
      description: "The BH1750 is a light intensity sensor that can be used to adjust the brightness of display in mobiles and LCD displays. It can also be used to turn the headlights of cars on/off based on the outdoor lighting. The sensor uses I2C communication protocol so that makes it super easy to use with microcontrollers.",
      image: "/image/sensor_light_intensity.jpeg",
    },
    {
      id: 4,
      name: "Relay Module",
      description: "A relay module is a switching device, the control circuit that operates with low-power signals. It enables a low-power supply circuit to switch on or regulate a high-power supply circuit without integrating it with the same circuit or electrical appliance.",
      image: "/image/relay_module.jpeg",
    },
  ];

  // Crop data grouped by soil type
  const cropData = {
    alluvial: [
      { id: 1, name: "Rice", description: "Rice requires warm and humid conditions, thriving in the monsoon season with ample water. It is typically grown in flooded fields, making it ideal for areas with high rainfall or effective irrigation systems.", image: "/image/rice.jpg" },
      { id: 2, name: "Wheat", description: "Wheat grows best in cooler climates, making it a staple winter crop. It requires moderate rainfall and prefers well-drained loamy soil, thriving in temperate conditions.", image: "/image/wheat.jpeg" },
      { id: 3, name: "Potato", description: "Potatoes are a versatile root crop grown during the cool seasons. They prefer loose, well-drained soil and moderate water, making them suitable for regions with mild temperatures.", image: "/image/patato.jpeg" },
      { id: 4, name: "Apple", description: "Apples are suited for colder regions, requiring a winter chill to ensure proper flowering and fruit production. They grow well in mountainous or temperate areas with careful cultivation and protection.", image: "/image/apple.jpeg" },
      { id: 5, name: "Pumpkin", description: "Pumpkins are warm-season crops that thrive in sunny conditions during summer. They require rich, well-drained soil and regular watering, producing large fruits in the heat.", image: "/image/pumpkin.jpeg" },
    ],
    black: [
      { id: 6, name: "Wheat", description: "Wheat grows best in cooler climates, making it a staple winter crop. It requires moderate rainfall and prefers well-drained loamy soil, thriving in temperate conditions.", image: "/image/wheat.jpeg" },
      { id: 7, name: "Sunflower", description: "Sunflowers are warm-season crops that thrive in black soil under sunny conditions. They require long days of sunlight and moderate water, making them ideal for summer cultivation and oil production.", image: "/image/sunflower.jpeg" },
      { id: 8, name: "Lemon", description: "Lemons thrive in acidic, well-drained soils such as black soil and prefer warm climates. They need consistent sunlight, moderate watering, and proper care to yield juicy, flavorful fruits.", image: "/image/lemon.jpeg" },
    ],
    red: [
      { id: 9, name: "Rice", description: "Rice requires warm and humid conditions, thriving in the monsoon season with ample water. It is typically grown in flooded fields, making it ideal for areas with high rainfall or effective irrigation systems.", image: "/image/rice.jpg" },
      { id: 10, name: "Carrot", description: "Carrots are cool-season root crops that grow best in loose, well-drained soil, such as red soil. They require mild temperatures and adequate moisture to develop their characteristic sweetness and crispness.", image: "/image/carrot.jpeg" },
      { id: 11, name: "Blueberry", description: "Blueberries prefer acidic soils, like red soil, and thrive in cooler climates. They require consistent moisture, proper drainage, and ample sunlight for optimal growth and fruit production.", image: "/image/blueberry.jpeg" },
      { id: 12, name: "Tobacco", description: "Tobacco grows well in warm climates and well-drained red soil. It requires consistent moisture and careful attention to temperature and humidity for high-quality leaf production.", image: "/image/tobacco.jpeg" },
    ],
  };

  // State to track selected soil type and expanded cards
  const [soilType, setSoilType] = useState("alluvial"); // Default to Alluvial soil
  const [expanded, setExpanded] = useState({});

  // Toggle Read More/Read Less
  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="cart-container">
      <h2>Sensors and Components</h2>
      <div className="cart-grid">
        {sensors.map((sensor) => (
          <div key={sensor.id} className="cart-item">
            <img src={sensor.image} alt={sensor.name} className="cart-image" />
            <h3>{sensor.name}</h3>
            <p>
              {expanded[sensor.id]
                ? sensor.description
                : `${sensor.description.slice(0, 50)}...`}
            </p>
            <button onClick={() => toggleExpand(sensor.id)} className="toggle-btn">
              {expanded[sensor.id] ? "Read Less" : "Read More"}
            </button>
          </div>
        ))}
      </div>

      <h2>Crops</h2>
      {/* Dropdown to choose soil type */}
      <div className="soil-selector">
        <label htmlFor="soilType">Choose Soil Type: </label>
        <select
          id="soilType"
          value={soilType}
          onChange={(e) => setSoilType(e.target.value)}
          className="soil-dropdown"
        >
          <option value="alluvial">Alluvial Soil</option>
          <option value="black">Black Soil</option>
          <option value="red">Red Soil</option>
        </select>
      </div>

      {/* Display crops for selected soil */}
      <div className="cart-grid">
        {cropData[soilType].map((crop) => (
          <div key={crop.id} className="cart-item">
            <img src={crop.image} alt={crop.name} className="cart-image" />
            <h3>{crop.name}</h3>
            <p>
              {expanded[crop.id]
                ? crop.description
                : `${crop.description.slice(0, 50)}...`}
            </p>
            <button onClick={() => toggleExpand(crop.id)} className="toggle-btn">
              {expanded[crop.id] ? "Read Less" : "Read More"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
