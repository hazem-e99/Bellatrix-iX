import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  PlusIcon,
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  Bars3BottomLeftIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Button from "../UI/Button";
import { Input } from "../UI/Input";
import Card, { CardContent, CardHeader, CardTitle } from "../UI/Card";
import Modal, { ModalFooter } from "../UI/Modal";
import FancyToggle, { ComponentToggles } from "../UI/FancyToggle";
import { validateVariant } from "../../utils/variantSystem";
import Toast from "../UI/Toast";
import SectionDataEditor from "./SectionDataEditor";
import PagePreview from "./PagePreview";
import MediaInputDetector from "../UI/MediaInputDetector";
import DynamicContentForm from "../UI/DynamicContentForm";
import DynamicFormGenerator from "../UI/DynamicFormGenerator";
import { LivePreview, SplitScreenPreview } from "../UI/LivePreview";
import { getAboutComponentSchema } from "../../data/aboutComponentSchemas";
import { getGeneralComponentSchema } from "../../data/generalComponentSchemas";
import { generateDynamicSchema, mergeDynamicSchema } from "../../utils/dynamicSchemaGenerator";
import pagesAPI from "../../lib/pagesAPI";
import api from "../../lib/api";

const EnhancedPageBuilder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pageId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [toast, setToast] = useState(null);

  // Ref to prevent multiple simultaneous API calls
  const isSavingRef = useRef(false);

  // Page data - moved up to fix initialization order
  const [pageData, setPageData] = useState({
    id: null, // Add page ID to state
    name: "",
    categoryId: null,
    slug: "",
    metaTitle: "",
    metaDescription: "",
    isHomepage: false,
    isPublished: false,
    components: [],
  });
  
  // Debounced auto-save system
  const autoSaveTimeoutRef = useRef(null);
  
  // Debounced auto-save function
  const debouncedAutoSave = useCallback((componentIndex, componentData) => {
    // Clear any existing timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    // Set new timeout for auto-save
    autoSaveTimeoutRef.current = setTimeout(() => {
      const component = pageData.components[componentIndex];
      if (!component?.id || !pageData.id) {
        console.log("⚠️ [AUTO-SAVE] Skipping auto-save - component or page not saved yet");
        return;
      }
      
      const updateData = {
        id: component.id,
        pageId: pageData.id,
        componentType: component.componentType,
        componentName: component.componentName || "",
        contentJson: JSON.stringify(componentData, null, 2),
        orderIndex: component.orderIndex !== undefined ? component.orderIndex : componentIndex,
        isVisible: Boolean(component.isVisible === true || component.isVisible === 1),
        theme: component.theme === 1 ? 1 : 2,
      };
      
      console.log("💾 [AUTO-SAVE] Saving component:", {
        componentType: component.componentType,
        componentId: component.id,
        dataKeys: Object.keys(componentData)
      });
      
      pagesAPI.updatePageComponent(component.id, updateData)
        .then(() => {
          console.log("✅ [AUTO-SAVE] Component saved successfully");
        })
        .catch((error) => {
          console.error("❌ [AUTO-SAVE] Failed to save component:", error);
        });
    }, 1500); // 1.5 second delay
  }, [pageData.components, pageData.id]);

  // Cleanup auto-save timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  // Step navigation handler
  const handleStepClick = (stepId) => {
    console.log("🎯 [STEP NAVIGATION] Clicked step:", stepId);

    if (stepId < currentStep) {
      setCurrentStep(stepId);
      console.log(`✅ [STEP NAVIGATION] Navigated back to step ${stepId}`);
    } else if (stepId === currentStep) {
      console.log("ℹ️ [STEP NAVIGATION] Already on this step");
    } else {
      console.log("❌ [STEP NAVIGATION] Cannot skip ahead to future steps");
    }
  };

  // Available components derived dynamically from component registry
  const [availableComponents, setAvailableComponents] = useState([]);

  // Load existing page data if editing
  useEffect(() => {
    const loadExistingPage = async () => {
      if (pageId && !isNaN(parseInt(pageId))) {
        try {
          setLoading(true);
          console.log(
            `🔄 [PAGE LOAD] Loading existing page with ID: ${pageId}`
          );

          const pageData = await pagesAPI.getPageById(pageId);
          const components = await pagesAPI.getPageComponents(pageId);

          console.log("✅ [PAGE LOAD] Loaded page data:", {
            pageData,
            components,
          });

          setPageData({
            id: pageData.id,
            name: pageData.name || "",
            categoryId: pageData.categoryId || null,
            slug: pageData.slug || "",
            metaTitle: pageData.metaTitle || "",
            metaDescription: pageData.metaDescription || "",
            isHomepage: pageData.isHomepage || false,
            isPublished: pageData.isPublished || false,
            components:
              components?.map((component, index) => ({
                id: component.id,
                componentType: component.componentType || "Generic",
                componentName: component.componentName || "Component",
                orderIndex: component.orderIndex ?? index + 1,
                isVisible: component.isVisible ?? true,
                theme: component.theme ?? 1,
                contentJson: component.contentJson || JSON.stringify({}),
              })) || [],
          });

          // Set current step to component configuration if we have data
          if (components && components.length > 0) {
            setCurrentStep(2);
          }
        } catch (error) {
          console.error("❌ [PAGE LOAD] Failed to load existing page:", error);
          showToast(`Failed to load page: ${error.message}`, "error");
        } finally {
          setLoading(false);
        }
      }
    };

    loadExistingPage();
  }, [pageId]);

  useEffect(() => {
    // Load components from comprehensive component registry
    const loadRegistry = async () => {
      try {
        const { getAllComponents } = await import("../../data/componentRegistry");
        const registryComponents = getAllComponents();
        
        console.log("📦 [COMPONENT REGISTRY] Loaded components from registry:", registryComponents.length);
        
        // Convert registry components to the format expected by the builder
        const formattedComponents = registryComponents.map(comp => ({
          id: comp.componentType,
          name: comp.componentName || comp.componentType.replace(/([A-Z])/g, " $1").trim(),
          description: comp.description,
          icon: comp.icon,
          componentType: comp.componentType,
          componentName: comp.componentName,
          category: comp.category,
          hasEnhancedSchema: !!comp.defaultData, // Has enhanced schema if it has default data
          schema: comp.schema,
          defaultData: comp.defaultData,
          filePath: comp.filePath,
          pageType: comp.pageType,
          dataStructure: comp.dataStructure
        }));

        setAvailableComponents(formattedComponents);
        
        // Also try to load from the old componentMap as fallback
        const { idToPathMap } = await import("../componentMap");

        // Enhanced categorization function
        const categorizeComponent = (componentType, path) => {
          const lowerType = componentType.toLowerCase();
          const lowerPath = path.toLowerCase();

          // Hero components
          if (lowerType.includes("hero")) return "hero";

          // Layout components
          if (
            lowerType.includes("header") ||
            lowerType.includes("footer") ||
            lowerType.includes("navigation") ||
            lowerType.includes("nav") ||
            lowerType.includes("layout")
          )
            return "layout";

          // CTA components
          if (
            lowerType.includes("cta") ||
            lowerType.includes("calltoaction") ||
            lowerType.includes("contact") ||
            lowerType.includes("demo")
          )
            return "cta";

          // FAQ components
          if (lowerType.includes("faq") || lowerType.includes("questions"))
            return "faq";

          // Pricing components
          if (
            lowerType.includes("pricing") ||
            lowerType.includes("price") ||
            lowerType.includes("plan") ||
            lowerType.includes("subscription")
          )
            return "pricing";

          // About/Team components
          if (
            lowerType.includes("about") ||
            lowerType.includes("team") ||
            lowerType.includes("member") ||
            lowerType.includes("staff") ||
            lowerPath.includes("about/")
          )
            return "about";

          // Features/Benefits components
          if (
            lowerType.includes("feature") ||
            lowerType.includes("benefit") ||
            lowerType.includes("advantage")
          )
            return "features";

          // Testimonials/Reviews
          if (
            lowerType.includes("testimonial") ||
            lowerType.includes("review") ||
            lowerType.includes("feedback")
          )
            return "testimonials";

          // Solution components
          if (lowerPath.includes("solution/") || lowerType.includes("solution"))
            return "solution";

          // Services components
          if (lowerPath.includes("services/") || lowerType.includes("service"))
            return "services";

          // Industry components
          if (
            lowerPath.includes("industries/") ||
            lowerType.includes("industry")
          )
            return "industry";

          // Portfolio/Gallery
          if (
            lowerType.includes("portfolio") ||
            lowerType.includes("gallery") ||
            lowerType.includes("showcase")
          )
            return "portfolio";

          // Blog/News
          if (
            lowerType.includes("blog") ||
            lowerType.includes("news") ||
            lowerType.includes("article")
          )
            return "blog";

          // Default to content
          return "content";
        };

        // Enhanced icon assignment
        const getComponentIcon = (componentType, category) => {
          const lowerType = componentType.toLowerCase();

          if (lowerType.includes("hero")) return "🌟";
          if (lowerType.includes("cta")) return "🚀";
          if (lowerType.includes("faq")) return "❓";
          if (lowerType.includes("pricing")) return "💰";
          if (lowerType.includes("team") || lowerType.includes("about"))
            return "👥";
          if (lowerType.includes("testimonial")) return "💬";
          if (lowerType.includes("feature")) return "✨";
          if (lowerType.includes("contact")) return "📞";
          if (lowerType.includes("service")) return "🔧";
          if (lowerType.includes("solution")) return "⚡";
          if (lowerType.includes("portfolio")) return "🎨";
          if (lowerType.includes("blog")) return "📰";
          if (lowerType.includes("header") || lowerType.includes("nav"))
            return "📋";
          if (lowerType.includes("footer")) return "🔗";

          // Category-based fallbacks
          const categoryIcons = {
            hero: "🌟",
            layout: "🎯",
            content: "📝",
            pricing: "💰",
            faq: "❓",
            cta: "🚀",
            about: "👥",
            solution: "⚡",
            services: "🔧",
            industry: "🏭",
            features: "✨",
            testimonials: "💬",
            contact: "📞",
            team: "👥",
            portfolio: "🎨",
            blog: "📰",
            footer: "🔗",
            header: "📋",
          };

          return categoryIcons[category] || "📄";
        };

        // Get additional components from componentMap that aren't in registry
        const registryComponentTypes = new Set(formattedComponents.map(c => c.componentType));
        const additionalItems = Object.keys(idToPathMap)
          .filter(componentType => !registryComponentTypes.has(componentType))
          .map((componentType) => {
          const path = idToPathMap[componentType];
          const category = categorizeComponent(componentType, path);
          const icon = getComponentIcon(componentType, category);

          // Check if this is an About component with enhanced schema
          const aboutSchema = getAboutComponentSchema(componentType);
          if (aboutSchema) {
            return {
              id: componentType,
              name: aboutSchema.displayName,
              description: aboutSchema.description,
              icon: aboutSchema.icon,
              componentType,
              componentName: aboutSchema.componentName,
              category: aboutSchema.category,
              hasEnhancedSchema: true,
              schema: aboutSchema.schema,
              defaultData: aboutSchema.defaultData,
            };
          }

          // Check if this is a general component with enhanced schema
          const generalSchema = getGeneralComponentSchema(componentType);
          if (generalSchema) {
            return {
              id: componentType,
              name: generalSchema.displayName,
              description: generalSchema.description,
              icon: generalSchema.icon,
              componentType,
              componentName: generalSchema.componentName,
              category: generalSchema.category,
              hasEnhancedSchema: true,
              schema: generalSchema.schema,
              defaultData: generalSchema.defaultData,
            };
          }

          return {
            id: componentType,
            name: componentType.replace(/([A-Z])/g, " $1").trim(), // Add spaces before capital letters
            description: `Component: ${componentType}`,
            icon,
            componentType,
            componentName: componentType,
            category,
            hasEnhancedSchema: false,
          };
        });

        // Combine registry components with additional components
        const allComponents = [...formattedComponents, ...additionalItems];
        
        console.log("📦 [COMPONENT REGISTRY] Final component list:", {
          registryComponents: formattedComponents.length,
          additionalComponents: additionalItems.length,
          totalComponents: allComponents.length
        });

        setAvailableComponents(allComponents);
      } catch (e) {
        console.error("Failed to load component registry", e);
      }
    };
    loadRegistry();
  }, []);

  // Load About component schemas for enhanced form generation
  useEffect(() => {
    const loadSchemas = async () => {
      try {
        const schemas = {};
        
        // Pre-load schemas for all About components
        const aboutComponents = [
          'AboutMissionSection', 'AboutTeamSection', 'AboutValuesSection',
          'AboutJourneySection', 'AboutMilestonesSection', 'AboutDifferentiatorsSection', 
          'AboutCTASection', 'AboutHeroSection'
        ];
        
        aboutComponents.forEach(compType => {
          try {
            schemas[compType] = getAboutComponentSchema(compType);
          } catch (error) {
            console.warn(`⚠️ [SCHEMA LOAD] Failed to load schema for ${compType}:`, error);
          }
        });

        // Pre-load schemas for general components
        const generalComponents = [
          'PayrollHeroSection', 'PayrollHowItWorksSection', 'PayrollWorkflowSection',
          'PayrollStepperSection', 'PayrollPainPointsSection', 'PayrollFAQSection', 'PayrollCTASection',
          'HRHeroSection', 'HRModulesSection', 'HRBenefitsSection', 'HRUseCasesSection',
          'HRPricingSection', 'HRFAQSection', 'HRCTASection'
        ];
        
        generalComponents.forEach(compType => {
          try {
            schemas[compType] = getGeneralComponentSchema(compType);
          } catch (error) {
            console.warn(`⚠️ [SCHEMA LOAD] Failed to load general schema for ${compType}:`, error);
          }
        });
        
        setComponentSchemas(schemas);
        console.log("✅ [SCHEMAS LOADED] Available schemas:", Object.keys(schemas));
      } catch (error) {
        console.error("❌ [SCHEMA LOAD ERROR] Failed to load component schemas:", error);
      }
    };
    
    loadSchemas();
  }, []);

  // UI State
  const [editingComponent, setEditingComponent] = useState(null);
  const [showSectionEditor, setShowSectionEditor] = useState(false);
  const [showPagePreview, setShowPagePreview] = useState(false);
  const [componentSchemas, setComponentSchemas] = useState({});

  const steps = [
    { id: 1, title: "Category", description: "Choose a category for the page" },
    { id: 2, title: "Page Details", description: "Basic page information" },
    {
      id: 3,
      title: "Add Sections",
      description: "Choose and configure sections",
    },
    {
      id: 4,
      title: "Review & Publish",
      description: "Final review and publish",
    },
  ];

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  // Utility function to generate slug from name
  const generateSlugFromName = (name) => {
    if (!name || typeof name !== "string") return "untitled-page";

    let slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    // Remove leading/trailing hyphens
    slug = slug.replace(/^-+|-+$/g, "");

    return slug || "untitled-page";
  };

  // Utility function to apply default values to page data
  const applyDefaultValues = (data, status = "draft") => {
    const defaultName = "Untitled Page";
    const name = data.name?.trim() || defaultName;
    const slug = data.slug?.trim() || generateSlugFromName(name);

    return {
      name: name,
      categoryId: data.categoryId ?? 1,
      slug: slug,
      metaTitle: data.metaTitle?.trim() || "",
      metaDescription: data.metaDescription?.trim() || "",
      isHomepage: data.isHomepage ?? false,
      isPublished: status === "published",
      components:
        data.components?.map((component, index) => {
          // Create the component object with proper content handling
          const processedComponent = {
            id: component.id, // Add the component ID from API
            componentType: component.componentType || "Generic",
            componentName: component.componentName || "New Component",
            orderIndex: component.orderIndex ?? index + 1, // Use API orderIndex or auto-generate
            isVisible: component.isVisible ?? true, // Default to visible (boolean from API)
            theme: component.theme ?? 1, // Default to light theme (1=light, 2=dark from API)
          };

          // Handle contentJson string conversion for API
          console.log(`🔍 Processing component ${index + 1}:`, {
            componentType: component.componentType,
            originalContentJson: component.contentJson,
            contentJsonType: typeof component.contentJson,
          });

          if (
            component.contentJson &&
            typeof component.contentJson === "string"
          ) {
            try {
              // Parse and validate JSON before sending
              const parsedContent = JSON.parse(component.contentJson);
              processedComponent.content = parsedContent;
              console.log(
                `✅ Successfully parsed contentJson for component ${
                  index + 1
                }:`,
                parsedContent
              );
            } catch (error) {
              console.error(
                `❌ Invalid JSON in component ${index + 1}:`,
                error.message
              );
              // If invalid JSON, create empty object
              processedComponent.content = {};
            }
          } else if (
            component.content &&
            typeof component.content === "object"
          ) {
            processedComponent.content = component.content;
            console.log(
              `📋 Using existing content object for component ${index + 1}:`,
              component.content
            );
          } else {
            processedComponent.content = {};
            console.log(`🆕 Creating empty content for component ${index + 1}`);
          }

          console.log(
            `💾 Final processed component ${index + 1}:`,
            processedComponent
          );

          return processedComponent;
        }) || [],
    };
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePageDataChange = (field, value) => {
    // Handle slug input specially
    if (field === "slug") {
      // Only allow alphanumeric characters, dashes, and lowercase letters
      if (value === "" || /^[a-z0-9-]*$/.test(value)) {
        setPageData((prev) => ({
          ...prev,
          slug: value,
        }));
      } else {
        showToast(
          "Slug must only contain lowercase letters, numbers, and dashes.",
          "error"
        );
      }
    } else {
      setPageData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    // Auto-generate slug from name
    if (field === "name" && !pageData.slug) {
      // Generate slug properly handling special cases
      let slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

      // Remove leading/trailing hyphens
      slug = slug.replace(/^-+|-+$/g, "");

      setPageData((prev) => ({ ...prev, slug }));
    }
  };

  const addComponent = async (component) => {
    const MAX_RETRIES = 3;
    const tempId = `temp-${Date.now()}`;

    try {
      setLoading(true);

      // Always use schema-based default data for consistent pre-filling
      let defaultContent = getDefaultDataForComponent(component.componentType);
      
      // For About components, also check schema-based defaults
      if (component.componentType.includes("About")) {
        const componentSchema = getAboutComponentSchema(component.componentType);
        if (componentSchema && componentSchema.defaultData) {
          defaultContent = {
            ...defaultContent,
            ...componentSchema.defaultData
          };
          console.log(`📋 [SCHEMA DEFAULT] Using schema defaults for ${component.componentType}:`, componentSchema.defaultData);
        }
      }

      console.log(
        `🆕 [ADD COMPONENT] Adding ${component.componentType} with default data:`,
        defaultContent
      );

      // If we're editing an existing page (have pageId), fetch latest components
      let nextOrderIndex;
      if (pageData.id) {
        console.log(
          "🔄 [ADD COMPONENT] Fetching latest components for existing page:",
          pageData.id
        );
        const latestComponents = await pagesAPI.getPageComponents(pageData.id);
        const maxOrderIndex = latestComponents.length
          ? Math.max(...latestComponents.map((c) => c.orderIndex ?? 0))
          : -1;
        nextOrderIndex = maxOrderIndex + 1;

        console.log(
          "🆕 [ADD COMPONENT] Calculated nextOrderIndex:",
          nextOrderIndex,
          "from",
          latestComponents.length,
          "existing components"
        );
      } else {
        // For new pages, use local component count
        nextOrderIndex = pageData.components.length + 1;
        console.log(
          "🆕 [ADD COMPONENT] Using local nextOrderIndex for new page:",
          nextOrderIndex
        );
      }

      const newComponent = {
        id: tempId,
        componentType: component.componentType || "Generic",
        componentName: component.componentName || "New Component",
        contentJson: JSON.stringify(defaultContent, null, 2),
        orderIndex: nextOrderIndex,
        isVisible: true, // Use boolean for API compatibility
        theme: 1, // 1 = light, 2 = dark
        pending: !pageData.id, // Mark as pending only if it's a new page
      };

      // Add to local state immediately (optimistic update)
      setPageData((prev) => ({
        ...prev,
        components: [...prev.components, newComponent],
      }));

      // If this is an existing page, create the component via API
      if (pageData.id) {
        let created = null;
        let attempt = 0;

        while (attempt < MAX_RETRIES && !created) {
          try {
            const payload = {
              pageId: pageData.id,
              componentType: newComponent.componentType,
              componentName: newComponent.componentName,
              contentJson: newComponent.contentJson,
              orderIndex: nextOrderIndex,
              isVisible: newComponent.isVisible,
              theme: newComponent.theme,
            };

            console.log(
              `🚀 [ADD COMPONENT] Attempt ${
                attempt + 1
              }/${MAX_RETRIES} with payload:`,
              payload
            );

            created = await pagesAPI.createPageComponent(pageData.id, payload);

            // Replace temp component with real component
            setPageData((prev) => ({
              ...prev,
              components: prev.components.map((comp) =>
                comp.id === tempId ? created : comp
              ),
            }));

            console.log(
              "✅ [ADD COMPONENT] Successfully created component:",
              created
            );
          } catch (err) {
            const errorMessage =
              err.response?.data?.message ||
              err.message ||
              JSON.stringify(err.response?.data);
            const isDuplicateKey =
              errorMessage?.includes("IX_PageComponents_PageId_OrderIndex") ||
              errorMessage?.includes("duplicate key") ||
              err.response?.data?.errorCode === 2601;

            console.error(`❌ [ADD COMPONENT] Attempt ${attempt + 1} failed:`, {
              error: errorMessage,
              isDuplicateKey,
              nextOrderIndex,
              response: err.response?.data,
            });

            if (isDuplicateKey && attempt < MAX_RETRIES - 1) {
              console.warn(
                "🔄 [RETRY] Duplicate order index detected, refetching components..."
              );

              // Refetch latest components and recalculate order index
              const refreshedComponents = await pagesAPI.getPageComponents(
                pageData.id
              );
              const refreshedMax = refreshedComponents.length
                ? Math.max(...refreshedComponents.map((c) => c.orderIndex ?? 0))
                : -1;
              nextOrderIndex = refreshedMax + 1;

              console.log(
                "🔄 [RETRY] Recalculated nextOrderIndex:",
                nextOrderIndex
              );
              attempt++;
              continue;
            } else {
              throw err;
            }
          }
        }

        if (!created) {
          // Remove temp component if all retries failed
          setPageData((prev) => ({
            ...prev,
            components: prev.components.filter((comp) => comp.id !== tempId),
          }));

          showToast(
            "Unable to add component after multiple attempts. Please try again.",
            "error"
          );
          return;
        }
      }

      showToast(
        (component.componentName || component.name || "Component") +
          " added to page",
        "success"
      );
    } catch (error) {
      console.error("❌ [ADD COMPONENT] Final error:", error);

      // Remove temp component on error
      setPageData((prev) => ({
        ...prev,
        components: prev.components.filter((comp) => comp.id !== tempId),
      }));

      const errorMessage = error.response?.data?.message || error.message;
      showToast(`Error adding component: ${errorMessage}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // Function to update a specific component field
  const updateComponent = (index, field, value) => {
    console.log("🔄 [REALTIME UPDATE] Component:", index, "Field:", field, "Value:", value);
    console.log("🔄 [REALTIME UPDATE] Context:", {
      componentType: pageData.components[index]?.componentType,
      currentContentJson: pageData.components[index]?.contentJson,
      fieldType: typeof value,
      isAboutMissionSection: pageData.components[index]?.componentType === 'AboutMissionSection'
    });

    // Special debugging for AboutMissionSection
    if (pageData.components[index]?.componentType === 'AboutMissionSection') {
      console.log("🎯 [AboutMissionSection REALTIME] Field update:", {
        field,
        value,
        valueType: typeof value,
        isArray: Array.isArray(value),
        currentData: (() => {
          try {
            return JSON.parse(pageData.components[index]?.contentJson || '{}');
          } catch (e) {
            return { parseError: e.message };
          }
        })()
      });
    }

    // Special handling for image fields
    if (field === "image" || field === "contentJson") {
      console.log("🖼️ [IMAGE FLOW] Image change detected:", {
        componentIndex: index,
        componentType: pageData.components[index]?.componentType,
        field: field,
        value:
          field === "contentJson"
            ? (() => {
                try {
                  const parsed = JSON.parse(value);
                  return {
                    rawValue: value,
                    parsedValue: parsed,
                    imageInJson: parsed.image,
                    programsSectionImage: parsed.programsSection?.image,
                  };
                } catch (e) {
                  return { rawValue: value, parseError: e.message };
                }
              })()
            : value,
      });
    }

    setPageData((prev) => {
      const updatedComponents = [...prev.components];
      const currentComponent = updatedComponents[index];

      // Parse existing contentJson or create new
      let contentData = {};
      if (currentComponent.contentJson) {
        try {
          contentData = JSON.parse(currentComponent.contentJson);
        } catch (e) {
          console.error("❌ JSON Parse Error:", e);
        }
      }

      // Update the specific field in contentData
      if (field === "contentJson") {
        // Direct JSON update
        updatedComponents[index] = {
          ...currentComponent,
          contentJson: value,
        };
        
        // Trigger debounced auto-save for contentJson updates
        try {
          const parsedData = JSON.parse(value);
          debouncedAutoSave(index, parsedData);
        } catch (e) {
          console.warn("⚠️ [AUTO-SAVE] Invalid JSON, skipping auto-save:", e);
        }
      } else if (
        field === "isVisible" ||
        field === "theme" ||
        field === "componentType" ||
        field === "componentName" ||
        field === "orderIndex"
      ) {
        // Update component-level fields directly (not in contentJson)
        updatedComponents[index] = {
          ...currentComponent,
          [field]: value,
        };
      } else {
        // Update specific field in content JSON
        const updatedContentData = {
          ...contentData,
          [field]: value,
        };

        updatedComponents[index] = {
          ...currentComponent,
          contentJson: JSON.stringify(updatedContentData, null, 2),
        };
      }

      // Additional debugging for TrainingProgramsSection
      if (
        updatedComponents[index]?.componentType === "TrainingProgramsSection"
      ) {
        console.log("🖼️ [TRAINING PROGRAMS UPDATE] After update:", {
          componentType: updatedComponents[index].componentType,
          contentJson: updatedComponents[index].contentJson,
          parsedContentJson: (() => {
            try {
              return JSON.parse(updatedComponents[index].contentJson || "{}");
            } catch (e) {
              return { parseError: e.message };
            }
          })(),
        });
      }

      if (
        updatedComponents[index]?.componentType === "IntegrationTypesSection"
      ) {
        console.log("🔗 [INTEGRATION TYPES UPDATE] After update:", {
          componentType: updatedComponents[index].componentType,
          contentJson: updatedComponents[index].contentJson,
          parsedContentJson: (() => {
            try {
              return JSON.parse(updatedComponents[index].contentJson || "{}");
            } catch (e) {
              return { parseError: e.message };
            }
          })(),
        });
      }

      if (
        updatedComponents[index]?.componentType === "IntegrationBenefitsSection"
      ) {
        console.log("🔗 [INTEGRATION BENEFITS UPDATE] After update:", {
          componentType: updatedComponents[index].componentType,
          contentJson: updatedComponents[index].contentJson,
          parsedContentJson: (() => {
            try {
              return JSON.parse(updatedComponents[index].contentJson || "{}");
            } catch (e) {
              return { parseError: e.message };
            }
          })(),
        });
      }

      if (
        updatedComponents[index]?.componentType ===
        "ManufacturingChallengesSection"
      ) {
        console.log("🏭 [MANUFACTURING CHALLENGES UPDATE] After update:", {
          componentType: updatedComponents[index].componentType,
          contentJson: updatedComponents[index].contentJson,
          parsedContentJson: (() => {
            try {
              return JSON.parse(updatedComponents[index].contentJson || "{}");
            } catch (e) {
              return { parseError: e.message };
            }
          })(),
        });
      }

      if (
        updatedComponents[index]?.componentType ===
        "CustomizationServicesSection"
      ) {
        console.log("🔧 [CUSTOMIZATION SERVICES UPDATE] After update:", {
          componentType: updatedComponents[index].componentType,
          contentJson: updatedComponents[index].contentJson,
          parsedContentJson: (() => {
            try {
              return JSON.parse(updatedComponents[index].contentJson || "{}");
            } catch (e) {
              return { parseError: e.message };
            }
          })(),
        });
      }

      if (
        updatedComponents[index]?.componentType ===
        "CustomizationProcessSection"
      ) {
        console.log("🔧 [CUSTOMIZATION PROCESS UPDATE] After update:", {
          componentType: updatedComponents[index].componentType,
          contentJson: updatedComponents[index].contentJson,
          parsedContentJson: (() => {
            try {
              return JSON.parse(updatedComponents[index].contentJson || "{}");
            } catch (e) {
              return { parseError: e.message };
            }
          })(),
        });
      }

      if (
        updatedComponents[index]?.componentType === "ManufacturingHeroSection"
      ) {
        console.log("✅ [MANUFACTURING UPDATE COMPLETE]", {
          newContentJson: updatedComponents[index].contentJson,
          parsed: updatedComponents[index].contentJson
            ? JSON.parse(updatedComponents[index].contentJson)
            : {},
        });
      }

      if (
        updatedComponents[index]?.componentType ===
        "ManufacturingChallengesSection"
      ) {
        console.log("🏭 [MANUFACTURING CHALLENGES UPDATE] After update:", {
          componentType: updatedComponents[index].componentType,
          contentJson: updatedComponents[index].contentJson,
          parsedContentJson: (() => {
            try {
              return JSON.parse(updatedComponents[index].contentJson || "{}");
            } catch (e) {
              return { parseError: e.message };
            }
          })(),
        });
      }

      if (
        updatedComponents[index]?.componentType ===
        "ManufacturingSolutionsSection"
      ) {
        console.log("🏭 [MANUFACTURING SOLUTIONS UPDATE] After update:", {
          componentType: updatedComponents[index].componentType,
          contentJson: updatedComponents[index].contentJson,
          parsedContentJson: (() => {
            try {
              return JSON.parse(updatedComponents[index].contentJson || "{}");
            } catch (e) {
              return { parseError: e.message };
            }
          })(),
        });
      }

      if (
        updatedComponents[index]?.componentType ===
        "ManufacturingIndustryStatsSection"
      ) {
        console.log("🏭 [MANUFACTURING STATS UPDATE] After update:", {
          componentType: updatedComponents[index].componentType,
          contentJson: updatedComponents[index].contentJson,
          parsedContentJson: (() => {
            try {
              return JSON.parse(updatedComponents[index].contentJson || "{}");
            } catch (e) {
              return { parseError: e.message };
            }
          })(),
        });
      }

      // About Components Debug Logging
      if (updatedComponents[index]?.componentType?.includes("About")) {
        console.log("🏢 [ABOUT COMPONENT UPDATE] Real-time update:", {
          componentType: updatedComponents[index].componentType,
          field: field,
          value: field === "contentJson" ? "JSON Object" : value,
          contentJson: updatedComponents[index].contentJson,
          parsedContentJson: (() => {
            try {
              return JSON.parse(updatedComponents[index].contentJson || "{}");
            } catch (e) {
              return { parseError: e.message };
            }
          })(),
          timestamp: new Date().toISOString()
        });
      }

      console.log("🔄 [PAGE DATA UPDATE] Updating pageData:", {
        componentIndex: index,
        componentType: updatedComponents[index]?.componentType,
        field: field,
        value: field === "contentJson" ? "JSON Object" : value,
        contentJson: updatedComponents[index]?.contentJson,
        totalComponents: updatedComponents.length
      });

      return {
        ...prev,
        components: updatedComponents,
      };
    });

    // Make API call to persist changes for isVisible, theme, contentJson, and other component-level fields
    if (
      field === "isVisible" ||
      field === "theme" ||
      field === "componentType" ||
      field === "componentName" ||
      field === "orderIndex" ||
      field === "contentJson"
    ) {
      const component = pageData.components[index];
      if (component?.id && pageData.id) {
        // Prepare the complete component data structure as expected by the API
        const updateData = {
          id: component.id,
          pageId: pageData.id, // Include the page ID from state
          componentType: component.componentType,
          componentName: component.componentName || "",
          contentJson:
            field === "contentJson"
              ? value
              : component.contentJson || JSON.stringify({}),
          orderIndex:
            component.orderIndex !== undefined ? component.orderIndex : index,
          isVisible:
            field === "isVisible"
              ? Boolean(value)
              : Boolean(
                  component.isVisible === true || component.isVisible === 1
                ),
          theme:
            field === "theme"
              ? value === 1
                ? 1
                : 2
              : component.theme === 1
              ? 1
              : 2, // Convert to ThemeMode enum: 1=light, 2=dark
        };

        console.log(
          `🔄 [API SYNC] Updating component ${component.id} field "${field}":`,
          {
            componentId: component.id,
            field,
            value,
            updateData,
          }
        );

        // Make async API call (don't await to keep UI responsive)
        pagesAPI
          .updatePageComponent(component.id, updateData)
          .then(() => {
            console.log(
              `✅ [API SYNC] Component ${component.id} updated successfully with full data:`,
              updateData
            );
            showToast(`${field} updated successfully`, "success");
          })
          .catch((error) => {
            console.error(
              `❌ [API SYNC] Failed to update component ${component.id}:`,
              error,
              "Request data:",
              updateData
            );
            showToast(`Failed to update ${field}: ${error.message}`, "error");

            // Revert the local change on API failure
            setPageData((prevData) => {
              const revertedComponents = [...prevData.components];
              const originalComponent = component; // Store the original component state before update

              if (field === "isVisible") {
                revertedComponents[index] = {
                  ...revertedComponents[index],
                  isVisible: !value, // Revert to opposite of the attempted value
                };
              } else if (field === "theme") {
                revertedComponents[index] = {
                  ...revertedComponents[index],
                  theme: value === 1 ? 2 : 1, // Revert to opposite of the attempted value
                };
              } else {
                // For other fields (contentJson, componentType, etc.), revert to original value
                revertedComponents[index] = {
                  ...revertedComponents[index],
                  [field]: originalComponent[field], // Revert to original value
                };
              }
              return {
                ...prevData,
                components: revertedComponents,
              };
            });
          });
      } else {
        // Component doesn't have an ID yet (new component) or no page ID available
        console.log(
          `⚠️ [API SYNC] Skipping API update for component without ID:`,
          {
            componentId: component?.id,
            pageId: pageData.id,
            field,
            value,
            reason: !component?.id
              ? "Component not saved to database yet"
              : "No page ID available",
          }
        );
      }
    }

    // Immediate API sync for critical AboutMissionSection fields (real-time synchronization)
    if (pageData.components[index]?.componentType === 'AboutMissionSection' && 
        (field === 'title' || field === 'description' || field === 'vision' || field === 'subtitle')) {
      const component = pageData.components[index];
      if (component?.id && pageData.id) {
        console.log("🚀 [IMMEDIATE SYNC] Critical AboutMissionSection field update:", {
          field, 
          value, 
          componentId: component.id
        });

        const currentContentData = (() => {
          try {
            return JSON.parse(component.contentJson || '{}');
          } catch {
            return {};
          }
        })();

        const updateData = {
          id: component.id,
          pageId: pageData.id,
          componentType: component.componentType,
          componentName: component.componentName || "",
          contentJson: JSON.stringify({
            ...currentContentData,
            [field]: value
          }, null, 2),
          orderIndex: component.orderIndex !== undefined ? component.orderIndex : index,
          isVisible: Boolean(component.isVisible === true || component.isVisible === 1),
          theme: component.theme === 1 ? 1 : 2,
        };

        pagesAPI.updatePageComponent(component.id, updateData)
          .then(() => console.log("✅ [IMMEDIATE SYNC] AboutMissionSection field updated:", field))
          .catch(error => console.error("❌ [IMMEDIATE SYNC] Failed:", error));
      }
    }
  };

  const getDefaultDataForComponent = (componentType) => {
    const defaultData = {
      // Hero Sections
      HeroSection: {
        title: "Welcome to Our Services",
        subtitle: "Professional solutions for your business",
        description: "Transform your business with our expert services",
        ctaButton: {
          text: "Get Started",
          link: "/contact",
          variant: validateVariant("primary"),
        },
        backgroundImage: "/images/HeroSection.png",
      },

      PayrollHeroSection: {
        title: "Automated Payroll Solutions",
        subtitle: "Simplify payroll processing with our advanced system",
        description:
          "Reduce errors and save time with automated payroll management",
        ctaButton: {
          text: "Get Started",
          link: "/payroll",
          variant: validateVariant("primary"),
        },
        backgroundImage: "/images/payrollHeroSection.jpg",
      },

      HRHeroSection: {
        titleParts: ["HR Management", "Made Simple"],
        description:
          "Streamline your human resources with our comprehensive HR solutions",
        ctaButton: {
          text: "Learn More",
          link: "/hr",
          variant: validateVariant("primary"),
        },
        backgroundVideo: "/Videos/hrVideo.mp4",
      },

      ImplementationHeroSection: {
        title: "Implementation Services",
        subtitle: "Seamless deployments by experts",
        description: "We plan, configure, and launch with zero downtime",
        backgroundImage: "/images/impleHeroSection.png",
        ctaButton: {
          text: "Talk to an expert",
          link: "/contact",
          variant: "primary", // Make sure this is a string, not validateVariant result
          icon: "M13 7l5 5m0 0l-5 5m5-5H6",
        },
      },

      TrainingHeroSection: {
        heroContent: {
          title: "Professional Training Programs",
          description:
            "Empower your team with comprehensive training solutions designed to enhance skills and drive success",
        },
        backgroundVideo: "/trainingHeroSectionTwo.mp4",
        // ADD: CTA button data
        ctaButton: {
          text: "Start Learning Today",
          link: "/training",
          variant: "primary",
        },
      },

      IntegrationHeroSection: {
        title: "Integration Services",
        subtitle: "Connect your ecosystem",
        description: "APIs, middleware, and data pipelines",
      },

      CustomizationHeroSection: {
        title: "Customization Services",
        subtitle: "Tailor the system to your business",
        description: "Workflows, scripts, and UI personalization",
      },

      ManufacturingHeroSection: {
        title: "Manufacturing Solutions",
        subtitle: "Streamline your manufacturing operations",
        description:
          "Comprehensive NetSuite solutions for manufacturing businesses",
        backgroundImage: "/images/manufacturing-hero.jpg",
        backgroundVideo: "",
        ctaButton: {
          text: "Learn More",
          link: "/manufacturing",
          variant: validateVariant("primary"),
        },
      },

      RetailHeroSection: {
        title: "Retail Solutions",
        subtitle: "Transform your retail business",
        description: "Complete retail management solutions with NetSuite",
        ctaButton: {
          text: "Discover More",
          link: "/retail",
          variant: validateVariant("primary"),
        },
      },

      AboutHeroSection: {
        title: "About Bellatrix",
        subtitle: "Your trusted partner in digital transformation",
        description:
          "We are a leading consultancy firm specializing in NetSuite implementations, business process optimization, and technology solutions that drive growth and efficiency.",
        backgroundVideo: "/Videos/about-hero.mp4",
        stats: [
          { value: "500+", label: "Projects Completed" },
          { value: "15+", label: "Years Experience" },
          { value: "98%", label: "Client Satisfaction" },
          { value: "200+", label: "Happy Clients" },
        ],
      },
      // Payroll Sections
      PayrollHowItWorksSection: {
        title: "How Payroll Works",
        subtitle: "Simple, automated payroll processing",
        description:
          "Our streamlined process ensures accurate and timely payroll management",
        steps: [
          {
            title: "Data Collection",
            description: "Gather employee hours and salary data",
            icon: "📊",
          },
          {
            title: "Processing",
            description: "Calculate wages, taxes, and deductions",
            icon: "⚙️",
          },
          {
            title: "Approval",
            description: "Review and approve payroll",
            icon: "✅",
          },
          {
            title: "Payment",
            description: "Distribute payments to employees",
            icon: "💰",
          },
        ],
      },

      PayrollWorkflowSection: {
        title: "Payroll Workflow",
        subtitle: "Automated workflow management",
        description: "Streamlined processes for efficient payroll management",
        workflow: [
          {
            step: "Input",
            description: "Employee data entry",
            duration: "5 min",
          },
          {
            step: "Calculate",
            description: "Automatic calculations",
            duration: "2 min",
          },
          {
            step: "Review",
            description: "Manager approval",
            duration: "10 min",
          },
          {
            step: "Pay",
            description: "Payment processing",
            duration: "1 min",
          },
        ],
      },

      PayrollStepperSection: {
        title: "Payroll Process Steps",
        steps: [
          {
            title: "Setup",
            description: "Configure payroll settings",
            completed: true,
          },
          {
            title: "Input",
            description: "Enter employee data",
            completed: true,
          },
          {
            title: "Process",
            description: "Calculate payroll",
            completed: false,
          },
          {
            title: "Pay",
            description: "Distribute payments",
            completed: false,
          },
        ],
      },

      PayrollPainPointsSection: {
        title: "Common Payroll Pain Points",
        subtitle: "Problems we solve",
        painPoints: [
          {
            title: "Manual Calculations",
            description: "Time-consuming and error-prone manual processes",
            impact: "High",
          },
          {
            title: "Compliance Issues",
            description: "Difficulty staying compliant with regulations",
            impact: "High",
          },
          {
            title: "Late Payments",
            description: "Delays in processing payroll",
            impact: "Medium",
          },
        ],
      },

      PayrollFAQSection: {
        title: "Payroll FAQ",
        subtitle: "Frequently asked questions",
        faqs: [
          {
            question: "How often can I run payroll?",
            answer:
              "You can run payroll as often as needed - weekly, bi-weekly, or monthly.",
          },
          {
            question: "Can I handle multiple pay rates?",
            answer:
              "Yes, our system supports multiple pay rates and overtime calculations.",
          },
          {
            question: "Is tax calculation automatic?",
            answer:
              "Yes, all federal, state, and local taxes are calculated automatically.",
          },
        ],
      },

      PayrollCTASection: {
        title: "Ready to Simplify Your Payroll?",
        subtitle: "Get started with automated payroll today",
        description: "Join thousands of businesses using our payroll solutions",
        ctaButton: {
          text: "Start Free Trial",
          link: "/payroll/trial",
          variant: validateVariant("primary"),
        },
      },

      // HR Sections
      HRModulesSection: {
        title: "HR Modules",
        subtitle: "Comprehensive HR management tools",
        description: "Everything you need to manage your workforce effectively",
        features: [
          {
            title: "Employee Management",
            description: "Complete employee lifecycle management",
            icon: "👥",
          },
          {
            title: "Time Tracking",
            description: "Accurate time and attendance tracking",
            icon: "⏰",
          },
          {
            title: "Performance Reviews",
            description: "Streamlined performance evaluation process",
            icon: "📊",
          },
          {
            title: "Benefits Administration",
            description: "Manage employee benefits and enrollment",
            icon: "🎁",
          },
        ],
      },
      HRBenefitsSection: {
        title: "HR Benefits",
        subtitle: "Why choose our HR solutions",
        benefits: [
          {
            title: "Reduced Administrative Burden",
            description: "Automate routine HR tasks",
            icon: "⚡",
          },
          {
            title: "Improved Compliance",
            description: "Stay compliant with labor laws",
            icon: "📋",
          },
          {
            title: "Better Employee Experience",
            description: "Self-service portal for employees",
            icon: "😊",
          },
        ],
      },

      HRUseCasesSection: {
        title: "HR Use Cases",
        subtitle: "Real-world applications",
        useCases: [
          {
            title: "Small Business",
            description: "Perfect for businesses with 10-100 employees",
            features: ["Basic HR", "Time tracking", "Simple reporting"],
          },
          {
            title: "Enterprise",
            description: "Comprehensive solution for large organizations",
            features: [
              "Advanced analytics",
              "Multi-location support",
              "Custom workflows",
            ],
          },
        ],
      },

      HRPricingSection: {
        title: "HR Pricing",
        subtitle: "Choose your plan",
        plans: [
          {
            name: "Starter",
            price: "$29",
            period: "per employee/month",
            features: ["Basic HR", "Time tracking", "Email support"],
            cta: "Get Started",
          },
          {
            name: "Professional",
            price: "$49",
            period: "per employee/month",
            features: ["Advanced HR", "Analytics", "Phone support"],
            cta: "Get Started",
            popular: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            period: "pricing",
            features: [
              "Full features",
              "Custom integration",
              "Dedicated support",
            ],
            cta: "Contact Sales",
          },
        ],
      },

      HRFAQSection: {
        title: "HR FAQ",
        subtitle: "Common questions about our HR solutions",
        faqs: [
          {
            question: "Can I integrate with existing systems?",
            answer:
              "Yes, we offer comprehensive integration capabilities with most HR and payroll systems.",
          },
          {
            question: "Is training included?",
            answer:
              "Yes, we provide comprehensive training for all users at no additional cost.",
          },
          {
            question: "What about data security?",
            answer:
              "We use enterprise-grade security with encryption and regular backups.",
          },
        ],
      },

      HRCTASection: {
        title: "Transform Your HR Today",
        subtitle: "Start your HR transformation journey",
        description: "Join leading companies using our HR solutions",
        ctaButton: {
          text: "Schedule Demo",
          link: "/hr/demo",
          variant: validateVariant("primary"),
        },
      },

      // Implementation Sections
      ImplementationProcessSection: {
        title: "Implementation Process",
        subtitle: "Our proven methodology",
        description: "A structured approach to successful implementation",
        phases: [
          {
            title: "Discovery",
            description: "Understand your business requirements",
            duration: "1-2 weeks",
            deliverables: ["Requirements document", "Solution design"],
          },
          {
            title: "Configuration",
            description: "Set up and configure your system",
            duration: "2-4 weeks",
            deliverables: ["Configured system", "Test data"],
          },
          {
            title: "Testing",
            description: "Comprehensive testing and validation",
            duration: "1-2 weeks",
            deliverables: ["Test results", "Issue resolution"],
          },
          {
            title: "Go-Live",
            description: "Launch and support",
            duration: "1 week",
            deliverables: ["Live system", "User training"],
          },
        ],
      },

      ImplementationWhyChooseSection: {
        title: "Why Choose Our Implementation",
        subtitle: "What sets us apart",
        points: [
          {
            title: "Certified Team",
            description: "Experienced consultants and PMs",
            icon: "🏆",
          },
          {
            title: "Proven Methodology",
            description: "Repeatable, predictable delivery",
            icon: "📋",
          },
          {
            title: "Post Go‑Live Support",
            description: "We stay with you after launch",
            icon: "🤝",
          },
          {
            title: "Industry Expertise",
            description: "Deep knowledge of your industry",
            icon: "🎯",
          },
        ],
      },

      ImplementationPricingSection: {
        title: "Implementation Pricing",
        subtitle: "Transparent pricing for all project sizes",
        plans: [
          {
            name: "Starter",
            price: "$4,900",
            duration: "2 weeks",
            includes: ["Discovery", "Basic config", "Training"],
            cta: "Get Quote",
          },
          {
            name: "Pro",
            price: "$12,900",
            duration: "6 weeks",
            includes: ["Workshops", "Advanced config", "Data migration"],
            cta: "Get Quote",
            popular: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            duration: "8+ weeks",
            includes: ["Full customization", "Integration", "Ongoing support"],
            cta: "Contact Sales",
          },
        ],
      },

      ImplementationCTASection: {
        title: "Ready for a Seamless NetSuite Implementation?",
        subtitle:
          "Transform your business operations with our expert NetSuite implementation services. Let's turn your vision into reality with proven methodologies and dedicated support.",
        description: "Get started with your NetSuite implementation today",
        ctaButton: {
          text: "Get Started Today",
          link: "/implementation/contact",
          variant: "primary", // Will be converted by validateVariant
        },
        // Also include alternative structures
        button: {
          text: "Get Started Today",
          link: "/implementation/contact",
          variant: "primary",
        },
        buttonText: "Get Started Today",
        buttonLink: "/implementation/contact",
        // ADD: Default features/cards data
        features: [
          {
            title: "Quick Response",
            description: "Get a detailed proposal within 24 hours",
            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
          },
          {
            title: "Proven Success",
            description: "99.9% implementation success rate",
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          },
          {
            title: "Expert Support",
            description: "Dedicated team of certified professionals",
            icon:
              "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
          },
        ],
      },

      // Service Grid
      ServiceGrid: {
        title: "Our Services",
        subtitle: "Professional solutions for your business",
        description: "Choose from our comprehensive range of services",
        services: [
          {
            name: "Consulting",
            description: "Expert business consulting services",
            icon: "💼",
            link: "/services/consulting",
          },
          {
            name: "Implementation",
            description: "Seamless system implementation",
            icon: "⚙️",
            link: "/services/implementation",
          },
          {
            name: "Training",
            description: "Comprehensive training programs",
            icon: "🎓",
            link: "/services/training",
          },
          {
            name: "Support",
            description: "Ongoing support and maintenance",
            icon: "🛠️",
            link: "/services/support",
          },
        ],
      },
      // Training Sections
      TrainingProgramsSection: {
        programsSection: {
          title: "Our Training Programs",
          description:
            "Comprehensive training solutions designed to empower your team with the skills they need to excel",
          image: "/images/training.jpg",
          Professional_Badge: "Certified Training",
        },
        trainingPrograms: {
          programs: [
            {
              id: 1,
              title: "NetSuite Fundamentals",
              shortDescription: "Core concepts and navigation basics",
              longDescription:
                "This comprehensive fundamentals program introduces you to the core concepts of NetSuite, covering essential navigation, basic configuration, and understanding the platform's architecture.",
              icon:
                "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
            },
            {
              id: 2,
              title: "Advanced Modules",
              shortDescription: "Financial management and reporting",
              longDescription:
                "Dive deep into NetSuite's advanced modules with focus on financial management, advanced reporting, and complex business processes.",
              icon:
                "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            },
          ],
        },
      },

      TrainingWhyChooseSection: {
        whyChooseSection: {
          title: "Why Choose Our Training?",
          description:
            "We provide world-class training solutions that combine expertise, innovation, and practical application to ensure your team's success",
          image: "/images/chooese.png",
          Professional_Badge: "Excellence Training",
        },
        trainingFeatures: [
          {
            id: 1,
            title: "Expert Instructors",
            shortDescription:
              "Certified professionals with years of experience",
            detailedDescription:
              "Our instructors are certified NetSuite professionals with extensive real-world experience across various industries.",
            benefits: [
              "Industry-proven expertise with 10+ years of NetSuite experience",
              "Multiple NetSuite certifications (Administrator, Developer, Consultant)",
              "Real-world implementation experience across 500+ projects",
            ],
            icon:
              "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
          },
          {
            id: 2,
            title: "Hands-on Learning",
            shortDescription: "Practical exercises with real-world scenarios",
            detailedDescription:
              "Our training methodology emphasizes practical, hands-on learning through real-world scenarios and interactive exercises.",
            benefits: [
              "Live NetSuite sandbox environments for each student",
              "Real business scenarios from actual client implementations",
              "Step-by-step guided exercises with immediate feedback",
            ],
            icon:
              "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
          },
        ],
      },

      TrainingKeyModulesSection: {
        keyModulesSection: {
          title: "Key Training Modules",
          description:
            "Comprehensive curriculum designed to master NetSuite from foundation to advanced implementation",
        },
        keyModules: [
          {
            title: "System Architecture",
            description:
              "Core system structure, data flow, and integration patterns",
            duration: "8 hours",
            icon:
              "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
          },
          {
            title: "Financial Management",
            description:
              "General ledger, budgeting, financial reporting, and analytics",
            duration: "12 hours",
            icon:
              "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
          },
        ],
      },

      TrainingCTASection: {
        title: "Ready to Start Your Training Journey?",
        subtitle: "Transform your skills with our expert-led programs",
        description:
          "Join thousands of professionals who have enhanced their capabilities through our training programs",
        ctaButton: {
          text: "Enroll Now",
          link: "/contact",
          variant: validateVariant("primary"),
        },
        features: [
          "Flexible scheduling",
          "Expert instructors",
          "Hands-on learning",
          "Industry certification",
        ],
        backgroundImage: "/images/TrainingWhy.jpg",
      },

      TrainingPricingSection: {
        title: "Training Program Pricing",
        subtitle: "Choose the perfect training plan for your team",
        description:
          "Flexible pricing options to fit your learning needs and budget",
        plans: [
          {
            name: "Individual",
            price: "$299",
            period: "per person",
            description: "Perfect for individual learners",
            features: [
              "Access to all modules",
              "Self-paced learning",
              "Certificate of completion",
              "Email support",
            ],
            cta: "Get Started",
            popular: false,
          },
          {
            name: "Team",
            price: "$199",
            period: "per person",
            description: "Ideal for small teams (5-20 people)",
            features: [
              "Group discounts",
              "Team progress tracking",
              "Dedicated support",
              "Custom scheduling",
            ],
            cta: "Get Started",
            popular: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            period: "pricing",
            description: "For large organizations",
            features: [
              "Unlimited participants",
              "Custom curriculum",
              "On-site training",
              "24/7 support",
              "Dedicated account manager",
            ],
            cta: "Contact Sales",
            popular: false,
          },
        ],
      },

      TrainingFAQSection: {
        title: "Training Frequently Asked Questions",
        subtitle: "Everything you need to know about our training programs",
        description:
          "Find answers to common questions about our training services",
        faqs: [
          {
            question: "What is the duration of each training program?",
            answer:
              "Our training programs range from 1-5 days depending on the complexity and depth of the subject matter. Each program is designed to provide comprehensive coverage while respecting your time constraints.",
          },
          {
            question: "Do you provide certificates upon completion?",
            answer:
              "Yes, we provide industry-recognized certificates upon successful completion of our training programs. These certificates demonstrate your proficiency in the covered topics.",
          },
          {
            question: "Can training be customized for our specific needs?",
            answer:
              "Absolutely! We offer customized training programs tailored to your organization's specific requirements, industry, and skill levels. Our expert instructors can adapt content to match your business context.",
          },
          {
            question: "What learning formats do you offer?",
            answer:
              "We offer multiple learning formats including in-person workshops, virtual live sessions, self-paced online modules, and hybrid approaches to accommodate different learning preferences and schedules.",
          },
        ],
      },

      TrainingTestimonialsSection: {
        title: "What Our Participants Say",
        subtitle: "Success stories from our training graduates",
        description:
          "Hear from professionals who have transformed their careers through our training programs",
        testimonials: [
          {
            name: "Sarah Johnson",
            position: "IT Manager",
            company: "TechCorp Solutions",
            content:
              "The training program exceeded my expectations. The hands-on approach and real-world scenarios made learning both practical and engaging.",
            rating: 5,
            image: "/images/testimonials/sarah.jpg",
          },
          {
            name: "Michael Chen",
            position: "Senior Developer",
            company: "InnovateTech",
            content:
              "The expert instructors and comprehensive curriculum helped me advance my skills significantly. Highly recommended for anyone looking to upskill.",
            rating: 5,
            image: "/images/testimonials/michael.jpg",
          },
        ],
      },

      // Integration Sections
      IntegrationTypesSection: {
        title: "Integration Types",
        subtitle: "Multiple ways to connect",
        description: "Choose the integration method that best fits your needs",
        types: [
          {
            name: "REST APIs",
            description: "Modern API-based integration",
            icon: "🔗",
          },
          {
            name: "iPaaS",
            description: "Integration Platform as a Service",
            icon: "☁️",
          },
          {
            name: "File‑based",
            description: "Batch file processing",
            icon: "📁",
          },
          {
            name: "Webhooks",
            description: "Real-time event notifications",
            icon: "🔔",
          },
        ],
      },

      IntegrationBenefitsSection: {
        title: "Integration Benefits",
        subtitle: "Why integrate with NetSuite",
        description: "Unlock the full potential of your business systems",
        benefits: [
          {
            title: "Fewer Manual Tasks",
            description: "Automate data entry and reduce errors",
            icon: "⚡",
          },
          {
            title: "Real‑time Data",
            description: "Get instant updates across all systems",
            icon: "🔄",
          },
          {
            title: "Higher Accuracy",
            description: "Eliminate data inconsistencies",
            icon: "🎯",
          },
          {
            title: "Better Visibility",
            description: "Unified view of your business data",
            icon: "👁️",
          },
        ],
      },

      // Customization Sections
      CustomizationServicesSection: {
        title: "What We Customize",
        subtitle: "Comprehensive customization services",
        description: "Tailor NetSuite to match your unique business processes",
        services: [
          {
            name: "Workflows",
            description: "Automate approvals and processes",
            icon: "⚙️",
          },
          {
            name: "Scripts",
            description: "Server and client logic",
            icon: "💻",
          },
          {
            name: "UI",
            description: "Forms, fields, and dashboards",
            icon: "🎨",
          },
          {
            name: "Reports",
            description: "Custom reporting and analytics",
            icon: "📊",
          },
        ],
      },

      CustomizationProcessSection: {
        title: "Customization Process",
        subtitle: "Our proven approach",
        description: "A structured methodology for successful customization",
        steps: [
          {
            title: "Requirements",
            description: "Gather and analyze your needs",
            duration: "1 week",
            step: "01",
          },
          {
            title: "Design",
            description: "Create solution blueprint",
            duration: "1 week",
            step: "02",
          },
          {
            title: "Development",
            description: "Build and test customizations",
            duration: "2-4 weeks",
            step: "03",
          },
          {
            title: "Deployment",
            description: "Implement and train users",
            duration: "1 week",
            step: "04",
          },
        ],
      },
      // Manufacturing Sections
      ManufacturingIndustryStatsSection: {
        title: "Manufacturing Industry Stats",
        subtitle: "The state of manufacturing today",
        stats: [
          {
            label: "Digital Transformation",
            value: "73%",
            description:
              "of manufacturers are investing in digital transformation",
          },
          {
            label: "Efficiency Gains",
            value: "25%",
            description: "average efficiency improvement with ERP systems",
          },
          {
            label: "Cost Reduction",
            value: "30%",
            description: "average cost reduction in operations",
          },
        ],
      },

      ManufacturingChallengesSection: {
        title: "Manufacturing Challenges",
        subtitle: "Common pain points we solve",
        challenges: [
          {
            title: "Inventory Management",
            description: "Complex inventory tracking across multiple locations",
            impact: "High",
          },
          {
            title: "Production Planning",
            description: "Difficulty in planning and scheduling production",
            impact: "High",
          },
          {
            title: "Quality Control",
            description: "Maintaining consistent quality standards",
            impact: "Medium",
          },
          {
            title: "Compliance",
            description: "Meeting industry regulations and standards",
            impact: "High",
          },
        ],
      },

      ManufacturingSolutionsSection: {
        title: "Manufacturing Solutions",
        subtitle: "Comprehensive NetSuite solutions",
        description: "Tailored solutions for manufacturing businesses",
        solutions: [
          {
            title: "Production Management",
            description: "End-to-end production planning and execution",
            features: ["Work orders", "Routing", "Capacity planning"],
          },
          {
            title: "Inventory Control",
            description: "Advanced inventory management capabilities",
            features: ["Multi-location", "Serial tracking", "Cycle counting"],
          },
          {
            title: "Quality Management",
            description: "Built-in quality control processes",
            features: ["Inspections", "Non-conformance", "Corrective actions"],
          },
        ],
      },

      ManufacturingCaseStudiesSection: {
        title: "Manufacturing Case Studies",
        subtitle: "Success stories from our clients",
        caseStudies: [
          {
            company: "TechManufacturing Inc.",
            industry: "Electronics",
            challenge: "Complex multi-level BOM management",
            solution: "Advanced manufacturing module implementation",
            results: "40% reduction in production planning time",
          },
          {
            company: "AutoParts Ltd.",
            industry: "Automotive",
            challenge: "Quality control across multiple plants",
            solution: "Integrated quality management system",
            results: "60% improvement in quality metrics",
          },
        ],
      },

      ManufacturingImplementationProcessSection: {
        title: "Manufacturing Implementation",
        subtitle: "Specialized implementation for manufacturers",
        description: "Our manufacturing-specific implementation approach",
        phases: [
          {
            title: "Manufacturing Assessment",
            description: "Analyze current manufacturing processes",
            duration: "2 weeks",
          },
          {
            title: "System Configuration",
            description: "Configure manufacturing modules",
            duration: "4 weeks",
          },
          {
            title: "Data Migration",
            description: "Migrate manufacturing data",
            duration: "2 weeks",
          },
          {
            title: "Training & Go-Live",
            description: "Train users and launch system",
            duration: "2 weeks",
          },
        ],
      },

      ManufacturingCTASection: {
        title: "Transform Your Manufacturing Operations",
        subtitle: "Get started with NetSuite for manufacturing",
        description: "Join leading manufacturers using NetSuite",
        ctaButton: {
          text: "Schedule Demo",
          link: "/manufacturing/demo",
          variant: validateVariant("primary"),
        },
      },

      // Retail Sections
      RetailIndustryStatsSection: {
        title: "Retail Industry Stats",
        subtitle: "The evolving retail landscape",
        stats: [
          {
            label: "Omnichannel Growth",
            value: "85%",
            description:
              "of retailers are investing in omnichannel capabilities",
          },
          {
            label: "Customer Expectations",
            value: "78%",
            description: "expect seamless online and offline experiences",
          },
          {
            label: "Inventory Accuracy",
            value: "95%",
            description: "accuracy needed for successful omnichannel retail",
          },
        ],
      },

      RetailChallengesSection: {
        title: "Retail Challenges",
        subtitle: "Modern retail pain points",
        challenges: [
          {
            title: "Omnichannel Complexity",
            description: "Managing multiple sales channels effectively",
            impact: "High",
          },
          {
            title: "Inventory Visibility",
            description: "Real-time inventory across all channels",
            impact: "High",
          },
          {
            title: "Customer Experience",
            description: "Delivering consistent customer experience",
            impact: "High",
          },
          {
            title: "Seasonal Demand",
            description: "Managing fluctuating demand patterns",
            impact: "Medium",
          },
        ],
      },

      RetailSolutionsSection: {
        title: "Retail Solutions",
        subtitle: "Comprehensive retail management",
        description: "Complete solutions for modern retail businesses",
        solutions: [
          {
            title: "Omnichannel Commerce",
            description: "Unified commerce across all channels",
            features: ["POS integration", "E-commerce", "Mobile commerce"],
          },
          {
            title: "Inventory Management",
            description: "Advanced inventory optimization",
            features: [
              "Real-time tracking",
              "Demand forecasting",
              "Automated reordering",
            ],
          },
          {
            title: "Customer Management",
            description: "360-degree customer view",
            features: [
              "Customer profiles",
              "Purchase history",
              "Loyalty programs",
            ],
          },
        ],
      },

      RetailFeaturesSection: {
        title: "Retail Features",
        subtitle: "Key capabilities for retail success",
        features: [
          {
            title: "Point of Sale",
            description: "Modern POS system with offline capability",
            icon: "💳",
          },
          {
            title: "E-commerce Integration",
            description: "Seamless online and offline integration",
            icon: "🛒",
          },
          {
            title: "Inventory Optimization",
            description: "AI-powered inventory management",
            icon: "📦",
          },
          {
            title: "Customer Analytics",
            description: "Advanced customer insights and reporting",
            icon: "📊",
          },
        ],
      },

      RetailCaseStudiesSection: {
        title: "Retail Case Studies",
        subtitle: "Success stories from retail clients",
        caseStudies: [
          {
            company: "FashionForward",
            industry: "Fashion Retail",
            challenge: "Omnichannel inventory management",
            solution: "NetSuite retail implementation",
            results: "50% improvement in inventory accuracy",
          },
          {
            company: "ElectroMart",
            industry: "Electronics Retail",
            challenge: "Seasonal demand management",
            solution: "Advanced demand planning",
            results: "35% reduction in stockouts",
          },
        ],
      },

      RetailImplementationSection: {
        title: "Retail Implementation",
        subtitle: "Specialized retail implementation",
        description: "Our retail-specific implementation approach",
        phases: [
          {
            title: "Retail Assessment",
            description: "Analyze current retail operations",
            duration: "2 weeks",
          },
          {
            title: "Channel Integration",
            description: "Integrate all sales channels",
            duration: "4 weeks",
          },
          {
            title: "Inventory Setup",
            description: "Configure inventory management",
            duration: "2 weeks",
          },
          {
            title: "Go-Live Support",
            description: "Launch and provide ongoing support",
            duration: "2 weeks",
          },
        ],
      },

      RetailCTASection: {
        title: "Transform Your Retail Business",
        subtitle: "Get started with NetSuite for retail",
        description: "Join successful retailers using NetSuite",
        ctaButton: {
          text: "Schedule Demo",
          link: "/retail/demo",
          variant: validateVariant("primary"),
        },
      },

      // About Sections
      AboutMissionSection: {
        title: "",
        subtitle: "",
        description: "",
        vision: "",
        additionalContent: "",
        image: "",
        stats: [],
        missionPoints: []
      },

      AboutValuesSection: {
        title: "Our Values",
        subtitle: "What drives us",
        description:
          "Our core values guide everything we do and shape our company culture",
        values: [
          {
            title: "Integrity",
            description:
              "We operate with honesty and transparency in all our interactions",
            icon: "🛡️",
          },
          {
            title: "Innovation",
            description:
              "We continuously seek new and better ways to solve problems",
            icon: "🚀",
          },
          {
            title: "Customer Success",
            description: "Our success is measured by our customers' success",
            icon: "🎯",
          },
          {
            title: "Collaboration",
            description: "We believe in the power of working together",
            icon: "👥",
          },
        ],
      },

      AboutTeamSection: {
        title: "Our Team",
        subtitle: "Meet the experts behind our success",
        description:
          "Our diverse team of professionals brings together decades of experience in technology and business transformation",
        teamMembers: [
          {
            name: "John Smith",
            position: "CEO & Founder",
            bio: "20+ years in technology leadership",
            image: "/images/team/john.jpg",
            linkedin: "https://linkedin.com/in/johnsmith",
          },
          {
            name: "Sarah Johnson",
            position: "CTO",
            bio: "Expert in enterprise architecture and cloud solutions",
            image: "/images/team/sarah.jpg",
            linkedin: "https://linkedin.com/in/sarahjohnson",
          },
          {
            name: "Mike Chen",
            position: "VP of Services",
            bio: "Specialist in implementation and project management",
            image: "/images/team/mike.jpg",
            linkedin: "https://linkedin.com/in/mikechen",
          },
        ],
      },

      AboutJourneySection: {
        title: "Our Journey",
        subtitle: "From startup to industry leader",
        description: "A timeline of our company's growth and key milestones",
        timeline: [
          {
            year: "2010",
            title: "Company Founded",
            description:
              "Started with a vision to transform business through technology",
          },
          {
            year: "2015",
            title: "First Major Client",
            description:
              "Successfully implemented NetSuite for Fortune 500 company",
          },
          {
            year: "2020",
            title: "Global Expansion",
            description: "Expanded operations to serve clients worldwide",
          },
          {
            year: "2024",
            title: "Industry Recognition",
            description: "Recognized as top NetSuite implementation partner",
          },
        ],
      },

      AboutMilestonesSection: {
        title: "Key Milestones",
        subtitle: "Our achievements over the years",
        description:
          "Significant milestones that mark our journey of growth and success",
        milestones: [
          {
            title: "500+ Projects",
            description: "Successfully completed implementations",
            icon: "🏆",
          },
          {
            title: "50+ Team Members",
            description: "Growing team of certified professionals",
            icon: "👥",
          },
          {
            title: "15+ Countries",
            description: "Serving clients globally",
            icon: "🌍",
          },
          {
            title: "99% Success Rate",
            description: "Project success rate",
            icon: "✅",
          },
        ],
      },

      AboutDifferentiatorsSection: {
        title: "What Sets Us Apart",
        subtitle: "Our competitive advantages",
        description:
          "The unique qualities that make us the preferred choice for NetSuite implementations",
        differentiators: [
          {
            title: "Deep Expertise",
            description:
              "Certified professionals with extensive NetSuite experience",
            icon: "🎓",
          },
          {
            title: "Industry Focus",
            description: "Specialized knowledge across multiple industries",
            icon: "🏭",
          },
          {
            title: "Proven Methodology",
            description: "Repeatable, predictable implementation process",
            icon: "📋",
          },
          {
            title: "Ongoing Support",
            description: "Comprehensive post-implementation support",
            icon: "🤝",
          },
        ],
      },

      AboutCTASection: {
        title: "Ready to Work With Us?",
        subtitle: "Let's transform your business together",
        description:
          "Get in touch to discuss how we can help your business succeed",
        ctaButton: {
          text: "Contact Us",
          link: "/contact",
          variant: validateVariant("primary"),
        },
      },
    };

    return (
      defaultData[componentType] || {
        title: "Section Title",
        description: "Section description",
        content: "Section content",
      }
    );
  };

  const saveComponentData = (updatedData) => {
    const componentIndex = editingComponent.index;
    const updatedComponents = [...pageData.components];
    const currentComponent = updatedComponents[componentIndex];

    // Update the component with new content data
    updatedComponents[componentIndex] = {
      ...currentComponent,
      content: updatedData,
      contentJson: JSON.stringify(updatedData, null, 2), // Update contentJson for API
    };

    // Update local state immediately for responsive UI
    setPageData((prev) => ({
      ...prev,
      components: updatedComponents,
    }));

    // Make API call to persist changes if component has ID
    if (currentComponent?.id && pageData.id) {
      const updateData = {
        id: currentComponent.id,
        pageId: pageData.id,
        componentType: currentComponent.componentType,
        componentName: currentComponent.componentName || "",
        contentJson: JSON.stringify(updatedData, null, 2),
        orderIndex:
          currentComponent.orderIndex !== undefined
            ? currentComponent.orderIndex
            : componentIndex,
        isVisible: Boolean(
          currentComponent.isVisible === true ||
            currentComponent.isVisible === 1
        ),
        theme: currentComponent.theme === 1 ? 1 : 2,
      };

      console.log(
        `🔄 [EDIT SAVE] Updating component ${currentComponent.id} with edited data:`,
        {
          componentId: currentComponent.id,
          updateData,
          originalData: updatedData,
        }
      );

      // Make async API call
      pagesAPI
        .updatePageComponent(currentComponent.id, updateData)
        .then(() => {
          console.log(
            `✅ [EDIT SAVE] Component ${currentComponent.id} updated successfully`
          );
          showToast("Section data saved successfully", "success");
        })
        .catch((error) => {
          console.error(
            `❌ [EDIT SAVE] Failed to update component ${currentComponent.id}:`,
            error
          );
          showToast(`Failed to save section data: ${error.message}`, "error");

          // Revert the local changes on API failure
          setPageData((prevData) => {
            const revertedComponents = [...prevData.components];
            revertedComponents[componentIndex] = currentComponent; // Revert to original component
            return {
              ...prevData,
              components: revertedComponents,
            };
          });
        });
    } else {
      console.log(
        `⚠️ [EDIT SAVE] Skipping API update for component without ID:`,
        {
          componentId: currentComponent?.id,
          pageId: pageData.id,
          reason: !currentComponent?.id
            ? "Component not saved to database yet"
            : "No page ID available",
        }
      );
      showToast(
        "Section data updated locally (will be saved when page is published)",
        "info"
      );
    }

    setShowSectionEditor(false);
    setEditingComponent(null);
  };

  // Function to handle delete confirmation
  const handleDeleteClick = async (componentIndex) => {
    console.log("🗑️ [DELETE CLICK] Component to delete:", componentIndex);
    const component = pageData.components[componentIndex];

    try {
      setLoading(true);
      console.log("🚀 [DELETE API] Deleting component:", component);

      // Create updated components array without the deleted component
      const updatedComponents = pageData.components.filter(
        (_, index) => index !== componentIndex
      );

      // Update order indices for remaining components
      const reorderedComponents = updatedComponents.map((comp, index) => ({
        ...comp,
        orderIndex: index + 1,
      }));

      // Update page data
      const updatedPageData = {
        ...pageData,
        components: reorderedComponents,
      };

      setPageData(updatedPageData);
      showToast("Component deleted successfully", "success");

      console.log("✅ [DELETE API] Component deleted successfully");
    } catch (error) {
      console.error("❌ [DELETE API] Error deleting component:", error);
      showToast("Failed to delete component", "error");
    } finally {
      setLoading(false);
    }
  };

  // Legacy removeComponent function for backward compatibility
  const removeComponent = (componentIndex) => {
    handleDeleteClick(componentIndex);
  };

  const duplicateComponent = (componentIndex) => {
    const componentToDuplicate = pageData.components[componentIndex];
    const newComponent = {
      ...componentToDuplicate,
      // Don't assign orderIndex here, as it will be handled during save
    };

    // Add to the components array
    setPageData((prev) => {
      const updatedComponents = [...prev.components, newComponent];

      // Re-assign all orderIndex values to ensure they're sequential
      return {
        ...prev,
        components: updatedComponents.map((component, index) => ({
          ...component,
          orderIndex: index + 1,
        })),
      };
    });

    showToast("Section duplicated successfully", "success");
  };

  const moveComponent = (fromIndex, toIndex) => {
    const components = [...pageData.components];
    const [movedComponent] = components.splice(fromIndex, 1);
    components.splice(toIndex, 0, movedComponent);

    // Always re-assign all orderIndex values after reordering to ensure they're sequential
    const reorderedComponents = components.map((component, index) => ({
      ...component,
      orderIndex: index + 1, // Ensure orderIndex values are sequential and 1-based
    }));

    setPageData((prev) => ({
      ...prev,
      components: reorderedComponents,
    }));
  };

  const handleSave = async (status = "draft") => {
    // Prevent multiple simultaneous API calls
    if (isSavingRef.current) {
      console.log(
        "Save operation already in progress, ignoring duplicate call"
      );
      return;
    }

    try {
      // Mark that we're currently saving
      isSavingRef.current = true;

      // Set appropriate loading state
      if (status === "published") {
        setIsPublishing(true);
      } else {
        setLoading(true);
      }

      // Apply default values to ensure no null, undefined, or empty values
      const createPageDTO = applyDefaultValues(pageData, status);

      // Validate required fields - use helper function to ensure lock is reset on validation errors
      const validateAndReturn = (message) => {
        showToast(message, "error");
        // Reset states before returning from validation error
        setLoading(false);
        setIsPublishing(false);
        isSavingRef.current = false;
        return;
      };

      if (!createPageDTO.name || !createPageDTO.name.trim()) {
        return validateAndReturn("Page name is required");
      }

      if (!createPageDTO.categoryId) {
        return validateAndReturn("Please select a category");
      }

      // Validate slug format after applying defaults
      if (!/^[a-z0-9-]+$/.test(createPageDTO.slug)) {
        return validateAndReturn(
          "Generated slug contains invalid characters. Please check the page name."
        );
      }

      // Validate components and orderIndex uniqueness
      if (createPageDTO.components && createPageDTO.components.length > 0) {
        const orderIndexes = new Set();
        for (let i = 0; i < createPageDTO.components.length; i++) {
          const comp = createPageDTO.components[i];

          // Check component type
          if (!comp.componentType?.trim()) {
            return validateAndReturn(
              "Component " + (i + 1) + " is missing component type"
            );
          }

          // Check component name
          if (!comp.componentName?.trim()) {
            return validateAndReturn(
              "Component " + (i + 1) + " is missing component name"
            );
          }

          // Check content
          if (!comp.content || typeof comp.content !== "object") {
            return validateAndReturn(
              "Component " + (i + 1) + " has invalid content"
            );
          }

          // Check orderIndex uniqueness
          const orderIndex = comp.orderIndex;
          if (orderIndexes.has(orderIndex)) {
            return validateAndReturn(
              "Duplicate order index found: " +
                orderIndex +
                ". Each component must have a unique order index."
            );
          }
          orderIndexes.add(orderIndex);
        }
      }

      console.log("🚀 Final data being sent to API:", createPageDTO);
      console.log("📊 Component summary:", {
        totalComponents: createPageDTO.components?.length || 0,
        componentTypes:
          createPageDTO.components?.map((c) => c.componentType) || [],
        orderIndexes: createPageDTO.components?.map((c) => c.orderIndex) || [],
      });

      // Make the API call to create page with components
      await pagesAPI.createPage(createPageDTO);
      console.log("✅ Page created successfully!");

      // Show appropriate success message based on status
      if (status === "published") {
        showToast("Page published successfully", "success");
      } else {
        showToast(
          'Page "' + createPageDTO.name + '" saved as draft successfully!',
          "success"
        );
      }

      // Navigate to pages management after a brief delay
      setTimeout(() => {
        navigate("/admin/pages");
      }, 1500);
    } catch (error) {
      console.error("❌ Failed to save page:", error);
      showToast(error.message || "Failed to save page", "error");
    } finally {
      // Reset loading states and save lock
      setLoading(false);
      setIsPublishing(false);
      isSavingRef.current = false;
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        // Require category selection
        return (
          pageData.categoryId !== null && pageData.categoryId !== undefined
        );
      case 2:
        // Page details can be empty; defaults will be applied
        return true;
      case 3:
        // Sections optional
        return true;
      case 4:
        // Review step always valid
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white text-xl font-bold">
                Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CategorySelector
                value={pageData.categoryId}
                onChange={(id) => handlePageDataChange("categoryId", id)}
              />
              {!pageData.categoryId && (
                <div className="mt-3 text-xs text-red-300">
                  Please select a category to continue.
                </div>
              )}
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <PageDetailsStep
            pageData={pageData}
            onDataChange={handlePageDataChange}
          />
        );
      case 3:
        return (
          <SectionsStep
            pageData={pageData}
            availableComponents={availableComponents}
            onAddComponent={addComponent}
            onUpdateComponent={updateComponent}
            onRemoveComponent={removeComponent}
            onDuplicateComponent={duplicateComponent}
            onMoveComponent={moveComponent}
            componentSchemas={componentSchemas}
          />
        );
      case 4:
        return (
          <ReviewStep
            pageData={pageData}
            onSave={handleSave}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <MediaInputDetector>
      <div
        className="admin-component min-h-screen bg-[var(--color-brand-dark-navy)] relative overflow-hidden"
        data-dashboard="true"
      >
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[var(--color-text-inverse)] mb-4 tracking-tight">
              Enhanced Page Builder
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Create dynamic pages with customizable sections and rich content
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="w-full h-2 bg-[var(--color-text-secondary)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-primary)] transition-all duration-500"
                style={{
                  width: `${
                    ((currentStep - 1) / (steps.length - 1)) * 100 || 0
                  }%`,
                }}
              />
            </div>
            <div
              className="mt-4 grid"
              style={{
                gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
              }}
            >
              {steps.map((step) => {
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;
                const isFuture = step.id > currentStep;

                return (
                  <div
                    key={step.id}
                    className="flex items-start space-x-3 group"
                  >
                    {/* Interactive Step Circle */}
                    <button
                      onClick={() => handleStepClick(step.id)}
                      disabled={isFuture}
                      className={`
                        flex items-center justify-center w-9 h-9 rounded-full border-2 
                        transition-all duration-200 transform
                        ${
                          isCompleted
                            ? "bg-[var(--tw-green-500)] border-[var(--tw-green-500)] text-[var(--color-text-inverse)] cursor-pointer hover:bg-[var(--tw-green-600)] hover:border-[var(--tw-green-600)] hover:scale-110 shadow-lg shadow-[var(--tw-green-500)]/25"
                            : isCurrent
                            ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-text-inverse)] cursor-default shadow-lg shadow-[var(--color-primary)]/25"
                            : "bg-transparent border-[var(--color-text-secondary)] text-[var(--color-text-light)] cursor-not-allowed"
                        }
                        group-hover:shadow-lg
                      `}
                      title={
                        isCompleted
                          ? `Go back to ${step.title}`
                          : isCurrent
                          ? `Current step: ${step.title}`
                          : `Complete current steps first`
                      }
                    >
                      {isCompleted ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        <span className="text-xs font-semibold">{step.id}</span>
                      )}
                    </button>

                    {/* Step Info with Enhanced Styling */}
                    <div className="flex-1 min-w-0 transition-all duration-200">
                      <div
                        className={`
                          text-sm font-semibold transition-colors duration-200
                          ${
                            isCompleted
                              ? "text-[var(--tw-green-400)] group-hover:text-[var(--tw-green-300)]"
                              : isCurrent
                              ? "text-[var(--color-primary-light)]"
                              : "text-[var(--color-text-light)]"
                          }
                        `}
                      >
                        {step.title}
                      </div>
                      <div
                        className={`
                          text-xs transition-colors duration-200
                          ${
                            isCompleted
                              ? "text-[var(--tw-green-300)]"
                              : isCurrent
                              ? "text-[var(--color-primary-light)]"
                              : "text-[var(--color-text-muted)]"
                          }
                        `}
                      >
                        {step.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="w-full">{renderStepContent()}</div>

          {/* Navigation */}
          <div className="flex items-center justify-between w-full mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="bg-[var(--color-white-10)] backdrop-blur-sm border-[var(--color-white-20)] text-[var(--color-text-inverse)] hover:bg-[var(--color-white-20)] hover:border-[var(--color-white-30)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/pages")}
                className="bg-[var(--color-white-10)] backdrop-blur-sm border-[var(--color-white-20)] text-[var(--color-text-inverse)] hover:bg-[var(--color-white-20)] hover:border-[var(--color-white-30)] transition-all duration-200"
              >
                Cancel
              </Button>

              {currentStep >= 2 && pageData.components.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setShowPagePreview(true)}
                  className="bg-[var(--color-white-10)] backdrop-blur-sm border-[var(--color-white-20)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary)]/20 hover:border-[var(--color-primary-light)] transition-all duration-200"
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Preview Page
                </Button>
              )}

              {currentStep < steps.length ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-dark)] hover:to-[var(--color-active)] text-[var(--color-text-inverse)] shadow-lg shadow-[var(--color-primary)]/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </Button>
              ) : (
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSave("draft")}
                    loading={loading && !isPublishing}
                    disabled={
                      !isStepValid(currentStep) || isPublishing || loading
                    }
                    className="bg-[var(--color-white-10)] backdrop-blur-sm border-[var(--color-white-20)] text-[var(--color-text-inverse)] hover:bg-[var(--color-white-20)] hover:border-[var(--color-white-30)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading && !isPublishing ? "Saving..." : "Save as Draft"}
                  </Button>
                  <Button
                    onClick={() => handleSave("published")}
                    loading={isPublishing}
                    disabled={
                      !isStepValid(currentStep) || isPublishing || loading
                    }
                    className="bg-gradient-to-r from-[var(--tw-green-500)] to-[var(--tw-green-600)] hover:from-[var(--tw-green-600)] hover:to-[var(--tw-green-700)] text-[var(--color-text-inverse)] shadow-lg shadow-[var(--tw-green-500)]/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPublishing ? "Publishing..." : "Publish Page"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section Data Editor Modal */}
        {showSectionEditor && editingComponent && (
          <SectionDataEditor
            isOpen={showSectionEditor}
            onClose={() => {
              setShowSectionEditor(false);
              setEditingComponent(null);
            }}
            section={{
              name: editingComponent.componentName,
              componentId: editingComponent.componentType,
              icon: editingComponent.componentInfo?.icon || "📄",
              data:
                editingComponent.content ||
                (editingComponent.contentJson
                  ? JSON.parse(editingComponent.contentJson)
                  : {}),
            }}
            onSave={saveComponentData}
          />
        )}

        {/* Page Preview Modal */}
        <PagePreview
          isOpen={showPagePreview}
          onClose={() => setShowPagePreview(false)}
          pageData={pageData}
          availableComponents={availableComponents}
        />

        {/* Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </MediaInputDetector>
  );
};

// Category selector that fetches from backend swagger endpoints
const CategorySelector = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/Categories");
        const list = Array.isArray(res.data) ? res.data : [];

        // Filter out "Home" and "About" categories
        const filteredList = list.filter((category) => {
          const name = category.name?.toLowerCase();
          const slug = category.slug?.toLowerCase();
          return (
            name !== "home" &&
            name !== "about" &&
            slug !== "home" &&
            slug !== "about"
          );
        });

        setCategories(filteredList);
      } catch (e) {
        setError(e.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <div className="text-white/80 text-sm">Loading categories...</div>;
  }
  if (error) {
    return <div className="text-red-300 text-sm">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(c.id)}
          className={`text-left p-4 rounded-lg border transition ${
            value === c.id
              ? "border-[var(--color-primary-light)] bg-[var(--color-primary)]/10"
              : "border-[var(--color-white-10)] hover:border-[var(--color-white-20)] bg-[var(--color-white)]/5"
          }`}
        >
          <div className="text-[var(--color-text-inverse)] font-semibold">
            {c.name}
          </div>
          {c.description && (
            <div className="text-[var(--color-text-inverse)]/70 text-sm mt-1">
              {c.description}
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

// Step 1: Page Details
const PageDetailsStep = ({ pageData, onDataChange }) => {
  return (
    <Card className="bg-[var(--color-white)]/5 backdrop-blur-sm border border-[var(--color-white-10)] shadow-xl">
      <CardHeader>
        <CardTitle className="text-[var(--color-text-inverse)] text-xl font-bold">
          Page Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text-inverse)] mb-2">
              Page Name *
            </label>
            <Input
              value={pageData.name}
              onChange={(e) => onDataChange("name", e.target.value)}
              placeholder="Enter page name"
              className="w-full bg-[var(--color-white-10)] backdrop-blur-sm border-[var(--color-white-20)] text-[var(--color-text-inverse)] placeholder-[var(--color-text-inverse)]/50 focus:border-[var(--color-primary-light)] focus:ring-[var(--color-primary-light)]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--color-text-inverse)] mb-2">
              URL Slug *
            </label>
            <Input
              type="text"
              value={pageData.slug}
              onChange={(e) => onDataChange("slug", e.target.value)}
              placeholder="page-url-slug"
              pattern="[a-z0-9-]+"
              title="Slug must only contain lowercase letters, numbers, and dashes."
              className="w-full bg-[var(--color-white-10)] backdrop-blur-sm border-[var(--color-white-20)] text-[var(--color-text-inverse)] placeholder-[var(--color-text-inverse)]/50 focus:border-[var(--color-primary-light)] focus:ring-[var(--color-primary-light)]/20"
            />
            <p className="text-sm text-[var(--color-text-secondary)] mt-2">
              URL: /{pageData.slug || "page-url-slug"}
            </p>
            <p className="text-xs text-[var(--color-text-light)] mt-1">
              Slug must only contain lowercase letters, numbers, and dashes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text-inverse)] mb-2">
              SEO Meta Title
            </label>
            <Input
              value={pageData.metaTitle}
              onChange={(e) => onDataChange("metaTitle", e.target.value)}
              placeholder="SEO title for search engines"
              className="w-full bg-[var(--color-white-10)] backdrop-blur-sm border-[var(--color-white-20)] text-[var(--color-text-inverse)] placeholder-[var(--color-text-inverse)]/50 focus:border-[var(--color-primary-light)] focus:ring-[var(--color-primary-light)]/20"
            />
          </div>
          <div></div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-text-inverse)] mb-2">
            SEO Meta Description
          </label>
          <textarea
            value={pageData.metaDescription}
            onChange={(e) => onDataChange("metaDescription", e.target.value)}
            placeholder="SEO description for search engines"
            rows={3}
            className="block w-full rounded-lg bg-[var(--color-white-10)] backdrop-blur-sm border-[var(--color-white-20)] text-[var(--color-text-inverse)] placeholder-[var(--color-text-inverse)]/50 focus:border-[var(--color-primary-light)] focus:ring-[var(--color-primary-light)]/20 shadow-sm resize-none"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={pageData.isHomepage}
              onChange={(e) => onDataChange("isHomepage", e.target.checked)}
              className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-[var(--color-border-secondary)] rounded"
            />
            <span className="ml-2 text-sm text-[var(--color-text-inverse)]">
              Set as Homepage
            </span>
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

// Step 2: Sections with detailed component forms
const SectionsStep = ({
  pageData,
  availableComponents,
  onAddComponent,
  onUpdateComponent,
  onRemoveComponent,
  onDuplicateComponent,
  componentSchemas = {},
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditMode, setIsEditMode] = useState(true);

  // Dynamic category generation based on available components
  const categories = React.useMemo(() => {
    // Get components that match search term (if any)
    const searchFilteredComponents = searchTerm.trim()
      ? availableComponents.filter((comp) => {
          const search = searchTerm.toLowerCase().trim();
          return (
            comp.name.toLowerCase().includes(search) ||
            comp.componentType.toLowerCase().includes(search) ||
            comp.category.toLowerCase().includes(search) ||
            comp.description.toLowerCase().includes(search)
          );
        })
      : availableComponents;

    // Count components per category (considering search filter)
    const categoryCounts = {};
    searchFilteredComponents.forEach((comp) => {
      categoryCounts[comp.category] = (categoryCounts[comp.category] || 0) + 1;
    });

    // Start with "All Components"
    const dynamicCategories = [
      {
        id: "all",
        name: "All Components",
        icon: "📄",
        count: searchFilteredComponents.length,
      },
    ];

    // Extract unique categories from available components
    const uniqueCategories = [
      ...new Set(
        availableComponents
          .map((comp) => comp.category)
          .filter((category) => category && category !== "all")
      ),
    ];

    // Define category icons and display names
    const categoryConfig = {
      layout: { name: "Layout", icon: "🎯" },
      content: { name: "Content", icon: "📝" },
      pricing: { name: "Pricing", icon: "💰" },
      faq: { name: "FAQ", icon: "❓" },
      cta: { name: "Call to Action", icon: "🚀" },
      about: { name: "About", icon: "👥" },
      hero: { name: "Hero", icon: "🌟" },
      solution: { name: "Solution", icon: "⚡" },
      services: { name: "Services", icon: "🔧" },
      industry: { name: "Industry", icon: "🏭" },
      features: { name: "Features", icon: "✨" },
      testimonials: { name: "Testimonials", icon: "💬" },
      contact: { name: "Contact", icon: "📞" },
      team: { name: "Team", icon: "👥" },
      portfolio: { name: "Portfolio", icon: "🎨" },
      blog: { name: "Blog", icon: "📰" },
      footer: { name: "Footer", icon: "🔗" },
      header: { name: "Header", icon: "📋" },
      navigation: { name: "Navigation", icon: "🧭" },
    };

    // Sort categories by count (descending) for better UX
    const sortedCategories = uniqueCategories.sort(
      (a, b) => (categoryCounts[b] || 0) - (categoryCounts[a] || 0)
    );

    // Add categories that exist in components
    sortedCategories.forEach((categoryId) => {
      const config = categoryConfig[categoryId] || {
        name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
        icon: "📦",
      };

      dynamicCategories.push({
        id: categoryId,
        name: config.name,
        icon: config.icon,
        count: categoryCounts[categoryId] || 0,
      });
    });

    return dynamicCategories;
  }, [availableComponents, searchTerm]);

  const filteredComponents = React.useMemo(() => {
    let filtered = availableComponents;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((comp) => comp.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (comp) =>
          comp.name.toLowerCase().includes(search) ||
          comp.componentType.toLowerCase().includes(search) ||
          comp.category.toLowerCase().includes(search) ||
          comp.description.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [availableComponents, selectedCategory, searchTerm]);

  // Function to update a specific component field
  const handleComponentUpdate = (index, field, value) => {
    if (field === "orderIndex") {
      // Validate and parse orderIndex
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        onUpdateComponent(index, field, numValue);
      }
    } else {
      onUpdateComponent(index, field, value);
    }
  };

  // Function to validate JSON in contentJson field
  const validateAndFormatJSON = (jsonString) => {
    try {
      if (!jsonString.trim()) return "{}";
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return jsonString; // Return as-is if invalid, let user fix it
    }
  };

  return (
    <div className="space-y-6">
      {/* Available Components */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl font-bold">
            Available Components
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--color-white-10)] backdrop-blur-sm border border-[var(--color-white-20)] rounded-lg text-[var(--color-text-inverse)] placeholder-[var(--color-text-inverse)]/50 focus:border-[var(--color-primary-light)] focus:ring-2 focus:ring-[var(--color-primary-light)]/20 focus:outline-none transition-all duration-200"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25 transform scale-105"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white hover:scale-102"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Results Summary */}
          {(searchTerm || selectedCategory !== "all") && (
            <div className="mb-4 text-sm text-gray-300">
              Showing {filteredComponents.length} of{" "}
              {availableComponents.length} components
              {searchTerm && <span> for "{searchTerm}"</span>}
              {selectedCategory !== "all" && (
                <span>
                  {" "}
                  in {categories.find((c) => c.id === selectedCategory)?.name}
                </span>
              )}
            </div>
          )}

          {/* Components Grid */}
          {filteredComponents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-white mb-2">
                No components found
              </h3>
              <p className="text-gray-300 mb-4">
                {searchTerm ? (
                  <>No components match your search "{searchTerm}"</>
                ) : (
                  <>
                    No components available for the "
                    {categories.find((c) => c.id === selectedCategory)?.name}"
                    category
                  </>
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Clear Search
                  </button>
                )}
                {selectedCategory !== "all" && (
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View All Components
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredComponents.map((component) => (
                <div
                  key={component.id}
                  className="p-4 border border-white/20 rounded-xl cursor-pointer hover:bg-white/10 hover:border-white/30 transition-all duration-200 group"
                  onClick={() => onAddComponent(component)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                      {component.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-white mb-1">
                        {component.name}
                      </h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {component.description}
                      </p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                          {component.category}
                        </span>
                      </div>
                    </div>
                    <PlusIcon className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Component Forms */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-xl font-bold">
              Component Configuration ({pageData.components.length})
            </CardTitle>
            <div className="flex items-center space-x-2">
              {pageData.components.length > 1 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    // Auto-fix orderIndexes
                    const updatedComponents = pageData.components.map(
                      (component, index) => ({
                        ...component,
                        orderIndex: index + 1,
                      })
                    );
                    // Update all components with fixed indexes
                    updatedComponents.forEach((comp, index) => {
                      onUpdateComponent(index, "orderIndex", index + 1);
                    });
                  }}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-200"
                >
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  Fix Order
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditMode(!isEditMode)}
                className={`backdrop-blur-sm transition-all duration-200 mr-2 ${
                  isEditMode
                    ? "bg-blue-500/20 border-blue-400 text-blue-300 hover:bg-blue-500/30"
                    : "bg-gray-500/20 border-gray-400 text-gray-300 hover:bg-gray-500/30"
                }`}
              >
                {isEditMode ? "👁️ View Mode" : "✏️ Edit Mode"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  onAddComponent({
                    componentType: "Generic",
                    componentName: "New Component",
                    icon: "📄",
                    category: "content",
                  })
                }
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-green-500/20 hover:border-green-400 transition-all duration-200"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Component
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[600px] flex flex-col">
          {pageData.components.length === 0 ? (
            <div className="text-center py-12 flex-1 flex items-center justify-center">
              <div>
                <DocumentTextIcon className="h-20 w-20 text-white/40 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  No components added yet
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  Click on components above or use "Add Component" button to
                  start building your page
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30">
              {pageData.components.map((component, index) => {
                // Determine visibility
                const isVisible =
                  component.isVisible === true || component.isVisible === 1;
                const themeClass = component.theme === 1 ? "light" : "dark";

                return (
                  <div
                    key={index}
                    className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border transition-all duration-500 ${
                      !isVisible
                        ? "border-red-400/40 bg-red-500/5 opacity-60 scale-95"
                        : component.theme === 1
                        ? "border-yellow-400/30 bg-yellow-500/5 border-white/20"
                        : "border-purple-400/30 bg-purple-500/5 border-white/20"
                    }`}
                    style={{
                      display: isVisible ? "block" : "none",
                    }}
                    data-theme={themeClass}
                    data-component-visible={isVisible}
                  >
                    {/* Component Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="text-xl">
                          {availableComponents.find(
                            (c) => c.componentType === component.componentType
                          )?.icon || "📄"}
                        </div>
                        <h4 className="text-lg font-semibold text-white">
                          Component #{index + 1}
                        </h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onDuplicateComponent(index)}
                          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-green-500/20 hover:border-green-400 transition-all duration-200"
                        >
                          <DocumentDuplicateIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onRemoveComponent(index)}
                          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-red-500/20 hover:border-red-400 transition-all duration-200"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Component Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Component Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Component Type
                        </label>
                        <input
                          type="text"
                          value={component.componentType || ""}
                          onChange={(e) =>
                            handleComponentUpdate(
                              index,
                              "componentType",
                              e.target.value
                            )
                          }
                          placeholder="e.g., HeroSection, CtaButton"
                          className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
                        />
                      </div>

                      {/* Component Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Component Name
                        </label>
                        <input
                          type="text"
                          value={component.componentName || ""}
                          onChange={(e) =>
                            handleComponentUpdate(
                              index,
                              "componentName",
                              e.target.value
                            )
                          }
                          placeholder="e.g., Main Hero, Footer CTA"
                          className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
                        />
                      </div>

                      {/* Order Index */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Order Index
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={component.orderIndex ?? ""}
                          onChange={(e) =>
                            handleComponentUpdate(
                              index,
                              "orderIndex",
                              e.target.value
                            )
                          }
                          placeholder="Auto-generated if empty"
                          className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Leave empty for auto-increment ({index})
                        </p>
                      </div>

                      {/* Component Toggles */}
                      <div className="md:col-span-2 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                        <ComponentToggles
                          isVisible={
                            component.isVisible === true ||
                            component.isVisible === 1
                          }
                          theme={component.theme || 1}
                          onVisibilityChange={(val) =>
                            handleComponentUpdate(index, "isVisible", val)
                          }
                          onThemeChange={(val) =>
                            handleComponentUpdate(index, "theme", val)
                          }
                          size="normal"
                          layout="horizontal"
                        />
                      </div>

                      {/* Content Configuration - Full Width */}
                      <div className="col-span-full">
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-gray-300">
                            Content Configuration
                          </label>
                          <div className="flex bg-white/10 rounded-lg p-1">
                            <button
                              type="button"
                              onClick={() => {
                                if (!component.viewMode) {
                                  handleComponentUpdate(
                                    index,
                                    "viewMode",
                                    "form"
                                  );
                                } else if (component.viewMode === "json") {
                                  handleComponentUpdate(
                                    index,
                                    "viewMode",
                                    "form"
                                  );
                                }
                              }}
                              className={`px-3 py-1 text-xs rounded-md transition-all ${
                                !component.viewMode ||
                                component.viewMode === "form"
                                  ? "bg-blue-500 text-white"
                                  : "text-gray-400 hover:text-white"
                              }`}
                            >
                              Form View
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleComponentUpdate(index, "viewMode", "json")
                              }
                              className={`px-3 py-1 text-xs rounded-md transition-all ${
                                component.viewMode === "json"
                                  ? "bg-blue-500 text-white"
                                  : "text-gray-400 hover:text-white"
                              }`}
                            >
                              JSON View
                            </button>
                          </div>
                        </div>

                        {/* Enhanced Schema-based Form View */}
                        {(!component.viewMode ||
                          component.viewMode === "form") && (
                          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4">
                            {(() => {
                              // Check if component has enhanced schema (use preloaded or fallback)
                              const componentSchema = componentSchemas[component.componentType] || 
                                                      getAboutComponentSchema(component.componentType) ||
                                                      getGeneralComponentSchema(component.componentType);
                              
                              console.log("🔍 [SCHEMA CHECK]", component.componentType, "has schema:", !!componentSchema, "preloaded:", !!componentSchemas[component.componentType]);
                              console.log("🔍 [SCHEMA DETAILS]", {
                                componentType: component.componentType,
                                hasAboutSchema: !!getAboutComponentSchema(component.componentType),
                                hasGeneralSchema: !!getGeneralComponentSchema(component.componentType),
                                hasPreloadedSchema: !!componentSchemas[component.componentType],
                                finalSchema: componentSchema,
                                contentJson: component.contentJson,
                                hasContentJson: !!component.contentJson
                              });

                              if (componentSchema) {
                                // Use enhanced dynamic form generator
                                console.log("📝 [FORM RENDER] DynamicFormGenerator for:", {
                                  componentType: component.componentType,
                                  hasSchema: !!componentSchema.schema,
                                  hasData: !!component.contentJson,
                                  currentData: component.contentJson ? JSON.parse(component.contentJson) : componentSchema.defaultData
                                });

                                // For components without contentJson, try to get actual data from JSON files
                                const actualData = component.contentJson
                                  ? JSON.parse(component.contentJson)
                                  : (() => {
                                      // Try to get actual data from about.json for About components
                                      if (component.componentType.includes('About')) {
                                        // Return the actual data structure that matches the component
                                        const aboutDataMap = {
                                          AboutHeroSection: {
                                            title: "About Bellatrix",
                                            subtitle: "Your trusted partner in digital transformation",
                                            description: "We are a leading consultancy firm specializing in NetSuite implementations, business process optimization, and technology solutions that drive growth and efficiency.",
                                            backgroundVideo: "/Videos/about-hero.mp4",
                                            stats: [
                                              { value: "500+", label: "Projects Completed" },
                                              { value: "15+", label: "Years Experience" },
                                              { value: "98%", label: "Client Satisfaction" },
                                              { value: "200+", label: "Happy Clients" }
                                            ]
                                          },
                                          AboutJourneySection: {
                                            beginningTitle: "The Beginning",
                                            beginningText: "Founded in 2008 with a vision to bridge the gap between complex enterprise software and real business needs. Our founders recognized that many businesses were struggling to fully leverage their technology investments.",
                                            growthTitle: "Growth & Evolution",
                                            growthText: "Over the years, we've evolved from a small consulting firm to a comprehensive digital transformation partner, helping hundreds of organizations across various industries unlock their full potential.",
                                            todayTitle: "Today",
                                            todayText: "We continue to innovate and expand our services, staying at the forefront of technology trends while maintaining our core values of excellence and integrity.",
                                            imageUrl: "/images/solution.jpg"
                                          },
                                          AboutMissionSection: {
                                            title: "Our Mission",
                                            description: "To empower businesses with innovative technology solutions that transform operations, enhance productivity, and drive sustainable growth.",
                                            vision: "To be the global leader in business transformation consulting, helping organizations achieve their full potential through technology excellence.",
                                            image: "/images/ourProServices.png",
                                            stats: [],
                                            missionPoints: []
                                          },
                                          AboutTeamSection: {
                                            title: "Meet Our Team",
                                            description: "Our diverse team of experts brings together decades of experience in enterprise software, business consulting, and digital transformation.",
                                            members: [
                                              {
                                                name: "Sarah Johnson",
                                                role: "Chief Executive Officer",
                                                image: "/images/ourteam/1.jpg",
                                                bio: "Visionary leader with 20+ years in enterprise software solutions.",
                                                expertise: ["Strategic Planning", "Business Development", "Leadership"]
                                              },
                                              {
                                                name: "Michael Chen",
                                                role: "Chief Technology Officer",
                                                image: "/images/ourteam/2.jpg",
                                                bio: "Technology expert specializing in NetSuite implementations and cloud solutions.",
                                                expertise: ["NetSuite Development", "Cloud Architecture", "System Integration"]
                                              },
                                              {
                                                name: "Emily Rodriguez",
                                                role: "Head of Operations",
                                                image: "/images/ourteam/3.jpg",
                                                bio: "Operations specialist ensuring seamless project delivery and client success.",
                                                expertise: ["Project Management", "Process Optimization", "Quality Assurance"]
                                              }
                                            ]
                                          },
                                          AboutValuesSection: {
                                            title: "Our Values",
                                            description: "These core values guide everything we do and shape how we interact with our clients, partners, and each other.",
                                            items: [
                                              {
                                                title: "Innovation",
                                                description: "We embrace cutting-edge technologies and creative thinking to solve complex business challenges.",
                                                icon: "🚀",
                                                color: "from-blue-500 to-cyan-500"
                                              },
                                              {
                                                title: "Excellence",
                                                description: "We deliver exceptional quality in every project, exceeding client expectations consistently.",
                                                icon: "⭐",
                                                color: "from-purple-500 to-pink-500"
                                              },
                                              {
                                                title: "Integrity",
                                                description: "We act with honesty and transparency, building trust through ethical business practices.",
                                                icon: "🤝",
                                                color: "from-green-500 to-teal-500"
                                              },
                                              {
                                                title: "Partnership",
                                                description: "We work closely with our clients as trusted partners in their digital transformation journey.",
                                                icon: "🤝",
                                                color: "from-orange-500 to-red-500"
                                              }
                                            ]
                                          },
                                          AboutMilestonesSection: {
                                            title: "Our Milestones",
                                            description: "Key achievements and milestones that mark our journey of growth, innovation, and commitment to excellence.",
                                            items: [
                                              {
                                                year: "2008",
                                                title: "Company Founded",
                                                description: "Bellatrix was established with a vision to transform businesses through technology."
                                              },
                                              {
                                                year: "2012",
                                                title: "First 100 Clients",
                                                description: "Reached our first major milestone of serving 100 satisfied clients."
                                              },
                                              {
                                                year: "2016",
                                                title: "NetSuite Gold Partner",
                                                description: "Achieved NetSuite Gold Partner status, recognizing our expertise."
                                              },
                                              {
                                                year: "2020",
                                                title: "Global Expansion",
                                                description: "Expanded operations to serve clients across multiple continents."
                                              },
                                              {
                                                year: "2023",
                                                title: "500+ Projects",
                                                description: "Successfully completed over 500 implementation projects."
                                              },
                                              {
                                                year: "2024",
                                                title: "AI Integration",
                                                description: "Pioneered AI-powered solutions for enhanced business intelligence."
                                              }
                                            ]
                                          },
                                          AboutDifferentiatorsSection: {
                                            title: "What Sets Us Apart",
                                            description: "Our unique combination of expertise, methodology, and commitment to excellence makes us the preferred choice for Oracle NetSuite implementations.",
                                            items: [
                                              {
                                                title: "Industry Expertise",
                                                description: "Deep understanding of various industries and their unique challenges.",
                                                stats: "15+ Industries",
                                                icon: "🏭"
                                              },
                                              {
                                                title: "Proven Methodology",
                                                description: "Time-tested implementation methodology ensuring project success.",
                                                stats: "98% Success Rate",
                                                icon: "📊"
                                              },
                                              {
                                                title: "Ongoing Support",
                                                description: "24/7 support and maintenance services for continuous optimization.",
                                                stats: "24/7 Support",
                                                icon: "🛠️"
                                              },
                                              {
                                                title: "Custom Solutions",
                                                description: "Tailored solutions designed specifically for your business needs.",
                                                stats: "100% Custom",
                                                icon: "⚙️"
                                              }
                                            ]
                                          },
                                          AboutCTASection: {
                                            title: "Ready to Build Something Great?",
                                            subtitle: "Let's collaborate to transform your business with innovative Oracle NetSuite solutions that drive growth, efficiency, and success.",
                                            description: "Contact us today to discuss how we can help you optimize your operations and drive growth.",
                                            ctaButton: { text: "Start Consultation", link: "/contact", variant: "primary" },
                                            features: [
                                              { title: "Quick Start", description: "Get started our consultation" },
                                              { title: "Expert Team", description: "Work with certified professionals" },
                                              { title: "Proven Results", description: "Join our success stories" }
                                            ]
                                          }
                                        };
                                        
                                        return aboutDataMap[component.componentType] || componentSchema.defaultData;
                                      }
                                      
                                      // For Payroll components, use actual payroll data
                                      if (component.componentType.includes('Payroll')) {
                                        const payrollDataMap = {
                                          PayrollHeroSection: {
                                            title: "Transform Your Payroll Process",
                                            subtitle: "Streamline operations with our intelligent, automated payroll system",
                                            description: "Our comprehensive payroll solution automates complex processes and ensures accuracy.",
                                            backgroundImage: "/images/payroll-hero.jpg"
                                          },
                                          PayrollHowItWorksSection: {
                                            title: "How Our Payroll System Works",
                                            description: "Our payroll process is simple: upload employee and contract details, sync timesheets and leave data, let the system run payroll automatically on schedule, approve via role-based access, execute payments through integrated bank APIs, and download payslips & compliance-ready reports—all in one platform.",
                                            steps: [
                                              { title: "Data Input", description: "Enter employee data and hours", icon: "📝" },
                                              { title: "Processing", description: "System calculates payroll automatically", icon: "⚙️" },
                                              { title: "Approval", description: "Review and approve payroll", icon: "✅" }
                                            ]
                                          },
                                          PayrollPainPointsSection: {
                                            title: "The Payroll Struggles We Eliminate",
                                            description: "Our system addresses the most common payroll challenges faced by consultancy firms:",
                                            painPoints: [
                                              { title: "Delayed salary processing and errors", description: "Manual processing leads to delays and mistakes" },
                                              { title: "Manual tax calculations and compliance risks", description: "Complex tax calculations prone to errors" },
                                              { title: "Lack of visibility and transparency", description: "Employees lack insight into their payroll" }
                                            ]
                                          },
                                          PayrollFAQSection: {
                                            title: "Common Questions",
                                            description: "Get quick answers to the most frequently asked questions about our payroll system",
                                            faqItems: [
                                              { question: "Does this system support global payroll?", answer: "Yes, we support multi-country and multi-currency payroll operations." },
                                              { question: "Can it integrate with our existing HR system?", answer: "Absolutely, we offer seamless integrations and open APIs." },
                                              { question: "How long does implementation take?", answer: "Most companies are onboarded in less than 2 weeks." }
                                            ]
                                          },
                                          PayrollCTASection: {
                                            title: "Ready to Simplify Your Payroll?",
                                            subtitle: "Get started today",
                                            description: "Get in touch for a personalized demo and see how our solution can transform your payroll process.",
                                            ctaButton: { text: "Request Now!", link: "/contact" }
                                          }
                                        };
                                        
                                        return payrollDataMap[component.componentType] || componentSchema.defaultData;
                                      }
                                      
                                      // For HR components, use actual HR data
                                      if (component.componentType.includes('HR')) {
                                        const hrDataMap = {
                                          HRHeroSection: {
                                            title: "nada HR, Payroll & People Management",
                                            subtitle: "Automate HR, empower employees, and stay compliant—on one secure platform designed for the future of work.",
                                            description: "Our comprehensive HR solution simplifies employee management.",
                                            backgroundImage: "/images/hr-hero.jpg"
                                          },
                                          HRModulesSection: {
                                            title: "HR Modules",
                                            description: "Comprehensive HR modules for modern businesses",
                                            modules: [
                                              { title: "Employee Management", description: "Complete employee lifecycle management from hiring to offboarding with customizable workflows.", icon: "👥" },
                                              { title: "Time & Attendance", description: "Automated time tracking, shift planning, overtime management, and absence tracking.", icon: "⏱️" },
                                              { title: "Payroll & Compensation", description: "End-to-end payroll processing, tax filing, benefits administration, and compensation planning.", icon: "💰" }
                                            ]
                                          },
                                          HRBenefitsSection: {
                                            title: "Why Choose Our HR Solution?",
                                            description: "Discover the key advantages that make our HR platform the smart choice for modern businesses of all sizes and industries.",
                                            features: [
                                              { title: "Payroll Automation", description: "Automate payroll processing, tax calculations, and compliance with built-in error checking and real-time updates." },
                                              { title: "Centralized Employee Data", description: "All employee records, contracts, documents, and history in one secure, searchable cloud-based platform." },
                                              { title: "Streamlined Onboarding", description: "Digitize onboarding with automated workflows, e-signatures, task assignments, and welcome packages." }
                                            ]
                                          },
                                          HRPricingSection: {
                                            title: "Pricing Plans",
                                            description: "Choose the right plan for your needs",
                                            pricing: [
                                              { name: "Essential", price: "$2,500", description: "Perfect for small teams getting started with HR automation", features: ["Basic system analysis & configuration", "Standard implementation setup", "Core HR module implementation"] },
                                              { name: "Professional", price: "$5,000", description: "Ideal for growing companies with complex HR needs", features: ["Comprehensive needs analysis", "Custom implementation & configuration", "Multiple module implementation"] },
                                              { name: "Enterprise", price: "Custom", description: "Complete solution for large organizations with global teams", features: ["Enterprise-grade analysis & planning", "Fully customized implementation", "All modules & advanced features"] }
                                            ]
                                          },
                                          HRFAQSection: {
                                            title: "Frequently Asked Questions",
                                            faq: {
                                              title: "HR Solution FAQ",
                                              items: [
                                                { question: "Is my employee data secure and compliant?", answer: "Yes. We use enterprise-grade 256-bit encryption, regular security audits, and are fully GDPR, SOC 2, and ISO 27001 compliant." },
                                                { question: "Can I integrate with my existing payroll and accounting software?", answer: "Absolutely. We offer pre-built integrations with all major payroll providers and accounting software." },
                                                { question: "How long does implementation typically take?", answer: "Implementation time varies based on complexity: Essential (2-3 weeks), Professional (3-5 weeks), Enterprise (6-8 weeks)." }
                                              ]
                                            }
                                          },
                                          HRCTASection: {
                                            title: "Ready to Transform Your HR Operations?",
                                            subtitle: "Get started today",
                                            description: "Join 10,000+ companies that have automated their HR processes and reduced administrative workload by 70%",
                                            ctaButton: { text: "Start Free Trial", link: "/contact" }
                                          }
                                        };
                                        
                                        return hrDataMap[component.componentType] || componentSchema.defaultData;
                                      }
                                      
                                      // For other components, use schema default data
                                      return componentSchema.defaultData;
                                    })();

                                console.log("📊 [DATA EXTRACTION]", {
                                  componentType: component.componentType,
                                  hasContentJson: !!component.contentJson,
                                  extractedData: actualData,
                                  defaultData: componentSchema.defaultData
                                });

                                // Filter data to only include fields that exist in schema
                                const filteredData = {};
                                if (componentSchema.schema && componentSchema.schema.properties) {
                                  Object.keys(componentSchema.schema.properties).forEach(key => {
                                    if (actualData && key in actualData) {
                                      filteredData[key] = actualData[key];
                                    }
                                  });
                                }

                                console.log("🔍 [DATA FILTERING]", {
                                  componentType: component.componentType,
                                  originalDataKeys: actualData ? Object.keys(actualData) : [],
                                  schemaKeys: componentSchema.schema ? Object.keys(componentSchema.schema.properties) : [],
                                  filteredDataKeys: Object.keys(filteredData),
                                  hasItemsInOriginal: actualData && 'items' in actualData,
                                  hasItemsInSchema: componentSchema.schema && 'items' in componentSchema.schema.properties,
                                  hasItemsInFiltered: 'items' in filteredData
                                });

                                return (
                                  <DynamicFormGenerator
                                    schema={componentSchema.schema}
                                    data={filteredData}
                                    onChange={(formData) => {
                                      console.log("📝 [FORM CHANGE] New form data:", formData);
                                      // Update the entire contentJson with new form data
                                      handleComponentUpdate(
                                        index,
                                        "contentJson",
                                        JSON.stringify(formData, null, 2)
                                      );
                                    }}
                                    onFieldChange={(field, value) => {
                                      console.log("🎯 [FIELD CHANGE]", field, value);
                                      // Update individual field for immediate feedback
                                      const currentContentData = component.contentJson 
                                        ? JSON.parse(component.contentJson) 
                                        : actualData;
                                      
                                      // Handle nested field updates (e.g., "features.0.title")
                                      const updatedContentData = { ...currentContentData };
                                      const fieldPath = field.split('.');
                                      
                                      if (fieldPath.length === 1) {
                                        // Simple field update
                                        updatedContentData[field] = value;
                                      } else {
                                        // Nested field update
                                        let current = updatedContentData;
                                        for (let i = 0; i < fieldPath.length - 1; i++) {
                                          if (!current[fieldPath[i]]) {
                                            current[fieldPath[i]] = {};
                                          }
                                          current = current[fieldPath[i]];
                                        }
                                        current[fieldPath[fieldPath.length - 1]] = value;
                                      }
                                      
                                      handleComponentUpdate(
                                        index,
                                        "contentJson",
                                        JSON.stringify(updatedContentData, null, 2)
                                      );
                                    }}
                                    componentType={component.componentType}
                                  />
                                );
                              } else {
                                // Generate dynamic schema from existing component data
                                console.log("🔧 [DYNAMIC SCHEMA] No predefined schema found, generating dynamic schema for:", component.componentType);
                                
                                // Parse existing data or use empty object
                                const existingData = component.contentJson 
                                  ? JSON.parse(component.contentJson) 
                                  : {};
                                
                                console.log("🔧 [DYNAMIC SCHEMA] Existing data:", existingData);
                                
                                // Generate schema based on existing data structure
                                const dynamicSchema = generateDynamicSchema(existingData, component.componentType);
                                
                                console.log("🔧 [DYNAMIC SCHEMA] Generated schema:", dynamicSchema);

                                return (
                                  <DynamicFormGenerator
                                    schema={dynamicSchema.schema}
                                    data={existingData}
                                    onChange={(formData) => {
                                      console.log("🎯 [DYNAMIC FORM] Data changed:", formData);
                                      handleComponentUpdate(
                                        index,
                                        "contentJson",
                                        JSON.stringify(formData, null, 2)
                                      );
                                    }}
                                    onFieldChange={(field, value) => {
                                      console.log("🎯 [DYNAMIC FIELD] Field changed:", field, value);
                                      // Update individual field for immediate feedback
                                      const currentContentData = component.contentJson 
                                        ? JSON.parse(component.contentJson) 
                                        : existingData;
                                      
                                      // Handle nested field updates (e.g., "features.0.title")
                                      const updatedContentData = { ...currentContentData };
                                      const fieldPath = field.split('.');
                                      
                                      if (fieldPath.length === 1) {
                                        // Simple field update
                                        updatedContentData[field] = value;
                                      } else {
                                        // Nested field update
                                        let current = updatedContentData;
                                        for (let i = 0; i < fieldPath.length - 1; i++) {
                                          if (!current[fieldPath[i]]) {
                                            current[fieldPath[i]] = {};
                                          }
                                          current = current[fieldPath[i]];
                                        }
                                        current[fieldPath[fieldPath.length - 1]] = value;
                                      }
                                      
                                      handleComponentUpdate(
                                        index,
                                        "contentJson",
                                        JSON.stringify(updatedContentData, null, 2)
                                      );
                                    }}
                                    componentType={component.componentType}
                                    className="text-white [&_label]:text-gray-300"
                                  />
                                );
                              }
                            })()}
                          </div>
                        )}

                        {/* Raw JSON View */}
                        {component.viewMode === "json" && (
                          <>
                            <textarea
                              rows={6}
                              value={component.contentJson || "{}"}
                              onChange={(e) =>
                                handleComponentUpdate(
                                  index,
                                  "contentJson",
                                  e.target.value
                                )
                              }
                              placeholder='{"title": "Example Title", "description": "Example Description"}'
                              className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm font-mono text-sm resize-none"
                            />
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs text-gray-400">
                                Enter valid JSON data for this component
                              </p>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const formatted = validateAndFormatJSON(
                                    component.contentJson || "{}"
                                  );
                                  handleComponentUpdate(
                                    index,
                                    "contentJson",
                                    formatted
                                  );
                                }}
                                className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-200 text-xs px-2 py-1"
                              >
                                Format JSON
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Preview Section */}
      <LivePreview
        components={pageData.components.filter(
          (comp) => comp.isVisible !== false && comp.isVisible !== 0
        )}
        previewMode="desktop"
        showDebugInfo={false}
        className="mt-6"
        key={`preview-${pageData.components.map(c => c.contentJson).join('|').slice(0, 100)}`}
      />
    </div>
  );
};

// Step 3: Review
const ReviewStep = ({ pageData }) => {
  const [isEditMode, setIsEditMode] = useState(true);
  const [availableComponents] = useState([
    { componentType: "HeroSection", icon: "🎯" },
    { componentType: "HRHeroSection", icon: "👥" },
    { componentType: "PayrollHeroSection", icon: "💰" },
    { componentType: "HRModulesSection", icon: "📦" },
    { componentType: "ServiceGrid", icon: "⚙️" },
    { componentType: "ImplementationProcessSection", icon: "🔄" },
    { componentType: "HRPricingSection", icon: "💵" },
    { componentType: "PayrollFAQSection", icon: "❓" },
    { componentType: "PayrollCTASection", icon: "🚀" },
    { componentType: "AboutMissionSection", icon: "🎯" },
    { componentType: "AboutTeamSection", icon: "👥" },
  ]);

  // Helper function to filter components based on mode and visibility
  const getVisibleComponents = (components, isEditing = isEditMode) => {
    if (!Array.isArray(components)) return [];

    return components.filter((component) => {
      // In edit mode, show all components
      if (isEditing) {
        return true;
      }

      // In view mode, only show visible components
      // Handle both boolean and integer values for isVisible
      return component.isVisible === true || component.isVisible === 1;
    });
  };

  const getComponentIcon = (componentType) => {
    return (
      availableComponents.find((c) => c.componentType === componentType)
        ?.icon || "📄"
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Summary */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl font-bold">
            Page Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Page Name
              </label>
              <p className="text-white font-semibold">{pageData.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                URL Slug
              </label>
              <p className="text-white font-semibold">/{pageData.slug}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Category ID
              </label>
              <p className="text-white font-semibold">{pageData.categoryId}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Homepage
              </label>
              <p className="text-white font-semibold">
                {pageData.isHomepage ? "Yes" : "No"}
              </p>
            </div>
          </div>

          {pageData.metaTitle && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                SEO Meta Title
              </label>
              <p className="text-white">{pageData.metaTitle}</p>
            </div>
          )}

          {pageData.metaDescription && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                SEO Meta Description
              </label>
              <p className="text-white">{pageData.metaDescription}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Components Summary */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white text-xl font-bold">
              Components ({getVisibleComponents(pageData.components).length}
              {!isEditMode &&
              pageData.components.length >
                getVisibleComponents(pageData.components).length
                ? ` of ${pageData.components.length}`
                : ""}
              )
            </CardTitle>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-3 py-1 rounded text-sm transition-all duration-200 ${
                isEditMode
                  ? "bg-blue-500/20 text-blue-300 border border-blue-400 hover:bg-blue-500/30"
                  : "bg-gray-500/20 text-gray-300 border border-gray-400 hover:bg-gray-500/30"
              }`}
            >
              {isEditMode ? "👁️ View Mode" : "✏️ Edit Mode"}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {pageData.components.length === 0 ? (
            <div className="text-center py-8">
              <ExclamationTriangleIcon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <p className="text-yellow-300">
                No components added to this page
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pageData.components.map((component, index) => {
                const isVisible =
                  component.isVisible === true || component.isVisible === 1;
                const themeClass = component.theme === 1 ? "light" : "dark";

                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 ${
                      !isVisible
                        ? "bg-red-500/10 border-red-400/30 opacity-60"
                        : component.theme === 1
                        ? "bg-yellow-500/10 border-yellow-400/30"
                        : "bg-purple-500/10 border-purple-400/30"
                    }`}
                    style={{
                      display: isVisible ? "flex" : "none",
                    }}
                    data-theme={themeClass}
                  >
                    <div className="text-xl">
                      {getComponentIcon(component.componentType)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">
                        {component.componentName}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {component.componentType}
                      </p>
                    </div>
                    <div className="text-gray-400 text-sm">
                      Order: {component.orderIndex}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* JSON Preview */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl font-bold">
            Request Body Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
            <pre className="text-green-400 text-sm">
              {JSON.stringify(pageData, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedPageBuilder;
