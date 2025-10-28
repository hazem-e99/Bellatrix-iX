import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  XMarkIcon,
  EyeIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Button from "../UI/Button";
import Card, { CardContent, CardHeader, CardTitle } from "../UI/Card";
import { getComponentPathFromId, loadComponent } from "../componentMap";
import { normalizeProps, validateProps } from "../../utils/normalizeProps";
import { validateVariant } from "../../utils/variantSystem";
import { mapThemeValue } from "../../utils/sectionThemeDetection";

// Default mock data for training components
const trainingDefaultData = {
  TrainingHeroSection: {
    title: "Professional Training Programs",
    subtitle:
      "Empower your team with comprehensive training solutions designed to enhance skills and drive success",
    backgroundVideo: "/Videos/trainingHeroSection.mp4",
    ctaButton: {
      text: "Start Learning Today",
      link: "/training",
      variant: validateVariant("primary"),
    },
  },
  TrainingProgramsSection: {
    programsSection: {
      title: "Our Training Programs",
      description:
        "Comprehensive training solutions designed to empower your team with the skills they need to excel",
      image: "/images/traning.jpg",
      Professional_Badge: "Certified Training",
    },
    trainingPrograms: [
      {
        id: 1,
        name: "NetSuite Fundamentals",
        duration: "40 hours",
        level: "Beginner",
      },
      {
        id: 2,
        name: "Advanced Modules",
        duration: "60 hours",
        level: "Intermediate",
      },
      {
        id: 3,
        name: "Customization Training",
        duration: "80 hours",
        level: "Advanced",
      },
      {
        id: 4,
        name: "Admin & Security",
        duration: "50 hours",
        level: "Expert",
      },
    ],
  },
  TrainingWhyChooseSection: {
    whyChooseSection: {
      title: "Why Choose Our Training?",
      subtitle:
        "We provide world-class training solutions that combine expertise, innovation, and practical application to ensure your team's success",
      image: "/images/chooese.png",
      Professional_Badge: "Excellence Training",
    },
    trainingFeatures: [
      {
        id: 1,
        title: "Expert Instructors",
        shortDescription: "Certified professionals with years of experience",
        icon:
          "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      },
      {
        id: 2,
        title: "Hands-on Learning",
        shortDescription: "Practical exercises with real-world scenarios",
        icon:
          "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      },
      {
        id: 3,
        title: "Flexible Scheduling",
        shortDescription: "Multiple training formats to fit your needs",
        icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      },
      {
        id: 4,
        title: "Ongoing Support",
        shortDescription: "Continuous assistance beyond training completion",
        icon:
          "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z",
      },
    ],
  },
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

  // Deep snapshot of components to detect nested changes (helps when the
  // pageData.components array is mutated in-place by the builder).
  const componentsSnapshot = React.useMemo(() => {
    try {
      return JSON.stringify(pageData?.components || []);
    } catch {
      // Fallback to length if serialization fails
      return String((pageData?.components || []).length || 0);
    }
  }, [pageData]);

  useEffect(() => {
    console.log("🔄 [EFFECT] PagePreview useEffect triggered");
    console.log("🔄 [EFFECT] isOpen:", isOpen);
    console.log("🔄 [EFFECT] componentsSnapshot (deep):", componentsSnapshot);
    console.log(
      "🔄 [EFFECT] pageData.components exists:",
      !!pageData.components
    );
    console.log(
      "🔄 [EFFECT] pageData.components length:",
      pageData.components?.length
    );
    console.log(
      "🔄 [EFFECT] Full pageData:",
      JSON.parse(JSON.stringify(pageData))
    );

    // If preview is open and we have components (or the deep snapshot changed), reload
    if (isOpen && pageData.components) {
      console.log(
        "🔄 [EFFECT] Starting component loading and training data loading"
      );
      loadComponents();
      loadTrainingData();
    } else {
      console.log("🔄 [EFFECT] Skipping loading - conditions not met");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, componentsSnapshot, pageData]);

  // Load training data as fallback
  const loadTrainingData = async () => {
    try {
      const response = await fetch("/data/training.json");
      if (response.ok) {
        const data = await response.json();
        setTrainingData(data);
      }
    } catch (err) {
      console.warn("Failed to load training.json:", err);
    }
  };

  // Enhanced error boundary to isolate section render errors with detailed debugging
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
      console.error("🚨 [ERROR BOUNDARY] Component error caught:", error);
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      console.error("🚨 [ERROR BOUNDARY] Component render error details:", {
        error: error,
        errorInfo: errorInfo,
        componentStack: errorInfo.componentStack,
        errorBoundary: this.constructor.name,
      });

      // Special debugging for ImplementationHeroSection errors
      if (this.props.componentType === "ImplementationHeroSection") {
        console.error(
          "🏗️ [IMPLEMENTATION ERROR] ImplementationHeroSection render error:",
          {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            props: this.props,
          }
        );
      }

      this.setState({
        error,
        errorInfo,
      });
    }

    render() {
      if (this.state.hasError) {
        console.error(
          "🚨 [ERROR BOUNDARY] Rendering fallback due to error:",
          this.state.error
        );

        return (
          this.props.fallback || (
            <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-bold text-red-800 mb-2">
                Component Render Error
              </h3>
              <p className="mb-2">
                {this.state.error?.message || "Unknown error"}
              </p>
              <details className="text-xs">
                <summary className="cursor-pointer font-medium">
                  Error Details
                </summary>
                <pre className="mt-2 p-2 bg-red-100 rounded overflow-auto">
                  {this.state.error?.stack}
                </pre>
                {this.state.errorInfo && (
                  <pre className="mt-2 p-2 bg-red-100 rounded overflow-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </details>
            </div>
          )
        );
      }

      return this.props.children;
    }
  }

  // Normalize common props so sections don't crash on undefined
  const buildSafeProps = (props) => {
    console.log("🛡️ ========== [DEBUG START] buildSafeProps ==========");
    console.log("🛡️ [DEBUG] Input props:", JSON.parse(JSON.stringify(props)));
    console.log("🛡️ [DEBUG] Input props type:", typeof props);
    console.log(
      "🛡️ [DEBUG] Input props keys:",
      props ? Object.keys(props) : "null/undefined"
    );

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
      "painPoints", // Adding this as it seems to be a common missing prop
      "trainingPrograms",
      "trainingFeatures",
    ];

    const safe = { ...(props || {}) };
    console.log(
      "🛡️ [DEBUG] After spread operator:",
      JSON.parse(JSON.stringify(safe))
    );

    commonArrayKeys.forEach((key) => {
      const originalValue = safe[key];
      if (safe[key] === undefined || safe[key] === null) {
        safe[key] = [];
        console.log(
          `🛡️ [DEBUG] Set ${key} to empty array (was ${originalValue})`
        );
      } else {
        console.log(`🛡️ [DEBUG] Kept ${key} as:`, safe[key]);
      }
    });

    console.log(
      "🛡️ [DEBUG] Final safe props:",
      JSON.parse(JSON.stringify(safe))
    );
    console.log("🛡️ [DEBUG] Final safe props keys:", Object.keys(safe));
    console.log("🛡️ ========== [DEBUG END] buildSafeProps ==========");

    return safe;
  };

  // Helper function to extract and normalize data from various formats
  const extractComponentData = (component) => {
    console.log(" ");
    console.log("🔍 ========== [DEBUG START] extractComponentData ==========");
    console.log(
      "🔍 [DEBUG] Component object:",
      JSON.parse(JSON.stringify(component))
    );
    console.log("🔍 [DEBUG] componentType:", component.componentType);
    console.log("🔍 [DEBUG] contentJson:", component.contentJson);
    console.log("🔍 [DEBUG] contentJson type:", typeof component.contentJson);
    console.log("🔍 [DEBUG] content:", component.content);
    console.log("🔍 [DEBUG] content type:", typeof component.content);

    let rawData = {};

    // PRIORITY 1: Use contentJson from form (this is the PRIMARY data source)
    if (component.contentJson) {
      try {
        console.log("✅ [PRIORITY 1] Using component.contentJson from form");
        rawData =
          typeof component.contentJson === "string"
            ? JSON.parse(component.contentJson)
            : component.contentJson;
        console.log(
          "✅ [PRIORITY 1] Successfully parsed contentJson:",
          rawData
        );
      } catch (err) {
        console.warn("❌ [ERROR] Failed to parse contentJson:", err);
        console.warn(
          "❌ [ERROR] Raw contentJson that failed:",
          component.contentJson
        );
      }
    }
    // PRIORITY 2: Check if content exists (from API) - only if no form data
    else if (
      component.content &&
      typeof component.content === "object" &&
      Object.keys(component.content).length > 0
    ) {
      console.log("✅ [PRIORITY 2] Using component.content from API");
      rawData = component.content;
    } else {
      console.log("ℹ️ [INFO] No content or contentJson found");
    }

    console.log("📦 [DEBUG] Raw data extracted:", rawData);
    console.log("📦 [DEBUG] Raw data keys:", Object.keys(rawData));

    // Check if we have training data available
    if (trainingData) {
      console.log(
        "📚 [DEBUG] Training data is available:",
        Object.keys(trainingData)
      );
    } else {
      console.log("📚 [DEBUG] Training data is NOT available");
    }

    // Check if component type exists in training defaults
    const hasTrainingDefault = trainingDefaultData[component.componentType];
    console.log("🎯 [DEBUG] Has training default data:", hasTrainingDefault);
    console.log(
      "🎯 [DEBUG] Available training default keys:",
      Object.keys(trainingDefaultData)
    );

    // If still no data or empty data, try to use training.json data
    if (
      (!rawData || Object.keys(rawData).length === 0) &&
      component.componentType.includes("Training") &&
      trainingData
    ) {
      console.log(
        "🔄 [FALLBACK 1] Using training.json fallback for",
        component.componentType
      );

      switch (component.componentType) {
        case "TrainingHeroSection":
          rawData = {
            title: trainingData.heroContent?.title,
            subtitle: trainingData.heroContent?.description,
            backgroundVideo: "/Videos/trainingHeroSection.mp4",
            ctaButton: {
              text: "Start Learning Today",
              link: "/training",
              variant: validateVariant("primary"),
            },
          };
          break;
        case "TrainingProgramsSection":
          rawData = {
            programsSection: trainingData.programsSection,
            programs: trainingData.trainingPrograms?.programs || [],
          };
          break;
        case "TrainingWhyChooseSection":
          rawData = {
            whyChooseSection: trainingData.whyChooseSection,
            features: trainingData.trainingFeatures || [],
          };
          break;
        default:
          console.log(
            "⚠️ [WARNING] No specific fallback for:",
            component.componentType
          );
      }
    }

    // Final fallback to training default data
    if (!rawData || Object.keys(rawData).length === 0) {
      console.log(
        "🔄 [FALLBACK 2] Using trainingDefaultData for",
        component.componentType
      );
      rawData = trainingDefaultData[component.componentType] || {};
    }

    console.log("🎯 [DEBUG] Final raw data before normalization:", rawData);

    // Merge top-level component fields into rawData so edits saved to
    // component.title / component.description / component.items etc. are
    // reflected immediately in the preview even when the builder stores
    // these values on the component object rather than inside contentJson.
    rawData = {
      ...rawData,
      ...(component.title !== undefined ? { title: component.title } : {}),
      ...(component.description !== undefined
        ? { description: component.description }
        : {}),
      ...(component.items ? { items: component.items } : {}),
      ...(component.caseStudies ? { caseStudies: component.caseStudies } : {}),
      ...(component.data ? { data: component.data } : {}),
      ...(component.programs ? { programs: component.programs } : {}),
      ...(component.features ? { features: component.features } : {}),
    };

    console.log(
      "🔁 [MERGE] After merging top-level props into rawData:",
      rawData
    );

    // Use normalizeProps to map the raw data to the correct component props
    const normalizedData = normalizeProps(component.componentType, rawData);
    console.log("🔄 [DEBUG] After normalizeProps:", normalizedData);

    // Special debugging for TrainingProgramsSection image extraction
    if (component.componentType === "TrainingProgramsSection") {
      console.log("🔍 [IMAGE EXTRACTION] TrainingProgramsSection extraction:", {
        componentType: component.componentType,
        contentJson: component.contentJson,
        parsedContent: component.contentJson
          ? JSON.parse(component.contentJson)
          : {},
        directContent: component.content,
        extractedRawData: rawData,
        finalImage: rawData.image || rawData.programsSection?.image,
        normalizedData: normalizedData,
        programsSectionImage: normalizedData.programsSection?.image,
      });
    }

    // Special debugging for IntegrationTypesSection
    if (component.componentType === "IntegrationTypesSection") {
      console.log(
        "🔍 [INTEGRATION TYPES EXTRACTION] IntegrationTypesSection extraction:",
        {
          componentType: component.componentType,
          contentJson: component.contentJson,
          parsedContent: component.contentJson
            ? JSON.parse(component.contentJson)
            : {},
          directContent: component.content,
          extractedRawData: rawData,
          finalItems:
            rawData.items || rawData.integrationTypes?.items || rawData.types,
          normalizedData: normalizedData,
          normalizedItems: normalizedData.items,
        }
      );
    }

    // Special debugging for IntegrationBenefitsSection
    if (component.componentType === "IntegrationBenefitsSection") {
      console.log(
        "🔍 [INTEGRATION BENEFITS EXTRACTION] IntegrationBenefitsSection extraction:",
        {
          componentType: component.componentType,
          contentJson: component.contentJson,
          parsedContent: component.contentJson
            ? JSON.parse(component.contentJson)
            : {},
          directContent: component.content,
          extractedRawData: rawData,
          finalBenefits:
            rawData.benefits || rawData.items || rawData.benefits?.items,
          normalizedData: normalizedData,
          normalizedItems: normalizedData.items,
        }
      );
    }

    // Special debugging for CustomizationServicesSection
    if (component.componentType === "CustomizationServicesSection") {
      console.log(
        "🔍 [CUSTOMIZATION SERVICES EXTRACTION] CustomizationServicesSection extraction:",
        {
          componentType: component.componentType,
          contentJson: component.contentJson,
          parsedContent: component.contentJson
            ? JSON.parse(component.contentJson)
            : {},
          directContent: component.content,
          extractedRawData: rawData,
          finalServices:
            rawData.services ||
            rawData.items ||
            rawData.customizationServices?.services,
          normalizedData: normalizedData,
          normalizedItems: normalizedData.items,
        }
      );
    }

    // Special debugging for CustomizationProcessSection
    if (component.componentType === "CustomizationProcessSection") {
      console.log(
        "🔍 [CUSTOMIZATION PROCESS EXTRACTION] CustomizationProcessSection extraction:",
        {
          componentType: component.componentType,
          contentJson: component.contentJson,
          parsedContent: component.contentJson
            ? JSON.parse(component.contentJson)
            : {},
          directContent: component.content,
          extractedRawData: rawData,
          finalSteps: rawData.steps || rawData.customizationProcess?.steps,
          normalizedData: normalizedData,
          normalizedSteps: normalizedData.steps,
        }
      );
    }

    // Special debugging for Manufacturing Components
    if (component.componentType === "ManufacturingHeroSection") {
      console.log("🔍 [MANUFACTURING EXTRACTION DEBUG]", {
        component: component,
        contentJson: component.contentJson,
        parsedContent: component.contentJson
          ? JSON.parse(component.contentJson)
          : {},
        rawData: rawData,
        normalizedData: normalizedData,
      });
    }

    if (component.componentType === "ManufacturingChallengesSection") {
      console.log(
        "🔍 [MANUFACTURING CHALLENGES EXTRACTION] ManufacturingChallengesSection extraction:",
        {
          componentType: component.componentType,
          contentJson: component.contentJson,
          parsedContent: component.contentJson
            ? JSON.parse(component.contentJson)
            : {},
          directContent: component.content,
          extractedRawData: rawData,
          finalChallenges:
            rawData.challenges ||
            rawData.items ||
            rawData.manufacturingChallenges?.challenges,
          normalizedData: normalizedData,
          normalizedChallenges: normalizedData.challenges,
        }
      );
    }

    if (component.componentType === "ManufacturingSolutionsSection") {
      console.log(
        "🔍 [MANUFACTURING SOLUTIONS EXTRACTION] ManufacturingSolutionsSection extraction:",
        {
          componentType: component.componentType,
          contentJson: component.contentJson,
          parsedContent: component.contentJson
            ? JSON.parse(component.contentJson)
            : {},
          directContent: component.content,
          extractedRawData: rawData,
          finalSolutions:
            rawData.solutions ||
            rawData.items ||
            rawData.manufacturingSolutions?.solutions,
          normalizedData: normalizedData,
          normalizedSolutions: normalizedData.solutions,
        }
      );
    }

    if (component.componentType === "ManufacturingIndustryStatsSection") {
      console.log(
        "🔍 [MANUFACTURING STATS EXTRACTION] ManufacturingIndustryStatsSection extraction:",
        {
          componentType: component.componentType,
          contentJson: component.contentJson,
          parsedContent: component.contentJson
            ? JSON.parse(component.contentJson)
            : {},
          directContent: component.content,
          extractedRawData: rawData,
          finalStats:
            rawData.stats || rawData.items || rawData.industryStats?.stats,
          normalizedData: normalizedData,
          normalizedStats: normalizedData.stats,
        }
      );
    }

    // Validate the normalized props
    const validation = validateProps(component.componentType, normalizedData);
    if (!validation.isValid) {
      console.warn(
        "❌ [VALIDATION] Missing required props for",
        component.componentType,
        ":",
        validation.missingProps
      );
    } else {
      console.log(
        "✅ [VALIDATION] Props are valid for",
        component.componentType
      );
    }

    console.log("📤 [DEBUG] Final normalized data to return:", normalizedData);
    console.log("🔍 ========== [DEBUG END] extractComponentData ==========");
    console.log(" ");

    return normalizedData;
  };

  const loadComponents = async () => {
    console.log("🔄 ========== [DEBUG START] loadComponents ==========");
    console.log("🔄 [DEBUG] Page data components:", pageData.components);
    console.log(
      "🔄 [DEBUG] Number of components to load:",
      pageData.components?.length || 0
    );

    setLoading(true);
    setError(null);

    try {
      const componentMap = {};
      for (const component of pageData.components) {
        console.log(
          `🔄 [DEBUG] Processing component: ${component.componentType}`
        );
        console.log(
          "🔄 [DEBUG] Component data:",
          JSON.parse(JSON.stringify(component))
        );

        try {
          const path = getComponentPathFromId(component.componentType);
          console.log(
            `🔄 [DEBUG] Component path for ${component.componentType}:`,
            path
          );

          if (path) {
            console.log(`🔄 [DEBUG] Loading component from path: ${path}`);
            const Comp = await loadComponent(path);
            console.log(`🔄 [DEBUG] Component loaded successfully:`, !!Comp);
            console.log(`🔄 [DEBUG] Component type:`, typeof Comp);
            console.log(`🔄 [DEBUG] Component name:`, Comp?.name || "unnamed");

            if (Comp) {
              // Wrap the component to add debugging
              componentMap[component.componentType] = (props) => {
                console.log(
                  `🎭 [RENDER DEBUG] Rendering ${component.componentType} with props:`,
                  props
                );
                console.log(
                  `🎭 [RENDER DEBUG] Props keys:`,
                  Object.keys(props || {})
                );
                console.log(
                  `🎭 [RENDER DEBUG] Props JSON:`,
                  JSON.stringify(props, null, 2)
                );

                try {
                  const result = React.createElement(Comp, props);
                  console.log(
                    `🎭 [RENDER DEBUG] Component ${component.componentType} rendered successfully`
                  );
                  return result;
                } catch (renderError) {
                  console.error(
                    `🎭 [RENDER ERROR] Failed to render ${component.componentType}:`,
                    renderError
                  );
                  return (
                    <div className="p-4 border border-red-200 bg-red-50 rounded">
                      <h3 className="text-red-800 font-bold">
                        Render Error: {component.componentType}
                      </h3>
                      <p className="text-red-600">{renderError.message}</p>
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm">
                          Props Debug
                        </summary>
                        <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto">
                          {JSON.stringify(props, null, 2)}
                        </pre>
                      </details>
                    </div>
                  );
                }
              };
            } else {
              console.warn(
                `🔄 [WARNING] Component ${component.componentType} loaded as null/undefined`
              );
              componentMap[component.componentType] = () => null;
            }
          } else {
            console.warn(
              `🔄 [WARNING] No path found for component: ${component.componentType}`
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
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
                    Component path not found
                  </p>
                </div>
              </div>
            );
          }
        } catch (err) {
          console.error(
            `🔄 [ERROR] Failed to load component ${component.componentType}:`,
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
                  Component failed to load: {err.message}
                </p>
              </div>
            </div>
          );
        }
      }

      console.log("🔄 [DEBUG] Final component map:", Object.keys(componentMap));
      console.log("🔄 [DEBUG] Component map details:", componentMap);
      setLoadedComponents(componentMap);
    } catch (error) {
      console.error("🔄 [ERROR] loadComponents failed:", error);
      setError(error.message);
    } finally {
      setLoading(false);
      console.log("🔄 ========== [DEBUG END] loadComponents ==========");
    }
  };

  const getComponentIcon = (componentType) => {
    const component = availableComponents.find(
      (c) => c.componentType === componentType
    );
    return component?.icon || "📄";
  };

  const renderComponent = (component, index) => {
    console.log("🎨 ========== [DEBUG START] renderComponent ==========");
    console.log("🎨 [DEBUG] Component index:", index);
    console.log(
      "🎨 [DEBUG] Component object:",
      JSON.parse(JSON.stringify(component))
    );
    console.log("🎨 [DEBUG] Component type:", component.componentType);

    const Component = loadedComponents[component.componentType];
    console.log("🎨 [DEBUG] Loaded component exists:", !!Component);
    console.log("🎨 [DEBUG] Loaded component type:", typeof Component);
    console.log(
      "🎨 [DEBUG] Available loaded components:",
      Object.keys(loadedComponents)
    );

    if (!Component) {
      console.log("❌ [ERROR] Component not found in loadedComponents");
      console.log(
        "❌ [ERROR] Available components:",
        Object.keys(loadedComponents)
      );
      console.log("❌ [ERROR] Looking for:", component.componentType);

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
              <p className="text-xs text-yellow-600 mt-2">
                Available: {Object.keys(loadedComponents).join(", ") || "None"}
              </p>
            </div>
          </div>
        </div>
      );
    }

    console.log("✅ [SUCCESS] Component found, starting data processing...");

    // Extract and normalize component data using the new normalizeProps function
    console.log("🔧 [DEBUG] Calling extractComponentData...");
    const normalizedProps = extractComponentData(component);
    console.log(
      "🔧 [DEBUG] Normalized props result:",
      JSON.parse(JSON.stringify(normalizedProps))
    );

    console.log("🛡️ [DEBUG] Calling buildSafeProps...");
    const safeProps = buildSafeProps(normalizedProps);
    console.log(
      "🛡️ [DEBUG] Safe props result:",
      JSON.parse(JSON.stringify(safeProps))
    );

    // Get default data for the component (fallback for training components)
    const defaultData = trainingDefaultData[component.componentType] || {};
    console.log(
      "📚 [DEBUG] Default data for component:",
      JSON.parse(JSON.stringify(defaultData))
    );
    console.log(
      "📚 [DEBUG] Has default data:",
      Object.keys(defaultData).length > 0
    );

    // Merge normalized props with defaults - prioritize normalized data over defaults
    console.log("🔀 [DEBUG] Merging props... (defaultData + safeProps)");
    const mergedProps = { ...defaultData, ...safeProps };
    console.log(
      "🔀 [DEBUG] Merged props:",
      JSON.parse(JSON.stringify(mergedProps))
    );
    console.log("🔀 [DEBUG] Merged props keys:", Object.keys(mergedProps));

    // Add any missing function props that components might expect
    console.log("⚙️ [DEBUG] Adding function props...");
    const propsToPass = {
      ...mergedProps,
      // Add common function props that components might need
      renderIcon: mergedProps.renderIcon || (() => null),
      openProgramModal: mergedProps.openProgramModal || (() => {}),
      openFeatureModal: mergedProps.openFeatureModal || (() => {}),
      onCtaClick: mergedProps.onCtaClick || (() => {}),
    };

    // Comprehensive debug logging for all components to verify data is complete
    console.log(
      `🎯 [FINAL DEBUG] Component ${component.componentType} - Final propsToPass:`,
      JSON.parse(JSON.stringify(propsToPass))
    );
    console.log(`🎯 [FINAL DEBUG] Props keys:`, Object.keys(propsToPass));
    console.log(`🎯 [FINAL DEBUG] Props summary:`);
    Object.keys(propsToPass).forEach((key) => {
      const value = propsToPass[key];
      const type = typeof value;
      const isArray = Array.isArray(value);
      const length = isArray
        ? value.length
        : value && typeof value === "object"
        ? Object.keys(value).length
        : "N/A";
      console.log(
        `  📋 ${key}: ${type}${
          isArray
            ? `[${length}]`
            : type === "object" && value !== null
            ? `{${length} keys}`
            : ""
        } = ${
          isArray
            ? `[${value.length} items]`
            : type === "object" && value !== null
            ? "{object}"
            : value
        }`
      );
    });

    // Check for common issues
    if (propsToPass.painPoints && Array.isArray(propsToPass.painPoints)) {
      console.log(
        `✅ [CHECK] painPoints array exists with ${propsToPass.painPoints.length} items:`,
        propsToPass.painPoints
      );
    } else {
      console.log(
        `❌ [CHECK] painPoints missing or not an array:`,
        propsToPass.painPoints
      );
    }

    if (propsToPass.title) {
      console.log(`✅ [CHECK] title exists:`, propsToPass.title);
    } else {
      console.log(`❌ [CHECK] title missing:`, propsToPass.title);
    }

    // Special check for CTA components
    if (component.componentType.includes("CTA")) {
      console.log(
        `🚀 [CTA CHECK] CTA Component detected: ${component.componentType}`
      );
      console.log(
        `🚀 [CTA CHECK] Has ctaButton object:`,
        !!propsToPass.ctaButton
      );
      console.log(
        `🚀 [CTA CHECK] Has ctaButton.text:`,
        propsToPass.ctaButton?.text
      );
      console.log(
        `🚀 [CTA CHECK] Has ctaButton.link:`,
        propsToPass.ctaButton?.link
      );
      console.log(`🚀 [CTA CHECK] Has subtitle:`, !!propsToPass.subtitle);
      console.log(`🚀 [CTA CHECK] Has description:`, !!propsToPass.description);
      console.log(`🚀 [CTA CHECK] CTA data structure:`, {
        title: propsToPass.title,
        subtitle: propsToPass.subtitle,
        description: propsToPass.description,
        ctaButton: propsToPass.ctaButton,
        buttonText: propsToPass.buttonText, // Legacy format
      });
    }

    // Special check for ImplementationHeroSection
    if (component.componentType === "ImplementationHeroSection") {
      console.log(
        `🏗️ [IMPLEMENTATION CHECK] ImplementationHeroSection detected`
      );
      console.log(
        `🏗️ [IMPLEMENTATION CHECK] Has data object:`,
        !!propsToPass.data
      );
      console.log(
        `🏗️ [IMPLEMENTATION CHECK] Data keys:`,
        propsToPass.data ? Object.keys(propsToPass.data) : "No data"
      );
      console.log(
        `🏗️ [IMPLEMENTATION CHECK] Has backgroundVideo:`,
        !!propsToPass.data?.backgroundVideo
      );
      console.log(
        `🏗️ [IMPLEMENTATION CHECK] BackgroundVideo value:`,
        propsToPass.data?.backgroundVideo
      );
      console.log(
        `🏗️ [IMPLEMENTATION CHECK] Has titleParts:`,
        Array.isArray(propsToPass.data?.titleParts)
      );
      console.log(
        `🏗️ [IMPLEMENTATION CHECK] TitleParts length:`,
        propsToPass.data?.titleParts?.length
      );
      console.log(
        `🏗️ [IMPLEMENTATION CHECK] TitleParts values:`,
        propsToPass.data?.titleParts
      );
      console.log(
        `🏗️ [IMPLEMENTATION CHECK] Has description:`,
        !!propsToPass.data?.description
      );
      console.log(
        `🏗️ [IMPLEMENTATION CHECK] Description value:`,
        propsToPass.data?.description
      );
      console.log(
        `🏗️ [IMPLEMENTATION CHECK] Has ctaButton:`,
        !!propsToPass.data?.ctaButton
      );
      console.log(
        `🏗️ [IMPLEMENTATION CHECK] CTAButton structure:`,
        propsToPass.data?.ctaButton
      );

      // Add this debug check for ImplementationHeroSection
      console.log("🎯 [VARIANT DEBUG] ImplementationHeroSection CTA Data:", {
        rawVariant: propsToPass.data?.ctaButton?.variant,
        processedVariant: propsToPass.data?.ctaButton?.variant,
        variantType: typeof propsToPass.data?.ctaButton?.variant,
        hasVariantObject: !!propsToPass.data?.ctaButton?.variant,
      });

      console.log(
        `🏗️ [IMPLEMENTATION CHECK] Full data structure:`,
        JSON.stringify(propsToPass.data, null, 2)
      );
    }

    // Special check for ImplementationCTASection
    if (component.componentType === "ImplementationCTASection") {
      console.log("🎯 [CTA DEBUG] ImplementationCTASection Data:", {
        rawData: normalizedProps,
        buttonText: propsToPass.ctaButton?.text,
        buttonVariant: propsToPass.ctaButton?.variant,
        hasCtaButtonObject: !!propsToPass.ctaButton,
        title: propsToPass.title,
        subtitle: propsToPass.subtitle,
        description: propsToPass.description,
      });

      // Additional detailed debugging
      console.log("🔍 [CTA DEBUG] All button text sources:", {
        ctaButtonText: propsToPass.ctaButton?.text,
        buttonText: propsToPass.button?.text,
        directButtonText: propsToPass.buttonText,
        allProps: Object.keys(propsToPass),
        ctaButtonObject: propsToPass.ctaButton,
        buttonObject: propsToPass.button,
      });

      // Check if form data is being passed correctly
      console.log("📋 [FORM DEBUG] ImplementationCTASection form data:", {
        contentJson: component.contentJson,
        parsedContent: component.contentJson
          ? JSON.parse(component.contentJson)
          : {},
        hasContentJson: !!component.contentJson,
      });

      // Add this debug check for ImplementationCTASection features
      console.log("🎯 [FEATURES DEBUG] ImplementationCTASection Features:", {
        features: propsToPass.features,
        featuresCount: propsToPass.features?.length,
        featuresData: propsToPass.features,
      });
    }

    // Add this debug check for TrainingHeroSection
    if (component.componentType === "TrainingHeroSection") {
      console.log("🎯 [TRAINING CTA DEBUG] TrainingHeroSection CTA Data:", {
        ctaButton: propsToPass.ctaButton,
        buttonText: propsToPass.ctaButton?.text,
        buttonVariant: propsToPass.ctaButton?.variant,
        hasCtaButton: !!propsToPass.ctaButton,
        allProps: Object.keys(propsToPass),
      });
    }

    // Special debug for TrainingProgramsSection
    if (component.componentType === "TrainingProgramsSection") {
      console.log("🎯 [TRAINING PROGRAMS IMAGE DEBUG]", {
        componentData: component,
        normalizedProps: normalizedProps,
        safeProps: safeProps,
        mergedProps: mergedProps,
        finalImage: propsToPass.programsSection?.image,
        imageFlow: "Form → Normalize → Preview → Component",
        allProps: Object.keys(propsToPass),
        programsSection: propsToPass.programsSection,
      });
    }

    // Special debug for IntegrationTypesSection
    if (component.componentType === "IntegrationTypesSection") {
      console.log("🎯 [INTEGRATION TYPES RENDER DEBUG]", {
        componentData: component,
        normalizedProps: normalizedProps,
        safeProps: safeProps,
        mergedProps: mergedProps,
        finalItems: propsToPass.items,
        itemsCount: propsToPass.items?.length,
        itemsFlow: "Form → Normalize → Preview → Component",
        allProps: Object.keys(propsToPass),
        title: propsToPass.title,
      });
    }

    // Special debug for IntegrationBenefitsSection
    if (component.componentType === "IntegrationBenefitsSection") {
      console.log("🎯 [INTEGRATION BENEFITS RENDER DEBUG]", {
        componentData: component,
        normalizedProps: normalizedProps,
        safeProps: safeProps,
        mergedProps: mergedProps,
        finalItems: propsToPass.items,
        itemsCount: propsToPass.items?.length,
        benefitsFlow: "Form → Normalize → Preview → Component",
        allProps: Object.keys(propsToPass),
        title: propsToPass.title,
      });
    }

    // Special debug for CustomizationServicesSection
    if (component.componentType === "CustomizationServicesSection") {
      console.log("🎯 [CUSTOMIZATION SERVICES RENDER DEBUG]", {
        componentData: component,
        normalizedProps: normalizedProps,
        safeProps: safeProps,
        mergedProps: mergedProps,
        finalItems: propsToPass.items,
        itemsCount: propsToPass.items?.length,
        servicesFlow: "Form → Normalize → Preview → Component",
        allProps: Object.keys(propsToPass),
        title: propsToPass.title,
      });
    }

    // Special debug for CustomizationProcessSection
    if (component.componentType === "CustomizationProcessSection") {
      console.log("🎯 [CUSTOMIZATION PROCESS RENDER DEBUG]", {
        componentData: component,
        normalizedProps: normalizedProps,
        safeProps: safeProps,
        mergedProps: mergedProps,
        finalSteps: propsToPass.steps,
        stepsCount: propsToPass.steps?.length,
        processFlow: "Form → Normalize → Preview → Component",
        allProps: Object.keys(propsToPass),
        title: propsToPass.title,
      });
    }

    // Special debug for Manufacturing Components
    if (component.componentType === "ManufacturingHeroSection") {
      console.log("🎯 [MANUFACTURING RENDER DEBUG]", {
        normalizedProps: normalizedProps,
        safeProps: safeProps,
        mergedProps: mergedProps,
        propsToPass: propsToPass,
        hasBackgroundImage: !!propsToPass.backgroundImage,
        backgroundImage: propsToPass.backgroundImage,
      });
    }

    // Special debugging for About sections
    if (component.componentType.includes("About")) {
      console.log(`🎯 [ABOUT SECTION DEBUG] ${component.componentType}:`, {
        inputData: component.contentJson,
        normalizedData: normalizedProps,
        finalProps: propsToPass,
        hasImage: !!propsToPass.backgroundImage || !!propsToPass.image,
        imageUrl: propsToPass.backgroundImage || propsToPass.image,
      });
    }

    // Special debugging for team member images
    if (component.componentType === "AboutTeamSection") {
      console.log("👥 [TEAM MEMBERS DEBUG]:", {
        teamMembers: propsToPass.teamMembers,
        memberImages: propsToPass.teamMembers?.map((m) => m.image),
      });
    }

    if (component.componentType === "ManufacturingChallengesSection") {
      console.log("🎯 [MANUFACTURING CHALLENGES RENDER DEBUG]", {
        componentData: component,
        normalizedProps: normalizedProps,
        safeProps: safeProps,
        mergedProps: mergedProps,
        finalChallenges: propsToPass.challenges,
        challengesCount: propsToPass.challenges?.length,
        challengesFlow: "Form → Normalize → Preview → Component",
        allProps: Object.keys(propsToPass),
        title: propsToPass.title,
      });
    }

    if (component.componentType === "ManufacturingSolutionsSection") {
      console.log("🎯 [MANUFACTURING SOLUTIONS RENDER DEBUG]", {
        componentData: component,
        normalizedProps: normalizedProps,
        safeProps: safeProps,
        mergedProps: mergedProps,
        finalSolutions: propsToPass.solutions,
        solutionsCount: propsToPass.solutions?.length,
        solutionsFlow: "Form → Normalize → Preview → Component",
        allProps: Object.keys(propsToPass),
        title: propsToPass.title,
      });
    }

    if (component.componentType === "ManufacturingIndustryStatsSection") {
      console.log("🎯 [MANUFACTURING STATS RENDER DEBUG]", {
        componentData: component,
        normalizedProps: normalizedProps,
        safeProps: safeProps,
        mergedProps: mergedProps,
        finalStats: propsToPass.stats,
        statsCount: propsToPass.stats?.length,
        statsFlow: "Form → Normalize → Preview → Component",
        allProps: Object.keys(propsToPass),
        title: propsToPass.title,
      });
    }

    // Compute a per-component JSON snapshot to use as the render key.
    // Use a plain, synchronous computation (not a Hook) because this
    // function is an inner render helper — Hooks aren't allowed here.
    const componentKeySnapshot = (() => {
      try {
        return JSON.stringify(component);
      } catch {
        return `${component.componentType}-${
          component.orderIndex || index || Math.random()
        }`;
      }
    })();

    console.log("🎨 ========== [DEBUG END] renderComponent ==========");

    return (
      <motion.div
        key={componentKeySnapshot}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`relative ${
          !(component.isVisible === true || component.isVisible === 1)
            ? "opacity-75 border-2 border-dashed border-red-300"
            : ""
        }`}
        data-theme={component.theme === 1 ? "light" : "dark"}
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
                  {component.componentType} |
                  {component.isVisible === true || component.isVisible === 1
                    ? " 👁️ Visible"
                    : " 🚫 Hidden"}{" "}
                  |{component.theme === 1 ? " ☀️ Light" : " 🌙 Dark"}
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
            {/* Wrap component in section with theme attribute for Navbar detection */}
            <section data-theme={mapThemeValue(component.theme)}>
              <ErrorBoundary
                componentType={component.componentType}
                fallback={
                  <div className="p-4 text-sm text-red-700 bg-red-50 border-t border-r border-b border-red-200 rounded-b-lg">
                    <h3 className="font-bold mb-2">
                      Failed to render {component.componentType}
                    </h3>
                    <p>Please check the component data and props.</p>
                    <details className="mt-2">
                      <summary className="cursor-pointer">Props Debug</summary>
                      <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto max-h-40">
                        {JSON.stringify(propsToPass, null, 2)}
                      </pre>
                    </details>
                  </div>
                }
              >
                {(() => {
                  console.log(
                    `🎭 [RENDER] About to render ${component.componentType} component`
                  );
                  console.log(`🎭 [RENDER] Component function:`, Component);
                  console.log(`🎭 [RENDER] Props being passed:`, propsToPass);

                  try {
                    const renderedComponent = <Component {...propsToPass} />;
                    console.log(
                      `🎭 [RENDER SUCCESS] ${component.componentType} rendered successfully`
                    );
                    return renderedComponent;
                  } catch (renderError) {
                    console.error(
                      `🎭 [RENDER ERROR] Failed to render ${component.componentType}:`,
                      renderError
                    );
                    throw renderError;
                  }
                })()}
              </ErrorBoundary>
            </section>

            {/* Enhanced Debug info for all components */}
            <div className="p-2 text-xs text-gray-500 bg-gray-50 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <strong>Data Source:</strong>{" "}
                  {component.contentJson
                    ? "Backend JSON"
                    : component.content
                    ? "Backend Content"
                    : "Fallback/Default"}
                </div>
                <div>
                  <strong>Props Count:</strong>{" "}
                  {Object.keys(propsToPass).length}
                </div>
                <div>
                  <strong>Component Status:</strong>{" "}
                  {Component ? "✅ Loaded" : "❌ Missing"}
                </div>
              </div>
              <details className="mt-2">
                <summary className="cursor-pointer font-medium">
                  Detailed Debug Info
                </summary>
                <div className="mt-1 space-y-1 text-xs">
                  <div>
                    <strong>Component Type:</strong> {component.componentType}
                  </div>
                  <div>
                    <strong>Has contentJson:</strong> {!!component.contentJson}
                  </div>
                  <div>
                    <strong>Has content:</strong> {!!component.content}
                  </div>
                  <div>
                    <strong>Props Keys:</strong>{" "}
                    {Object.keys(propsToPass).join(", ")}
                  </div>
                  {propsToPass.painPoints && (
                    <div>
                      <strong>Pain Points:</strong>{" "}
                      {propsToPass.painPoints.length} items
                    </div>
                  )}
                  {propsToPass.title && (
                    <div>
                      <strong>Title:</strong> {propsToPass.title}
                    </div>
                  )}
                  <details className="mt-1">
                    <summary className="cursor-pointer">
                      Full Props JSON
                    </summary>
                    <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto max-h-32">
                      {JSON.stringify(propsToPass, null, 2)}
                    </pre>
                  </details>
                </div>
              </details>
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
                {(() => {
                  console.log(
                    "📋 [RENDER LIST] Starting to render component list"
                  );
                  console.log(
                    "📋 [RENDER LIST] Components to render:",
                    pageData.components.length
                  );
                  console.log(
                    "📋 [RENDER LIST] Component types:",
                    pageData.components.map((c) => c.componentType)
                  );

                  // Filter components to only show visible ones (isVisible: true)
                  // This matches the behavior of public pages
                  const componentsToRender = pageData.components.filter(
                    (component) =>
                      component.isVisible === true || component.isVisible === 1
                  );
                  console.log(
                    `👁️ [PREVIEW] Showing ${componentsToRender.length}/${pageData.components.length} visible components`
                  );

                  return componentsToRender.map((component, index) => {
                    console.log(
                      `📋 [RENDER LIST] Processing component ${index + 1}/${
                        componentsToRender.length
                      }: ${component.componentType} (isVisible: ${
                        component.isVisible
                      })`
                    );
                    const result = renderComponent(component, index);
                    console.log(
                      `📋 [RENDER LIST] Component ${index + 1} processed:`,
                      !!result
                    );
                    return result;
                  });
                })()}
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
