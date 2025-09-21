import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  EyeIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";

const PagePreview = ({ 
  isOpen, 
  onClose, 
  pageData, 
  availableComponents = [] 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedComponents, setLoadedComponents] = useState({});

  useEffect(() => {
    if (isOpen && pageData.components) {
      loadComponents();
    }
  }, [isOpen, pageData.components]);

  const loadComponents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // For now, we'll create mock components to avoid import issues
      const mockComponents = {};
      
      for (const component of pageData.components) {
        mockComponents[component.componentType] = ({ ...props }) => {
          const componentData = JSON.parse(component.contentJson);
          return (
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {component.componentName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Component Type: {component.componentType}
                </p>
              </div>
              
              <div className="space-y-3">
                {Object.entries(componentData).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        };
      }
      
      setLoadedComponents(mockComponents);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getComponentIcon = (componentType) => {
    const component = availableComponents.find(c => c.componentType === componentType);
    return component?.icon || "📄";
  };

  const renderComponent = (component, index) => {
    const Component = loadedComponents[component.componentType];

    if (!Component) {
      return (
        <div key={index} className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                Component Not Found
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300">
                The component "{component.componentType}" could not be loaded for preview.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative"
      >
        {/* Component Header */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-t-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-xl">{getComponentIcon(component.componentType)}</div>
              <div>
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  {component.componentName}
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Order: {component.orderIndex} | Type: {component.componentType}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-700 dark:text-green-300">Preview</span>
            </div>
          </div>
        </div>

        {/* Component Content */}
        <div className="bg-white dark:bg-gray-900 border-l border-r border-b border-gray-200 dark:border-gray-700 rounded-b-lg">
          <div className="min-h-[200px]">
            <Component />
          </div>
        </div>
      </motion.div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Page Preview
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Preview of "{pageData.name}" with {pageData.components?.length || 0} components
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={loadComponents}
              loading={loading}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Reload Components
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200"
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <ArrowPathIcon className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Loading Components
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Please wait while we load the page components...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Error Loading Components
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                <Button onClick={loadComponents} variant="outline">
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  Retry
                </Button>
              </div>
            </div>
          ) : pageData.components?.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <EyeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Components Added
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  This page doesn't have any components to preview yet.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Page Info */}
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Page Name:</span>
                      <p className="text-gray-900 dark:text-white">{pageData.name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">URL Slug:</span>
                      <p className="text-gray-900 dark:text-white">/{pageData.slug}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>
                      <p className="text-gray-900 dark:text-white">
                        {pageData.isPublished ? "Published" : "Draft"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Components */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Components ({pageData.components.length})
                </h3>
                {pageData.components.map((component, index) => renderComponent(component, index))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckIcon className="h-4 w-4 text-green-500" />
              <span>{pageData.components?.length || 0} components loaded</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Preview ready</span>
            </div>
          </div>
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
            Close Preview
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PagePreview;
