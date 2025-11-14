/**
 * Settings Key Normalizer
 * Converts human-readable setting keys to backend snake_case format
 */

/**
 * Mapping of old key names to new backend key names
 */
const KEY_MAPPING = {
  // Social Media
  "Facebook URL": "facebook_link",
  "Twitter URL": "twitter_link",
  "LinkedIn URL": "social_linkedin",
  "Instagram URL": "social_instagram",
  "YouTube URL": "social_youtube",

  // Company Information
  "Company Name": "company_name",
  "Company Email": "company_email",
  "Company Phone": "company_phone",
  "Company Address": "company_address",
  "Company Tagline": "company_tagline",
  "Footer Text": "company_tagline", // Alias

  // Legal & Policy
  "Copyright Text": "copyright_text",
  "Privacy Policy URL": "privacy_policy_url",
  "Terms of Service URL": "terms_of_service_url",

  // Site Settings
  "Site Title": "siteTitle",

  // Add more mappings as needed
};

/**
 * Normalize a single setting key
 * @param {string} key - The old key name
 * @returns {string} - The normalized backend key name
 */
export function normalizeKey(key) {
  return KEY_MAPPING[key] || key;
}

/**
 * Normalize setting keys in an array of settings
 * @param {Array<Object>} settings - Array of setting objects with 'key' property
 * @returns {Array<Object>} - Array with normalized keys
 *
 * @example
 * const settings = [
 *   { key: "Facebook URL", value: "https://facebook.com" },
 *   { key: "Company Name", value: "My Company" }
 * ];
 * const normalized = normalizeSettingKeys(settings);
 * // Result:
 * // [
 * //   { key: "social_facebook", value: "https://facebook.com" },
 * //   { key: "company_name", value: "My Company" }
 * // ]
 */
export function normalizeSettingKeys(settings) {
  if (!Array.isArray(settings)) {
    console.warn("[normalizeSettingKeys] Input is not an array:", settings);
    return settings;
  }

  return settings.map((setting) => {
    if (!setting || typeof setting !== "object") {
      console.warn("[normalizeSettingKeys] Invalid setting item:", setting);
      return setting;
    }

    const oldKey = setting.key;
    const newKey = normalizeKey(oldKey);

    // Only log if key was actually changed
    if (oldKey !== newKey) {
      console.log(`🔄 [normalizeSettingKeys] "${oldKey}" → "${newKey}"`);
    }

    return {
      ...setting,
      key: newKey,
    };
  });
}

/**
 * Normalize setting keys in an object (dictionary format)
 * @param {Object} settings - Object with setting keys as properties
 * @returns {Object} - Object with normalized keys
 *
 * @example
 * const settings = {
 *   "Facebook URL": "https://facebook.com",
 *   "Company Name": "My Company"
 * };
 * const normalized = normalizeSettingKeysDictionary(settings);
 * // Result:
 * // {
 * //   "social_facebook": "https://facebook.com",
 * //   "company_name": "My Company"
 * // }
 */
export function normalizeSettingKeysDictionary(settings) {
  if (!settings || typeof settings !== "object") {
    console.warn(
      "[normalizeSettingKeysDictionary] Input is not an object:",
      settings
    );
    return settings;
  }

  const normalized = {};

  Object.entries(settings).forEach(([oldKey, value]) => {
    const newKey = normalizeKey(oldKey);

    // Only log if key was actually changed
    if (oldKey !== newKey) {
      console.log(
        `🔄 [normalizeSettingKeysDictionary] "${oldKey}" → "${newKey}"`
      );
    }

    normalized[newKey] = value;
  });

  return normalized;
}

/**
 * Reverse mapping: Convert backend keys back to human-readable format
 * @param {string} backendKey - The backend key name
 * @returns {string} - The human-readable key name
 */
export function denormalizeKey(backendKey) {
  const reverseMap = Object.entries(KEY_MAPPING).reduce(
    (acc, [humanKey, snakeKey]) => {
      acc[snakeKey] = humanKey;
      return acc;
    },
    {}
  );

  return reverseMap[backendKey] || backendKey;
}

/**
 * Denormalize an array of settings (backend → human-readable)
 * @param {Array<Object>} settings - Array with backend keys
 * @returns {Array<Object>} - Array with human-readable keys
 */
export function denormalizeSettingKeys(settings) {
  if (!Array.isArray(settings)) {
    console.warn("[denormalizeSettingKeys] Input is not an array:", settings);
    return settings;
  }

  return settings.map((setting) => {
    if (!setting || typeof setting !== "object") {
      console.warn("[denormalizeSettingKeys] Invalid setting item:", setting);
      return setting;
    }

    return {
      ...setting,
      key: denormalizeKey(setting.key),
    };
  });
}

/**
 * Check if a key needs normalization
 * @param {string} key - The key to check
 * @returns {boolean} - True if key needs normalization
 */
export function needsNormalization(key) {
  return KEY_MAPPING.hasOwnProperty(key);
}

/**
 * Get all available key mappings
 * @returns {Object} - The complete key mapping object
 */
export function getKeyMappings() {
  return { ...KEY_MAPPING };
}

/**
 * Bulk normalize settings with validation
 * @param {Array<Object>} settings - Settings to normalize
 * @param {Object} options - Options for normalization
 * @returns {Object} - Result object with normalized settings and metadata
 */
export function normalizeSettingsBulk(settings, options = {}) {
  const {
    validateKeys = false,
    logChanges = true,
    skipInvalid = false,
  } = options;

  const result = {
    normalized: [],
    changed: [],
    unchanged: [],
    invalid: [],
    stats: {
      total: 0,
      normalized: 0,
      unchanged: 0,
      invalid: 0,
    },
  };

  if (!Array.isArray(settings)) {
    console.error("[normalizeSettingsBulk] Input must be an array");
    return result;
  }

  settings.forEach((setting, index) => {
    result.stats.total++;

    if (!setting || typeof setting !== "object" || !setting.key) {
      result.stats.invalid++;
      result.invalid.push({ index, setting, reason: "Invalid format" });

      if (!skipInvalid) {
        result.normalized.push(setting);
      }
      return;
    }

    const oldKey = setting.key;
    const newKey = normalizeKey(oldKey);
    const normalized = { ...setting, key: newKey };

    result.normalized.push(normalized);

    if (oldKey !== newKey) {
      result.stats.normalized++;
      result.changed.push({ index, oldKey, newKey, setting: normalized });

      if (logChanges) {
        console.log(`✨ [Bulk] Setting #${index}: "${oldKey}" → "${newKey}"`);
      }
    } else {
      result.stats.unchanged++;
      result.unchanged.push({ index, key: oldKey, setting: normalized });
    }
  });

  if (logChanges) {
    console.log(`
📊 Normalization Summary:
   Total: ${result.stats.total}
   Normalized: ${result.stats.normalized}
   Unchanged: ${result.stats.unchanged}
   Invalid: ${result.stats.invalid}
    `);
  }

  return result;
}

export default {
  normalizeKey,
  normalizeSettingKeys,
  normalizeSettingKeysDictionary,
  denormalizeKey,
  denormalizeSettingKeys,
  needsNormalization,
  getKeyMappings,
  normalizeSettingsBulk,
};
