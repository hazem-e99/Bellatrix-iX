import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Card, { CardContent, CardHeader, CardTitle } from "../../UI/Card";
import Button from "../../UI/Button";

const CategorySelection = ({ selectedCategory, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
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
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose a Category
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select a category to get started with your page template
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-200 hover:shadow-xl ${
                  selectedCategory?.id === category.id
                    ? "ring-2 ring-blue-500 shadow-xl"
                    : "hover:shadow-lg"
                }`}
                onClick={() => onCategorySelect(category)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} shadow-lg`}>
                      <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-800">
                          {category.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    {selectedCategory?.id === category.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="p-2 bg-green-500 rounded-full"
                      >
                        <CheckIcon className="h-5 w-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {category.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Available Sub-categories:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.subCategories.map((subCat) => (
                        <span
                          key={subCat}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          {subCat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {category.preview && (
                    <div className="mt-4">
                      <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <img
                          src={category.preview}
                          alt={category.name}
                          className="w-full h-full object-cover"
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
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <CheckIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                {selectedCategory.name} Selected
              </h3>
              <p className="text-blue-700 dark:text-blue-300">
                You can now proceed to build your page with {selectedCategory.name.toLowerCase()} components.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CategorySelection;
