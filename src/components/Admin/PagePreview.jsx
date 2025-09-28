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
import { getComponentPathFromId, loadComponent } from "../componentMap";
import { normalizeProps, validateProps } from "../../utils/normalizeProps";

// Default mock data for training components
const trainingDefaultData = {
  TrainingHeroSection: {
    title: "Professional Training Programs",
    subtitle: "Empower your team with comprehensive training solutions designed to enhance skills and drive success",
    backgroundVideo: "/Videos/trainingHeroSection.mp4",
    ctaButton: {
      text: "Start Learning Today",
      link: "/training",
      variant: "primary"
    }
  },
  TrainingProgramsSection: {
    programsSection: {
      title: "Our Training Programs",
      description: "Comprehensive training solutions designed to empower your team with the skills they need to excel",
      image: "/images/traning.jpg",
      Professional_Badge: "Certified Training"
    },
    trainingPrograms: [
      {
        id: 1,
        name: "NetSuite Fundamentals",
        duration: "40 hours",
        level: "Beginner"
      },
      {
        id: 2,
        name: "Advanced Modules",
        duration: "60 hours",
        level: "Intermediate"
      },
      {
        id: 3,
        name: "Customization Training",
        duration: "80 hours",
        level: "Advanced"
      },
      {
        id: 4,
        name: "Admin & Security",
        duration: "50 hours",
        level: "Expert"
      }
    ]
  },
  TrainingWhyChooseSection: {
    whyChooseSection: {
      title: "Why Choose Our Training?",
      subtitle: "We provide world-class training solutions that combine expertise, innovation, and practical application to ensure your team's success",
      image: "/images/chooese.png",
      Professional_Badge: "Excellence Training"
    },
    trainingFeatures: [
      {
        id: 1,
        title: "Expert Instructors",
        shortDescription: "Certified professionals with years of experience",
        icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      },
      {
        id: 2,
        title: "Hands-on Learning",
        shortDescription: "Practical exercises with real-world scenarios",
        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      },
      {
        id: 3,
        title: "Flexible Scheduling",
        shortDescription: "Multiple training formats to fit your needs",
        icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      },
      {
        id: 4,
        title: "Ongoing Support",
        shortDescription: "Continuous assistance beyond training completion",
        icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"
      }
    ]
  }
};

const PagePreview = ({
  isOpen,
  onClose,
  pageData,
  availableComponents = [],
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedComponents, setLoadedComponents] = useState({});
  const [trainingData, setTrainingData] = useState(null);

  useEffect(() => {
    if (isOpen && pageData.components) {
      loadComponents();
      loadTrainingData();
    }
  }, [isOpen, pageData.components]);

  // Load training data as fallback
  const loadTrainingData = async () => {
    try {
      const response = await fetch('/data/training.json');
      if (response.ok) {
        const data = await response.json();
        setTrainingData(data);
      }
    } catch (err) {
      console.warn('Failed to load training.json:', err);
    }
  };

  // Simple error boundary to isolate section render errors
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
    componentDidCatch(error, info) {
      // eslint-disable-next-line no-console
      console.error("Preview component render error:", error, info);
    }
    render() {
      if (this.state.hasError) {
        return this.props.fallback || null;
      }
      return this.props.children;
    }
  }

  // Normalize common props so sections don't crash on undefined
  const buildSafeProps = (props) => {
    const commonArrayKeys = [
      "items",
      "list",
      "milestones",
      "services",
      "steps",
      "faqs",
      "features",
      "plans",
      "members",
      "values",
      "sections",
      "cases",
      "caseStudies",
      "benefits",
      "types",
      "programs",
    ];
    const safe = { ...(props || {}) };
    commonArrayKeys.forEach((key) => {
      if (safe[key] === undefined || safe[key] === null) safe[key] = [];
    });
    return safe;
  };

  // Helper function to extract and normalize data from various formats
  const extractComponentData = (component) => {
    let rawData = {};
    
    // Always try to parse contentJson first - this is the primary data source
    if (component.contentJson) {
      try {
        // Ensure contentJson is parsed from string to object
        rawData = typeof component.contentJson === 'string' 
          ? JSON.parse(component.contentJson) 
          : component.contentJson;
        
        // Log parsed data for debugging
        console.log(`Parsed contentJson for ${component.componentType}:`, rawData);
        
      } catch (err) {
        console.warn(`Failed to parse contentJson for ${component.componentType}:`, err);
        console.warn('Raw contentJson:', component.contentJson);
      }
    }
    
    // If no data or empty data, try to use component properties directly
    if (!rawData || Object.keys(rawData).length === 0) {
      // Check if component has direct properties
      const directProps = ['title', 'subtitle', 'description', 'image', 'programs', 'features'];
      directProps.forEach(prop => {
        if (component[prop] !== undefined) {
          rawData[prop] = component[prop];
        }
      });
    }
    
    // If still no data and it's a training component, try to use training.json data
    if ((!rawData || Object.keys(rawData).length === 0) && component.componentType.includes('Training') && trainingData) {
      console.log(`Using training.json fallback for ${component.componentType}`);
      
      switch (component.componentType) {
        case 'TrainingHeroSection':
          rawData = {
            title: trainingData.heroContent?.title,
            subtitle: trainingData.heroContent?.description,
            backgroundVideo: '/Videos/trainingHeroSection.mp4',
            ctaButton: {
              text: 'Start Learning Today',
              link: '/training',
              variant: 'primary'
            }
          };
          break;
        case 'TrainingProgramsSection':
          rawData = {
            programsSection: trainingData.programsSection,
            programs: trainingData.trainingPrograms?.programs || []
          };
          break;
        case 'TrainingWhyChooseSection':
          rawData = {
            whyChooseSection: trainingData.whyChooseSection,
            features: trainingData.trainingFeatures || []
          };
          break;
      }
    }
    
    // Use normalizeProps to map the raw data to the correct component props
    const normalizedData = normalizeProps(component.componentType, rawData);
    
    // Validate the normalized props
    const validation = validateProps(component.componentType, normalizedData);
    if (!validation.isValid) {
      console.warn(`Missing required props for ${component.componentType}:`, validation.missingProps);
    }
    
    // Final log to verify complete data
    console.log(`Final normalized props for ${component.componentType}:`, normalizedData);
    
    return normalizedData;
  };

  const loadComponents = async () => {
    setLoading(true);
    setError(null);

    try {
      const componentMap = {};
      for (const component of pageData.components) {
        try {
          const path = getComponentPathFromId(component.componentType);
          if (path) {
            const Comp = await loadComponent(path);
            componentMap[component.componentType] = Comp || (() => null);
          } else {
            componentMap[component.componentType] = () => (
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {component.componentName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Component Type: {component.componentType}
                  </p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
                    Component path not found
                  </p>
                </div>
              </div>
            );
          }
        } catch (err) {
          console.warn(
            `Failed to load component ${component.componentType}:`,
            err
          );
          componentMap[component.componentType] = () => (
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {component.componentName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Component Type: {component.componentType}
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  Component failed to load
                </p>
              </div>
            </div>
          );
        }
      }
      setLoadedComponents(componentMap);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getComponentIcon = (componentType) => {
    const component = availableComponents.find(
      (c) => c.componentType === componentType
    );
    return component?.icon || "📄";
  };

  const renderComponent = (component, index) => {
    const Component = loadedComponents[component.componentType];

    if (!Component) {
      return (
        <div
          key={index}
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6"
        >
          <div className="flex items-center space-x-3">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                Component Not Found
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300">
                The component "{component.componentType}" could not be loaded
                for preview.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Extract and normalize component data using the new normalizeProps function
    const normalizedProps = extractComponentData(component);
    const safeProps = buildSafeProps(normalizedProps);

    // Get default data for the component (fallback for training components)
    const defaultData = trainingDefaultData[component.componentType] || {};
    
    // Merge normalized props with defaults - prioritize normalized data over defaults
    const mergedProps = { ...defaultData, ...safeProps };
    
    // Add any missing function props that components might expect
    const propsToPass = {
      ...mergedProps,
      // Add common function props that components might need
      renderIcon: mergedProps.renderIcon || (() => null),
      openProgramModal: mergedProps.openProgramModal || (() => {}),
      openFeatureModal: mergedProps.openFeatureModal || (() => {}),
      onCtaClick: mergedProps.onCtaClick || (() => {})
    };
    
    // Debug logging for all components to verify data is complete
    console.log(`Component ${component.componentType} - Final propsToPass:`, propsToPass);

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
              <div className="text-xl">
                {getComponentIcon(component.componentType)}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  {component.componentName}
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Order: {component.orderIndex} | Type:{" "}
                  {component.componentType}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-700 dark:text-green-300">
                Preview
              </span>
            </div>
          </div>
        </div>

        {/* Component Content */}
        <div className="bg-white dark:bg-gray-900 border-l border-r border-b border-gray-200 dark:border-gray-700 rounded-b-lg">
          <div className="min-h-[200px]">
            <ErrorBoundary
              fallback={
                <div className="p-4 text-sm text-red-700 bg-red-50 border-t border-r border-b border-red-200 rounded-b-lg">
                  Failed to render {component.componentType}. Please check its
                  data.
                </div>
              }
            >
              <Component {...propsToPass} />
            </ErrorBoundary>
            
            {/* Debug info for all components */}
            <div className="p-2 text-xs text-gray-500 bg-gray-50 border-t">
              <strong>Debug:</strong> {component.contentJson ? 'Data from backend (JSON parsed)' : 'Using fallback data'}
              {!component.contentJson && ' (defaults/training.json)'}
            </div>
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
              Preview of "{pageData.name}" with{" "}
              {pageData.components?.length || 0} components
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
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Page Name:
                      </span>
                      <p className="text-gray-900 dark:text-white">
                        {pageData.name}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        URL Slug:
                      </span>
                      <p className="text-gray-900 dark:text-white">
                        /{pageData.slug}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Status:
                      </span>
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
                {pageData.components.map((component, index) =>
                  renderComponent(component, index)
                )}
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
          <Button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Close Preview
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PagePreview;
