// /axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://15ca-2401-4900-8815-1bb5-6485-b26b-162c-dbca.ngrok-free.app/', // Replace with your backend URL
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
