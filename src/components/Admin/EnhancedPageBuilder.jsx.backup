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
import {
  generateDynamicSchema,
  mergeDynamicSchema,
} from "../../utils/dynamicSchemaGenerator";
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
  const [useNewInputSystem, setUseNewInputSystem] = useState(true); // Toggle for new input system

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
  const debouncedAutoSave = useCallback(
    (componentIndex, componentData) => {
      // Clear any existing timeout
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      // Set new timeout for auto-save
      autoSaveTimeoutRef.current = setTimeout(() => {
        const component = pageData.components[componentIndex];
        if (!component?.id || !pageData.id) {
          console.log(
            "⚠️ [AUTO-SAVE] Skipping auto-save - component or page not saved yet"
          );
          return;
        }

        const updateData = {
          id: component.id,
          pageId: pageData.id,
          componentType: component.componentType,
          componentName: component.componentName || "",
          contentJson: JSON.stringify(componentData, null, 2),
          orderIndex:
            component.orderIndex !== undefined
              ? component.orderIndex
              : componentIndex,
          isVisible: Boolean(
            component.isVisible === true || component.isVisible === 1
          ),
          theme: component.theme === 1 ? 1 : 2,
        };

        console.log("💾 [AUTO-SAVE] Saving component:", {
          componentType: component.componentType,
          componentId: component.id,
          dataKeys: Object.keys(componentData),
        });

        pagesAPI
          .updatePageComponent(component.id, updateData)
          .then(() => {
            console.log("✅ [AUTO-SAVE] Component saved successfully");
          })
          .catch((error) => {
            console.error("❌ [AUTO-SAVE] Failed to save component:", error);
          });
      }, 1500); // 1.5 second delay
    },
    [pageData.components, pageData.id]
  );

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
        const { getAllComponents } = await import(
          "../../data/componentRegistry"
        );
        const registryComponents = getAllComponents();

        console.log(
          "📦 [COMPONENT REGISTRY] Loaded components from registry:",
          registryComponents.length
        );

        // Convert registry components to the format expected by the builder
        const formattedComponents = registryComponents.map((comp) => ({
          id: comp.componentType,
          name:
            comp.componentName ||
            comp.componentType.replace(/([A-Z])/g, " $1").trim(),
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
          dataStructure: comp.dataStructure,
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
        const registryComponentTypes = new Set(
          formattedComponents.map((c) => c.componentType)
        );
        const additionalItems = Object.keys(idToPathMap)
          .filter((componentType) => !registryComponentTypes.has(componentType))
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
          totalComponents: allComponents.length,
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
          "AboutMissionSection",
          "AboutTeamSection",
          "AboutValuesSection",
          "AboutJourneySection",
          "AboutMilestonesSection",
          "AboutDifferentiatorsSection",
          "AboutCTASection",
          "AboutHeroSection",
        ];

        aboutComponents.forEach((compType) => {
          try {
            schemas[compType] = getAboutComponentSchema(compType);
          } catch (error) {
            console.warn(
              `⚠️ [SCHEMA LOAD] Failed to load schema for ${compType}:`,
              error
            );
          }
        });

        // Pre-load schemas for general components
        const generalComponents = [
          "PayrollHeroSection",
          "PayrollHowItWorksSection",
          "PayrollWorkflowSection",
          "PayrollStepperSection",
          "PayrollPainPointsSection",
          "PayrollFAQSection",
          "PayrollCTASection",
          "HRHeroSection",
          "HRModulesSection",
          "HRBenefitsSection",
          "HRUseCasesSection",
          "HRPricingSection",
          "HRFAQSection",
          "HRCTASection",
        ];

        generalComponents.forEach((compType) => {
          try {
            schemas[compType] = getGeneralComponentSchema(compType);
          } catch (error) {
            console.warn(
              `⚠️ [SCHEMA LOAD] Failed to load general schema for ${compType}:`,
              error
            );
          }
        });

        setComponentSchemas(schemas);
        console.log(
          "✅ [SCHEMAS LOADED] Available schemas:",
          Object.keys(schemas)
        );
      } catch (error) {
        console.error(
          "❌ [SCHEMA LOAD ERROR] Failed to load component schemas:",
          error
        );
      }
    };

    loadSchemas();
  }, []);

  // UI State
  const [editingComponent, setEditingComponent] = useState(null);
  const [showSectionEditor, setShowSectionEditor] = useState(false);
  const [showPagePreview, setShowPagePreview] = useState(false);
  const [componentSchemas, setComponentSchemas] = useState({});

  // New Input System State
  const [showNewInputModal, setShowNewInputModal] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [useNewInputSystemState, setUseNewInputSystemState] = useState(true);

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
        const componentSchema = getAboutComponentSchema(
          component.componentType
        );
        if (componentSchema && componentSchema.defaultData) {
          defaultContent = {
            ...defaultContent,
            ...componentSchema.defaultData,
          };
          console.log(
            `📋 [SCHEMA DEFAULT] Using schema defaults for ${component.componentType}:`,
            componentSchema.defaultData
          );
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

        // Make async API call (don't await to keep UI responsive)
        pagesAPI
          .updatePageComponent(component.id, updateData)
          .then(() => {
            showToast(`${field} updated successfully`, "success");
          })
          .catch((error) => {
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
      }
    }

    // Immediate API sync for critical AboutMissionSection fields (real-time synchronization)
    if (
      pageData.components[index]?.componentType === "AboutMissionSection" &&
      (field === "title" ||
        field === "description" ||
        field === "vision" ||
        field === "subtitle")
    ) {
      const component = pageData.components[index];
      if (component?.id && pageData.id) {
        const currentContentData = (() => {
          try {
            return JSON.parse(component.contentJson || "{}");
          } catch {
            return {};
          }
        })();

        const updateData = {
          id: component.id,
          pageId: pageData.id,
          componentType: component.componentType,
          componentName: component.componentName || "",
          contentJson: JSON.stringify(
            {
              ...currentContentData,
              [field]: value,
            },
            null,
            2
          ),
          orderIndex:
            component.orderIndex !== undefined ? component.orderIndex : index,
          isVisible: Boolean(
            component.isVisible === true || component.isVisible === 1
          ),
          theme: component.theme === 1 ? 1 : 2,
        };

        pagesAPI.updatePageComponent(component.id, updateData).catch(() => {});
      }
    }
  };

  // Generate component-specific default data from JSON files
  const generateDefaultDataFromJSON = () => {
    return {
      // About Components (from about.json)
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

      AboutMissionSection: {
        title: "Our Mission",
        description:
          "To empower businesses with innovative technology solutions that transform operations, enhance productivity, and drive sustainable growth.",
        vision:
          "To be the global leader in business transformation consulting, helping organizations achieve their full potential through technology excellence.",
      },

      AboutJourneySection: {
        title: "Our Journey",
        description:
          "From humble beginnings to becoming a trusted global partner",
        timeline: [
          {
            year: "2008",
            title: "Company Founded",
            description:
              "Bellatrix was established with a vision to transform businesses through technology.",
          },
          {
            year: "2012",
            title: "First 100 Clients",
            description:
              "Reached our first major milestone of serving 100 satisfied clients.",
          },
          {
            year: "2016",
            title: "NetSuite Gold Partner",
            description:
              "Achieved NetSuite Gold Partner status, recognizing our expertise.",
          },
          {
            year: "2020",
            title: "Global Expansion",
            description:
              "Expanded operations to serve clients across multiple continents.",
          },
          {
            year: "2023",
            title: "500+ Projects",
            description:
              "Successfully completed over 500 implementation projects.",
          },
          {
            year: "2024",
            title: "AI Integration",
            description:
              "Pioneered AI-powered solutions for enhanced business intelligence.",
          },
        ],
      },

      AboutTeamSection: {
        title: "Meet Our Team",
        description: "Experienced professionals dedicated to your success",
        members: [
          {
            name: "Sarah Johnson",
            role: "Chief Executive Officer",
            image: "/images/ourteam/1.jpg",
            bio:
              "Visionary leader with 20+ years in enterprise software solutions.",
            expertise: [
              "Strategic Planning",
              "Business Development",
              "Leadership",
            ],
          },
          {
            name: "Michael Chen",
            role: "Chief Technology Officer",
            image: "/images/ourteam/2.jpg",
            bio:
              "Technology expert specializing in NetSuite implementations and cloud solutions.",
            expertise: [
              "NetSuite Development",
              "Cloud Architecture",
              "System Integration",
            ],
          },
          {
            name: "Emily Rodriguez",
            role: "Head of Operations",
            image: "/images/ourteam/3.jpg",
            bio:
              "Operations specialist ensuring seamless project delivery and client success.",
            expertise: [
              "Project Management",
              "Process Optimization",
              "Quality Assurance",
            ],
          },
        ],
      },

      AboutValuesSection: {
        title: "Our Values",
        description: "The principles that guide everything we do",
        items: [
          {
            title: "Innovation",
            description:
              "We embrace cutting-edge technologies and creative thinking to solve complex business challenges.",
            color: "from-blue-500 to-cyan-500",
            icon: "🚀",
          },
          {
            title: "Excellence",
            description:
              "We deliver exceptional quality in every project, exceeding client expectations consistently.",
            color: "from-purple-500 to-pink-500",
            icon: "⭐",
          },
          {
            title: "Integrity",
            description:
              "We act with honesty and transparency, building trust through ethical business practices.",
            color: "from-green-500 to-teal-500",
            icon: "🤝",
          },
        ],
      },

      AboutDifferentiatorsSection: {
        title: "What Makes Us Different",
        description: "Key factors that set us apart from the competition",
        items: [
          {
            title: "Industry Expertise",
            description:
              "Deep understanding of various industries and their unique challenges.",
            stats: "15+ Industries",
            icon: "🏭",
          },
          {
            title: "Proven Methodology",
            description:
              "Time-tested implementation methodology ensuring project success.",
            stats: "98% Success Rate",
            icon: "📊",
          },
          {
            title: "Ongoing Support",
            description:
              "24/7 support and maintenance services for continuous optimization.",
            stats: "24/7 Support",
            icon: "🛠️",
          },
        ],
      },

      // HR Components (from hr.json)
      HRHeroSection: {
        title: "HR, Payroll & People Management",
        subtitle:
          "Automate HR, empower employees, and stay compliant—on one secure platform designed for the future of work.",
        bgVideo: "/Videos/hrVideo.mp4",
        bgColor: "bg-gradient-to-br from-[#191970] via-black to-blue-700",
      },

      HRFeaturesSection: {
        title: "Why Choose Our HR Solution?",
        description:
          "Discover the key advantages that make our HR platform the smart choice for modern businesses of all sizes and industries.",
        items: [
          {
            icon: "💸",
            title: "Payroll Automation",
            desc:
              "Automate payroll processing, tax calculations, and compliance with built-in error checking and real-time updates.",
          },
          {
            icon: "📂",
            title: "Centralized Employee Data",
            desc:
              "All employee records, contracts, documents, and history in one secure, searchable cloud-based platform.",
          },
          {
            icon: "🚀",
            title: "Digital Onboarding",
            desc:
              "Digitize onboarding with automated workflows, e-signatures, task assignments, and welcome packages.",
          },
        ],
      },

      HRModulesSection: {
        title: "Product Modules",
        description:
          "Our platform is built from modular components to cover every aspect of HR, payroll, and compliance.",
        modules: [
          {
            icon: "👥",
            title: "Employee Management",
            desc:
              "Complete employee lifecycle management from hiring to offboarding with customizable workflows.",
          },
          {
            icon: "⏱️",
            title: "Time & Attendance",
            desc:
              "Automated time tracking, shift planning, overtime management, and absence tracking.",
          },
          {
            icon: "💰",
            title: "Payroll & Compensation",
            desc:
              "End-to-end payroll processing, tax filing, benefits administration, and compensation planning.",
          },
        ],
      },

      HRPricingSection: {
        title: "HR Pricing Plans",
        description:
          "Choose the perfect plan for your organization's HR needs.",
        pricing: [
          {
            name: "Essential",
            description:
              "Perfect for small teams getting started with HR automation",
            price: "$2,500",
            priceNote: "one-time implementation",
            features: [
              "Core HR modules setup",
              "Employee data migration",
              "Basic payroll configuration",
              "User training for up to 5 administrators",
            ],
            ctaText: "Start with Essential",
            isPopular: false,
          },
          {
            name: "Professional",
            description: "Ideal for growing companies with complex HR needs",
            price: "$5,000",
            priceNote: "one-time implementation",
            isPopular: true,
            features: [
              "All Essential features",
              "Advanced reporting setup",
              "Custom workflow configuration",
              "Integration with 3rd party tools",
            ],
            ctaText: "Choose Professional",
          },
        ],
      },

      // Payroll Components (from payroll.json)
      PayrollHeroSection: {
        title: "Transform Your Payroll Process",
        subtitle:
          "Streamline operations with our intelligent, automated payroll system",
      },

      PayrollPainPointsSection: {
        title: "The Payroll Struggles We Eliminate",
        description:
          "Our system addresses the most common payroll challenges faced by consultancy firms:",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        items: [
          { text: "Delayed salary processing and errors", icon: "time" },
          {
            text: "Manual tax calculations and compliance risks",
            icon: "check",
          },
          {
            text: "Lack of visibility and transparency for employees",
            icon: "user",
          },
          {
            text: "Difficulty scaling payroll operations across geographies",
            icon: "globe",
          },
        ],
      },

      PayrollWorkflowSection: {
        title: "Payroll System Built for All Industries",
        description:
          "Streamline your entire payroll lifecycle — from onboarding to salary disbursement — with a secure, intuitive platform.",
        subtitle: "Core Workflow",
        steps: [
          {
            title: "Employee data import",
            desc: "Easily onboard and manage employee records in one place.",
            details:
              "Import employee data from spreadsheets or integrated HR systems. Supports bulk uploads and data validation with real-time error checking.",
            benefits: [
              "Bulk data import from Excel/CSV",
              "Real-time validation and error checking",
              "Integration with existing HR systems",
              "Automated employee record creation",
            ],
          },
          {
            title: "Time & attendance sync",
            desc: "Integrate timesheets and attendance for accurate payroll.",
            details:
              "Syncs with your time tracking tools to ensure accurate hours and leave data for every employee.",
            benefits: [
              "Automatic timesheet integration",
              "Leave balance calculations",
              "Overtime and holiday tracking",
              "Multi-location support",
            ],
          },
        ],
      },

      PayrollFeaturesSection: {
        title: "Key Features for Modern Consultancies",
        items: [
          {
            title: "Automated Calculations",
            description: "Smart payroll processing with tax compliance",
            icon: "lightning",
          },
          {
            title: "Multi-Currency Support",
            description: "Handle global payroll across different currencies",
            icon: "globe",
          },
        ],
      },

      // Implementation Components (from Implementation.json)
      ImplementationHeroSection: {
        backgroundVideo: "/Videos/HomeHeroSectionV.mp4",
        titleParts: ["Where", "Vision", "Meets", "Reality"],
        description:
          "We don't just implement solutions—we craft digital experiences that transform the way you do business",
        ctaButton: {
          text: "Start Implementation",
          icon: "M13 7l5 5m0 0l-5 5m5-5H6",
        },
      },

      ImplementationProcessSection: {
        title: "Our Implementation Process",
        subtitle: "A proven methodology for seamless business transformation",
        image: "/Videos/implementation/implementProcess.jpg",
        steps: [
          {
            number: 1,
            title: "Analysis & Planning",
            description: "System analysis and strategic roadmap creation",
            icon:
              "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
          },
          {
            number: 2,
            title: "Design & Development",
            description: "Custom solution design and development",
            icon:
              "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
          },
          {
            number: 3,
            title: "Testing & Integration",
            description: "Quality assurance and system integration",
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          },
          {
            number: 4,
            title: "Launch & Support",
            description: "Deployment and ongoing support",
            icon: "M13 10V3L4 14h7v7l9-11h-7z",
          },
        ],
        ctaButton: "Start Your Journey",
      },

      ImplementationWhyChooseSection: {
        title: "Why Choose Bellatrix for Implementation?",
        subtitle:
          "We bring years of expertise, proven methodologies, and cutting-edge solutions to ensure your implementation success",
        image: "/Videos/implementation/whyChoese.jpg",
        features: [
          {
            number: "01",
            title: "Proven Expertise",
            description: "500+ successful implementations across industries",
          },
          {
            number: "02",
            title: "Rapid Deployment",
            description: "50% faster implementation with proven tools",
          },
          {
            number: "03",
            title: "24/7 Support",
            description: "Round-the-clock technical support & monitoring",
          },
        ],
      },

      ImplementationPricingSection: {
        title: "Implementation Pricing",
        subtitle:
          "Choose the perfect implementation plan that fits your business needs and budget",
        plans: [
          {
            name: "Basic",
            description: "Perfect for small businesses",
            price: "$2,500",
            priceNote: "starting from",
            features: [
              "Standard NetSuite setup",
              "Basic data migration",
              "5 user accounts included",
              "2-week timeline",
              "Email support",
            ],
            ctaText: "Get Started",
          },
          {
            name: "Professional",
            description: "Ideal for growing companies",
            price: "$5,000",
            priceNote: "starting from",
            isPopular: true,
            features: [
              "Advanced configuration",
              "Complete data migration",
              "Up to 25 users",
              "Custom integrations",
              "Training sessions",
            ],
            ctaText: "Get Started",
          },
          {
            name: "Enterprise",
            description: "For large organizations",
            price: "Custom",
            priceNote: "pricing",
            features: [
              "Full customization",
              "Unlimited users",
              "Advanced integrations",
              "Dedicated support",
              "On-site training",
            ],
            ctaText: "Contact Sales",
          },
        ],
      },

      // Manufacturing Components (from manufacturing-data.json)
      ManufacturingHeroSection: {
        title: "Manufacturing Excellence",
        subtitle: "Powered by NetSuite",
        description:
          "Transform your manufacturing operations with integrated ERP solutions that streamline production, optimize inventory, and ensure quality compliance across your entire value chain.",
        backgroundImage:
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        ctaText: "Schedule Manufacturing Demo",
      },

      ManufacturingStatsSection: {
        items: [
          {
            value: "500+",
            label: "Manufacturing Clients",
            description: "Successful implementations",
          },
          {
            value: "40%",
            label: "Efficiency Gain",
            description: "Average improvement",
          },
          {
            value: "35%",
            label: "Cost Reduction",
            description: "In operational costs",
          },
          {
            value: "98%",
            label: "Client Satisfaction",
            description: "Success rate",
          },
        ],
      },

      ManufacturingChallengesSection: {
        title: "Manufacturing Challenges",
        description:
          "Modern manufacturing faces complex challenges that require integrated solutions to optimize operations and maintain quality standards.",
        items: [
          {
            title: "Complex Production Planning",
            description:
              "Managing multi-level BOMs, work orders, and production schedules across multiple facilities",
            icon:
              "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
            impact: "30% production delays",
          },
          {
            title: "Inventory Management Complexity",
            description:
              "Tracking raw materials, WIP, and finished goods across multiple locations with real-time visibility",
            icon:
              "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
            impact: "25% excess inventory",
          },
        ],
      },

      ManufacturingSolutionsSection: {
        title: "NetSuite Solutions",
        description:
          "Comprehensive manufacturing solutions that streamline your operations from production planning to quality control.",
        items: [
          {
            title: "Advanced Manufacturing",
            description:
              "Complete production planning with work orders, routing, and capacity planning",
            features: [
              "Multi-level BOMs",
              "Work order management",
              "Capacity planning",
              "Production reporting",
            ],
            benefits: "40% improvement in production efficiency",
          },
          {
            title: "Inventory & Warehouse Management",
            description: "Real-time inventory visibility across all locations",
            features: [
              "Multi-location inventory",
              "Serial/lot tracking",
              "Cycle counting",
              "Warehouse management",
            ],
            benefits: "35% reduction in inventory costs",
          },
        ],
      },

      // Retail Components (from retail-data.json)
      RetailHeroSection: {
        title: "Retail Excellence",
        description:
          "Transform your retail operations with integrated commerce solutions that unify online, mobile, and in-store experiences while optimizing inventory and enhancing customer satisfaction.",
        ctaText: "Talk to an Expert",
      },

      RetailStatsSection: {
        items: [
          {
            value: "300+",
            label: "Retail Clients",
            description: "Successful implementations",
          },
          {
            value: "50%",
            label: "Sales Growth",
            description: "Average improvement",
          },
          {
            value: "40%",
            label: "Cost Reduction",
            description: "In operational costs",
          },
          { value: "99%", label: "Uptime", description: "System availability" },
        ],
      },

      RetailChallengesSection: {
        title: "Retail Challenges",
        description:
          "Modern retail faces complex challenges that require integrated solutions to deliver exceptional customer experiences and maintain profitability.",
        items: [
          {
            title: "Omnichannel Inventory Management",
            description:
              "Managing inventory across multiple sales channels while maintaining real-time visibility",
            icon:
              "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
            impact: "35% inventory discrepancies",
          },
          {
            title: "Customer Experience Consistency",
            description:
              "Delivering consistent customer experience across online, mobile, and physical store touchpoints",
            icon:
              "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
            impact: "40% customer satisfaction issues",
          },
        ],
      },

      // Training Components (from training.json)
      TrainingHeroSection: {
        title: "Professional Training Programs",
        description:
          "Empower your team with comprehensive training solutions designed to enhance skills and drive success",
      },

      TrainingProgramsSection: {
        title: "Our Training Programs",
        description:
          "Comprehensive training solutions designed to empower your team with the skills they need to excel",
        image: "/images/traning.jpg",
        Professional_Badge: "Certified Training",
        programs: [
          {
            id: 1,
            title: "NetSuite Fundamentals",
            shortDescription: "Core concepts and navigation basics",
            icon:
              "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
          },
          {
            id: 2,
            title: "Advanced Modules",
            shortDescription: "Financial management and reporting",
            icon:
              "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
          },
        ],
      },

      TrainingFeaturesSection: {
        title: "Training Features",
        description: "What makes our training programs exceptional",
        features: [
          {
            id: 1,
            title: "Expert Instructors",
            shortDescription:
              "Certified professionals with years of experience",
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
        ],
      },

      // Consulting Components (from netSuiteConsulting.json)
      ConsultingHeroSection: {
        title: "NetSuite Consulting",
        description:
          "Strategic guidance and expert consulting to maximize your NetSuite investment and transform your business operations.",
        ctaText: "Talk to an Expert",
        ctaIcon:
          "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
      },

      ConsultingServicesSection: {
        title: "Our Consulting Services",
        description:
          "Comprehensive NetSuite consulting services designed to optimize your business processes and maximize your return on investment.",
        image: "/images/ourProServices.png",
        items: [
          {
            title: "NetSuite Implementation Strategy",
            description:
              "Comprehensive planning and roadmap development for successful NetSuite deployment",
            icon:
              "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
            features: [
              "Business process analysis and optimization",
              "System architecture design",
              "Implementation timeline and milestones",
            ],
          },
          {
            title: "Business Process Optimization",
            description:
              "Streamline your operations with NetSuite's powerful automation capabilities",
            icon:
              "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
            features: [
              "Workflow automation design",
              "Process standardization",
              "Performance optimization",
            ],
          },
        ],
      },

      // Integration Components (from integration-data.json)
      IntegrationHeroSection: {
        title: "NetSuite Integration Services",
        subtitle:
          "Connect NetSuite with your existing systems for seamless data flow",
      },

      IntegrationTypesSection: {
        title: "Integration Solutions",
        items: [
          {
            title: "E-commerce Integration",
            description:
              "Connect NetSuite with Shopify, Magento, WooCommerce, and other platforms",
            icon: "🛒",
          },
          {
            title: "CRM Integration",
            description:
              "Integrate with Salesforce, HubSpot, and other CRM systems",
            icon: "👥",
          },
          {
            title: "Payment Gateway Integration",
            description:
              "Connect with PayPal, Stripe, Square, and other payment processors",
            icon: "💳",
          },
          {
            title: "Warehouse Management",
            description: "Integrate with WMS systems for inventory management",
            icon: "📦",
          },
        ],
      },

      IntegrationBenefitsSection: {
        title: "Integration Benefits",
        items: [
          {
            title: "Automated Data Sync",
            description:
              "Eliminate manual data entry with real-time synchronization",
          },
          {
            title: "Improved Accuracy",
            description: "Reduce errors caused by manual data transfer",
          },
          {
            title: "Enhanced Productivity",
            description: "Save time and resources with automated processes",
          },
          {
            title: "Better Visibility",
            description:
              "Get a complete view of your business across all systems",
          },
        ],
      },

      // Customization Components (from customization.json)
      CustomizationHeroSection: {
        title: "NetSuite Customization & Development",
        subtitle:
          "Tailor NetSuite to fit your unique business processes and requirements",
      },

      CustomizationServicesSection: {
        title: "Our Customization Services",
        items: [
          {
            title: "Custom Workflows",
            description:
              "Design automated workflows that match your business processes",
            icon: "🔄",
          },
          {
            title: "Custom Fields & Forms",
            description:
              "Create custom fields and forms to capture your specific data",
            icon: "📝",
          },
          {
            title: "SuiteScript Development",
            description: "Advanced scripting to extend NetSuite functionality",
            icon: "💻",
          },
          {
            title: "Custom Reports & Dashboards",
            description:
              "Build tailored reports and dashboards for better insights",
            icon: "📊",
          },
        ],
      },

      CustomizationProcessSection: {
        title: "Our Development Process",
        steps: [
          {
            step: "01",
            title: "Requirements Analysis",
            description:
              "We analyze your business requirements and current NetSuite setup",
          },
          {
            step: "02",
            title: "Solution Design",
            description:
              "Design custom solutions that align with your business goals",
          },
          {
            step: "03",
            title: "Development & Testing",
            description: "Develop and thoroughly test all customizations",
          },
          {
            step: "04",
            title: "Deployment & Support",
            description: "Deploy solutions and provide ongoing support",
          },
        ],
      },

      // Home Page Components (from homeData.json)
      HomeHeroSection: {
        slides: [
          {
            title: "Strategic Business Transformations",
            subtitle: "Oracle NetSuite Consultancy",
            description:
              "Streamline operations and drive growth with our comprehensive NetSuite solutions.",
            video: "/Videos/HomeHeroSectionV.mp4",
            cta: "Explore Services",
          },
          {
            title: "Digital Optimization Experts",
            subtitle: "Cloud Solutions Specialists",
            description:
              "Enhance productivity with our tailored implementation and consulting services.",
            video: "/video2.mp4",
            cta: "View Case Studies",
          },
        ],
        stats: [
          { value: "200+", label: "Projects" },
          { value: "98%", label: "Satisfaction" },
          { value: "15+", label: "Years" },
        ],
      },

      HomeServicesSection: {
        sectionHeader: {
          title: "Our Professional Services",
          subtitle: "Comprehensive solutions tailored to your business needs",
          gradientText: "Professional Services",
        },
        services: [
          {
            title: "Strategic Consultation",
            description:
              "Expert analysis to optimize your NetSuite roadmap with actionable insights",
            icon: "LightbulbOutlined",
            color: "#10B981",
            details: [
              "Business process analysis",
              "ROI forecasting",
              "System architecture planning",
            ],
            stats: "92% client satisfaction rate",
            link: "/netsuite-consulting",
          },
          {
            title: "Implementation",
            description:
              "End-to-end deployment with minimal disruption to operations",
            icon: "BuildOutlined",
            color: "#0EA5E9",
            details: [
              "Phased rollout planning",
              "Data migration services",
              "Configuration best practices",
            ],
            stats: "40% faster than industry average",
            link: "/Implementation",
          },
        ],
        viewAllButton: {
          text: "View All Services",
        },
      },

      HomeTestimonialsSection: {
        sectionHeader: {
          title: "Trusted by Industry Leaders",
          subtitle:
            "Don't just take our word for it—here's what our clients say.",
          gradientText: "Trusted by Industry Leaders",
        },
        testimonials: [
          {
            name: "Ahmed Hassan",
            position: "CEO",
            company: "TechCorp Solutions",
            quote:
              "Bellatrix-iX transformed our business operations completely. Highly recommended!",
            rating: 5,
            image: "/images/testimonials/client1.jpg",
          },
        ],
        ctaButton: {
          text: "Contact This Client's Success Manager",
        },
      },

      HomeIndustriesSection: {
        sectionHeader: {
          chipLabel: "INDUSTRY SOLUTIONS",
          title: "Discover Modern Industry Solutions",
          highlightedWord: "Modern",
          description:
            "Explore how our blue-powered platform transforms your sector with interactive, tailored solutions.",
        },
        industries: [
          {
            title: "Manufacturing",
            subtitle: "Production Excellence",
            description:
              "Streamline manufacturing operations with integrated production planning, quality control, and supply chain management.",
            image: "/images/3.jpg",
            solutions: [
              "Production Planning",
              "Quality Control",
              "Inventory Management",
            ],
            link: "/industries/manufacturing",
          },
          {
            title: "Retail & E-commerce",
            subtitle: "Omnichannel Commerce",
            description:
              "Unify online and offline operations with comprehensive retail management and customer experience solutions.",
            image: "/images/6.jpg",
            solutions: [
              "POS Integration",
              "Inventory Sync",
              "Customer Analytics",
            ],
            link: "/industries/retail",
          },
        ],
      },

      // Generic Components
      TestimonialsSection: {
        title: "What Our Clients Say",
        description: "Real feedback from satisfied customers",
        testimonials: [
          {
            name: "Ahmed Hassan",
            position: "CEO",
            company: "TechCorp Solutions",
            quote:
              "Bellatrix-iX transformed our business operations completely. Highly recommended!",
            rating: 5,
            image: "/images/testimonials/client1.jpg",
          },
          {
            name: "Sarah Mohamed",
            position: "Operations Manager",
            company: "Global Enterprises",
            quote:
              "Outstanding service and support. The team exceeded our expectations.",
            rating: 5,
            image: "/images/testimonials/client2.jpg",
          },
        ],
      },

      FAQSection: {
        title: "Frequently Asked Questions",
        description: "Find answers to common questions about our services",
        faqs: [
          {
            question: "What is included in the ERP implementation?",
            answer:
              "Our ERP implementation includes system setup, data migration, user training, and ongoing support to ensure smooth operation.",
          },
          {
            question: "How long does the implementation process take?",
            answer:
              "Implementation timeline varies based on company size and complexity, typically ranging from 3-12 months.",
          },
          {
            question: "Do you provide training for our team?",
            answer:
              "Yes, we provide comprehensive training programs for all user levels, including administrators and end-users.",
          },
        ],
      },

      CTASection: {
        title: "Ready to Transform Your Business?",
        subtitle: "Let's work together to achieve your goals",
        description:
          "Get started with a free consultation today and discover how we can help you achieve your goals.",
        ctaText: "Get Started",
        ctaLink: "/contact",
        features: [
          {
            title: "Free Assessment",
            description: "Comprehensive evaluation of your current setup",
            icon:
              "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
          },
          {
            title: "Expert Consultation",
            description: "Work with certified professionals",
            icon:
              "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
          },
        ],
      },

      PricingSection: {
        title: "Choose Your Plan",
        description: "Flexible pricing options for businesses of all sizes",
        plans: [
          {
            name: "Basic",
            price: "$99",
            period: "per month",
            description: "Perfect for small businesses",
            features: ["Up to 10 Users", "Basic Modules", "Email Support"],
            popular: false,
            ctaText: "Get Started",
          },
          {
            name: "Professional",
            price: "$299",
            period: "per month",
            description: "Ideal for growing companies",
            features: [
              "Up to 50 Users",
              "Advanced Modules",
              "Priority Support",
              "Custom Reports",
            ],
            popular: true,
            ctaText: "Choose Professional",
          },
          {
            name: "Enterprise",
            price: "Custom",
            period: "contact us",
            description: "For large organizations",
            features: [
              "Unlimited Users",
              "All Modules",
              "24/7 Support",
              "Custom Development",
            ],
            popular: false,
            ctaText: "Contact Sales",
          },
        ],
      },

      ContactSection: {
        title: "Get In Touch",
        subtitle: "Ready to transform your business? Contact us today!",
        description:
          "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
        contactInfo: {
          phone: "+20 123 456 7890",
          email: "info@bellatrix-ix.com",
          address: "Cairo, Egypt",
          workingHours: "Sunday - Thursday: 9 AM - 6 PM",
        },
        socialLinks: [
          {
            platform: "LinkedIn",
            url: "https://linkedin.com/company/bellatrix-ix",
            icon: "linkedin",
          },
          {
            platform: "Facebook",
            url: "https://facebook.com/bellatrix-ix",
            icon: "facebook",
          },
          {
            platform: "Twitter",
            url: "https://twitter.com/bellatrix_ix",
            icon: "twitter",
          },
        ],
        formFields: [
          {
            name: "fullName",
            label: "Full Name",
            type: "text",
            required: true,
          },
          {
            name: "email",
            label: "Email Address",
            type: "email",
            required: true,
          },
          {
            name: "company",
            label: "Company Name",
            type: "text",
            required: false,
          },
          {
            name: "message",
            label: "Message",
            type: "textarea",
            required: true,
          },
        ],
      },

      FeaturesSection: {
        title: "Why Choose Our Solutions",
        subtitle: "Discover the advantages of our ERP platform",
        features: [
          {
            title: "Cloud-Based Architecture",
            description:
              "Secure, scalable cloud infrastructure for optimal performance",
            icon: "cloud",
            benefits: ["99.9% Uptime", "Auto Scaling", "Global Access"],
          },
          {
            title: "Advanced Analytics",
            description: "Real-time insights and comprehensive reporting tools",
            icon: "analytics",
            benefits: [
              "Real-time Dashboards",
              "Custom Reports",
              "Predictive Analytics",
            ],
          },
          {
            title: "Mobile Optimization",
            description: "Full mobile compatibility for on-the-go management",
            icon: "mobile",
            benefits: [
              "Responsive Design",
              "Native Apps",
              "Offline Capability",
            ],
          },
        ],
      },

      // Additional CTA and FAQ components can be mapped similarly...
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
    };
  };

  const getDefaultDataForComponent = (componentType) => {
    // Use the generated default data
    const defaultData = generateDefaultDataFromJSON();
              "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
          },
        ],
      },
    };
  };

  const getDefaultDataForComponent = (componentType) => {
    // Use the generated default data
    const defaultData = generateDefaultDataFromJSON();

    // Get component-specific data
    const componentData = defaultData[componentType];

    if (!componentData) {
      console.warn(
        `No default data defined for component: ${componentType}. Available components:`,
        Object.keys(defaultData)
      );
      return {
        title: "Default Title",
        description: "Default Description",
      };
    }

    return componentData;
  };

  const setNestedValue = (obj, path, value) => {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      const arrayMatch = key.match(/(.+)\[(\d+)\]$/);
      
      if (arrayMatch) {
        const [, arrayKey, index] = arrayMatch;
        if (!current[arrayKey]) current[arrayKey] = [];
        if (!current[arrayKey][index]) current[arrayKey][index] = {};
        current = current[arrayKey][index];
      } else {
        if (!current[key]) current[key] = {};
        current = current[key];
      }
    }
    
    const lastKey = keys[keys.length - 1];
    const arrayMatch = lastKey.match(/(.+)\[(\d+)\]$/);
    
    if (arrayMatch) {
      const [, arrayKey, index] = arrayMatch;
      if (!current[arrayKey]) current[arrayKey] = [];
      current[arrayKey][index] = value;
    } else {
      current[lastKey] = value;
    }
  };

  const renderDynamicInputs = (data, basePath = '', componentIndex = null) => {
    if (!data || typeof data !== 'object') return null;

    return Object.entries(data).map(([key, value]) => {
      const fieldPath = basePath ? `${basePath}.${key}` : key;

      if (Array.isArray(value)) {
        return (
          <div key={fieldPath} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              {value.map((item, index) => (
                <div
                  key={`${fieldPath}[${index}]`}
                  className="mb-3 p-2 border border-gray-100 rounded bg-white"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-600">
                      Item {index + 1}
                    </span>
                    <button
                      onClick={() =>
                        handleRemoveArrayItem(fieldPath, index, componentIndex)
                      }
                      className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded hover:bg-red-50"
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                  {renderDynamicInputs(
                    item,
                    `${fieldPath}[${index}]`,
                    componentIndex
                  )}
                </div>
              ))}
              <button
                onClick={() => handleAddArrayItem(fieldPath, componentIndex)}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                type="button"
              >
                Add {key.slice(0, -1)} Item
              </button>
            </div>
          </div>
        );
      }

      if (typeof value === 'object' && value !== null) {
        return (
          <div key={fieldPath} className="mb-4 border border-gray-200 rounded-lg p-3 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </h4>
            {renderDynamicInputs(value, fieldPath, componentIndex)}
          </div>
        );
      }

      return (
        <div key={fieldPath} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            type="text"
            value={value || ''}
            onChange={(e) =>
              handleInputChange(fieldPath, e.target.value, componentIndex)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${key}`}
          />
        </div>
      );
    });
  };

  // Handle input changes with real-time preview update
  const handleInputChange = (fieldPath, value, componentIndex) => {
    if (componentIndex !== null && pageData.components[componentIndex]) {
      const component = pageData.components[componentIndex];

      // Parse current content data
      let contentData = {};
      try {
        contentData = typeof component.content === 'string' 
          ? JSON.parse(component.content) 
          : component.content || {};
      } catch (e) {
        console.warn('Failed to parse component content:', e);
        contentData = {};
      }

      // Update the nested value
      setNestedValue(contentData, fieldPath, value);

      // Update component in pageData
      const updatedComponents = [...pageData.components];
      updatedComponents[componentIndex] = {
        ...component,
        content: JSON.stringify(contentData)
      };

      // Update pageData
      const updatedData = { ...pageData, components: updatedComponents };
      setPageData(updatedData);

      // Update preview in real-time
      if (window.updatePreview) {
        window.updatePreview(updatedData);
      }
    }
  };

  // Handle adding new array items
            category: "E-commerce",
            features: [
              "Multi-store support",
              "Advanced inventory",
              "Customer segmentation",
            ],
          },
        ],
      },

      IntegrationCTASection: {
        title: "Ready to Connect Your Systems?",
        subtitle: "Streamline your business with seamless integrations",
        description:
          "Get started with NetSuite integrations today and unlock the full potential of your business systems",
        ctaButton: {
          text: "Start Integration",
          link: "/integration/contact",
          variant: "primary",
        },
        benefits: [
          "Reduce manual data entry by 90%",
          "Improve data accuracy significantly",
          "Save time and resources",
          "Better business visibility",
          "Real-time synchronization",
          "Automated workflows",
        ],
        features: [
          {
            title: "Real-time Sync",
            description: "Instant data synchronization across all systems",
            icon: "🔄",
          },
          {
            title: "Custom Mapping",
            description: "Map data fields according to your business needs",
            icon: "🗺️",
          },
          {
            title: "Error Monitoring",
            description: "Advanced error detection and reporting",
            icon: "⚠️",
          },
        ],
      },

      // Customization Components المفقودة
      CustomizationCTASection: {
        title: "Ready to Customize NetSuite?",
        subtitle: "Transform NetSuite to match your unique business needs",
        description:
          "Get started with NetSuite customization today and unlock the full potential of the platform",
        ctaButton: {
          text: "Start Customization",
          link: "/customization/contact",
          variant: "primary",
        },
        features: [
          {
            title: "Custom Development",
            description: "Tailored solutions for your business requirements",
            icon: "💻",
          },
          {
            title: "Expert Consultation",
            description: "Work with certified NetSuite developers",
            icon: "👨‍💻",
          },
          {
            title: "Ongoing Support",
            description: "Continuous support and maintenance services",
            icon: "🛠️",
          },
          {
            title: "Quality Assurance",
            description: "Rigorous testing and quality control processes",
            icon: "✅",
          },
        ],
        benefits: [
          "Improved operational efficiency",
          "Better user experience",
          "Enhanced reporting capabilities",
          "Streamlined business processes",
          "Competitive advantage",
        ],
      },

      // Service Grid Component
      ServiceGrid: {
        title: "Our Professional Services",
        subtitle: "Comprehensive solutions for your business needs",
        description:
          "Choose from our wide range of professional services designed to help your business succeed with NetSuite",
        services: [
          {
            name: "NetSuite Implementation",
            description:
              "Complete NetSuite setup and configuration tailored to your business",
            icon: "⚙️",
            link: "/services/implementation",
            features: [
              "System setup",
              "Data migration",
              "User training",
              "Go-live support",
            ],
            price: "Starting from $15,000",
            duration: "8-12 weeks",
          },
          {
            name: "NetSuite Consulting",
            description:
              "Expert guidance and strategic planning for optimal NetSuite usage",
            icon: "💼",
            link: "/services/consulting",
            features: [
              "Business analysis",
              "Process optimization",
              "Strategic planning",
              "Best practices",
            ],
            price: "Starting from $200/hour",
            duration: "Flexible",
          },
          {
            name: "NetSuite Integration",
            description:
              "Connect NetSuite with your existing business systems seamlessly",
            icon: "🔗",
            link: "/services/integration",
            features: [
              "API integration",
              "Data synchronization",
              "System connectivity",
              "Real-time updates",
            ],
            price: "Starting from $5,000",
            duration: "4-6 weeks",
          },
          {
            name: "NetSuite Customization",
            description:
              "Tailor NetSuite to your specific business requirements",
            icon: "🎨",
            link: "/services/customization",
            features: [
              "Custom fields",
              "Workflows",
              "Reports & dashboards",
              "SuiteScript development",
            ],
            price: "Starting from $3,000",
            duration: "2-8 weeks",
          },
          {
            name: "NetSuite Training",
            description:
              "Comprehensive training programs for your team members",
            icon: "🎓",
            link: "/services/training",
            features: [
              "User training",
              "Admin training",
              "Certification programs",
              "Ongoing support",
            ],
            price: "Starting from $1,500",
            duration: "1-3 days",
          },
          {
            name: "NetSuite Support",
            description:
              "Ongoing support and maintenance for your NetSuite instance",
            icon: "🛠️",
            link: "/services/support",
            features: [
              "24/7 support",
              "System maintenance",
              "Performance optimization",
              "Issue resolution",
            ],
            price: "Starting from $500/month",
            duration: "Ongoing",
          },
          {
            name: "Data Migration",
            description:
              "Seamless migration of your data from legacy systems to NetSuite",
            icon: "📊",
            link: "/services/data-migration",
            features: [
              "Data analysis",
              "Migration planning",
              "Data cleansing",
              "Validation testing",
            ],
            price: "Starting from $8,000",
            duration: "3-6 weeks",
          },
          {
            name: "Business Process Optimization",
            description:
              "Streamline and optimize your business processes with NetSuite",
            icon: "📈",
            link: "/services/optimization",
            features: [
              "Process analysis",
              "Workflow design",
              "Automation setup",
              "Performance monitoring",
            ],
            price: "Starting from $10,000",
            duration: "6-10 weeks",
          },
        ],
        testimonial: {
          quote:
            "The service grid helped us understand exactly what we needed for our NetSuite journey.",
          author: "Sarah Johnson",
          position: "CEO, TechStart Inc.",
          company: "TechStart Inc.",
        },
      },

      // Additional Generic Components to reach 72
      ComparisonSection: {
        title: "NetSuite vs. Competitors",
        subtitle: "See why NetSuite is the superior choice",
        description:
          "Compare NetSuite with other ERP solutions and see the clear advantages",
        comparisons: [
          {
            feature: "Cloud-based Architecture",
            netSuite: true,
            competitor1: false,
            competitor2: true,
            description:
              "Modern cloud infrastructure for scalability and accessibility",
          },
          {
            feature: "Real-time Analytics",
            netSuite: true,
            competitor1: false,
            competitor2: false,
            description: "Advanced reporting and analytics capabilities",
          },
          {
            feature: "Multi-currency Support",
            netSuite: true,
            competitor1: true,
            competitor2: false,
            description: "Global business operations support",
          },
        ],
      },

      NewsletterSection: {
        title: "Stay Updated",
        subtitle: "Get the latest NetSuite insights and updates",
        description:
          "Subscribe to our newsletter for expert tips, industry insights, and NetSuite best practices",
        placeholder: "Enter your email address",
        buttonText: "Subscribe",
        benefits: [
          "Weekly NetSuite tips",
          "Industry insights",
          "Exclusive content",
          "Early access to webinars",
        ],
      },

      PartnersSection: {
        title: "Our Trusted Partners",
        subtitle: "Working with industry leaders",
        description:
          "We collaborate with the best technology partners to deliver exceptional solutions",
        partners: [
          {
            name: "Oracle NetSuite",
            logo: "/images/partners/netsuite-logo.png",
            description: "Official NetSuite Partner",
            level: "Gold Partner",
          },
          {
            name: "Salesforce",
            logo: "/images/partners/salesforce-logo.png",
            description: "CRM Integration Partner",
            level: "Certified Partner",
          },
          {
            name: "Shopify",
            logo: "/images/partners/shopify-logo.png",
            description: "E-commerce Integration Partner",
            level: "Technology Partner",
          },
        ],
      },

      SecuritySection: {
        title: "Enterprise-Grade Security",
        subtitle: "Your data is safe with us",
        description:
          "We implement the highest security standards to protect your business data",
        features: [
          {
            title: "256-bit Encryption",
            description: "Military-grade encryption for all data transmission",
            icon: "🔒",
          },
          {
            title: "Multi-Factor Authentication",
            description: "Additional security layers for user access",
            icon: "🔐",
          },
          {
            title: "Regular Security Audits",
            description: "Continuous monitoring and security assessments",
            icon: "🛡️",
          },
          {
            title: "Compliance Standards",
            description: "SOC 2, GDPR, and industry compliance",
            icon: "📋",
          },
        ],
        certifications: [
          "SOC 2 Type II",
          "GDPR Compliant",
          "ISO 27001",
          "PCI DSS",
        ],
      },
    };
  };

  const getDefaultDataForComponent = (componentType) => {
    // Use the generated default data
    const defaultData = generateDefaultDataFromJSON();

    // Get component-specific data
    const componentData = defaultData[componentType];

    if (!componentData) {
      console.warn(
        `No default data defined for component: ${componentType}. Available components:`,
        Object.keys(defaultData)
      );
      return {
        title: "New Component Title",
        description: "Component description - please configure this component",
        content: "This component needs to be configured with proper data.",
        _isPlaceholder: true,
      };
    }

    return componentData;
  };

  // Helper function to set nested object values
  const setNestedValue = (obj, path, value) => {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const target = keys.reduce((acc, key) => {
      // Handle array indices
      if (key.includes("[") && key.includes("]")) {
        const [arrayKey, indexStr] = key.split("[");
        const index = parseInt(indexStr.replace("]", ""));
        if (!acc[arrayKey]) acc[arrayKey] = [];
        if (!acc[arrayKey][index]) acc[arrayKey][index] = {};
        return acc[arrayKey][index];
      }
      if (!acc[key]) acc[key] = {};
      return acc[key];
    }, obj);

    if (lastKey.includes("[") && lastKey.includes("]")) {
      const [arrayKey, indexStr] = lastKey.split("[");
      const index = parseInt(indexStr.replace("]", ""));
      if (!target[arrayKey]) target[arrayKey] = [];
      target[arrayKey][index] = value;
    } else {
      target[lastKey] = value;
    }

    return obj;
  };

  // Dynamic Input Generator for component-specific data
  const renderDynamicInputs = (
    data,
    prefix = "",
    level = 0,
    componentIndex = null
  ) => {
    if (!data || typeof data !== "object") return null;

    return Object.entries(data).map(([key, value]) => {
      const fieldPath = prefix ? `${prefix}.${key}` : key;
      const indentClass = level > 0 ? `ml-${level * 4}` : "";

      if (Array.isArray(value)) {
        return (
          <div key={fieldPath} className={`mb-4 ${indentClass}`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1")}{" "}
              (Array)
            </label>
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              {value.map((item, index) => (
                <div
                  key={`${fieldPath}[${index}]`}
                  className="mb-3 p-2 border border-gray-100 rounded bg-white"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-600">
                      Item {index + 1}
                    </span>
                    <button
                      onClick={() =>
                        handleRemoveArrayItem(fieldPath, index, componentIndex)
                      }
                      className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded hover:bg-red-50"
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                  {renderDynamicInputs(
                    item,
                    `${fieldPath}[${index}]`,
                    level + 1,
                    componentIndex
                  )}
                </div>
              ))}
              <button
                onClick={() =>
                  handleAddArrayItem(fieldPath, value[0] || {}, componentIndex)
                }
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                type="button"
              >
                Add {key.slice(0, -1)} {/* Remove 's' from plural */}
              </button>
            </div>
          </div>
        );
      }

      if (typeof value === "object" && value !== null) {
        return (
          <div key={fieldPath} className={`mb-4 ${indentClass}`}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              {renderDynamicInputs(value, fieldPath, level + 1, componentIndex)}
            </div>
          </div>
        );
      }

      // Handle primitive values (string, number, boolean)
      return (
        <div key={fieldPath} className={`mb-4 ${indentClass}`}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {key.charAt(0).toUpperCase() +
              key.slice(1).replace(/([A-Z])/g, " $1")}
          </label>
          {typeof value === "boolean" ? (
            <input
              type="checkbox"
              checked={value}
              onChange={(e) =>
                handleInputChange(fieldPath, e.target.checked, componentIndex)
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          ) : value && typeof value === "string" && value.length > 100 ? (
            <textarea
              value={value}
              onChange={(e) =>
                handleInputChange(fieldPath, e.target.value, componentIndex)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          ) : (
            <input
              type={typeof value === "number" ? "number" : "text"}
              value={value || ""}
              onChange={(e) =>
                handleInputChange(
                  fieldPath,
                  typeof value === "number"
                    ? Number(e.target.value)
                    : e.target.value,
                  componentIndex
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter ${key
                .replace(/([A-Z])/g, " $1")
                .toLowerCase()}`}
            />
          )}
        </div>
      );
    });
  };

  // Handle input changes with real-time preview update
  const handleInputChange = (fieldPath, value, componentIndex) => {
    if (componentIndex !== null && pageData.components[componentIndex]) {
      const component = pageData.components[componentIndex];

      // Parse current content data
      let currentData;
      try {
        currentData = component.contentJson
          ? JSON.parse(component.contentJson)
          : getDefaultDataForComponent(component.componentType);
      } catch (error) {
        console.error("Error parsing component data:", error);
        currentData = getDefaultDataForComponent(component.componentType);
      }

      // Create updated data with the new value
      const updatedData = { ...currentData };
      setNestedValue(updatedData, fieldPath, value);

      // Update the component with new data
      handleComponentUpdate(
        componentIndex,
        "contentJson",
        JSON.stringify(updatedData, null, 2)
      );
    }
  };

  // Handle adding new array items
  const handleAddArrayItem = (fieldPath, templateItem = {}, componentIndex) => {
    if (componentIndex !== null && pageData.components[componentIndex]) {
      const component = pageData.components[componentIndex];

      // Parse current content data
      let currentData;
      try {
        currentData = component.contentJson
          ? JSON.parse(component.contentJson)
          : getDefaultDataForComponent(component.componentType);
      } catch (error) {
        currentData = getDefaultDataForComponent(component.componentType);
      }

      const updatedData = { ...currentData };
      const keys = fieldPath.split(".");
      const target = keys.reduce((acc, key) => {
        if (!acc[key]) acc[key] = [];
        return acc[key];
      }, updatedData);

      if (Array.isArray(target)) {
        target.push(
          typeof templateItem === "object" ? { ...templateItem } : templateItem
        );
      }

      // Update the component with new data
      handleComponentUpdate(
        componentIndex,
        "contentJson",
        JSON.stringify(updatedData, null, 2)
      );
    }
  };

  // Handle removing array items
  const handleRemoveArrayItem = (fieldPath, index, componentIndex) => {
    if (componentIndex !== null && pageData.components[componentIndex]) {
      const component = pageData.components[componentIndex];

      // Parse current content data
      let currentData;
      try {
        currentData = component.contentJson
          ? JSON.parse(component.contentJson)
          : getDefaultDataForComponent(component.componentType);
      } catch (error) {
        currentData = getDefaultDataForComponent(component.componentType);
      }

      const updatedData = { ...currentData };
      const keys = fieldPath.split(".");
      const target = keys.reduce((acc, key) => acc[key], updatedData);

      if (Array.isArray(target)) {
        target.splice(index, 1);
      }

      // Update the component with new data
      handleComponentUpdate(
        componentIndex,
        "contentJson",
        JSON.stringify(updatedData, null, 2)
      );
    }
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

  // Function to open new input modal
  const openNewInputModal = (component, componentIndex) => {
    console.log(
      "🆕 [NEW MODAL] Opening new input modal for component:",
      component
    );
    setCurrentComponent({
      ...component,
      type: component.componentType,
      index: componentIndex,
    });
    setShowNewInputModal(true);
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
            showNewInputModal={showNewInputModal}
            setShowNewInputModal={setShowNewInputModal}
            currentComponent={currentComponent}
            openNewInputModal={openNewInputModal}
            useNewInputSystemState={useNewInputSystemState}
            setUseNewInputSystemState={setUseNewInputSystemState}
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
          <Modal
            isOpen={showSectionEditor}
            onClose={() => {
              setShowSectionEditor(false);
              setEditingComponent(null);
            }}
            title={`Configure ${editingComponent.componentName}`}
            maxWidth="4xl"
          >
            <div className="p-6">
              {/* Toggle between old and new input system */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Input System
                    </h3>
                    <p className="text-sm text-gray-500">
                      Choose between legacy and new component-specific input
                      system
                    </p>
                  </div>
                  <button
                    onClick={() => setUseNewInputSystem(!useNewInputSystem)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      useNewInputSystem ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        useNewInputSystem ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-gray-600">
                    {useNewInputSystem
                      ? "Using New Component-Specific System"
                      : "Using Legacy System"}
                  </span>
                </div>
              </div>

              {/* Conditional rendering based on system choice */}
              {useNewInputSystem ? (
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {editingComponent.componentName} Configuration
                    </h3>
                    <p className="text-sm text-gray-600">
                      Configure component-specific settings and data
                    </p>
                  </div>

                  {/* Dynamic inputs based on component data structure */}
                  <div className="max-h-96 overflow-y-auto">
                    {(() => {
                      try {
                        const componentData = editingComponent.contentJson
                          ? JSON.parse(editingComponent.contentJson)
                          : getDefaultDataForComponent(
                              editingComponent.componentType
                            );

                        const componentIndex = pageData.components.findIndex(
                          (comp) => comp.id === editingComponent.id
                        );

                        return renderDynamicInputs(
                          componentData,
                          "",
                          0,
                          componentIndex
                        );
                      } catch (error) {
                        console.error("Error rendering dynamic inputs:", error);
                        const defaultData = getDefaultDataForComponent(
                          editingComponent.componentType
                        );
                        const componentIndex = pageData.components.findIndex(
                          (comp) => comp.id === editingComponent.id
                        );
                        return renderDynamicInputs(
                          defaultData,
                          "",
                          0,
                          componentIndex
                        );
                      }
                    })()}
                  </div>
                </div>
              ) : (
                <SectionDataEditor
                  isOpen={true}
                  onClose={() => {}}
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
            </div>

            <ModalFooter>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowSectionEditor(false);
                  setEditingComponent(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowSectionEditor(false);
                  setEditingComponent(null);
                }}
              >
                Save Changes
              </Button>
            </ModalFooter>
          </Modal>
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
  // New Input System Props
  showNewInputModal,
  setShowNewInputModal,
  currentComponent,
  openNewInputModal,
  useNewInputSystemState,
  setUseNewInputSystemState,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [isEditMode, setIsEditMode] = useState(true);

  // Handle real-time updates from modal inputs
  const handleModalInputChange = (field, value, componentIndex) => {
    console.log(
      `🔄 [MODAL UPDATE] Component ${componentIndex}, Field: ${field}, Value:`,
      value
    );

    // Get current component data
    const currentData = pageData.components[componentIndex];

    // Parse existing contentJson or create new object
    let updatedContent = {};
    try {
      updatedContent = currentData.contentJson
        ? JSON.parse(currentData.contentJson)
        : {};
    } catch (error) {
      console.warn(
        "Failed to parse contentJson, creating new object:",
        error.message
      );
      updatedContent = {};
    }

    // Update the field
    updatedContent[field] = value;

    // Convert back to JSON and update component
    const newContentJson = JSON.stringify(updatedContent, null, 2);
    onUpdateComponent(componentIndex, "contentJson", newContentJson);

    console.log(
      `✅ [MODAL UPDATE] Component ${componentIndex} updated with:`,
      updatedContent
    );
  };

  // Simple renderDynamicInputs function for the modal
  const renderDynamicInputs = (
    data,
    fieldPath = "",
    level = 0,
    componentIndex
  ) => {
    if (!data || typeof data !== "object") {
      return <div>No configuration available for this component</div>;
    }

    return (
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="border border-gray-200 p-3 rounded">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key}
            </label>
            {typeof value === "string" && (
              <input
                type="text"
                defaultValue={value}
                onChange={(e) =>
                  handleModalInputChange(key, e.target.value, componentIndex)
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
            )}
            {typeof value === "boolean" && (
              <input
                type="checkbox"
                defaultChecked={value}
                onChange={(e) =>
                  handleModalInputChange(key, e.target.checked, componentIndex)
                }
                className="h-4 w-4 text-blue-600"
              />
            )}
            {Array.isArray(value) && (
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  Array with {value.length} items
                </div>
                <button className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
                  Add Item
                </button>
              </div>
            )}
            {typeof value === "object" &&
              value !== null &&
              !Array.isArray(value) && (
                <div className="pl-4 border-l-2 border-gray-200">
                  {renderDynamicInputs(
                    value,
                    `${fieldPath}.${key}`,
                    level + 1,
                    componentIndex
                  )}
                </div>
              )}
          </div>
        ))}
      </div>
    );
  };

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
                          onClick={() => openNewInputModal(component, index)}
                          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-200"
                        >
                          ⚙️ Configure
                        </Button>
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
                              const componentSchema =
                                componentSchemas[component.componentType] ||
                                getAboutComponentSchema(
                                  component.componentType
                                ) ||
                                getGeneralComponentSchema(
                                  component.componentType
                                );

                              console.log(
                                "🔍 [SCHEMA CHECK]",
                                component.componentType,
                                "has schema:",
                                !!componentSchema,
                                "preloaded:",
                                !!componentSchemas[component.componentType]
                              );
                              console.log("🔍 [SCHEMA DETAILS]", {
                                componentType: component.componentType,
                                hasAboutSchema: !!getAboutComponentSchema(
                                  component.componentType
                                ),
                                hasGeneralSchema: !!getGeneralComponentSchema(
                                  component.componentType
                                ),
                                hasPreloadedSchema: !!componentSchemas[
                                  component.componentType
                                ],
                                finalSchema: componentSchema,
                                contentJson: component.contentJson,
                                hasContentJson: !!component.contentJson,
                              });

                              if (componentSchema) {
                                // Use enhanced dynamic form generator
                                console.log(
                                  "📝 [FORM RENDER] DynamicFormGenerator for:",
                                  {
                                    componentType: component.componentType,
                                    hasSchema: !!componentSchema.schema,
                                    hasData: !!component.contentJson,
                                    currentData: component.contentJson
                                      ? JSON.parse(component.contentJson)
                                      : componentSchema.defaultData,
                                  }
                                );

                                // For components without contentJson, try to get actual data from JSON files
                                const actualData = component.contentJson
                                  ? JSON.parse(component.contentJson)
                                  : (() => {
                                      // Try to get actual data from about.json for About components
                                      if (
                                        component.componentType.includes(
                                          "About"
                                        )
                                      ) {
                                        // Return the actual data structure that matches the component
                                        const aboutDataMap = {
                                          AboutHeroSection: {
                                            title: "About Bellatrix",
                                            subtitle:
                                              "Your trusted partner in digital transformation",
                                            description:
                                              "We are a leading consultancy firm specializing in NetSuite implementations, business process optimization, and technology solutions that drive growth and efficiency.",
                                            backgroundVideo:
                                              "/Videos/about-hero.mp4",
                                            stats: [
                                              {
                                                value: "500+",
                                                label: "Projects Completed",
                                              },
                                              {
                                                value: "15+",
                                                label: "Years Experience",
                                              },
                                              {
                                                value: "98%",
                                                label: "Client Satisfaction",
                                              },
                                              {
                                                value: "200+",
                                                label: "Happy Clients",
                                              },
                                            ],
                                          },
                                          AboutJourneySection: {
                                            beginningTitle: "The Beginning",
                                            beginningText:
                                              "Founded in 2008 with a vision to bridge the gap between complex enterprise software and real business needs. Our founders recognized that many businesses were struggling to fully leverage their technology investments.",
                                            growthTitle: "Growth & Evolution",
                                            growthText:
                                              "Over the years, we've evolved from a small consulting firm to a comprehensive digital transformation partner, helping hundreds of organizations across various industries unlock their full potential.",
                                            todayTitle: "Today",
                                            todayText:
                                              "We continue to innovate and expand our services, staying at the forefront of technology trends while maintaining our core values of excellence and integrity.",
                                            imageUrl: "/images/solution.jpg",
                                          },
                                          AboutMissionSection: {
                                            title: "Our Mission",
                                            description:
                                              "To empower businesses with innovative technology solutions that transform operations, enhance productivity, and drive sustainable growth.",
                                            vision:
                                              "To be the global leader in business transformation consulting, helping organizations achieve their full potential through technology excellence.",
                                            image: "/images/ourProServices.png",
                                            stats: [],
                                            missionPoints: [],
                                          },
                                          AboutTeamSection: {
                                            title: "Meet Our Team",
                                            description:
                                              "Our diverse team of experts brings together decades of experience in enterprise software, business consulting, and digital transformation.",
                                            members: [
                                              {
                                                name: "Sarah Johnson",
                                                role: "Chief Executive Officer",
                                                image: "/images/ourteam/1.jpg",
                                                bio:
                                                  "Visionary leader with 20+ years in enterprise software solutions.",
                                                expertise: [
                                                  "Strategic Planning",
                                                  "Business Development",
                                                  "Leadership",
                                                ],
                                              },
                                              {
                                                name: "Michael Chen",
                                                role:
                                                  "Chief Technology Officer",
                                                image: "/images/ourteam/2.jpg",
                                                bio:
                                                  "Technology expert specializing in NetSuite implementations and cloud solutions.",
                                                expertise: [
                                                  "NetSuite Development",
                                                  "Cloud Architecture",
                                                  "System Integration",
                                                ],
                                              },
                                              {
                                                name: "Emily Rodriguez",
                                                role: "Head of Operations",
                                                image: "/images/ourteam/3.jpg",
                                                bio:
                                                  "Operations specialist ensuring seamless project delivery and client success.",
                                                expertise: [
                                                  "Project Management",
                                                  "Process Optimization",
                                                  "Quality Assurance",
                                                ],
                                              },
                                            ],
                                          },
                                          AboutValuesSection: {
                                            title: "Our Values",
                                            description:
                                              "These core values guide everything we do and shape how we interact with our clients, partners, and each other.",
                                            items: [
                                              {
                                                title: "Innovation",
                                                description:
                                                  "We embrace cutting-edge technologies and creative thinking to solve complex business challenges.",
                                                icon: "🚀",
                                                color:
                                                  "from-blue-500 to-cyan-500",
                                              },
                                              {
                                                title: "Excellence",
                                                description:
                                                  "We deliver exceptional quality in every project, exceeding client expectations consistently.",
                                                icon: "⭐",
                                                color:
                                                  "from-purple-500 to-pink-500",
                                              },
                                              {
                                                title: "Integrity",
                                                description:
                                                  "We act with honesty and transparency, building trust through ethical business practices.",
                                                icon: "🤝",
                                                color:
                                                  "from-green-500 to-teal-500",
                                              },
                                              {
                                                title: "Partnership",
                                                description:
                                                  "We work closely with our clients as trusted partners in their digital transformation journey.",
                                                icon: "🤝",
                                                color:
                                                  "from-orange-500 to-red-500",
                                              },
                                            ],
                                          },
                                          AboutMilestonesSection: {
                                            title: "Our Milestones",
                                            description:
                                              "Key achievements and milestones that mark our journey of growth, innovation, and commitment to excellence.",
                                            items: [
                                              {
                                                year: "2008",
                                                title: "Company Founded",
                                                description:
                                                  "Bellatrix was established with a vision to transform businesses through technology.",
                                              },
                                              {
                                                year: "2012",
                                                title: "First 100 Clients",
                                                description:
                                                  "Reached our first major milestone of serving 100 satisfied clients.",
                                              },
                                              {
                                                year: "2016",
                                                title: "NetSuite Gold Partner",
                                                description:
                                                  "Achieved NetSuite Gold Partner status, recognizing our expertise.",
                                              },
                                              {
                                                year: "2020",
                                                title: "Global Expansion",
                                                description:
                                                  "Expanded operations to serve clients across multiple continents.",
                                              },
                                              {
                                                year: "2023",
                                                title: "500+ Projects",
                                                description:
                                                  "Successfully completed over 500 implementation projects.",
                                              },
                                              {
                                                year: "2024",
                                                title: "AI Integration",
                                                description:
                                                  "Pioneered AI-powered solutions for enhanced business intelligence.",
                                              },
                                            ],
                                          },
                                          AboutDifferentiatorsSection: {
                                            title: "What Sets Us Apart",
                                            description:
                                              "Our unique combination of expertise, methodology, and commitment to excellence makes us the preferred choice for Oracle NetSuite implementations.",
                                            items: [
                                              {
                                                title: "Industry Expertise",
                                                description:
                                                  "Deep understanding of various industries and their unique challenges.",
                                                stats: "15+ Industries",
                                                icon: "🏭",
                                              },
                                              {
                                                title: "Proven Methodology",
                                                description:
                                                  "Time-tested implementation methodology ensuring project success.",
                                                stats: "98% Success Rate",
                                                icon: "📊",
                                              },
                                              {
                                                title: "Ongoing Support",
                                                description:
                                                  "24/7 support and maintenance services for continuous optimization.",
                                                stats: "24/7 Support",
                                                icon: "🛠️",
                                              },
                                              {
                                                title: "Custom Solutions",
                                                description:
                                                  "Tailored solutions designed specifically for your business needs.",
                                                stats: "100% Custom",
                                                icon: "⚙️",
                                              },
                                            ],
                                          },
                                          AboutCTASection: {
                                            title:
                                              "Ready to Build Something Great?",
                                            subtitle:
                                              "Let's collaborate to transform your business with innovative Oracle NetSuite solutions that drive growth, efficiency, and success.",
                                            description:
                                              "Contact us today to discuss how we can help you optimize your operations and drive growth.",
                                            ctaButton: {
                                              text: "Start Consultation",
                                              link: "/contact",
                                              variant: "primary",
                                            },
                                            features: [
                                              {
                                                title: "Quick Start",
                                                description:
                                                  "Get started our consultation",
                                              },
                                              {
                                                title: "Expert Team",
                                                description:
                                                  "Work with certified professionals",
                                              },
                                              {
                                                title: "Proven Results",
                                                description:
                                                  "Join our success stories",
                                              },
                                            ],
                                          },
                                        };

                                        return (
                                          aboutDataMap[
                                            component.componentType
                                          ] || componentSchema.defaultData
                                        );
                                      }

                                      // For Payroll components, use actual payroll data
                                      if (
                                        component.componentType.includes(
                                          "Payroll"
                                        )
                                      ) {
                                        const payrollDataMap = {
                                          PayrollHeroSection: {
                                            title:
                                              "Transform Your Payroll Process",
                                            subtitle:
                                              "Streamline operations with our intelligent, automated payroll system",
                                            description:
                                              "Our comprehensive payroll solution automates complex processes and ensures accuracy.",
                                            backgroundImage:
                                              "/images/payroll-hero.jpg",
                                          },
                                          PayrollHowItWorksSection: {
                                            title:
                                              "How Our Payroll System Works",
                                            description:
                                              "Our payroll process is simple: upload employee and contract details, sync timesheets and leave data, let the system run payroll automatically on schedule, approve via role-based access, execute payments through integrated bank APIs, and download payslips & compliance-ready reports—all in one platform.",
                                            steps: [
                                              {
                                                title: "Data Input",
                                                description:
                                                  "Enter employee data and hours",
                                                icon: "📝",
                                              },
                                              {
                                                title: "Processing",
                                                description:
                                                  "System calculates payroll automatically",
                                                icon: "⚙️",
                                              },
                                              {
                                                title: "Approval",
                                                description:
                                                  "Review and approve payroll",
                                                icon: "✅",
                                              },
                                            ],
                                          },
                                          PayrollPainPointsSection: {
                                            title:
                                              "The Payroll Struggles We Eliminate",
                                            description:
                                              "Our system addresses the most common payroll challenges faced by consultancy firms:",
                                            painPoints: [
                                              {
                                                title:
                                                  "Delayed salary processing and errors",
                                                description:
                                                  "Manual processing leads to delays and mistakes",
                                              },
                                              {
                                                title:
                                                  "Manual tax calculations and compliance risks",
                                                description:
                                                  "Complex tax calculations prone to errors",
                                              },
                                              {
                                                title:
                                                  "Lack of visibility and transparency",
                                                description:
                                                  "Employees lack insight into their payroll",
                                              },
                                            ],
                                          },
                                          PayrollFAQSection: {
                                            title: "Common Questions",
                                            description:
                                              "Get quick answers to the most frequently asked questions about our payroll system",
                                            faqItems: [
                                              {
                                                question:
                                                  "Does this system support global payroll?",
                                                answer:
                                                  "Yes, we support multi-country and multi-currency payroll operations.",
                                              },
                                              {
                                                question:
                                                  "Can it integrate with our existing HR system?",
                                                answer:
                                                  "Absolutely, we offer seamless integrations and open APIs.",
                                              },
                                              {
                                                question:
                                                  "How long does implementation take?",
                                                answer:
                                                  "Most companies are onboarded in less than 2 weeks.",
                                              },
                                            ],
                                          },
                                          PayrollCTASection: {
                                            title:
                                              "Ready to Simplify Your Payroll?",
                                            subtitle: "Get started today",
                                            description:
                                              "Get in touch for a personalized demo and see how our solution can transform your payroll process.",
                                            ctaButton: {
                                              text: "Request Now!",
                                              link: "/contact",
                                            },
                                          },
                                        };

                                        return (
                                          payrollDataMap[
                                            component.componentType
                                          ] || componentSchema.defaultData
                                        );
                                      }

                                      // For HR components, use actual HR data
                                      if (
                                        component.componentType.includes("HR")
                                      ) {
                                        const hrDataMap = {
                                          HRHeroSection: {
                                            title:
                                              "nada HR, Payroll & People Management",
                                            subtitle:
                                              "Automate HR, empower employees, and stay compliant—on one secure platform designed for the future of work.",
                                            description:
                                              "Our comprehensive HR solution simplifies employee management.",
                                            backgroundImage:
                                              "/images/hr-hero.jpg",
                                          },
                                          HRModulesSection: {
                                            title: "HR Modules",
                                            description:
                                              "Comprehensive HR modules for modern businesses",
                                            modules: [
                                              {
                                                title: "Employee Management",
                                                description:
                                                  "Complete employee lifecycle management from hiring to offboarding with customizable workflows.",
                                                icon: "👥",
                                              },
                                              {
                                                title: "Time & Attendance",
                                                description:
                                                  "Automated time tracking, shift planning, overtime management, and absence tracking.",
                                                icon: "⏱️",
                                              },
                                              {
                                                title: "Payroll & Compensation",
                                                description:
                                                  "End-to-end payroll processing, tax filing, benefits administration, and compensation planning.",
                                                icon: "💰",
                                              },
                                            ],
                                          },
                                          HRBenefitsSection: {
                                            title:
                                              "Why Choose Our HR Solution?",
                                            description:
                                              "Discover the key advantages that make our HR platform the smart choice for modern businesses of all sizes and industries.",
                                            features: [
                                              {
                                                title: "Payroll Automation",
                                                description:
                                                  "Automate payroll processing, tax calculations, and compliance with built-in error checking and real-time updates.",
                                              },
                                              {
                                                title:
                                                  "Centralized Employee Data",
                                                description:
                                                  "All employee records, contracts, documents, and history in one secure, searchable cloud-based platform.",
                                              },
                                              {
                                                title: "Streamlined Onboarding",
                                                description:
                                                  "Digitize onboarding with automated workflows, e-signatures, task assignments, and welcome packages.",
                                              },
                                            ],
                                          },
                                          HRPricingSection: {
                                            title: "Pricing Plans",
                                            description:
                                              "Choose the right plan for your needs",
                                            pricing: [
                                              {
                                                name: "Essential",
                                                price: "$2,500",
                                                description:
                                                  "Perfect for small teams getting started with HR automation",
                                                features: [
                                                  "Basic system analysis & configuration",
                                                  "Standard implementation setup",
                                                  "Core HR module implementation",
                                                ],
                                              },
                                              {
                                                name: "Professional",
                                                price: "$5,000",
                                                description:
                                                  "Ideal for growing companies with complex HR needs",
                                                features: [
                                                  "Comprehensive needs analysis",
                                                  "Custom implementation & configuration",
                                                  "Multiple module implementation",
                                                ],
                                              },
                                              {
                                                name: "Enterprise",
                                                price: "Custom",
                                                description:
                                                  "Complete solution for large organizations with global teams",
                                                features: [
                                                  "Enterprise-grade analysis & planning",
                                                  "Fully customized implementation",
                                                  "All modules & advanced features",
                                                ],
                                              },
                                            ],
                                          },
                                          HRFAQSection: {
                                            title: "Frequently Asked Questions",
                                            faq: {
                                              title: "HR Solution FAQ",
                                              items: [
                                                {
                                                  question:
                                                    "Is my employee data secure and compliant?",
                                                  answer:
                                                    "Yes. We use enterprise-grade 256-bit encryption, regular security audits, and are fully GDPR, SOC 2, and ISO 27001 compliant.",
                                                },
                                                {
                                                  question:
                                                    "Can I integrate with my existing payroll and accounting software?",
                                                  answer:
                                                    "Absolutely. We offer pre-built integrations with all major payroll providers and accounting software.",
                                                },
                                                {
                                                  question:
                                                    "How long does implementation typically take?",
                                                  answer:
                                                    "Implementation time varies based on complexity: Essential (2-3 weeks), Professional (3-5 weeks), Enterprise (6-8 weeks).",
                                                },
                                              ],
                                            },
                                          },
                                          HRCTASection: {
                                            title:
                                              "Ready to Transform Your HR Operations?",
                                            subtitle: "Get started today",
                                            description:
                                              "Join 10,000+ companies that have automated their HR processes and reduced administrative workload by 70%",
                                            ctaButton: {
                                              text: "Start Free Trial",
                                              link: "/contact",
                                            },
                                          },
                                        };

                                        return (
                                          hrDataMap[component.componentType] ||
                                          componentSchema.defaultData
                                        );
                                      }

                                      // For other components, use schema default data
                                      return componentSchema.defaultData;
                                    })();

                                console.log("📊 [DATA EXTRACTION]", {
                                  componentType: component.componentType,
                                  hasContentJson: !!component.contentJson,
                                  extractedData: actualData,
                                  defaultData: componentSchema.defaultData,
                                });

                                // Filter data to only include fields that exist in schema
                                const filteredData = {};
                                if (
                                  componentSchema.schema &&
                                  componentSchema.schema.properties
                                ) {
                                  Object.keys(
                                    componentSchema.schema.properties
                                  ).forEach((key) => {
                                    if (actualData && key in actualData) {
                                      filteredData[key] = actualData[key];
                                    }
                                  });
                                }

                                console.log("🔍 [DATA FILTERING]", {
                                  componentType: component.componentType,
                                  originalDataKeys: actualData
                                    ? Object.keys(actualData)
                                    : [],
                                  schemaKeys: componentSchema.schema
                                    ? Object.keys(
                                        componentSchema.schema.properties
                                      )
                                    : [],
                                  filteredDataKeys: Object.keys(filteredData),
                                  hasItemsInOriginal:
                                    actualData && "items" in actualData,
                                  hasItemsInSchema:
                                    componentSchema.schema &&
                                    "items" in
                                      componentSchema.schema.properties,
                                  hasItemsInFiltered: "items" in filteredData,
                                });

                                return (
                                  <DynamicFormGenerator
                                    schema={componentSchema.schema}
                                    data={filteredData}
                                    onChange={(formData) => {
                                      console.log(
                                        "📝 [FORM CHANGE] New form data:",
                                        formData
                                      );
                                      // Update the entire contentJson with new form data
                                      handleComponentUpdate(
                                        index,
                                        "contentJson",
                                        JSON.stringify(formData, null, 2)
                                      );
                                    }}
                                    onFieldChange={(field, value) => {
                                      console.log(
                                        "🎯 [FIELD CHANGE]",
                                        field,
                                        value
                                      );
                                      // Update individual field for immediate feedback
                                      const currentContentData = component.contentJson
                                        ? JSON.parse(component.contentJson)
                                        : actualData;

                                      // Handle nested field updates (e.g., "features.0.title")
                                      const updatedContentData = {
                                        ...currentContentData,
                                      };
                                      const fieldPath = field.split(".");

                                      if (fieldPath.length === 1) {
                                        // Simple field update
                                        updatedContentData[field] = value;
                                      } else {
                                        // Nested field update
                                        let current = updatedContentData;
                                        for (
                                          let i = 0;
                                          i < fieldPath.length - 1;
                                          i++
                                        ) {
                                          if (!current[fieldPath[i]]) {
                                            current[fieldPath[i]] = {};
                                          }
                                          current = current[fieldPath[i]];
                                        }
                                        current[
                                          fieldPath[fieldPath.length - 1]
                                        ] = value;
                                      }

                                      handleComponentUpdate(
                                        index,
                                        "contentJson",
                                        JSON.stringify(
                                          updatedContentData,
                                          null,
                                          2
                                        )
                                      );
                                    }}
                                    componentType={component.componentType}
                                  />
                                );
                              } else {
                                // Generate dynamic schema from existing component data
                                console.log(
                                  "🔧 [DYNAMIC SCHEMA] No predefined schema found, generating dynamic schema for:",
                                  component.componentType
                                );

                                // Parse existing data or use empty object
                                const existingData = component.contentJson
                                  ? JSON.parse(component.contentJson)
                                  : {};

                                console.log(
                                  "🔧 [DYNAMIC SCHEMA] Existing data:",
                                  existingData
                                );

                                // Generate schema based on existing data structure
                                const dynamicSchema = generateDynamicSchema(
                                  existingData,
                                  component.componentType
                                );

                                console.log(
                                  "🔧 [DYNAMIC SCHEMA] Generated schema:",
                                  dynamicSchema
                                );

                                // Add safety check for schema
                                if (!dynamicSchema || !dynamicSchema.schema) {
                                  console.error(
                                    "❌ [DYNAMIC SCHEMA] Invalid schema generated:",
                                    dynamicSchema
                                  );
                                  return (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                      <div className="text-red-400 text-sm font-medium">
                                        Error: Could not generate schema
                                      </div>
                                      <div className="text-red-300 text-xs mt-1">
                                        Component: {component.componentType}
                                      </div>
                                    </div>
                                  );
                                }

                                return (
                                  <DynamicFormGenerator
                                    schema={dynamicSchema.schema}
                                    data={existingData}
                                    onChange={(formData) => {
                                      console.log(
                                        "🎯 [DYNAMIC FORM] Data changed:",
                                        formData
                                      );
                                      handleComponentUpdate(
                                        index,
                                        "contentJson",
                                        JSON.stringify(formData, null, 2)
                                      );
                                    }}
                                    onFieldChange={(field, value) => {
                                      console.log(
                                        "🎯 [DYNAMIC FIELD] Field changed:",
                                        field,
                                        value
                                      );
                                      // Update individual field for immediate feedback
                                      const currentContentData = component.contentJson
                                        ? JSON.parse(component.contentJson)
                                        : existingData;

                                      // Handle nested field updates (e.g., "features.0.title")
                                      const updatedContentData = {
                                        ...currentContentData,
                                      };
                                      const fieldPath = field.split(".");

                                      if (fieldPath.length === 1) {
                                        // Simple field update
                                        updatedContentData[field] = value;
                                      } else {
                                        // Nested field update
                                        let current = updatedContentData;
                                        for (
                                          let i = 0;
                                          i < fieldPath.length - 1;
                                          i++
                                        ) {
                                          if (!current[fieldPath[i]]) {
                                            current[fieldPath[i]] = {};
                                          }
                                          current = current[fieldPath[i]];
                                        }
                                        current[
                                          fieldPath[fieldPath.length - 1]
                                        ] = value;
                                      }

                                      handleComponentUpdate(
                                        index,
                                        "contentJson",
                                        JSON.stringify(
                                          updatedContentData,
                                          null,
                                          2
                                        )
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
        key={`preview-${pageData.components
          .map((c) => c.contentJson)
          .join("|")
          .slice(0, 100)}`}
      />

      {/* New Input System Modal */}
      {showNewInputModal && currentComponent && (
        <Modal
          isOpen={true}
          onClose={() => setShowNewInputModal(false)}
          title={`Configure ${
            currentComponent.componentName || currentComponent.componentType
          }`}
          size="xl"
        >
          <div className="mb-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useNewInputSystemState}
                onChange={(e) => setUseNewInputSystemState(e.target.checked)}
                className="rounded"
              />
              <span className="font-medium">Use New Input System</span>
              <span className="text-sm text-gray-600">
                (Toggle between old and new input systems)
              </span>
            </label>
          </div>

          {/* Dynamic Input Generation */}
          <div className="space-y-4">
            <h4 className="font-medium mb-4 text-blue-800">
              ✅ Component Configuration for{" "}
              {currentComponent.componentName || currentComponent.componentType}
            </h4>

            {/* Simple Input Fields for Testing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  defaultValue="Sample Title"
                  onChange={(e) => {
                    console.log(
                      "🔄 [MODAL INPUT] Title changed:",
                      e.target.value
                    );
                    // This will connect to real-time updates
                    onUpdateComponent(
                      currentComponent.index,
                      "title",
                      e.target.value
                    );
                  }}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  defaultValue="Sample description"
                  onChange={(e) => {
                    console.log(
                      "🔄 [MODAL INPUT] Description changed:",
                      e.target.value
                    );
                    // This will connect to real-time updates
                    onUpdateComponent(
                      currentComponent.index,
                      "description",
                      e.target.value
                    );
                  }}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
            </div>

            {/* Dynamic Component-Specific Inputs */}
            {useNewInputSystemState && (
              <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-3">
                  🎯 Component-Specific Configuration
                </h5>
                {renderDynamicInputs(
                  getDefaultDataForComponent(
                    currentComponent.componentName ||
                      currentComponent.componentType
                  ),
                  "",
                  0,
                  currentComponent.index
                )}
              </div>
            )}

            <div className="mt-4 p-3 bg-green-50 rounded">
              <p className="text-sm text-green-600">
                🎉 Success! Modal is connected to component updates. Try
                changing the inputs above.
              </p>
              <p className="text-xs text-green-500 mt-1">
                Changes will reflect in real-time on the component preview.
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={() => setShowNewInputModal(false)}
            >
              Close Modal
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => {
                console.log(
                  "💾 [MODAL SAVE] Saving configuration for:",
                  currentComponent
                );
                setShowNewInputModal(false);
              }}
            >
              Save Configuration
            </button>
          </div>
        </Modal>
      )}
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
