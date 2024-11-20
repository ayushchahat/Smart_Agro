import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axiosInstance from '../utils/axiosInstance';
import './PreviousRecords.css';
function PreviousRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axiosInstance.get('/records');
      setRecords(response.data.records);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const addRecord = async (record) => {
    try {
      const response = await axiosInstance.post('/records', record);
      setRecords([...records, response.data.record]);
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Previous Records</h1>
        <div>
          {records.length > 0 ? (
            <table border="1" cellPadding="10" cellSpacing="0" width="100%">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Cultivation Date</th>
                  <th>Quantity (kg)</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record._id}>
                    <td>{record.crop}</td>
                    <td>{new Date(record.cultivationDate).toLocaleDateString()}</td>
                    <td>{record.quantity}</td>
                    <td>{record.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No records found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default PreviousRecords;
