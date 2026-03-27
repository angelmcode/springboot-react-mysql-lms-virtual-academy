import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // 🚨 Required to send/receive HttpOnly cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 error and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/api/auth/refresh') {
      originalRequest._retry = true;

      try {
        console.log("Access Token expired. Requesting refresh...");
        const response = await api.post('/api/auth/refresh');
        
        // 🚨 FIX: Match your Java DTO (TokenRefreshResponse) property name
        const newAccessToken = response.data.accessToken; 

        if (newAccessToken) {
          localStorage.setItem('jwt_token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest); // Retry the original failed request
        }
      } catch (refreshError) {
        console.error("Refresh failed. Session expired.");
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;