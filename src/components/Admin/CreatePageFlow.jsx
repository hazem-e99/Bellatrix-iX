import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  DocumentTextIcon,
  ViewColumnsIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import Toast from "../ui/Toast";
import pagesAPI from "../../lib/pagesAPI";

// Import step components
import CategorySelection from "./CreatePageSteps/CategorySelection";
import PageBuilder from "./CreatePageSteps/PageBuilder";
import ReviewAndSave from "./CreatePageSteps/ReviewAndSave";

const CreatePageFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [pageData, setPageData] = useState({
    title: "",
    slug: "",
    category: "",
    subCategory: "",
    templateId: "",
    status: "draft",
    sections: [],
    meta: {
      meta_title: "",
      meta_description: "",
    },
    created_by: 1,
    updated_at: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Category & Page",
      description: "Choose category and base page",
      icon: ViewColumnsIcon,
    },
    {
      id: 2,
      title: "Build Page",
      description: "Design your page",
      icon: DocumentTextIcon,
    },
    {
      id: 3,
      title: "Review & Save",
      description: "Finalize and publish",
      icon: Cog6ToothIcon,
    },
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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedPage(null); // Reset selected page when category changes
    setPageData((prev) => ({
      ...prev,
      category: category.id,
      subCategory: category.subCategory || "",
      templateId: category.templateId || "",
    }));
  };

  const handlePageSelect = (page) => {
    setSelectedPage(page);
  };

  const handleSectionsUpdate = (sections) => {
    setPageData((prev) => ({
      ...prev,
      sections: sections,
    }));
  };

  const handlePageDataUpdate = (updates) => {
    setPageData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedCategory !== null && selectedPage !== null;
      case 2:
        return pageData.sections.length > 0;
      case 3:
        return pageData.title.trim() !== "" && pageData.slug.trim() !== "";
      default:
        return false;
    }
  };

  const handleSave = async (status = "draft") => {
    try {
      setLoading(true);

      // Transform sections to components format expected by server
      const components = pageData.sections.map((section, index) => ({
        componentType: section.componentId, // Use componentId as componentType
        componentName: section.name || section.componentId,
        contentJson: JSON.stringify(section.props || {}),
        orderIndex: index,
      }));

      // Create the page DTO according to the Bellatrix API format
      const createPageDTO = {
        title: pageData.title,
        categoryId: 0,
        slug: pageData.slug,
        metaTitle: pageData.meta?.meta_title || pageData.title,
        metaDescription: pageData.meta?.meta_description || "",
        isHomepage: false,
        isPublished: status === "published",
        components: components,
      };

      await pagesAPI.createPage(createPageDTO);

      showToast(
        `Page "${pageData.title}" ${
          status === "published" ? "published" : "saved as draft"
        } successfully!`,
        "success"
      );

      // Navigate to pages management or the new page
      setTimeout(() => {
        navigate("/admin/pages");
      }, 1500);
    } catch (error) {
      showToast("Error saving page: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CategorySelection
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            selectedPage={selectedPage}
            onPageSelect={handlePageSelect}
          />
        );
      case 2:
        return (
          <PageBuilder
            category={selectedCategory}
            selectedPage={selectedPage}
            sections={pageData.sections}
            onSectionsUpdate={handleSectionsUpdate}
          />
        );
      case 3:
        return (
          <ReviewAndSave
            pageData={pageData}
            onPageDataUpdate={handlePageDataUpdate}
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
                Create New Page
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                Build a custom page using our drag-and-drop page builder
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/pages")}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-2" />
              Back to Pages
            </Button>
          </div>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const IconComponent = step.icon;

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <motion.div
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 shadow-lg ${
                        isActive
                          ? "border-blue-400 bg-blue-500 text-white shadow-blue-500/50"
                          : isCompleted
                          ? "border-green-400 bg-green-500 text-white shadow-green-500/50"
                          : "border-white/30 bg-white/10 backdrop-blur-sm text-white/70"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isCompleted ? (
                        <CheckIcon className="h-6 w-6" />
                      ) : (
                        <IconComponent className="h-6 w-6" />
                      )}
                    </motion.div>
                    <div className="ml-4">
                      <p
                        className={`text-base font-semibold ${
                          isActive
                            ? "text-blue-400"
                            : isCompleted
                            ? "text-green-400"
                            : "text-white/70"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-sm text-white/60">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-6 rounded-full ${
                        isCompleted ? "bg-green-400" : "bg-white/20"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl p-8"
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center space-x-4">
            {currentStep === 3 ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleSave("draft")}
                  loading={loading}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200"
                >
                  Save Draft
                </Button>
                <Button
                  onClick={() => handleSave("published")}
                  loading={loading}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/25 transition-all duration-200"
                >
                  Publish Page
                </Button>
              </>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceedToNext()}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRightIcon className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CreatePageFlow;
