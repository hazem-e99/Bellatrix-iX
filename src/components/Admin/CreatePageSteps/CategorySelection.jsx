import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Card, { CardContent, CardHeader, CardTitle } from "../../ui/Card";
import Button from "../../ui/Button";

const CategorySelection = ({ selectedCategory, onCategorySelect, selectedPage, onPageSelect }) => {
  const [categories, setCategories] = useState([]);
  const [availablePages, setAvailablePages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localSelectedPage, setLocalSelectedPage] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchAvailablePages();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      // Define available categories based on navbar structure
      const availableCategories = [
        {
          id: "services",
          name: "Services",
          description: "Professional services and consultation",
          subCategories: [
            "support", 
            "implementation", 
            "training", 
            "netsuite-consulting", 
            "customization", 
            "integration"
          ],
          templateId: "services-default",
          preview: "/images/ourProServices.png",
          color: "from-blue-500 to-blue-600",
        },
        {
          id: "solutions",
          name: "Solutions",
          description: "Comprehensive business solutions",
          subCategories: ["payroll", "hr"],
          templateId: "solutions-default",
          preview: "/images/solution.jpg",
          color: "from-purple-500 to-purple-600",
        },
        {
          id: "industries",
          name: "Industries",
          description: "Industry-specific solutions and expertise",
          subCategories: ["manufacturing", "retail"],
          templateId: "industries-default",
          preview: "/images/indleaders.jpg",
          color: "from-green-500 to-green-600",
        },
        {
          id: "about",
          name: "About",
          description: "Company information and team",
          subCategories: ["company", "team", "mission"],
          templateId: "about-default",
          preview: "/images/about.jpg",
          color: "from-orange-500 to-orange-600",
        },
      ];

      setCategories(availableCategories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailablePages = async () => {
    try {
      // Map data files to categories
      const pageMapping = {
        services: [
          { name: "Implementation", file: "Implementation.json", description: "Implementation services page" },
          { name: "Training", file: "training.json", description: "Training programs page" },
          { name: "NetSuite Consulting", file: "netSuiteConsulting.json", description: "NetSuite consulting services" },
          { name: "Customization", file: "customization.json", description: "Customization services" },
          { name: "Integration", file: "integration-data.json", description: "Integration services" }
        ],
        solutions: [
          { name: "HR Solution", file: "hr.json", description: "HR and people management solution" },
          { name: "Payroll Solution", file: "payroll.json", description: "Payroll management solution" }
        ],
        industries: [
          { name: "Manufacturing", file: "manufacturing-data.json", description: "Manufacturing industry solutions" },
          { name: "Retail", file: "retail-data.json", description: "Retail industry solutions" }
        ],
        about: [
          { name: "About Us", file: "about.json", description: "Company information and team" }
        ]
      };

      setAvailablePages(pageMapping);
    } catch (err) {
      console.error('Error fetching available pages:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <ArrowPathIcon className="h-5 w-5 animate-spin text-blue-500" />
          <span className="text-gray-600 dark:text-gray-400">
            Loading categories...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Error Loading Categories
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button onClick={fetchCategories} variant="outline">
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
          Choose a Category
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Select a category to get started with your page template
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <AnimatePresence>
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 hover:shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10 ${
                  selectedCategory?.id === category.id
                    ? "ring-2 ring-blue-400 shadow-2xl shadow-blue-500/25 bg-white/10"
                    : "hover:shadow-xl hover:bg-white/10 hover:border-white/20"
                }`}
                onClick={() => onCategorySelect(category)}
              >
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${category.color} shadow-lg`}>
                      <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-800">
                          {category.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    {selectedCategory?.id === category.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="p-3 bg-green-500 rounded-full shadow-lg"
                      >
                        <CheckIcon className="h-6 w-6 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6 text-base leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-white/90">
                      Available Sub-categories:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.subCategories.map((subCat) => (
                        <span
                          key={subCat}
                          className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 text-xs rounded-full border border-white/20"
                        >
                          {subCat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {category.preview && (
                    <div className="mt-6">
                      <div className="w-full h-40 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
                        <img
                          src={category.preview}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-500/10 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
              <CheckIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-1">
                {selectedCategory.name} Selected
              </h3>
              <p className="text-blue-300 text-base">
                You can now proceed to build your page with {selectedCategory.name.toLowerCase()} components.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Available Pages Selection */}
      {selectedCategory && availablePages[selectedCategory.id] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              Choose a Base Page
            </h3>
            <p className="text-gray-300">
              Select an existing page to use as a foundation for your new page
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availablePages[selectedCategory.id].map((page, index) => (
              <motion.div
                key={page.file}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10 ${
                    localSelectedPage?.file === page.file
                      ? "ring-2 ring-blue-400 shadow-2xl shadow-blue-500/25 bg-white/10"
                      : "hover:shadow-xl hover:bg-white/10 hover:border-white/20"
                  }`}
                  onClick={() => {
                    setLocalSelectedPage(page);
                    onPageSelect(page);
                  }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedCategory.color} shadow-lg`}>
                        <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
                          <span className="text-lg font-bold text-gray-800">
                            {page.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      {localSelectedPage?.file === page.file && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="p-2 bg-green-500 rounded-full shadow-lg"
                        >
                          <CheckIcon className="h-5 w-5 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <CardTitle className="text-lg font-bold text-white">
                      {page.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4 text-sm">
                      {page.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                        {page.file}
                      </span>
                      <span className="text-xs text-blue-400">
                        Use as base
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {localSelectedPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-green-500/10 backdrop-blur-sm border border-green-400/30 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500 rounded-xl shadow-lg">
                  <CheckIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-1">
                    {localSelectedPage.name} Selected
                  </h3>
                  <p className="text-green-300 text-base">
                    You will build your new page based on the sections from "{localSelectedPage.name}".
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CategorySelection;
