// Central registry mapping componentType to componentPath for dynamic loading and discovery

// Map componentType to componentPath
export const idToPathMap = {
  // ===========================================
  // ABOUT PAGE COMPONENTS
  // ===========================================
  AboutHeroSection: "About/AboutHero",
  AboutMissionSection: "About/AboutMission",
  AboutTeamSection: "About/AboutTeam",
  AboutValuesSection: "About/AboutValues",
  AboutJourneySection: "About/AboutJourney",
  AboutMilestonesSection: "About/AboutMilestones",
  AboutDifferentiatorsSection: "About/AboutDifferentiators",
  AboutCTASection: "About/AboutCTA",

  // ===========================================
  // HR & PAYROLL COMPONENTS
  // ===========================================
  PayrollHeroSection: "solution/payroll/PayrollHero",
  PayrollHowItWorksSection: "solution/payroll/PayrollHowItWorks",
  PayrollWorkflowSection: "solution/payroll/PayrollWorkflow",
  // PayrollStepperSection: "solution/payroll/PayrollStepper", // Removed
  PayrollPainPointsSection: "solution/payroll/PayrollPainPoints",
  PayrollFAQSection: "solution/payroll/PayrollFAQ",
  PayrollCTASection: "solution/payroll/PayrollCTA",
  HRHeroSection: "solution/hr/HeroSection",
  HRModulesSection: "solution/hr/ModulesSection",
  HRBenefitsSection: "solution/hr/BenefitsSection",
  HRUseCasesSection: "solution/hr/UseCasesSection",
  HRPricingSection: "solution/hr/PricingSection",
  HRFAQSection: "solution/hr/FAQSection",
  HRCTASection: "solution/hr/CTASection",

  // ===========================================
  // LANDING PAGE COMPONENTS
  // ===========================================
  Hero: "Hero",
  HeroSection: "Hero",
  Services: "Services",
  ServicesSection: "Services",
  Testimonials: "Testimonials",
  TestimonialsSection: "Testimonials",
  Industries: "Industries",
  IndustriesSection: "Industries",

  // ===========================================
  // SERVICES COMPONENTS
  // ===========================================
  ServiceGrid: "Services/ServiceGrid",
  ImplementationHeroSection: "Services/Implementation/HeroSection",
  ImplementationProcessSection: "Services/Implementation/ProcessSection",
  ImplementationWhyChooseSection: "Services/Implementation/WhyChooseSection",
  ImplementationPricingSection: "Services/Implementation/PricingSection",
  ImplementationCTASection: "Services/Implementation/CtaSection",
  ImplementationCtaSection: "Services/Implementation/CtaSection",
  TrainingHeroSection: "Services/training/HeroSection",
  TrainingProgramsSection: "Services/training/TrainingPrograms",
  TrainingWhyChooseSection: "Services/training/WhyChooseSection",

  // ===========================================
  // MANUFACTURING INDUSTRY COMPONENTS
  // ===========================================
  ManufacturingHeroSection: "industries/Manufacturing/HeroSection",
  ManufacturingIndustryStats: "industries/Manufacturing/IndustryStats",
  ManufacturingChallengesSection: "industries/Manufacturing/ChallengesSection",
  ManufacturingSolutionsSection: "industries/Manufacturing/SolutionsSection",
  ManufacturingCaseStudies: "industries/Manufacturing/CaseStudies",
  ManufacturingImplementationProcess:
    "industries/Manufacturing/ImplementationProcess",

  ManufacturingCTASection: "industries/Manufacturing/CTASection",

  // ===========================================
  // RETAIL INDUSTRY COMPONENTS
  // ===========================================
  RetailHeroSection: "industries/retail/HeroSection",
  RetailChallengesSection: "industries/retail/ChallengesSection",
  RetailSolutionsSection: "industries/retail/SolutionsSection",
  RetailCTASection: "industries/retail/CTASection",

  // ===========================================
  // COMMON/SHARED COMPONENTS
  // ===========================================
  // ...existing code...
  // CTAButton removed from builder component map
};

export const getComponentPathFromId = (componentId) =>
  idToPathMap[componentId] || null;

// Dynamic component loader using the path map
export const loadComponent = async (componentPath) => {
  try {
    const componentMap = {
      // ===========================================
      // ABOUT PAGE COMPONENTS
      // ===========================================
      "About/AboutHero": () => import("./About/AboutHero"),
      "About/AboutMission": () => import("./About/AboutMission"),
      "About/AboutTeam": () => import("./About/AboutTeam"),
      "About/AboutValues": () => import("./About/AboutValues"),
      "About/AboutJourney": () => import("./About/AboutJourney"),
      "About/AboutMilestones": () => import("./About/AboutMilestones"),
      "About/AboutDifferentiators": () =>
        import("./About/AboutDifferentiators"),
      "About/AboutCTA": () => import("./About/AboutCTA"),

      // ===========================================
      // HR & PAYROLL COMPONENTS
      // ===========================================
      "solution/payroll/PayrollHero": () =>
        import("./solution/payroll/PayrollHero"),
      "solution/payroll/PayrollHowItWorks": () =>
        import("./solution/payroll/PayrollHowItWorks"),
      "solution/payroll/PayrollWorkflow": () =>
        import("./solution/payroll/PayrollWorkflow"),
      // "solution/payroll/PayrollStepper": () =>
      //   import("./solution/payroll/PayrollStepper"), // Removed
      "solution/payroll/PayrollPainPoints": () =>
        import("./solution/payroll/PayrollPainPoints"),
      "solution/payroll/PayrollFAQ": () =>
        import("./solution/payroll/PayrollFAQ"),
      "solution/payroll/PayrollCTA": () =>
        import("./solution/payroll/PayrollCTA"),
      "solution/hr/HeroSection": () => import("./solution/hr/HeroSection"),
      "solution/hr/ModulesSection": () =>
        import("./solution/hr/ModulesSection"),
      "solution/hr/BenefitsSection": () =>
        import("./solution/hr/BenefitsSection"),
      "solution/hr/UseCasesSection": () =>
        import("./solution/hr/UseCasesSection"),
      "solution/hr/PricingSection": () =>
        import("./solution/hr/PricingSection"),
      "solution/hr/FAQSection": () => import("./solution/hr/FAQSection"),
      "solution/hr/CTASection": () => import("./solution/hr/CTASection"),

      // ===========================================
      // LANDING PAGE COMPONENTS
      // ===========================================
      Hero: () => import("./Hero"),
      Services: () => import("./Services"),
      Testimonials: () => import("./Testimonials"),
      Industries: () => import("./Industries"),

      // ===========================================
      // SERVICES COMPONENTS
      // ===========================================
      "Services/ServiceGrid": () => import("./Services/ServiceGrid"),
      "Services/Implementation/HeroSection": () =>
        import("./Services/Implementation/HeroSection"),
      "Services/Implementation/ProcessSection": () =>
        import("./Services/Implementation/ProcessSection"),
      "Services/Implementation/WhyChooseSection": () =>
        import("./Services/Implementation/WhyChooseSection"),
      "Services/Implementation/PricingSection": () =>
        import("./Services/Implementation/PricingSection"),
      "Services/Implementation/CtaSection": () =>
        import("./Services/Implementation/CtaSection"),
      "Services/training/HeroSection": () =>
        import("./Services/training/HeroSection"),
      "Services/training/TrainingPrograms": () =>
        import("./Services/training/TrainingPrograms"),
      "Services/training/WhyChooseSection": () =>
        import("./Services/training/WhyChooseSection"),

      // ===========================================
      // MANUFACTURING INDUSTRY COMPONENTS
      // ===========================================
      "industries/Manufacturing/HeroSection": () =>
        import("./industries/Manufacturing/HeroSection"),
      "industries/Manufacturing/IndustryStats": () =>
        import("./industries/Manufacturing/IndustryStats"),
      "industries/Manufacturing/ChallengesSection": () =>
        import("./industries/Manufacturing/ChallengesSection"),
      "industries/Manufacturing/SolutionsSection": () =>
        import("./industries/Manufacturing/SolutionsSection"),
      "industries/Manufacturing/CaseStudies": () =>
        import("./industries/Manufacturing/CaseStudies"),
      "industries/Manufacturing/ImplementationProcess": () =>
        import("./industries/Manufacturing/ImplementationProcess"),
      "industries/Manufacturing/CTASection": () =>
        import("./industries/Manufacturing/CTASection"),

      // ===========================================
      // RETAIL INDUSTRY COMPONENTS
      // ===========================================
      "industries/retail/HeroSection": () =>
        import("./industries/retail/HeroSection"),
      "industries/retail/SolutionsSection": () =>
        import("./industries/retail/SolutionsSection"),

      // ===========================================
      // COMMON/SHARED COMPONENTS
      // ===========================================
      // CTAButton loader removed so CTAButton is not available in the builder
    };

    const loader = componentMap[componentPath];
    if (!loader) {
      throw new Error(`Component not found: ${componentPath}`);
    }
    const module = await loader();
    return module.default;
  } catch (error) {
    console.error(`Failed to load component ${componentPath}:`, error);
    return null;
  }
};
