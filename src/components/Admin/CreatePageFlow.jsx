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
import Button from "../UI/Button";
import Card, { CardContent, CardHeader, CardTitle } from "../UI/Card";
import Toast from "../UI/Toast";

// Import step components
import CategorySelection from "./CreatePageSteps/CategorySelection";
import PageBuilder from "./CreatePageSteps/PageBuilder";
import ReviewAndSave from "./CreatePageSteps/ReviewAndSave";

const CreatePageFlow = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
      title: "Category",
      description: "Choose a category",
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
    setPageData(prev => ({
      ...prev,
      category: category.id,
      subCategory: category.subCategory || "",
      templateId: category.templateId || "",
    }));
  };

  const handleSectionsUpdate = (sections) => {
    setPageData(prev => ({
      ...prev,
      sections: sections,
    }));
  };

  const handlePageDataUpdate = (updates) => {
    setPageData(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedCategory !== null;
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
      
      const pagePayload = {
        ...pageData,
        status,
        updated_at: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:3001/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: pageData.slug,
          data: pagePayload,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save page");
      }

      const result = await response.json();
      
      showToast(
        `Page "${pageData.title}" ${status === "published" ? "published" : "saved as draft"} successfully!`,
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
          />
        );
      case 2:
        return (
          <PageBuilder
            category={selectedCategory}
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create New Page
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Build a custom page using our drag-and-drop page builder
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/pages")}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
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
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                        isActive
                          ? "border-blue-500 bg-blue-500 text-white"
                          : isCompleted
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isCompleted ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        <IconComponent className="h-5 w-5" />
                      )}
                    </motion.div>
                    <div className="ml-3">
                      <p
                        className={`text-sm font-medium ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400"
                            : isCompleted
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        isCompleted
                          ? "bg-green-500"
                          : "bg-gray-300 dark:bg-gray-600"
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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center space-x-3">
            {currentStep === 3 ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleSave("draft")}
                  loading={loading}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Save Draft
                </Button>
                <Button
                  onClick={() => handleSave("published")}
                  loading={loading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Publish Page
                </Button>
              </>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceedToNext()}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
