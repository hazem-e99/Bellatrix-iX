/**
 * Token Manager Utility
 * Centralized token management to ensure consistency across different auth systems
 */

const TOKEN_KEYS = {
  AUTH_TOKEN: 'authToken',
  ADMIN_TOKEN: 'adminToken',
  ADMIN_USER: 'adminUser'
};

/**
 * Get the current authentication token from localStorage
 * Checks both token storage keys for compatibility
 * @returns {string|null} The authentication token or null if not found
 */
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEYS.AUTH_TOKEN) || 
         localStorage.getItem(TOKEN_KEYS.ADMIN_TOKEN) ||
         sessionStorage.getItem(TOKEN_KEYS.AUTH_TOKEN) ||
         sessionStorage.getItem(TOKEN_KEYS.ADMIN_TOKEN);
};

/**
 * Store authentication token in both localStorage keys for compatibility
 * @param {string} token - The authentication token to store
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(TOKEN_KEYS.ADMIN_TOKEN, token);
  }
};

/**
 * Store user data in localStorage
 * @param {Object} userData - The user data to store
 */
export const setUserData = (userData) => {
  if (userData) {
    localStorage.setItem(TOKEN_KEYS.ADMIN_USER, JSON.stringify(userData));
  }
};

/**
 * Get user data from localStorage
 * @returns {Object|null} The user data or null if not found
 */
export const getUserData = () => {
  try {
    const userData = localStorage.getItem(TOKEN_KEYS.ADMIN_USER);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Clear all authentication data from storage
 * Removes ALL data from localStorage and sessionStorage
 */
export const clearAuthData = () => {
  // Clear ALL localStorage data
  localStorage.clear();
  
  // Clear ALL sessionStorage data
  sessionStorage.clear();
  
  console.log('🧹 [LOGOUT] All localStorage and sessionStorage data cleared');
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has a valid token
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;
  
  try {
    // Basic JWT token validation (check if it has 3 parts)
    const parts = token.split('.');
    return parts.length === 3;
  } catch (error) {
    return false;
  }
};

/**
 * Get Authorization header value
 * @returns {string|null} The Authorization header value or null if no token
 */
export const getAuthHeader = () => {
  const token = getAuthToken();
  return token ? `Bearer ${token}` : null;
};

export default {
  getAuthToken,
  setAuthToken,
  setUserData,
  getUserData,
  clearAuthData,
  isAuthenticated,
  getAuthHeader,
  TOKEN_KEYS
};
