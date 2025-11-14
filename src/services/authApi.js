import axios from 'axios';
import { clearAuthData } from '../utils/tokenManager';

// Create axios instance with base URL
const authApi = axios.create({
  baseURL: 'http://bellatrix.runasp.net/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear all authentication data using centralized token manager
      clearAuthData();
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API endpoints
export const authService = {
  // Login
  login: async (credentials) => {
    const response = await authApi.post('/api/Authentication/Login', {
      emailOrUserName: credentials.email,
      password: credentials.password,
      rememberMe: credentials.rememberMe || false,
    });
    return response.data;
  },

  // Registration
  register: async (userData) => {
    const response = await authApi.post('/api/Authentication/Registration', {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      username: userData.username,
    });
    return response.data;
  },

  // Verification
  verify: async (verificationData) => {
    const response = await authApi.post('/api/Authentication/Verification', {
      email: verificationData.email,
      verificationCode: verificationData.code,
    });
    return response.data;
  },

  // Forgot Password
  forgotPassword: async (email) => {
    const response = await authApi.post('/api/Authentication/Forgot-Password', {
      email: email,
    });
    return response.data;
  },

  // Reset Password
  resetPassword: async (resetData) => {
    const response = await authApi.post('/api/Authentication/Reset-Password', {
      email: resetData.email,
      resetToken: resetData.resetToken,
      newPassword: resetData.newPassword,
      confirmPassword: resetData.confirmPassword,
    });
    return response.data;
  },
};

export default authApi;
