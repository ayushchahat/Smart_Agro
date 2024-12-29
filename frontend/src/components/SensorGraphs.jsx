import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { io } from 'socket.io-client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SensorGraph({ sensorType }) {
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: `${sensorType} Values`,
        data: [],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
      },
    ],
  });

  useEffect(() => {
    const socket = io('https://smart-agro-backend.onrender.com'); // Updated socket URL

    socket.on('sensor-data', (data) => {
      const value =
        sensorType === 'Air Humidity'
          ? data.humidity
          : sensorType === 'Soil Moisture'
          ? data.soilMoisture
          : data.lightIntensity;

      const label = new Date(data.timestamp).toLocaleTimeString();

      setGraphData((prevData) => ({
        labels: [...prevData.labels.slice(-9), label], // Keep last 10 labels
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data.slice(-9), value], // Keep last 10 data points
          },
        ],
      }));
    });

    return () => socket.disconnect();
  }, [sensorType]);

  return (
    <div className="graph-container">
      <h3>{sensorType} Graph</h3>
      <Line
        data={graphData}
        options={{
          responsive: true,
          plugins: { legend: { position: 'top' } },
          scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: `${sensorType} Values` } },
          },
        }}
      />
    </div>
  );
}

export default SensorGraph;