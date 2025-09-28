/**
 * Normalizes JSON data to match component prop expectations
 * This function maps JSON structure keys to the correct prop names that components expect
 */

/**
 * Normalizes props for different component types based on their expected prop structure
 * @param {string} componentType - The type of component (e.g., 'IntegrationTypesSection')
 * @param {Object} contentJson - The parsed JSON data from the backend
 * @returns {Object} - Normalized props that match component expectations
 */
export const normalizeProps = (componentType, contentJson) => {
  if (!contentJson || typeof contentJson !== 'object') {
    console.warn(`normalizeProps: Invalid contentJson for ${componentType}:`, contentJson);
    return {};
  }

  // Component-specific normalization mappings
  const componentMappings = {
    // Integration Components
    'IntegrationTypesSection': (data) => ({
      title: data.integrationTypes?.title || data.title || "Integration Solutions",
      items: data.integrationTypes?.items || data.items || []
    }),

    'IntegrationBenefitsSection': (data) => ({
      title: data.benefits?.title || data.title || "Integration Benefits", 
      items: data.benefits?.items || data.items || [],
      benefits: data.benefits?.items || data.benefits || data.items || [] // Alternative prop name
    }),

    'PopularIntegrationsSection': (data) => ({
      title: data.popularIntegrations?.title || data.title || "Popular Integrations",
      platforms: data.popularIntegrations?.platforms || data.platforms || []
    }),

    // Payroll Components
    'PayrollPainPointsSection': (data) => ({
      title: data.painPoints?.title || data.title || "Common Payroll Pain Points",
      subtitle: data.painPoints?.subtitle || data.subtitle || "Problems we solve",
      painPoints: data.painPoints?.items || data.painPoints?.painPoints || data.painPoints || data.items || []
    }),

    'PayrollBenefitsSection': (data) => ({
      title: data.benefits?.title || data.title || "Payroll Benefits",
      items: data.benefits?.items || data.items || [],
      benefits: data.benefits?.items || data.benefits || data.items || []
    }),

    'PayrollWorkflowSection': (data) => ({
      title: data.workflow?.title || data.title || "Payroll Workflow",
      subtitle: data.workflow?.subtitle || data.subtitle || "How our payroll process works",
      steps: data.workflow?.steps || data.steps || data.workflow || []
    }),

    'PayrollStepperSection': (data) => ({
      title: data.coreWorkflow?.title || data.stepper?.title || data.title || "Payroll Process Steps",
      steps: data.coreWorkflow?.steps || data.stepper?.steps || data.steps || data.stepper || []
    }),

    'PayrollFAQSection': (data) => ({
      title: data.faq?.title || data.title || "Payroll FAQ",
      subtitle: data.faq?.subtitle || data.subtitle || "Frequently asked questions",
      faqs: data.faq?.items || data.faq?.faqs || data.faqs || data.items || []
    }),

    'PayrollCTASection': (data) => ({
      title: data.cta?.title || data.title || "Ready to Get Started?",
      subtitle: data.cta?.description || data.cta?.subtitle || data.subtitle || "Contact us today to learn more",
      buttonText: data.cta?.buttonText || data.buttonText || "Get Started",
      cta: data.cta || {
        title: data.cta?.title || data.title,
        subtitle: data.cta?.description || data.cta?.subtitle || data.subtitle,
        buttonText: data.cta?.buttonText || data.buttonText
      }
    }),

    'PayrollFeaturesSection': (data) => ({
      title: data.features?.title || data.title || "Key Features",
      description: data.features?.description || data.subtitle || data.description,
      items: data.features?.items || data.features || data.items || []
    }),

    'PayrollHowItWorksSection': (data) => ({
      title: data.howItWorks?.title || data.title || "How It Works",
      description: data.howItWorks?.description || data.subtitle || data.description,
      steps: data.coreWorkflow?.steps || data.howItWorks?.steps || data.steps || []
    }),

    'PayrollWhyPerfectSection': (data) => ({
      title: data.whyPerfect?.title || data.title || "Why It's Perfect",
      items: data.whyPerfect?.items || data.whyPerfect || data.items || []
    }),

    // HR Components
    'HRHeroSection': (data) => ({
      data: {
        hero: {
          title: data.hero?.title || data.title || "HR Management Solutions",
          subtitle: data.hero?.subtitle || data.subtitle || "Streamline your HR processes",
          bgVideo: data.hero?.bgVideo || data.bgVideo,
          bgColor: data.hero?.bgColor || data.bgColor
        }
      }
    }),

    'HRModulesSection': (data) => ({
      data: {
        title: data.modules?.title || data.title || "HR Modules",
        subtitle: data.modules?.subtitle || data.subtitle || "Comprehensive HR solutions",
        modules: data.modules?.items || data.modules?.modules || data.modules || data.items || []
      }
    }),

    'HRBenefitsSection': (data) => ({
      title: data.benefits?.title || data.title || "HR Benefits",
      items: data.benefits?.items || data.items || [],
      benefits: data.benefits?.items || data.benefits || data.items || []
    }),

    // Training Components
    'TrainingHeroSection': (data) => ({
      heroContent: {
        title: data.heroContent?.title || data.hero?.title || data.title || "Professional Training Programs",
        subtitle: data.heroContent?.description || data.hero?.subtitle || data.subtitle || "Empower your team with comprehensive training solutions",
        description: data.heroContent?.description || data.hero?.subtitle || data.subtitle
      },
      backgroundVideo: data.backgroundVideo || data.hero?.bgVideo || "/Videos/trainingHeroSection.mp4",
      ctaButton: data.ctaButton || data.hero?.ctaButton || {
        text: "Start Learning Today",
        link: "/training",
        variant: "primary"
      }
    }),

    'TrainingProgramsSection': (data) => ({
      programsSection: data.programsSection || {
        title: data.title || "Our Training Programs",
        description: data.subtitle || "Comprehensive training solutions designed to empower your team",
        image: data.image || "/images/training.jpg",
        Professional_Badge: data.badge || "Certified Training"
      },
      trainingPrograms: {
        programs: data.trainingPrograms?.programs || data.programs || data.trainingPrograms || []
      }
    }),

    'TrainingWhyChooseSection': (data) => ({
      whyChooseSection: data.whyChooseSection || {
        title: data.title || "Why Choose Our Training?",
        subtitle: data.subtitle || "We provide world-class training solutions",
        image: data.image || "/images/choose.png",
        Professional_Badge: data.badge || "Excellence Training"
      },
      trainingFeatures: data.trainingFeatures || data.features || []
    }),

    // Implementation Components
    'ImplementationHeroSection': (data) => ({
      data: {
        hero: {
          title: data.hero?.title || data.title || "Implementation Services",
          subtitle: data.hero?.subtitle || data.subtitle || "Professional NetSuite implementation",
          bgVideo: data.hero?.bgVideo || data.bgVideo,
          bgColor: data.hero?.bgColor || data.bgColor
        }
      }
    }),

    'ImplementationProcessSection': (data) => ({
      data: {
        title: data.process?.title || data.title || "Implementation Process",
        subtitle: data.process?.subtitle || data.subtitle || "Our proven implementation methodology",
        steps: data.process?.steps || data.steps || data.process || []
      }
    }),

    'ImplementationBenefitsSection': (data) => ({
      title: data.benefits?.title || data.title || "Implementation Benefits",
      items: data.benefits?.items || data.items || [],
      benefits: data.benefits?.items || data.benefits || data.items || []
    }),

    // Generic fallback for unknown components
    'default': (data) => {
      // Try to extract common patterns
      const normalized = {};
      
      // Common title patterns
      if (data.title) normalized.title = data.title;
      if (data.subtitle) normalized.subtitle = data.subtitle;
      if (data.description) normalized.description = data.description;
      
      // Common array patterns - try to find the most relevant array
      const arrayKeys = ['items', 'list', 'steps', 'benefits', 'features', 'modules', 'programs', 'faqs', 'painPoints'];
      for (const key of arrayKeys) {
        if (data[key] && Array.isArray(data[key])) {
          normalized[key] = data[key];
          // Also set as 'items' for components that expect it
          if (!normalized.items) normalized.items = data[key];
        }
      }
      
      return normalized;
    }
  };

  // Get the specific mapping function or use default
  const mappingFunction = componentMappings[componentType] || componentMappings['default'];
  
  try {
    const normalizedProps = mappingFunction(contentJson);
    console.log(`normalizeProps: Normalized props for ${componentType}:`, normalizedProps);
    return normalizedProps;
  } catch (error) {
    console.error(`normalizeProps: Error normalizing props for ${componentType}:`, error);
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
  if (!data || typeof data !== 'object') return defaultValue;
  
  const keys = path.split('.');
  let current = data;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
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
    'IntegrationTypesSection': ['title', 'items'],
    'IntegrationBenefitsSection': ['title', 'items'],
    'PopularIntegrationsSection': ['title', 'platforms'],
    'PayrollPainPointsSection': ['title', 'painPoints'],
    'PayrollBenefitsSection': ['title', 'items'],
    'PayrollWorkflowSection': ['title', 'steps'],
    'PayrollStepperSection': ['steps'],
    'PayrollFAQSection': ['title', 'faqs'],
    'PayrollCTASection': ['title', 'cta'],
    'HRHeroSection': ['data'],
    'HRModulesSection': ['data'],
    'HRBenefitsSection': ['title', 'items'],
    'TrainingHeroSection': ['heroContent'],
    'TrainingProgramsSection': ['programsSection', 'trainingPrograms'],
    'TrainingWhyChooseSection': ['whyChooseSection', 'trainingFeatures']
  };

  const required = requiredProps[componentType] || [];
  const missingProps = required.filter(prop => {
    if (prop.includes('.')) {
      // Handle nested props like 'data.hero'
      return !safeGet(props, prop);
    }
    return !props[prop] || (Array.isArray(props[prop]) && props[prop].length === 0);
  });

  return {
    isValid: missingProps.length === 0,
    missingProps
  };
};

export default normalizeProps;
