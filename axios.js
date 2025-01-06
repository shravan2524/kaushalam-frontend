// /axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://6560-2401-4900-8817-7ab0-b85a-236e-c16a-f220.ngrok-free.app', // Replace with your backend URL
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
