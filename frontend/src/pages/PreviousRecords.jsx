import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axiosInstance from '../utils/axiosInstance';
import '../styles/PreviousRecords.css';

function PreviousRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/records');
      setRecords(response.data.records);
    } catch (error) {
      setError('Error fetching records.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Previous Records</h1>

        {loading ? (
          <div className="loading">
            <p>Loading records...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {records.length > 0 ? (
              <table>
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
              <p className="no-records">No records found.</p>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default PreviousRecords;
