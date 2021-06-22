import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.authorization = token ? `Bearer ${token}` : '';
  return config; 
});

export default api;
