import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  Bars3BottomLeftIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import { Input } from "../ui/Input";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import Modal, { ModalFooter } from "../ui/Modal";
import Toast from "../ui/Toast";
import SectionDataEditor from "./SectionDataEditor";
import PagePreview from "./PagePreview";
import MediaInputDetector from "../ui/MediaInputDetector";
import DynamicContentForm from "../ui/DynamicContentForm";
import pagesAPI from "../../lib/pagesAPI";
import api from "../../lib/api";

const EnhancedPageBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Ref to prevent multiple simultaneous API calls
  const isSavingRef = useRef(false);

  // Page data
  const [pageData, setPageData] = useState({
    name: "",
    categoryId: null,
    slug: "",
    metaTitle: "",
    metaDescription: "",
    isHomepage: false,
    isPublished: false,
    components: [],
  });

  // Available components derived dynamically from component registry
  const [availableComponents, setAvailableComponents] = useState([]);

  useEffect(() => {
    // Lazy import to prevent circular deps when builder imports registry that imports components directory
    const loadRegistry = async () => {
      try {
        const { idToPathMap } = await import("../componentMap");
        // Build a generic list using keys; categorize by simple heuristics from path
        const items = Object.keys(idToPathMap).map((componentType) => {
          const path = idToPathMap[componentType];
          let category = "content";
          if (path.startsWith("solution/")) category = "solution";
          else if (path.startsWith("Services/")) category = "services";
          else if (path.startsWith("industries/")) category = "industry";
          else if (path.startsWith("About/")) category = "about";
          return {
            id: componentType,
            name: componentType,
            description: path,
            icon: "📄",
            componentType,
            componentName: componentType,
            category,
          };
        });
        setAvailableComponents(items);
      } catch (e) {
        console.error("Failed to load component registry", e);
      }
    };
    loadRegistry();
  }, []);

  // UI State
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [editingComponent, setEditingComponent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSectionEditor, setShowSectionEditor] = useState(false);
  const [showPagePreview, setShowPagePreview] = useState(false);

  const steps = [
    { id: 1, title: "Category", description: "Choose a category for the page" },
    { id: 2, title: "Page Details", description: "Basic page information" },
    { id: 3, title: "Add Sections", description: "Choose and configure sections" },
    { id: 4, title: "Review & Publish", description: "Final review and publish" },
  ];

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  // Utility function to generate slug from name
  const generateSlugFromName = (name) => {
    if (!name || typeof name !== "string") return "untitled-page";

    let slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    // Remove leading/trailing hyphens
    slug = slug.replace(/^-+|-+$/g, "");

    return slug || "untitled-page";
  };

  // Utility function to apply default values to page data
  const applyDefaultValues = (data, status = "draft") => {
    const defaultName = "Untitled Page";
    const name = data.name?.trim() || defaultName;
    const slug = data.slug?.trim() || generateSlugFromName(name);

    return {
      name: name,
      categoryId: data.categoryId ?? 1,
      slug: slug,
      metaTitle: data.metaTitle?.trim() || "",
      metaDescription: data.metaDescription?.trim() || "",
      isHomepage: data.isHomepage ?? false,
      isPublished: status === "published",
      components:
        data.components?.map((component, index) => {
          // Create the component object with proper content handling
          const processedComponent = {
            componentType: component.componentType || "Generic",
            componentName: component.componentName || "New Component",
            orderIndex: index + 1, // Auto-generate sequentially starting from 1
          };

          // Handle contentJson string conversion for API
          console.log(`🔍 Processing component ${index + 1}:`, {
            componentType: component.componentType,
            originalContentJson: component.contentJson,
            contentJsonType: typeof component.contentJson
          });

          if (
            component.contentJson &&
            typeof component.contentJson === "string"
          ) {
            try {
              // Parse and validate JSON before sending
              const parsedContent = JSON.parse(component.contentJson);
              processedComponent.content = parsedContent;
              console.log(`✅ Successfully parsed contentJson for component ${index + 1}:`, parsedContent);
            } catch (error) {
              console.error(`❌ Invalid JSON in component ${index + 1}:`, error.message);
              // If invalid JSON, create empty object
              processedComponent.content = {};
            }
          } else if (
            component.content &&
            typeof component.content === "object"
          ) {
            processedComponent.content = component.content;
            console.log(`📋 Using existing content object for component ${index + 1}:`, component.content);
          } else {
            processedComponent.content = {};
            console.log(`🆕 Creating empty content for component ${index + 1}`);
          }

          console.log(`💾 Final processed component ${index + 1}:`, processedComponent);

          return processedComponent;
        }) || [],
    };
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePageDataChange = (field, value) => {
    // Handle slug input specially
    if (field === "slug") {
      // Only allow alphanumeric characters, dashes, and lowercase letters
      if (value === "" || /^[a-z0-9-]*$/.test(value)) {
        setPageData((prev) => ({
          ...prev,
          slug: value,
        }));
      } else {
        showToast(
          "Slug must only contain lowercase letters, numbers, and dashes.",
          "error"
        );
      }
    } else {
      setPageData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    // Auto-generate slug from name
    if (field === "name" && !pageData.slug) {
      // Generate slug properly handling special cases
      let slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

      // Remove leading/trailing hyphens
      slug = slug.replace(/^-+|-+$/g, "");

      setPageData((prev) => ({ ...prev, slug }));
    }
  };

  const addComponent = (component) => {
    // Special logic for AboutJourneySection: fetch default data from about.json if contentJson is missing/empty
    if (component.componentType === "AboutJourneySection") {
      fetch("/data/about.json")
        .then((res) => res.json())
        .then((defaultData) => {
          console.log("Applied default content for AboutJourneySection from /public/data/about.json", defaultData);
          const newComponent = {
            componentType: component.componentType || "Generic",
            componentName: component.componentName || "New Component",
            contentJson: JSON.stringify(defaultData, null, 2),
            orderIndex: pageData.components.length + 1,
          };
          setPageData((prev) => ({
            ...prev,
            components: [...prev.components, newComponent],
          }));
          showToast(
            `${component.componentName || component.name || "Component"} added to page with default content`,
            "success"
          );
        })
        .catch((err) => {
          console.error("Failed to load default about.json for AboutJourneySection", err);
          // Fallback to generic default
          const defaultContent = getDefaultDataForComponent(component.componentType);
          const newComponent = {
            componentType: component.componentType || "Generic",
            componentName: component.componentName || "New Component",
            contentJson: JSON.stringify(defaultContent, null, 2),
            orderIndex: pageData.components.length + 1,
          };
          setPageData((prev) => ({
            ...prev,
            components: [...prev.components, newComponent],
          }));
          showToast(
            `${component.componentName || component.name || "Component"} added to page (fallback)",
            "success"`
          );
        });
    } else {
      const defaultContent = getDefaultDataForComponent(component.componentType);
      const newComponent = {
        componentType: component.componentType || "Generic",
        componentName: component.componentName || "New Component",
        contentJson: JSON.stringify(defaultContent, null, 2),
        orderIndex: pageData.components.length + 1,
      };
      setPageData((prev) => ({
        ...prev,
        components: [...prev.components, newComponent],
      }));
      showToast(
        (component.componentName || component.name || "Component") + " added to page",
        "success"
      );
    }
  };

  // Function to update a specific component field
  const updateComponent = (index, field, value) => {
    setPageData((prev) => {
      const updatedComponents = [...prev.components];
      updatedComponents[index] = {
        ...updatedComponents[index],
        [field]: value,
      };
      return {
        ...prev,
        components: updatedComponents,
      };
    });
  };

  // Function to auto-fix orderIndex conflicts
  const fixOrderIndexes = () => {
    setPageData((prev) => {
      const updatedComponents = prev.components.map((component, index) => ({
        ...component,
        orderIndex: index + 1,
      }));
      return {
        ...prev,
        components: updatedComponents,
      };
    });
    showToast(
      "Order indexes have been auto-corrected to be sequential",
      "success"
    );
  };

  const getDefaultDataForComponent = (componentType) => {
    const defaultData = {
      HeroSection: {
        title: "Welcome to Our Services",
        subtitle: "Professional solutions for your business",
        description: "Transform your business with our expert services",
        ctaButton: {
          text: "Get Started",
          link: "/contact",
          variant: "primary",
        },
        backgroundImage: "/images/HeroSection.png",
      },
      HRHeroSection: {
        titleParts: ["HR Management", "Made Simple"],
        description:
          "Streamline your human resources with our comprehensive HR solutions",
        ctaButton: {
          text: "Learn More",
          link: "/hr",
          variant: "primary",
        },
        backgroundVideo: "/Videos/hrVideo.mp4",
      },
      PayrollHeroSection: {
        title: "Automated Payroll Solutions",
        subtitle: "Simplify payroll processing with our advanced system",
        description:
          "Reduce errors and save time with automated payroll management",
        ctaButton: {
          text: "Get Started",
          link: "/payroll",
          variant: "primary",
        },
        backgroundImage: "/images/payrollHeroSection.jpg",
      },
      HRModulesSection: {
        title: "HR Modules",
        subtitle: "Comprehensive HR management tools",
        description: "Everything you need to manage your workforce effectively",
        features: [
          {
            title: "Employee Management",
            description: "Complete employee lifecycle management",
            icon: "👥",
          },
          {
            title: "Time Tracking",
            description: "Accurate time and attendance tracking",
            icon: "⏰",
          },
          {
            title: "Performance Reviews",
            description: "Streamlined performance evaluation process",
            icon: "📊",
          },
        ],
      },
      ServiceGrid: {
        title: "Our Services",
        subtitle: "Professional solutions for your business",
        description: "Choose from our comprehensive range of services",
        services: [
          {
            name: "Consulting",
            description: "Expert business consulting services",
            icon: "💼",
            link: "/services/consulting",
          },
          {
            name: "Implementation",
            description: "Seamless system implementation",
            icon: "⚙️",
            link: "/services/implementation",
          },
        ],
      },
      ImplementationHeroSection: {
        title: "Implementation Services",
        subtitle: "Seamless deployments by experts",
        description: "We plan, configure, and launch with zero downtime.",
        backgroundImage: "/images/impleHeroSection.png",
        ctaButton: { text: "Talk to an expert", link: "/contact", variant: "primary" },
      },
      ImplementationWhyChooseSection: {
        title: "Why Choose Our Implementation",
        points: [
          { title: "Certified Team", description: "Experienced consultants and PMs" },
          { title: "Proven Methodology", description: "Repeatable, predictable delivery" },
          { title: "Post Go‑Live Support", description: "We stay with you after launch" },
        ],
      },
      ImplementationPricingSection: {
        title: "Implementation Pricing",
        plans: [
          { name: "Starter", price: "$4,900", duration: "2 weeks", includes: ["Discovery", "Basic config", "Training"] },
          { name: "Pro", price: "$12,900", duration: "6 weeks", includes: ["Workshops", "Advanced config", "Data migration"] },
        ],
      },
      ImplementationCTASection: {
        title: "Ready to implement?",
        subtitle: "Kick off your project now",
        button: { text: "Get a quote", link: "/contact" },
      },
      TrainingHeroSection: {
        title: "Training Programs",
        subtitle: "Upskill your team quickly",
        video: "/trainingHeroSection.mp4",
        ctaButton: { text: "View Programs", link: "/training" },
      },
      TrainingProgramsSection: {
        title: "Popular Programs",
        programs: [
          { name: "Admin Essentials", duration: "2 days", level: "Beginner" },
          { name: "Advanced Reporting", duration: "1 day", level: "Intermediate" },
        ],
      },
      TrainingWhyChooseSection: {
        title: "Why Our Training",
        reasons: [
          { title: "Hands‑on Labs", description: "Practice on real scenarios" },
          { title: "Expert Trainers", description: "Certified practitioners" },
        ],
      },
      IntegrationHeroSection: {
        title: "Integration Services",
        subtitle: "Connect your ecosystem",
        description: "APIs, middleware, and data pipelines",
      },
      IntegrationTypesSection: {
        title: "Integration Types",
        types: ["REST APIs", "iPaaS", "File‑based", "Webhooks"],
      },
      IntegrationBenefitsSection: {
        title: "Benefits",
        benefits: ["Fewer manual tasks", "Real‑time data", "Higher accuracy"],
      },
      CustomizationHeroSection: {
        title: "Customization Services",
        subtitle: "Tailor the system to your business",
        description: "Workflows, scripts, and UI personalization",
      },
      CustomizationServicesSection: {
        title: "What We Customize",
        services: [
          { name: "Workflows", description: "Automate approvals and processes" },
          { name: "Scripts", description: "Server and client logic" },
          { name: "UI", description: "Forms, fields, and dashboards" },
        ],
      },
      CustomizationProcessSection: {
        title: "Customization Process",
        steps: [
          { title: "Requirements", description: "Gather and analyze" },
          { title: "Design", description: "Solution blueprint" },
          { title: "Build", description: "Develop and unit test" },
          { title: "Deploy", description: "Migrate and verify" },
        ],
      },
      ManufacturingHeroSection: {
        title: "Manufacturing Industry",
        subtitle: "Optimize production and supply chain",
        description: "End‑to‑end visibility and control",
      },
      ManufacturingIndustryStatsSection: {
        title: "Industry Stats",
        stats: [
          { label: "Downtime reduced", value: "-25%" },
          { label: "OTD improved", value: "+18%" },
        ],
      },
      ManufacturingChallengesSection: {
        title: "Top Challenges",
        challenges: ["Planning accuracy", "Inventory variance", "Production bottlenecks"],
      },
      ManufacturingSolutionsSection: {
        title: "Our Solutions",
        solutions: ["MRP", "Shop floor", "WMS", "Quality"],
      },
      ManufacturingCaseStudiesSection: {
        title: "Case Studies",
        caseStudies: [
          { client: "Acme Co.", result: "Cut lead time 30%" },
          { client: "Beta Ltd.", result: "Reduced scrap 15%" },
        ],
      },
      ManufacturingImplementationProcessSection: {
        title: "Implementation Roadmap",
        steps: ["Discovery", "Configuration", "Pilot", "Go‑Live"],
      },
      ManufacturingCTASection: {
        title: "Transform Your Operations",
        button: { text: "Schedule a demo", link: "/contact" },
      },
      RetailHeroSection: {
        title: "Retail Industry",
        subtitle: "Unify online and in‑store",
        description: "Inventory, POS, and analytics",
      },
      RetailIndustryStatsSection: {
        title: "Retail KPIs",
        stats: [
          { label: "Basket size", value: "+12%" },
          { label: "Stockouts", value: "-20%" },
        ],
      },
      RetailChallengesSection: {
        title: "Retail Challenges",
        challenges: ["Omnichannel", "Returns", "Forecasting"],
      },
      RetailSolutionsSection: {
        title: "Solutions",
        solutions: ["OMS", "CRM", "Promotions"],
      },
      RetailFeaturesSection: {
        title: "Key Features",
        features: ["Click & collect", "Endless aisle", "Clienteling"],
      },
      RetailCaseStudiesSection: {
        title: "Case Studies",
        caseStudies: [
          { client: "ShopX", result: "+25% online sales" },
          { client: "Trendly", result: "-10% returns" },
        ],
      },
      RetailImplementationSection: {
        title: "Implementation Plan",
        steps: ["Discovery", "Rollout", "Training"],
      },
      RetailCTASection: {
        title: "Boost Your Retail",
        button: { text: "Start now", link: "/contact" },
      },
      ImplementationProcessSection: {
        title: "Our Implementation Process",
        subtitle: "A proven methodology for seamless business transformation",
        description:
          "We follow a structured approach to ensure successful implementation",
        steps: [
          {
            title: "Discovery & Planning",
            description: "Understanding your business requirements",
            icon: "🔍",
            duration: "1-2 weeks",
          },
          {
            title: "Design & Configuration",
            description: "Customizing the system to your needs",
            icon: "🎨",
            duration: "2-4 weeks",
          },
          {
            title: "Testing & Training",
            description: "Ensuring everything works perfectly",
            icon: "🧪",
            duration: "1-2 weeks",
          },
          {
            title: "Go-Live & Support",
            description: "Launching and ongoing support",
            icon: "🚀",
            duration: "Ongoing",
          },
        ],
        image: "/images/ProcessImplementattion.png",
        ctaButton: {
          text: "Start Your Implementation",
          link: "/contact",
          variant: "primary",
        },
      },
      HRPricingSection: {
        title: "HR Solution Pricing",
        subtitle: "Choose the perfect plan for your organization",
        description:
          "Flexible pricing options to fit your business size and needs",
        plans: [
          {
            name: "Starter",
            price: "$99",
            period: "per month",
            description: "Perfect for small businesses",
            features: [
              "Up to 50 employees",
              "Basic HR modules",
              "Email support",
              "Standard reporting",
            ],
            cta: "Get Started",
            popular: false,
          },
          {
            name: "Professional",
            price: "$199",
            period: "per month",
            description: "Ideal for growing companies",
            features: [
              "Up to 200 employees",
              "Advanced HR modules",
              "Priority support",
              "Advanced reporting",
              "Custom integrations",
            ],
            cta: "Get Started",
            popular: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            period: "pricing",
            description: "For large organizations",
            features: [
              "Unlimited employees",
              "All HR modules",
              "24/7 support",
              "Custom reporting",
              "Full customization",
              "Dedicated account manager",
            ],
            cta: "Contact Sales",
            popular: false,
          },
        ],
      },
      PayrollFAQSection: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about our payroll solutions",
        description:
          "Find answers to common questions about our payroll services",
        faqs: [
          {
            question: "How does automated payroll work?",
            answer:
              "Our automated payroll system calculates salaries, taxes, and deductions automatically based on your company's policies and employee data.",
          },
          {
            question: "Can I integrate with existing HR systems?",
            answer:
              "Yes, our payroll solution integrates seamlessly with most popular HR systems and accounting software.",
          },
          {
            question: "What kind of support do you provide?",
            answer:
              "We provide comprehensive support including setup assistance, training, and ongoing technical support.",
          },
        ],
      },
      PayrollCTASection: {
        title: "Ready to Streamline Your Payroll?",
        subtitle:
          "Join thousands of businesses that trust our payroll solutions",
        description:
          "Get started today and experience the benefits of automated payroll management",
        ctaButton: {
          text: "Start Free Trial",
          link: "/contact",
          variant: "primary",
        },
        features: [
          "30-day free trial",
          "No setup fees",
          "Expert onboarding",
          "24/7 support",
        ],
      },
      PayrollHowItWorksSection: {
        title: "How Payroll Works",
        subtitle: "Simple, automated, compliant",
        steps: [
          { title: "Collect Data", description: "Employees, contracts, timesheets" },
          { title: "Calculate", description: "Gross, tax, deductions, benefits" },
          { title: "Approve", description: "Role-based approval workflow" },
          { title: "Pay & Report", description: "Bank files and payslips/reports" },
        ],
      },
      PayrollWorkflowSection: {
        title: "End-to-End Payroll Workflow",
        subtitle: "From onboarding to disbursement",
        steps: [
          { name: "Onboard", description: "Create employee & contract" },
          { name: "Timesheets", description: "Attendance & overtime" },
          { name: "Run", description: "Automated payroll engine" },
          { name: "Approve", description: "Manager & finance sign-off" },
          { name: "Disburse", description: "Bank export & payslips" },
        ],
      },
      PayrollStepperSection: {
        steps: [
          { title: "Step 1", description: "Prepare data" },
          { title: "Step 2", description: "Review calculation" },
          { title: "Step 3", description: "Approve & pay" },
        ],
      },
      AboutMissionSection: {
        title: "Our Mission",
        subtitle: "Empowering businesses through technology",
        description:
          "We believe in the power of technology to transform businesses and create opportunities for growth and success.",
        mission:
          "To provide innovative, reliable, and user-friendly business solutions that help organizations thrive in the digital age.",
        vision:
          "To be the leading provider of business technology solutions, recognized for our excellence, innovation, and commitment to customer success.",
        values: [
          {
            title: "Innovation",
            description:
              "We continuously innovate to provide cutting-edge solutions",
          },
          {
            title: "Reliability",
            description: "We deliver dependable, high-quality services",
          },
          {
            title: "Customer Focus",
            description: "Our customers' success is our primary goal",
          },
        ],
      },
      AboutTeamSection: {
        title: "Meet Our Team",
        subtitle: "The experts behind your success",
        description:
          "Our experienced team is dedicated to helping you achieve your business goals",
        members: [
          {
            name: "John Smith",
            position: "CEO & Founder",
            bio:
              "With over 15 years of experience in business technology, John leads our vision for innovation.",
            image: "/images/ourteam/team1.jpg",
            linkedin: "https://linkedin.com/in/johnsmith",
          },
          {
            name: "Sarah Johnson",
            position: "CTO",
            bio:
              "Sarah oversees our technical operations and ensures our solutions meet the highest standards.",
            image: "/images/ourteam/team2.jpg",
            linkedin: "https://linkedin.com/in/sarahjohnson",
          },
          {
            name: "Mike Davis",
            position: "Head of Implementation",
            bio:
              "Mike leads our implementation team, ensuring smooth project delivery for our clients.",
            image: "/images/ourteam/team3.jpg",
            linkedin: "https://linkedin.com/in/mikedavis",
          },
        ],
      },
    };

    return (
      defaultData[componentType] || {
        title: "Section Title",
        description: "Section description",
        content: "Section content",
      }
    );
  };

  const editComponent = (componentIndex) => {
    const component = pageData.components[componentIndex];
    const componentInfo = availableComponents.find(
      (c) => c.componentType === component.componentType
    );

    setEditingComponent({
      ...component,
      index: componentIndex,
      componentInfo,
    });
    setShowSectionEditor(true);
  };

  const saveComponentData = (updatedData) => {
    const componentIndex = editingComponent.index;
    const updatedComponents = [...pageData.components];
    updatedComponents[componentIndex] = {
      ...updatedComponents[componentIndex],
      content: updatedData,
    };

    setPageData((prev) => ({
      ...prev,
      components: updatedComponents,
    }));

    setShowSectionEditor(false);
    setEditingComponent(null);
    showToast("Section data updated successfully", "success");
  };

  const removeComponent = (componentIndex) => {
    // Remove the component
    const updatedComponents = pageData.components.filter(
      (_, index) => index !== componentIndex
    );

    // Always re-assign all orderIndex values after removal to ensure they're sequential
    const reorderedComponents = updatedComponents.map((component, index) => ({
      ...component,
      orderIndex: index + 1, // Ensure orderIndex values are sequential and 1-based
    }));

    setPageData((prev) => ({
      ...prev,
      components: reorderedComponents,
    }));

    showToast("Section removed from page", "success");
  };

  const duplicateComponent = (componentIndex) => {
    const componentToDuplicate = pageData.components[componentIndex];
    const newComponent = {
      ...componentToDuplicate,
      // Don't assign orderIndex here, as it will be handled during save
    };

    // Add to the components array
    setPageData((prev) => {
      const updatedComponents = [...prev.components, newComponent];

      // Re-assign all orderIndex values to ensure they're sequential
      return {
        ...prev,
        components: updatedComponents.map((component, index) => ({
          ...component,
          orderIndex: index + 1,
        })),
      };
    });

    showToast("Section duplicated successfully", "success");
  };

  const moveComponent = (fromIndex, toIndex) => {
    const components = [...pageData.components];
    const [movedComponent] = components.splice(fromIndex, 1);
    components.splice(toIndex, 0, movedComponent);

    // Always re-assign all orderIndex values after reordering to ensure they're sequential
    const reorderedComponents = components.map((component, index) => ({
      ...component,
      orderIndex: index + 1, // Ensure orderIndex values are sequential and 1-based
    }));

    setPageData((prev) => ({
      ...prev,
      components: reorderedComponents,
    }));
  };

  const handleSave = async (status = "draft") => {
    // Prevent multiple simultaneous API calls
    if (isSavingRef.current) {
      console.log("Save operation already in progress, ignoring duplicate call");
      return;
    }

    try {
      // Mark that we're currently saving
      isSavingRef.current = true;
      
      // Set appropriate loading state
      if (status === "published") {
        setIsPublishing(true);
      } else {
        setLoading(true);
      }

      // Apply default values to ensure no null, undefined, or empty values
      const createPageDTO = applyDefaultValues(pageData, status);

      // Validate required fields - use helper function to ensure lock is reset on validation errors
      const validateAndReturn = (message) => {
        showToast(message, "error");
        // Reset states before returning from validation error
        setLoading(false);
        setIsPublishing(false);
        isSavingRef.current = false;
        return;
      };

      if (!createPageDTO.name || !createPageDTO.name.trim()) {
        return validateAndReturn("Page name is required");
      }

      if (!createPageDTO.categoryId) {
        return validateAndReturn("Please select a category");
      }

      // Validate slug format after applying defaults
      if (!/^[a-z0-9-]+$/.test(createPageDTO.slug)) {
        return validateAndReturn("Generated slug contains invalid characters. Please check the page name.");
      }

      // Validate components and orderIndex uniqueness
      if (createPageDTO.components && createPageDTO.components.length > 0) {
        const orderIndexes = new Set();
        for (let i = 0; i < createPageDTO.components.length; i++) {
          const comp = createPageDTO.components[i];

          // Check component type
          if (!comp.componentType?.trim()) {
            return validateAndReturn('Component ' + (i + 1) + ' is missing component type');
          }

          // Check component name
          if (!comp.componentName?.trim()) {
            return validateAndReturn('Component ' + (i + 1) + ' is missing component name');
          }

          // Check content
          if (!comp.content || typeof comp.content !== "object") {
            return validateAndReturn('Component ' + (i + 1) + ' has invalid content');
          }

          // Check orderIndex uniqueness
          const orderIndex = comp.orderIndex;
          if (orderIndexes.has(orderIndex)) {
            return validateAndReturn('Duplicate order index found: ' + orderIndex + '. Each component must have a unique order index.');
          }
          orderIndexes.add(orderIndex);
        }
      }

      console.log("🚀 Final data being sent to API:", createPageDTO);
      console.log("📊 Component summary:", {
        totalComponents: createPageDTO.components?.length || 0,
        componentTypes: createPageDTO.components?.map(c => c.componentType) || [],
        orderIndexes: createPageDTO.components?.map(c => c.orderIndex) || []
      });

      // Make the API call to create page with components
      await pagesAPI.createPage(createPageDTO);
      console.log("✅ Page created successfully!");
      
      // Show appropriate success message based on status
      if (status === "published") {
        showToast("Page published successfully", "success");
      } else {
        showToast('Page "' + createPageDTO.name + '" saved as draft successfully!', "success");
      }

      // Navigate to pages management after a brief delay
      // List of all JSON files to load
      const dataFiles = [
        '/data/payroll.json',
        '/data/hr.json',
        '/data/about.json',
        '/data/retail-data.json',
        '/data/manufacturing-data.json',
      ];

      // Cache for loaded data
      if (!window._defaultComponentData) {
        window._defaultComponentData = {};
        window._defaultComponentDataSources = {};
        window._defaultComponentDataLoaded = false;
      }

      // Helper to load and merge all JSON files
      const loadAllDefaultData = async () => {
        if (window._defaultComponentDataLoaded) return;
        for (const file of dataFiles) {
          try {
            const res = await fetch(file);
            if (!res.ok) continue;
            const json = await res.json();
            Object.keys(json).forEach((key) => {
              window._defaultComponentData[key] = json[key];
              window._defaultComponentDataSources[key] = file;
            });
          } catch (err) {
            // Ignore file errors
          }
        }
        window._defaultComponentDataLoaded = true;
      };

      // Synchronous fallback for SSR or first render
      if (!window._defaultComponentDataLoaded) {
        // This will not block, but will trigger async load for next render
        loadAllDefaultData();
      }

      // Get the default data for the component
      const data = window._defaultComponentData[componentType];
      const source = window._defaultComponentDataSources[componentType];
      if (data) {
        console.log(`Loaded default data for [${componentType}] from [${source}]`);
        return data;
      }
      // Fallback
      return {
        title: "Section Title",
        description: "Section description",
        content: "Section content",
      };
    };
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        // Require category selection
        return pageData.categoryId !== null && pageData.categoryId !== undefined;
      case 2:
        // Page details can be empty; defaults will be applied
        return true;
      case 3:
        // Sections optional
        return true;
      case 4:
        // Review step always valid
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white text-xl font-bold">Category</CardTitle>
            </CardHeader>
            <CardContent>
              <CategorySelector
                value={pageData.categoryId}
                onChange={(id) => handlePageDataChange("categoryId", id)}
              />
              {!pageData.categoryId && (
                <div className="mt-3 text-xs text-red-300">Please select a category to continue.</div>
              )}
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <PageDetailsStep
            pageData={pageData}
            onDataChange={handlePageDataChange}
          />
        );
      case 3:
        return (
          <SectionsStep
            pageData={pageData}
            availableComponents={availableComponents}
            onAddComponent={addComponent}
            onUpdateComponent={updateComponent}
            onRemoveComponent={removeComponent}
            onDuplicateComponent={duplicateComponent}
            onMoveComponent={moveComponent}
          />
        );
      case 4:
        return (
          <ReviewStep
            pageData={pageData}
            onSave={handleSave}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <MediaInputDetector>
      <div className="min-h-screen bg-[#001038] relative overflow-hidden">
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Enhanced Page Builder
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Create dynamic pages with customizable sections and rich content
            </p>
          </div>

          {/* Creative full-width process bar */}
          <div className="mb-10">
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${(currentStep - 1) / (steps.length - 1) * 100 || 0}%` }}
              />
            </div>
            <div className="mt-4 grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
              {steps.map((step) => (
                <div key={step.id} className="flex items-start space-x-3">
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-full border-2 ${
                      currentStep >= step.id ? "bg-blue-500 border-blue-500 text-white" : "bg-transparent border-gray-600 text-gray-400"
                    }`}
                  >
                    {currentStep > step.id ? <CheckIcon className="h-5 w-5" /> : <span className="text-xs font-semibold">{step.id}</span>}
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${currentStep >= step.id ? "text-white" : "text-gray-400"}`}>{step.title}</div>
                    <div className={`text-xs ${currentStep >= step.id ? "text-gray-300" : "text-gray-500"}`}>{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="w-full">{renderStepContent()}</div>

          {/* Navigation */}
          <div className="flex items-center justify-between w-full mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/pages")}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200"
              >
                Cancel
              </Button>

              {currentStep >= 2 && pageData.components.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setShowPagePreview(true)}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-200"
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Preview Page
                </Button>
              )}

              {currentStep < steps.length ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </Button>
              ) : (
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSave("draft")}
                    loading={loading && !isPublishing}
                    disabled={!isStepValid(currentStep) || isPublishing || loading}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading && !isPublishing ? "Saving..." : "Save as Draft"}
                  </Button>
                  <Button
                    onClick={() => handleSave("published")}
                    loading={isPublishing}
                    disabled={!isStepValid(currentStep) || isPublishing || loading}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPublishing ? "Publishing..." : "Publish Page"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section Data Editor Modal */}
        {showSectionEditor && editingComponent && (
          <SectionDataEditor
            isOpen={showSectionEditor}
            onClose={() => {
              setShowSectionEditor(false);
              setEditingComponent(null);
            }}
            section={{
              name: editingComponent.componentName,
              componentId: editingComponent.componentType,
              icon: editingComponent.componentInfo?.icon || "📄",
              data:
                editingComponent.content ||
                (editingComponent.contentJson
                  ? JSON.parse(editingComponent.contentJson)
                  : {}),
            }}
            onSave={saveComponentData}
          />
        )}

        {/* Page Preview Modal */}
        <PagePreview
          isOpen={showPagePreview}
          onClose={() => setShowPagePreview(false)}
          pageData={pageData}
          availableComponents={availableComponents}
        />

        {/* Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </MediaInputDetector>
  );
};

// Category selector that fetches from backend swagger endpoints
const CategorySelector = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/Categories");
        const list = Array.isArray(res.data) ? res.data : [];
        setCategories(list);
      } catch (e) {
        setError(e.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <div className="text-white/80 text-sm">Loading categories...</div>;
  }
  if (error) {
    return <div className="text-red-300 text-sm">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(c.id)}
          className={`text-left p-4 rounded-lg border transition ${
            value === c.id
              ? "border-blue-400 bg-blue-500/10"
              : "border-white/10 hover:border-white/20 bg-white/5"
          }`}
        >
          <div className="text-white font-semibold">{c.name}</div>
          {c.description && (
            <div className="text-white/70 text-sm mt-1">{c.description}</div>
          )}
        </button>
      ))}
    </div>
  );
};

// Step 1: Page Details
const PageDetailsStep = ({ pageData, onDataChange }) => {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">
          Page Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Page Name *
            </label>
            <Input
              value={pageData.name}
              onChange={(e) => onDataChange("name", e.target.value)}
              placeholder="Enter page name"
              className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              URL Slug *
            </label>
            <Input
              type="text"
              value={pageData.slug}
              onChange={(e) => onDataChange("slug", e.target.value)}
              placeholder="page-url-slug"
              pattern="[a-z0-9-]+"
              title="Slug must only contain lowercase letters, numbers, and dashes."
              className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20"
            />
            <p className="text-sm text-gray-300 mt-2">
              URL: /{pageData.slug || "page-url-slug"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Slug must only contain lowercase letters, numbers, and dashes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              SEO Meta Title
            </label>
            <Input
              value={pageData.metaTitle}
              onChange={(e) => onDataChange("metaTitle", e.target.value)}
              placeholder="SEO title for search engines"
              className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20"
            />
          </div>
          <div></div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            SEO Meta Description
          </label>
          <textarea
            value={pageData.metaDescription}
            onChange={(e) => onDataChange("metaDescription", e.target.value)}
            placeholder="SEO description for search engines"
            rows={3}
            className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm resize-none"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={pageData.isHomepage}
              onChange={(e) => onDataChange("isHomepage", e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-white">Set as Homepage</span>
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

// Step 2: Sections with detailed component forms
const SectionsStep = ({
  pageData,
  availableComponents,
  onAddComponent,
  onUpdateComponent,
  onRemoveComponent,
  onDuplicateComponent,
  onMoveComponent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Components", icon: "📄" },
    { id: "layout", name: "Layout", icon: "🎯" },
    { id: "content", name: "Content", icon: "📝" },
    { id: "pricing", name: "Pricing", icon: "💰" },
    { id: "faq", name: "FAQ", icon: "❓" },
    { id: "cta", name: "Call to Action", icon: "🚀" },
    { id: "about", name: "About", icon: "👥" },
  ];

  const filteredComponents =
    selectedCategory === "all"
      ? availableComponents
      : availableComponents.filter(
          (comp) => comp.category === selectedCategory
        );

  // Function to update a specific component field
  const handleComponentUpdate = (index, field, value) => {
    if (field === "orderIndex") {
      // Validate and parse orderIndex
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= 0) {
        onUpdateComponent(index, field, numValue);
      }
    } else {
      onUpdateComponent(index, field, value);
    }
  };

  // Function to validate JSON in contentJson field
  const validateAndFormatJSON = (jsonString) => {
    try {
      if (!jsonString.trim()) return "{}";
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      return jsonString; // Return as-is if invalid, let user fix it
    }
  };

  return (
    <div className="space-y-6">
      {/* Available Components */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl font-bold">
            Available Components
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Components Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComponents.map((component, index) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-white/20 rounded-xl cursor-pointer hover:bg-white/10 hover:border-white/30 transition-all duration-200 group"
                onClick={() => onAddComponent(component)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {component.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-white mb-1">
                      {component.name}
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {component.description}
                    </p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                        {component.category}
                      </span>
                    </div>
                  </div>
                  <PlusIcon className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Component Forms */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-xl font-bold">
              Component Configuration ({pageData.components.length})
            </CardTitle>
            <div className="flex items-center space-x-2">
              {pageData.components.length > 1 && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    // Auto-fix orderIndexes
                    const updatedComponents = pageData.components.map(
                      (component, index) => ({
                        ...component,
                        orderIndex: index + 1,
                      })
                    );
                    // Update all components with fixed indexes
                    updatedComponents.forEach((comp, index) => {
                      onUpdateComponent(index, "orderIndex", index + 1);
                    });
                  }}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-200"
                >
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  Fix Order
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  onAddComponent({
                    componentType: "Generic",
                    componentName: "New Component",
                    icon: "📄",
                    category: "content",
                  })
                }
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-green-500/20 hover:border-green-400 transition-all duration-200"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Component
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {pageData.components.length === 0 ? (
            <div className="text-center py-12">
              <DocumentTextIcon className="h-20 w-20 text-white/40 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">
                No components added yet
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                Click on components above or use "Add Component" button to start
                building your page
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {pageData.components.map((component, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  {/* Component Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl">
                        {availableComponents.find(
                          (c) => c.componentType === component.componentType
                        )?.icon || "📄"}
                      </div>
                      <h4 className="text-lg font-semibold text-white">
                        Component #{index + 1}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDuplicateComponent(index)}
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-green-500/20 hover:border-green-400 transition-all duration-200"
                      >
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onRemoveComponent(index)}
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-red-500/20 hover:border-red-400 transition-all duration-200"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Component Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Component Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Component Type
                      </label>
                      <input
                        type="text"
                        value={component.componentType || ""}
                        onChange={(e) =>
                          handleComponentUpdate(
                            index,
                            "componentType",
                            e.target.value
                          )
                        }
                        placeholder="e.g., HeroSection, CtaButton"
                        className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
                      />
                    </div>

                    {/* Component Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Component Name
                      </label>
                      <input
                        type="text"
                        value={component.componentName || ""}
                        onChange={(e) =>
                          handleComponentUpdate(
                            index,
                            "componentName",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Main Hero, Footer CTA"
                        className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
                      />
                    </div>

                    {/* Order Index */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Order Index
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={component.orderIndex ?? ""}
                        onChange={(e) =>
                          handleComponentUpdate(
                            index,
                            "orderIndex",
                            e.target.value
                          )
                        }
                        placeholder="Auto-generated if empty"
                        className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Leave empty for auto-increment ({index})
                      </p>
                    </div>

                    {/* Content Configuration - Full Width */}
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-300">
                          Content Configuration
                        </label>
                        <div className="flex bg-white/10 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => {
                              if (!component.viewMode) {
                                handleComponentUpdate(index, "viewMode", "form");
                              } else if (component.viewMode === "json") {
                                handleComponentUpdate(index, "viewMode", "form");
                              }
                            }}
                            className={`px-3 py-1 text-xs rounded-md transition-all ${
                              (!component.viewMode || component.viewMode === "form")
                                ? "bg-blue-500 text-white"
                                : "text-gray-400 hover:text-white"
                            }`}
                          >
                            Form View
                          </button>
                          <button
                            type="button"
                            onClick={() => handleComponentUpdate(index, "viewMode", "json")}
                            className={`px-3 py-1 text-xs rounded-md transition-all ${
                              component.viewMode === "json"
                                ? "bg-blue-500 text-white"
                                : "text-gray-400 hover:text-white"
                            }`}
                          >
                            JSON View
                          </button>
                        </div>
                      </div>

                      {/* Dynamic Form View */}
                      {(!component.viewMode || component.viewMode === "form") && (
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4">
                          <DynamicContentForm
                            contentJson={component.contentJson || "{}"}
                            onChange={(jsonString) =>
                              handleComponentUpdate(index, "contentJson", jsonString)
                            }
                            className="text-white [&_label]:text-gray-300 [&_input]:bg-white/10 [&_input]:border-white/20 [&_input]:text-white [&_input::placeholder]:text-white/50 [&_input:focus]:border-blue-400 [&_button]:bg-white/10 [&_button]:border-white/20 [&_button]:text-white [&_button:hover]:bg-white/20"
                          />
                        </div>
                      )}

                      {/* Raw JSON View */}
                      {component.viewMode === "json" && (
                        <>
                          <textarea
                            rows={6}
                            value={component.contentJson || "{}"}
                            onChange={(e) =>
                              handleComponentUpdate(
                                index,
                                "contentJson",
                                e.target.value
                              )
                            }
                            placeholder='{"title": "Example Title", "description": "Example Description"}'
                            className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm font-mono text-sm resize-none"
                          />
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-gray-400">
                              Enter valid JSON data for this component
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const formatted = validateAndFormatJSON(
                                  component.contentJson || "{}"
                                );
                                handleComponentUpdate(
                                  index,
                                  "contentJson",
                                  formatted
                                );
                              }}
                              className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-200 text-xs px-2 py-1"
                            >
                              Format JSON
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Step 3: Review
const ReviewStep = ({ pageData, onSave, loading }) => {
  const [availableComponents] = useState([
    { componentType: "HeroSection", icon: "🎯" },
    { componentType: "HRHeroSection", icon: "👥" },
    { componentType: "PayrollHeroSection", icon: "💰" },
    { componentType: "HRModulesSection", icon: "📦" },
    { componentType: "ServiceGrid", icon: "⚙️" },
    { componentType: "ImplementationProcessSection", icon: "🔄" },
    { componentType: "HRPricingSection", icon: "💵" },
    { componentType: "PayrollFAQSection", icon: "❓" },
    { componentType: "PayrollCTASection", icon: "🚀" },
    { componentType: "AboutMissionSection", icon: "🎯" },
    { componentType: "AboutTeamSection", icon: "👥" },
  ]);

  const getComponentIcon = (componentType) => {
    return (
      availableComponents.find((c) => c.componentType === componentType)
        ?.icon || "📄"
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Summary */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl font-bold">
            Page Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Page Name
              </label>
              <p className="text-white font-semibold">{pageData.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                URL Slug
              </label>
              <p className="text-white font-semibold">/{pageData.slug}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Category ID
              </label>
              <p className="text-white font-semibold">{pageData.categoryId}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Homepage
              </label>
              <p className="text-white font-semibold">
                {pageData.isHomepage ? "Yes" : "No"}
              </p>
            </div>
          </div>

          {pageData.metaTitle && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                SEO Meta Title
              </label>
              <p className="text-white">{pageData.metaTitle}</p>
            </div>
          )}

          {pageData.metaDescription && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                SEO Meta Description
              </label>
              <p className="text-white">{pageData.metaDescription}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Components Summary */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl font-bold">
            Components ({pageData.components.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pageData.components.length === 0 ? (
            <div className="text-center py-8">
              <ExclamationTriangleIcon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <p className="text-yellow-300">
                No components added to this page
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pageData.components.map((component, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="text-xl">
                    {getComponentIcon(component.componentType)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">
                      {component.componentName}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {component.componentType}
                    </p>
                  </div>
                  <div className="text-gray-400 text-sm">
                    Order: {component.orderIndex}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* JSON Preview */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl font-bold">
            Request Body Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
            <pre className="text-green-400 text-sm">
              {JSON.stringify(pageData, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedPageBuilder;
