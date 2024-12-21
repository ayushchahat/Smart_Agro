import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/ManualAutomation.css";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000');

const ManualAutomation = () => {
  const [pumpState, setPumpState] = useState(false); // ON/OFF state
  const [timer, setTimer] = useState(0); // Timer
  const [setTime, setSetTime] = useState(""); // User-input timer value

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
        <div className="pump-control">
          <button
            className={`pump-toggle ${pumpState ? "on" : "off"}`}
            onClick={handlePumpToggle}
          >
            {pumpState ? "ON" : "OFF"}
          </button>
          <p>Pump has been ON for: {pumpState ? `${timer} hours` : "0 Hours"}</p>
        </div>
        <div className="set-timer">
          <h2>Set Timer</h2>
          <input
            type="number"
            placeholder="Enter time in hours"
            value={setTime}
            onChange={(e) => setSetTime(e.target.value)}
          />
          <button onClick={handleSetTimer}>Set Timer</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManualAutomation;
