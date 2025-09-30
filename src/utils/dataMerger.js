/**
 * Utility function to merge component props with default data from JSON
 * @param {Object} props - Component props
 * @param {Object} defaultData - Default data from JSON file
 * @param {Object} fallbackData - Hardcoded fallback data
 * @returns {Object} Merged data object
 */
export const mergeComponentData = (props, defaultData, fallbackData) => {
  // Helper function to safely get nested property
  const safeGet = (obj, path, defaultValue) => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : defaultValue;
    }, obj);
  };

  // Helper function to check if value is meaningful (not null, undefined, or empty)
  const isMeaningful = (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  };

  // Merge strategy: props > defaultData > fallbackData
  const merged = {};

  // Get all possible keys from all sources
  const allKeys = new Set([
    ...Object.keys(props || {}),
    ...Object.keys(defaultData || {}),
    ...Object.keys(fallbackData || {})
  ]);

  allKeys.forEach(key => {
    const propValue = props?.[key];
    const defaultValue = defaultData?.[key];
    const fallbackValue = fallbackData?.[key];

    // Priority: props > defaultData > fallbackData
    if (isMeaningful(propValue)) {
      merged[key] = propValue;
    } else if (isMeaningful(defaultValue)) {
      merged[key] = defaultValue;
    } else if (isMeaningful(fallbackValue)) {
      merged[key] = fallbackValue;
    }
  });

  return merged;
};

/**
 * Utility function to merge array data with fallbacks
 * @param {Array} propArray - Array from props
 * @param {Array} defaultArray - Array from default data
 * @param {Array} fallbackArray - Hardcoded fallback array
 * @returns {Array} Merged array
 */
export const mergeArrayData = (propArray, defaultArray, fallbackArray) => {
  if (propArray && Array.isArray(propArray) && propArray.length > 0) {
    return propArray;
  }
  if (defaultArray && Array.isArray(defaultArray) && defaultArray.length > 0) {
    return defaultArray;
  }
  if (fallbackArray && Array.isArray(fallbackArray) && fallbackArray.length > 0) {
    return fallbackArray;
  }
  return [];
};

/**
 * Utility function to merge string data with fallbacks
 * @param {string} propValue - String from props
 * @param {string} defaultValue - String from default data
 * @param {string} fallbackValue - Hardcoded fallback string
 * @returns {string} Merged string
 */
export const mergeStringData = (propValue, defaultValue, fallbackValue) => {
  if (propValue && typeof propValue === 'string' && propValue.trim() !== '') {
    return propValue;
  }
  if (defaultValue && typeof defaultValue === 'string' && defaultValue.trim() !== '') {
    return defaultValue;
  }
  if (fallbackValue && typeof fallbackValue === 'string' && fallbackValue.trim() !== '') {
    return fallbackValue;
  }
  return '';
};

export default {
  mergeComponentData,
  mergeArrayData,
  mergeStringData
};
