import axios from 'axios';

// 1. Create a custom Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// 2. The Interceptor: This runs right before EVERY request leaves your app
api.interceptors.request.use(
  (config) => {
    // Look in the vault for the token
    const token = localStorage.getItem('jwt_token');
    
    // If we have a token, attach it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;