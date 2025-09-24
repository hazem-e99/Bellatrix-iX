import api from "./api.js";
import pageComponentsAPI from "./pageComponentsAPI.js";

const BASE_URL = "http://bellatrix.runasp.net/api";

/**
 * Pages API service for handling page-related operations
 */
const pagesAPI = {
  /**
   * Get all pages with optional filters
   * @param {Object} params - Query parameters
   * @param {boolean} params.publishedOnly - Filter for published pages only
   * @param {number} params.categoryId - Filter by category ID
   * @returns {Promise<Array>} Array of page summaries
   */
  async getPages(params = {}) {
    try {
      const queryParams = new URLSearchParams();

      if (params.publishedOnly !== undefined) {
        queryParams.append("publishedOnly", params.publishedOnly);
      }

      if (params.categoryId !== undefined) {
        queryParams.append("categoryId", params.categoryId);
      }

      const queryString = queryParams.toString();
      const url = queryString ? `/Pages?${queryString}` : "/Pages";

      // Get the response - the interceptor in api.js will handle unwrapping
      const response = await api.get(url);

      console.log("Pages API response after interceptor:", response);
      console.log("Response data:", response.data);

      // The data should already be unwrapped by the interceptor
      const pages = Array.isArray(response.data) ? response.data : [];
      console.log("Final pages array:", pages);
      return pages;
    } catch (error) {
      console.error("Error fetching pages:", error);
      throw error;
    }
  },

  /**
   * Get a single page by ID
   * @param {number} pageId - The page ID
   * @returns {Promise<Object>} Page details
   */
  async getPageById(pageId) {
    try {
      const response = await api.get(`/Pages/${pageId}`);
      console.log("Get page by ID response:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching page ${pageId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new page
   * @param {Object} pageData - Page creation data
   * @returns {Promise<Object>} Created page data
   */
  async createPage(pageData) {
    try {
      console.log("Original pageData received:", pageData);

      // CRITICAL: Always use /Pages/with-components when components exist
      // This prevents duplicate DB key errors (IX_PageComponents_PageId_OrderIndex)
      const hasComponents = pageData.components && Array.isArray(pageData.components) && pageData.components.length > 0;
      const endpoint = hasComponents ? "/Pages/with-components" : "/Pages";
      
      console.log(`Endpoint selection: ${endpoint} (hasComponents: ${hasComponents}, components count: ${pageData.components?.length || 0})`);

      // Prepare the data to send - remove any id/pageId for new page creation
      let dataToSend = { ...pageData };
      
      // Remove id fields for new page creation to avoid backend treating it as update
      delete dataToSend.id;
      delete dataToSend.pageId;

      // Ensure proper component data formatting for API
      if (dataToSend.components && dataToSend.components.length > 0) {
        console.log("Processing components for API payload...");
        
        dataToSend.components = dataToSend.components.map((component, index) => {
          // Remove any existing id or pageId from components for new creation
          const cleanComponent = { ...component };
          delete cleanComponent.id;
          delete cleanComponent.pageId;

          // Create properly formatted component object
          const formattedComponent = {
            componentType: cleanComponent.componentType || "Generic",
            componentName: cleanComponent.componentName || `Component ${index + 1}`,
            orderIndex: index + 1, // Always use sequential 1-based index to avoid duplicates
            contentJson: "",
          };

          // Handle contentJson serialization properly
          if (cleanComponent.content && typeof cleanComponent.content === "object") {
            // Convert content object to JSON string
            formattedComponent.contentJson = JSON.stringify(cleanComponent.content);
            console.log(`Component ${index}: converted content object to JSON string`);
          } else if (cleanComponent.contentJson) {
            // Use existing contentJson (ensure it's a string)
            if (typeof cleanComponent.contentJson === "string") {
              formattedComponent.contentJson = cleanComponent.contentJson;
            } else {
              formattedComponent.contentJson = JSON.stringify(cleanComponent.contentJson);
            }
            console.log(`Component ${index}: used existing contentJson`);
          } else {
            // Default empty content
            formattedComponent.contentJson = JSON.stringify({});
            console.log(`Component ${index}: set default empty content`);
          }

          return formattedComponent;
        });
        
        console.log(`Processed ${dataToSend.components.length} components for API`);
      }

      // Final logging before API call (for debugging, no side effects)
      console.log("=== API CALL SUMMARY ===");
      console.log("Endpoint:", endpoint);
      console.log("Method: POST");
      console.log("Has Components:", hasComponents);
      console.log("Components Count:", dataToSend.components?.length || 0);
      console.log("Payload Size (chars):", JSON.stringify(dataToSend).length);
      console.log("Final payload:", dataToSend);
      console.log("========================");

      const response = await api.post(endpoint, dataToSend);
      
      console.log("API Response Status:", response.status);
      console.log("API Response Data:", response.data);
      
      return response.data;
    } catch (error) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.message?.includes("duplicate key") &&
        error.response?.data?.message?.includes(
          "IX_PageComponents_PageId_OrderIndex"
        )
      ) {
        throw new Error(
          "Duplicate order index in components. Please try again."
        );
      }
      console.error("Error creating page:", error);
      throw error;
    }
  },

  /**
   * Update an existing page
   * @param {number} pageId - The page ID
   * @param {Object} pageData - Updated page data
   * @returns {Promise<Object>} Updated page data
   */
  async updatePage(pageId, pageData) {
    try {
      console.log("Original updatePageData received:", pageData);
      
      // Prepare UpdatePageDTO according to swagger schema
      const updateData = {
        id: pageId,
        name: pageData.name || pageData.title || "",
        categoryId: pageData.categoryId || 1, // Default category if not provided
        slug: pageData.slug || null,
        metaTitle: pageData.metaTitle || null,
        metaDescription: pageData.metaDescription || null,
        isHomepage: pageData.isHomepage || false,
        isPublished: pageData.isPublished || false
      };

      // Validate required fields
      if (!updateData.name || updateData.name.length < 2) {
        throw new Error("Page name must be at least 2 characters long");
      }
      
      if (updateData.name.length > 100) {
        throw new Error("Page name must not exceed 100 characters");
      }

      if (updateData.slug && updateData.slug.length > 200) {
        throw new Error("Page slug must not exceed 200 characters");
      }

      if (updateData.metaTitle && updateData.metaTitle.length > 60) {
        throw new Error("Meta title must not exceed 60 characters");
      }

      if (updateData.metaDescription && updateData.metaDescription.length > 160) {
        throw new Error("Meta description must not exceed 160 characters");
      }

      console.log("UpdatePageDTO prepared:", updateData);

      const response = await api.put("/Pages", updateData);
      console.log("Update page response:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating page ${pageId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a page
   * @param {number} pageId - The page ID
   * @returns {Promise<void>}
   */
  async deletePage(pageId) {
    try {
      await api.delete(`/Pages/${pageId}`);
    } catch (error) {
      console.error(`Error deleting page ${pageId}:`, error);
      throw error;
    }
  },

  /**
   * Get all categories for dropdown selection
   * @returns {Promise<Array>} Array of categories
   */
  async getCategories() {
    try {
      const response = await api.get("/Categories");
      console.log("Categories API response:", response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  /**
   * Get page components by page ID
   * @param {number} pageId - The page ID
   * @returns {Promise<Array>} Array of page components
   */
  async getPageComponents(pageId) {
    try {
      const response = await api.get(`/Pages/${pageId}/components`);
      console.log("Page components response:", response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(`Error fetching components for page ${pageId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new page component
   * @param {number} pageId - The page ID
   * @param {Object} componentData - Component creation data
   * @returns {Promise<Object>} Created component data
   */
  async createPageComponent(pageId, componentData) {
    try {
      const createData = {
        pageId: pageId,
        componentType: componentData.componentType || "Generic",
        componentName: componentData.componentName || "",
        contentJson: componentData.contentJson || JSON.stringify({}),
        orderIndex: componentData.orderIndex || 1
      };

      console.log("Creating page component:", createData);
      const response = await api.post(`/Pages/${pageId}/components`, createData);
      console.log("Create component response:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error creating component for page ${pageId}:`, error);
      throw error;
    }
  },

  /**
   * Update an existing page component
   * @param {number} componentId - The component ID
   * @param {Object} componentData - Updated component data
   * @returns {Promise<Object>} Updated component data
   */
  async updatePageComponent(componentId, componentData) {
    try {
      const updateData = {
        id: componentId,
        componentType: componentData.componentType || "Generic",
        componentName: componentData.componentName || "",
        contentJson: componentData.contentJson || JSON.stringify({}),
        orderIndex: componentData.orderIndex || 1
      };

      console.log("Updating page component:", updateData);
      const response = await api.put(`/Pages/components/${componentId}`, updateData);
      console.log("Update component response:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating component ${componentId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a page component
   * @param {number} componentId - The component ID
   * @returns {Promise<void>}
   */
  async deletePageComponent(componentId) {
    try {
      await api.delete(`/Pages/components/${componentId}`);
      console.log(`Component ${componentId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting component ${componentId}:`, error);
      throw error;
    }
  },

  /**
   * Reorder page components by updating each component individually
   * @param {number} pageId - The page ID
   * @param {Array} components - Array of component objects with their data
   * @returns {Promise<void>}
   */
  async reorderPageComponents(pageId, components) {
    try {
      // First, set all components to temporary high orderIndex to avoid conflicts
      console.log("Setting temporary orderIndex to avoid conflicts...");
      const tempOrderPromises = components.map(async (component) => {
        const tempOrderIndex = 1000 + component.id; // Use high temporary values
        const updateData = {
          id: component.id,
          componentType: component.componentType,
          componentName: component.componentName,
          contentJson: component.contentJson,
          orderIndex: tempOrderIndex
        };
        return await this.updatePageComponent(component.id, updateData);
      });
      
      await Promise.all(tempOrderPromises);
      console.log("Temporary orderIndex set successfully");
      
      // Now update each component to its final orderIndex sequentially
      console.log("Setting final orderIndex...");
      for (let i = 0; i < components.length; i++) {
        const component = components[i];
        const finalOrderIndex = i + 1; // Start from 1
        console.log(`Updating component ${component.id} to final order ${finalOrderIndex}`);
        
        const updateData = {
          id: component.id,
          componentType: component.componentType,
          componentName: component.componentName,
          contentJson: component.contentJson,
          orderIndex: finalOrderIndex
        };
        
        await this.updatePageComponent(component.id, updateData);
      }
      
      console.log(`Successfully reordered ${components.length} components for page ${pageId}`);
    } catch (error) {
      console.error(`Error reordering components for page ${pageId}:`, error);
      throw error;
    }
  },

  /**
   * Search pages (legacy method for compatibility)
   * @param {string} query - Search query
   * @returns {Promise<Array>} Search results
   */
  async searchPages(query) {
    try {
      // For now, we'll get all pages and filter client-side
      // In the future, this could be enhanced with a proper search endpoint
      const allPages = await this.getPages();

      if (!query) return allPages;

      const lowercaseQuery = query.toLowerCase();
      return allPages.filter(
        (page) =>
          page.title?.toLowerCase().includes(lowercaseQuery) ||
          page.slug?.toLowerCase().includes(lowercaseQuery) ||
          page.categoryName?.toLowerCase().includes(lowercaseQuery)
      );
    } catch (error) {
      console.error("Error searching pages:", error);
      throw error;
    }
  },
};

// Export page components service as well to be used by components
export const pageComponentsService = pageComponentsAPI;

export default pagesAPI;
