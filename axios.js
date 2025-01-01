// /axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001', // Replace with your backend URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
