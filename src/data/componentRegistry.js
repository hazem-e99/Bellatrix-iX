/**
 * Component Registry
 * Comprehensive list of all available components extracted from the project
 * This registry will be used to populate the "Available Components" section in the dashboard
 */
import { getGeneralComponentSchema } from "./generalComponentSchemas";

export const componentRegistry = {
  // ===========================================
  // LANDING PAGE COMPONENTS
  // ===========================================
  LandingPage: {
    Hero: {
      componentType: "Hero",
      componentName: "Landing Hero",
      category: "hero",
      icon: "🌟",
      filePath: "src/components/Hero.jsx",
      description:
        "Main hero section with video backgrounds, slides, and stats",
      dataStructure: {
        slides: "array", // array of slide objects with title, subtitle, description, video
        stats: "array", // array of stat objects with value and label
      },
      defaultData: {
        slides: [
          {
            title: "Strategic Business Transformation",
            subtitle: "Oracle NetSuite Consultancy",
            description:
              "Streamline operations and drive growth with our comprehensive NetSuite solutions.",
            video: "/Videos/implementation/homepage_hero.mp4",
          },
        ],
        stats: [
          { value: "500+", label: "Projects Completed" },
          { value: "15+", label: "Years Experience" },
        ],
      },
    },
    Services: {
      componentType: "Services",
      componentName: "Services Section",
      category: "content",
      icon: "⚙️",
      filePath: "src/components/Services.jsx",
      description: "Services grid with section header and view all button",
      dataStructure: {
        services: "array",
        sectionHeader: "object",
        viewAllButton: "object",
      },
    },
    Testimonials: {
      componentType: "Testimonials",
      componentName: "Testimonials Section",
      category: "social-proof",
      icon: "💬",
      filePath: "src/components/Testimonials.jsx",
      description: "Customer testimonials with section header and CTA",
      dataStructure: {
        testimonials: "array",
        sectionHeader: "object",
        ctaButton: "object",
      },
    },
    Industries: {
      componentType: "Industries",
      componentName: "Industries Section",
      category: "content",
      icon: "🏭",
      filePath: "src/components/Industries.jsx",
      description: "Industry showcase with styling options",
      dataStructure: {
        industries: "array",
        sectionHeader: "object",
        styles: "object",
      },
    },
  },

  // ===========================================
  // ABOUT PAGE COMPONENTS
  // ===========================================
  About: {
    AboutHeroSection: {
      componentType: "AboutHeroSection",
      componentName: "About Hero",
      category: "hero",
      icon: "🌟",
      filePath: "src/components/About/AboutHero.jsx",
      description: "About page hero with background video, title, and stats",
      dataStructure: {
        title: "string",
        subtitle: "string",
        description: "string",
        backgroundVideo: "string",
        stats: "array",
      },
      defaultData: {
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
    },
    AboutMissionSection: {
      componentType: "AboutMissionSection",
      componentName: "About Mission",
      category: "content",
      icon: "🎯",
      filePath: "src/components/About/AboutMission.jsx",
      description: "Mission statement with vision and image",
      dataStructure: {
        title: "string",
        description: "string",
        vision: "string",
        image: "string",
        stats: "array",
        missionPoints: "array",
      },
    },
    AboutJourneySection: {
      componentType: "AboutJourneySection",
      componentName: "About Journey",
      category: "content",
      icon: "🛤️",
      filePath: "src/components/About/AboutJourney.jsx",
      description:
        "Company journey timeline with beginning, growth, and today sections",
      dataStructure: {
        title: "string",
        description: "string",
        milestones: "array", // title, date, description
      },
      defaultData: {
        title: "Our Journey",
        description: "How we evolved to deliver enterprise solutions",
        milestones: [
          { title: "Founded", date: "2010", description: "Company founded" },
          { title: "Growth", date: "2015", description: "Expanded services" },
        ],
      },
    },

    AboutTeamSection: {
      componentType: "AboutTeamSection",
      componentName: "About Team",
      category: "team",
      icon: "👥",
      filePath: "src/components/About/AboutTeam.jsx",
      description: "Team members showcase with bios and expertise",
      dataStructure: {
        title: "string",
        description: "string",
        members: "array", // name, role, image, bio, expertise
      },
      defaultData: {
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
        ],
      },
    },
    AboutValuesSection: {
      componentType: "AboutValuesSection",
      componentName: "About Values",
      category: "content",
      icon: "💎",
      filePath: "src/components/About/AboutValues.jsx",
      description: "Core values with icons and descriptions",
      dataStructure: {
        title: "string",
        description: "string",
        items: "array", // title, description, icon, color
      },
    },
    AboutDifferentiatorsSection: {
      componentType: "AboutDifferentiatorsSection",
      componentName: "About Differentiators",
      category: "content",
      icon: "⭐",
      filePath: "src/components/About/AboutDifferentiators.jsx",
      description: "What makes us different from competitors",
    },
    AboutMilestonesSection: {
      componentType: "AboutMilestonesSection",
      componentName: "About Milestones",
      category: "timeline",
      icon: "🏆",
      filePath: "src/components/About/AboutMilestones.jsx",
      description: "Company milestones and achievements",
    },
    AboutCTASection: {
      componentType: "AboutCTASection",
      componentName: "About CTA",
      category: "cta",
      icon: "📞",
      filePath: "src/components/About/AboutCTA.jsx",
      description: "Call-to-action section for about page",
    },
  },

  // ===========================================
  // SERVICES COMPONENTS
  // ===========================================
  Services: {
    // Implementation Service Components
    ImplementationHeroSection: {
      componentType: "ImplementationHeroSection",
      componentName: "Implementation Hero",
      category: "hero",
      icon: "🚀",
      filePath: "src/components/Services/Implementation/HeroSection.jsx",
      description: "Implementation service hero with video background and CTA",
      dataStructure: {
        backgroundVideo: "string",
        titleParts: "array",
        description: "string",
        ctaButton: "object",
      },
      defaultData: {
        backgroundVideo: "/Videos/HomeHeroSectionV.mp4",
        titleParts: ["Where", "Vision", "Meets", "Reality"],
        description:
          "We don't just implement solutions—we craft digital experiences that transform the way you do business",
        ctaButton: {
          text: "Start Implementation",
          icon: "M13 7l5 5m0 0l-5 5m5-5H6",
          variant: "primary",
        },
      },
    },
    ImplementationProcessSection: {
      componentType: "ImplementationProcessSection",
      componentName: "Implementation Process",
      category: "process",
      icon: "📋",
      filePath: "src/components/Services/Implementation/ProcessSection.jsx",
      description: "Step-by-step implementation process",
    },
    ImplementationWhyChooseSection: {
      componentType: "ImplementationWhyChooseSection",
      componentName: "Why Choose Implementation",
      category: "benefits",
      icon: "✅",
      filePath: "src/components/Services/Implementation/WhyChooseSection.jsx",
      description: "Benefits of choosing our implementation services",
    },
    ImplementationPricingSection: {
      componentType: "ImplementationPricingSection",
      componentName: "Implementation Pricing",
      category: "pricing",
      icon: "💰",
      filePath: "src/components/Services/Implementation/PricingSection.jsx",
      description: "Pricing plans for implementation services",
    },
    ImplementationCtaSection: {
      componentType: "ImplementationCtaSection",
      componentName: "Implementation CTA",
      category: "cta",
      icon: "📞",
      filePath: "src/components/Services/Implementation/CtaSection.jsx",
      description: "Call-to-action for implementation services",
    },

    // Additional Service Components
    ServiceGrid: {
      componentType: "ServiceGrid",
      componentName: "Service Grid",
      category: "content",
      icon: "⚙️",
      filePath: "src/components/Services/ServiceGrid.jsx",
      description: "Grid layout displaying various services with features",
      dataStructure: {
        services: "array", // array of service objects with title, description, icon, features
      },
      defaultData: {
        services: [
          {
            title: "NetSuite Implementation",
            description:
              "Complete NetSuite setup and configuration tailored to your business needs.",
            icon: "🚀",
            features: [
              "System Configuration",
              "Data Migration",
              "Custom Workflows",
              "User Training",
            ],
          },
          {
            title: "Training & Support",
            description:
              "Comprehensive training programs to maximize your NetSuite investment.",
            icon: "📚",
            features: [
              "User Training",
              "Admin Training",
              "Custom Reports",
              "Ongoing Support",
            ],
          },
        ],
      },
    },
    TrainingProgramsSection: {
      componentType: "ProgramsSection",
      componentName: "Programs Section",
      category: "content",
      icon: "📚",
      filePath: "src/components/Services/training/ProgramsSection.jsx",
      description: "Programs section with program cards and descriptions",
      dataStructure: {
        programsSection: "object", // object with title, description, image
        trainingPrograms: "array", // array of program objects
      },
      defaultData: {
        programsSection: {
          title: "Programs",
          description:
            "Comprehensive programs designed to enhance your skills and knowledge.",
          image: "/images/traning.jpg",
        },
        trainingPrograms: [
          {
            title: "Basic User Training",
            description: "Learn the fundamentals of NetSuite",
            duration: "2 days",
            level: "Beginner",
          },
        ],
      },
    },
    TrainingWhyChooseSection: {
      componentType: "WhyChooseSection",
      componentName: "Why Choose Section",
      category: "benefits",
      icon: "✨",
      filePath: "src/components/Services/training/WhyChooseSection.jsx",
      description: "Why choose our section with features and benefits",
      dataStructure: {
        whyChooseSection: "object", // object with title, description
        trainingFeatures: "array", // array of feature objects
      },
      defaultData: {
        whyChooseSection: {
          title: "Why Choose Our Programs",
          description: "Comprehensive solutions designed for your success.",
        },
        trainingFeatures: [
          {
            id: 1,
            title: "Expert Instructors",
            description: "Learn from certified NetSuite professionals",
            icon: "👨‍🏫",
            shortDescription:
              "Certified instructors with real-world experience",
          },
        ],
      },
    },
    ImplementationCTASection: {
      componentType: "ImplementationCTASection",
      componentName: "Implementation CTA Section",
      category: "cta",
      icon: "📞",
      filePath: "src/components/Services/Implementation/Implementation.jsx",
      description: "Call-to-action section for implementation services",
      dataStructure: {
        cta: "object", // object with title, subtitle, buttonText, buttonLink
      },
      defaultData: {
        cta: {
          title: "Ready to Transform Your Business?",
          subtitle:
            "Get started with our comprehensive NetSuite implementation services today.",
          buttonText: "Start Your Implementation",
          buttonLink: "/contact",
        },
      },
    },
  },

  // ===========================================
  // HR PAGE COMPONENTS
  // ===========================================
  HR: {
    HRHeroSection: {
      componentType: "HRHeroSection",
      componentName: "HR Hero",
      category: "hero",
      icon: "👥",
      description:
        "HR solution hero section with title, subtitle, and description",
      dataStructure: {
        title: "string",
        subtitle: "string",
        description: "string",
        backgroundImage: "string",
      },
      defaultData: {
        title: "nada HR, Payroll & People Management",
        subtitle:
          "Automate HR, empower employees, and stay compliant—on one secure platform designed for the future of work.",
        description:
          "Our comprehensive HR solution simplifies employee management.",
        backgroundImage: "/images/hr-hero.jpg",
      },
    },
    HRModulesSection: {
      componentType: "HRModulesSection",
      componentName: "HR Modules",
      category: "features",
      icon: "🔧",
      description: "HR modules showcase",
      dataStructure: {
        title: "string",
        description: "string",
        modules: "array", // title, description, icon
      },
    },
    HRBenefitsSection: {
      componentType: "HRBenefitsSection",
      componentName: "HR Benefits",
      category: "benefits",
      icon: "✨",
      description: "Benefits of HR solution",
      dataStructure: {
        title: "string",
        description: "string",
        features: "array", // title, description
      },
    },
    HRPricingSection: {
      componentType: "HRPricingSection",
      componentName: "HR Pricing",
      category: "pricing",
      icon: "💳",
      description: "HR solution pricing plans",
      dataStructure: {
        title: "string",
        description: "string",
        pricing: "array", // name, price, description, features
      },
    },
    HRFAQSection: {
      componentType: "HRFAQSection",
      componentName: "HR FAQ",
      category: "faq",
      icon: "❓",
      description: "Frequently asked questions about HR solution",
      dataStructure: {
        title: "string",
        faq: "object", // title, items array
        faqItems: "array", // Direct items array for dynamic schema
      },
      defaultData: {
        title: "Frequently Asked Questions",
        faq: {
          title: "HR Solution FAQ",
          items: [
            {
              question: "Is my employee data secure and compliant?",
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
              question: "How long does implementation typically take?",
              answer:
                "Implementation time varies based on complexity: Essential (2-3 weeks), Professional (3-5 weeks), Enterprise (6-8 weeks).",
            },
          ],
        },
        faqItems: [
          {
            question: "Is my employee data secure and compliant?",
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
            question: "How long does implementation typically take?",
            answer:
              "Implementation time varies based on complexity: Essential (2-3 weeks), Professional (3-5 weeks), Enterprise (6-8 weeks).",
          },
        ],
      },
    },
    HRCTASection: {
      componentType: "HRCTASection",
      componentName: "HR CTA",
      category: "cta",
      icon: "📞",
      description: "Call-to-action for HR solution",
    },
  },

  // ===========================================
  // PAYROLL PAGE COMPONENTS
  // ===========================================
  Payroll: {
    PayrollHeroSection: {
      componentType: "PayrollHeroSection",
      componentName: "Payroll Hero",
      category: "hero",
      icon: "💰",
      description: "Payroll solution hero section",
      dataStructure: {
        title: "string",
        subtitle: "string",
        description: "string",
        backgroundImage: "string",
      },
      defaultData: {
        title: "Transform Your Payroll Process",
        subtitle:
          "Streamline operations with our intelligent, automated payroll system",
        description:
          "Our comprehensive payroll solution automates complex processes and ensures accuracy.",
        backgroundImage: "/images/payroll-hero.jpg",
      },
    },
    PayrollHowItWorksSection: {
      componentType: "PayrollHowItWorksSection",
      componentName: "How Payroll Works",
      category: "process",
      icon: "⚙️",
      description: "How the payroll system works",
      dataStructure: {
        title: "string",
        description: "string",
        steps: "array", // title, description, icon
      },
    },
    PayrollPainPointsSection: {
      componentType: "PayrollPainPointsSection",
      componentName: "Payroll Pain Points",
      category: "problems",
      icon: "❗",
      filePath: "src/components/Payroll/PayrollPainPoints.jsx",
      description: "Problems that payroll system solves",
      dataStructure: {
        title: "string",
        description: "string",
        painPoints: "array", // title, description
      },
    },
    PayrollFAQSection: {
      componentType: "PayrollFAQSection",
      componentName: "Payroll FAQ",
      category: "faq",
      icon: "❓",
      description: "Payroll system FAQ",
      dataStructure: {
        title: "string",
        description: "string",
        faqItems: "array", // question, answer
      },
      defaultData: {
        title: "Common Questions",
        description:
          "Get quick answers to the most frequently asked questions about our payroll system",
        faqItems: [
          {
            question: "Does this system support global payroll?",
            answer:
              "Yes, we support multi-country and multi-currency payroll operations.",
          },
          {
            question: "Can it integrate with our existing HR system?",
            answer: "Absolutely, we offer seamless integrations and open APIs.",
          },
          {
            question: "How long does implementation take?",
            answer: "Most companies are onboarded in less than 2 weeks.",
          },
        ],
      },
    },
    PayrollCTASection: {
      componentType: "PayrollCTASection",
      componentName: "Payroll CTA",
      category: "cta",
      icon: "📞",
      description: "Call-to-action for payroll solution",
    },
  },

  // ===========================================
  // INDUSTRY COMPONENTS
  // ===========================================
  Industries: {
    // Manufacturing Components
    ManufacturingHeroSection: {
      componentType: "ManufacturingHeroSection",
      componentName: "Manufacturing Hero",
      category: "hero",
      icon: "🏭",
      filePath: "src/components/industries/Manufacturing/HeroSection.jsx",
      description: "Manufacturing industry hero section",
    },
    ManufacturingIndustryStats: {
      componentType: "ManufacturingIndustryStats",
      componentName: "Manufacturing Stats",
      category: "stats",
      icon: "📊",
      filePath: "src/components/industries/Manufacturing/IndustryStats.jsx",
      description: "Manufacturing industry statistics",
    },
    ManufacturingCTASection: {
      componentType: "ManufacturingCTASection",
      componentName: "Manufacturing CTA",
      category: "cta",
      icon: "📞",
      filePath: "src/components/industries/Manufacturing/CTASection.jsx",
      description: "Manufacturing CTA section",
    },
    ManufacturingChallengesSection: {
      componentType: "ManufacturingChallengesSection",
      componentName: "Manufacturing Challenges",
      category: "challenges",
      icon: "⚡",
      filePath: "src/components/industries/Manufacturing/ChallengesSection.jsx",
      description: "Manufacturing industry challenges",
      dataStructure: {
        title: "string",
        description: "string",
        challenges: "array", // title, description, icon
      },
    },
    ManufacturingSolutionsSection: {
      componentType: "ManufacturingSolutionsSection",
      componentName: "Manufacturing Solutions",
      category: "solutions",
      icon: "🔧",
      filePath: "src/components/industries/Manufacturing/SolutionsSection.jsx",
      description: "Manufacturing industry solutions",
      dataStructure: {
        title: "string",
        description: "string",
        solutions: "array", // title, description, icon
      },
    },
    ManufacturingCaseStudies: {
      componentType: "ManufacturingCaseStudies",
      componentName: "Manufacturing Case Studies",
      category: "case-studies",
      icon: "📖",
      filePath: "src/components/industries/Manufacturing/CaseStudies.jsx",
      description: "Manufacturing case studies",
      dataStructure: {
        title: "string",
        description: "string",
        caseStudies: "array", // title, description, company, results
      },
    },
    ManufacturingImplementationProcess: {
      componentType: "ManufacturingImplementationProcess",
      componentName: "Manufacturing Implementation",
      category: "process",
      icon: "📋",
      filePath:
        "src/components/industries/Manufacturing/ImplementationProcess.jsx",
      description: "Manufacturing implementation process",
      dataStructure: {
        title: "string",
        description: "string",
        steps: "array", // title, description, step
      },
    },

    // Retail Components
    RetailHeroSection: {
      componentType: "RetailHeroSection",
      componentName: "Retail Hero",
      category: "hero",
      icon: "🛍️",
      filePath: "src/components/industries/retail/HeroSection.jsx",
      description: "Retail industry hero section",
    },
    RetailCTASection: {
      componentType: "RetailCTASection",
      componentName: "Retail CTA",
      category: "cta",
      icon: "📞",
      filePath: "src/components/industries/retail/CTASection.jsx",
      description: "Retail CTA section",
    },
    // RetailIndustryStats: {
    //   componentType: "RetailIndustryStats",
    //   componentName: "Retail Stats",
    //   category: "stats",
    //   icon: "📊",
    //   filePath: "src/components/industries/retail/IndustryStats.jsx",
    //   description: "Retail industry statistics",
    //   dataStructure: {
    //     title: "string",
    //     description: "string",
    //     stats: "array", // value, label, description
    //   },
    // },
    RetailChallengesSection: {
      componentType: "RetailChallengesSection",
      componentName: "Retail Challenges",
      category: "challenges",
      icon: "⚡",
      filePath: "src/components/industries/retail/ChallengesSection.jsx",
      description: "Retail industry challenges",
      dataStructure: {
        title: "string",
        description: "string",
        challenges: "array", // title, description, icon
      },
    },
    RetailSolutionsSection: {
      componentType: "RetailSolutionsSection",
      componentName: "Retail Solutions",
      category: "solutions",
      icon: "🔧",
      filePath: "src/components/industries/retail/SolutionsSection.jsx",
      description: "Retail industry solutions",
      dataStructure: {
        title: "string",
        description: "string",
        solutions: "array", // title, description, icon
      },
    },
    RetailFeaturesSection: {
      componentType: "RetailFeaturesSection",
      componentName: "Retail Features",
      category: "features",
      icon: "",
      filePath: "src/components/industries/retail/FeaturesSection.jsx",
      description: "Retail industry features",
      dataStructure: {
        title: "string",
        description: "string",
        retailFeatures: "array", // title, description, icon, benefits
      },
      // attach enhanced schema/defaultData if available in generalComponentSchemas
      hasEnhancedSchema: !!getGeneralComponentSchema("RetailFeaturesSection"),
      schema: getGeneralComponentSchema("RetailFeaturesSection")?.schema,
      defaultData: getGeneralComponentSchema("RetailFeaturesSection")
        ?.defaultData,
    },
    RetailCaseStudies: {
      componentType: "RetailCaseStudies",
      componentName: "Retail Case Studies",
      category: "case-studies",
      icon: "📖",
      filePath: "src/components/industries/retail/CaseStudiesSection.jsx",
      description: "Retail case studies",
      dataStructure: {
        title: "string",
        description: "string",
        caseStudies: "array", // title, description, company, results
      },
      // attach enhanced schema/defaultData if available in generalComponentSchemas
      hasEnhancedSchema: !!getGeneralComponentSchema("RetailCaseStudies"),
      schema: getGeneralComponentSchema("RetailCaseStudies")?.schema,
      defaultData: getGeneralComponentSchema("RetailCaseStudies")?.defaultData,
    },
  },

  // ===========================================
  // COMMON/SHARED COMPONENTS
  // ===========================================
  // Common/shared components cleaned: CTAButton removed from registry
};

/**
 * Get all components as a flat array for the Available Components section
 */
export const getAllComponents = () => {
  const allComponents = [];

  Object.entries(componentRegistry).forEach(([pageType, components]) => {
    Object.entries(components).forEach(([componentKey, componentInfo]) => {
      allComponents.push({
        ...componentInfo,
        pageType,
        componentKey,
      });
    });
  });

  return allComponents;
};

/**
 * Get components by category
 */
export const getComponentsByCategory = (category) => {
  return getAllComponents().filter(
    (component) => component.category === category
  );
};

/**
 * Get components by page type
 */
export const getComponentsByPageType = (pageType) => {
  return componentRegistry[pageType]
    ? Object.values(componentRegistry[pageType])
    : [];
};

/**
 * Categories for filtering
 */
export const componentCategories = [
  { id: "hero", label: "Hero Sections", icon: "🌟" },
  { id: "content", label: "Content", icon: "📝" },
  { id: "features", label: "Features", icon: "" },
  { id: "benefits", label: "Benefits", icon: "✨" },
  { id: "pricing", label: "Pricing", icon: "💰" },
  { id: "process", label: "Process", icon: "📋" },
  { id: "team", label: "Team", icon: "👥" },
  { id: "testimonials", label: "Testimonials", icon: "💬" },
  { id: "social-proof", label: "Social Proof", icon: "👍" },
  { id: "faq", label: "FAQ", icon: "❓" },
  { id: "cta", label: "Call to Action", icon: "📞" },
  { id: "stats", label: "Statistics", icon: "📊" },
  { id: "timeline", label: "Timeline", icon: "📅" },
  { id: "case-studies", label: "Case Studies", icon: "📖" },
  { id: "challenges", label: "Challenges", icon: "⚡" },
  { id: "solutions", label: "Solutions", icon: "🔧" },
  { id: "forms", label: "Forms", icon: "📋" },
  { id: "ui", label: "UI Components", icon: "🎨" },
  { id: "buttons", label: "Buttons", icon: "🔘" },
  // SEO category removed (SEO meta component not available in builder)
];

export default componentRegistry;
