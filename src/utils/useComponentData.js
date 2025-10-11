/**
 * Reusable hook for merging component props with default data from JSON
 * @param {string} dataPath - Path to data in JSON (e.g., 'hero', 'industryStats')
 * @param {Object} props - Component props
 * @param {Object} defaultData - Default data from JSON file
 * @returns {Object} - Merged data with props taking priority
 */
export const useComponentData = (dataPath, props, defaultData) => {
  // Get default data from the specified path
  const getDefaultData = () => {
    if (!defaultData || !dataPath) return {};
    
    // Handle nested paths (e.g., 'hero.title')
    const pathArray = dataPath.split('.');
    let data = defaultData;
    
    for (const key of pathArray) {
      if (data && typeof data === 'object' && key in data) {
        data = data[key];
      } else {
        return {};
      }
    }
    
    return data || {};
  };

  // Merge props with default data (props take priority)
  const mergeData = () => {
    const defaults = getDefaultData();
    
    // If props is an array, merge array items
    if (Array.isArray(props) && Array.isArray(defaults)) {
      return props.length > 0 ? props : defaults;
    }
    
    // If props is an object, merge objects
    if (typeof props === 'object' && typeof defaults === 'object') {
      return {
        ...defaults,
        ...props,
        // Handle nested objects (like items arrays)
        ...(props.items && defaults.items ? { items: props.items.length > 0 ? props.items : defaults.items } : {}),
        ...(props.features && defaults.features ? { features: props.features.length > 0 ? props.features : defaults.features } : {}),
        ...(props.steps && defaults.steps ? { steps: props.steps.length > 0 ? props.steps : defaults.steps } : {}),
      };
    }
    
    // If props exists and is not empty, use it, otherwise use defaults
    return props && (Array.isArray(props) ? props.length > 0 : Object.keys(props).length > 0) ? props : defaults;
  };

  return mergeData();
};

/**
 * Utility function to get default data for a specific component
 * @param {string} dataPath - Path to data in JSON
 * @param {Object} defaultData - Default data from JSON file
 * @returns {Object} - Default data for the component
 */
export const getDefaultComponentData = (dataPath, defaultData) => {
  if (!defaultData || !dataPath) return {};
  
  const pathArray = dataPath.split('.');
  let data = defaultData;
  
  for (const key of pathArray) {
    if (data && typeof data === 'object' && key in data) {
      data = data[key];
    } else {
      return {};
    }
  }
  
  return data || {};
};

/**
 * Deep merge utility for complex data structures
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} - Deeply merged object
 */
export const deepMerge = (target, source) => {
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  
  return result;
};


