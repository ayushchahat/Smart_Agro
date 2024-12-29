import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Change the base URL to local server
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
