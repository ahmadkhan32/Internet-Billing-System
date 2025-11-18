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
        // Check if we're on Vercel (production)
        const isVercel = window.location.hostname.includes('vercel.app');
        if (isVercel) {
          error.userMessage = 'Cannot connect to backend API. Please check:\n' +
            '1. Backend is deployed on Vercel\n' +
            '2. API routes are configured correctly\n' +
            '3. Check Vercel function logs for errors';
        } else {
          error.userMessage = 'Cannot connect to server. Please make sure the backend is running on http://localhost:8000';
        }
      }
    } else {
      // Log server errors for debugging
      console.error('API Error:', error.response.status, error.response.data);
      
      // Handle 404 errors (Route not found)
      if (error.response.status === 404) {
        const errorMsg = error.response.data?.message || 'Route not found';
        const requestedUrl = error.config?.url || 'unknown';
        const fullUrl = error.config?.baseURL ? error.config.baseURL + requestedUrl : requestedUrl;
        
        // Check if API_BASE_URL is incorrectly configured
        let fixMessage = '';
        if (API_BASE_URL.includes('/login') || API_BASE_URL.includes('/dashboard')) {
          fixMessage = '\n\n❌ ERROR: VITE_API_BASE_URL is set incorrectly!\n' +
            'Current (WRONG): ' + API_BASE_URL + '\n' +
            'Should be: ' + (API_BASE_URL.includes('vercel.app') 
              ? API_BASE_URL.replace(/\/[^\/]+$/, '/api')
              : '/api') + '\n\n' +
            'Fix: In Vercel, set VITE_API_BASE_URL to:\n' +
            '- If separate backend: https://internet-billing-system.vercel.app/api\n' +
            '- If combined: /api (or leave empty)';
        }
        
        if (errorMsg.includes('Route not found') || errorMsg.includes('API route not found')) {
          error.userMessage = 'Backend API route not found. Please check:\n' +
            '1. VITE_API_BASE_URL is set correctly in Vercel\n' +
            '   - Should end with /api (e.g., https://internet-billing-system.vercel.app/api)\n' +
            '   - OR use /api for same-domain deployment\n' +
            '2. Backend is deployed and accessible\n' +
            '3. API routes are configured correctly\n\n' +
            'Current API Base URL: ' + API_BASE_URL + '\n' +
            'Trying to access: ' + requestedUrl + '\n' +
            'Full URL: ' + fullUrl +
            fixMessage;
        }
      }
      
      // For 500 errors, preserve the error details and set user message
      if (error.response.status === 500) {
        console.error('Server Error Details:', {
          message: error.response.data?.message,
          error: error.response.data?.error,
          environment: error.response.data?.environment
        });
        
        // Set user-friendly error message for 500 errors
        const serverMessage = error.response.data?.message || 'Server error occurred';
        let userMessage = serverMessage;
        
        // Check for specific error types
        if (serverMessage.includes('Cannot find module') || serverMessage.includes('Server initialization error')) {
          userMessage = 'Server initialization error. Please check:\n' +
            '1. Environment variables are set in Vercel\n' +
            '2. Database connection is configured\n' +
            '3. Backend dependencies are installed\n' +
            '4. Check Vercel function logs for details';
          
          if (error.response.data?.error) {
            userMessage += `\n\nError: ${error.response.data.error}`;
          }
        } else if (serverMessage.includes('Database connection')) {
          userMessage = error.response.data?.message || 'Database connection failed';
        } else {
          userMessage = `Server error: ${serverMessage}\n\nPlease check:\n` +
            '1. Backend is running correctly\n' +
            '2. Database connection is working\n' +
            '3. Environment variables are set\n' +
            '4. Check server logs for details';
        }
        
        error.userMessage = userMessage;
      }
      
      // For 503 errors (Service Unavailable - often database connection issues)
      if (error.response.status === 503) {
        const serviceMessage = error.response.data?.message || 'Service unavailable';
        error.userMessage = serviceMessage;
        
        // Add troubleshooting if provided
        if (error.response.data?.troubleshooting) {
          error.userMessage += '\n\nTroubleshooting:\n' +
            error.response.data.troubleshooting.map((step, i) => `${i + 1}. ${step}`).join('\n');
        }
      }
    }
    
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Don't redirect if we're already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

