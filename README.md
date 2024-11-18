# Smart Agro: IoT-Based Agriculture Monitoring System 🌱

**Smart Agro** is an innovative web-based application powered by the MERN stack (MongoDB, Express.js, React.js, Node.js) designed to revolutionize agricultural monitoring. By leveraging IoT devices, this platform provides real-time data, automates essential processes, and empowers farmers with actionable insights to boost productivity and sustainability.

---

## 🌟 Features

- **Real-Time Monitoring**: Live data from sensors such as temperature, humidity, soil moisture, and light intensity.
- **Automation**: Automatically control fans, water pumps, and lighting systems based on sensor thresholds.
- **Data Visualization**: Interactive charts and graphs to monitor trends over time.
- **Notifications**: Alerts for critical events like low soil moisture or high temperature.
- **Remote Access**: Monitor and control devices from any device with an internet connection.

---

## 🎯 Objectives

1. **Humidity and Temperature Control**: Automated environmental regulation using IoT sensors (DHT11).
2. **Soil Moisture Monitoring**: Smart irrigation with automated water pump control.
3. **Light Intensity Adjustment**: Optimize crop growth by measuring and responding to light levels.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**: User-friendly interface for monitoring and controlling devices.
- **Axios**: API calls for seamless communication with the backend.

### Backend
- **Node.js**: Server-side logic.
- **Express.js**: RESTful API creation.

### Database
- **MongoDB**: Store sensor data, user profiles, and historical trends.

### IoT Integration
- **ESP8266** & **Arduino Nano**: IoT devices for data collection and automation.

### Deployment
- **Render**: Hosting the full-stack application.

---

## 🌐 Live Demo

Check out the live deployment: [Smart Agro on Render](https://your-deployment-url.render.com)

---

## 🖥️ Installation and Setup

### Prerequisites
- Node.js and npm installed
- MongoDB installed locally or access to a cloud MongoDB instance
- Arduino and IoT devices configured

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ayushchahat/Smart_Agro.git
   cd Smart_Agro/backend

## 🚀 Deployment

### Backend Deployment:
1. Push the backend code to a GitHub repository.
2. Link the repository to Render.
3. Set up environment variables on Render.
4. Deploy the backend.

### Frontend Deployment:
1. Build the React application:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder on Render.

## 📂 Project Structure

```bash
MERN-IoT-Agriculture/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── recordController.js
│   │   └── sensorController.js
│   ├── models/
│   │   ├── Farmer.js
│   │   ├── Record.js
│   │   └── SensorData.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── recordRoutes.js
│   │   └── sensorRoutes.js
│   ├── utils/
│   │   └── authMiddleware.js
│   ├── .env              # Environment variables
│   ├── package.json      # Backend dependencies
│   └── server.js         # Entry point for backend
├── frontend/
│   ├── public/
│   │   └── index.html    # Main HTML file
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── SensorGraphs.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── PreviousRecords.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── Navbar.css
│   │   ├── App.js        # Main React file
│   │   ├── index.js      # Entry point for React app
│   │   └── package.json  # Frontend dependencies
├── README.md             # Project documentation
```

## 📊 Features Breakdown

### Humidity and Temperature Monitoring:
- **Sensor**: DHT11
- **Automation**: Fan activation via relay module.

### Soil Moisture Monitoring:
- **Sensor**: Soil Moisture Sensor
- **Automation**: Water pump activation.

### Light Intensity Monitoring:
- **Sensor**: LDR (Light Dependent Resistor)
- **Automation**: Adjust artificial lighting based on sensor data.

## 🧪 Testing

### Backend:
- Test APIs using tools like Postman.

### Frontend:
- Use the React Testing Library for unit and integration tests.
- Ensure all components render properly and API integration works.

### End-to-End:
- Test the entire setup with connected IoT devices and the deployed application.

## 🏗️ Future Enhancements

- **Push Notifications**: Alerts for specific thresholds via Firebase Cloud Messaging (FCM).
- **Machine Learning**: Predict optimal watering and environmental conditions.
- **User Roles**: Role-based access for admin and farmer accounts.
- **Data Export**: Enable CSV export of historical data for offline analysis.

## 📬 Contact
For questions or contributions, reach out:

**Ayush Kumar**: [[GitHub Profile](https://github.com/ayushchahat)](#)

**Happy Farming with Smart Agro! 🌾
