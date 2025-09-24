// Utility functions for JSON to form fields conversion
export const parseJsonToFormFields = (jsonString) => {
  try {
    const jsonData = JSON.parse(jsonString || "{}");
    return jsonData;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return {};
  }
};

export const generateFormFieldsFromJson = (jsonData, onChange) => {
  const fields = [];
  
  const renderField = (key, value, path = "") => {
    const fieldPath = path ? `${path}.${key}` : key;
    const fieldId = fieldPath.replace(/\./g, "_");
    
    if (typeof value === "string") {
      return {
        type: "string",
        key: fieldId,
        path: fieldPath,
        label: key.replace(/([A-Z])/g, ' $1').trim(),
        value: value,
        isLongText: value.length > 100
      };
    }
    
    if (typeof value === "number") {
      return {
        type: "number",
        key: fieldId,
        path: fieldPath,
        label: key.replace(/([A-Z])/g, ' $1').trim(),
        value: value
      };
    }
    
    if (typeof value === "boolean") {
      return {
        type: "boolean",
        key: fieldId,
        path: fieldPath,
        label: key.replace(/([A-Z])/g, ' $1').trim(),
        value: value
      };
    }
    
    if (Array.isArray(value)) {
      return {
        type: "array",
        key: fieldId,
        path: fieldPath,
        label: key.replace(/([A-Z])/g, ' $1').trim(),
        value: value,
        items: value.map((item, index) => ({
          index,
          value: item,
          subFields: typeof item === "object" && item !== null 
            ? Object.entries(item).map(([subKey, subValue]) => 
                renderField(subKey, subValue, `${fieldPath}[${index}]`)
              )
            : null
        }))
      };
    }
    
    if (typeof value === "object" && value !== null) {
      return {
        type: "object",
        key: fieldId,
        path: fieldPath,
        label: key.replace(/([A-Z])/g, ' $1').trim(),
        value: value,
        subFields: Object.entries(value).map(([subKey, subValue]) => 
          renderField(subKey, subValue, fieldPath)
        )
      };
    }
    
    return null;
  };
  
  Object.entries(jsonData).forEach(([key, value]) => {
    const field = renderField(key, value);
    if (field) {
      fields.push(field);
    }
  });
  
  return fields;
};

export const updateJsonFromFormFields = (jsonData, path, value) => {
  const keys = path.split('.');
  const newData = JSON.parse(JSON.stringify(jsonData));
  
  let current = newData;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    
    // Handle array indices
    if (key.includes('[') && key.includes(']')) {
      const arrayKey = key.substring(0, key.indexOf('['));
      const index = parseInt(key.substring(key.indexOf('[') + 1, key.indexOf(']')));
      
      if (!current[arrayKey]) {
        current[arrayKey] = [];
      }
      if (!current[arrayKey][index]) {
        current[arrayKey][index] = {};
      }
      current = current[arrayKey][index];
    } else {
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }
  }
  
  const lastKey = keys[keys.length - 1];
  
  // Handle array indices for the last key
  if (lastKey.includes('[') && lastKey.includes(']')) {
    const arrayKey = lastKey.substring(0, lastKey.indexOf('['));
    const index = parseInt(lastKey.substring(lastKey.indexOf('[') + 1, lastKey.indexOf(']')));
    
    if (!current[arrayKey]) {
      current[arrayKey] = [];
    }
    current[arrayKey][index] = value;
  } else {
    current[lastKey] = value;
  }
  
  return newData;
};
