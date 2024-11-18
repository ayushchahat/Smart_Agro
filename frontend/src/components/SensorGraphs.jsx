import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axiosInstance from '../utils/axiosInstance';
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

function SensorGraph({ sensorType }) {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSensorData(sensorType);
  }, [sensorType]);

  const fetchSensorData = async (type) => {
    try {
      const response = await axiosInstance.get(`/sensors?type=${type}`);
      const sensorData = response.data;

      // Transform data for the graph
      const labels = sensorData.timestamps || [];
      const data = sensorData.values || [];

      setGraphData({
        labels,
        datasets: [
          {
            label: `${type} Values`,
            data,
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
      setLoading(false);
    }
  };

  return (
    <div className="graph-container">
      <h3>{sensorType} Graph</h3>
      {loading ? (
        <p>Loading {sensorType} data...</p>
      ) : graphData ? (
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
      ) : (
        <p>No data available for {sensorType}.</p>
      )}
    </div>
  );
}

export default SensorGraph;
