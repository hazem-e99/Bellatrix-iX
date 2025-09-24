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
      const response = await api.put(`/Pages/${pageId}`, pageData);
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
