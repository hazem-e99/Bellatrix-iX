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

      // Use the /api/Pages/with-components endpoint if components are included
      const endpoint =
        pageData.components && pageData.components.length > 0
          ? "/Pages/with-components"
          : "/Pages";

      // Prepare the data to send
      let dataToSend = { ...pageData };

      // Make sure each component has its data properly serialized in contentJson
      // AND ensure that orderIndex values are unique and sequential
      if (dataToSend.components && dataToSend.components.length > 0) {
        dataToSend.components = dataToSend.components.map((component, index) => {
          // Create a new component object
          const updatedComponent = {
            componentType: component.componentType || "Generic",
            componentName: component.componentName || `Component ${index + 1}`,
            orderIndex: index,
            contentJson: ""
          };

          // Handle contentJson properly
          if (component.content && typeof component.content === 'object') {
            // If we have a content object, stringify it
            updatedComponent.contentJson = JSON.stringify(component.content);
          } else if (component.contentJson) {
            // If contentJson already exists
            if (typeof component.contentJson === 'string') {
              updatedComponent.contentJson = component.contentJson;
            } else {
              updatedComponent.contentJson = JSON.stringify(component.contentJson);
            }
          } else {
            // Default empty content
            updatedComponent.contentJson = JSON.stringify({});
          }

          return updatedComponent;
        });
      }

      console.log("Prepared data to send:", dataToSend);
      console.log("Components to send:", dataToSend.components);

      const response = await api.post(endpoint, dataToSend);
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
