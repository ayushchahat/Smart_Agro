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

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedFarmer, setUpdatedFarmer] = useState({ ...farmer });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('/auth/profile');
      setFarmer(response.data.farmer);
      setUpdatedFarmer(response.data.farmer);
      setImagePreview(response.data.farmer.profilePicture || null);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpdatedFarmer((prev) => ({ ...prev, profilePicture: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
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

  const handlePasswordUpdate = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      await axiosInstance.put('/auth/update-password', { password });
      alert('Password updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password.');
    }
  };

  const handleAccountDeletion = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete your account? This action is irreversible.'
    );
    if (!confirm) return;

    try {
      await axiosInstance.delete('/auth/delete-account');
      alert('Account deleted successfully!');
      window.location.href = '/login'; // Redirect after deletion
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-content">
          <h1 className="profile-heading">👤 Your Profile</h1>
          {/* Profile Card */}
          <div className="profile-card">
            <img
              src={imagePreview || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="profile-picture"
            />
            {!isEditing ? (
              <div className="profile-info">
                <p><strong>Name:</strong> {farmer.name}</p>
                <p><strong>Email:</strong> {farmer.email}</p>
                <p><strong>Role:</strong> {farmer.role}</p>
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="profile-edit">
                <label>
                  Profile Picture:
                  <input type="file" accept="image/*" onChange={handlePictureUpload} />
                </label>
                <label>
                  Name:
                  <input
                    type="text"
                    value={updatedFarmer.name}
                    onChange={(e) => setUpdatedFarmer({ ...updatedFarmer, name: e.target.value })}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    value={updatedFarmer.email}
                    onChange={(e) => setUpdatedFarmer({ ...updatedFarmer, email: e.target.value })}
                  />
                </label>
                <button className="save-button" onClick={handleUpdateProfile}>Save</button>
                <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            )}
          </div>

          {/* Account Settings */}
          <section className="account-settings">
            <h2>⚙️ Account Settings</h2>
            <div className="password-update">
              <h3>Update Password</h3>
              <label>
                New Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label>
                Confirm Password:
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              <button className="update-button" onClick={handlePasswordUpdate}>
                Update Password
              </button>
            </div>
            <div className="account-delete">
              <h3>Delete Account</h3>
              <button className="delete-button" onClick={handleAccountDeletion}>
                Delete Account
              </button>
            </div>
          </section>

          {/* Quick Links Section */}
          <section className="quick-links">
            <h2>🌐 Quick Links</h2>
            <ul>
              <li>
                <a href="https://krishi-dss.gov.in/krishi-dss/dataCatalog" target="_blank" rel="noopener noreferrer">
                  Krishi DSS Data Catalog
                </a>
              </li>
              <li>
                <a href="https://state.bihar.gov.in/krishi/CitizenHome.html" target="_blank" rel="noopener noreferrer">
                  Bihar Agriculture Portal
                </a>
              </li>
              <li>
                <a href="https://www.data.gov.in/resource/daily-data-soil-moisture-during-june-2024" target="_blank" rel="noopener noreferrer">
                  Soil Moisture Data (June 2024)
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;
