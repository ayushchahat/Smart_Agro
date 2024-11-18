import React, { useEffect, useState } from 'react';
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
import { Line } from 'react-chartjs-2';
import axiosInstance from '../utils/axiosInstance';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SensorGraph() {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSensorData();
  }, []);

  const fetchSensorData = async () => {
    try {
      const response = await axiosInstance.get('/sensors');
      const sensors = response.data.sensors;

      // Transform data for the graph
      const labels = sensors.map((sensor, index) => `Sensor ${index + 1}`);
      const data = sensors.map((sensor) => parseFloat(sensor.features) || 0);

      setGraphData({
        labels,
        datasets: [
          {
            label: 'Sensor Values',
            data,
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sensor Data Graph</h2>
      {loading ? (
        <p>Loading sensor data...</p>
      ) : graphData ? (
        <Line
          data={graphData}
          options={{
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: {
              x: { title: { display: true, text: 'Sensors' } },
              y: { title: { display: true, text: 'Values' } },
            },
          }}
        />
      ) : (
        <p>No data available to display.</p>
      )}
    </div>
  );
}

export default SensorGraph;
