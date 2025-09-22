import { usePageContext } from '../contexts/PageContext';
import { pageUtils } from '../services/pagesService';

/**
 * Custom hook for page management operations
 * Provides easy access to page-related functionality
 */
export const usePages = () => {
  const context = usePageContext();

  // Enhanced page operations with validation and utilities
  const pageOperations = {
    // Create page with validation
    createPage: async (pageData) => {
      const validationErrors = pageUtils.validatePageData(pageData);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      const transformedData = pageUtils.transformPageForAPI(pageData);
      return await context.createPage(transformedData);
    },

    // Update page with validation
    updatePage: async (pageData) => {
      const validationErrors = pageUtils.validatePageData(pageData);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      const transformedData = pageUtils.transformPageForAPI(pageData);
      return await context.updatePage(transformedData);
    },

    // Create page with auto-generated slug
    createPageWithSlug: async (pageData) => {
      if (!pageData.slug && pageData.name) {
        pageData.slug = pageUtils.generateSlug(pageData.name);
      }
      return await pageOperations.createPage(pageData);
    },

    // Create page with components
    createPageWithComponents: async (pageData, components = []) => {
      if (!pageData.slug && pageData.name) {
        pageData.slug = pageUtils.generateSlug(pageData.name);
      }
      
      const pageWithComponents = {
        ...pageData,
        components: components
      };
      
      return await pageOperations.createPage(pageWithComponents);
    },

    // Update page with auto-generated slug
    updatePageWithSlug: async (pageData) => {
      if (!pageData.slug && pageData.name) {
        pageData.slug = pageUtils.generateSlug(pageData.name);
      }
      return await pageOperations.updatePage(pageData);
    },

    // Check if slug is available
    isSlugAvailable: async (slug, excludeId = null) => {
      try {
        const response = await context.checkSlugExists(slug, excludeId);
        return !response.data; // If data is false, slug is available
      } catch (error) {
        console.error('Error checking slug availability:', error);
        return false;
      }
    },

    // Generate unique slug
    generateUniqueSlug: async (baseSlug, excludeId = null) => {
      let slug = baseSlug;
      let counter = 1;
      
      while (!(await pageOperations.isSlugAvailable(slug, excludeId))) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      
      return slug;
    },

    // Toggle page publication status
    togglePagePublication: async (pageId) => {
      const page = context.pages.find(p => p.id === pageId);
      if (!page) {
        throw new Error('Page not found');
      }

      if (page.isPublished) {
        return await context.unpublishPage(pageId);
      } else {
        return await context.publishPage(pageId);
      }
    },

    // Get published pages only
    getPublishedPages: () => {
      return context.pages.filter(page => page.isPublished);
    },

    // Get unpublished pages only
    getUnpublishedPages: () => {
      return context.pages.filter(page => !page.isPublished);
    },

    // Get homepage
    getHomepage: () => {
      return context.pages.find(page => page.isHomepage);
    },

    // Get pages by category
    getPagesByCategory: (categoryId) => {
      return context.pages.filter(page => page.categoryId === categoryId);
    },

    // Search pages locally (for instant results)
    searchPagesLocally: (searchTerm) => {
      if (!searchTerm) return context.pages;
      
      const term = searchTerm.toLowerCase();
      return context.pages.filter(page => 
        page.name.toLowerCase().includes(term) ||
        (page.slug && page.slug.toLowerCase().includes(term)) ||
        (page.metaTitle && page.metaTitle.toLowerCase().includes(term)) ||
        (page.metaDescription && page.metaDescription.toLowerCase().includes(term))
      );
    },

    // Bulk operations
    bulkPublish: async (pageIds) => {
      const results = [];
      for (const pageId of pageIds) {
        try {
          const result = await context.publishPage(pageId);
          results.push({ pageId, success: true, result });
        } catch (error) {
          results.push({ pageId, success: false, error: error.message });
        }
      }
      return results;
    },

    bulkUnpublish: async (pageIds) => {
      const results = [];
      for (const pageId of pageIds) {
        try {
          const result = await context.unpublishPage(pageId);
          results.push({ pageId, success: true, result });
        } catch (error) {
          results.push({ pageId, success: false, error: error.message });
        }
      }
      return results;
    },

    bulkDelete: async (pageIds) => {
      const results = [];
      for (const pageId of pageIds) {
        try {
          const result = await context.deletePage(pageId);
          results.push({ pageId, success: true, result });
        } catch (error) {
          results.push({ pageId, success: false, error: error.message });
        }
      }
      return results;
    }
  };

  // Filter and pagination helpers
  const filterHelpers = {
    // Apply filters to pages
    applyFilters: (pages, filters) => {
      let filteredPages = [...pages];

      if (filters.publishedOnly !== undefined) {
        filteredPages = filteredPages.filter(page => page.isPublished === filters.publishedOnly);
      }

      if (filters.categoryId) {
        filteredPages = filteredPages.filter(page => page.categoryId === filters.categoryId);
      }

      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        filteredPages = filteredPages.filter(page => 
          page.name.toLowerCase().includes(term) ||
          (page.slug && page.slug.toLowerCase().includes(term)) ||
          (page.metaTitle && page.metaTitle.toLowerCase().includes(term))
        );
      }

      return filteredPages;
    },

    // Paginate pages
    paginatePages: (pages, currentPage = 1, itemsPerPage = 10) => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedPages = pages.slice(startIndex, endIndex);
      
      return {
        pages: paginatedPages,
        totalPages: Math.ceil(pages.length / itemsPerPage),
        totalItems: pages.length,
        currentPage,
        itemsPerPage,
        hasNextPage: currentPage < Math.ceil(pages.length / itemsPerPage),
        hasPreviousPage: currentPage > 1
      };
    },

    // Sort pages
    sortPages: (pages, sortBy = 'name', sortOrder = 'asc') => {
      return [...pages].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        // Handle different data types
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (sortOrder === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }
  };

  // Statistics helpers
  const statistics = {
    getTotalPages: () => context.pages.length,
    getPublishedCount: () => context.pages.filter(p => p.isPublished).length,
    getUnpublishedCount: () => context.pages.filter(p => !p.isPublished).length,
    getHomepageCount: () => context.pages.filter(p => p.isHomepage).length,
    getPagesByCategoryCount: (categoryId) => 
      context.pages.filter(p => p.categoryId === categoryId).length,
    
    getPageStatistics: () => ({
      total: context.pages.length,
      published: context.pages.filter(p => p.isPublished).length,
      unpublished: context.pages.filter(p => !p.isPublished).length,
      homepage: context.pages.filter(p => p.isHomepage).length,
      categories: [...new Set(context.pages.map(p => p.categoryId))].length
    })
  };

  return {
    // State
    pages: context.pages,
    currentPage: context.currentPage,
    loading: context.loading,
    error: context.error,
    filters: context.filters,
    pagination: context.pagination,

    // Actions
    fetchPages: context.fetchPages,
    setCurrentPage: context.setCurrentPage,
    setFilters: context.setFilters,
    setPagination: context.setPagination,
    clearError: context.clearError,
    resetState: context.resetState,

    // Enhanced operations
    ...pageOperations,

    // Filter helpers
    ...filterHelpers,

    // Statistics
    ...statistics,

    // Direct API operations (for advanced usage)
    apiOperations: {
      createPage: context.createPage,
      updatePage: context.updatePage,
      deletePage: context.deletePage,
      publishPage: context.publishPage,
      unpublishPage: context.unpublishPage,
      duplicatePage: context.duplicatePage,
      setHomepage: context.setHomepage,
      searchPages: context.searchPages,
      checkSlugExists: context.checkSlugExists,
      createPageWithComponents: context.createPageWithComponents
    }
  };
};

export default usePages;
