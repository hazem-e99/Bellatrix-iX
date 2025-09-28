import { useState } from "react";
import pagesAPI from "../lib/pagesAPI";

// Custom hook for page editor API operations
export const usePageEditorAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPageData = async (pageId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await pagesAPI.getPageById(pageId);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const saveComponent = async (pageId, updatedPageData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await pagesAPI.updatePage(pageId, updatedPageData);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const saveAllComponents = async (pageId, components) => {
    setLoading(true);
    setError(null);
    try {
      const data = await pagesAPI.updatePage(pageId, { components });
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const reorderComponents = async (pageId, updatedPageData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await pagesAPI.updatePage(pageId, updatedPageData);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    fetchPageData,
    saveComponent,
    saveAllComponents,
    reorderComponents,
  };
};

// Utility functions for page editor
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const validateComponentData = (componentData) => {
  const errors = {};

  try {
    JSON.parse(componentData.contentJson);
  } catch {
    errors.contentJson = "Invalid JSON format";
  }

  if (!componentData.componentName?.trim()) {
    errors.componentName = "Component name is required";
  }

  if (!componentData.componentType?.trim()) {
    errors.componentType = "Component type is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Component type configurations for better form rendering
export const componentTypeConfigs = {
  PayrollHeroSection: {
    displayName: "Hero Section",
    fields: {
      title: { type: "text", required: true },
      subtitle: { type: "text", required: true },
      description: { type: "textarea", required: true },
      backgroundImage: { type: "url", label: "Background Image URL" },
      ctaButton: {
        type: "object",
        fields: {
          text: { type: "text", required: true },
          link: { type: "url", required: true },
          variant: {
            type: "select",
            options: ["primary", "secondary", "outline"],
            default: "primary",
          },
        },
      },
    },
  },
  ServiceGrid: {
    displayName: "Service Grid",
    fields: {
      title: { type: "text", required: true },
      subtitle: { type: "text", required: true },
      description: { type: "textarea", required: true },
      services: {
        type: "array",
        itemType: "object",
        fields: {
          name: { type: "text", required: true },
          description: { type: "textarea", required: true },
          icon: { type: "text", label: "Icon (emoji or class)" },
          link: { type: "url", required: true },
        },
      },
    },
  },
  HRModulesSection: {
    displayName: "HR Modules",
    fields: {
      title: { type: "text", required: true },
      subtitle: { type: "text", required: true },
      description: { type: "textarea", required: true },
      features: {
        type: "array",
        itemType: "object",
        fields: {
          title: { type: "text", required: true },
          description: { type: "textarea", required: true },
          icon: { type: "text", label: "Icon (emoji or class)" },
        },
      },
    },
  },
  TrainingWhyChooseSection: {
    displayName: "Training Why Choose Section",
    fields: {
      title: { type: "text", required: true, label: "Section Title" },
      subtitle: { type: "text", required: true, label: "Section Description" },
      image: { type: "url", label: "Image URL" },
      badge: { type: "text", label: "Professional Badge Text" },
      features: {
        type: "array",
        itemType: "object",
        fields: {
          id: { type: "text", required: true },
          title: { type: "text", required: true },
          shortDescription: { type: "textarea", required: true },
          icon: { type: "text", label: "Icon (SVG path or emoji)" },
        },
      },
    },
  },
};
