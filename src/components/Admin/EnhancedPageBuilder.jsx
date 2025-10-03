import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import { validateVariant } from "../../utils/variantSystem";
import Toast from "../UI/Toast";
import SectionDataEditor from "./SectionDataEditor";
import PagePreview from "./PagePreview";
import MediaInputDetector from "../UI/MediaInputDetector";
import DynamicContentForm from "../UI/DynamicContentForm";
import pagesAPI from "../../lib/pagesAPI";
import api from "../../lib/api";

const EnhancedPageBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [toast, setToast] = useState(null);

  // Ref to prevent multiple simultaneous API calls
  const isSavingRef = useRef(false);

  // Step navigation handler
  const handleStepClick = (stepId) => {
    console.log('🎯 [STEP NAVIGATION] Clicked step:', stepId);
    
    if (stepId < currentStep) {
      setCurrentStep(stepId);
      console.log(`✅ [STEP NAVIGATION] Navigated back to step ${stepId}`);
    } else if (stepId === currentStep) {
      console.log('ℹ️ [STEP NAVIGATION] Already on this step');
    } else {
      console.log('❌ [STEP NAVIGATION] Cannot skip ahead to future steps');
    }
  };

  // Page data
  const [pageData, setPageData] = useState({
    name: "",
    categoryId: null,
    slug: "",
    metaTitle: "",
    metaDescription: "",
    isHomepage: false,
    isPublished: false,
    components: [],
  });

  // Available components derived dynamically from component registry
  const [availableComponents, setAvailableComponents] = useState([]);

  useEffect(() => {
    // Lazy import to prevent circular deps when builder imports registry that imports components directory
    const loadRegistry = async () => {
      try {
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

        // Build a generic list using keys; categorize by enhanced heuristics
        const items = Object.keys(idToPathMap).map((componentType) => {
          const path = idToPathMap[componentType];
          const category = categorizeComponent(componentType, path);
          const icon = getComponentIcon(componentType, category);

          return {
            id: componentType,
            name: componentType.replace(/([A-Z])/g, " $1").trim(), // Add spaces before capital letters
            description: `Component: ${componentType}`,
            icon,
            componentType,
            componentName: componentType,
            category,
          };
        });

        setAvailableComponents(items);
      } catch (e) {
        console.error("Failed to load component registry", e);
      }
    };
    loadRegistry();
  }, []);

  // UI State
  const [editingComponent, setEditingComponent] = useState(null);
  const [showSectionEditor, setShowSectionEditor] = useState(false);
  const [showPagePreview, setShowPagePreview] = useState(false);

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
            componentType: component.componentType || "Generic",
            componentName: component.componentName || "New Component",
            orderIndex: index + 1, // Auto-generate sequentially starting from 1
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

  const addComponent = (component) => {
    // Always use schema-based default data for consistent pre-filling
    const defaultContent = getDefaultDataForComponent(component.componentType);

    console.log(
      `Adding component ${component.componentType} with default data:`,
      defaultContent
    );

    const newComponent = {
      componentType: component.componentType || "Generic",
      componentName: component.componentName || "New Component",
      contentJson: JSON.stringify(defaultContent, null, 2),
      orderIndex: pageData.components.length + 1,
    };

    setPageData((prev) => ({
      ...prev,
      components: [...prev.components, newComponent],
    }));

    showToast(
      (component.componentName || component.name || "Component") +
        " added to page",
      "success"
    );
  };

  // Function to update a specific component field
  const updateComponent = (index, field, value) => {
    console.log('🔄 [MANUFACTURING UPDATE CRITICAL]', {
      index: index,
      field: field,
      value: value,
      componentType: pageData.components[index]?.componentType,
      currentContentJson: pageData.components[index]?.contentJson
    });
    
    // Special handling for image fields
    if (field === 'image' || field === 'contentJson') {
      console.log('🖼️ [IMAGE FLOW] Image change detected:', {
        componentIndex: index,
        componentType: pageData.components[index]?.componentType,
        field: field,
        value: field === 'contentJson' ? (() => {
          try {
            const parsed = JSON.parse(value);
            return {
              rawValue: value,
              parsedValue: parsed,
              imageInJson: parsed.image,
              programsSectionImage: parsed.programsSection?.image
            };
          } catch (e) {
            return { rawValue: value, parseError: e.message };
          }
        })() : value
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
          console.error('❌ JSON Parse Error:', e);
        }
      }
      
      // Update the specific field in contentData
      if (field === 'contentJson') {
        // Direct JSON update
        updatedComponents[index] = {
          ...currentComponent,
          contentJson: value
        };
      } else {
        // Update specific field in content JSON
        const updatedContentData = {
          ...contentData,
          [field]: value
        };
        
        updatedComponents[index] = {
          ...currentComponent,
          contentJson: JSON.stringify(updatedContentData, null, 2)
        };
      }
      
      // Additional debugging for TrainingProgramsSection
        if (updatedComponents[index]?.componentType === 'TrainingProgramsSection') {
          console.log('🖼️ [TRAINING PROGRAMS UPDATE] After update:', {
            componentType: updatedComponents[index].componentType,
            contentJson: updatedComponents[index].contentJson,
            parsedContentJson: (() => {
              try {
                return JSON.parse(updatedComponents[index].contentJson || '{}');
              } catch (e) {
                return { parseError: e.message };
              }
            })()
          });
        }

        if (updatedComponents[index]?.componentType === 'IntegrationTypesSection') {
          console.log('🔗 [INTEGRATION TYPES UPDATE] After update:', {
            componentType: updatedComponents[index].componentType,
            contentJson: updatedComponents[index].contentJson,
            parsedContentJson: (() => {
              try {
                return JSON.parse(updatedComponents[index].contentJson || '{}');
              } catch (e) {
                return { parseError: e.message };
              }
            })()
          });
        }

        if (updatedComponents[index]?.componentType === 'IntegrationBenefitsSection') {
          console.log('🔗 [INTEGRATION BENEFITS UPDATE] After update:', {
            componentType: updatedComponents[index].componentType,
            contentJson: updatedComponents[index].contentJson,
            parsedContentJson: (() => {
              try {
                return JSON.parse(updatedComponents[index].contentJson || '{}');
              } catch (e) {
                return { parseError: e.message };
              }
            })()
          });
        }

        if (updatedComponents[index]?.componentType === 'ManufacturingChallengesSection') {
          console.log('🏭 [MANUFACTURING CHALLENGES UPDATE] After update:', {
            componentType: updatedComponents[index].componentType,
            contentJson: updatedComponents[index].contentJson,
            parsedContentJson: (() => {
              try {
                return JSON.parse(updatedComponents[index].contentJson || '{}');
              } catch (e) {
                return { parseError: e.message };
              }
            })()
          });
        }

        if (updatedComponents[index]?.componentType === 'CustomizationServicesSection') {
          console.log('🔧 [CUSTOMIZATION SERVICES UPDATE] After update:', {
            componentType: updatedComponents[index].componentType,
            contentJson: updatedComponents[index].contentJson,
            parsedContentJson: (() => {
              try {
                return JSON.parse(updatedComponents[index].contentJson || '{}');
              } catch (e) {
                return { parseError: e.message };
              }
            })()
          });
        }

        if (updatedComponents[index]?.componentType === 'CustomizationProcessSection') {
          console.log('🔧 [CUSTOMIZATION PROCESS UPDATE] After update:', {
            componentType: updatedComponents[index].componentType,
            contentJson: updatedComponents[index].contentJson,
            parsedContentJson: (() => {
              try {
                return JSON.parse(updatedComponents[index].contentJson || '{}');
              } catch (e) {
                return { parseError: e.message };
              }
            })()
          });
        }

        if (updatedComponents[index]?.componentType === 'ManufacturingHeroSection') {
          console.log('✅ [MANUFACTURING UPDATE COMPLETE]', {
            newContentJson: updatedComponents[index].contentJson,
            parsed: updatedComponents[index].contentJson ? 
              JSON.parse(updatedComponents[index].contentJson) : {}
          });
        }

        if (updatedComponents[index]?.componentType === 'ManufacturingChallengesSection') {
          console.log('🏭 [MANUFACTURING CHALLENGES UPDATE] After update:', {
            componentType: updatedComponents[index].componentType,
            contentJson: updatedComponents[index].contentJson,
            parsedContentJson: (() => {
              try {
                return JSON.parse(updatedComponents[index].contentJson || '{}');
              } catch (e) {
                return { parseError: e.message };
              }
            })()
          });
        }

        if (updatedComponents[index]?.componentType === 'ManufacturingSolutionsSection') {
          console.log('🏭 [MANUFACTURING SOLUTIONS UPDATE] After update:', {
            componentType: updatedComponents[index].componentType,
            contentJson: updatedComponents[index].contentJson,
            parsedContentJson: (() => {
              try {
                return JSON.parse(updatedComponents[index].contentJson || '{}');
              } catch (e) {
                return { parseError: e.message };
              }
            })()
          });
        }

        if (updatedComponents[index]?.componentType === 'ManufacturingIndustryStatsSection') {
          console.log('🏭 [MANUFACTURING STATS UPDATE] After update:', {
            componentType: updatedComponents[index].componentType,
            contentJson: updatedComponents[index].contentJson,
            parsedContentJson: (() => {
              try {
                return JSON.parse(updatedComponents[index].contentJson || '{}');
              } catch (e) {
                return { parseError: e.message };
              }
            })()
          });
        }
      
      return {
        ...prev,
        components: updatedComponents,
      };
    });
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
        }
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
        title: "About Us",
        subtitle: "Your trusted technology partner",
        description:
          "We help businesses transform through innovative technology solutions",
        backgroundImage: "/images/about-hero.jpg",
        backgroundVideo: "",
        ctaButton: {
          text: "Learn More",
          link: "/about",
          variant: validateVariant("primary"),
        },
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
        subtitle: "Transform your business operations with our expert NetSuite implementation services. Let's turn your vision into reality with proven methodologies and dedicated support.",
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
            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
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
        title: "Our Mission",
        subtitle: "Empowering business transformation",
        description:
          "We are committed to helping businesses achieve their full potential through innovative technology solutions and expert guidance.",
        missionPoints: [
          {
            title: "Innovation",
            description: "Delivering cutting-edge solutions",
            icon: "💡",
          },
          {
            title: "Excellence",
            description: "Maintaining the highest standards",
            icon: "⭐",
          },
          {
            title: "Partnership",
            description: "Building lasting relationships",
            icon: "🤝",
          },
        ],
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
    updatedComponents[componentIndex] = {
      ...updatedComponents[componentIndex],
      content: updatedData,
    };

    setPageData((prev) => ({
      ...prev,
      components: updatedComponents,
    }));

    setShowSectionEditor(false);
    setEditingComponent(null);
    showToast("Section data updated successfully", "success");
  };

  // Function to handle delete confirmation
  const handleDeleteClick = async (componentIndex) => {
    console.log('🗑️ [DELETE CLICK] Component to delete:', componentIndex);
    const component = pageData.components[componentIndex];
    
    try {
      setLoading(true);
      console.log('🚀 [DELETE API] Deleting component:', component);

      // Create updated components array without the deleted component
      const updatedComponents = pageData.components.filter((_, index) => index !== componentIndex);
      
      // Update order indices for remaining components
      const reorderedComponents = updatedComponents.map((comp, index) => ({
        ...comp,
        orderIndex: index + 1
      }));

      // Update page data
      const updatedPageData = {
        ...pageData,
        components: reorderedComponents
      };

      setPageData(updatedPageData);
      showToast("Component deleted successfully", "success");
      
      console.log('✅ [DELETE API] Component deleted successfully');
    } catch (error) {
      console.error('❌ [DELETE API] Error deleting component:', error);
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
      <div className="min-h-screen bg-[#001038] relative overflow-hidden">
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Enhanced Page Builder
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Create dynamic pages with customizable sections and rich content
            </p>
          </div>

          {/* Creative full-width process bar */}
          <div className="mb-10">
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
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
                  <div key={step.id} className="flex items-start space-x-3 group">
                    {/* Interactive Step Circle */}
                    <button
                      onClick={() => handleStepClick(step.id)}
                      disabled={isFuture}
                      className={`
                        flex items-center justify-center w-9 h-9 rounded-full border-2 
                        transition-all duration-200 transform
                        ${isCompleted 
                          ? 'bg-green-500 border-green-500 text-white cursor-pointer hover:bg-green-600 hover:border-green-600 hover:scale-110 shadow-lg shadow-green-500/25' 
                          : isCurrent
                          ? 'bg-blue-500 border-blue-500 text-white cursor-default shadow-lg shadow-blue-500/25'
                          : 'bg-transparent border-gray-600 text-gray-400 cursor-not-allowed'
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
                          ${isCompleted 
                            ? 'text-green-400 group-hover:text-green-300' 
                            : isCurrent
                            ? 'text-blue-400'
                            : 'text-gray-400'
                          }
                        `}
                      >
                        {step.title}
                      </div>
                      <div
                        className={`
                          text-xs transition-colors duration-200
                          ${isCompleted 
                            ? 'text-green-300' 
                            : isCurrent
                            ? 'text-blue-300'
                            : 'text-gray-500'
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
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/pages")}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200"
              >
                Cancel
              </Button>

              {currentStep >= 2 && pageData.components.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setShowPagePreview(true)}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-200"
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Preview Page
                </Button>
              )}

              {currentStep < steps.length ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading && !isPublishing ? "Saving..." : "Save as Draft"}
                  </Button>
                  <Button
                    onClick={() => handleSave("published")}
                    loading={isPublishing}
                    disabled={
                      !isStepValid(currentStep) || isPublishing || loading
                    }
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
              ? "border-blue-400 bg-blue-500/10"
              : "border-white/10 hover:border-white/20 bg-white/5"
          }`}
        >
          <div className="text-white font-semibold">{c.name}</div>
          {c.description && (
            <div className="text-white/70 text-sm mt-1">{c.description}</div>
          )}
        </button>
      ))}
    </div>
  );
};

// Step 1: Page Details
const PageDetailsStep = ({ pageData, onDataChange }) => {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">
          Page Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Page Name *
            </label>
            <Input
              value={pageData.name}
              onChange={(e) => onDataChange("name", e.target.value)}
              placeholder="Enter page name"
              className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              URL Slug *
            </label>
            <Input
              type="text"
              value={pageData.slug}
              onChange={(e) => onDataChange("slug", e.target.value)}
              placeholder="page-url-slug"
              pattern="[a-z0-9-]+"
              title="Slug must only contain lowercase letters, numbers, and dashes."
              className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20"
            />
            <p className="text-sm text-gray-300 mt-2">
              URL: /{pageData.slug || "page-url-slug"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Slug must only contain lowercase letters, numbers, and dashes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              SEO Meta Title
            </label>
            <Input
              value={pageData.metaTitle}
              onChange={(e) => onDataChange("metaTitle", e.target.value)}
              placeholder="SEO title for search engines"
              className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20"
            />
          </div>
          <div></div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            SEO Meta Description
          </label>
          <textarea
            value={pageData.metaDescription}
            onChange={(e) => onDataChange("metaDescription", e.target.value)}
            placeholder="SEO description for search engines"
            rows={3}
            className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm resize-none"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={pageData.isHomepage}
              onChange={(e) => onDataChange("isHomepage", e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-white">Set as Homepage</span>
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
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200"
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
              {pageData.components.map((component, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    {/* Content Configuration - Full Width */}
                    <div className="md:col-span-2">
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

                      {/* Dynamic Form View */}
                      {(!component.viewMode ||
                        component.viewMode === "form") && (
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4">
                          <DynamicContentForm
                            contentJson={component.contentJson || "{}"}
                            componentType={component.componentType}
                            onChange={(jsonString) =>
                              handleComponentUpdate(
                                index,
                                "contentJson",
                                jsonString
                              )
                            }
                            className="text-white [&_label]:text-gray-300 [&_input]:bg-white/10 [&_input]:border-white/20 [&_input]:text-white [&_input::placeholder]:text-white/50 [&_input:focus]:border-blue-400 [&_button]:bg-white/10 [&_button]:border-white/20 [&_button]:text-white [&_button:hover]:bg-white/20"
                          />
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
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Step 3: Review
const ReviewStep = ({ pageData }) => {
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
          <CardTitle className="text-white text-xl font-bold">
            Components ({pageData.components.length})
          </CardTitle>
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
              {pageData.components.map((component, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10"
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
              ))}
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
