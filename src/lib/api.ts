import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5005",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor to normalize errors
api.interceptors.response.use(
  (response) => response,
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

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    // Token will be added by individual thunks when needed
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
export const uploadForm = async (
  formData: FormData,
  url: string,
  options: any = {}
) => {
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
 * Helper to get auth token from state - to be used in thunks
 * @param {Object} state - Redux root state
 * @returns {string|null} JWT token or null
 */
export const getAuthToken = (state: any): string | null => {
  return state.auth?.token || null;
};

export default api;
