/**
 * Footer Settings API Utilities
 *
 * Use these functions to fetch and display footer settings
 * anywhere in your application.
 */

import React from "react";
import api from "../lib/api";

/**
 * Fetch all footer settings from the backend
 * @returns {Promise<Object>} Footer settings object with all keys
 */
export const fetchFooterSettings = async () => {
  try {
    const response = await api.get("/Settings/category/footer");

    if (response.data?.success && response.data?.data) {
      const settings = response.data.data;
      const footerData = {};

      // Map backend data to a simple object
      settings.forEach((setting) => {
        if (setting.key && setting.value !== null) {
          footerData[setting.key] = setting.value;
        }
      });

      return footerData;
    }

    return {};
  } catch (error) {
    console.error("Error fetching footer settings:", error);
    return {};
  }
};

/**
 * Fetch public footer settings (no authentication required)
 * Use this for client-facing pages
 * @returns {Promise<Object>} Public footer settings
 */
export const fetchPublicFooterSettings = async () => {
  try {
    const response = await api.get("/Settings/public/dictionary");

    if (response.data?.success && response.data?.data) {
      // Filter only footer category settings
      const allSettings = response.data.data;
      const footerData = {};

      Object.entries(allSettings).forEach(([key, value]) => {
        // Assuming footer keys start with known prefixes
        if (
          key.startsWith("company_") ||
          key.startsWith("footer_") ||
          key.startsWith("social_")
        ) {
          footerData[key] = value;
        }
      });

      return footerData;
    }

    return {};
  } catch (error) {
    console.error("Error fetching public footer settings:", error);
    return {};
  }
};

/**
 * Get a single footer setting by key
 * @param {string} key - The setting key to fetch
 * @returns {Promise<string|null>} The setting value or null
 */
export const getFooterSetting = async (key) => {
  try {
    const response = await api.get(`/Settings/key/${key}`);

    if (response.data?.success && response.data?.data) {
      return response.data.data.value;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching setting ${key}:`, error);
    return null;
  }
};

/**
 * Example hook for using footer settings in React components
 */
export const useFooterSettings = () => {
  const [settings, setSettings] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const data = await fetchPublicFooterSettings();
        setSettings(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  return { settings, loading, error };
};
