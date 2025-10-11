import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EyeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Card, { CardContent, CardHeader, CardTitle } from "../UI/Card";

// Import About components
import AboutHero from "../About/AboutHero";
import AboutMission from "../About/AboutMission";
import AboutTeam from "../About/AboutTeam";
import AboutValues from "../About/AboutValues";
import AboutJourney from "../About/AboutJourney";
import AboutMilestones from "../About/AboutMilestones";
import AboutDifferentiators from "../About/AboutDifferentiators";
import AboutCTA from "../About/AboutCTA";

/**
 * Real-time Component Preview System
 * Renders components with live data updates while maintaining original styling
 */
const ComponentPreview = ({
  componentType,
  componentData = {},
  theme = 1,
  isVisible = true,
  className = ""
}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Component registry mapping
  const componentRegistry = {
    AboutHeroSection: AboutHero,
    AboutMissionSection: AboutMission,
    AboutTeamSection: AboutTeam,
    AboutValuesSection: AboutValues,
    AboutJourneySection: AboutJourney,
    AboutMilestonesSection: AboutMilestones,
    AboutDifferentiatorsSection: AboutDifferentiators,
    AboutCTASection: AboutCTA
  };

  // Transform data to component props format
  const transformedProps = useMemo(() => {
    if (!componentData) return {};
    
    try {
      // Transform based on component type
      switch (componentType) {
        case 'AboutHeroSection':
          return {
            data: {
              title: componentData.title,
              subtitle: componentData.subtitle,
              description: componentData.description,
              backgroundVideo: componentData.backgroundVideo,
              stats: componentData.stats || []
            }
          };

        case 'AboutMissionSection': {
          console.log("🎯 [AboutMissionSection TRANSFORM] Input data:", componentData);
          const transformedMissionData = {
            data: {
              title: componentData.title || "",
              subtitle: componentData.subtitle || "",
              description: componentData.description || "",
              vision: componentData.vision || "",
              additionalContent: componentData.additionalContent || "",
              image: componentData.image || "",
              stats: Array.isArray(componentData.stats) ? componentData.stats : [],
              missionPoints: Array.isArray(componentData.missionPoints) ? componentData.missionPoints : []
            }
          };
          console.log("✅ [AboutMissionSection TRANSFORM] Output data:", transformedMissionData);
          return transformedMissionData;
        }

        case 'AboutTeamSection':
          return {
            teamMembers: componentData.members || [],
            data: {
              title: componentData.title,
              description: componentData.description
            }
          };

        case 'AboutValuesSection':
          return {
            values: componentData.items || [],
            data: {
              title: componentData.title,
              description: componentData.description
            }
          };

        case 'AboutJourneySection':
          return {
            data: {
              title: componentData.title,
              description: componentData.description,
              timeline: componentData.timeline || []
            }
          };

        case 'AboutMilestonesSection':
          return {
            milestones: componentData.items || [],
            data: {
              title: componentData.title,
              description: componentData.description
            }
          };

        case 'AboutDifferentiatorsSection':
          return {
            differentiators: componentData.items || [],
            data: {
              title: componentData.title,
              description: componentData.description
            }
          };

        case 'AboutCTASection':
          return {
            title: componentData.title,
            subtitle: componentData.subtitle,
            description: componentData.description,
            ctaButton: componentData.ctaButton,
            features: componentData.features || [],
            onOpenContactModal: () => console.log('Contact modal opened')
          };

        default:
          // Generic prop structure for unknown components
          return componentData;
      }
    } catch (error) {
      console.error(`Error transforming props for ${componentType}:`, error);
      setError(`Failed to transform component props: ${error.message}`);
      return {};
    }
  }, [componentType, componentData]);

  // Get component from registry
  const Component = componentRegistry[componentType];

  // Error boundary wrapper
  const ErrorBoundaryWrapper = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    const [errorDetails, setErrorDetails] = useState(null);
    
    const dataString = JSON.stringify(componentData);

    useEffect(() => {
      setHasError(false);
      setErrorDetails(null);
    }, [dataString]);

    const handleError = (error, errorInfo) => {
      console.error(`Component Error in ${componentType}:`, error, errorInfo);
      setHasError(true);
      setErrorDetails({ error, errorInfo });
    };

    if (hasError) {
      return (
        <div className="p-6 border border-red-200 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20">
          <div className="flex items-center space-x-2 mb-4">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
              Component Render Error
            </h3>
          </div>
          <p className="text-sm text-red-600 dark:text-red-400 mb-2">
            {componentType} failed to render with the current configuration.
          </p>
          <details className="text-xs text-red-500">
            <summary className="cursor-pointer">Error Details</summary>
            <pre className="mt-2 p-2 bg-red-100 dark:bg-red-800/20 rounded overflow-auto">
              {errorDetails?.error?.toString()}
            </pre>
          </details>
        </div>
      );
    }

    try {
      return children;
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  if (!Component) {
    return (
      <div className="p-6 border border-yellow-200 dark:border-yellow-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
        <div className="flex items-center space-x-2 mb-2">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">
            Component Not Found
          </h3>
        </div>
        <p className="text-sm text-yellow-600 dark:text-yellow-400">
          Component type "{componentType}" is not registered in the preview system.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 border border-red-200 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20">
        <div className="flex items-center space-x-2 mb-2">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
            Preview Error
          </h3>
        </div>
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className={`component-preview ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${componentType}-${JSON.stringify(componentData)}`}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isVisible ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
          style={{
            filter: isVisible ? 'none' : 'grayscale(50%)',
          }}
        >
          <ErrorBoundaryWrapper>
            {/* Wrap component in section with theme attribute for proper styling */}
            <section data-theme={theme === 1 ? "light" : "dark"}>
              <Component {...transformedProps} />
            </section>
          </ErrorBoundaryWrapper>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/**
 * Live Preview Container
 * Handles multiple component previews with real-time updates
 */
const LivePreview = ({
  components = [],
  previewMode = "desktop",
  showDebugInfo = false,
  className = ""
}) => {
  const [refreshKey, setRefreshKey] = useState(0);

  // Force refresh when component data changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRefreshKey(prev => prev + 1);
    }, 100); // Small debounce to prevent too frequent updates
    
    return () => clearTimeout(timeout);
  }, [components]);

  const previewClasses = {
    desktop: "max-w-none",
    tablet: "max-w-4xl mx-auto",
    mobile: "max-w-sm mx-auto"
  };

  return (
    <Card className={`bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-xl font-bold flex items-center space-x-2">
            <EyeIcon className="h-5 w-5" />
            <span>Live Preview</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">
              {previewMode.charAt(0).toUpperCase() + previewMode.slice(1)} View
            </span>
            <span className="text-xs text-gray-500">
              ({components.length} component{components.length !== 1 ? 's' : ''})
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`bg-white dark:bg-gray-900 rounded-lg min-h-[400px] ${previewClasses[previewMode]}`}>
          {components.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="text-center">
                <EyeIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No components to preview</p>
                <p className="text-sm">Add components to see them here</p>
              </div>
            </div>
          ) : (
            <div key={refreshKey} className="space-y-0">
              {components.map((component, index) => {
                // Enhanced real-time data extraction
                const extractComponentData = (component) => {
                  console.log("🔄 [REALTIME EXTRACTION] Component data:", {
                    componentType: component.componentType,
                    contentJson: component.contentJson,
                    hasContentJson: !!component.contentJson,
                    isAboutMissionSection: component.componentType === 'AboutMissionSection'
                  });

                  let rawData = {};
                  
                  // Always use the latest contentJson from form
                  if (component.contentJson) {
                    try {
                      rawData = JSON.parse(component.contentJson);
                      console.log("✅ [REALTIME EXTRACTION] Parsed content:", rawData);
                    } catch (err) {
                      console.error("❌ [REALTIME EXTRACTION] JSON parse error:", err);
                      rawData = {};
                    }
                  }

                  // Enhanced debugging for AboutMissionSection
                  if (component.componentType === 'AboutMissionSection') {
                    console.log("🎯 [AboutMissionSection EXTRACTION] Debug data:", {
                      rawContentJson: component.contentJson,
                      parsedData: rawData,
                      fieldAnalysis: {
                        hasTitle: !!rawData.title,
                        hasSubtitle: !!rawData.subtitle,
                        hasDescription: !!rawData.description,
                        hasVision: !!rawData.vision,
                        hasAdditionalContent: !!rawData.additionalContent,
                        hasImage: !!rawData.image,
                        hasStats: Array.isArray(rawData.stats),
                        statsCount: rawData.stats?.length || 0,
                        hasMissionPoints: Array.isArray(rawData.missionPoints),
                        missionPointsCount: rawData.missionPoints?.length || 0
                      },
                      timestamp: new Date().toISOString()
                    });
                  }
                  
                  return rawData;
                };

                let componentData = extractComponentData(component);

                // Debug logging for all About components
                if (component.componentType?.includes("About")) {
                  console.log(`👁️ [LIVE PREVIEW] Rendering ${component.componentType}:`, {
                    componentIndex: index,
                    hasContentJson: !!component.contentJson,
                    contentJsonLength: component.contentJson?.length || 0,
                    parsedData: componentData,
                    extractedKeys: Object.keys(componentData),
                    timestamp: new Date().toISOString()
                  });
                }
                
                return (
                  <div key={`${component.id || index}-${component.componentType}-${component.contentJson?.slice(0, 50)}`} className="relative">
                    {showDebugInfo && (
                      <div className="absolute top-2 right-2 z-10 bg-black/70 text-white text-xs p-2 rounded max-w-xs">
                        <div><strong>Type:</strong> {component.componentType}</div>
                        <div><strong>Theme:</strong> {component.theme === 1 ? 'Light' : 'Dark'}</div>
                        <div><strong>Visible:</strong> {component.isVisible ? 'Yes' : 'No'}</div>
                        <div><strong>Order:</strong> {component.orderIndex || index + 1}</div>
                        <div><strong>Data Keys:</strong> {Object.keys(componentData).join(', ')}</div>
                      </div>
                    )}
                    
                    <ComponentPreview
                      componentType={component.componentType}
                      componentData={componentData}
                      theme={component.theme}
                      isVisible={component.isVisible}
                      key={`preview-${component.id || index}-${JSON.stringify(componentData).slice(0, 100)}`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Split-Screen Preview with Form
 * Shows form and preview side-by-side
 */
const SplitScreenPreview = ({
  componentType,
  componentData,
  formComponent,
  theme = 1,
  className = ""
}) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {/* Form Side */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-lg font-bold">
            Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-96 overflow-y-auto">
          {formComponent}
        </CardContent>
      </Card>

      {/* Preview Side */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-lg font-bold">
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
            <ComponentPreview
              componentType={componentType}
              componentData={componentData}
              theme={theme}
              isVisible={true}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ComponentPreview, LivePreview, SplitScreenPreview };
export default LivePreview;