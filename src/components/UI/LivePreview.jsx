import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EyeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Card, { CardContent, CardHeader, CardTitle } from "../UI/Card";

// Import About components
import AboutHero from "../About/AboutHero";
import AboutMission from "../About/AboutMission";
import AboutTeam from "../About/AboutTeam";
import AboutValues from "../About/AboutValues";
import AboutJourney from "../About/AboutJourney";
import AboutMilestones from "../About/AboutMilestones";
import AboutDifferentiators from "../About/AboutDifferentiators";
import AboutCTA from "../About/AboutCTA";
// General Components
import PayrollHero from "../solution/payroll/PayrollHero";
import PayrollWorkflow from "../solution/payroll/PayrollWorkflow";
import PayrollStepper from "../solution/payroll/PayrollStepper";
import PayrollPainPoints from "../solution/payroll/PayrollPainPoints";
import PayrollFAQ from "../solution/payroll/PayrollFAQ";
import PayrollCTA from "../solution/payroll/PayrollCTA";
import HRHero from "../solution/hr/HeroSection";
import HRModules from "../solution/hr/ModulesSection";
import HRBenefits from "../solution/hr/BenefitsSection";
import HRUseCases from "../solution/hr/UseCasesSection";
import HRPricing from "../solution/hr/PricingSection";
import HRFAQ from "../solution/hr/FAQSection";
import HRCTA from "../solution/hr/CTASection";
// Landing Page Components
import Hero from "../Hero";
import Services from "../Services";
import Testimonials from "../Testimonials";
import Industries from "../Industries";
// Services Components
import ImplementationHero from "../Services/Implementation/HeroSection";
import TrainingHero from "../Services/training/HeroSection";
import IntegrationHero from "../Services/Integration/HeroSection";
// Industries Components
import ManufacturingHero from "../industries/Manufacturing/HeroSection";
import RetailHero from "../industries/retail/HeroSection";

/**
 * Real-time Component Preview System
 * Renders components with live data updates while maintaining original styling
 */
const ComponentPreview = ({
  componentType,
  componentData = {},
  theme = 1,
  isVisible = true,
  className = ""
}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Component registry mapping
  const componentRegistry = {
    AboutHeroSection: AboutHero,
    AboutMissionSection: AboutMission,
    AboutTeamSection: AboutTeam,
    AboutValuesSection: AboutValues,
    AboutJourneySection: AboutJourney,
    AboutMilestonesSection: AboutMilestones,
    AboutDifferentiatorsSection: AboutDifferentiators,
    AboutCTASection: AboutCTA,
    // General Components
    PayrollHeroSection: PayrollHero,
    PayrollWorkflowSection: PayrollWorkflow,
    PayrollStepperSection: PayrollStepper,
    PayrollPainPointsSection: PayrollPainPoints,
    PayrollFAQSection: PayrollFAQ,
    PayrollCTASection: PayrollCTA,
    HRHeroSection: HRHero,
    HRModulesSection: HRModules,
    HRBenefitsSection: HRBenefits,
    HRUseCasesSection: HRUseCases,
    HRPricingSection: HRPricing,
    HRFAQSection: HRFAQ,
    HRCTASection: HRCTA,
    // Landing Page Components
    HeroSection: Hero,
    ServicesSection: Services,
    TestimonialsSection: Testimonials,
    IndustriesSection: Industries,
    // Services Components
    ImplementationHeroSection: ImplementationHero,
    TrainingHeroSection: TrainingHero,
    IntegrationHeroSection: IntegrationHero,
    // Industries Components
    ManufacturingHeroSection: ManufacturingHero,
    RetailHeroSection: RetailHero
  };

  // Transform data to component props format
  const transformedProps = useMemo(() => {
    if (!componentData) return {};
    
    try {
      // Transform based on component type
      switch (componentType) {
        case 'AboutHeroSection':
          return {
            data: {
              title: componentData.title,
              subtitle: componentData.subtitle,
              description: componentData.description,
              backgroundVideo: componentData.backgroundVideo,
              stats: componentData.stats || []
            }
          };

        case 'AboutMissionSection': {
          console.log("🎯 [AboutMissionSection TRANSFORM] Input data:", componentData);
          const transformedMissionData = {
            data: {
              title: componentData.title || "",
              subtitle: componentData.subtitle || "",
              description: componentData.description || "",
              vision: componentData.vision || "",
              additionalContent: componentData.additionalContent || "",
              image: componentData.image || "",
              stats: Array.isArray(componentData.stats) ? componentData.stats : [],
              missionPoints: Array.isArray(componentData.missionPoints) ? componentData.missionPoints : []
            }
          };
          console.log("✅ [AboutMissionSection TRANSFORM] Output data:", transformedMissionData);
          return transformedMissionData;
        }

        case 'AboutTeamSection':
          console.log("🎯 [AboutTeamSection TRANSFORM] Input data:", componentData);
          const transformedTeamData = {
            teamMembers: componentData.members || [],
            data: {
              title: componentData.title || "Meet Our Team",
              description: componentData.description || "Our diverse team of experts brings together decades of experience in enterprise software, business consulting, and digital transformation."
            }
          };
          console.log("✅ [AboutTeamSection TRANSFORM] Output data:", transformedTeamData);
          return transformedTeamData;

        case 'AboutValuesSection':
          console.log("🎯 [AboutValuesSection TRANSFORM] Input data:", componentData);
          const transformedValuesData = {
            values: componentData.items || [],
            data: {
              title: componentData.title || "Our Values",
              description: componentData.description || "These core values guide everything we do and shape how we interact with our clients, partners, and each other."
            }
          };
          console.log("✅ [AboutValuesSection TRANSFORM] Output data:", transformedValuesData);
          return transformedValuesData;

        case 'AboutJourneySection':
          console.log("🎯 [AboutJourneySection TRANSFORM] Input data:", componentData);
          const transformedJourneyData = {
            data: {
              beginningTitle: componentData.beginningTitle || "The Beginning",
              beginningText: componentData.beginningText || "Founded in 2008 with a vision to bridge the gap between complex enterprise software and real business needs. Our founders recognized that many businesses were struggling to fully leverage their technology investments.",
              growthTitle: componentData.growthTitle || "Growth & Evolution",
              growthText: componentData.growthText || "Over the years, we've evolved from a small consulting firm to a comprehensive digital transformation partner, helping hundreds of organizations across various industries unlock their full potential.",
              todayTitle: componentData.todayTitle || "Today",
              todayText: componentData.todayText || "We continue to innovate and expand our services, staying at the forefront of technology trends while maintaining our core values of excellence and integrity.",
              imageUrl: componentData.imageUrl || "/images/solution.jpg"
            }
          };
          console.log("✅ [AboutJourneySection TRANSFORM] Output data:", transformedJourneyData);
          return transformedJourneyData;

        case 'AboutMilestonesSection':
          console.log("🎯 [AboutMilestonesSection TRANSFORM] Input data:", componentData);
          const transformedMilestonesData = {
            milestones: componentData.items || [],
            data: {
              title: componentData.title || "Our Milestones",
              description: componentData.description || "Key achievements and milestones that mark our journey of growth, innovation, and commitment to excellence."
            }
          };
          console.log("✅ [AboutMilestonesSection TRANSFORM] Output data:", transformedMilestonesData);
          return transformedMilestonesData;

        case 'AboutDifferentiatorsSection':
          console.log("🎯 [AboutDifferentiatorsSection TRANSFORM] Input data:", componentData);
          const transformedDifferentiatorsData = {
            differentiators: componentData.items || [],
            data: {
              title: componentData.title || "What Sets Us Apart",
              description: componentData.description || "Our unique combination of expertise, methodology, and commitment to excellence makes us the preferred choice for Oracle NetSuite implementations."
            }
          };
          console.log("✅ [AboutDifferentiatorsSection TRANSFORM] Output data:", transformedDifferentiatorsData);
          return transformedDifferentiatorsData;

        case 'AboutCTASection':
          console.log("🎯 [AboutCTASection TRANSFORM] Input data:", componentData);
          const transformedCTAData = {
            title: componentData.title || "Ready to Build Something Great?",
            subtitle: componentData.subtitle || "Let's collaborate to transform your business with innovative Oracle NetSuite solutions that drive growth, efficiency, and success.",
            description: componentData.description || "Contact us today to discuss how we can help you optimize your operations and drive growth.",
            ctaButton: componentData.ctaButton || { text: "Start Consultation", link: "/contact", variant: "primary" },
            features: componentData.features || [
              { title: "Quick Start", description: "Get started our consultation" },
              { title: "Expert Team", description: "Work with certified professionals" },
              { title: "Proven Results", description: "Join our success stories" }
            ],
            onOpenContactModal: () => console.log('Contact modal opened')
          };
          console.log("✅ [AboutCTASection TRANSFORM] Output data:", transformedCTAData);
          return transformedCTAData;

        // General Components
        case 'PayrollHeroSection':
          console.log("🎯 [PayrollHeroSection TRANSFORM] Input data:", componentData);
          const transformedPayrollHeroData = {
            title: componentData.title || "Transform Your Payroll Process",
            subtitle: componentData.subtitle || "Streamline operations with our intelligent, automated payroll system",
            description: componentData.description || "",
            ctaButton: componentData.ctaButton || { text: "Get Started", link: "/contact" },
            backgroundImage: componentData.backgroundImage || "/images/payrollFinal.jpeg",
            bgColor: componentData.bgColor || "",
            bgVideo: componentData.bgVideo || "",
            data: componentData
          };
          console.log("✅ [PayrollHeroSection TRANSFORM] Output data:", transformedPayrollHeroData);
          return transformedPayrollHeroData;

        case 'HRHeroSection':
          console.log("🎯 [HRHeroSection TRANSFORM] Input data:", componentData);
          const transformedHRHeroData = {
            data: {
              hero: {
                title: componentData.title || "Modern HR, Payroll & People Management",
                subtitle: componentData.subtitle || "Automate HR, empower employees, and stay compliant—on one secure platform designed for the future of work.",
                bgVideo: componentData.bgVideo || "/Videos/hrVideo.mp4",
                bgColor: componentData.bgColor || "bg-gradient-to-br from-[#191970] via-black to-blue-700"
              }
            }
          };
          console.log("✅ [HRHeroSection TRANSFORM] Output data:", transformedHRHeroData);
          return transformedHRHeroData;

        case 'PayrollWorkflowSection':
          console.log("🎯 [PayrollWorkflowSection TRANSFORM] Input data:", componentData);
          const transformedPayrollWorkflowData = {
            workflowData: {
              title: componentData.title || "Payroll System Built for All Industries",
              description: componentData.description || "Streamline your entire payroll lifecycle — from onboarding to salary disbursement — with a secure, intuitive platform.",
              steps: componentData.steps || []
            }
          };
          console.log("✅ [PayrollWorkflowSection TRANSFORM] Output data:", transformedPayrollWorkflowData);
          return transformedPayrollWorkflowData;

        case 'PayrollStepperSection':
          console.log("🎯 [PayrollStepperSection TRANSFORM] Input data:", componentData);
          const transformedPayrollStepperData = {
            steps: componentData.steps || [],
            title: componentData.title || "Payroll Process Steps"
          };
          console.log("✅ [PayrollStepperSection TRANSFORM] Output data:", transformedPayrollStepperData);
          return transformedPayrollStepperData;

        case 'PayrollPainPointsSection':
          console.log("🎯 [PayrollPainPointsSection TRANSFORM] Input data:", componentData);
          const transformedPayrollPainPointsData = {
            painPoints: componentData.items || []
          };
          console.log("✅ [PayrollPainPointsSection TRANSFORM] Output data:", transformedPayrollPainPointsData);
          return transformedPayrollPainPointsData;

        case 'PayrollFAQSection':
          console.log("🎯 [PayrollFAQSection TRANSFORM] Input data:", componentData);
          const transformedPayrollFAQData = {
            faqData: {
              title: componentData.title || "Frequently Asked Questions",
              items: componentData.items || []
            }
          };
          console.log("✅ [PayrollFAQSection TRANSFORM] Output data:", transformedPayrollFAQData);
          return transformedPayrollFAQData;

        case 'PayrollCTASection':
          console.log("🎯 [PayrollCTASection TRANSFORM] Input data:", componentData);
          const transformedPayrollCTAData = {
            title: componentData.title || "Ready to Transform Your Payroll?",
            subtitle: componentData.subtitle || "Let's discuss your payroll needs",
            ctaButton: componentData.ctaButton || { text: "Get Started", link: "/contact" }
          };
          console.log("✅ [PayrollCTASection TRANSFORM] Output data:", transformedPayrollCTAData);
          return transformedPayrollCTAData;

        case 'HRModulesSection':
          console.log("🎯 [HRModulesSection TRANSFORM] Input data:", componentData);
          const transformedHRModulesData = {
            data: {
              modules: componentData.modules || []
            }
          };
          console.log("✅ [HRModulesSection TRANSFORM] Output data:", transformedHRModulesData);
          return transformedHRModulesData;

        case 'HRBenefitsSection':
          console.log("🎯 [HRBenefitsSection TRANSFORM] Input data:", componentData);
          const transformedHRBenefitsData = {
            data: {
              features: componentData.features || []
            }
          };
          console.log("✅ [HRBenefitsSection TRANSFORM] Output data:", transformedHRBenefitsData);
          return transformedHRBenefitsData;

        case 'HRUseCasesSection':
          console.log("🎯 [HRUseCasesSection TRANSFORM] Input data:", componentData);
          const transformedHRUseCasesData = {
            data: {
              useCases: componentData.useCases || []
            }
          };
          console.log("✅ [HRUseCasesSection TRANSFORM] Output data:", transformedHRUseCasesData);
          return transformedHRUseCasesData;

        case 'HRPricingSection':
          console.log("🎯 [HRPricingSection TRANSFORM] Input data:", componentData);
          const transformedHRPricingData = {
            data: {
              pricing: componentData.pricing || []
            }
          };
          console.log("✅ [HRPricingSection TRANSFORM] Output data:", transformedHRPricingData);
          return transformedHRPricingData;

        case 'HRFAQSection':
          console.log("🎯 [HRFAQSection TRANSFORM] Input data:", componentData);
          const transformedHRFAQData = {
            data: {
              faq: componentData.faq || []
            }
          };
          console.log("✅ [HRFAQSection TRANSFORM] Output data:", transformedHRFAQData);
          return transformedHRFAQData;

        case 'HRCTASection':
          console.log("🎯 [HRCTASection TRANSFORM] Input data:", componentData);
          const transformedHRCTAData = {
            title: componentData.title || "Ready to Transform Your HR?",
            subtitle: componentData.subtitle || "Let's discuss your HR needs",
            ctaButton: componentData.ctaButton || { text: "Get Started", link: "/contact" }
          };
          console.log("✅ [HRCTASection TRANSFORM] Output data:", transformedHRCTAData);
          return transformedHRCTAData;

        // Landing Page Components
        case 'HeroSection':
          console.log("🎯 [HeroSection TRANSFORM] Input data:", componentData);
          const transformedHeroData = {
            slides: componentData.slides || [],
            stats: componentData.stats || [],
            data: componentData
          };
          console.log("✅ [HeroSection TRANSFORM] Output data:", transformedHeroData);
          return transformedHeroData;

        case 'ServicesSection':
          console.log("🎯 [ServicesSection TRANSFORM] Input data:", componentData);
          const transformedServicesData = {
            services: componentData.services || [],
            sectionHeader: componentData.sectionHeader || {},
            viewAllButton: componentData.viewAllButton || {},
            data: componentData
          };
          console.log("✅ [ServicesSection TRANSFORM] Output data:", transformedServicesData);
          return transformedServicesData;

        case 'TestimonialsSection':
          console.log("🎯 [TestimonialsSection TRANSFORM] Input data:", componentData);
          const transformedTestimonialsData = {
            testimonials: componentData.testimonials || [],
            sectionHeader: componentData.sectionHeader || {},
            data: componentData
          };
          console.log("✅ [TestimonialsSection TRANSFORM] Output data:", transformedTestimonialsData);
          return transformedTestimonialsData;

        case 'IndustriesSection':
          console.log("🎯 [IndustriesSection TRANSFORM] Input data:", componentData);
          const transformedIndustriesData = {
            industries: componentData.industries || [],
            sectionHeader: componentData.sectionHeader || {},
            data: componentData
          };
          console.log("✅ [IndustriesSection TRANSFORM] Output data:", transformedIndustriesData);
          return transformedIndustriesData;

        // Services Components
        case 'ImplementationHeroSection':
          console.log("🎯 [ImplementationHeroSection TRANSFORM] Input data:", componentData);
          const transformedImplementationHeroData = {
            data: componentData || {}
          };
          console.log("✅ [ImplementationHeroSection TRANSFORM] Output data:", transformedImplementationHeroData);
          return transformedImplementationHeroData;

        case 'TrainingHeroSection':
          console.log("🎯 [TrainingHeroSection TRANSFORM] Input data:", componentData);
          const transformedTrainingHeroData = {
            heroContent: componentData.heroContent || {
              title: "Transform Your Career with Oracle NetSuite Training",
              subtitle: "Professional ERP Education & Skills Development",
              description: "Master Oracle NetSuite with comprehensive training programs designed for professionals at all levels."
            },
            backgroundVideo: componentData.backgroundVideo || "/Videos/training-hero.mp4",
            ctaButton: componentData.ctaButton || {
              text: "Start Learning",
              variant: "primary"
            },
            data: componentData
          };
          console.log("✅ [TrainingHeroSection TRANSFORM] Output data:", transformedTrainingHeroData);
          return transformedTrainingHeroData;

        case 'IntegrationHeroSection':
          console.log("🎯 [IntegrationHeroSection TRANSFORM] Input data:", componentData);
          const transformedIntegrationHeroData = {
            title: componentData.title || "NetSuite Integration Services",
            subtitle: componentData.subtitle || "Connect NetSuite with your existing systems for seamless data flow",
            data: componentData
          };
          console.log("✅ [IntegrationHeroSection TRANSFORM] Output data:", transformedIntegrationHeroData);
          return transformedIntegrationHeroData;

        // Industries Components
        case 'ManufacturingHeroSection':
          console.log("🎯 [ManufacturingHeroSection TRANSFORM] Input data:", componentData);
          const transformedManufacturingHeroData = {
            title: componentData.title || "Manufacturing Solutions",
            subtitle: componentData.subtitle || "Streamline your manufacturing operations",
            description: componentData.description || "Comprehensive NetSuite solutions for manufacturing businesses",
            backgroundImage: componentData.backgroundImage || "/images/manufacturing-hero.jpg",
            backgroundVideo: componentData.backgroundVideo || "",
            ctaButton: componentData.ctaButton || {
              text: "Learn More",
              link: "/manufacturing",
              variant: "primary"
            },
            data: componentData
          };
          console.log("✅ [ManufacturingHeroSection TRANSFORM] Output data:", transformedManufacturingHeroData);
          return transformedManufacturingHeroData;

        case 'RetailHeroSection':
          console.log("🎯 [RetailHeroSection TRANSFORM] Input data:", componentData);
          const transformedRetailHeroData = {
            data: componentData || {
              title: "Retail Solutions",
              subtitle: "Transform your retail operations",
              description: "Comprehensive NetSuite solutions for retail businesses"
            }
          };
          console.log("✅ [RetailHeroSection TRANSFORM] Output data:", transformedRetailHeroData);
          return transformedRetailHeroData;

        default:
          // Generic prop structure for unknown components
          console.log("🎯 [DEFAULT TRANSFORM] Input data:", componentData);
          return componentData;
      }
    } catch (error) {
      console.error(`Error transforming props for ${componentType}:`, error);
      setError(`Failed to transform component props: ${error.message}`);
      return {};
    }
  }, [componentType, componentData]);

  // Get component from registry
  const Component = componentRegistry[componentType];

  // Error boundary wrapper
  const ErrorBoundaryWrapper = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    const [errorDetails, setErrorDetails] = useState(null);
    
    const dataString = JSON.stringify(componentData);

    useEffect(() => {
      setHasError(false);
      setErrorDetails(null);
    }, [dataString]);

    const handleError = (error, errorInfo) => {
      console.error(`Component Error in ${componentType}:`, error, errorInfo);
      setHasError(true);
      setErrorDetails({ error, errorInfo });
    };

    if (hasError) {
      return (
        <div className="p-6 border border-red-200 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20">
          <div className="flex items-center space-x-2 mb-4">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
              Component Render Error
            </h3>
          </div>
          <p className="text-sm text-red-600 dark:text-red-400 mb-2">
            {componentType} failed to render with the current configuration.
          </p>
          <details className="text-xs text-red-500">
            <summary className="cursor-pointer">Error Details</summary>
            <pre className="mt-2 p-2 bg-red-100 dark:bg-red-800/20 rounded overflow-auto">
              {errorDetails?.error?.toString()}
            </pre>
          </details>
        </div>
      );
    }

    try {
      return children;
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  if (!Component) {
    return (
      <div className="p-6 border border-yellow-200 dark:border-yellow-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
        <div className="flex items-center space-x-2 mb-2">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">
            Component Not Found
          </h3>
        </div>
        <p className="text-sm text-yellow-600 dark:text-yellow-400">
          Component type "{componentType}" is not registered in the preview system.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 border border-red-200 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-900/20">
        <div className="flex items-center space-x-2 mb-2">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
            Preview Error
          </h3>
        </div>
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className={`component-preview ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${componentType}-${JSON.stringify(componentData)}`}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isVisible ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
          style={{
            filter: isVisible ? 'none' : 'grayscale(50%)',
          }}
        >
          <ErrorBoundaryWrapper>
            {/* Wrap component in section with theme attribute for proper styling */}
            <section data-theme={theme === 1 ? "light" : "dark"}>
              <Component {...transformedProps} />
            </section>
          </ErrorBoundaryWrapper>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/**
 * Live Preview Container
 * Handles multiple component previews with real-time updates
 */
const LivePreview = ({
  components = [],
  previewMode = "desktop",
  showDebugInfo = false,
  className = ""
}) => {
  const [refreshKey, setRefreshKey] = useState(0);

  // Force refresh when component data changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRefreshKey(prev => prev + 1);
    }, 100); // Small debounce to prevent too frequent updates
    
    return () => clearTimeout(timeout);
  }, [components]);

  // Additional refresh trigger for contentJson changes
  useEffect(() => {
    const contentJsonString = components.map(comp => comp.contentJson).join('|');
    console.log("🔄 [LIVE PREVIEW] ContentJson changed:", {
      contentJsonString: contentJsonString.slice(0, 200),
      componentCount: components.length,
      refreshKey: refreshKey
    });
    
    const timeout = setTimeout(() => {
      console.log("🔄 [LIVE PREVIEW] Triggering refresh:", refreshKey + 1);
      setRefreshKey(prev => prev + 1);
    }, 50); // Faster refresh for content changes
    
    return () => clearTimeout(timeout);
  }, [components.map(comp => comp.contentJson).join('|')]);

  const previewClasses = {
    desktop: "max-w-none",
    tablet: "max-w-4xl mx-auto",
    mobile: "max-w-sm mx-auto"
  };

  return (
    <Card className={`bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-xl font-bold flex items-center space-x-2">
            <EyeIcon className="h-5 w-5" />
            <span>Live Preview</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">
              {previewMode.charAt(0).toUpperCase() + previewMode.slice(1)} View
            </span>
            <span className="text-xs text-gray-500">
              ({components.length} component{components.length !== 1 ? 's' : ''})
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`bg-white dark:bg-gray-900 rounded-lg min-h-[400px] ${previewClasses[previewMode]}`}>
          {components.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="text-center">
                <EyeIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No components to preview</p>
                <p className="text-sm">Add components to see them here</p>
              </div>
            </div>
          ) : (
            <div key={refreshKey} className="space-y-0">
              {components.map((component, index) => {
                // Enhanced real-time data extraction
                const extractComponentData = (component) => {
                  console.log("🔄 [REALTIME EXTRACTION] Component data:", {
                    componentType: component.componentType,
                    contentJson: component.contentJson,
                    hasContentJson: !!component.contentJson,
                    isAboutMissionSection: component.componentType === 'AboutMissionSection'
                  });

                  let rawData = {};
                  
                  // Always use the latest contentJson from form
                  if (component.contentJson) {
                    try {
                      rawData = JSON.parse(component.contentJson);
                      console.log("✅ [REALTIME EXTRACTION] Parsed content:", rawData);
                    } catch (err) {
                      console.error("❌ [REALTIME EXTRACTION] JSON parse error:", err);
                      rawData = {};
                    }
                  }

                  // Enhanced debugging for AboutMissionSection
                  if (component.componentType === 'AboutMissionSection') {
                    console.log("🎯 [AboutMissionSection EXTRACTION] Debug data:", {
                      rawContentJson: component.contentJson,
                      parsedData: rawData,
                      fieldAnalysis: {
                        hasTitle: !!rawData.title,
                        hasSubtitle: !!rawData.subtitle,
                        hasDescription: !!rawData.description,
                        hasVision: !!rawData.vision,
                        hasAdditionalContent: !!rawData.additionalContent,
                        hasImage: !!rawData.image,
                        hasStats: Array.isArray(rawData.stats),
                        statsCount: rawData.stats?.length || 0,
                        hasMissionPoints: Array.isArray(rawData.missionPoints),
                        missionPointsCount: rawData.missionPoints?.length || 0
                      },
                      timestamp: new Date().toISOString()
                    });
                  }
                  
                  return rawData;
                };

                let componentData = extractComponentData(component);

                // Debug logging for all About components
                if (component.componentType?.includes("About")) {
                  console.log(`👁️ [LIVE PREVIEW] Rendering ${component.componentType}:`, {
                    componentIndex: index,
                    hasContentJson: !!component.contentJson,
                    contentJsonLength: component.contentJson?.length || 0,
                    parsedData: componentData,
                    extractedKeys: Object.keys(componentData),
                    timestamp: new Date().toISOString()
                  });
                }
                
                return (
                  <div key={`${component.id || index}-${component.componentType}-${refreshKey}-${component.contentJson?.slice(0, 50)}`} className="relative">
                    {showDebugInfo && (
                      <div className="absolute top-2 right-2 z-10 bg-black/70 text-white text-xs p-2 rounded max-w-xs">
                        <div><strong>Type:</strong> {component.componentType}</div>
                        <div><strong>Theme:</strong> {component.theme === 1 ? 'Light' : 'Dark'}</div>
                        <div><strong>Visible:</strong> {component.isVisible ? 'Yes' : 'No'}</div>
                        <div><strong>Order:</strong> {component.orderIndex || index + 1}</div>
                        <div><strong>Data Keys:</strong> {Object.keys(componentData).join(', ')}</div>
                      </div>
                    )}
                    
                    <ComponentPreview
                      componentType={component.componentType}
                      componentData={componentData}
                      theme={component.theme}
                      isVisible={component.isVisible}
                      key={`preview-${component.id || index}-${refreshKey}-${JSON.stringify(componentData).slice(0, 100)}`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Split-Screen Preview with Form
 * Shows form and preview side-by-side
 */
const SplitScreenPreview = ({
  componentType,
  componentData,
  formComponent,
  theme = 1,
  className = ""
}) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {/* Form Side */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-lg font-bold">
            Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-96 overflow-y-auto">
          {formComponent}
        </CardContent>
      </Card>

      {/* Preview Side */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-lg font-bold">
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
            <ComponentPreview
              componentType={componentType}
              componentData={componentData}
              theme={theme}
              isVisible={true}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ComponentPreview, LivePreview, SplitScreenPreview };
export default LivePreview;