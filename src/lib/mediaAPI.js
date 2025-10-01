import api from "./api.js";

const BASE_HOST = "http://bellatrix.runasp.net";
const BASE_API = `${BASE_HOST}/api`;

/**
 * Media API service for handling media-related operations
 */
const mediaAPI = {
  /**
   * Fetch media from the backend
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.pageSize - Number of items per page (default: 24)
   * @param {string} params.type - Media type filter (image/video)
   * @param {string} params.role - Media role filter
   * @param {string} params.searchTerm - Search term
   * @returns {Promise<Array>} Array of media items
   */
  async fetchMedia(params = {}) {
    try {
      const { page = 1, pageSize = 24, type, role, searchTerm } = params;

      const queryParams = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (type && type !== "all") {
        queryParams.append("type", type);
      }
      if (role) {
        queryParams.append("role", role);
      }
      if (searchTerm) {
        queryParams.append("searchTerm", searchTerm);
      }

      const response = await api.get(`/Media?${queryParams}`);

      // The api.js interceptor should handle the wrapped response
      return {
        data: Array.isArray(response.data) ? response.data : [],
        hasMore: response.data?.length === pageSize,
        total: response.data?.length || 0,
      };
    } catch (error) {
      console.error("Error fetching media:", error);
      throw error;
    }
  },

  /**
   * Upload single media file
   * @param {File} file - File to upload
   * @param {Object} options - Upload options
   * @param {string} options.role - Media role
   * @returns {Promise<Object>} Upload response
   */
  async uploadMedia(file, options = {}) {
    try {
      const formData = new FormData();
      formData.append("File", file);
      formData.append("Role", "12"); // 12 = General role
      formData.append("AlternateText", file.name);
      formData.append("Caption", "Uploaded media");
      formData.append("SortOrder", "1");

      // Get auth token
      const token = localStorage.getItem("authToken");

      const response = await fetch(`${BASE_API}/Media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Upload failed");
      }

      console.log("📤 MediaAPI upload response:", result);
      return result.data;
    } catch (error) {
      console.error("Error uploading media:", error);
      throw error;
    }
  },

  /**
   * Upload multiple media files
   * @param {FileList|Array<File>} files - Files to upload
   * @param {Object} options - Upload options
   * @returns {Promise<Array>} Array of upload responses
   */
  async uploadMultipleMedia(files, options = {}) {
    try {
      const uploadPromises = Array.from(files).map((file) =>
        this.uploadMedia(file, options)
      );

      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading multiple media:", error);
      throw error;
    }
  },

  /**
   * Delete media item
   * @param {number} mediaId - Media ID to delete
   * @returns {Promise<boolean>} Success status
   */
  async deleteMedia(mediaId) {
    try {
      await api.delete(`/Media/${mediaId}`);
      return true;
    } catch (error) {
      console.error("Error deleting media:", error);
      throw error;
    }
  },

  /**
   * Update media item
   * @param {number} mediaId - Media ID
   * @param {Object} updates - Updates to apply
   * @returns {Promise<Object>} Updated media item
   */
  async updateMedia(mediaId, updates) {
    try {
      const response = await api.put(`/Media/${mediaId}`, updates);
      return response.data;
    } catch (error) {
      console.error("Error updating media:", error);
      throw error;
    }
  },

  /**
   * Get media item by ID
   * @param {number} mediaId - Media ID
   * @returns {Promise<Object>} Media item
   */
  async getMediaById(mediaId) {
    try {
      const response = await api.get(`/Media/${mediaId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching media by ID:", error);
      throw error;
    }
  },

  /**
   * Get media item by ID from public endpoint
   * @param {number} mediaId - Media ID
   * @returns {Promise<Object>} Media item with fileUrl
   */
  async getMediaPublicById(mediaId) {
    try {
      const response = await api.get(`/Media/public/${mediaId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching public media by ID:", error);
      throw error;
    }
  },
};

export default mediaAPI;
