import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axiosInstance from '../utils/axiosInstance';
import '../styles/PreviousRecords.css';

function PreviousRecords() {
  const [records, setRecords] = useState([]);
  const [groupedRecords, setGroupedRecords] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/records');
      const fetchedRecords = response.data.records;

      // Group records by crop category
      const grouped = fetchedRecords.reduce((acc, record) => {
        if (!acc[record.crop]) {
          acc[record.crop] = [];
        }
        acc[record.crop].push(record);
        return acc;
      }, {});

      setRecords(fetchedRecords);
      setGroupedRecords(grouped);
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
            {Object.keys(groupedRecords).length > 0 ? (
              Object.keys(groupedRecords).map((crop) => (
                <div className="category-section" key={crop}>
                  <h2 className="category-title">{crop}</h2>
                  <div className="records-container">
                    {groupedRecords[crop].map((record) => (
                      <div className="record-box" key={record._id}>
                        <p><strong>Cultivation Date:</strong> {new Date(record.cultivationDate).toLocaleDateString()}</p>
                        <p><strong>Quantity:</strong> {record.quantity} kg</p>
                        <p><strong>Description:</strong> {record.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
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
