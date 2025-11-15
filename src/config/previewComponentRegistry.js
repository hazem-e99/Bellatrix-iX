/**
 * Preview Component Registry
 * Maps component type strings to their actual component imports
 * Used by LivePreview to dynamically render components
 */

// Import About components
import AboutHero from "../components/About/AboutHero";
import AboutMission from "../components/About/AboutMission";
import AboutTeam from "../components/About/AboutTeam";
import AboutValues from "../components/About/AboutValues";
import AboutJourney from "../components/About/AboutJourney";
import AboutMilestones from "../components/About/AboutMilestones";
import AboutDifferentiators from "../components/About/AboutDifferentiators";
import AboutCTA from "../components/About/AboutCTA";

// HR & Payroll Components
import PayrollHero from "../components/solution/payroll/PayrollHero";
import PayrollWorkflow from "../components/solution/payroll/PayrollWorkflow";
import PayrollStepper from "../components/solution/payroll/PayrollStepper";
import PayrollPainPoints from "../components/solution/payroll/PayrollPainPoints";
import PayrollFAQ from "../components/solution/payroll/PayrollFAQ";
import PayrollCTA from "../components/solution/payroll/PayrollCTA";
import PayrollHowItWorks from "../components/solution/payroll/PayrollHowItWorks";
import HRHero from "../components/solution/hr/HeroSection";
import HRModules from "../components/solution/hr/ModulesSection";
import HRBenefits from "../components/solution/hr/BenefitsSection";
import HRUseCases from "../components/solution/hr/UseCasesSection";
import HRPricing from "../components/solution/hr/PricingSection";
import HRFAQ from "../components/solution/hr/FAQSection";
import HRCTA from "../components/solution/hr/CTASection";

// Landing Page Components
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import Industries from "../components/Industries";

// Services Components
import ImplementationHero from "../components/Services/Implementation/HeroSection";
import ImplementationProcess from "../components/Services/Implementation/ProcessSection";
import ImplementationWhyChoose from "../components/Services/Implementation/WhyChooseSection";
import ImplementationPricing from "../components/Services/Implementation/PricingSection";
import ImplementationCta from "../components/Services/Implementation/CtaSection";
import TrainingHero from "../components/Services/training/HeroSection";
import TrainingPrograms from "../components/Services/training/ProgramsSection";
import TrainingKeyModules from "../components/Services/training/KeyModulesSection";
import TrainingWhyChoose from "../components/Services/training/WhyChooseSection";
import IntegrationHero from "../components/Services/Integration/HeroSection";
import IntegrationTypes from "../components/Services/Integration/IntegrationTypes";
import IntegrationBenefits from "../components/Services/Integration/BenefitsSection";
import IntegrationPopular from "../components/Services/Integration/PopularIntegrations";
import IntegrationCta from "../components/Services/Integration/CtaSection";
import ServiceGrid from "../components/Services/ServiceGrid";

// Industries Components - Manufacturing
import ManufacturingHero from "../components/industries/Manufacturing/HeroSection";
import ManufacturingSolutions from "../components/industries/Manufacturing/SolutionsSection";
import ManufacturingChallenges from "../components/industries/Manufacturing/ChallengesSection";
import ManufacturingIndustryStats from "../components/industries/Manufacturing/IndustryStats";
import ManufacturingImplementationProcess from "../components/industries/Manufacturing/ImplementationProcess";
import ManufacturingCaseStudies from "../components/industries/Manufacturing/CaseStudies";
import ManufacturingCTA from "../components/industries/Manufacturing/CTASection";

// Industries Components - Retail
import RetailHero from "../components/industries/retail/HeroSection";
import RetailChallenges from "../components/industries/retail/ChallengesSection";
import RetailSolutions from "../components/industries/retail/SolutionsSection";
import RetailFeatures from "../components/industries/retail/FeaturesSection";
import RetailCaseStudies from "../components/industries/retail/CaseStudiesSection";
import RetailCTA from "../components/industries/retail/CTASection";

// Common/Shared Components
import CTAButton from "../components/CTAButton";

/**
 * Component Registry - Maps component type strings to actual components
 * Add new components here when they need to be available in the preview system
 */
export const componentRegistry = {
  // ===========================================
  // ABOUT PAGE COMPONENTS
  // ===========================================
  AboutHeroSection: AboutHero,
  AboutMissionSection: AboutMission,
  AboutTeamSection: AboutTeam,
  AboutValuesSection: AboutValues,
  AboutJourneySection: AboutJourney,
  AboutMilestonesSection: AboutMilestones,
  AboutDifferentiatorsSection: AboutDifferentiators,
  AboutCTASection: AboutCTA,

  // ===========================================
  // HR & PAYROLL COMPONENTS
  // ===========================================
  PayrollHeroSection: PayrollHero,
  PayrollWorkflowSection: PayrollWorkflow,
  PayrollStepperSection: PayrollStepper,
  PayrollPainPointsSection: PayrollPainPoints,
  PayrollFAQSection: PayrollFAQ,
  PayrollCTASection: PayrollCTA,
  PayrollHowItWorksSection: PayrollHowItWorks,
  HRHeroSection: HRHero,
  HRModulesSection: HRModules,
  HRBenefitsSection: HRBenefits,
  HRUseCasesSection: HRUseCases,
  HRPricingSection: HRPricing,
  HRFAQSection: HRFAQ,
  HRCTASection: HRCTA,

  // ===========================================
  // LANDING PAGE COMPONENTS
  // ===========================================
  Hero: Hero,
  HeroSection: Hero,
  Services: Services,
  ServicesSection: Services,
  Testimonials: Testimonials,
  TestimonialsSection: Testimonials,
  Industries: Industries,
  IndustriesSection: Industries,

  // ===========================================
  // SERVICES COMPONENTS
  // ===========================================
  ImplementationHeroSection: ImplementationHero,
  ImplementationProcessSection: ImplementationProcess,
  ImplementationWhyChooseSection: ImplementationWhyChoose,
  WhyChooseSection: ImplementationWhyChoose, // Alias
  ImplementationPricingSection: ImplementationPricing,
  ImplementationCtaSection: ImplementationCta,
  ImplementationCTASection: ImplementationCta, // Alias
  ServiceGrid: ServiceGrid,
  ServiceGridSection: ServiceGrid,

  // Training Components
  TrainingHeroSection: TrainingHero,
  TrainingProgramsSection: TrainingPrograms,
  ProgramsSection: TrainingPrograms, // Alias
  ProgramsSectionSection: TrainingPrograms, // Alias
  TrainingKeyModulesSection: TrainingKeyModules,
  TrainingWhyChooseSection: TrainingWhyChoose,

  // Integration Components
  IntegrationHeroSection: IntegrationHero,
  IntegrationTypesSection: IntegrationTypes,
  IntegrationBenefitsSection: IntegrationBenefits,
  IntegrationPopularSection: IntegrationPopular,
  IntegrationCtaSection: IntegrationCta,
  IntegrationCTASection: IntegrationCta, // Alias

  // ===========================================
  // INDUSTRY COMPONENTS - MANUFACTURING
  // ===========================================
  ManufacturingHeroSection: ManufacturingHero,
  ManufacturingSolutionsSection: ManufacturingSolutions,
  ManufacturingChallengesSection: ManufacturingChallenges,
  ManufacturingIndustryStats: ManufacturingIndustryStats,
  ManufacturingImplementationProcess: ManufacturingImplementationProcess,
  ManufacturingCaseStudies: ManufacturingCaseStudies,
  ManufacturingCTASection: ManufacturingCTA,

  // ===========================================
  // INDUSTRY COMPONENTS - RETAIL
  // ===========================================
  RetailHeroSection: RetailHero,
  RetailChallengesSection: RetailChallenges,
  RetailSolutionsSection: RetailSolutions,
  RetailFeaturesSection: RetailFeatures,
  RetailCaseStudies: RetailCaseStudies,
  RetailCTASection: RetailCTA,

  // ===========================================
  // COMMON/SHARED COMPONENTS
  // ===========================================
  CTAButton: CTAButton,
};

/**
 * Get component by type string
 * @param {string} componentType - The component type string
 * @returns {React.Component|null} The component or null if not found
 */
export const getComponentByType = (componentType) => {
  return componentRegistry[componentType] || null;
};

/**
 * Check if a component type exists in the registry
 * @param {string} componentType - The component type string
 * @returns {boolean} True if the component exists
 */
export const hasComponent = (componentType) => {
  return componentType in componentRegistry;
};

export default componentRegistry;

