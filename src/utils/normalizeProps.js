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
    IntegrationTypesSection: (data) => {
      console.log("🔗 [INTEGRATION TYPES DEBUG] Raw form data:", data);
      console.log("🔗 [INTEGRATION TYPES DEBUG] Data structure analysis:", {
        hasIntegrationTypes: !!data.integrationTypes,
        hasItems: !!data.items,
        hasTypes: !!data.types,
        integrationTypesItems: data.integrationTypes?.items,
        directItems: data.items,
        directTypes: data.types,
        allDataKeys: Object.keys(data),
      });

      // PRIORITY: Direct form data OVERRIDES everything
      const itemsSource =
        data.items || // Direct items from form
        data.integrationTypes?.items || // Nested in integrationTypes
        data.types || // Alternative types array
        []; // Empty array fallback

      console.log("🔗 [INTEGRATION TYPES DEBUG] Items source decision:", {
        source: data.items
          ? "directItems"
          : data.integrationTypes?.items
          ? "nestedItems"
          : data.types
          ? "types"
          : "empty",
        finalItems: itemsSource,
        itemsCount: itemsSource.length,
      });

      // FIX: Ensure proper property mapping for each item
      const normalizedItems = itemsSource.map((item, index) => {
        console.log(`🔗 [INTEGRATION TYPES DEBUG] Processing item ${index}:`, {
          originalItem: item,
          hasName: !!item.name,
          hasTitle: !!item.title,
          hasDescription: !!item.description,
          hasIcon: !!item.icon,
        });

        const normalizedItem = {
          title: item.title || item.name || `Integration ${index + 1}`, // Use title as primary (matches component)
          description:
            item.description || item.desc || "Integration description",
          icon: item.icon || "🔗",
        };

        console.log(
          `🔗 [INTEGRATION TYPES DEBUG] Normalized item ${index}:`,
          normalizedItem
        );
        return normalizedItem;
      });

      const normalized = {
        title:
          data.integrationTypes?.title || data.title || "Integration Solutions",
        items: normalizedItems,
      };

      console.log(
        "✅ [INTEGRATION TYPES DEBUG] Final normalized data:",
        normalized
      );
      console.log(
        "🔗 [INTEGRATION TYPES DEBUG] Final items array with titles:",
        normalizedItems
      );
      return normalized;
    },

    IntegrationBenefitsSection: (data) => {
      console.log("🔗 [INTEGRATION BENEFITS DEBUG] Raw form data:", data);
      console.log("🔗 [INTEGRATION BENEFITS DEBUG] Data structure:", {
        hasBenefits: !!data.benefits,
        hasItems: !!data.items,
        benefitsType: Array.isArray(data.benefits)
          ? "array"
          : typeof data.benefits,
        itemsType: Array.isArray(data.items) ? "array" : typeof data.items,
        allKeys: Object.keys(data),
      });

      // Handle multiple possible data structures
      let benefitsArray = [];

      if (Array.isArray(data.benefits)) {
        // Direct benefits array from form
        benefitsArray = data.benefits;
        console.log(
          "🔗 [INTEGRATION BENEFITS DEBUG] Using direct benefits array:",
          benefitsArray
        );
      } else if (Array.isArray(data.items)) {
        // Items array from form
        benefitsArray = data.items;
        console.log(
          "🔗 [INTEGRATION BENEFITS DEBUG] Using items array:",
          benefitsArray
        );
      } else if (data.benefits && Array.isArray(data.benefits.items)) {
        // Nested benefits.items structure
        benefitsArray = data.benefits.items;
        console.log(
          "🔗 [INTEGRATION BENEFITS DEBUG] Using nested benefits.items:",
          benefitsArray
        );
      }

      console.log(
        "🔗 [INTEGRATION BENEFITS DEBUG] Benefits array:",
        benefitsArray
      );

      // Normalize each benefit item
      const normalizedBenefits = benefitsArray.map((item, index) => {
        console.log(
          `🔗 [INTEGRATION BENEFITS DEBUG] Processing benefit ${index}:`,
          {
            originalItem: item,
            hasTitle: !!item.title,
            hasName: !!item.name,
            hasDescription: !!item.description,
            hasIcon: !!item.icon,
          }
        );

        const normalizedItem = {
          title: item.title || item.name || `Benefit ${index + 1}`,
          description: item.description || item.desc || "Benefit description",
          icon: item.icon || "⚡",
        };

        console.log(
          `🔗 [INTEGRATION BENEFITS DEBUG] Normalized benefit ${index}:`,
          normalizedItem
        );
        return normalizedItem;
      });

      const normalized = {
        title: data.benefits?.title || data.title || "Integration Benefits",
        items: normalizedBenefits,
        benefits: normalizedBenefits, // Support both prop names
      };

      console.log(
        "✅ [INTEGRATION BENEFITS DEBUG] Final normalized data:",
        normalized
      );
      return normalized;
    },

    // Customization Components
    CustomizationServicesSection: (data) => {
      console.log("🔧 [CUSTOMIZATION SERVICES DEBUG] Raw form data:", data);
      console.log("🔧 [CUSTOMIZATION SERVICES DEBUG] Data structure:", {
        hasServices: !!data.services,
        hasItems: !!data.items,
        hasCustomizationServices: !!data.customizationServices,
        servicesType: Array.isArray(data.services)
          ? "array"
          : typeof data.services,
        itemsType: Array.isArray(data.items) ? "array" : typeof data.items,
        allKeys: Object.keys(data),
      });

      // Handle multiple data structures
      const servicesSource =
        data.services ||
        data.items ||
        data.customizationServices?.services ||
        [];

      console.log(
        "🔧 [CUSTOMIZATION SERVICES DEBUG] Services source:",
        servicesSource
      );

      // Normalize each service item
      const normalizedServices = servicesSource.map((service, index) => {
        console.log(
          `🔧 [CUSTOMIZATION SERVICES DEBUG] Processing service ${index}:`,
          {
            originalService: service,
            hasName: !!service.name,
            hasTitle: !!service.title,
            hasDescription: !!service.description,
            hasIcon: !!service.icon,
          }
        );

        const normalizedService = {
          name: service.name || service.title || `Service ${index + 1}`,
          description:
            service.description || service.desc || "Service description",
          icon: service.icon || "⚙️",
        };

        console.log(
          `🔧 [CUSTOMIZATION SERVICES DEBUG] Normalized service ${index}:`,
          normalizedService
        );
        return normalizedService;
      });

      const normalized = {
        title:
          data.title ||
          data.customizationServices?.title ||
          "What We Customize",
        subtitle:
          data.subtitle ||
          data.customizationServices?.subtitle ||
          "Comprehensive customization services",
        description:
          data.description ||
          data.customizationServices?.description ||
          "Tailor NetSuite to match your unique business processes",
        services: normalizedServices,
        items: normalizedServices, // Support both prop names
      };

      console.log(
        "✅ [CUSTOMIZATION SERVICES DEBUG] Final normalized data:",
        normalized
      );
      return normalized;
    },

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
    TrainingHeroSection: (data) => {
      console.log("🔧 [TrainingHeroSection] Raw form data:", data);
      console.log("🎯 [TRAINING HERO DEBUG] CTA Button data:", {
        hasCtaButton: !!data.ctaButton,
        ctaButtonData: data.ctaButton,
        hasButtonText: !!data.buttonText,
        hasLink: !!data.link,
        hasVariant: !!data.variant,
      });

      const buttonVariant = validateVariant(
        data.ctaButton?.variant || data.variant || "primary"
      );

      console.log("🎨 [TrainingHeroSection] Variant Processing:", {
        originalVariant: data.ctaButton?.variant || data.variant,
        processedVariant: buttonVariant,
        variantType: typeof buttonVariant,
      });

      const normalized = {
        heroContent: {
          title:
            data.heroContent?.title ||
            data.hero?.title ||
            data.title ||
            "Professional Training Programs",
          subtitle:
            data.heroContent?.subtitle ||
            data.hero?.subtitle ||
            data.subtitle ||
            "Professional ERP Education & Skills Development",
          description:
            data.heroContent?.description ||
            data.hero?.description ||
            data.description ||
            "Empower your team with comprehensive training solutions designed to enhance skills and drive success",
        },
        backgroundVideo:
          data.backgroundVideo ||
          data.bgVideo ||
          data.heroContent?.backgroundVideo ||
          "/trainingHeroSectionTwo.mp4",
        // Proper CTA button handling with form data
        ctaButton: data.ctaButton
          ? {
              text: data.ctaButton.text || "Start Learning Today",
              link: data.ctaButton.link || "/training",
              variant: buttonVariant,
              icon: data.ctaButton.icon,
            }
          : {
              text: data.buttonText || "Start Learning Today",
              link: data.link || "/training",
              variant: buttonVariant,
            },
      };

      console.log(
        "✅ [TrainingHeroSection] Normalized data with CTA:",
        normalized
      );
      return normalized;
    },

    TrainingProgramsSection: (data) => {
      console.log("🖼️ [NORMALIZE DEBUG] TrainingProgramsSection RAW DATA:", {
        directImage: data.image,
        programsSectionImage: data.programsSection?.image,
        allDataKeys: Object.keys(data),
        fullData: data,
      });

      // PRIORITY: Direct form data OVERRIDES everything
      const imageSource =
        data.image || // Direct image from form
        data.programsSection?.image || // Nested in programsSection
        data.programsSection?.image || // From existing programsSection
        "/images/traning.jpg"; // Final fallback

      console.log("🖼️ [NORMALIZE DEBUG] Final image decision:", {
        source: data.image
          ? "direct"
          : data.programsSection?.image
          ? "nested"
          : "fallback",
        finalImage: imageSource,
        imageSources: {
          directImage: data.image,
          programsSectionImage: data.programsSection?.image,
          fallbackImage: "/images/traning.jpg",
        },
      });

      const normalized = {
        programsSection: {
          title:
            data.title ||
            data.programsSection?.title ||
            "Our Training Programs",
          description:
            data.description ||
            data.programsSection?.description ||
            "Comprehensive training solutions designed to empower your team with the skills they need to excel",
          image: imageSource, // USE THE RESOLVED IMAGE
          Professional_Badge:
            data.badge ||
            data.programsSection?.Professional_Badge ||
            "Certified Training",
        },
        trainingPrograms: {
          programs:
            data.trainingPrograms?.programs ||
            data.programs ||
            data.trainingPrograms ||
            [],
        },
      };

      console.log("✅ [NORMALIZE DEBUG] Final normalized data:", normalized);
      console.log(
        "🖼️ [NORMALIZE DEBUG] Final image URL:",
        normalized.programsSection.image
      );
      return normalized;
    },

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
      console.log("🔧 [ImplementationHeroSection] Raw form data:", data);

      // FIX: Use validateVariant to convert string to proper variant
      const ctaVariant = validateVariant(
        data.ctaButton?.variant || data.variant || "primary"
      );

      const normalized = {
        data: {
          backgroundVideo:
            data.backgroundVideo ||
            data.backgroundImage ||
            "/Videos/HomeHeroSectionV.mp4",
          backgroundImage:
            data.backgroundImage ||
            data.backgroundVideo ||
            "/Videos/HomeHeroSectionV.mp4",
          title: data.title || "Implementation Services",
          subtitle: data.subtitle || "Seamless deployments by experts",
          titleParts:
            data.titleParts ||
            (data.title && data.subtitle
              ? [data.title, data.subtitle]
              : ["Implementation", "Services", "Made", "Simple"]),
          description:
            data.description ||
            "We plan, configure, and launch with zero downtime",
          ctaButton: {
            text:
              data.ctaButton?.text || data.buttonText || "Talk to an expert",
            link: data.ctaButton?.link || data.link || null,
            variant: ctaVariant, // Now this is a validated variant string
            icon:
              data.ctaButton?.icon || data.icon || "M13 7l5 5m0 0l-5 5m5-5H6",
          },
        },
      };

      console.log(
        "✅ [ImplementationHeroSection] Normalized data:",
        normalized
      );
      console.log("🎯 [ImplementationHeroSection] CTA Variant:", ctaVariant);
      return normalized;
    },

    ImplementationProcessSection: (data) => ({
      title: data.process?.title || data.title || "Implementation Process",
      subtitle:
        data.process?.subtitle || data.subtitle || "Our proven methodology",
      description:
        data.process?.description ||
        data.description ||
        "A structured approach to successful implementation",
      phases: data.process?.phases || data.phases || data.steps || [],
    }),

    // Manufacturing-specific implementation process: Some builders save the
    // steps under different keys (processSteps, steps, items). The
    // manufacturing component expects a `data` prop with a `steps` array
    // (see `ImplementationProcess.jsx` -> useComponentData('implementationProcess', data, ...)).
    ManufacturingImplementationProcess: (data) => {
      const steps = data.processSteps || data.steps || data.items || [];
      return {
        data: {
          steps,
        },
        title: data.title || "Implementation Process",
        description: data.description || "Our proven methodology",
      };
    },

    ImplementationBenefitsSection: (data) => ({
      title: data.benefits?.title || data.title || "Implementation Benefits",
      items: data.benefits?.items || data.items || [],
      benefits: data.benefits?.items || data.benefits || data.items || [],
    }),

    ImplementationCTASection: (data) => {
      console.log("🔧 [ImplementationCTASection] Raw form data:", data);
      console.log("📝 [ImplementationCTASection] Text fields:", {
        buttonText: data.buttonText,
        ctaButtonText: data.ctaButton?.text,
        buttonText: data.button?.text,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
      });
      console.log("🔍 [ImplementationCTASection] ALL TEXT OPTIONS:", {
        // Check all possible button text properties
        buttonText: data.buttonText,
        ctaButtonText: data.ctaButton?.text,
        buttonText: data.button?.text,
        text: data.text,
        ctaText: data.ctaText,
        btnText: data.btnText,
        // Also check root level
        ...data,
      });

      const buttonVariant = validateVariant(
        data.ctaButton?.variant ||
          data.button?.variant ||
          data.variant ||
          "primary"
      );

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
          icon:
            "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        },
      ];

      console.log("🎯 [FEATURES DEBUG] Features data:", {
        features: data.features,
        finalFeatures: featuresData,
      });

      const normalized = {
        // Structure 1: Direct props
        title: data.title || "Ready for a Seamless NetSuite Implementation?",
        subtitle:
          data.subtitle ||
          "Transform your business operations with our expert NetSuite implementation services. Let's turn your vision into reality with proven methodologies and dedicated support.",
        description: data.description || "",

        // Structure 2: CTA button
        ctaButton: {
          text: buttonText,
          link: data.ctaButton?.link || data.button?.link || data.link || null,
          variant: buttonVariant,
        },

        // Structure 3: Alternative button prop (some components use this)
        button: {
          text: buttonText,
          link: data.ctaButton?.link || data.button?.link || data.link || null,
          variant: buttonVariant,
        },

        // Structure 4: Direct text prop (some components use this)
        buttonText: buttonText,
        buttonLink:
          data.ctaButton?.link || data.button?.link || data.link || null,

        // ADD: Features data mapping
        features: featuresData,
      };

      console.log(
        "✅ [ImplementationCTASection] Final normalized:",
        normalized
      );
      console.log(
        "🎯 [ImplementationCTASection] Final button text:",
        normalized.ctaButton.text
      );
      console.log(
        "🎯 [ImplementationCTASection] Alternative button text:",
        normalized.button.text
      );
      console.log(
        "🎯 [ImplementationCTASection] Direct button text:",
        normalized.buttonText
      );
      return normalized;
    },

    // About Components
    AboutHeroSection: (data) => {
      console.log("🏢 [AboutHeroSection] Raw form data:", data);

      return {
        data: {
          title: data.title || "About Us",
          subtitle: data.subtitle || "Your trusted partner",
          description: data.description || "We help businesses transform",
          backgroundVideo: data.backgroundVideo || "",
          stats: data.stats || [],
        },
      };
    },

    AboutMissionSection: (data) => {
      console.log("🔍 [AboutMissionSection DEBUG] Input data:", {
        rawData: data,
        dataType: typeof data,
        keys: Object.keys(data || {}),
        hasTitle: !!data?.title,
        hasSubtitle: !!data?.subtitle,
        hasDescription: !!data?.description,
        hasVision: !!data?.vision,
        hasAdditionalContent: !!data?.additionalContent,
        hasImage: !!data?.image,
        hasStats: Array.isArray(data?.stats),
        statsCount: data?.stats?.length || 0,
        statsData: data?.stats,
        hasMissionPoints: Array.isArray(data?.missionPoints),
        missionPointsCount: data?.missionPoints?.length || 0,
        missionPointsData: data?.missionPoints,
      });

      // Process each field with detailed logging
      const processedData = {
        title: data?.title || "",
        subtitle: data?.subtitle || "",
        description: data?.description || "",
        vision: data?.vision || "",
        additionalContent: data?.additionalContent || "",
        image: data?.image || "",
        stats: Array.isArray(data?.stats) ? data.stats : [],
        missionPoints: Array.isArray(data?.missionPoints)
          ? data.missionPoints
          : [],
      };

      console.log("🔄 [AboutMissionSection DEBUG] Field processing:", {
        titleProcessed: `"${data?.title}" -> "${processedData.title}"`,
        subtitleProcessed: `"${data?.subtitle}" -> "${processedData.subtitle}"`,
        descriptionProcessed: `"${data?.description}" -> "${processedData.description}"`,
        visionProcessed: `"${data?.vision}" -> "${processedData.vision}"`,
        imageProcessed: `"${data?.image}" -> "${processedData.image}"`,
        statsProcessed: `${data?.stats?.length || 0} items -> ${
          processedData.stats.length
        } items`,
        missionPointsProcessed: `${data?.missionPoints?.length || 0} items -> ${
          processedData.missionPoints.length
        } items`,
      });

      const normalized = {
        data: processedData,
      };

      console.log("✅ [AboutMissionSection DEBUG] Final normalized output:", {
        structure: "data wrapper",
        innerData: normalized.data,
        fieldsCount: Object.keys(normalized.data).length,
        hasAllFields: {
          title: !!normalized.data.title,
          subtitle: !!normalized.data.subtitle,
          description: !!normalized.data.description,
          vision: !!normalized.data.vision,
          additionalContent: !!normalized.data.additionalContent,
          image: !!normalized.data.image,
          stats: Array.isArray(normalized.data.stats),
          missionPoints: Array.isArray(normalized.data.missionPoints),
        },
      });

      return normalized;
    },

    AboutTeamSection: (data) => {
      console.log("👥 [AboutTeamSection] Raw form data:", data);

      return {
        teamMembers: data.members || [],
        data: {
          title: data.title || "Meet Our Team",
          description: data.description || "Our diverse team of experts",
        },
      };
    },

    AboutValuesSection: (data) => {
      console.log("⭐ [AboutValuesSection] Raw form data:", data);

      return {
        values: data.items || [],
        data: {
          title: data.title || "Our Values",
          description: data.description || "Core values that guide us",
        },
      };
    },

    AboutJourneySection: (data) => {
      console.log("🛤️ [AboutJourneySection] Raw form data:", data);

      return {
        data: {
          title: data.title || "Our Journey",
          description: data.description || "From humble beginnings",
          timeline: data.timeline || [],
        },
      };
    },

    AboutMilestonesSection: (data) => {
      console.log("🏆 [AboutMilestonesSection] Raw form data:", data);

      return {
        milestones: data.items || [],
        data: {
          title: data.title || "Our Milestones",
          description: data.description || "Key achievements",
        },
      };
    },

    AboutDifferentiatorsSection: (data) => {
      console.log("✨ [AboutDifferentiatorsSection] Raw form data:", data);

      return {
        differentiators: data.items || [],
        data: {
          title: data.title || "What Sets Us Apart",
          description: data.description || "Our competitive advantages",
        },
      };
    },

    AboutCTASection: (data) => {
      console.log("🚀 [AboutCTASection] Raw form data:", data);

      return {
        title: data.title || "Ready to Work With Us?",
        subtitle: data.subtitle || "Let's transform your business together",
        description: data.description || "Contact us to discuss",
        ctaButton: data.ctaButton || {
          text: "Contact Us",
          link: "/contact",
          variant: "primary",
        },
        features: data.features || [],
        onOpenContactModal: () => console.log("Contact modal opened"),
      };
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
    CustomizationServicesSection: ["title", "items"],
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
