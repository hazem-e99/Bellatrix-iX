/**
 * Preview Component Registry
 * Maps component type strings to their actual component imports
 * Used by LivePreview to dynamically render components
 * 
 * NOTE: This file now uses the dynamic loader from componentMap.js
 * to avoid duplicate static imports that prevent code-splitting
 */

import { loadComponent, getComponentPathFromId } from '../components/componentMap';

/**
 * Component Registry - Maps component type strings to lazy-loaded components
 * Components are loaded dynamically to enable code-splitting
 */
export const componentRegistry = {};

/**
 * Get component by type string (async)
 * @param {string} componentType - The component type string
 * @returns {Promise<React.Component|null>} The component or null if not found
 */
export const getComponentByType = async (componentType) => {
  try {
    const componentPath = getComponentPathFromId(componentType);
    if (!componentPath) {
      console.warn(`Component type "${componentType}" not found in registry`);
      return null;
    }
    return await loadComponent(componentPath);
  } catch (error) {
    console.error(`Failed to load component "${componentType}":`, error);
    return null;
  }
};

/**
 * Check if a component type exists in the registry
 * @param {string} componentType - The component type string
 * @returns {boolean} True if the component exists
 */
export const hasComponent = (componentType) => {
  return getComponentPathFromId(componentType) !== null;
};

/**
 * Preload a component (useful for prefetching)
 * @param {string} componentType - The component type string
 * @returns {Promise<React.Component|null>}
 */
export const preloadComponent = async (componentType) => {
  return await getComponentByType(componentType);
};

export default {
  getComponentByType,
  hasComponent,
  preloadComponent,
};
