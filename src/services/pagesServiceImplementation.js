import pagesAPI, { pageComponentsService } from "../lib/pagesAPI.js";

// This module creates and exports the services needed by the application
// while using our enhanced pageComponentsAPI under the hood

export const pagesService = pagesAPI;
export { pageComponentsService };

// Export utilities for component validation and transformation
export const pageUtils = {
  validateComponentData: (componentData) => {
    const errors = [];

    if (!componentData.componentType) {
      errors.push("Component type is required");
    }

    // Add any other validation rules as needed

    return errors;
  },

  transformComponentForAPI: (componentData) => {
    // Ensure contentJson is a string
    const transformedData = { ...componentData };

    if (
      transformedData.contentJson &&
      typeof transformedData.contentJson !== "string"
    ) {
      transformedData.contentJson = JSON.stringify(transformedData.contentJson);
    }

    return transformedData;
  },

  transformPageForAPI: (pageData) => {
    // Return a copy of the page data with any necessary transformations
    return { ...pageData };
  },

  generateSlug: (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  },
};
