import React, { useState, useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import pagesAPI from "../lib/pagesAPI";
import { getComponentPathFromId, loadComponent } from "./componentMap";
import { normalizeProps, validateProps } from "../utils/normalizeProps";

const DynamicPageRenderer = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedComponents, setLoadedComponents] = useState({});

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the new public API endpoint to fetch page by slug directly
        const response = await pagesAPI.getPublicPageBySlug(slug);

        // The API response is wrapped in an ApiResponse object with a 'data' property
        const pageData = response.data || response;
        setPageData(pageData);

        // Load components for each section (support both old sections format and new components format)
        const sectionsToRender = pageData.sections || pageData.components || [];

        if (sectionsToRender.length > 0) {
          const componentPromises = sectionsToRender.map(
            async (section, index) => {
              // Handle new components format
              if (pageData.components) {
                const componentPath = getComponentPathFromId(
                  section.componentType
                );
                if (componentPath) {
                  const Component = await loadComponent(componentPath);
                  return {
                    sectionId: `component-${index}`,
                    Component,
                    sectionData: section,
                  };
                }
                return {
                  sectionId: `component-${index}`,
                  Component: null,
                  sectionData: section,
                };
              }

              // Handle old sections format
              const componentPath =
                section.componentPath ||
                getComponentPathFromId(section.componentId);
              if (componentPath) {
                const Component = await loadComponent(componentPath);
                return {
                  sectionId: section.uid,
                  Component,
                  sectionData: section,
                };
              }
              return {
                sectionId: section.uid,
                Component: null,
                sectionData: section,
              };
            }
          );

          const loadedComponents = await Promise.all(componentPromises);
          const componentMap = {};
          loadedComponents.forEach(({ sectionId, Component, sectionData }) => {
            if (Component) {
              componentMap[sectionId] = { Component, sectionData };
            }
          });
          setLoadedComponents(componentMap);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }

    // Listen for page data updates from the admin dashboard
    const handlePageDataUpdate = (event) => {
      const { slug: updatedSlug } = event.detail;
      if (updatedSlug === slug) {
        console.log(`🔄 Page data updated for ${slug}, refreshing...`);
        fetchPage();
      }
    };

    window.addEventListener("pageDataUpdated", handlePageDataUpdate);

    // Cleanup event listener
    return () => {
      window.removeEventListener("pageDataUpdated", handlePageDataUpdate);
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The page "{slug}" could not be found.
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No page data available.</p>
        </div>
      </div>
    );
  }

  // Transform props to match component expectations
  const transformProps = (componentId, props) => {
    switch (componentId) {
      // ========== PAYROLL COMPONENTS ==========
      case "PayrollHeroSection":
        return {
          title: props.title,
          subtitle: props.subtitle,
          bgColor: props.bgColor,
          bgVideo: props.bgVideo,
          onCtaClick: props.onCtaClick,
        };
      case "PayrollWorkflowSection":
        return {
          workflowData: {
            title: props.title,
            description: props.subtitle,
            steps: props.workflow || props.steps,
          },
        };
      case "PayrollStepperSection":
        return {
          steps: props.steps || [],
        };
      case "PayrollHowItWorksSection":
        return {
          data: {
            title: props.title,
            description: props.subtitle,
            steps: props.steps || [],
          },
        };
      case "PayrollPainPointsSection":
        return {
          painPoints: props.painPoints || [],
        };
      case "PayrollFAQSection":
        return {
          faqData: {
            title: props.title,
            items: props.faqs || props.items || [],
          },
        };
      case "PayrollCTASection":
        return {
          title: props.title,
          subtitle: props.subtitle,
          description: props.description,
          ctaButton: props.ctaButton,
          features: props.features,
          trustedBy: props.trustedBy,
          onCtaClick: props.onCtaClick || (() => {}),
        };

      // ========== HR COMPONENTS ==========
      case "HRHeroSection":
        return {
          data: {
            hero: {
              title: props.title,
              subtitle: props.subtitle,
              bgVideo: props.bgVideo,
              bgColor: props.bgColor,
            },
          },
        };
      case "HRModulesSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            modules: props.modules || props.features || [],
          },
        };
      case "HRBenefitsSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            benefits: props.benefits || [],
          },
        };
      case "HRUseCasesSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            useCases: props.useCases || [],
          },
        };
      case "HRPricingSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            description: props.description,
            pricing: props.plans || [], // Transform 'plans' to 'pricing'
          },
        };
      case "HRFAQSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            faqs: props.faqs || [],
          },
        };
      case "HRCTASection":
        return {
          title: props.title,
          subtitle: props.subtitle,
          description: props.description,
          ctaButton: props.ctaButton,
          features: props.features,
          trustedBy: props.trustedBy,
          onCtaClick: props.onCtaClick || (() => {}),
        };

      // ========== SERVICE COMPONENTS ==========
      case "ServiceGrid":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle || props.description,
            services: props.services || [],
          },
        };

      // ========== IMPLEMENTATION COMPONENTS ==========
      case "ImplementationHeroSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            bgVideo: props.bgVideo,
            ctaButton: props.ctaButton,
          },
        };
      case "ImplementationProcessSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            description: props.description,
            phases: props.phases || props.steps || [],
          },
        };
      case "ImplementationWhyChooseSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            features: props.features || [],
          },
        };
      case "ImplementationPricingSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            description: props.description,
            plans: props.plans || [],
          },
        };
      case "ImplementationCTASection":
        return {
          title: props.title,
          subtitle: props.subtitle,
          description: props.description,
          ctaButton: props.ctaButton,
          features: props.features,
          trustedBy: props.trustedBy,
          openModal: props.openModal || (() => {}),
        };

      // ========== TRAINING COMPONENTS ==========
      case "TrainingHeroSection":
        return {
          heroContent: {
            title:
              props.heroContent?.title ||
              props.title ||
              "Professional Training Programs",
            description:
              props.heroContent?.description ||
              props.subtitle ||
              "Empower your team with comprehensive training solutions designed to enhance skills and drive success",
          },
          backgroundVideo:
            props.backgroundVideo || "/trainingHeroSectionTwo.mp4",
          ctaButton: props.ctaButton,
        };
      case "TrainingProgramsSection":
        return {
          programsSection: {
            title: props.title || "Training Programs",
            description:
              props.subtitle ||
              "Comprehensive training programs designed to enhance your skills and knowledge.",
            image:
              props.image ||
              props.programsSection?.image ||
              "/images/training.jpg",
            Professional_Badge:
              props.badge ||
              props.programsSection?.Professional_Badge ||
              "Certified Training",
          },
          trainingPrograms: {
            programs: props.programs || [],
          },
          renderIcon: props.renderIcon || (() => null),
          openProgramModal: props.openProgramModal || (() => {}),
        };
      case "TrainingWhyChooseSection":
        return {
          whyChooseSection: {
            title: props.title || "Why Choose Our Training",
            description:
              props.subtitle || "Professional development excellence",
            image: props.image || "/images/training-why-choose.jpg",
            Professional_Badge: props.badge || "Professional Excellence",
          },
          trainingFeatures: props.features || [],
          renderIcon: props.renderIcon || (() => null),
          openFeatureModal: props.openFeatureModal || (() => {}),
        };

      // ========== INTEGRATION COMPONENTS ==========
      case "IntegrationHeroSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
          },
        };
      case "IntegrationTypesSection":
        return {
          title: props.title || "Integration Types",
          items: props.items || props.types || [],
        };
      case "IntegrationBenefitsSection":
        return {
          title: props.title || "Integration Benefits",
          items: props.items || props.benefits || [],
        };

      // ========== CUSTOMIZATION COMPONENTS ==========
      case "CustomizationHeroSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
          },
        };
      case "CustomizationServicesSection":
        return {
          title: props.title || "What We Customize",
          items: props.items || props.services || [],
        };
      case "CustomizationProcessSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            steps: props.steps || [],
          },
        };

      // ========== MANUFACTURING COMPONENTS ==========
      case "ManufacturingHeroSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            description: props.description,
            backgroundImage: props.backgroundImage,
            backgroundVideo: props.backgroundVideo,
            ctaButton: props.ctaButton,
          },
        };
      case "ManufacturingIndustryStatsSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            stats: props.stats || [],
          },
        };
      case "ManufacturingChallengesSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            challenges: props.challenges || [],
          },
        };
      case "ManufacturingSolutionsSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            solutions: props.solutions || [],
          },
        };
      case "ManufacturingCaseStudiesSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            caseStudies: props.caseStudies || [],
          },
        };
      case "ManufacturingImplementationProcessSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            steps: props.steps || [],
          },
        };
      case "ManufacturingCTASection":
        return {
          title: props.title,
          subtitle: props.subtitle,
          description: props.description,
          ctaButton: props.ctaButton,
          features: props.features,
          trustedBy: props.trustedBy,
          openContactModal: props.openContactModal || (() => {}),
        };

      // ========== RETAIL COMPONENTS ==========
      case "RetailHeroSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            ctaButton: props.ctaButton,
          },
        };
      case "RetailIndustryStatsSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            stats: props.stats || [],
          },
        };
      case "RetailChallengesSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            challenges: props.challenges || [],
          },
        };
      case "RetailSolutionsSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            solutions: props.solutions || [],
          },
        };
      case "RetailFeaturesSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            features: props.features || [],
          },
        };
      case "RetailCaseStudiesSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            caseStudies: props.caseStudies || [],
          },
        };
      case "RetailImplementationSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            steps: props.steps || [],
          },
        };
      case "RetailCTASection":
        return {
          title: props.title,
          subtitle: props.subtitle,
          description: props.description,
          ctaButton: props.ctaButton,
          features: props.features,
          trustedBy: props.trustedBy,
          openContactModal: props.openContactModal || (() => {}),
        };

      // ========== ABOUT COMPONENTS ==========
      case "AboutHeroSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            ctaButton: props.ctaButton,
          },
        };
      case "AboutMissionSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            description: props.description,
          },
        };
      case "AboutValuesSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            values: props.values || [],
          },
        };
      case "AboutTeamSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            team: props.team || [],
          },
        };
      case "AboutJourneySection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            timeline: props.timeline || [],
          },
        };
      case "AboutMilestonesSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            milestones: props.milestones || [],
          },
        };
      case "AboutDifferentiatorsSection":
        return {
          data: {
            title: props.title,
            subtitle: props.subtitle,
            differentiators: props.differentiators || [],
          },
        };
      case "AboutCTASection":
        return {
          title: props.title,
          subtitle: props.subtitle,
          description: props.description,
          ctaButton: props.ctaButton,
          features: props.features,
          trustedBy: props.trustedBy,
          onOpenContactModal: props.onOpenContactModal || (() => {}),
        };

      // ========== DEFAULT CASE ==========
      default:
        // For unknown components, try to pass props in a generic data structure
        return {
          data: props,
          ...props,
        };
    }
  };

  // Helper function to extract and normalize data from various formats (consistent with PagePreview)
  const extractComponentData = (component) => {
    console.log(
      `🔍 [DynamicPageRenderer] Extracting data for ${component.componentType}`
    );
    console.log(`📦 [DynamicPageRenderer] Raw component:`, component);

    let rawData = {};

    // PRIORITY 1: Use contentJson from form (this is the PRIMARY data source)
    if (component.contentJson) {
      try {
        console.log(
          `✅ [PRIORITY 1] Using contentJson from form for ${component.componentType}`
        );
        rawData =
          typeof component.contentJson === "string"
            ? JSON.parse(component.contentJson)
            : component.contentJson;

        console.log(
          `✅ [PRIORITY 1] Successfully parsed contentJson:`,
          rawData
        );
      } catch (err) {
        console.warn(
          `❌ [ERROR] Failed to parse contentJson for ${component.componentType}:`,
          err
        );
        console.warn("Raw contentJson:", component.contentJson);
      }
    }

    // PRIORITY 2: Use content from backend API (only if no form data)
    else if (
      component.content &&
      typeof component.content === "object" &&
      Object.keys(component.content).length > 0
    ) {
      console.log(
        `✅ [PRIORITY 2] Using content from API for ${component.componentType}`
      );
      rawData = component.content;
    }

    // PRIORITY 3: Try to use component properties directly (only if no form or API data)
    else if (!rawData || Object.keys(rawData).length === 0) {
      console.log(
        `✅ [PRIORITY 3] Using direct component properties for ${component.componentType}`
      );
      const directProps = [
        "title",
        "subtitle",
        "description",
        "image",
        "programs",
        "features",
      ];
      directProps.forEach((prop) => {
        if (component[prop] !== undefined) {
          rawData[prop] = component[prop];
        }
      });
    }

    console.log(`📦 [DynamicPageRenderer] Final raw data:`, rawData);

    // Use normalizeProps to map the raw data to the correct component props
    const normalizedData = normalizeProps(component.componentType, rawData);
    console.log(
      `🔄 [DynamicPageRenderer] After normalizeProps:`,
      normalizedData
    );

    // Validate the normalized props
    const validation = validateProps(component.componentType, normalizedData);
    if (!validation.isValid) {
      console.warn(
        `❌ [VALIDATION] Missing required props for ${component.componentType}:`,
        validation.missingProps
      );
    } else {
      console.log(
        `✅ [VALIDATION] Props are valid for ${component.componentType}`
      );
    }

    console.log(
      `📤 [DynamicPageRenderer] Final normalized props:`,
      normalizedData
    );

    return normalizedData;
  };

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

  // Render page sections dynamically using actual components
  const renderSection = (section, index) => {
    const sectionId = pageData.components ? `component-${index}` : section.uid;
    const componentData = loadedComponents[sectionId];

    if (componentData && componentData.Component) {
      const { Component, sectionData } = componentData;

      // Handle new components format - use consistent logic with PagePreview
      if (pageData.components) {
        const normalizedProps = extractComponentData(section);
        const safeProps = buildSafeProps(normalizedProps);

        // Add any missing function props that components might expect
        const propsToPass = {
          ...safeProps,
          // Add common function props that components might need
          renderIcon: safeProps.renderIcon || (() => null),
          openProgramModal: safeProps.openProgramModal || (() => {}),
          openFeatureModal: safeProps.openFeatureModal || (() => {}),
          onCtaClick: safeProps.onCtaClick || (() => {}),
        };

        return <Component key={sectionId} {...propsToPass} />;
      }

      // Handle old sections format - keep existing logic for backward compatibility
      const transformedProps = transformProps(
        section.componentId,
        section.props
      );
      return <Component key={sectionId} {...transformedProps} />;
    }

    // Fallback: render a placeholder if component couldn't be loaded
    return (
      <div key={sectionId} className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">📄</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {pageData.components ? section.componentName : section.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {pageData.components
                  ? section.componentType
                  : section.componentId}{" "}
                (Component not found)
              </p>
            </div>
          </div>

          {/* Render section content based on props */}
          <div className="space-y-4">
            {pageData.components ? (
              // Show component data for new format
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Component Data (contentJson):
                </h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm overflow-auto">
                  {section.contentJson}
                </pre>
                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                  Parsed & Normalized Props:
                </h4>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(extractComponentData(section), null, 2)}
                </pre>
              </div>
            ) : (
              // Show props for old format
              <>
                {section.props?.title && (
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {section.props.title}
                  </h3>
                )}

                {section.props?.subtitle && (
                  <p className="text-gray-600 dark:text-gray-300">
                    {section.props.subtitle}
                  </p>
                )}

                {section.props?.description && (
                  <p className="text-gray-600 dark:text-gray-300">
                    {section.props.description}
                  </p>
                )}

                {/* Render arrays like features, steps, etc. */}
                {section.props?.features &&
                  Array.isArray(section.props.features) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.props.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            {feature.title || feature.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Render workflow arrays */}
                {section.props?.workflow &&
                  Array.isArray(section.props.workflow) && (
                    <div className="space-y-3">
                      {section.props.workflow.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            {item.step || idx + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                {section.props?.steps && Array.isArray(section.props.steps) && (
                  <div className="space-y-3">
                    {section.props.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {step.number || step.step || idx + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.props?.ctaText && (
                  <div className="pt-4">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      {section.props.ctaText}
                    </button>
                  </div>
                )}

                {/* Background Image */}
                {section.props?.backgroundImage && (
                  <div className="mt-4">
                    <img
                      src={section.props.backgroundImage}
                      alt={section.props.title || section.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Render sections directly without any wrapper - let each component handle its own styling */}
      {(pageData.sections && pageData.sections.length > 0) ||
      (pageData.components && pageData.components.length > 0) ? (
        (pageData.components || pageData.sections).map((section, index) =>
          renderSection(section, index)
        )
      ) : (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No sections found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              This page doesn't have any sections yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicPageRenderer;
