/**
 * Settings API Service
 * Complete implementation of all Settings API endpoints
 * Base URL: http://localhost:5005 (configured in api.js)
 */

import api from "../lib/api";

/**
 * GET /api/Settings/public
 * Fetch all public settings with full metadata
 * @returns {Promise<Object>} { success, data: SettingDTO[], message }
 */
export const getPublicSettings = async () => {
  try {
    const response = await api.get("/Settings/public");
    return response.data;
  } catch (error) {
    console.error("Error fetching public settings:", error);
    throw error;
  }
};

/**
 * GET /api/Settings/public/dictionary
 * Fetch public settings as key-value dictionary
 * @returns {Promise<Object>} { success, data: { [key]: value }, message }
 */
export const getPublicDictionary = async () => {
  try {
    const response = await api.get("/Settings/public/dictionary");
    return response.data;
  } catch (error) {
    console.error("Error fetching public dictionary:", error);
    throw error;
  }
};

/**
 * GET /api/Settings
 * Fetch all settings (admin access)
 * @returns {Promise<Object>} { success, data: SettingDTO[], message }
 */
export const getAllSettings = async () => {
  try {
    const response = await api.get("/Settings");
    return response.data;
  } catch (error) {
    console.error("Error fetching all settings:", error);
    throw error;
  }
};

/**
 * GET /api/Settings/grouped
 * Fetch settings grouped by category
 * @returns {Promise<Object>} { success, data: SettingsByCategoryDTO[], message }
 */
export const getSettingsGrouped = async () => {
  try {
    const response = await api.get("/Settings/grouped");
    return response.data;
  } catch (error) {
    console.error("Error fetching grouped settings:", error);
    throw error;
  }
};

/**
 * GET /api/Settings/dictionary
 * Fetch all settings as key-value dictionary (admin)
 * @returns {Promise<Object>} { success, data: { [key]: value }, message }
 */
export const getSettingsDictionary = async () => {
  try {
    const response = await api.get("/Settings/dictionary");
    return response.data;
  } catch (error) {
    console.error("Error fetching settings dictionary:", error);
    throw error;
  }
};

/**
 * GET /api/Settings/key/{key}
 * Fetch a single setting by key
 * @param {string} key - Setting key
 * @returns {Promise<Object>} { success, data: SettingDTO, message }
 */
export const getSettingByKey = async (key) => {
  try {
    const response = await api.get(`/Settings/key/${encodeURIComponent(key)}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching setting by key '${key}':`, error);
    throw error;
  }
};

/**
 * GET /api/Settings/{id}
 * Fetch a single setting by ID
 * @param {number} id - Setting ID
 * @returns {Promise<Object>} { success, data: SettingDTO, message }
 */
export const getSettingById = async (id) => {
  try {
    const response = await api.get(`/Settings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching setting by ID ${id}:`, error);
    throw error;
  }
};

/**
 * GET /api/Settings/search?searchTerm=...
 * Search settings by term
 * @param {string} searchTerm - Search query
 * @returns {Promise<Object>} { success, data: SettingDTO[], message }
 */
export const searchSettings = async (searchTerm) => {
  try {
    const response = await api.get("/Settings/search", {
      params: { searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching settings with term '${searchTerm}':`, error);
    throw error;
  }
};

/**
 * GET /api/Settings/exists?key=...&excludeId=...
 * Check if a setting key exists
 * @param {string} key - Setting key to check
 * @param {number} [excludeId] - Optional ID to exclude from check
 * @returns {Promise<Object>} { success, data: boolean, message }
 */
export const checkKeyExists = async (key, excludeId = null) => {
  try {
    const params = { key };
    if (excludeId !== null) {
      params.excludeId = excludeId;
    }
    const response = await api.get("/Settings/exists", { params });
    return response.data;
  } catch (error) {
    console.error(`Error checking existence of key '${key}':`, error);
    throw error;
  }
};

/**
 * POST /api/Settings
 * Create a new setting
 * @param {Object} payload - CreateSettingDTO
 * @param {string} payload.key - Setting key (2-100 chars)
 * @param {string} payload.value - Setting value (required)
 * @param {string} [payload.description] - Description (0-500 chars)
 * @param {string} [payload.category] - Category (0-50 chars)
 * @param {boolean} [payload.isPublic] - Is public (default: false)
 * @param {string} [payload.dataType] - Data type (0-50 chars)
 * @returns {Promise<Object>} { success, data: SettingDTO, message }
 */
export const createSetting = async (payload) => {
  try {
    const response = await api.post("/Settings", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating setting:", error);
    throw error;
  }
};

/**
 * PUT /api/Settings
 * Update an existing setting
 * @param {Object} payload - UpdateSettingDTO
 * @param {number} payload.id - Setting ID (required)
 * @param {string} payload.key - Setting key (2-100 chars)
 * @param {string} payload.value - Setting value (required)
 * @param {string} [payload.description] - Description (0-500 chars)
 * @param {string} [payload.category] - Category (0-50 chars)
 * @param {boolean} [payload.isPublic] - Is public
 * @param {string} [payload.dataType] - Data type (0-50 chars)
 * @returns {Promise<Object>} { success, data: SettingDTO, message }
 */
export const updateSetting = async (payload) => {
  try {
    const response = await api.put("/Settings", payload);
    return response.data;
  } catch (error) {
    console.error("Error updating setting:", error);
    throw error;
  }
};

/**
 * PUT /api/Settings/bulk
 * Bulk update multiple settings
 * @param {Array<Object>} payload - Array of UpdateSettingDTO
 * @returns {Promise<Object>} { success, data: boolean, message }
 */
export const bulkUpdateSettings = async (payload) => {
  try {
    const response = await api.put("/Settings/bulk", payload);
    return response.data;
  } catch (error) {
    console.error("Error bulk updating settings:", error);
    throw error;
  }
};

/**
 * DELETE /api/Settings/{id}
 * Delete a setting by ID
 * @param {number} id - Setting ID
 * @returns {Promise<Object>} { success, data: boolean, message }
 */
export const deleteSetting = async (id) => {
  try {
    const response = await api.delete(`/Settings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting setting ID ${id}:`, error);
    throw error;
  }
};

/**
 * GET /api/Settings/category/{category}
 * Fetch settings by category
 * @param {string} category - Category name
 * @returns {Promise<Object>} { success, data: SettingDTO[], message }
 */
export const getSettingsByCategory = async (category) => {
  try {
    const response = await api.get(
      `/Settings/category/${encodeURIComponent(category)}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching settings for category '${category}':`, error);
    throw error;
  }
};
