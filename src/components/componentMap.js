// Central registry mapping componentType to componentPath for dynamic loading and discovery

// Map componentType to componentPath
export const idToPathMap = {
  // About Components
  AboutHeroSection: "About/AboutHero",
  AboutMissionSection: "About/AboutMission", 
  AboutTeamSection: "About/AboutTeam",
  AboutValuesSection: "About/AboutValues",
  AboutJourneySection: "About/AboutJourney",
  AboutMilestonesSection: "About/AboutMilestones",
  AboutDifferentiatorsSection: "About/AboutDifferentiators",
  AboutCTASection: "About/AboutCTA",
  
  // Existing Components
  PayrollHeroSection: "solution/payroll/PayrollHero",
  PayrollHowItWorksSection: "solution/payroll/PayrollHowItWorks",
  PayrollWorkflowSection: "solution/payroll/PayrollWorkflow",
  PayrollStepperSection: "solution/payroll/PayrollStepper",
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
  ServiceGrid: "Services/ServiceGrid",
  ImplementationHeroSection: "Services/Implementation/HeroSection",
  ImplementationProcessSection: "Services/Implementation/ProcessSection",
  ImplementationWhyChooseSection: "Services/Implementation/WhyChooseSection",
  ImplementationPricingSection: "Services/Implementation/PricingSection",
  ImplementationCTASection: "Services/Implementation/CtaSection",
  TrainingHeroSection: "Services/training/HeroSection",
  TrainingProgramsSection: "Services/training/TrainingPrograms",
  TrainingWhyChooseSection: "Services/training/WhyChooseSection",
  IntegrationHeroSection: "Services/Integration/HeroSection",
  IntegrationTypesSection: "Services/Integration/IntegrationTypes",
  IntegrationBenefitsSection: "Services/Integration/BenefitsSection",
  CustomizationHeroSection: "Services/Customization/HeroSection",
  CustomizationServicesSection: "Services/Customization/ServicesSection",
  CustomizationProcessSection: "Services/Customization/ProcessSection",
  ManufacturingHeroSection: "industries/Manufacturing/HeroSection",
  ManufacturingIndustryStatsSection: "industries/Manufacturing/IndustryStats",
  ManufacturingChallengesSection: "industries/Manufacturing/ChallengesSection",
  ManufacturingSolutionsSection: "industries/Manufacturing/SolutionsSection",
  ManufacturingCaseStudiesSection: "industries/Manufacturing/CaseStudies",
  ManufacturingImplementationProcessSection: "industries/Manufacturing/ImplementationProcess",
  ManufacturingCTASection: "industries/Manufacturing/CTASection",
  RetailHeroSection: "industries/retail/HeroSection",
  RetailIndustryStatsSection: "industries/retail/IndustryStats",
  RetailChallengesSection: "industries/retail/ChallengesSection",
  RetailSolutionsSection: "industries/retail/SolutionsSection",
  RetailFeaturesSection: "industries/retail/FeaturesSection",
  RetailCaseStudiesSection: "industries/retail/CaseStudiesSection",
  RetailImplementationSection: "industries/retail/ImplementationSection",
  RetailCTASection: "industries/retail/CTASection",
  AboutHeroSection: "About/AboutHero",
  AboutMissionSection: "About/AboutMission",
  AboutValuesSection: "About/AboutValues",
  AboutTeamSection: "About/AboutTeam",
  AboutJourneySection: "About/AboutJourney",
  AboutMilestonesSection: "About/AboutMilestones",
  AboutDifferentiatorsSection: "About/AboutDifferentiators",
  AboutCTASection: "About/AboutCTA",
};

export const getComponentPathFromId = (componentId) => idToPathMap[componentId] || null;

// Dynamic component loader using the path map
export const loadComponent = async (componentPath) => {
  try {
    const componentMap = {
      "solution/payroll/PayrollHero": () => import("./solution/payroll/PayrollHero"),
      "solution/payroll/PayrollHowItWorks": () => import("./solution/payroll/PayrollHowItWorks"),
      "solution/payroll/PayrollWorkflow": () => import("./solution/payroll/PayrollWorkflow"),
      "solution/payroll/PayrollStepper": () => import("./solution/payroll/PayrollStepper"),
      "solution/payroll/PayrollPainPoints": () => import("./solution/payroll/PayrollPainPoints"),
      "solution/payroll/PayrollFAQ": () => import("./solution/payroll/PayrollFAQ"),
      "solution/payroll/PayrollCTA": () => import("./solution/payroll/PayrollCTA"),
      "solution/hr/HeroSection": () => import("./solution/hr/HeroSection"),
      "solution/hr/ModulesSection": () => import("./solution/hr/ModulesSection"),
      "solution/hr/BenefitsSection": () => import("./solution/hr/BenefitsSection"),
      "solution/hr/UseCasesSection": () => import("./solution/hr/UseCasesSection"),
      "solution/hr/PricingSection": () => import("./solution/hr/PricingSection"),
      "solution/hr/FAQSection": () => import("./solution/hr/FAQSection"),
      "solution/hr/CTASection": () => import("./solution/hr/CTASection"),
      "Services/ServiceGrid": () => import("./Services/ServiceGrid"),
      "Services/Implementation/HeroSection": () => import("./Services/Implementation/HeroSection"),
      "Services/Implementation/ProcessSection": () => import("./Services/Implementation/ProcessSection"),
      "Services/Implementation/WhyChooseSection": () => import("./Services/Implementation/WhyChooseSection"),
      "Services/Implementation/PricingSection": () => import("./Services/Implementation/PricingSection"),
      "Services/Implementation/CtaSection": () => import("./Services/Implementation/CtaSection"),
      "Services/training/HeroSection": () => import("./Services/training/HeroSection"),
      "Services/training/TrainingPrograms": () => import("./Services/training/TrainingPrograms"),
      "Services/training/WhyChooseSection": () => import("./Services/training/WhyChooseSection"),
      "Services/Integration/HeroSection": () => import("./Services/Integration/HeroSection"),
      "Services/Integration/IntegrationTypes": () => import("./Services/Integration/IntegrationTypes"),
      "Services/Integration/BenefitsSection": () => import("./Services/Integration/BenefitsSection"),
      "Services/Customization/HeroSection": () => import("./Services/Customization/HeroSection"),
      "Services/Customization/ServicesSection": () => import("./Services/Customization/ServicesSection"),
      "Services/Customization/ProcessSection": () => import("./Services/Customization/ProcessSection"),
      "industries/Manufacturing/HeroSection": () => import("./industries/Manufacturing/HeroSection"),
      "industries/Manufacturing/IndustryStats": () => import("./industries/Manufacturing/IndustryStats"),
      "industries/Manufacturing/ChallengesSection": () => import("./industries/Manufacturing/ChallengesSection"),
      "industries/Manufacturing/SolutionsSection": () => import("./industries/Manufacturing/SolutionsSection"),
      "industries/Manufacturing/CaseStudies": () => import("./industries/Manufacturing/CaseStudies"),
      "industries/Manufacturing/ImplementationProcess": () => import("./industries/Manufacturing/ImplementationProcess"),
      "industries/Manufacturing/CTASection": () => import("./industries/Manufacturing/CTASection"),
      "industries/retail/HeroSection": () => import("./industries/retail/HeroSection"),
      "industries/retail/IndustryStats": () => import("./industries/retail/IndustryStats"),
      "industries/retail/ChallengesSection": () => import("./industries/retail/ChallengesSection"),
      "industries/retail/SolutionsSection": () => import("./industries/retail/SolutionsSection"),
      "industries/retail/FeaturesSection": () => import("./industries/retail/FeaturesSection"),
      "industries/retail/CaseStudiesSection": () => import("./industries/retail/CaseStudiesSection"),
      "industries/retail/ImplementationSection": () => import("./industries/retail/ImplementationSection"),
      "industries/retail/CTASection": () => import("./industries/retail/CTASection"),
      "About/AboutHero": () => import("./About/AboutHero"),
      "About/AboutMission": () => import("./About/AboutMission"),
      "About/AboutValues": () => import("./About/AboutValues"),
      "About/AboutTeam": () => import("./About/AboutTeam"),
      "About/AboutJourney": () => import("./About/AboutJourney"),
      "About/AboutMilestones": () => import("./About/AboutMilestones"),
      "About/AboutDifferentiators": () => import("./About/AboutDifferentiators"),
      "About/AboutCTA": () => import("./About/AboutCTA"),
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


