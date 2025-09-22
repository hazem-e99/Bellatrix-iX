import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { pagesService, pageComponentsService } from '../services/pagesService';

// Initial state
const initialState = {
  pages: [],
  currentPage: null,
  pageComponents: [],
  loading: false,
  error: null,
  filters: {
    publishedOnly: false,
    categoryId: null,
    searchTerm: ''
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  }
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_PAGES: 'SET_PAGES',
  ADD_PAGE: 'ADD_PAGE',
  UPDATE_PAGE: 'UPDATE_PAGE',
  DELETE_PAGE: 'DELETE_PAGE',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_PAGE_COMPONENTS: 'SET_PAGE_COMPONENTS',
  ADD_PAGE_COMPONENT: 'ADD_PAGE_COMPONENT',
  UPDATE_PAGE_COMPONENT: 'UPDATE_PAGE_COMPONENT',
  DELETE_PAGE_COMPONENT: 'DELETE_PAGE_COMPONENT',
  REORDER_COMPONENTS: 'REORDER_COMPONENTS',
  SET_FILTERS: 'SET_FILTERS',
  SET_PAGINATION: 'SET_PAGINATION',
  RESET_STATE: 'RESET_STATE'
};

// Reducer function
const pageReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: action.payload ? null : state.error
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case ActionTypes.SET_PAGES:
      return {
        ...state,
        pages: action.payload,
        loading: false,
        error: null
      };

    case ActionTypes.ADD_PAGE:
      return {
        ...state,
        pages: [action.payload, ...state.pages],
        loading: false,
        error: null
      };

    case ActionTypes.UPDATE_PAGE:
      return {
        ...state,
        pages: state.pages.map(page => 
          page.id === action.payload.id ? action.payload : page
        ),
        currentPage: state.currentPage?.id === action.payload.id ? action.payload : state.currentPage,
        loading: false,
        error: null
      };

    case ActionTypes.DELETE_PAGE:
      return {
        ...state,
        pages: state.pages.filter(page => page.id !== action.payload),
        currentPage: state.currentPage?.id === action.payload ? null : state.currentPage,
        loading: false,
        error: null
      };

    case ActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
        loading: false,
        error: null
      };

    case ActionTypes.SET_PAGE_COMPONENTS:
      return {
        ...state,
        pageComponents: action.payload,
        loading: false,
        error: null
      };

    case ActionTypes.ADD_PAGE_COMPONENT:
      return {
        ...state,
        pageComponents: [...state.pageComponents, action.payload],
        loading: false,
        error: null
      };

    case ActionTypes.UPDATE_PAGE_COMPONENT:
      return {
        ...state,
        pageComponents: state.pageComponents.map(component =>
          component.id === action.payload.id ? action.payload : component
        ),
        loading: false,
        error: null
      };

    case ActionTypes.DELETE_PAGE_COMPONENT:
      return {
        ...state,
        pageComponents: state.pageComponents.filter(component => component.id !== action.payload),
        loading: false,
        error: null
      };

    case ActionTypes.REORDER_COMPONENTS:
      return {
        ...state,
        pageComponents: action.payload,
        loading: false,
        error: null
      };

    case ActionTypes.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };

    case ActionTypes.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload }
      };

    case ActionTypes.RESET_STATE:
      return initialState;

    default:
      return state;
  }
};

// Create context
const PageContext = createContext();

// Provider component
export const PageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pageReducer, initialState);

  // Action creators
  const actions = {
    setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    clearError: () => dispatch({ type: ActionTypes.CLEAR_ERROR }),
    
    // Pages actions
    setPages: (pages) => dispatch({ type: ActionTypes.SET_PAGES, payload: pages }),
    addPage: (page) => dispatch({ type: ActionTypes.ADD_PAGE, payload: page }),
    updatePage: (page) => dispatch({ type: ActionTypes.UPDATE_PAGE, payload: page }),
    deletePage: (pageId) => dispatch({ type: ActionTypes.DELETE_PAGE, payload: pageId }),
    setCurrentPage: (page) => dispatch({ type: ActionTypes.SET_CURRENT_PAGE, payload: page }),
    
    // Components actions
    setPageComponents: (components) => dispatch({ type: ActionTypes.SET_PAGE_COMPONENTS, payload: components }),
    addPageComponent: (component) => dispatch({ type: ActionTypes.ADD_PAGE_COMPONENT, payload: component }),
    updatePageComponent: (component) => dispatch({ type: ActionTypes.UPDATE_PAGE_COMPONENT, payload: component }),
    deletePageComponent: (componentId) => dispatch({ type: ActionTypes.DELETE_PAGE_COMPONENT, payload: componentId }),
    reorderComponents: (components) => dispatch({ type: ActionTypes.REORDER_COMPONENTS, payload: components }),
    
    // Filters and pagination
    setFilters: (filters) => dispatch({ type: ActionTypes.SET_FILTERS, payload: filters }),
    setPagination: (pagination) => dispatch({ type: ActionTypes.SET_PAGINATION, payload: pagination }),
    
    // Reset state
    resetState: () => dispatch({ type: ActionTypes.RESET_STATE })
  };

  // API operations
  const apiOperations = {
    // Fetch all pages
    fetchPages: async (filters = {}) => {
      try {
        actions.setLoading(true);
        const response = await pagesService.getAllPages(filters);
        console.log('fetchPages response:', response);
        
        // Handle different response structures
        let pagesData = response;
        if (response && typeof response === 'object') {
          if (response.data) {
            pagesData = Array.isArray(response.data) ? response.data : response.data.data;
          } else if (Array.isArray(response)) {
            pagesData = response;
          }
        }
        
        actions.setPages(pagesData || []);
        return response;
      } catch (error) {
        console.error('fetchPages error:', error);
        actions.setError(error.message);
        throw error;
      }
    },

    // Create page
    createPage: async (pageData) => {
      try {
        actions.setLoading(true);
        const response = await pagesService.createPage(pageData);
        console.log('createPage response:', response);
        
        // Handle different response structures
        let newPageData = response;
        if (response && typeof response === 'object') {
          if (response.data) {
            newPageData = response.data.data || response.data;
          }
        }
        
        actions.addPage(newPageData);
        return response;
      } catch (error) {
        console.error('createPage error:', error);
        actions.setError(error.message);
        throw error;
      }
    },

    // Update page
    updatePage: async (pageData) => {
      try {
        actions.setLoading(true);
        const response = await pagesService.updatePage(pageData);
        actions.updatePage(response.data || response);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },

    // Delete page
    deletePage: async (pageId) => {
      try {
        actions.setLoading(true);
        const response = await pagesService.deletePage(pageId);
        actions.deletePage(pageId);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },

    // Get page by ID
    getPageById: async (id, includeComponents = false) => {
      try {
        actions.setLoading(true);
        const response = await pagesService.getPageById(id, includeComponents);
        actions.setCurrentPage(response.data || response);
        
        if (includeComponents && response.data?.components) {
          actions.setPageComponents(response.data.components);
        }
        
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },

    // Publish page
    publishPage: async (id) => {
      try {
        actions.setLoading(true);
        const response = await pagesService.publishPage(id);
        // Update the page in the list
        const updatedPage = { ...state.currentPage, isPublished: true };
        actions.updatePage(updatedPage);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },

    // Unpublish page
    unpublishPage: async (id) => {
      try {
        actions.setLoading(true);
        const response = await pagesService.unpublishPage(id);
        // Update the page in the list
        const updatedPage = { ...state.currentPage, isPublished: false };
        actions.updatePage(updatedPage);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },

    // Duplicate page
    duplicatePage: async (id) => {
      try {
        actions.setLoading(true);
        const response = await pagesService.duplicatePage(id);
        actions.addPage(response.data || response);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },

    // Set homepage
    setHomepage: async (id) => {
      try {
        actions.setLoading(true);
        const response = await pagesService.setHomepage(id);
        // Update all pages to remove homepage flag
        const updatedPages = state.pages.map(page => ({
          ...page,
          isHomepage: page.id === id
        }));
        actions.setPages(updatedPages);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },

    // Search pages
    searchPages: async (searchTerm) => {
      try {
        actions.setLoading(true);
        const response = await pagesService.searchPages(searchTerm);
        actions.setPages(response.data || response);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },

    // Check slug exists
    checkSlugExists: async (slug, excludeId = null) => {
      try {
        const response = await pagesService.checkSlugExists(slug, excludeId);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },

    // Create page with components
    createPageWithComponents: async (pageData) => {
      try {
        actions.setLoading(true);
        const response = await pagesService.createPageWithComponents(pageData);
        actions.addPage(response.data || response);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },

    // Component operations
    fetchPageComponents: async (pageId) => {
      try {
        actions.setLoading(true);
        const response = await pageComponentsService.getPageComponents(pageId);
        actions.setPageComponents(response.data || response);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },

    addPageComponent: async (pageId, componentData) => {
      try {
        actions.setLoading(true);
        const response = await pageComponentsService.addComponent(pageId, componentData);
        actions.addPageComponent(response.data || response);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },

    updatePageComponent: async (componentId, componentData) => {
      try {
        actions.setLoading(true);
        const response = await pageComponentsService.updateComponent(componentId, componentData);
        actions.updatePageComponent(response.data || response);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },

    deletePageComponent: async (componentId) => {
      try {
        actions.setLoading(true);
        const response = await pageComponentsService.deleteComponent(componentId);
        actions.deletePageComponent(componentId);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    },

    reorderPageComponents: async (pageId, componentIds) => {
      try {
        actions.setLoading(true);
        const response = await pageComponentsService.reorderComponents(pageId, componentIds);
        // Update the components order in state
        const reorderedComponents = state.pageComponents.sort((a, b) => {
          const aIndex = componentIds.indexOf(a.id);
          const bIndex = componentIds.indexOf(b.id);
          return aIndex - bIndex;
        });
        actions.reorderComponents(reorderedComponents);
        return response;
      } catch (error) {
        actions.setError(error.message);
        throw error;
      }
    }
  };

  const contextValue = {
    ...state,
    ...actions,
    ...apiOperations
  };

  return (
    <PageContext.Provider value={contextValue}>
      {children}
    </PageContext.Provider>
  );
};

// Custom hook to use the context
export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePageContext must be used within a PageProvider');
  }
  return context;
};

export default PageContext;
