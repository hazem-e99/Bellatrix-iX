import api from "./api.js";
import pageComponentsAPI from "./pageComponentsAPI.js";

const BASE_URL = "http://bellatrix.runasp.net/api";

/**
 * API debugging helper function
 */
const debugAPIResponse = (response, endpoint) => {
  // Debug logging removed
};

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

      // The data should already be unwrapped by the interceptor
      const pages = Array.isArray(response.data) ? response.data : [];
      return pages;
    } catch (error) {
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
      return response.data;
    } catch (error) {
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
      // CRITICAL: Always use /Pages/with-components when components exist
      // This prevents duplicate DB key errors (IX_PageComponents_PageId_OrderIndex)
      const hasComponents =
        pageData.components &&
        Array.isArray(pageData.components) &&
        pageData.components.length > 0;
      const endpoint = hasComponents ? "/Pages/with-components" : "/Pages";

      // Prepare the data to send - remove any id/pageId for new page creation
      let dataToSend = { ...pageData };

      // Remove id fields for new page creation to avoid backend treating it as update
      delete dataToSend.id;
      delete dataToSend.pageId;

      // Ensure proper component data formatting for API
      if (dataToSend.components && dataToSend.components.length > 0) {
        dataToSend.components = dataToSend.components.map(
          (component, index) => {
            // Remove any existing id or pageId from components for new creation
            const cleanComponent = { ...component };
            delete cleanComponent.id;
            delete cleanComponent.pageId;

            // Create properly formatted component object
            const formattedComponent = {
              componentType: cleanComponent.componentType || "Generic",
              componentName:
                cleanComponent.componentName || `Component ${index + 1}`,
              orderIndex: index + 1, // Always use sequential 1-based index to avoid duplicates
              contentJson: "",
              // Add isVisible and theme from component data
              isVisible: cleanComponent.isVisible !== undefined ? cleanComponent.isVisible : true,
              theme: cleanComponent.theme !== undefined ? cleanComponent.theme : 1,
            };

            // Handle contentJson serialization properly
            if (
              cleanComponent.content &&
              typeof cleanComponent.content === "object"
            ) {
              // Convert content object to JSON string
              formattedComponent.contentJson = JSON.stringify(
                cleanComponent.content
              );
            } else if (cleanComponent.contentJson) {
              // Use existing contentJson (ensure it's a string)
              if (typeof cleanComponent.contentJson === "string") {
                formattedComponent.contentJson = cleanComponent.contentJson;
              } else {
                formattedComponent.contentJson = JSON.stringify(
                  cleanComponent.contentJson
                );
              }
            } else {
              // Default empty content
              formattedComponent.contentJson = JSON.stringify({});
            }

            return formattedComponent;
          }
        );
      }

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
      // Prepare UpdatePageDTO according to swagger schema
      const updateData = {
        id: pageId,
        name: pageData.name || pageData.title || "",
        categoryId: pageData.categoryId || 1, // Default category if not provided
        slug: pageData.slug || null,
        metaTitle: pageData.metaTitle || null,
        metaDescription: pageData.metaDescription || null,
        isHomepage: pageData.isHomepage || false,
        isPublished: pageData.isPublished || false,
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

      if (
        updateData.metaDescription &&
        updateData.metaDescription.length > 160
      ) {
        throw new Error("Meta description must not exceed 160 characters");
      }

      const response = await api.put("/Pages", updateData);
      return response.data;
    } catch (error) {
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
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
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
      // Use the direct components endpoint as requested
      const response = await api.get(`/Pages/${pageId}/components`);

      // The response should already be unwrapped by the interceptor
      const components = Array.isArray(response.data) ? response.data : [];

      console.log("📦 [PAGES API] Fetched components from direct endpoint:", {
        pageId,
        componentsCount: components.length,
        components: components.map((c) => ({
          id: c.id,
          componentType: c.componentType,
          theme: c.theme,
          isVisible: c.isVisible,
        })),
      });

      return components;
    } catch (error) {
      console.error("❌ [PAGES API] Error fetching components:", error);
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
        contentJson:
          typeof componentData.contentJson === "string"
            ? componentData.contentJson
            : JSON.stringify(componentData.contentJson || {}),
        orderIndex:
          componentData.orderIndex !== undefined ? componentData.orderIndex : 1,
        isVisible:
          componentData.isVisible !== undefined
            ? componentData.isVisible
            : true,
        theme: componentData.theme !== undefined ? componentData.theme : 1,
      };

      console.log("🆕 [API CREATE] Creating component with data:", {
        createData,
        isVisibleValue: createData.isVisible,
        isVisibleType: typeof createData.isVisible,
      });

      const response = await api.post(
        `/Pages/${pageId}/components`,
        createData
      );

      console.log(
        "✅ [API CREATE] Component created successfully:",
        response.data
      );
      return response.data;
    } catch (error) {
      console.error("❌ [API CREATE] Component creation failed:", {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
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
      // Prepare the complete component data structure as expected by the API
      const updateData = {
        id: componentId, // Include the component ID
        pageId: componentData.pageId, // Include the page ID
        componentType: componentData.componentType || "Generic",
        componentName: componentData.componentName || "",
        contentJson:
          typeof componentData.contentJson === "string"
            ? componentData.contentJson
            : JSON.stringify(componentData.contentJson || {}),
        orderIndex:
          componentData.orderIndex !== undefined ? componentData.orderIndex : 0,
        isVisible:
          componentData.isVisible !== undefined
            ? componentData.isVisible
            : true,
        theme: componentData.theme !== undefined ? componentData.theme : 1, // ThemeMode enum: 1 = light, 2 = dark
      };

      console.log("🔄 [API UPDATE] Sending component update:", {
        componentId,
        updateData,
        originalData: componentData,
        isVisibleValue: updateData.isVisible,
        isVisibleType: typeof updateData.isVisible,
      });

      const response = await api.put(
        `/Pages/components/${componentId}`,
        updateData
      );
      console.log(
        "✅ [API UPDATE] Component update successful:",
        response.data
      );
      return response.data;
    } catch (error) {
      console.error("❌ [API UPDATE] Component update failed:", error);
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
      const response = await api.delete(`/Pages/components/${componentId}`);

      debugAPIResponse(response, "DELETE_COMPONENT");

      return response.data;
    } catch (error) {
      if (error.response) {
        debugAPIResponse(error.response, "DELETE_COMPONENT_ERROR");
      }

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
      const tempOrderPromises = components.map(async (component) => {
        const tempOrderIndex = 1000 + component.id; // Use high temporary values
        const updateData = {
          id: component.id,
          componentType: component.componentType,
          componentName: component.componentName,
          contentJson: component.contentJson,
          orderIndex: tempOrderIndex,
        };
        return await this.updatePageComponent(component.id, updateData);
      });

      await Promise.all(tempOrderPromises);

      // Now update each component to its final orderIndex sequentially
      for (let i = 0; i < components.length; i++) {
        const component = components[i];
        const finalOrderIndex = i + 1; // Start from 1

        const updateData = {
          id: component.id,
          componentType: component.componentType,
          componentName: component.componentName,
          contentJson: component.contentJson,
          orderIndex: finalOrderIndex,
        };

        await this.updatePageComponent(component.id, updateData);
      }
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a public page by slug (for frontend display)
   * @param {string} slug - The page slug
   * @returns {Promise<Object>} Public page data with components
   */
  async getPublicPageBySlug(slug) {
    try {
      const response = await api.get(`/Pages/public/${slug}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Check if a slug already exists
   * @param {string} slug - The slug to check
   * @param {number} excludeId - Optional page ID to exclude from check (for updates)
   * @returns {Promise<Object>} Response with exists property
   */
  async checkSlugExists(slug, excludeId = null) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("slug", slug);
      if (excludeId) {
        queryParams.append("excludeId", excludeId);
      }

      const response = await api.get(`/Pages/check-slug?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      // If endpoint doesn't exist, fallback to checking all pages
      try {
        const allPages = await this.getPages();
        const exists = allPages.some(page => 
          page.slug === slug && (!excludeId || page.id !== excludeId)
        );
        return { data: exists };
      } catch (fallbackError) {
        console.error("Error checking slug existence:", fallbackError);
        return { data: false }; // Default to available if we can't check
      }
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
      throw error;
    }
  },
};

// Export page components service as well to be used by components
export const pageComponentsService = pageComponentsAPI;

export default pagesAPI;
