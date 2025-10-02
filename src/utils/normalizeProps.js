import { validateVariant } from "./variantSystem";

/**
 * Normalizes JSON data to match component prop expectations
 * This function maps JSON stru      ctaButton: data.ctaButton || data.hero?.ctaButton || {
        text: "Get Started",
        link: "/training",
        variant: validateVariant("primary")
      }, keys to the correct prop names that components expect
 */

/**
 * Normalizes props for different component types based on their expected prop structure
 * @param {string} componentType - The type of component (e.g., 'IntegrationTypesSection')
 * @param {Object} contentJson - The parsed JSON data from the backend
 * @returns {Object} - Normalized props that match component expectations
 */
export const normalizeProps = (componentType, contentJson) => {
  if (!contentJson || typeof contentJson !== "object") {
    console.warn(
      `normalizeProps: Invalid contentJson for ${componentType}:`,
      contentJson
    );
    return {};
  }

  console.log(
    `🔄 [normalizeProps] Processing ${componentType} with data:`,
    contentJson
  );

  // Component-specific normalization mappings
  const componentMappings = {
    // Integration Components
    IntegrationTypesSection: (data) => ({
      title:
        data.integrationTypes?.title || data.title || "Integration Solutions",
      items: data.integrationTypes?.items || data.items || [],
    }),

    IntegrationBenefitsSection: (data) => ({
      title: data.benefits?.title || data.title || "Integration Benefits", 
      items: data.benefits?.items || data.items || [],
      benefits: data.benefits?.items || data.benefits || data.items || [], // Alternative prop name
    }),

    PopularIntegrationsSection: (data) => ({
      title:
        data.popularIntegrations?.title || data.title || "Popular Integrations",
      platforms: data.popularIntegrations?.platforms || data.platforms || [],
    }),

    // Payroll Components
    PayrollHeroSection: (data) => ({
      title: data.title || "Automated Payroll Solutions",
      subtitle:
        data.subtitle || "Simplify payroll processing with our advanced system",
      description:
        data.description ||
        "Reduce errors and save time with automated payroll management",
      ctaButton: data.ctaButton || {
        text: "Get Started",
        link: "/payroll",
        variant: validateVariant("primary"),
      },
      backgroundImage: data.backgroundImage,
      bgVideo: data.bgVideo,
      bgColor: data.bgColor,
    }),

    PayrollPainPointsSection: (data) => ({
      title:
        data.painPoints?.title || data.title || "Common Payroll Pain Points",
      subtitle:
        data.painPoints?.subtitle || data.subtitle || "Problems we solve",
      painPoints:
        data.painPoints?.items ||
        data.painPoints?.painPoints ||
        data.painPoints ||
        data.items ||
        [],
    }),

    PayrollBenefitsSection: (data) => ({
      title: data.benefits?.title || data.title || "Payroll Benefits",
      items: data.benefits?.items || data.items || [],
      benefits: data.benefits?.items || data.benefits || data.items || [],
    }),

    PayrollWorkflowSection: (data) => ({
      title: data.workflow?.title || data.title || "Payroll Workflow",
      subtitle:
        data.workflow?.subtitle ||
        data.subtitle ||
        "How our payroll process works",
      steps: data.workflow?.steps || data.steps || data.workflow || [],
    }),

    PayrollStepperSection: (data) => ({
      title:
        data.coreWorkflow?.title ||
        data.stepper?.title ||
        data.title ||
        "Payroll Process Steps",
      steps:
        data.coreWorkflow?.steps ||
        data.stepper?.steps ||
        data.steps ||
        data.stepper ||
        [],
    }),

    PayrollFAQSection: (data) => ({
      title: data.faq?.title || data.title || "Payroll FAQ",
      subtitle:
        data.faq?.subtitle || data.subtitle || "Frequently asked questions",
      faqs: data.faq?.items || data.faq?.faqs || data.faqs || data.items || [],
    }),

    PayrollCTASection: (data) => {
      console.log("🔧 [PayrollCTASection] Raw form data:", data);

      // SIMPLIFIED APPROACH: Use form data directly, minimal defaults
      const normalized = {
        // DIRECT FORM DATA MAPPING - no complex fallbacks
        title: data.title || "Ready to Simplify Your Payroll?",
        subtitle: data.subtitle || "",
        description: data.description || "",

        // CTA Button - simple structure
        ctaButton: {
          text: data.ctaButton?.text || data.buttonText || "Start Free Trial",
          link: data.ctaButton?.link || data.link || "/payroll/trial",
          variant: data.ctaButton?.variant || "primary",
        },

        // Features - only include if provided
        ...(data.features && { features: data.features }),
        ...(data.trustedBy && { trustedBy: data.trustedBy }),
      };

      console.log("✅ [PayrollCTASection] Normalized data:", normalized);
      return normalized;
    },

    PayrollFeaturesSection: (data) => ({
      title: data.features?.title || data.title || "Key Features",
      description:
        data.features?.description || data.subtitle || data.description,
      items: data.features?.items || data.features || data.items || [],
    }),

    PayrollHowItWorksSection: (data) => ({
      title: data.howItWorks?.title || data.title || "How It Works",
      description:
        data.howItWorks?.description || data.subtitle || data.description,
      steps:
        data.coreWorkflow?.steps || data.howItWorks?.steps || data.steps || [],
    }),

    PayrollWhyPerfectSection: (data) => ({
      title: data.whyPerfect?.title || data.title || "Why It's Perfect",
      items: data.whyPerfect?.items || data.whyPerfect || data.items || [],
    }),

    // HR Components
    HRHeroSection: (data) => ({
      data: {
        hero: {
          title: data.hero?.title || data.title || "HR Management Solutions",
          subtitle:
            data.hero?.subtitle ||
            data.subtitle ||
            "Streamline your HR processes",
          bgVideo: data.hero?.bgVideo || data.bgVideo,
          bgColor: data.hero?.bgColor || data.bgColor,
        },
      },
    }),

    HRModulesSection: (data) => ({
      data: {
        title: data.title || "HR Modules",
        subtitle: data.subtitle || "Comprehensive HR solutions", 
        description: data.description || "",
        modules: (data.features || data.modules || data.items || []).map(
          (item) => ({
          ...item,
            desc: item.description || item.desc || "Module description",
          })
        ),
      },
    }),

    HRBenefitsSection: (data) => ({
      title: data.benefits?.title || data.title || "HR Benefits",
      items: data.benefits?.items || data.items || [],
      benefits: data.benefits?.items || data.benefits || data.items || [],
    }),

    // Training Components
    TrainingHeroSection: (data) => ({
      heroContent: {
        title:
          data.heroContent?.title ||
          data.hero?.title ||
          data.title ||
          "Professional Training Programs",
        subtitle:
          data.heroContent?.description ||
          data.hero?.subtitle ||
          data.subtitle ||
          "Empower your team with comprehensive training solutions",
        description:
          data.heroContent?.description || data.hero?.subtitle || data.subtitle,
      },
      backgroundVideo:
        data.backgroundVideo ||
        data.bgVideo ||
        data.heroContent?.backgroundVideo ||
        "/trainingHeroSectionTwo.mp4",
      ctaButton: data.ctaButton ||
        data.hero?.ctaButton || {
        text: "Start Learning Today",
        link: "/training",
          variant: "primary",
        },
    }),

    TrainingProgramsSection: (data) => ({
      programsSection: data.programsSection || {
        title: data.title || "Our Training Programs",
        description:
          data.subtitle ||
          "Comprehensive training solutions designed to empower your team",
        image: data.image || "/images/training.jpg",
        Professional_Badge: data.badge || "Certified Training",
      },
      trainingPrograms: {
        programs:
          data.trainingPrograms?.programs ||
          data.programs ||
          data.trainingPrograms ||
          [],
      },
    }),

    TrainingWhyChooseSection: (data) => ({
      whyChooseSection: data.whyChooseSection || {
        title: data.title || "Why Choose Our Training?",
        subtitle: data.subtitle || "We provide world-class training solutions",
        image: data.image || "/images/choose.png",
        Professional_Badge: data.badge || "Excellence Training",
      },
      trainingFeatures: data.trainingFeatures || data.features || [],
    }),

    // Implementation Components
    ImplementationHeroSection: (data) => {
      console.log('🔧 [ImplementationHeroSection] Raw form data:', data);
      
      // FIX: Use validateVariant to convert string to proper variant
      const ctaVariant = validateVariant(data.ctaButton?.variant || data.variant || "primary");
      
      const normalized = {
        data: {
          backgroundVideo: data.backgroundVideo || data.backgroundImage || "/Videos/HomeHeroSectionV.mp4",
          backgroundImage: data.backgroundImage || data.backgroundVideo || "/Videos/HomeHeroSectionV.mp4",
          title: data.title || "Implementation Services",
          subtitle: data.subtitle || "Seamless deployments by experts",
          titleParts: data.titleParts || (data.title && data.subtitle ? [data.title, data.subtitle] : ["Implementation", "Services", "Made", "Simple"]),
          description: data.description || "We plan, configure, and launch with zero downtime",
          ctaButton: {
            text: data.ctaButton?.text || data.buttonText || "Talk to an expert",
            link: data.ctaButton?.link || data.link || "/contact",
            variant: ctaVariant, // Now this is a validated variant string
            icon: data.ctaButton?.icon || data.icon || "M13 7l5 5m0 0l-5 5m5-5H6",
          },
        },
      };
      
      console.log('✅ [ImplementationHeroSection] Normalized data:', normalized);
      console.log('🎯 [ImplementationHeroSection] CTA Variant:', ctaVariant);
      return normalized;
    },

    ImplementationProcessSection: (data) => ({
        title: data.process?.title || data.title || "Implementation Process",
      subtitle: data.process?.subtitle || data.subtitle || "Our proven methodology",
      description: data.process?.description || data.description || "A structured approach to successful implementation",
      phases: data.process?.phases || data.phases || data.steps || [],
    }),

    ImplementationBenefitsSection: (data) => ({
      title: data.benefits?.title || data.title || "Implementation Benefits",
      items: data.benefits?.items || data.items || [],
      benefits: data.benefits?.items || data.benefits || data.items || [],
    }),

    ImplementationCTASection: (data) => {
      console.log('🔧 [ImplementationCTASection] Raw form data:', data);
      console.log('📝 [ImplementationCTASection] Text fields:', {
        buttonText: data.buttonText,
        ctaButtonText: data.ctaButton?.text,
        buttonText: data.button?.text,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description
      });
      console.log('🔍 [ImplementationCTASection] ALL TEXT OPTIONS:', {
        // Check all possible button text properties
        buttonText: data.buttonText,
        ctaButtonText: data.ctaButton?.text,
        buttonText: data.button?.text,
        text: data.text,
        ctaText: data.ctaText,
        btnText: data.btnText,
        // Also check root level
        ...data
      });
      
      const buttonVariant = validateVariant(data.ctaButton?.variant || data.button?.variant || data.variant || "primary");
      
      // Try ALL possible button text sources
      const buttonText = 
        data.ctaButton?.text || 
        data.button?.text || 
        data.buttonText || 
        data.text ||
        data.ctaText ||
        data.btnText ||
        "Get a quote";
      
      // Use only features property
      const featuresData = data.features || [
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
      ];

      console.log('🎯 [FEATURES DEBUG] Features data:', {
        features: data.features,
        finalFeatures: featuresData
      });

      const normalized = {
        // Structure 1: Direct props
        title: data.title || "Ready for a Seamless NetSuite Implementation?",
        subtitle: data.subtitle || "Transform your business operations with our expert NetSuite implementation services. Let's turn your vision into reality with proven methodologies and dedicated support.",
        description: data.description || "",
        
        // Structure 2: CTA button
        ctaButton: {
          text: buttonText,
          link: data.ctaButton?.link || data.button?.link || data.link || "/implementation/contact",
          variant: buttonVariant,
        },
        
        // Structure 3: Alternative button prop (some components use this)
        button: {
          text: buttonText,
          link: data.ctaButton?.link || data.button?.link || data.link || "/implementation/contact",
          variant: buttonVariant,
        },
        
        // Structure 4: Direct text prop (some components use this)
        buttonText: buttonText,
        buttonLink: data.ctaButton?.link || data.button?.link || data.link || "/implementation/contact",
        
        // ADD: Features data mapping
        features: featuresData,
      };
      
      console.log('✅ [ImplementationCTASection] Final normalized:', normalized);
      console.log('🎯 [ImplementationCTASection] Final button text:', normalized.ctaButton.text);
      console.log('🎯 [ImplementationCTASection] Alternative button text:', normalized.button.text);
      console.log('🎯 [ImplementationCTASection] Direct button text:', normalized.buttonText);
      return normalized;
    },

    // Generic fallback for unknown components
    default: (data) => {
      // Try to extract common patterns
      const normalized = {};
      
      // Common title patterns
      if (data.title) normalized.title = data.title;
      if (data.subtitle) normalized.subtitle = data.subtitle;
      if (data.description) normalized.description = data.description;
      
      // Common array patterns - try to find the most relevant array
      const arrayKeys = [
        "items",
        "list",
        "steps",
        "benefits",
        "features",
        "modules",
        "programs",
        "faqs",
        "painPoints",
      ];
      for (const key of arrayKeys) {
        if (data[key] && Array.isArray(data[key])) {
          normalized[key] = data[key];
          // Also set as 'items' for components that expect it
          if (!normalized.items) normalized.items = data[key];
        }
      }
      
      return normalized;
    },
  };

  // Get the specific mapping function or use default
  const mappingFunction =
    componentMappings[componentType] || componentMappings["default"];

  if (!mappingFunction) {
    console.warn(
      `normalizeProps: No mapping function found for ${componentType}`
    );
    return {};
  }
  
  try {
    const normalizedProps = mappingFunction(contentJson);

    // Enhanced logging to verify form data is being used
    console.log(`✅ [normalizeProps] Successfully normalized ${componentType}`);
    console.log(
      `📤 [normalizeProps] Input data keys:`,
      Object.keys(contentJson)
    );
    console.log(
      `📤 [normalizeProps] Output props keys:`,
      Object.keys(normalizedProps)
    );

    // Check if form data was actually used (not just defaults)
    const hasFormData = Object.keys(contentJson).length > 0;
    if (hasFormData) {
      console.log(
        `✅ [normalizeProps] Form data detected and processed for ${componentType}`
      );
    } else {
      console.log(
        `⚠️ [normalizeProps] No form data found for ${componentType}, using defaults`
      );
    }

    return normalizedProps;
  } catch (error) {
    console.error(
      `❌ [normalizeProps] Error normalizing props for ${componentType}:`,
      error
    );
    return {};
  }
};

/**
 * Helper function to safely extract data from nested JSON structures
 * @param {Object} data - The data object
 * @param {string} path - Dot notation path (e.g., 'integrationTypes.items')
 * @param {*} defaultValue - Default value if path not found
 * @returns {*} - The value at the path or default value
 */
export const safeGet = (data, path, defaultValue = null) => {
  if (!data || typeof data !== "object") return defaultValue;
  
  const keys = path.split(".");
  let current = data;
  
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return defaultValue;
    }
  }
  
  return current !== undefined ? current : defaultValue;
};

/**
 * Validates that required props are present for a component
 * @param {string} componentType - The component type
 * @param {Object} props - The props to validate
 * @returns {Object} - Validation result with isValid and missingProps
 */
export const validateProps = (componentType, props) => {
  const requiredProps = {
    IntegrationTypesSection: ["title", "items"],
    IntegrationBenefitsSection: ["title", "items"],
    PopularIntegrationsSection: ["title", "platforms"],
    PayrollHeroSection: ["title", "subtitle"],
    PayrollPainPointsSection: ["title", "painPoints"],
    PayrollBenefitsSection: ["title", "items"],
    PayrollWorkflowSection: ["title", "steps"],
    PayrollStepperSection: ["steps"],
    PayrollFAQSection: ["title", "faqs"],
    PayrollCTASection: ["title", "cta"],
    HRHeroSection: ["data"],
    HRModulesSection: ["data"],
    HRBenefitsSection: ["title", "items"],
    ImplementationHeroSection: ["data"],
    ImplementationCTASection: ["title", "ctaButton"],
    TrainingHeroSection: ["heroContent"],
    TrainingProgramsSection: ["programsSection", "trainingPrograms"],
    TrainingWhyChooseSection: ["whyChooseSection", "trainingFeatures"],
  };

  const required = requiredProps[componentType] || [];
  const missingProps = required.filter((prop) => {
    if (prop.includes(".")) {
      // Handle nested props like 'data.hero'
      return !safeGet(props, prop);
    }
    return (
      !props[prop] || (Array.isArray(props[prop]) && props[prop].length === 0)
    );
  });

  return {
    isValid: missingProps.length === 0,
    missingProps,
  };
};

export default normalizeProps;
