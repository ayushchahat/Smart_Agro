import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axiosInstance from '../utils/axiosInstance';

function ProfilePage() {
  const [farmer, setFarmer] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedFarmer, setUpdatedFarmer] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('/auth/profile');
      setFarmer(response.data.farmer);
      setUpdatedFarmer(response.data.farmer);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axiosInstance.put('/auth/profile', updatedFarmer);
      setFarmer(response.data.farmer);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Profile</h1>
        {!isEditing ? (
          <>
            <p>
              <strong>Name:</strong> {farmer.name}
            </p>
            <p>
              <strong>Email:</strong> {farmer.email}
            </p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </>
        ) : (
          <>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  value={updatedFarmer.name}
                  onChange={(e) => setUpdatedFarmer({ ...updatedFarmer, name: e.target.value })}
                />
              </label>
            </div>
            <div>
              <label>
                Email:
                <input
                  type="email"
                  value={updatedFarmer.email}
                  onChange={(e) => setUpdatedFarmer({ ...updatedFarmer, email: e.target.value })}
                />
              </label>
            </div>
            <button onClick={handleUpdateProfile}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
