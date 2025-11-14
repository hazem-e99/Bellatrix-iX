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
    // Handle 401 Unauthorized specifically
    if (error.response?.status === 401) {
      console.error(
        "🔐 [AUTH ERROR] 401 Unauthorized - Session expired or invalid token"
      );
      console.error("⚠️ [AUTH ERROR] Please log in again");

      // Optional: Clear invalid token
      localStorage.removeItem("authToken");
      localStorage.removeItem("adminToken");

      // Optional: Redirect to login (uncomment if needed)
      // window.location.href = '/admin/login';
    }

    const normalizedError = {
      message:
        error.response?.data?.message || error.message || "An error occurred",
      status: error.response?.status || 0,
      details: error.response?.data || null,
    };
    return Promise.reject(normalizedError);
  }
);

// Request interceptor to add auth token for ALL requests
api.interceptors.request.use(
  (config) => {
    // ALWAYS try to get token from localStorage first (primary source: "authToken")
    let token = localStorage.getItem("authToken");

    // Fallback to other token storage locations
    if (!token) {
      token =
        localStorage.getItem("adminToken") ||
        sessionStorage.getItem("authToken") ||
        getAuthToken(); // Last resort: use tokenManager function
    }

    console.log("🔑 [API REQUEST] Preparing request to:", config.url);
    console.log("🔑 [API REQUEST] Token search:", {
      fromAuthToken: localStorage.getItem("authToken") ? "Found" : "Not found",
      fromAdminToken: localStorage.getItem("adminToken")
        ? "Found"
        : "Not found",
      finalToken: token ? "YES" : "NO",
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ [AUTH] Authorization header added successfully");
    } else {
      console.warn(
        '🔐 [AUTH WARNING] No token found in localStorage("authToken")'
      );
      console.warn(
        "⚠️ [AUTH WARNING] Request will be sent WITHOUT authentication"
      );
      console.warn(
        "⚠️ [AUTH WARNING] If this endpoint requires auth, it will return 401"
      );
    }

    return config;
  },
  (error) => {
    console.error("❌ [API REQUEST ERROR]:", error);
    return Promise.reject(error);
  }
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
