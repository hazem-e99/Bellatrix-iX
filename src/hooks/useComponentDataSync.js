import { useState, useEffect, useCallback, useRef } from 'react';
import { getAboutComponentSchema } from '../data/aboutComponentSchemas';

/**
 * Real-time Component Data Synchronization Hook
 * Manages data flow between form inputs, preview, and backend storage
 */
export const useComponentDataSync = ({
  componentType,
  initialData = {},
  onDataChange,
  debounceMs = 300
}) => {
  const [formData, setFormData] = useState(initialData);
  const [previewData, setPreviewData] = useState(initialData);
  const [isDirty, setIsDirty] = useState(false);
  const [_isLoading, _setIsLoading] = useState(false); // eslint-disable-line no-unused-vars
  const [error, setError] = useState(null);
  
  const debounceTimeoutRef = useRef(null);
  const lastSyncedDataRef = useRef(JSON.stringify(initialData));
  const initialDataStringRef = useRef(JSON.stringify(initialData));

  // Initialize data on component type or initial data change
  useEffect(() => {
    const currentInitialDataString = JSON.stringify(initialData);
    
    // Only update if the serialized data actually changed
    if (currentInitialDataString !== initialDataStringRef.current) {
      initialDataStringRef.current = currentInitialDataString;
    }
    
    const schema = getAboutComponentSchema(componentType);
    let newData = initialData;
    
    // If no initial data and component has schema, use default data
    if ((!initialData || Object.keys(initialData).length === 0) && schema?.defaultData) {
      newData = schema.defaultData;
    }
    
    setFormData(newData);
    setPreviewData(newData);
    setIsDirty(false);
    lastSyncedDataRef.current = JSON.stringify(newData);
  }, [componentType, initialData]);

  // Debounced data synchronization
  const syncData = useCallback((data) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      const dataString = JSON.stringify(data);
      
      // Only sync if data actually changed
      if (dataString !== lastSyncedDataRef.current) {
        setPreviewData(data);
        
        if (onDataChange) {
          onDataChange(data);
        }
        
        lastSyncedDataRef.current = dataString;
        setIsDirty(false);
        console.log(`🔄 [useComponentDataSync] Synced data for ${componentType}:`, data);
      }
    }, debounceMs);
  }, [componentType, onDataChange, debounceMs]);

  // Update form data and trigger sync
  const updateFormData = useCallback((newData) => {
    setFormData(newData);
    setIsDirty(true);
    syncData(newData);
  }, [syncData]);

  // Update specific field in form data
  const updateField = useCallback((path, value) => {
    setFormData(currentData => {
      const updatedData = { ...currentData };
      
      // Handle nested path updates (e.g., "ctaButton.text")
      const pathArray = path.split('.');
      let current = updatedData;
      
      for (let i = 0; i < pathArray.length - 1; i++) {
        if (!current[pathArray[i]]) {
          current[pathArray[i]] = {};
        }
        current = current[pathArray[i]];
      }
      
      current[pathArray[pathArray.length - 1]] = value;
      
      setIsDirty(true);
      syncData(updatedData);
      
      return updatedData;
    });
  }, [syncData]);

  // Update array field (add, remove, reorder items)
  const updateArrayField = useCallback((path, operation, ...args) => {
    setFormData(currentData => {
      const updatedData = { ...currentData };
      const pathArray = path.split('.');
      let current = updatedData;
      
      // Navigate to the array
      for (let i = 0; i < pathArray.length - 1; i++) {
        if (!current[pathArray[i]]) {
          current[pathArray[i]] = {};
        }
        current = current[pathArray[i]];
      }
      
      const arrayKey = pathArray[pathArray.length - 1];
      if (!current[arrayKey]) {
        current[arrayKey] = [];
      }
      
      // Perform array operation
      switch (operation) {
        case 'add': {
          const [newItem] = args;
          current[arrayKey].push(newItem);
          break;
        }
          
        case 'remove': {
          const [removeIndex] = args;
          current[arrayKey].splice(removeIndex, 1);
          break;
        }
          
        case 'move': {
          const [fromIndex, toIndex] = args;
          const item = current[arrayKey][fromIndex];
          current[arrayKey].splice(fromIndex, 1);
          current[arrayKey].splice(toIndex, 0, item);
          break;
        }
          
        case 'update': {
          const [updateIndex, newValue] = args;
          current[arrayKey][updateIndex] = newValue;
          break;
        }
          
        default:
          console.warn('Unknown array operation:', operation);
          return currentData;
      }
      
      setIsDirty(true);
      syncData(updatedData);
      
      return updatedData;
    });
  }, [syncData]);

  // Reset to initial state
  const resetData = useCallback(() => {
    const schema = getAboutComponentSchema(componentType);
    const resetData = schema?.defaultData || {};
    
    setFormData(resetData);
    setPreviewData(resetData);
    setIsDirty(false);
    setError(null);
    
    lastSyncedDataRef.current = JSON.stringify(resetData);
    
    if (onDataChange) {
      onDataChange(resetData);
    }
  }, [componentType, onDataChange]);

  // Validate data against schema
  const validateData = useCallback((data = formData) => {
    try {
      const schema = getAboutComponentSchema(componentType);
      if (!schema?.schema) {
        return { isValid: true, errors: [] };
      }
      
      const errors = [];
      const { properties } = schema.schema;
      
      // Check required fields
      Object.entries(properties).forEach(([key, fieldSchema]) => {
        if (fieldSchema.required && (!data[key] || data[key] === '')) {
          errors.push({
            field: key,
            message: `${fieldSchema.label} is required`
          });
        }
        
        // Validate array min/max items
        if (fieldSchema.type === 'array' && Array.isArray(data[key])) {
          if (fieldSchema.minItems && data[key].length < fieldSchema.minItems) {
            errors.push({
              field: key,
              message: `${fieldSchema.label} must have at least ${fieldSchema.minItems} item(s)`
            });
          }
          if (fieldSchema.maxItems && data[key].length > fieldSchema.maxItems) {
            errors.push({
              field: key,
              message: `${fieldSchema.label} cannot have more than ${fieldSchema.maxItems} item(s)`
            });
          }
        }
      });
      
      const isValid = errors.length === 0;
      
      if (!isValid) {
        setError(errors[0].message); // Set first error
      } else {
        setError(null);
      }
      
      return { isValid, errors };
    } catch (err) {
      console.error('Validation error:', err);
      setError('Validation failed');
      return { isValid: false, errors: [{ message: 'Validation failed' }] };
    }
  }, [componentType, formData]);

  // Force sync (bypass debounce)
  const forceSync = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    setPreviewData(formData);
    
    if (onDataChange) {
      onDataChange(formData);
    }
    
    lastSyncedDataRef.current = JSON.stringify(formData);
    setIsDirty(false);
    
    console.log(`⚡ [useComponentDataSync] Force synced data for ${componentType}`);
  }, [formData, componentType, onDataChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    // Data state
    formData,
    previewData,
    isDirty,
    error,
    
    // Data manipulation methods
    updateFormData,
    updateField,
    updateArrayField,
    resetData,
    forceSync,
    
    // Validation
    validateData,
    
    // Utility methods
    getSchema: () => getAboutComponentSchema(componentType),
    hasSchema: () => !!getAboutComponentSchema(componentType),
  };
};

export default useComponentDataSync;
