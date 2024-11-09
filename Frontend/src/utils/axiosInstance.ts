import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://online-data-leakage-detection-system.onrender.com',
});

export default axiosInstance;
