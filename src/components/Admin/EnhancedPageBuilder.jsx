import React, { useState, useEffect } from "react";
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

const EnhancedPageBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Page data
  const [pageData, setPageData] = useState({
    name: "",
    categoryId: 0,
    slug: "",
    metaTitle: "",
    metaDescription: "",
    isHomepage: false,
    isPublished: false,
    components: []
  });

  // Available components library
  const [availableComponents] = useState([
    // Hero Sections
    {
      id: "hero-section",
      name: "Hero Section",
      description: "Main banner with title and call-to-action",
      icon: "🎯",
      componentType: "HeroSection",
      componentName: "Hero Section",
      category: "layout"
    },
    {
      id: "hr-hero-section",
      name: "HR Hero Section",
      description: "Hero section for HR solutions",
      icon: "👥",
      componentType: "HRHeroSection",
      componentName: "HR Hero Section",
      category: "layout"
    },
    {
      id: "payroll-hero-section",
      name: "Payroll Hero Section",
      description: "Hero section for payroll solutions",
      icon: "💰",
      componentType: "PayrollHeroSection",
      componentName: "Payroll Hero Section",
      category: "layout"
    },

    // Content Sections
    {
      id: "hr-modules-section",
      name: "HR Modules Section",
      description: "Display HR modules and features",
      icon: "📦",
      componentType: "HRModulesSection",
      componentName: "HR Modules Section",
      category: "content"
    },
    {
      id: "service-grid-section",
      name: "Service Grid Section",
      description: "Grid layout for service offerings",
      icon: "⚙️",
      componentType: "ServiceGrid",
      componentName: "Service Grid Section",
      category: "content"
    },
    {
      id: "implementation-process-section",
      name: "Implementation Process",
      description: "Step-by-step implementation process",
      icon: "🔄",
      componentType: "ImplementationProcessSection",
      componentName: "Implementation Process Section",
      category: "content"
    },

    // Pricing Sections
    {
      id: "hr-pricing-section",
      name: "HR Pricing Section",
      description: "Pricing plans for HR solutions",
      icon: "💵",
      componentType: "HRPricingSection",
      componentName: "HR Pricing Section",
      category: "pricing"
    },

    // FAQ Sections
    {
      id: "payroll-faq-section",
      name: "Payroll FAQ Section",
      description: "Frequently asked questions about payroll",
      icon: "❓",
      componentType: "PayrollFAQSection",
      componentName: "Payroll FAQ Section",
      category: "faq"
    },

    // CTA Sections
    {
      id: "payroll-cta-section",
      name: "Payroll CTA Section",
      description: "Call-to-action for payroll solutions",
      icon: "🚀",
      componentType: "PayrollCTASection",
      componentName: "Payroll CTA Section",
      category: "cta"
    },

    // About Sections
    {
      id: "about-mission-section",
      name: "About Mission Section",
      description: "Company mission and vision",
      icon: "🎯",
      componentType: "AboutMissionSection",
      componentName: "About Mission Section",
      category: "about"
    },
    {
      id: "about-team-section",
      name: "About Team Section",
      description: "Team members showcase",
      icon: "👥",
      componentType: "AboutTeamSection",
      componentName: "About Team Section",
      category: "about"
    }
  ]);

  // UI State
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [editingComponent, setEditingComponent] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSectionEditor, setShowSectionEditor] = useState(false);
  const [showPagePreview, setShowPagePreview] = useState(false);

  const steps = [
    { id: 1, title: "Page Details", description: "Basic page information" },
    { id: 2, title: "Add Sections", description: "Choose and configure sections" },
    { id: 3, title: "Review & Publish", description: "Final review and publish" }
  ];

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
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
    setPageData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate slug from name
    if (field === "name" && !pageData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setPageData(prev => ({ ...prev, slug }));
    }
  };

  const addComponent = (component) => {
    const newComponent = {
      componentType: component.componentType,
      componentName: component.componentName,
      contentJson: JSON.stringify(getDefaultDataForComponent(component.componentType)),
      orderIndex: pageData.components.length
    };

    setPageData(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));

    showToast(`${component.name} added to page`, "success");
  };

  const getDefaultDataForComponent = (componentType) => {
    const defaultData = {
      'HeroSection': {
        title: "Welcome to Our Services",
        subtitle: "Professional solutions for your business",
        description: "Transform your business with our expert services",
        ctaButton: {
          text: "Get Started",
          link: "/contact",
          variant: "primary"
        },
        backgroundImage: "/images/HeroSection.png"
      },
      'HRHeroSection': {
        titleParts: ["HR Management", "Made Simple"],
        description: "Streamline your human resources with our comprehensive HR solutions",
        ctaButton: {
          text: "Learn More",
          link: "/hr",
          variant: "primary"
        },
        backgroundVideo: "/Videos/hrVideo.mp4"
      },
      'PayrollHeroSection': {
        title: "Automated Payroll Solutions",
        subtitle: "Simplify payroll processing with our advanced system",
        description: "Reduce errors and save time with automated payroll management",
        ctaButton: {
          text: "Get Started",
          link: "/payroll",
          variant: "primary"
        },
        backgroundImage: "/images/payrollHeroSection.jpg"
      },
      'HRModulesSection': {
        title: "HR Modules",
        subtitle: "Comprehensive HR management tools",
        description: "Everything you need to manage your workforce effectively",
        features: [
          {
            title: "Employee Management",
            description: "Complete employee lifecycle management",
            icon: "👥"
          },
          {
            title: "Time Tracking",
            description: "Accurate time and attendance tracking",
            icon: "⏰"
          },
          {
            title: "Performance Reviews",
            description: "Streamlined performance evaluation process",
            icon: "📊"
          }
        ]
      },
      'ServiceGrid': {
        title: "Our Services",
        subtitle: "Professional solutions for your business",
        description: "Choose from our comprehensive range of services",
        services: [
          {
            name: "Consulting",
            description: "Expert business consulting services",
            icon: "💼",
            link: "/services/consulting"
          },
          {
            name: "Implementation",
            description: "Seamless system implementation",
            icon: "⚙️",
            link: "/services/implementation"
          }
        ]
      },
      'ImplementationProcessSection': {
        title: "Our Implementation Process",
        subtitle: "A proven methodology for seamless business transformation",
        description: "We follow a structured approach to ensure successful implementation",
        steps: [
          {
            title: "Discovery & Planning",
            description: "Understanding your business requirements",
            icon: "🔍",
            duration: "1-2 weeks"
          },
          {
            title: "Design & Configuration",
            description: "Customizing the system to your needs",
            icon: "🎨",
            duration: "2-4 weeks"
          },
          {
            title: "Testing & Training",
            description: "Ensuring everything works perfectly",
            icon: "🧪",
            duration: "1-2 weeks"
          },
          {
            title: "Go-Live & Support",
            description: "Launching and ongoing support",
            icon: "🚀",
            duration: "Ongoing"
          }
        ],
        image: "/images/ProcessImplementattion.png",
        ctaButton: {
          text: "Start Your Implementation",
          link: "/contact",
          variant: "primary"
        }
      },
      'HRPricingSection': {
        title: "HR Solution Pricing",
        subtitle: "Choose the perfect plan for your organization",
        description: "Flexible pricing options to fit your business size and needs",
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
              "Standard reporting"
            ],
            cta: "Get Started",
            popular: false
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
              "Custom integrations"
            ],
            cta: "Get Started",
            popular: true
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
              "Dedicated account manager"
            ],
            cta: "Contact Sales",
            popular: false
          }
        ]
      },
      'PayrollFAQSection': {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about our payroll solutions",
        description: "Find answers to common questions about our payroll services",
        faqs: [
          {
            question: "How does automated payroll work?",
            answer: "Our automated payroll system calculates salaries, taxes, and deductions automatically based on your company's policies and employee data."
          },
          {
            question: "Can I integrate with existing HR systems?",
            answer: "Yes, our payroll solution integrates seamlessly with most popular HR systems and accounting software."
          },
          {
            question: "What kind of support do you provide?",
            answer: "We provide comprehensive support including setup assistance, training, and ongoing technical support."
          }
        ]
      },
      'PayrollCTASection': {
        title: "Ready to Streamline Your Payroll?",
        subtitle: "Join thousands of businesses that trust our payroll solutions",
        description: "Get started today and experience the benefits of automated payroll management",
        ctaButton: {
          text: "Start Free Trial",
          link: "/contact",
          variant: "primary"
        },
        features: [
          "30-day free trial",
          "No setup fees",
          "Expert onboarding",
          "24/7 support"
        ]
      },
      'AboutMissionSection': {
        title: "Our Mission",
        subtitle: "Empowering businesses through technology",
        description: "We believe in the power of technology to transform businesses and create opportunities for growth and success.",
        mission: "To provide innovative, reliable, and user-friendly business solutions that help organizations thrive in the digital age.",
        vision: "To be the leading provider of business technology solutions, recognized for our excellence, innovation, and commitment to customer success.",
        values: [
          {
            title: "Innovation",
            description: "We continuously innovate to provide cutting-edge solutions"
          },
          {
            title: "Reliability",
            description: "We deliver dependable, high-quality services"
          },
          {
            title: "Customer Focus",
            description: "Our customers' success is our primary goal"
          }
        ]
      },
      'AboutTeamSection': {
        title: "Meet Our Team",
        subtitle: "The experts behind your success",
        description: "Our experienced team is dedicated to helping you achieve your business goals",
        members: [
          {
            name: "John Smith",
            position: "CEO & Founder",
            bio: "With over 15 years of experience in business technology, John leads our vision for innovation.",
            image: "/images/ourteam/team1.jpg",
            linkedin: "https://linkedin.com/in/johnsmith"
          },
          {
            name: "Sarah Johnson",
            position: "CTO",
            bio: "Sarah oversees our technical operations and ensures our solutions meet the highest standards.",
            image: "/images/ourteam/team2.jpg",
            linkedin: "https://linkedin.com/in/sarahjohnson"
          },
          {
            name: "Mike Davis",
            position: "Head of Implementation",
            bio: "Mike leads our implementation team, ensuring smooth project delivery for our clients.",
            image: "/images/ourteam/team3.jpg",
            linkedin: "https://linkedin.com/in/mikedavis"
          }
        ]
      }
    };

    return defaultData[componentType] || {
      title: "Section Title",
      description: "Section description",
      content: "Section content"
    };
  };

  const editComponent = (componentIndex) => {
    const component = pageData.components[componentIndex];
    const componentInfo = availableComponents.find(c => c.componentType === component.componentType);
    
    setEditingComponent({
      ...component,
      index: componentIndex,
      componentInfo
    });
    setShowSectionEditor(true);
  };

  const saveComponentData = (updatedData) => {
    const componentIndex = editingComponent.index;
    const updatedComponents = [...pageData.components];
    updatedComponents[componentIndex] = {
      ...updatedComponents[componentIndex],
      contentJson: JSON.stringify(updatedData)
    };

    setPageData(prev => ({
      ...prev,
      components: updatedComponents
    }));

    setShowSectionEditor(false);
    setEditingComponent(null);
    showToast("Section data updated successfully", "success");
  };

  const removeComponent = (componentIndex) => {
    const updatedComponents = pageData.components.filter((_, index) => index !== componentIndex);
    const reorderedComponents = updatedComponents.map((component, index) => ({
      ...component,
      orderIndex: index
    }));

    setPageData(prev => ({
      ...prev,
      components: reorderedComponents
    }));

    showToast("Section removed from page", "success");
  };

  const duplicateComponent = (componentIndex) => {
    const componentToDuplicate = pageData.components[componentIndex];
    const newComponent = {
      ...componentToDuplicate,
      orderIndex: pageData.components.length
    };

    setPageData(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));

    showToast("Section duplicated successfully", "success");
  };

  const moveComponent = (fromIndex, toIndex) => {
    const components = [...pageData.components];
    const [movedComponent] = components.splice(fromIndex, 1);
    components.splice(toIndex, 0, movedComponent);
    
    const reorderedComponents = components.map((component, index) => ({
      ...component,
      orderIndex: index
    }));
    
    setPageData(prev => ({
      ...prev,
      components: reorderedComponents
    }));
  };

  const handleSave = async (status = "draft") => {
    if (!pageData.name.trim()) {
      showToast("Please enter a page name", "error");
      return;
    }

    if (!pageData.slug.trim()) {
      showToast("Please enter a page slug", "error");
      return;
    }

    try {
      setLoading(true);
      
      const payload = {
        ...pageData,
        isPublished: status === "published"
      };

      const response = await fetch("http://localhost:3001/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: pageData.slug,
          data: payload,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save page");
      }

      const result = await response.json();
      
      showToast(
        `Page "${pageData.name}" ${status === "published" ? "published" : "saved as draft"} successfully!`,
        "success"
      );

      // Navigate to pages management
      setTimeout(() => {
        navigate("/admin/pages");
      }, 1500);
    } catch (error) {
      showToast("Error saving page: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return pageData.name.trim() !== "" && pageData.slug.trim() !== "";
      case 2:
        return pageData.components.length > 0;
      case 3:
        return isStepValid(1) && isStepValid(2);
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PageDetailsStep pageData={pageData} onDataChange={handlePageDataChange} />;
      case 2:
        return (
          <SectionsStep
            pageData={pageData}
            availableComponents={availableComponents}
            onAddComponent={addComponent}
            onEditComponent={editComponent}
            onRemoveComponent={removeComponent}
            onDuplicateComponent={duplicateComponent}
            onMoveComponent={moveComponent}
          />
        );
      case 3:
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
    <div className="min-h-screen bg-gradient-to-br from-[#001038] via-[#191970] to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
      </div>
      
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

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.id
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-transparent border-gray-600 text-gray-400"
                }`}>
                  {currentStep > step.id ? (
                    <CheckIcon className="h-6 w-6" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                <div className="ml-3 text-left">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? "text-white" : "text-gray-400"
                  }`}>
                    {step.title}
                  </div>
                  <div className={`text-xs ${
                    currentStep >= step.id ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {step.description}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                    currentStep > step.id ? "bg-blue-500" : "bg-gray-600"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-6xl mx-auto">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between max-w-6xl mx-auto mt-8">
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
                  loading={loading}
                  disabled={!isStepValid(currentStep)}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save as Draft
                </Button>
                <Button
                  onClick={() => handleSave("published")}
                  loading={loading}
                  disabled={!isStepValid(currentStep)}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Publish Page
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
            data: JSON.parse(editingComponent.contentJson)
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
              value={pageData.slug}
              onChange={(e) => onDataChange("slug", e.target.value)}
              placeholder="page-url-slug"
              className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20"
            />
            <p className="text-sm text-gray-300 mt-2">
              URL: /{pageData.slug || "page-url-slug"}
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

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Category ID
            </label>
            <Input
              type="number"
              value={pageData.categoryId}
              onChange={(e) => onDataChange("categoryId", parseInt(e.target.value) || 0)}
              placeholder="0"
              className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20"
            />
          </div>
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

// Step 2: Sections
const SectionsStep = ({ 
  pageData, 
  availableComponents, 
  onAddComponent, 
  onEditComponent, 
  onRemoveComponent, 
  onDuplicateComponent, 
  onMoveComponent 
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Components", icon: "📄" },
    { id: "layout", name: "Layout", icon: "🎯" },
    { id: "content", name: "Content", icon: "📝" },
    { id: "pricing", name: "Pricing", icon: "💰" },
    { id: "faq", name: "FAQ", icon: "❓" },
    { id: "cta", name: "Call to Action", icon: "🚀" },
    { id: "about", name: "About", icon: "👥" }
  ];

  const filteredComponents = selectedCategory === "all" 
    ? availableComponents 
    : availableComponents.filter(comp => comp.category === selectedCategory);

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
            {categories.map(category => (
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

      {/* Page Sections */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl font-bold">
            Page Sections ({pageData.components.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pageData.components.length === 0 ? (
            <div className="text-center py-12">
              <DocumentTextIcon className="h-20 w-20 text-white/40 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">
                No sections added yet
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                Click on components above to start building your page
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pageData.components.map((component, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-xl">
                        {availableComponents.find(c => c.componentType === component.componentType)?.icon || "📄"}
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white">
                          {component.componentName}
                        </h4>
                        <p className="text-sm text-gray-300">
                          {component.componentType}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEditComponent(index)}
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-200"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
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
    { componentType: "AboutTeamSection", icon: "👥" }
  ]);

  const getComponentIcon = (componentType) => {
    return availableComponents.find(c => c.componentType === componentType)?.icon || "📄";
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
              <label className="block text-sm font-medium text-gray-400 mb-1">Page Name</label>
              <p className="text-white font-semibold">{pageData.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">URL Slug</label>
              <p className="text-white font-semibold">/{pageData.slug}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Category ID</label>
              <p className="text-white font-semibold">{pageData.categoryId}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Homepage</label>
              <p className="text-white font-semibold">{pageData.isHomepage ? "Yes" : "No"}</p>
            </div>
          </div>
          
          {pageData.metaTitle && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">SEO Meta Title</label>
              <p className="text-white">{pageData.metaTitle}</p>
            </div>
          )}
          
          {pageData.metaDescription && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">SEO Meta Description</label>
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
              <p className="text-yellow-300">No components added to this page</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pageData.components.map((component, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-xl">{getComponentIcon(component.componentType)}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{component.componentName}</h4>
                    <p className="text-gray-400 text-sm">{component.componentType}</p>
                  </div>
                  <div className="text-gray-400 text-sm">Order: {component.orderIndex}</div>
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
