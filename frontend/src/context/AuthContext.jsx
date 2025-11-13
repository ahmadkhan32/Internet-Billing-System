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
        
        return { success: true };
      } else {
        return {
          success: false,
          message: response.data.message || 'Login failed - invalid response'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle network errors specifically
      if (!error.response) {
        const networkError = error.userMessage || 
          'Cannot connect to server. Please ensure:\n' +
          '1. Backend server is running\n' +
          '2. Backend URL is correct\n' +
          '3. No firewall is blocking the connection';
        
        return {
          success: false,
          message: String(networkError), // Ensure it's a string
          isNetworkError: true
        };
      }
      
      // Extract error message safely
      let errorMessage = 'Login failed. Please check your credentials and try again.';
      
      if (error.response?.data) {
        if (typeof error.response.data.message === 'string') {
          errorMessage = error.response.data.message;
        } else if (typeof error.response.data.error === 'string') {
          errorMessage = error.response.data.error;
        } else if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
          errorMessage = error.response.data.errors.map(e => e.msg || e.message || String(e)).join(', ');
        }
      } else if (error.message && typeof error.message === 'string') {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        message: String(errorMessage) // Ensure it's always a string
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

