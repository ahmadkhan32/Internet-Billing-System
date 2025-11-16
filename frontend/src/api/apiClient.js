import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network error (backend not reachable)
    if (!error.response) {
      console.error('Network Error:', error.message);
      console.error('Backend URL:', API_BASE_URL);
      console.error('Error code:', error.code);
      
      // Show user-friendly error
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        const isVercel = window.location.hostname.includes('vercel.app');
        error.userMessage = isVercel 
          ? 'Cannot connect to server. Please check:\n1. Environment variables are set in Vercel\n2. Database is accessible\n3. Check Vercel function logs'
          : 'Cannot connect to server. Please make sure the backend is running on http://localhost:8000';
      }
    }
    
    // Log detailed error information for debugging
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.statusText);
      console.error('Error data:', error.response.data);
      
      // For 500 errors, show more details
      if (error.response.status === 500) {
        const errorData = error.response.data;
        if (errorData?.environment) {
          console.error('Environment status:', errorData.environment);
        }
        if (errorData?.error) {
          console.error('Server error:', errorData.error);
        }
      }
    }
    
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

