import axios from "axios";
import { getAuthToken } from "../utils/tokenManager.js";

const BASE_URL = "http://bellatrix.runasp.net/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor to handle wrapped responses and normalize errors
api.interceptors.response.use(
  (response) => {
    // If the response has the wrapped format {data, success, message}, extract the data
    if (
      response.data &&
      typeof response.data === "object" &&
      "data" in response.data
    ) {
      if (response.data.success === false) {
        // Handle API errors wrapped in success format
        const error = new Error(response.data.message || "API request failed");
        error.response = { status: response.status, data: response.data };
        throw error;
      }
      // Return the inner data for successful requests
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error) => {
    const normalizedError = {
      message:
        error.response?.data?.message || error.message || "An error occurred",
      status: error.response?.status || 0,
      details: error.response?.data || null,
    };
    return Promise.reject(normalizedError);
  }
);

// Request interceptor to add auth token for admin endpoints
api.interceptors.request.use(
  (config) => {
    // Add auth token for admin endpoints using centralized token manager
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Helper function for file uploads using multipart/form-data
 * @param {FormData} formData - The form data containing files
 * @param {string} url - The endpoint URL
 * @param {Object} options - Additional options including auth token
 */
export const uploadForm = async (formData, url, options = {}) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      ...(options.headers || {}),
    },
    ...options,
  };

  return api.post(url, formData, config);
};

/**
 * Helper to get auth token from Redux state - to be used in thunks
 * @param {Object} state - Redux root state
 * @returns {string|null} JWT token or null
 */
export const getAuthTokenFromState = (state) => {
  return state.auth?.token || null;
};

export default api;

// Lightweight helper for JSON POSTs (returns unwrapped data due to interceptor)
export const postJson = async (url, payload, options = {}) => {
  const res = await api.post(url, payload, options);
  return res.data;
};