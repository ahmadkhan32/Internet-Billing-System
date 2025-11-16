import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      // Verify token is still valid
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      const response = await apiClient.get('/auth/me');
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, businessId = null) => {
    try {
      const loginData = { email, password };
      if (businessId) {
        loginData.business_id = businessId;
      }
      const response = await apiClient.post('/auth/login', loginData);
      
      if (response.data.success && response.data.token && response.data.user) {
        const { token, user } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        
        return { success: true, user };
      } else {
        return {
          success: false,
          message: response.data.message || 'Login failed - invalid response'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      
      // Handle network errors specifically
      if (!error.response) {
        const networkError = error.userMessage || 
          'Cannot connect to server. Please ensure:\n' +
          '1. Backend server is running\n' +
          '2. Backend URL is correct\n' +
          '3. No firewall is blocking the connection';
        
        return {
          success: false,
          message: String(networkError),
          isNetworkError: true
        };
      }
      
      // Extract error message safely - handle 500 errors specifically
      let errorMessage = 'Login failed. Please check your credentials and try again.';
      
      if (error.response?.status === 500) {
        // Server error - show helpful message
        const errorData = error.response.data;
        
        if (errorData?.message) {
          errorMessage = errorData.message;
        } else if (errorData?.error) {
          errorMessage = typeof errorData.error === 'string' ? errorData.error : String(errorData.error);
        } else if (errorData?.details) {
          errorMessage = `Server error: ${errorData.details}`;
        } else {
          errorMessage = 'Server error occurred. Please check:\n' +
            '1. Environment variables are set in Vercel\n' +
            '2. Database is accessible\n' +
            '3. Check Vercel function logs for details';
        }
      } else if (error.response?.data) {
        const errorData = error.response.data;
        
        if (typeof errorData.message === 'string') {
          errorMessage = errorData.message;
        } else if (typeof errorData.error === 'string') {
          errorMessage = errorData.error;
        } else if (errorData.errors && Array.isArray(errorData.errors)) {
          errorMessage = errorData.errors.map(e => e.msg || e.message || String(e)).join(', ');
        } else if (errorData.environment) {
          // Show environment variable status if available
          const missing = [];
          if (!errorData.environment.hasDB_HOST) missing.push('DB_HOST');
          if (!errorData.environment.hasDB_USER) missing.push('DB_USER');
          if (!errorData.environment.hasDB_PASSWORD) missing.push('DB_PASSWORD');
          if (!errorData.environment.hasDB_NAME) missing.push('DB_NAME');
          if (!errorData.environment.hasJWT_SECRET) missing.push('JWT_SECRET');
          
          if (missing.length > 0) {
            errorMessage = `Missing environment variables: ${missing.join(', ')}\nPlease set these in Vercel project settings.`;
          }
        }
      } else if (error.message && typeof error.message === 'string') {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        message: String(errorMessage)
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

