import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { EyeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Card, { CardContent, CardHeader, CardTitle } from "../UI/Card";
import { componentRegistry, getComponentByType } from "../../config/previewComponentRegistry";
import PreviewError from "./LivePreview/PreviewError";
import ComponentNotFound from "./LivePreview/ComponentNotFound";
import ErrorBoundaryWrapper from "./LivePreview/ErrorBoundaryWrapper";

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

  // Transform data to component props format
  // Create a stable JSON snapshot of componentData so nested/mutated fields
  // trigger the useMemo recompute when their values change (not only object ref)
  // Compute a JSON snapshot every render (avoid relying on object identity)
  const componentDataString = (() => {
    try {
      return JSON.stringify(componentData || {});
    } catch {
      return String(componentData);
    }
  })();

  // We intentionally depend on `componentDataString` (a JSON snapshot) in order
  // to detect deep changes; include componentData as well to satisfy hooks linter.
  const transformedProps = useMemo(() => {
    // reference the JSON snapshot so it's treated as a real dependency
    const _componentDataSnapshot = componentDataString;
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
              steps: componentData.steps || [
                {
                  title: "Employee Data Import",
                  stepTitle: "Employee Data Import",
                  description:
                    "Easily onboard and manage employee records in one place.",
                  stepDescription:
                    "Import employee data from spreadsheets or integrated HR systems. Supports bulk uploads and data validation with real-time error checking.",
                  features: [
                    "Bulk import from Excel/CSV",
                    "Data validation",
                    "Duplicate detection",
                    "HR system integration",
                  ],
                  automated: "Reduces manual work by 80%",
                  compliant: "Built-in regulatory compliance",
                },
                {
                  title: "Time & Attendance Sync",
                  stepTitle: "Time & Attendance Sync",
                  description:
                    "Integrate timesheets and attendance for accurate payroll.",
                  stepDescription:
                    "Syncs with your time tracking tools to ensure accurate hours and leave data for every employee. Supports multiple time tracking systems.",
                  features: [
                    "Real-time sync",
                    "Multiple time systems",
                    "Leave management",
                    "Overtime calculation",
                  ],
                  automated: "Automated time tracking integration",
                  compliant: "Accurate compliance reporting",
                },
                {
                  title: "Salary & Tax Calculation",
                  stepTitle: "Salary & Tax Auto-Calculation",
                  description:
                    "Automate salary, tax, and deduction calculations.",
                  stepDescription:
                    "Calculates gross and net pay, taxes, and deductions automatically based on your rules and local compliance. Handles complex tax scenarios.",
                  features: [
                    "Auto tax calculation",
                    "Compliance built-in",
                    "Deduction management",
                    "Bonus processing",
                  ],
                  automated: "100% automated calculations",
                  compliant: "Tax law compliance guaranteed",
                },
                {
                  title: "Approval Workflows",
                  stepTitle: "Approval Workflows",
                  description: "Streamline approvals with role-based access.",
                  stepDescription:
                    "Multi-level approval flows for payroll runs, with notifications and audit trails. Customizable approval hierarchies.",
                  features: [
                    "Multi-level approval",
                    "Email notifications",
                    "Audit trails",
                    "Role-based access",
                  ],
                  automated: "Automated approval routing",
                  compliant: "Complete audit trail",
                },
                {
                  title: "Payment Execution",
                  stepTitle: "Payment Execution",
                  description:
                    "Execute payments securely through integrated bank APIs.",
                  stepDescription:
                    "Initiate salary payments directly from the platform with secure, bank-level integrations. Supports multiple payment methods.",
                  features: [
                    "Bank API integration",
                    "Multiple payment methods",
                    "Secure transactions",
                    "Payment tracking",
                  ],
                  automated: "One-click payment processing",
                  compliant: "Bank-level security compliance",
                },
                {
                  title: "Payslip & Reporting",
                  stepTitle: "Payslip Generation & Reporting",
                  description:
                    "Generate payslips and compliance-ready reports instantly.",
                  stepDescription:
                    "Employees get digital payslips; admins get downloadable, compliance-ready reports. Customizable templates and automated distribution.",
                  features: [
                    "Digital payslips",
                    "Custom templates",
                    "Auto distribution",
                    "Compliance reports",
                  ],
                  automated: "Instant report generation",
                  compliant: "Regulatory compliance ready",
                },
              ],
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
              // The PayrollPainPoints component expects a single `painPoints` prop
              // containing { title, description, painPoints: [...] }
              painPoints: {
                title:
                  componentData.title ||
                  'The Payroll <span class="text-[var(--color-primary)]">Struggles</span> We Eliminate',
                description:
                  componentData.description ||
                  "Our system addresses the most common payroll challenges faced by consultancy firms:",
                painPoints,
              },
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
            // Accept multiple possible shapes saved by the builder:
            // - items: [{ question, answer }]
            // - faqItems: [{ question, answer }]
            // - faq: { items: [...] }
            // Normalize each entry to { question, answer }
            const rawItems =
              componentData.items ||
              componentData.faqItems ||
              (componentData.faq && componentData.faq.items) ||
              [];

            const items = Array.isArray(rawItems)
              ? rawItems.map((it) => ({
                  question:
                    it.question || it.q || it.title || it.questionText || "",
                  answer:
                    it.answer ||
                    it.a ||
                    it.aText ||
                    it.answerText ||
                    it.description ||
                    "",
                }))
              : [];

            const transformedPayrollFAQData = {
              faqData: {
                title:
                  componentData.title ||
                  componentData.faq?.title ||
                  "Frequently Asked Questions",
                items,
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
            // Normalize features into array of strings to avoid runtime errors
            const rawFeatures =
              componentData.features ||
              componentData.items ||
              componentData.data?.features ||
              componentData.data?.items ||
              [];

            const features = Array.isArray(rawFeatures)
              ? rawFeatures.map((f) => {
                  if (typeof f === "string") return f;
                  if (!f) return "";
                  // common object shapes: { title }, { text }, { description }
                  return f.title || f.text || f.description || String(f);
                })
              : typeof rawFeatures === "string"
              ? rawFeatures
                  .split(/[;\n,]+/)
                  .map((s) => s.trim())
                  .filter(Boolean)
              : [];

            const transformedPayrollCTAData = {
              title: componentData.title || "Ready to Transform Your Payroll?",
              subtitle:
                componentData.subtitle || "Let's discuss your payroll needs",
              description: componentData.description || "",
              features:
                features.length > 0
                  ? features
                  : [
                      "No setup fees",
                      "30-day money back guarantee",
                      "24/7 customer support",
                    ],
              trustedBy: componentData.trustedBy || [],
              ctaButton: componentData.ctaButton || {
                text: "Get Started",
                link: "/contact",
              },
              data: componentData,
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
          // Normalize incoming component data: support stringified contentJson, nested data, or direct pricing array
          const effectiveData = (() => {
            try {
              // If the component was saved with a stringified contentJson
              if (
                componentData &&
                typeof componentData.contentJson === "string"
              ) {
                const parsed = JSON.parse(componentData.contentJson || "{}");
                return { ...componentData, ...parsed };
              }

              // If componentData itself is a string (rare), try to parse it
              if (typeof componentData === "string") {
                return JSON.parse(componentData || "{}");
              }

              // If the saved structure wraps real payload under `data` or `pricing`
              if (componentData && componentData.data) {
                return { ...componentData, ...componentData.data };
              }

              return componentData || {};
            } catch (err) {
              console.warn(
                "⚠️ [HRPricingSection] Failed to parse componentData:",
                err,
                componentData
              );
              return componentData || {};
            }
          })();

          const transformedHRPricingData = {
            data: {
              title:
                effectiveData.title ||
                componentData.title ||
                "Implementation Pricing",
              description:
                effectiveData.description ||
                componentData.description ||
                "Choose the perfect implementation plan that fits your business needs and budget",
              pricing: effectiveData.pricing || [
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

        // Support both saved componentType aliases: "TrainingProgramsSection" and "ProgramsSection"
        case "TrainingProgramsSection":
        case "ProgramsSection": {
          console.log(
            "🎯 [TrainingProgramsSection/ProgramsSection TRANSFORM] Input data:",
            componentData
          );

          // Normalize section metadata (programsSection) and the list of programs
          const section =
            componentData.programsSection ||
            componentData.data?.programsSection ||
            componentData.section ||
            {};

          // trainingPrograms may be provided in multiple shapes: { programs: [...] } or an array directly
          const rawPrograms =
            componentData.trainingPrograms?.programs ||
            componentData.trainingPrograms ||
            componentData.programs ||
            componentData.items ||
            [];

          const programs = Array.isArray(rawPrograms)
            ? rawPrograms
            : typeof rawPrograms === "string"
            ? rawPrograms
                .split(/[;\n,]+/)
                .map((s, i) => ({ id: i, title: s.trim() }))
                .filter(Boolean)
            : [];

          const transformedProgramsData = {
            programsSection: {
              title:
                section.title ||
                componentData.title ||
                componentData.data?.title ||
                "Training Programs",
              description:
                section.description ||
                componentData.description ||
                componentData.data?.description ||
                "Comprehensive training programs to upskill your team.",
              image:
                section.image ||
                componentData.image ||
                componentData.data?.image ||
                "/images/traning.jpg",
              Professional_Badge:
                section.Professional_Badge ||
                componentData.Professional_Badge ||
                "Professional",
            },
            trainingPrograms: {
              programs,
            },
            // helper props expected by the component
            openProgramModal:
              componentData.openProgramModal ||
              (() => console.log("Open program modal")),
            renderIcon: componentData.renderIcon || undefined,
          };

          console.log(
            "✅ [TrainingProgramsSection/ProgramsSection TRANSFORM] Output data:",
            transformedProgramsData
          );
          return transformedProgramsData;
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
          // Normalize features/benefits into `data.features` as array of objects
          const rawFeatures =
            componentData.features ||
            componentData.items ||
            componentData.benefits ||
            [];

          const normalizedFeatures = (() => {
            if (Array.isArray(rawFeatures)) {
              return rawFeatures.map((f, idx) => {
                if (!f) return { number: idx + 1, title: "", description: "" };
                if (typeof f === "string") {
                  return { number: idx + 1, title: f, description: "" };
                }
                return {
                  number: f.number || f.id || idx + 1,
                  title: f.title || f.name || f.heading || "",
                  description: f.description || f.desc || f.subtitle || "",
                  icon: f.icon || f.iconName || f.iconClass || undefined,
                };
              });
            }

            if (typeof rawFeatures === "string") {
              return rawFeatures
                .split(/[;,\n]+/)
                .map((s, i) => ({
                  number: i + 1,
                  title: s.trim(),
                  description: "",
                }))
                .filter((x) => x.title);
            }

            return [];
          })();

          const transformedData = {
            data: {
              title:
                componentData.title ||
                componentData.data?.title ||
                "Why Choose Bellatrix for Implementation?",
              subtitle:
                componentData.subtitle ||
                componentData.data?.subtitle ||
                "We bring years of expertise, proven methodologies, and cutting-edge solutions to ensure your implementation success",
              image:
                componentData.image ||
                componentData.data?.image ||
                "/Videos/implementation/whyChoese.jpg",
              features: normalizedFeatures,
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
          // Normalize plans and ensure each plan.features is an array
          const rawPlans = componentData.plans || [];
          const normalizedPlans = Array.isArray(rawPlans)
            ? rawPlans.map((p) => {
                const plan = { ...(p || {}) };
                let features = plan.features;

                // If features is a comma/semicolon/newline separated string, split it
                if (typeof features === "string") {
                  features = features
                    .split(/[;,\n]+/) // split on comma, semicolon, or newline
                    .map((s) => s.trim())
                    .filter(Boolean);
                }

                // Ensure features is an array
                if (!Array.isArray(features)) {
                  features = [];
                }

                return {
                  ...plan,
                  features,
                };
              })
            : [];

          const transformedData = {
            data: {
              title: componentData.title || "Implementation Pricing",
              plans: normalizedPlans,
            },
          };
          console.log(
            "✅ [ImplementationPricingSection TRANSFORM] Output data:",
            transformedData
          );
          return transformedData;
        }

        case "ServiceGrid":
        case "ServiceGridSection": {
          console.log("🎯 [ServiceGrid TRANSFORM] Input data:", componentData);
          // Normalize to { data: { services: [...] , title, subtitle } }
          const services =
            Array.isArray(componentData.services) &&
            componentData.services.length
              ? componentData.services
              : componentData.data?.services || componentData.items || [];

          const normalizedServices = services.map((s) => {
            // If a service features field is a string, split into array
            const featuresRaw = s?.features || s?.items || [];
            let features = featuresRaw;
            if (typeof featuresRaw === "string") {
              features = featuresRaw
                .split(/[;,\n]+/)
                .map((x) => x.trim())
                .filter(Boolean);
            }
            return {
              title: s?.title || s?.name || "Service",
              description: s?.description || s?.desc || "",
              icon: s?.icon || "⚙️",
              features: Array.isArray(features) ? features : [],
            };
          });

          const transformedData = {
            data: {
              services: normalizedServices,
              title:
                componentData.title ||
                componentData.data?.title ||
                "Our Services",
              subtitle:
                componentData.subtitle ||
                componentData.data?.subtitle ||
                "Comprehensive NetSuite solutions to drive your business forward",
            },
          };

          console.log(
            "✅ [ServiceGrid TRANSFORM] Output data:",
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
            subtitle:
              componentData.subtitle ||
              "Comprehensive ERP solutions for manufacturers",
            description:
              componentData.description ||
              "Our NetSuite solutions are specifically designed to address manufacturing challenges and streamline your operations.",
            solutions: componentData.solutions ||
              componentData.items || [
                {
                  title: "Production Management",
                  description: "End-to-end production planning and execution",
                  features: ["Work orders", "Routing", "Capacity planning"],
                  benefits: "40% improvement in production efficiency",
                },
                {
                  title: "Inventory Control",
                  description: "Advanced inventory management capabilities",
                  features: [
                    "Multi-location",
                    "Serial tracking",
                    "Cycle counting",
                  ],
                  benefits: "30% reduction in inventory costs",
                },
                {
                  title: "Quality Assurance",
                  description: "Comprehensive quality control systems",
                  features: [
                    "Quality gates",
                    "Defect tracking",
                    "Compliance reporting",
                  ],
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
              items: componentData.items ||
                componentData.caseStudies || [
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
                    solution:
                      "NetSuite Manufacturing Edition with custom workflows",
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
              description:
                componentData.description ||
                "See how we've helped manufacturing companies transform their operations with NetSuite solutions.",
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
            title:
              componentData.title ||
              "Ready to Transform Your Manufacturing Operations?",
            subtitle:
              componentData.subtitle ||
              "Get started with our manufacturing experts",
            description:
              componentData.description ||
              "Contact our manufacturing specialists to learn how NetSuite can optimize your operations",
            ctaButton: componentData.ctaButton || {
              text: "Get Started",
              link: "/contact",
              variant: "primary",
            },
            features: componentData.features || [
              {
                icon: "💡",
                title: "Free Assessment",
                description:
                  "Comprehensive evaluation of your manufacturing processes",
              },
              {
                icon: "⚡",
                title: "Rapid Implementation",
                description:
                  "Get up and running faster with our proven methodology",
              },
              {
                icon: "🛠️",
                title: "Ongoing Support",
                description:
                  "Continuous optimization and support for your success",
              },
            ],
            trustedBy: componentData.trustedBy || [
              "Fortune 500 Manufacturers",
              "SMEs",
              "Startups",
            ],
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
              retailFeatures: componentData.features ||
                componentData.items || [
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
                    description:
                      "Advanced customer insights and behavior analysis",
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
            data: {
              caseStudies:
                componentData.caseStudies || componentData.items || [],
              title: componentData.title || "Retail Success Stories",
              description:
                componentData.description || "See how we've helped others",
            },
          };
          console.log(
            "✅ [RetailCaseStudies TRANSFORM] Output data:",
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
  }, [componentType, componentDataString, componentData]);

  // Get component from registry with tolerant alias resolution
  const resolveComponentFromRegistry = (type) => {
    // direct match
    if (componentRegistry[type]) return componentRegistry[type];
    // common alias fixes
    const candidates = [];
    // normalize CTA casing differences
    candidates.push(type.replace(/CTA/g, "Cta"));
    candidates.push(type.replace(/Cta/g, "CTA"));
    // strip trailing 'Section'
    candidates.push(type.replace(/Section$/, ""));
    // try singular/plural fallback
    candidates.push(type.replace(/sSection$/, "Section"));
    // lowercase key
    candidates.push(type.charAt(0).toUpperCase() + type.slice(1));

    for (const c of candidates) {
      if (componentRegistry[c]) return componentRegistry[c];
    }
    return null;
  };

  const Component = resolveComponentFromRegistry(componentType);

  // Error boundary wrapper
  // ErrorBoundaryWrapper is now imported from ./LivePreview/ErrorBoundaryWrapper

  if (!Component) {
    return <ComponentNotFound componentType={componentType} />;
  }

  if (error) {
    return <PreviewError error={error} componentType={componentType} />;
  }

  return (
    <div className={`component-preview ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${componentType}-${componentDataString}`}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isVisible ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
          style={{
            filter: isVisible ? "none" : "grayscale(50%)",
          }}
        >
          <ErrorBoundaryWrapper
            componentType={componentType}
            componentData={componentData}
          >
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

  // Filter visible components
  const visibleComponents = components.filter(
    (component) => component.isVisible === true || component.isVisible === 1
  );

  console.log("🔍 [LIVE PREVIEW] Received components:", {
    total: components.length,
    visible: visibleComponents.length,
    hidden: components.length - visibleComponents.length,
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
          {visibleComponents.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="text-center">
                <EyeIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No components to preview</p>
                <p className="text-sm">Add components to see them here</p>
              </div>
            </div>
          ) : (
            <div key={refreshKey} className="space-y-0">
              {visibleComponents.map((component, index) => {
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

                  // Always use the latest content from form.
                  // Accept both stringified JSON (contentJson) and already-parsed objects
                  // Also fall back to `content` field when available.
                  if (component.contentJson) {
                    if (typeof component.contentJson === "string") {
                      try {
                        rawData = JSON.parse(component.contentJson);
                        console.log(
                          "✅ [REALTIME EXTRACTION] Parsed contentJson string for",
                          component.componentType,
                          ":",
                          rawData
                        );
                      } catch (err) {
                        console.error(
                          "❌ [REALTIME EXTRACTION] JSON parse error for contentJson:",
                          err
                        );
                        rawData = {};
                      }
                    } else if (typeof component.contentJson === "object") {
                      // contentJson already parsed by other parts of the app
                      rawData = component.contentJson;
                      console.log(
                        "ℹ️ [REALTIME EXTRACTION] Using parsed contentJson object for",
                        component.componentType,
                        ":",
                        rawData
                      );
                    } else {
                      console.warn(
                        "⚠️ [REALTIME EXTRACTION] Unsupported contentJson type for",
                        component.componentType,
                        typeof component.contentJson
                      );
                    }
                  } else if (component.content) {
                    // Some code paths use `content` instead of contentJson
                    if (typeof component.content === "string") {
                      try {
                        rawData = JSON.parse(component.content);
                        console.log(
                          "✅ [REALTIME EXTRACTION] Parsed content string fallback for",
                          component.componentType,
                          ":",
                          rawData
                        );
                      } catch (err) {
                        console.error(
                          "❌ [REALTIME EXTRACTION] JSON parse error for content fallback:",
                          err
                        );
                        rawData = {};
                      }
                    } else if (typeof component.content === "object") {
                      rawData = component.content;
                      console.log(
                        "ℹ️ [REALTIME EXTRACTION] Using content object fallback for",
                        component.componentType,
                        ":",
                        rawData
                      );
                    }
                  } else {
                    console.warn(
                      "⚠️ [REALTIME EXTRACTION] No contentJson or content found for",
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

                  // Merge top-level component fields (some parts of the app
                  // update fields directly on the component instead of
                  // serializing them into `contentJson`). This ensures the
                  // live preview sees edits whether they're saved to
                  // `contentJson` or to top-level props like `caseStudies`.
                  const mergedData = {
                    ...rawData,
                    // top-level simple fields
                    ...(component.title ? { title: component.title } : {}),
                    ...(component.subtitle
                      ? { subtitle: component.subtitle }
                      : {}),
                    ...(component.description
                      ? { description: component.description }
                      : {}),
                    // common list keys used by case studies / lists
                    ...(component.caseStudies
                      ? { caseStudies: component.caseStudies }
                      : {}),
                    ...(component.items ? { items: component.items } : {}),
                    ...(component.data && typeof component.data === "object"
                      ? component.data
                      : {}),
                  };

                  if (
                    Object.keys(mergedData).length !==
                    Object.keys(rawData).length
                  ) {
                    console.log(
                      "🔁 [REALTIME EXTRACTION] Merged top-level component fields for",
                      component.componentType,
                      {
                        rawKeys: Object.keys(rawData),
                        mergedKeys: Object.keys(mergedData),
                      }
                    );
                  }

                  return mergedData;
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
