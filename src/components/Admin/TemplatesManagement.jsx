import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Button from "../ui/Button";
import { Input } from "../ui/Input";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import Modal, { ModalFooter } from "../ui/Modal";

const TemplatesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [detailModal, setDetailModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    template: null,
  });

  // Mock template data
  const templates = [
    {
      id: 1,
      name: "Hero Section - Modern",
      description:
        "A modern hero section with gradient background and call-to-action buttons",
      category: "Hero",
      thumbnail: "/api/placeholder/400/300",
      author: "Admin",
      createdDate: "2024-01-15",
      usageCount: 12,
      tags: ["modern", "gradient", "cta"],
      isFavorite: true,
      fields: [
        { name: "title", type: "text", label: "Hero Title" },
        { name: "subtitle", type: "text", label: "Subtitle" },
        { name: "ctaText", type: "text", label: "CTA Button Text" },
        { name: "backgroundImage", type: "image", label: "Background Image" },
      ],
    },
    {
      id: 2,
      name: "Service Cards Grid",
      description:
        "Responsive grid layout for showcasing services with icons and descriptions",
      category: "Services",
      thumbnail: "/api/placeholder/400/300",
      author: "Admin",
      createdDate: "2024-01-14",
      usageCount: 8,
      tags: ["grid", "cards", "services"],
      isFavorite: false,
      fields: [
        { name: "title", type: "text", label: "Section Title" },
        { name: "services", type: "array", label: "Services List" },
      ],
    },
    {
      id: 3,
      name: "Contact Form - Clean",
      description: "Clean and simple contact form with validation",
      category: "Forms",
      thumbnail: "/api/placeholder/400/300",
      author: "Admin",
      createdDate: "2024-01-13",
      usageCount: 15,
      tags: ["form", "contact", "clean"],
      isFavorite: true,
      fields: [
        { name: "title", type: "text", label: "Form Title" },
        { name: "subtitle", type: "text", label: "Form Subtitle" },
        { name: "fields", type: "array", label: "Form Fields" },
      ],
    },
    {
      id: 4,
      name: "Team Members Grid",
      description:
        "Professional team member showcase with photos and social links",
      category: "About",
      thumbnail: "/api/placeholder/400/300",
      author: "Admin",
      createdDate: "2024-01-12",
      usageCount: 6,
      tags: ["team", "about", "grid"],
      isFavorite: false,
      fields: [
        { name: "title", type: "text", label: "Section Title" },
        { name: "members", type: "array", label: "Team Members" },
      ],
    },
    {
      id: 5,
      name: "Testimonials Slider",
      description:
        "Dynamic testimonials slider with customer reviews and ratings",
      category: "Testimonials",
      thumbnail: "/api/placeholder/400/300",
      author: "Admin",
      createdDate: "2024-01-11",
      usageCount: 9,
      tags: ["testimonials", "slider", "reviews"],
      isFavorite: false,
      fields: [
        { name: "title", type: "text", label: "Section Title" },
        { name: "testimonials", type: "array", label: "Testimonials" },
      ],
    },
    {
      id: 6,
      name: "Pricing Tables",
      description: "Professional pricing tables with feature comparison",
      category: "Pricing",
      thumbnail: "/api/placeholder/400/300",
      author: "Admin",
      createdDate: "2024-01-10",
      usageCount: 4,
      tags: ["pricing", "tables", "comparison"],
      isFavorite: true,
      fields: [
        { name: "title", type: "text", label: "Section Title" },
        { name: "plans", type: "array", label: "Pricing Plans" },
      ],
    },
  ];

  const categories = [
    "all",
    "Hero",
    "Services",
    "Forms",
    "About",
    "Testimonials",
    "Pricing",
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      filterCategory === "all" || template.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (templateId) => {
    console.log("Toggle favorite for template:", templateId);
    // Implement favorite toggle logic
  };

  const duplicateTemplate = (template) => {
    console.log("Duplicate template:", template);
    // Implement template duplication logic
  };

  const openDetailModal = (template) => {
    setSelectedTemplate(template);
    setDetailModal(true);
  };

  const stats = [
    {
      label: "Total Templates",
      value: templates.length,
      color: "blue",
    },
    {
      label: "Categories",
      value: categories.length - 1, // Exclude 'all'
      color: "purple",
    },
    {
      label: "Total Usage",
      value: templates.reduce((sum, t) => sum + t.usageCount, 0),
      color: "green",
    },
    {
      label: "Favorites",
      value: templates.filter((t) => t.isFavorite).length,
      color: "red",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Templates Management
          </h2>
          <p className="text-gray-600">
            Manage and organize your design templates
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button icon={<PlusIcon className="h-4 w-4" />} className="bg-blue-600 hover:bg-blue-700 text-white">
            Create Template
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-white border border-gray-200 shadow-lg">
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search templates..."
                icon={<MagnifyingGlassIcon className="h-4 w-4" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
              {/* Template Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PhotoIcon className="h-12 w-12 text-blue-400" />
                </div>
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => toggleFavorite(template.id)}
                    className="p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110"
                  >
                    {template.isFavorite ? (
                      <HeartIconSolid className="h-4 w-4 text-red-500" />
                    ) : (
                      <HeartIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <CardContent>
                <div className="space-y-3">
                  {/* Template Info */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">
                        {template.name}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                        {template.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {template.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <UserIcon className="h-3 w-3" />
                      <span>{template.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <EyeIcon className="h-3 w-3" />
                      <span>{template.usageCount} uses</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDetailModal(template)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => duplicateTemplate(template)}
                      >
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setDeleteModal({ open: true, template })}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No templates found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or filters
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create Your First Template</Button>
        </motion.div>
      )}

      {/* Template Detail Modal */}
      <Modal
        isOpen={detailModal}
        onClose={() => setDetailModal(false)}
        title="Template Details"
        size="xl"
      >
        {selectedTemplate && (
          <div className="space-y-6">
            {/* Template Header */}
            <div className="flex items-start space-x-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center">
                <PhotoIcon className="h-8 w-8 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {selectedTemplate.name}
                  </h3>
                  <button
                    onClick={() => toggleFavorite(selectedTemplate.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {selectedTemplate.isFavorite ? (
                      <HeartIconSolid className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-gray-600 mt-1">
                  {selectedTemplate.description}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{selectedTemplate.createdDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <UserIcon className="h-4 w-4" />
                    <span>{selectedTemplate.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <EyeIcon className="h-4 w-4" />
                    <span>{selectedTemplate.usageCount} uses</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Fields */}
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-4">
                Template Fields
              </h4>
              <div className="space-y-3">
                {selectedTemplate.fields.map((field, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {field.label}
                      </p>
                      <p className="text-sm text-gray-600">
                        Field: {field.name} • Type: {field.type}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                      {field.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-3">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    <TagIcon className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        <ModalFooter>
          <Button variant="outline" onClick={() => setDetailModal(false)}>
            Close
          </Button>
          <Button onClick={() => duplicateTemplate(selectedTemplate)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
            Duplicate
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <PencilIcon className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, template: null })}
        title="Delete Template"
        size="sm"
      >
        {deleteModal.template && (
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete the template "
              {deleteModal.template.name}"? This action cannot be undone.
            </p>
          </div>
        )}
        <ModalFooter>
          <Button
            variant="outline"
            onClick={() => setDeleteModal({ open: false, template: null })}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              console.log("Delete template:", deleteModal.template);
              setDeleteModal({ open: false, template: null });
            }}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default TemplatesManagement;
