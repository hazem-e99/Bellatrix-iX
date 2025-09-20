import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";
import Button from "../../UI/Button";
import { Input } from "../../UI/Input";
import Card, { CardContent, CardHeader, CardTitle } from "../../UI/Card";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ReviewAndSave = ({ pageData, onPageDataUpdate, onSave, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    status: "draft",
    meta_title: "",
    meta_description: "",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setFormData({
      title: pageData.title || "",
      slug: pageData.slug || "",
      status: pageData.status || "draft",
      meta_title: pageData.meta?.meta_title || "",
      meta_description: pageData.meta?.meta_description || "",
    });
  }, [pageData]);

  const handleFieldChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    // Auto-generate slug from title
    if (field === "title" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      newFormData.slug = slug;
      setFormData(newFormData);
    }

    // Update parent component
    onPageDataUpdate({
      title: newFormData.title,
      slug: newFormData.slug,
      status: newFormData.status,
      meta: {
        meta_title: newFormData.meta_title,
        meta_description: newFormData.meta_description,
      },
    });
  };

  const duplicateSection = (sectionUid) => {
    const sectionToDuplicate = pageData.sections.find(section => section.uid === sectionUid);
    if (sectionToDuplicate) {
      const newSection = {
        ...sectionToDuplicate,
        uid: `section-${Date.now()}`,
        order_index: pageData.sections.length,
      };
      onPageDataUpdate({
        sections: [...pageData.sections, newSection],
      });
    }
  };

  const removeSection = (sectionUid) => {
    const updatedSections = pageData.sections.filter(section => section.uid !== sectionUid);
    const reorderedSections = updatedSections.map((section, index) => ({
      ...section,
      order_index: index,
    }));
    onPageDataUpdate({
      sections: reorderedSections,
    });
  };

  const moveSection = (fromIndex, toIndex) => {
    const sections = [...pageData.sections];
    const [movedSection] = sections.splice(fromIndex, 1);
    sections.splice(toIndex, 0, movedSection);
    
    const reorderedSections = sections.map((section, index) => ({
      ...section,
      order_index: index,
    }));
    
    onPageDataUpdate({
      sections: reorderedSections,
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = pageData.sections.findIndex(section => section.uid === active.id);
      const newIndex = pageData.sections.findIndex(section => section.uid === over.id);

      const reorderedSections = arrayMove(pageData.sections, oldIndex, newIndex).map((section, index) => ({
        ...section,
        order_index: index,
      }));

      onPageDataUpdate({
        sections: reorderedSections,
      });
    }
  };

  const isFormValid = () => {
    return formData.title.trim() !== "" && formData.slug.trim() !== "";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Review & Save
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Review your page details and publish when ready
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Details Form */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Page Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Page Title *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                placeholder="Enter page title"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL Slug *
              </label>
              <Input
                value={formData.slug}
                onChange={(e) => handleFieldChange("slug", e.target.value)}
                placeholder="page-url-slug"
                className="w-full"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                URL: /{formData.slug || "page-url-slug"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleFieldChange("status", e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                SEO Meta Title
              </label>
              <Input
                value={formData.meta_title}
                onChange={(e) => handleFieldChange("meta_title", e.target.value)}
                placeholder="SEO title for search engines"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                SEO Meta Description
              </label>
              <textarea
                value={formData.meta_description}
                onChange={(e) => handleFieldChange("meta_description", e.target.value)}
                placeholder="SEO description for search engines"
                rows={3}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sections Preview */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Page Sections ({pageData.sections.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pageData.sections.length === 0 ? (
              <div className="text-center py-8">
                <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No sections added yet
                </p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={pageData.sections.map(section => section.uid)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {pageData.sections.map((section, index) => (
                      <SortableReviewSectionItem
                        key={section.uid}
                        section={section}
                        index={index}
                        onDuplicate={() => duplicateSection(section.uid)}
                        onRemove={() => removeSection(section.uid)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Validation Summary */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Validation Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              {formData.title.trim() !== "" ? (
                <CheckIcon className="h-5 w-5 text-green-500" />
              ) : (
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
              )}
              <span className={`text-sm ${
                formData.title.trim() !== "" 
                  ? "text-green-700 dark:text-green-400" 
                  : "text-red-700 dark:text-red-400"
              }`}>
                Page title is {formData.title.trim() !== "" ? "set" : "required"}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {formData.slug.trim() !== "" ? (
                <CheckIcon className="h-5 w-5 text-green-500" />
              ) : (
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
              )}
              <span className={`text-sm ${
                formData.slug.trim() !== "" 
                  ? "text-green-700 dark:text-green-400" 
                  : "text-red-700 dark:text-red-400"
              }`}>
                URL slug is {formData.slug.trim() !== "" ? "set" : "required"}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {pageData.sections.length > 0 ? (
                <CheckIcon className="h-5 w-5 text-green-500" />
              ) : (
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
              )}
              <span className={`text-sm ${
                pageData.sections.length > 0 
                  ? "text-green-700 dark:text-green-400" 
                  : "text-yellow-700 dark:text-yellow-400"
              }`}>
                {pageData.sections.length} section{pageData.sections.length !== 1 ? 's' : ''} added
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {formData.meta_title.trim() !== "" ? (
                <CheckIcon className="h-5 w-5 text-green-500" />
              ) : (
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />
              )}
              <span className={`text-sm ${
                formData.meta_title.trim() !== "" 
                  ? "text-green-700 dark:text-green-400" 
                  : "text-yellow-700 dark:text-yellow-400"
              }`}>
                SEO meta title is {formData.meta_title.trim() !== "" ? "set" : "optional"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Actions */}
      <div className="flex items-center justify-center space-x-4 pt-6">
        <Button
          variant="outline"
          onClick={() => onSave("draft")}
          loading={loading}
          disabled={!isFormValid()}
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Save as Draft
        </Button>
        <Button
          onClick={() => onSave("published")}
          loading={loading}
          disabled={!isFormValid()}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Publish Page
        </Button>
      </div>
    </div>
  );
};

// Sortable Review Section Item Component
const SortableReviewSectionItem = ({ section, index, onDuplicate, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.uid });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600 ${
        isDragging ? "shadow-lg ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:cursor-grabbing p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
          >
            <Bars3BottomLeftIcon className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-lg">{section.icon || "📄"}</div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              {section.name}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {section.componentId}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            size="sm"
            variant="outline"
            onClick={onDuplicate}
            className="hover:bg-green-50 hover:border-green-300"
          >
            <DocumentDuplicateIcon className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onRemove}
            className="hover:bg-red-50 hover:border-red-300 text-red-600"
          >
            <TrashIcon className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewAndSave;
