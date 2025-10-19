import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { EyeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Card, { CardContent, CardHeader, CardTitle } from "../UI/Card";

// Import About components
import { motion } from "framer-motion";
import AboutHero from "../About/AboutHero";
import AboutMission from "../About/AboutMission";
import AboutTeam from "../About/AboutTeam";
import AboutValues from "../About/AboutValues";
import AboutJourney from "../About/AboutJourney";
import AboutMilestones from "../About/AboutMilestones";
import AboutDifferentiators from "../About/AboutDifferentiators";
import AboutCTA from "../About/AboutCTA";

// HR & Payroll Components
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
import ImplementationProcess from "../Services/Implementation/ProcessSection";
import ImplementationWhyChoose from "../Services/Implementation/WhyChooseSection";
import ImplementationPricing from "../Services/Implementation/PricingSection";
import ImplementationCta from "../Services/Implementation/CtaSection";
import TrainingHero from "../Services/training/HeroSection";
import TrainingPrograms from "../Services/training/ProgramsSection";
import TrainingKeyModules from "../Services/training/KeyModulesSection";
import TrainingWhyChoose from "../Services/training/WhyChooseSection";

import IntegrationHero from "../Services/Integration/HeroSection";
import IntegrationTypes from "../Services/Integration/IntegrationTypes";
import IntegrationBenefits from "../Services/Integration/BenefitsSection";
import IntegrationPopular from "../Services/Integration/PopularIntegrations";
import IntegrationCta from "../Services/Integration/CtaSection";

import ServiceGrid from "../Services/ServiceGrid";
import ImplementationCTA from "../Services/Implementation/CtaSection";
import PayrollHowItWorks from "../solution/payroll/PayrollHowItWorks";

// Industries Components - Manufacturing
import ManufacturingHero from "../industries/Manufacturing/HeroSection";
import ManufacturingSolutions from "../industries/Manufacturing/SolutionsSection";
import ManufacturingChallenges from "../industries/Manufacturing/ChallengesSection";
import ManufacturingIndustryStats from "../industries/Manufacturing/IndustryStats";
import ManufacturingImplementationProcess from "../industries/Manufacturing/ImplementationProcess";
import ManufacturingCaseStudies from "../industries/Manufacturing/CaseStudies";
import ManufacturingCTA from "../industries/Manufacturing/CTASection";

// Industries Components - Retail
import RetailHero from "../industries/retail/HeroSection";
import RetailIndustryStats from "../industries/retail/IndustryStats";
import RetailChallenges from "../industries/retail/ChallengesSection";
import RetailSolutions from "../industries/retail/SolutionsSection";
import RetailFeatures from "../industries/retail/FeaturesSection";
import RetailCaseStudies from "../industries/retail/CaseStudiesSection";
import RetailImplementation from "../industries/retail/ImplementationSection";
import RetailCTA from "../industries/retail/CTASection";

// Common/Shared Components
import SEO from "../SEO";
import CTAButton from "../CTAButton";

/**
 * Real-time Component Preview System
 * Renders components with live data updates while maintaining original styling
 */
const ComponentPreview = ({
  componentType,
  componentData = {},
  theme = 1,
  isVisible = true,
  className = "",
}) => {
  const [error, setError] = useState(null);

  // Component registry mapping - All available components for preview
  const componentRegistry = {
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
    ImplementationPricingSection: ImplementationPricing,
    ImplementationCtaSection: ImplementationCta,

    // Training Components
    TrainingHeroSection: TrainingHero,
    TrainingProgramsSection: TrainingPrograms,
    TrainingKeyModulesSection: TrainingKeyModules,
    TrainingWhyChooseSection: TrainingWhyChoose,

    // Integration Components
    ServiceGrid: ServiceGrid,
    ImplementationCTASection: ImplementationCTA,

    // ===========================================
    // INDUSTRY COMPONENTS - MANUFACTURING
    // ===========================================
    ManufacturingHeroSection: ManufacturingHero,
    ManufacturingSolutionsSection: ManufacturingSolutions,
    ManufacturingChallengesSection: ManufacturingChallenges,
    ManufacturingIndustryStats: ManufacturingIndustryStats,
    ManufacturingIndustryStatsSection: ManufacturingIndustryStats,
    ManufacturingImplementationProcess: ManufacturingImplementationProcess,
    ManufacturingImplementationProcessSection: ManufacturingImplementationProcess,
    ManufacturingCaseStudies: ManufacturingCaseStudies,
    ManufacturingCaseStudiesSection: ManufacturingCaseStudies,
    ManufacturingCTASection: ManufacturingCTA,

    // ===========================================
    // INDUSTRY COMPONENTS - RETAIL
    // ===========================================
    RetailHeroSection: RetailHero,
    RetailIndustryStats: RetailIndustryStats,
    RetailIndustryStatsSection: RetailIndustryStats,
    RetailChallengesSection: RetailChallenges,
    RetailSolutionsSection: RetailSolutions,
    RetailFeaturesSection: RetailFeatures,
    RetailCaseStudies: RetailCaseStudies,
    RetailCaseStudiesSection: RetailCaseStudies,
    RetailImplementationSection: RetailImplementation,
    RetailCTASection: RetailCTA,

    // ===========================================
    // COMMON/SHARED COMPONENTS
    // ===========================================
    SEO: SEO,
    CTAButton: CTAButton,
  };

  // Transform data to component props format
  const transformedProps = useMemo(() => {
    if (!componentData) return {};

    try {
      // Transform based on component type
      switch (componentType) {
        case "PayrollHowItWorksSection": {
          {
            console.log(
              "🎯 [PayrollHowItWorksSection TRANSFORM] Input data:",
              componentData
            );
            const transformedPayrollHowItWorksData = {
              data: {
                title: componentData.title || "How Our Payroll System Works",
                description:
                  componentData.description ||
                  "Our payroll process is simple: upload employee and contract details, sync timesheets and leave data, let the system run payroll automatically on schedule, approve via role-based access, execute payments through integrated bank APIs, and download payslips & compliance-ready reports—all in one platform.",
                steps: Array.isArray(componentData.steps)
                  ? componentData.steps
                  : [],
              },
            };
            console.log(
              "✅ [PayrollHowItWorksSection TRANSFORM] Output data:",
              transformedPayrollHowItWorksData
            );
            return transformedPayrollHowItWorksData;
          }
        }
        case "AboutHeroSection":
          return {
            data: {
              title: componentData.title,
              subtitle: componentData.subtitle,
              description: componentData.description,
              backgroundVideo: componentData.backgroundVideo,
              stats: componentData.stats || [],
            },
          };

        case "AboutMissionSection": {
          console.log(
            "🎯 [AboutMissionSection TRANSFORM] Input data:",
            componentData
          );
          const transformedMissionData = {
            data: {
              title: componentData.title || "",
              subtitle: componentData.subtitle || "",
              description: componentData.description || "",
              vision: componentData.vision || "",
              additionalContent: componentData.additionalContent || "",
              image: componentData.image || "",
              stats: Array.isArray(componentData.stats)
                ? componentData.stats
                : [],
              missionPoints: Array.isArray(componentData.missionPoints)
                ? componentData.missionPoints
                : [],
            },
          };
          console.log(
            "✅ [AboutMissionSection TRANSFORM] Output data:",
            transformedMissionData
          );
          return transformedMissionData;
        }

        case "AboutTeamSection": {
          console.log(
            "🎯 [AboutTeamSection TRANSFORM] Input data:",
            componentData
          );
          const transformedTeamData = {
            teamMembers: componentData.members || [],
            data: {
              title: componentData.title || "Meet Our Team",
              description:
                componentData.description ||
                "Our diverse team of experts brings together decades of experience in enterprise software, business consulting, and digital transformation.",
            },
          };
          console.log(
            "✅ [AboutTeamSection TRANSFORM] Output data:",
            transformedTeamData
          );
          return transformedTeamData;
        }

        case "AboutValuesSection": {
          console.log(
            "🎯 [AboutValuesSection TRANSFORM] Input data:",
            componentData
          );
          const transformedValuesData = {
            values: componentData.items || [],
            data: {
              title: componentData.title || "Our Values",
              description:
                componentData.description ||
                "These core values guide everything we do and shape how we interact with our clients, partners, and each other.",
            },
          };
          console.log(
            "✅ [AboutValuesSection TRANSFORM] Output data:",
            transformedValuesData
          );
          return transformedValuesData;
        }

        case "AboutJourneySection": {
          console.log(
            "🎯 [AboutJourneySection TRANSFORM] Input data:",
            componentData
          );
          const transformedJourneyData = {
            data: {
              beginningTitle: componentData.beginningTitle || "The Beginning",
              beginningText:
                componentData.beginningText ||
                "Founded in 2008 with a vision to bridge the gap between complex enterprise software and real business needs. Our founders recognized that many businesses were struggling to fully leverage their technology investments.",
              growthTitle: componentData.growthTitle || "Growth & Evolution",
              growthText:
                componentData.growthText ||
                "Over the years, we've evolved from a small consulting firm to a comprehensive digital transformation partner, helping hundreds of organizations across various industries unlock their full potential.",
              todayTitle: componentData.todayTitle || "Today",
              todayText:
                componentData.todayText ||
                "We continue to innovate and expand our services, staying at the forefront of technology trends while maintaining our core values of excellence and integrity.",
              imageUrl: componentData.imageUrl || "/images/solution.jpg",
            },
          };
          console.log(
            "✅ [AboutJourneySection TRANSFORM] Output data:",
            transformedJourneyData
          );
          return transformedJourneyData;
        }

        case "AboutMilestonesSection": {
          console.log(
            "🎯 [AboutMilestonesSection TRANSFORM] Input data:",
            componentData
          );
          const transformedMilestonesData = {
            milestones: componentData.items || [],
            data: {
              title: componentData.title || "Our Milestones",
              description:
                componentData.description ||
                "Key achievements and milestones that mark our journey of growth, innovation, and commitment to excellence.",
            },
          };
          console.log(
            "✅ [AboutMilestonesSection TRANSFORM] Output data:",
            transformedMilestonesData
          );
          return transformedMilestonesData;
        }

        case "AboutDifferentiatorsSection": {
          console.log(
            "🎯 [AboutDifferentiatorsSection TRANSFORM] Input data:",
            componentData
          );
          const transformedDifferentiatorsData = {
            differentiators: componentData.items || [],
            data: {
              title: componentData.title || "What Sets Us Apart",
              description:
                componentData.description ||
                "Our unique combination of expertise, methodology, and commitment to excellence makes us the preferred choice for Oracle NetSuite implementations.",
            },
          };
          console.log(
            "✅ [AboutDifferentiatorsSection TRANSFORM] Output data:",
            transformedDifferentiatorsData
          );
          return transformedDifferentiatorsData;
        }

        case "AboutCTASection": {
          console.log(
            "🎯 [AboutCTASection TRANSFORM] Input data:",
            componentData
          );
          const transformedCTAData = {
            title: componentData.title || "Ready to Build Something Great?",
            subtitle:
              componentData.subtitle ||
              "Let's collaborate to transform your business with innovative Oracle NetSuite solutions that drive growth, efficiency, and success.",
            description:
              componentData.description ||
              "Contact us today to discuss how we can help you optimize your operations and drive growth.",
            ctaButton: componentData.ctaButton || {
              text: "Start Consultation",
              link: "/contact",
              variant: "primary",
            },
            features: componentData.features || [
              {
                title: "Quick Start",
                description: "Get started our consultation",
              },
              {
                title: "Expert Team",
                description: "Work with certified professionals",
              },
              {
                title: "Proven Results",
                description: "Join our success stories",
              },
            ],
            onOpenContactModal: () => console.log("Contact modal opened"),
          };
          console.log(
            "✅ [AboutCTASection TRANSFORM] Output data:",
            transformedCTAData
          );
          return transformedCTAData;
        }

        // General Components
        case "PayrollHeroSection": {
          console.log(
            "🎯 [PayrollHeroSection TRANSFORM] Input data:",
            componentData
          );
          const transformedPayrollHeroData = {
            title: componentData.title || "Transform Your Payroll Process",
            subtitle:
              componentData.subtitle ||
              "Streamline operations with our intelligent, automated payroll system",
            description: componentData.description || "",
            ctaButton: componentData.ctaButton || {
              text: "Get Started",
              link: "/contact",
            },
            backgroundImage:
              componentData.backgroundImage || "/images/payrollFinal.jpeg",
            bgColor: componentData.bgColor || "",
            bgVideo: componentData.bgVideo || "",
            data: componentData,
          };
          console.log(
            "✅ [PayrollHeroSection TRANSFORM] Output data:",
            transformedPayrollHeroData
          );
          return transformedPayrollHeroData;
        }

        case "HRHeroSection": {
          console.log(
            "🎯 [HRHeroSection TRANSFORM] Input data:",
            componentData
          );
          const transformedHRHeroData = {
            data: {
              hero: {
                title:
                  componentData.title ||
                  "Modern HR, Payroll & People Management",
                subtitle:
                  componentData.subtitle ||
                  "Automate HR, empower employees, and stay compliant—on one secure platform designed for the future of work.",
                bgVideo: componentData.bgVideo || "/Videos/hrVideo.mp4",
                bgColor:
                  componentData.bgColor ||
                  "bg-gradient-to-br from-[#191970] via-black to-blue-700",
              },
            },
          };
          console.log(
            "✅ [HRHeroSection TRANSFORM] Output data:",
            transformedHRHeroData
          );
          return transformedHRHeroData;
        }

        case "PayrollWorkflowSection": {
          console.log(
            "🎯 [PayrollWorkflowSection TRANSFORM] Input data:",
            componentData
          );
          const transformedPayrollWorkflowData = {
            workflowData: {
              title:
                componentData.title ||
                "Payroll System Built for All Industries",
              description:
                componentData.description ||
                "Streamline your entire payroll lifecycle — from onboarding to salary disbursement — with a secure, intuitive platform.",
              steps: componentData.steps || [],
            },
          };
          console.log(
            "✅ [PayrollWorkflowSection TRANSFORM] Output data:",
            transformedPayrollWorkflowData
          );
          return transformedPayrollWorkflowData;
        }

        case "PayrollStepperSection": {
          console.log(
            "🎯 [PayrollStepperSection TRANSFORM] Input data:",
            componentData
          );
          const transformedPayrollStepperData = {
            steps: componentData.steps || [],
            title: componentData.title || "Payroll Process Steps",
          };
          console.log(
            "✅ [PayrollStepperSection TRANSFORM] Output data:",
            transformedPayrollStepperData
          );
          return transformedPayrollStepperData;
        }

        case "PayrollPainPointsSection": {
          {
            console.log(
              "🎯 [PayrollPainPointsSection TRANSFORM] Input data:",
              componentData
            );
            const painPoints = Array.isArray(componentData.painPoints)
              ? componentData.painPoints.map((item) => ({
                  ...item,
                  title: item.title || item["Pain Point Title"] || "",
                  description:
                    item.description || item["Pain Point Description"] || "",
                }))
              : [];
            const transformedPayrollPainPointsData = {
              title:
                componentData.title ||
                'The Payroll <span class="text-[var(--color-primary)]">Struggles</span> We Eliminate',
              description:
                componentData.description ||
                "Our system addresses the most common payroll challenges faced by consultancy firms:",
              painPoints,
            };
            console.log(
              "✅ [PayrollPainPointsSection TRANSFORM] Output data:",
              transformedPayrollPainPointsData
            );
            return transformedPayrollPainPointsData;
          }
        }

        case "PayrollFAQSection": {
          {
            console.log(
              "🎯 [PayrollFAQSection TRANSFORM] Input data:",
              componentData
            );
            const transformedPayrollFAQData = {
              faqData: {
                title: componentData.title || "Frequently Asked Questions",
                items: componentData.items || [],
              },
            };
            console.log(
              "✅ [PayrollFAQSection TRANSFORM] Output data:",
              transformedPayrollFAQData
            );
            return transformedPayrollFAQData;
          }
        }

        case "PayrollCTASection": {
          {
            console.log(
              "🎯 [PayrollCTASection TRANSFORM] Input data:",
              componentData
            );
            const transformedPayrollCTAData = {
              title: componentData.title || "Ready to Transform Your Payroll?",
              subtitle:
                componentData.subtitle || "Let's discuss your payroll needs",
              ctaButton: componentData.ctaButton || {
                text: "Get Started",
                link: "/contact",
              },
            };
            console.log(
              "✅ [PayrollCTASection TRANSFORM] Output data:",
              transformedPayrollCTAData
            );
            return transformedPayrollCTAData;
          }
        }

        case "HRModulesSection": {
          console.log(
            "🎯 [HRModulesSection TRANSFORM] Input data:",
            componentData
          );
          // Ensure all fields are passed and use correct keys
          const transformedHRModulesData = {
            data: {
              title: componentData.title || "Product Modules",
              description: componentData.description || "",
              modules: Array.isArray(componentData.modules)
                ? componentData.modules.map((mod) => ({
                    ...mod,
                    description:
                      mod.description || mod.desc || "Module description",
                  }))
                : [],
            },
          };
          console.log(
            "✅ [HRModulesSection TRANSFORM] Output data:",
            transformedHRModulesData
          );
          return transformedHRModulesData;
        }

        case "HRBenefitsSection": {
          console.log(
            "🎯 [HRBenefitsSection TRANSFORM] Input data:",
            componentData
          );
          const transformedHRBenefitsData = {
            data: {
              features: {
                title: componentData.title || "Why Choose Our HR Solution?",
                description:
                  componentData.description ||
                  "Discover the key advantages that make our HR platform the smart choice for modern businesses of all sizes and industries.",
                items: componentData.features ||
                  componentData.items || [
                    {
                      title: "Automated Workflows",
                      description:
                        "Streamline HR processes with intelligent automation",
                      icon: "⚙️",
                    },
                    {
                      title: "Employee Self-Service",
                      description:
                        "Empower employees with self-service capabilities",
                      icon: "👤",
                    },
                    {
                      title: "Compliance Management",
                      description:
                        "Stay compliant with automated reporting and tracking",
                      icon: "📋",
                    },
                  ],
              },
            },
          };
          console.log(
            "✅ [HRBenefitsSection TRANSFORM] Output data:",
            transformedHRBenefitsData
          );
          return transformedHRBenefitsData;
        }

        case "HRUseCasesSection": {
          console.log(
            "🎯 [HRUseCasesSection TRANSFORM] Input data:",
            componentData
          );
          // Ensure all fields are passed and use correct keys
          const transformedHRUseCasesData = {
            data: {
              title: componentData.title || "Who Is It For?",
              description: componentData.description || "",
              useCases: Array.isArray(componentData.useCases)
                ? componentData.useCases.map((uc) => ({
                    ...uc,
                    description:
                      uc.description || uc.desc || "Use case description",
                  }))
                : [],
            },
          };
          console.log(
            "✅ [HRUseCasesSection TRANSFORM] Output data:",
            transformedHRUseCasesData
          );
          return transformedHRUseCasesData;
        }

        case "HRPricingSection": {
          console.log(
            "🎯 [HRPricingSection TRANSFORM] Input data:",
            componentData
          );
          const transformedHRPricingData = {
            data: {
              pricing: componentData.pricing || [
                {
                  name: "Basic Plan",
                  price: "$99",
                  period: "per month",
                  description: "Perfect for small businesses",
                  features: [
                    "Employee Management",
                    "Basic Payroll",
                    "Time Tracking",
                    "Benefits Administration",
                  ],
                  isPopular: false,
                },
                {
                  name: "Professional Plan",
                  price: "$199",
                  period: "per month",
                  description: "Ideal for growing companies",
                  features: [
                    "Everything in Basic",
                    "Advanced Analytics",
                    "Performance Management",
                    "Advanced Reporting",
                    "Integration Support",
                  ],
                  isPopular: true,
                },
              ],
            },
          };
          console.log(
            "✅ [HRPricingSection TRANSFORM] Output data:",
            transformedHRPricingData
          );
          return transformedHRPricingData;
        }

        case "HRFAQSection": {
          console.log("🎯 [HRFAQSection TRANSFORM] Input data:", componentData);
          let items = [];
          if (
            Array.isArray(componentData.faqItems) &&
            componentData.faqItems.length > 0
          ) {
            items = componentData.faqItems.map((f) => ({
              q: f.q || f.question || "",
              a: f.a || f.answer || "",
            }));
          } else if (
            Array.isArray(componentData.faq?.items) &&
            componentData.faq.items.length > 0
          ) {
            items = componentData.faq.items.map((f) => ({
              q: f.q || f.question || "",
              a: f.a || f.answer || "",
            }));
          } else {
            items = [
              {
                q: "What HR modules are included?",
                a:
                  "Our HR solution includes employee management, payroll processing, benefits administration, and performance tracking modules.",
              },
              {
                q: "How long does implementation take?",
                a:
                  "Typical implementation takes 4-8 weeks depending on your organization size and requirements.",
              },
              {
                q: "Is training provided?",
                a:
                  "Yes, we provide comprehensive training for all users including administrators and end-users.",
              },
            ];
          }
          const transformedHRFAQData = {
            data: {
              faq: {
                items,
                title:
                  componentData.title ||
                  componentData.faq?.title ||
                  "Frequently Asked Questions",
              },
              faqItems: items,
              title:
                componentData.title ||
                componentData.faq?.title ||
                "Frequently Asked Questions",
            },
          };
          console.log(
            "✅ [HRFAQSection TRANSFORM] Output data:",
            transformedHRFAQData
          );
          return transformedHRFAQData;
        }

        case "HRCTASection": {
          console.log("🎯 [HRCTASection TRANSFORM] Input data:", componentData);
          const transformedHRCTAData = {
            title: componentData.title || "Ready to Transform Your HR?",
            subtitle: componentData.subtitle || "Let's discuss your HR needs",
            ctaButton: componentData.ctaButton || {
              text: "Get Started",
              link: "/contact",
            },
          };
          console.log(
            "✅ [HRCTASection TRANSFORM] Output data:",
            transformedHRCTAData
          );
          return transformedHRCTAData;
        }

        // Landing Page Components
        case "HeroSection": {
          console.log("🎯 [HeroSection TRANSFORM] Input data:", componentData);
          const transformedHeroData = {
            slides: componentData.slides || [],
            stats: componentData.stats || [],
            data: componentData,
          };
          console.log(
            "✅ [HeroSection TRANSFORM] Output data:",
            transformedHeroData
          );
          return transformedHeroData;
        }

        case "RetailIndustryStats": {
          console.log(
            "🎯 [RetailIndustryStats TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            stats: componentData.stats || componentData.items || [],
            title: componentData.title || "Retail Industry Statistics",
            subtitle: componentData.subtitle || "Key retail metrics",
            description:
              componentData.description ||
              "Key metrics that demonstrate our retail excellence and industry leadership",
          };
          console.log(
            "✅ [RetailIndustryStats TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "ServicesSection": {
          console.log(
            "🎯 [ServicesSection TRANSFORM] Input data:",
            componentData
          );
          const transformedServicesData = {
            services: componentData.services || [],
            sectionHeader: componentData.sectionHeader || {},
            viewAllButton: componentData.viewAllButton || {},
            data: componentData,
          };
          console.log(
            "✅ [ServicesSection TRANSFORM] Output data:",
            transformedServicesData
          );
          return transformedServicesData;
        }

        case "TestimonialsSection": {
          console.log(
            "🎯 [TestimonialsSection TRANSFORM] Input data:",
            componentData
          );
          const transformedTestimonialsData = {
            testimonials: componentData.testimonials || [],
            sectionHeader: componentData.sectionHeader || {},
            data: componentData,
          };
          console.log(
            "✅ [TestimonialsSection TRANSFORM] Output data:",
            transformedTestimonialsData
          );
          return transformedTestimonialsData;
        }

        case "IndustriesSection": {
          console.log(
            "🎯 [IndustriesSection TRANSFORM] Input data:",
            componentData
          );
          const transformedIndustriesData = {
            industries: componentData.industries || [],
            sectionHeader: componentData.sectionHeader || {},
            data: componentData,
          };
          console.log(
            "✅ [IndustriesSection TRANSFORM] Output data:",
            transformedIndustriesData
          );
          return transformedIndustriesData;
        }

        // Services Components
        case "ImplementationHeroSection": {
          console.log(
            "🎯 [ImplementationHeroSection TRANSFORM] Input data:",
            componentData
          );
          const transformedImplementationHeroData = {
            data: componentData || {},
          };
          console.log(
            "✅ [ImplementationHeroSection TRANSFORM] Output data:",
            transformedImplementationHeroData
          );
          return transformedImplementationHeroData;
        }

        case "TrainingHeroSection": {
          console.log(
            "🎯 [TrainingHeroSection TRANSFORM] Input data:",
            componentData
          );
          const transformedTrainingHeroData = {
            heroContent: componentData.heroContent || {
              title: "Transform Your Career with Oracle NetSuite Training",
              subtitle: "Professional ERP Education & Skills Development",
              description:
                "Master Oracle NetSuite with comprehensive training programs designed for professionals at all levels.",
            },
            backgroundVideo:
              componentData.backgroundVideo || "/Videos/training-hero.mp4",
            ctaButton: componentData.ctaButton || {
              text: "Start Learning",
              variant: "primary",
            },
            data: componentData,
          };
          console.log(
            "✅ [TrainingHeroSection TRANSFORM] Output data:",
            transformedTrainingHeroData
          );
          return transformedTrainingHeroData;
        }

        // Industries Components
        case "ManufacturingHeroSection": {
          console.log(
            "🎯 [ManufacturingHeroSection TRANSFORM] Input data:",
            componentData
          );
          const transformedManufacturingHeroData = {
            title: componentData.title || "Manufacturing Solutions",
            subtitle:
              componentData.subtitle ||
              "Streamline your manufacturing operations",
            description:
              componentData.description ||
              "Comprehensive NetSuite solutions for manufacturing businesses",
            backgroundImage:
              componentData.backgroundImage || "/images/manufacturing-hero.jpg",
            backgroundVideo: componentData.backgroundVideo || "",
            ctaButton: componentData.ctaButton || {
              text: "Learn More",
              link: "/manufacturing",
              variant: "primary",
            },
            data: componentData,
          };
          console.log(
            "✅ [ManufacturingHeroSection TRANSFORM] Output data:",
            transformedManufacturingHeroData
          );
          return transformedManufacturingHeroData;
        }

        case "RetailHeroSection": {
          console.log(
            "🎯 [RetailHeroSection TRANSFORM] Input data:",
            componentData
          );
          const transformedRetailHeroData = {
            data: componentData || {
              title: "Retail Solutions",
              subtitle: "Transform your retail operations",
              description:
                "Comprehensive NetSuite solutions for retail businesses",
            },
          };
          console.log(
            "✅ [RetailHeroSection TRANSFORM] Output data:",
            transformedRetailHeroData
          );
          return transformedRetailHeroData;
        }

        // Implementation Service Components
        case "ImplementationProcessSection": {
          console.log(
            "🎯 [ImplementationProcessSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            data: {
              title: componentData.title || "Implementation Process",
              subtitle:
                componentData.subtitle ||
                "A proven methodology for seamless business transformation",
              image:
                componentData.image ||
                "/Videos/implementation/implementProcess.jpg",
              steps: componentData.steps || [],
              ctaButton: componentData.ctaButton || "Start Your Journey",
            },
          };
          console.log(
            "✅ [ImplementationProcessSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "ImplementationWhyChooseSection": {
          console.log(
            "🎯 [ImplementationWhyChooseSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            data: {
              benefits: componentData.benefits || [],
              title: componentData.title || "Why Choose Our Implementation",
              description:
                componentData.description || "Benefits of our services",
            },
          };
          console.log(
            "✅ [ImplementationWhyChooseSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "ImplementationPricingSection": {
          console.log(
            "🎯 [ImplementationPricingSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            data: {
              title: componentData.title || "Implementation Pricing",
              plans: componentData.plans || [],
            },
          };
          console.log(
            "✅ [ImplementationPricingSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "ImplementationCtaSection": {
          console.log(
            "🎯 [ImplementationCtaSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            data: {
              title: componentData.title || "Ready to Start Implementation?",
              subtitle: componentData.subtitle || "Let's discuss your needs",
              ctaButton: componentData.ctaButton || {
                text: "Get Started",
                link: "/contact",
              },
            },
          };
          console.log(
            "✅ [ImplementationCtaSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        // Manufacturing Industry Components
        case "ManufacturingSolutionsSection": {
          console.log(
            "🎯 [ManufacturingSolutionsSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            title: componentData.title || "NetSuite Manufacturing Solutions",
            subtitle: componentData.subtitle || "Comprehensive ERP solutions for manufacturers",
            description: componentData.description || "Our NetSuite solutions are specifically designed to address manufacturing challenges and streamline your operations.",
            solutions: componentData.solutions || componentData.items || [
                {
                  title: "Production Management",
                  description: "End-to-end production planning and execution",
                  features: ["Work orders", "Routing", "Capacity planning"],
                  benefits: "40% improvement in production efficiency",
                },
                {
                  title: "Inventory Control",
                  description: "Advanced inventory management capabilities",
                features: ["Multi-location", "Serial tracking", "Cycle counting"],
                benefits: "30% reduction in inventory costs",
              },
              {
                title: "Quality Assurance",
                description: "Comprehensive quality control systems",
                features: ["Quality gates", "Defect tracking", "Compliance reporting"],
                benefits: "99.5% quality achievement rate",
              },
            ],
          };
          console.log(
            "✅ [ManufacturingSolutionsSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "ManufacturingChallengesSection": {
          console.log(
            "🎯 [ManufacturingChallengesSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            challenges: componentData.challenges ||
              componentData.items || [
                {
                  title: "Complex Production Planning",
                  description:
                    "Difficulty in coordinating multiple production lines and resources",
                  icon: "📊",
                },
                {
                  title: "Inventory Management",
                  description:
                    "Challenges in tracking inventory across multiple locations",
                  icon: "📦",
                },
              ],
            title: componentData.title || "Manufacturing Challenges",
            subtitle: componentData.subtitle || "Common pain points we solve",
          };
          console.log(
            "✅ [ManufacturingChallengesSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "ManufacturingIndustryStats": {
          console.log(
            "🎯 [ManufacturingIndustryStats TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            stats: componentData.stats ||
              componentData.items || [
                {
                  value: "85%",
                  label: "Efficiency Improvement",
                  description: "Average efficiency gain",
                },
                {
                  value: "60%",
                  label: "Cost Reduction",
                  description: "Operational cost savings",
                },
                {
                  value: "90%",
                  label: "Accuracy Rate",
                  description: "Data accuracy improvement",
                },
              ],
            title: componentData.title || "Manufacturing Industry Statistics",
            subtitle: componentData.subtitle || "Key industry metrics",
          };
          console.log(
            "✅ [ManufacturingIndustryStats TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "ManufacturingImplementationProcess": {
          console.log(
            "🎯 [ManufacturingImplementationProcess TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            processSteps: componentData.processSteps ||
              componentData.steps ||
              componentData.items || [
                {
                  title: "Analysis",
                  description: "Analyze current processes",
                  step: "01",
                },
                {
                  title: "Design",
                  description: "Design new processes",
                  step: "02",
                },
                {
                  title: "Implementation",
                  description: "Implement new processes",
                  step: "03",
                },
                { title: "Training", description: "Train users", step: "04" },
              ],
            title: componentData.title || "Implementation Process",
            description: componentData.description || "Our proven methodology",
          };
          console.log(
            "✅ [ManufacturingImplementationProcess TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "ManufacturingCaseStudies": {
          console.log(
            "🎯 [ManufacturingCaseStudies TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            data: {
              items: componentData.items || componentData.caseStudies || [
                {
                  title: "Automotive Parts Manufacturer",
                  company: "ABC Motors",
                  industry: "Automotive",
                  challenge: "Complex multi-location inventory management",
                  solution: "NetSuite Advanced Manufacturing with WMS",
                  results: "40% reduction in inventory carrying costs",
                  timeline: "6 months",
                  image: "/images/case-study-1.jpg",
                },
                {
                  title: "Electronics Manufacturer",
                  company: "TechCorp",
                  industry: "Electronics",
                  challenge: "Manual production planning and scheduling",
                  solution: "NetSuite Manufacturing Edition with custom workflows",
                  results: "60% improvement in on-time delivery",
                  timeline: "4 months",
                  image: "/images/case-study-2.jpg",
                },
                {
                  title: "Food & Beverage Producer",
                  company: "FreshFoods Inc",
                  industry: "Food & Beverage",
                  challenge: "Quality control and compliance tracking",
                  solution: "NetSuite Quality Management Suite",
                  results: "99.5% quality achievement rate",
                  timeline: "3 months",
                  image: "/images/case-study-3.jpg",
                },
              ],
              title: componentData.title || "Manufacturing Success Stories",
              description: componentData.description || "See how we've helped manufacturing companies transform their operations with NetSuite solutions.",
            },
          };
          console.log(
            "✅ [ManufacturingCaseStudies TRANSFORM] Output data:",
            transformedData
          );
          console.log(
            "🔍 [ManufacturingCaseStudies DEBUG] Title/Description:",
            {
              inputTitle: componentData.title,
              inputDescription: componentData.description,
              outputTitle: transformedData.data.title,
              outputDescription: transformedData.data.description,
            }
          );
          return transformedData;
        }

        case "ManufacturingCTASection": {
          console.log(
            "🎯 [ManufacturingCTASection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            title: componentData.title || "Ready to Transform Your Manufacturing Operations?",
            subtitle: componentData.subtitle || "Get started with our manufacturing experts",
            description: componentData.description || "Contact our manufacturing specialists to learn how NetSuite can optimize your operations",
            ctaButton: componentData.ctaButton || {
              text: "Get Started",
              link: "/contact",
              variant: "primary",
            },
            features: componentData.features || [
              {
                icon: "💡",
                title: "Free Assessment",
                description: "Comprehensive evaluation of your manufacturing processes",
              },
              {
                icon: "⚡",
                title: "Rapid Implementation",
                description: "Get up and running faster with our proven methodology",
              },
              {
                icon: "🛠️",
                title: "Ongoing Support",
                description: "Continuous optimization and support for your success",
              },
            ],
            trustedBy: componentData.trustedBy || ["Fortune 500 Manufacturers", "SMEs", "Startups"],
          };
          console.log(
            "✅ [ManufacturingCTASection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "RetailSolutionsSection": {
          console.log(
            "🎯 [RetailSolutionsSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            data: {
              netSuiteSolutions: componentData.solutions ||
                componentData.items || [
                  {
                    title: "E-commerce Platform",
                    description:
                      "Complete e-commerce solution with NetSuite integration",
                    features: [
                      "Online store",
                      "Payment processing",
                      "Order management",
                    ],
                    benefits: "50% increase in online sales",
                  },
                  {
                    title: "Inventory Management",
                    description: "Advanced inventory control and tracking",
                    features: [
                      "Real-time tracking",
                      "Multi-location",
                      "Automated reordering",
                    ],
                    benefits: "30% reduction in stockouts",
                  },
                ],
            },
            activeSolution: 0,
            setActiveSolution: () => {},
          };
          console.log(
            "✅ [RetailSolutionsSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "RetailChallengesSection": {
          console.log(
            "🎯 [RetailChallengesSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            challenges: componentData.challenges || componentData.items || [],
            title: componentData.title || "Retail Challenges",
            subtitle: componentData.subtitle || "Common pain points we solve",
          };
          console.log(
            "✅ [RetailChallengesSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "RetailFeaturesSection": {
          console.log(
            "🎯 [RetailFeaturesSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            data: {
              retailFeatures: componentData.features || componentData.items || [
                {
                  title: "Point of Sale",
                  description: "Modern POS system with offline capability",
                  icon: "💳",
                },
                {
                  title: "E-commerce Integration",
                  description: "Seamless online and offline experience",
                  icon: "🛒",
                },
                {
                  title: "Inventory Management",
                  description: "Real-time inventory tracking across channels",
                  icon: "📦",
                },
                {
                  title: "Customer Analytics",
                  description: "Advanced customer insights and behavior analysis",
                  icon: "📊",
                },
                {
                  title: "Omnichannel Support",
                  description: "Unified experience across all touchpoints",
                  icon: "🔄",
                },
                {
                  title: "Mobile Commerce",
                  description: "Mobile-optimized shopping experience",
                  icon: "📱",
                },
              ],
            },
            title: componentData.title || "Retail Features",
            description:
              componentData.description ||
              "Key features of our retail solution",
          };
          console.log(
            "✅ [RetailFeaturesSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "RetailCaseStudies": {
          console.log(
            "🎯 [RetailCaseStudies TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            caseStudies: componentData.caseStudies || componentData.items || [],
            title: componentData.title || "Retail Success Stories",
            description:
              componentData.description || "See how we've helped others",
          };
          console.log(
            "✅ [RetailCaseStudies TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "RetailImplementationSection": {
          console.log(
            "🎯 [RetailImplementationSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            steps: componentData.steps || componentData.items || [],
            title: componentData.title || "Implementation Process",
            description: componentData.description || "Our proven methodology",
          };
          console.log(
            "✅ [RetailImplementationSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "RetailCTASection": {
          console.log(
            "🎯 [RetailCTASection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            title: componentData.title || "Ready to Transform Retail?",
            subtitle:
              componentData.subtitle || "Let's discuss your retail needs",
            description:
              componentData.description ||
              "Join hundreds of retail companies that have unified their commerce operations and improved customer experience with NetSuite. Get started with a free consultation today.",
            features: componentData.features || [],
            ctaButton: componentData.ctaButton || {
              text: "Get Started",
              link: "/contact",
            },
          };
          console.log(
            "✅ [RetailCTASection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        // Common/Shared Components
        case "SEO": {
          console.log("🎯 [SEO TRANSFORM] Input data:", componentData);
          const transformedData = {
            title: componentData.title || "Page Title",
            description: componentData.description || "Page description",
            keywords: componentData.keywords || "",
            ogTitle: componentData.ogTitle || componentData.title,
            ogDescription:
              componentData.ogDescription || componentData.description,
            ogImage: componentData.ogImage || "",
            twitterCard: componentData.twitterCard || "summary",
            canonicalUrl: componentData.canonicalUrl || "",
          };
          console.log("✅ [SEO TRANSFORM] Output data:", transformedData);
          return transformedData;
        }

        case "CTAButton": {
          console.log("🎯 [CTAButton TRANSFORM] Input data:", componentData);
          const transformedData = {
            text: componentData.text || "Click Here",
            variant: componentData.variant || "primary",
            icon: componentData.icon || "",
            onClick: componentData.onClick || (() => {}),
          };
          console.log("✅ [CTAButton TRANSFORM] Output data:", transformedData);
          return transformedData;
        }

        case "ServiceGrid": {
          console.log("🎯 [ServiceGrid TRANSFORM] Input data:", componentData);
          const transformedData = {
            data: {
              services: componentData.services || [
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
          };
          console.log(
            "✅ [ServiceGrid TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "ImplementationCTASection": {
          console.log(
            "🎯 [ImplementationCTASection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            cta: componentData.cta || {
              title: "Ready to Transform Your Business?",
              subtitle:
                "Get started with our comprehensive NetSuite implementation services today.",
              buttonText: "Start Your Implementation",
              buttonLink: "/contact",
            },
          };
          console.log(
            "✅ [ImplementationCTASection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "CustomizationHeroSection": {
          console.log(
            "🎯 [CustomizationHeroSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            hero: componentData.hero || {
              title: "NetSuite Customization Services",
              subtitle: "Tailored Solutions for Your Business",
              description:
                "Transform your NetSuite system with custom solutions designed specifically for your unique business requirements.",
            },
            services: componentData.services || {
              title: "Our Customization Services",
              items: [
                {
                  title: "Custom Fields & Forms",
                  description:
                    "Create custom fields and forms to capture your specific business data.",
                  icon: "📝",
                },
                {
                  title: "Custom Scripts",
                  description:
                    "Develop custom scripts to automate your business processes.",
                  icon: "⚙️",
                },
                {
                  title: "Custom Workflows",
                  description:
                    "Design custom workflows to streamline your operations.",
                  icon: "🔄",
                },
              ],
            },
          };
          console.log(
            "✅ [CustomizationHeroSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "TrainingProgramsSection": {
          console.log(
            "🎯 [TrainingProgramsSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            programsSection: componentData.programsSection || {
              title: "Training Programs",
              description: "Comprehensive training programs designed to enhance your skills and knowledge.",
              image: "/images/traning.jpg",
            },
            trainingPrograms: componentData.trainingPrograms || {
              programs: componentData.programs || [
                {
                  id: 1,
                  title: "Basic User Training",
                  description: "Learn the fundamentals of NetSuite",
                  duration: "2 days",
                  level: "Beginner",
                },
                {
                  id: 2,
                  title: "Advanced Configuration",
                  description: "Master advanced NetSuite configuration",
                  duration: "3 days",
                  level: "Advanced",
                },
                {
                  id: 3,
                  title: "Customization & Scripting",
                  description: "Learn NetSuite customization and scripting",
                  duration: "4 days",
                  level: "Expert",
                },
                {
                  id: 4,
                  title: "Integration Training",
                  description: "Master NetSuite integrations",
                  duration: "3 days",
                  level: "Advanced",
                },
              ],
            },
            data: componentData,
          };
          console.log(
            "✅ [TrainingProgramsSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "TrainingKeyModulesSection": {
          console.log(
            "🎯 [TrainingKeyModulesSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            keyModulesSection: componentData.keyModulesSection || {
              title: "Key Training Modules",
              subtitle: "Master essential NetSuite concepts and features",
            },
            keyModules: componentData.keyModules || [],
            data: componentData,
          };
          console.log(
            "✅ [TrainingKeyModulesSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "TrainingWhyChooseSection": {
          console.log(
            "🎯 [TrainingWhyChooseSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            whyChooseSection: componentData.whyChooseSection || {
              title: "Why Choose Our Training",
              subtitle: "Expert-led programs with proven results",
            },
            trainingFeatures: componentData.trainingFeatures || [],
            data: componentData,
          };
          console.log(
            "✅ [TrainingWhyChooseSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "IntegrationTypesSection": {
          console.log(
            "🎯 [IntegrationTypesSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            title: componentData.title || "Integration Types",
            subtitle:
              componentData.subtitle || "Multiple ways to connect NetSuite",
            items: componentData.items || [],
            data: componentData,
          };
          console.log(
            "✅ [IntegrationTypesSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "IntegrationBenefitsSection": {
          console.log(
            "🎯 [IntegrationBenefitsSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            title: componentData.title || "Integration Benefits",
            subtitle: componentData.subtitle || "Why integrate with NetSuite",
            items: componentData.items || [],
            data: componentData,
          };
          console.log(
            "✅ [IntegrationBenefitsSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "IntegrationPopularSection": {
          console.log(
            "🎯 [IntegrationPopularSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            title: componentData.title || "Popular Integrations",
            subtitle:
              componentData.subtitle || "Connect with leading platforms",
            platforms: componentData.platforms || [],
            data: componentData,
          };
          console.log(
            "✅ [IntegrationPopularSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "IntegrationCtaSection": {
          console.log(
            "🎯 [IntegrationCtaSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            title: componentData.title || "Ready to Integrate?",
            subtitle: componentData.subtitle || "Let's connect your systems",
            buttonText: componentData.buttonText || "Get Started",
            data: componentData,
          };
          console.log(
            "✅ [IntegrationCtaSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "CustomizationServicesSection": {
          console.log(
            "🎯 [CustomizationServicesSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            title: componentData.title || "Our Customization Services",
            subtitle:
              componentData.subtitle || "Tailored solutions for your business",
            items: componentData.items || [],
            data: componentData,
          };
          console.log(
            "✅ [CustomizationServicesSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "CustomizationProcessSection": {
          console.log(
            "🎯 [CustomizationProcessSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            title: componentData.title || "Our Customization Process",
            subtitle:
              componentData.subtitle || "Systematic approach to customization",
            steps: componentData.steps || [],
            data: componentData,
          };
          console.log(
            "✅ [CustomizationProcessSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "CustomizationCtaSection": {
          console.log(
            "🎯 [CustomizationCtaSection TRANSFORM] Input data:",
            componentData
          );
          const transformedData = {
            title: componentData.title || "Ready to Customize?",
            subtitle:
              componentData.subtitle || "Transform your NetSuite experience",
            buttonText: componentData.buttonText || "Start Customization",
            data: componentData,
          };
          console.log(
            "✅ [CustomizationCtaSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

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
          Component type "{componentType}" is not registered in the preview
          system.
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
            filter: isVisible ? "none" : "grayscale(50%)",
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
  className = "",
}) => {
  const [refreshKey, setRefreshKey] = useState(0);

  console.log("🔍 [LIVE PREVIEW] Received components:", {
    count: components.length,
    components: components.map((c) => ({
      type: c.componentType,
      hasContentJson: !!c.contentJson,
      contentJsonLength: c.contentJson?.length || 0,
      isVisible: c.isVisible,
    })),
  });

  // Only reload preview when contentJson (inputs data) changes
  const contentJsonString = useMemo(() => {
    return components.map((comp) => comp.contentJson).join("|");
  }, [components]);

  useEffect(() => {
    // Only reload when contentJson changes (inputs data)
    const timeout = setTimeout(() => {
      setRefreshKey((prev) => prev + 1);
    }, 80);
    return () => clearTimeout(timeout);
  }, [contentJsonString]);

  const previewClasses = {
    desktop: "max-w-none",
    tablet: "max-w-4xl mx-auto",
    mobile: "max-w-sm mx-auto",
  };

  return (
    <Card
      className={`bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl ${className}`}
    >
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
              ({components.length} component{components.length !== 1 ? "s" : ""}
              )
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`bg-white dark:bg-gray-900 rounded-lg min-h-[400px] ${previewClasses[previewMode]}`}
        >
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
                    contentJsonType: typeof component.contentJson,
                    contentJsonLength: component.contentJson?.length || 0,
                  });

                  let rawData = {};

                  // Always use the latest contentJson from form
                  if (component.contentJson) {
                    try {
                      rawData = JSON.parse(component.contentJson);
                      console.log(
                        "✅ [REALTIME EXTRACTION] Parsed content for",
                        component.componentType,
                        ":",
                        rawData
                      );
                    } catch (err) {
                      console.error(
                        "❌ [REALTIME EXTRACTION] JSON parse error:",
                        err
                      );
                      rawData = {};
                    }
                  } else {
                    console.warn(
                      "⚠️ [REALTIME EXTRACTION] No contentJson found for",
                      component.componentType
                    );
                  }

                  // Enhanced debugging for AboutMissionSection
                  if (component.componentType === "AboutMissionSection") {
                    console.log(
                      "🎯 [AboutMissionSection EXTRACTION] Debug data:",
                      {
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
                          hasMissionPoints: Array.isArray(
                            rawData.missionPoints
                          ),
                          missionPointsCount:
                            rawData.missionPoints?.length || 0,
                        },
                        timestamp: new Date().toISOString(),
                      }
                    );
                  }

                  return rawData;
                };

                let componentData = extractComponentData(component);

                // Debug logging for all About components
                if (component.componentType?.includes("About")) {
                  console.log(
                    `👁️ [LIVE PREVIEW] Rendering ${component.componentType}:`,
                    {
                      componentIndex: index,
                      hasContentJson: !!component.contentJson,
                      contentJsonLength: component.contentJson?.length || 0,
                      parsedData: componentData,
                      extractedKeys: Object.keys(componentData),
                      timestamp: new Date().toISOString(),
                    }
                  );
                }

                return (
                  <div
                    key={`${component.id || index}-${
                      component.componentType
                    }-${refreshKey}-${component.contentJson?.slice(0, 50)}`}
                    className="relative"
                  >
                    {showDebugInfo && (
                      <div className="absolute top-2 right-2 z-10 bg-black/70 text-white text-xs p-2 rounded max-w-xs">
                        <div>
                          <strong>Type:</strong> {component.componentType}
                        </div>
                        <div>
                          <strong>Theme:</strong>{" "}
                          {component.theme === 1 ? "Light" : "Dark"}
                        </div>
                        <div>
                          <strong>Visible:</strong>{" "}
                          {component.isVisible ? "Yes" : "No"}
                        </div>
                        <div>
                          <strong>Order:</strong>{" "}
                          {component.orderIndex || index + 1}
                        </div>
                        <div>
                          <strong>Data Keys:</strong>{" "}
                          {Object.keys(componentData).join(", ")}
                        </div>
                      </div>
                    )}

                    <ComponentPreview
                      componentType={component.componentType}
                      componentData={componentData}
                      theme={component.theme}
                      isVisible={component.isVisible}
                      key={`preview-${
                        component.id || index
                      }-${refreshKey}-${JSON.stringify(componentData).slice(
                        0,
                        100
                      )}`}
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
  className = "",
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
