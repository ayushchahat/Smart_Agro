import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/ManualAutomation.css";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL || 'https://smart-agro-backend.onrender.com'); // Updated socket URL

const ManualAutomation = () => {
  const [pumpState, setPumpState] = useState(false); // ON/OFF state
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [setTime, setSetTime] = useState(""); // User-input timer value
  const [countdown, setCountdown] = useState(null); // Countdown timer for pump

  // Fetch initial state on mount
  useEffect(() => {
    socket.emit('get-initial-state');
    socket.on('update-pump-state', (data) => {
      if (data) {
        setPumpState(data.isOn);
        setTimer(data.timer);
      }
    });

    return () => socket.off('update-pump-state');
  }, []);

  // Start/stop the countdown timer when pump state changes
  useEffect(() => {
    if (pumpState && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            socket.emit('update-pump', { isOn: false, timer: 0 });
            return 0; // Turn off pump when timer reaches 0
          }
          return prevTimer - 1; // Countdown every second
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setTimer(0); // Reset timer if the pump is OFF
    }
  }, [pumpState, timer]);

  // Handle toggle pump
  const handlePumpToggle = async () => {
    const newPumpState = !pumpState;
    setPumpState(newPumpState);
    setTimer(0); // Reset timer when toggling

    socket.emit('update-pump', { isOn: newPumpState });
  };

  // Handle set timer
  const handleSetTimer = async () => {
    if (!setTime || isNaN(setTime)) {
      return alert("Enter a valid time in seconds");
    }

    setPumpState(true);
    setTimer(setTime);

    socket.emit('update-pump', { isOn: true, timer: parseInt(setTime) });

    setTimeout(() => {
      setPumpState(false);
      socket.emit('update-pump', { isOn: false, timer: 0 });
    }, setTime * 1000);
  };

  return (
    <>
      <Navbar />
      <div className="manual-automation">
        <h1>Manual Automation</h1>
        <p className="description">Manage your pump operation efficiently with manual and timer-based controls.</p>
        <div className="pump-control">
          <button
            className={`pump-toggle ${pumpState ? "on" : "off"}`}
            onClick={handlePumpToggle}
          >
            {pumpState ? "ON" : "OFF"}
          </button>
          <p className="pump-status">
            Pump has been ON for: {pumpState ? `${Math.floor(timer / 60)} minutes` : "0 minutes"}
          </p>
        </div>

        <div className="set-timer">
          <h2>Set Timer</h2>
          <input
            type="number"
            placeholder="Enter time in seconds"
            value={setTime}
            onChange={(e) => setSetTime(e.target.value)}
          />
          <button onClick={handleSetTimer}>Set Timer</button>
        </div>

        <div className="additional-info">
          <h2>Why Automation?</h2>
          <p>Automation helps in saving time, energy, and resources. With the timer feature, you can set a predefined duration for pump operation, ensuring efficiency and preventing overuse.</p>
        </div>

        <div className="how-it-works">
          <h2>How It Works</h2>
          <ol>
            <li>Turn the pump ON or OFF manually using the toggle button.</li>
            <li>Set a timer to automate the pump operation for a specific duration.</li>
            <li>The system will automatically turn off the pump once the timer expires.</li>
          </ol>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManualAutomation;
