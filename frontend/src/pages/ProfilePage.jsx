import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axiosInstance from '../utils/axiosInstance';
import '../styles/ProfilePage.css';

function ProfilePage() {
  const [farmer, setFarmer] = useState({
    name: '',
    email: '',
    role: 'Farmer',
    profilePicture: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedFarmer, setUpdatedFarmer] = useState({
    name: '',
    email: '',
    role: '',
    profilePicture: '',
  });

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

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpdatedFarmer((prevState) => ({
          ...prevState,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h1 className="profile-heading">Your Profile</h1>
        <div className="profile-card">
          <img
            src={farmer.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="profile-picture"
          />
          {!isEditing ? (
            <div className="profile-info">
              <p>
                <strong>Name:</strong> {farmer.name}
              </p>
              <p>
                <strong>Email:</strong> {farmer.email}
              </p>
              <p>
                <strong>Role:</strong> {farmer.role}
              </p>
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="profile-edit">
              <label>
                Profile Picture:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePictureUpload}
                />
              </label>
              <label>
                Name:
                <input
                  type="text"
                  value={updatedFarmer.name}
                  onChange={(e) =>
                    setUpdatedFarmer({ ...updatedFarmer, name: e.target.value })
                  }
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={updatedFarmer.email}
                  onChange={(e) =>
                    setUpdatedFarmer({ ...updatedFarmer, email: e.target.value })
                  }
                />
              </label>
              <label>
                Role:
                <input
                  type="text"
                  value={updatedFarmer.role}
                  onChange={(e) =>
                    setUpdatedFarmer({ ...updatedFarmer, role: e.target.value })
                  }
                />
              </label>
              <div className="button-group">
                <button className="save-button" onClick={handleUpdateProfile}>
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;
