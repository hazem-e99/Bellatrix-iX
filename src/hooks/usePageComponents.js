import { usePageContext } from '../contexts/PageContext';
import { pageUtils } from '../services/pagesService';

/**
 * Custom hook for page component management operations
 * Provides easy access to component-related functionality
 */
export const usePageComponents = () => {
  const context = usePageContext();

  // Enhanced component operations with validation and utilities
  const componentOperations = {
    // Add component with validation
    addComponent: async (pageId, componentData) => {
      const validationErrors = pageUtils.validateComponentData(componentData);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      const transformedData = pageUtils.transformComponentForAPI({
        ...componentData,
        pageId
      });
      
      return await context.addPageComponent(pageId, transformedData);
    },

    // Update component with validation
    updateComponent: async (componentId, componentData) => {
      const validationErrors = pageUtils.validateComponentData(componentData);
      if (validationErrors.length > 0) {
        throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
      }

      const transformedData = pageUtils.transformComponentForAPI(componentData);
      return await context.updatePageComponent(componentId, transformedData);
    },

    // Add component with auto-generated name
    addComponentWithName: async (pageId, componentData) => {
      if (!componentData.componentName && componentData.componentType) {
        componentData.componentName = `${componentData.componentType} Component`;
      }
      return await componentOperations.addComponent(pageId, componentData);
    },

    // Duplicate component
    duplicateComponent: async (componentId) => {
      const originalComponent = context.pageComponents.find(c => c.id === componentId);
      if (!originalComponent) {
        throw new Error('Component not found');
      }

      const duplicatedData = {
        componentType: originalComponent.componentType,
        componentName: `${originalComponent.componentName} (Copy)`,
        contentJson: originalComponent.contentJson,
        orderIndex: context.pageComponents.length
      };

      return await componentOperations.addComponent(originalComponent.pageId, duplicatedData);
    },

    // Move component up in order
    moveComponentUp: async (componentId) => {
      const components = [...context.pageComponents];
      const currentIndex = components.findIndex(c => c.id === componentId);
      
      if (currentIndex <= 0) {
        throw new Error('Component is already at the top');
      }

      // Swap with previous component
      [components[currentIndex], components[currentIndex - 1]] = 
      [components[currentIndex - 1], components[currentIndex]];

      // Update order indices
      const reorderedComponents = components.map((component, index) => ({
        ...component,
        orderIndex: index
      }));

      const componentIds = reorderedComponents.map(c => c.id);
      return await context.reorderPageComponents(componentId, componentIds);
    },

    // Move component down in order
    moveComponentDown: async (componentId) => {
      const components = [...context.pageComponents];
      const currentIndex = components.findIndex(c => c.id === componentId);
      
      if (currentIndex >= components.length - 1) {
        throw new Error('Component is already at the bottom');
      }

      // Swap with next component
      [components[currentIndex], components[currentIndex + 1]] = 
      [components[currentIndex + 1], components[currentIndex]];

      // Update order indices
      const reorderedComponents = components.map((component, index) => ({
        ...component,
        orderIndex: index
      }));

      const componentIds = reorderedComponents.map(c => c.id);
      return await context.reorderPageComponents(componentId, componentIds);
    },

    // Move component to specific position
    moveComponentToPosition: async (componentId, newPosition) => {
      const components = [...context.pageComponents];
      const currentIndex = components.findIndex(c => c.id === componentId);
      
      if (currentIndex === -1) {
        throw new Error('Component not found');
      }

      if (newPosition < 0 || newPosition >= components.length) {
        throw new Error('Invalid position');
      }

      // Remove component from current position
      const [movedComponent] = components.splice(currentIndex, 1);
      
      // Insert at new position
      components.splice(newPosition, 0, movedComponent);

      // Update order indices
      const reorderedComponents = components.map((component, index) => ({
        ...component,
        orderIndex: index
      }));

      const componentIds = reorderedComponents.map(c => c.id);
      return await context.reorderPageComponents(componentId, componentIds);
    },

    // Bulk operations
    bulkDeleteComponents: async (componentIds) => {
      const results = [];
      for (const componentId of componentIds) {
        try {
          const result = await context.deletePageComponent(componentId);
          results.push({ componentId, success: true, result });
        } catch (error) {
          results.push({ componentId, success: false, error: error.message });
        }
      }
      return results;
    },

    bulkUpdateComponents: async (updates) => {
      const results = [];
      for (const update of updates) {
        try {
          const result = await componentOperations.updateComponent(update.id, update.data);
          results.push({ componentId: update.id, success: true, result });
        } catch (error) {
          results.push({ componentId: update.id, success: false, error: error.message });
        }
      }
      return results;
    }
  };

  // Component filtering and sorting helpers
  const componentHelpers = {
    // Get components by type
    getComponentsByType: (componentType) => {
      return context.pageComponents.filter(component => component.componentType === componentType);
    },

    // Get components sorted by order
    getComponentsSortedByOrder: () => {
      return [...context.pageComponents].sort((a, b) => a.orderIndex - b.orderIndex);
    },

    // Get components with names
    getComponentsWithNames: () => {
      return context.pageComponents.filter(component => component.componentName);
    },

    // Get components without names
    getComponentsWithoutNames: () => {
      return context.pageComponents.filter(component => !component.componentName);
    },

    // Search components locally
    searchComponents: (searchTerm) => {
      if (!searchTerm) return context.pageComponents;
      
      const term = searchTerm.toLowerCase();
      return context.pageComponents.filter(component => 
        (component.componentName && component.componentName.toLowerCase().includes(term)) ||
        (component.componentType && component.componentType.toLowerCase().includes(term)) ||
        (component.contentJson && component.contentJson.toLowerCase().includes(term))
      );
    },

    // Get component statistics
    getComponentStatistics: () => {
      const components = context.pageComponents;
      const typeCounts = {};
      
      components.forEach(component => {
        const type = component.componentType || 'Unknown';
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      });

      return {
        total: components.length,
        withNames: components.filter(c => c.componentName).length,
        withoutNames: components.filter(c => !c.componentName).length,
        typeCounts,
        types: Object.keys(typeCounts)
      };
    }
  };

  // Content management helpers
  const contentHelpers = {
    // Parse component content
    parseComponentContent: (component) => {
      try {
        return JSON.parse(component.contentJson);
      } catch (error) {
        console.error('Error parsing component content:', error);
        return null;
      }
    },

    // Update component content
    updateComponentContent: async (componentId, newContent) => {
      const component = context.pageComponents.find(c => c.id === componentId);
      if (!component) {
        throw new Error('Component not found');
      }

      const updatedData = {
        ...component,
        contentJson: typeof newContent === 'string' ? newContent : JSON.stringify(newContent)
      };

      return await componentOperations.updateComponent(componentId, updatedData);
    },

    // Validate component content
    validateComponentContent: (contentJson) => {
      try {
        const content = JSON.parse(contentJson);
        return { isValid: true, content };
      } catch (error) {
        return { isValid: false, error: error.message };
      }
    },

    // Get content preview
    getContentPreview: (component, maxLength = 100) => {
      try {
        const content = JSON.parse(component.contentJson);
        const preview = JSON.stringify(content);
        return preview.length > maxLength ? preview.substring(0, maxLength) + '...' : preview;
      } catch (error) {
        return 'Invalid JSON content';
      }
    }
  };

  return {
    // State
    pageComponents: context.pageComponents,
    loading: context.loading,
    error: context.error,

    // Actions
    fetchPageComponents: context.fetchPageComponents,
    setPageComponents: context.setPageComponents,
    clearError: context.clearError,

    // Enhanced operations
    ...componentOperations,

    // Component helpers
    ...componentHelpers,

    // Content helpers
    ...contentHelpers,

    // Direct API operations (for advanced usage)
    apiOperations: {
      addPageComponent: context.addPageComponent,
      updatePageComponent: context.updatePageComponent,
      deletePageComponent: context.deletePageComponent,
      reorderPageComponents: context.reorderPageComponents
    }
  };
};

export default usePageComponents;
