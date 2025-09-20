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
import Button from "../../ui/Button";
import { Input } from "../../ui/Input";
import Card, { CardContent, CardHeader, CardTitle } from "../../ui/Card";
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
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
          Review & Save
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Review your page details and publish when ready
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Page Details Form */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white text-xl font-bold">
              Page Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Page Title *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                placeholder="Enter page title"
                className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                URL Slug *
              </label>
              <Input
                value={formData.slug}
                onChange={(e) => handleFieldChange("slug", e.target.value)}
                placeholder="page-url-slug"
                className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20"
              />
              <p className="text-sm text-gray-300 mt-2">
                URL: /{formData.slug || "page-url-slug"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleFieldChange("status", e.target.value)}
                className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/20 shadow-sm"
              >
                <option value="draft" className="bg-gray-800 text-white">Draft</option>
                <option value="published" className="bg-gray-800 text-white">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                SEO Meta Title
              </label>
              <Input
                value={formData.meta_title}
                onChange={(e) => handleFieldChange("meta_title", e.target.value)}
                placeholder="SEO title for search engines"
                className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                SEO Meta Description
              </label>
              <textarea
                value={formData.meta_description}
                onChange={(e) => handleFieldChange("meta_description", e.target.value)}
                placeholder="SEO description for search engines"
                rows={3}
                className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sections Preview */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white text-xl font-bold">
              Page Sections ({pageData.sections.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pageData.sections.length === 0 ? (
              <div className="text-center py-12">
                <DocumentTextIcon className="h-16 w-16 text-white/40 mx-auto mb-4" />
                <p className="text-gray-300 text-base">
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
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl font-bold">
            Validation Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              {formData.title.trim() !== "" ? (
                <CheckIcon className="h-6 w-6 text-green-400" />
              ) : (
                <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
              )}
              <span className={`text-base ${
                formData.title.trim() !== "" 
                  ? "text-green-300" 
                  : "text-red-300"
              }`}>
                Page title is {formData.title.trim() !== "" ? "set" : "required"}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {formData.slug.trim() !== "" ? (
                <CheckIcon className="h-6 w-6 text-green-400" />
              ) : (
                <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
              )}
              <span className={`text-base ${
                formData.slug.trim() !== "" 
                  ? "text-green-300" 
                  : "text-red-300"
              }`}>
                URL slug is {formData.slug.trim() !== "" ? "set" : "required"}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {pageData.sections.length > 0 ? (
                <CheckIcon className="h-6 w-6 text-green-400" />
              ) : (
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
              )}
              <span className={`text-base ${
                pageData.sections.length > 0 
                  ? "text-green-300" 
                  : "text-yellow-300"
              }`}>
                {pageData.sections.length} section{pageData.sections.length !== 1 ? 's' : ''} added
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {formData.meta_title.trim() !== "" ? (
                <CheckIcon className="h-6 w-6 text-green-400" />
              ) : (
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
              )}
              <span className={`text-base ${
                formData.meta_title.trim() !== "" 
                  ? "text-green-300" 
                  : "text-yellow-300"
              }`}>
                SEO meta title is {formData.meta_title.trim() !== "" ? "set" : "optional"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Actions */}
      <div className="flex items-center justify-center space-x-6 pt-8">
        <Button
          variant="outline"
          onClick={() => onSave("draft")}
          loading={loading}
          disabled={!isFormValid()}
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save as Draft
        </Button>
        <Button
          onClick={() => onSave("published")}
          loading={loading}
          disabled={!isFormValid()}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
      className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20 ${
        isDragging ? "shadow-2xl ring-2 ring-blue-400" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:cursor-grabbing p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Bars3BottomLeftIcon className="h-5 w-5 text-white/60" />
          </div>
          <div className="text-xl">{section.icon || "📄"}</div>
          <div>
            <h4 className="text-base font-semibold text-white">
              {section.name}
            </h4>
            <p className="text-sm text-gray-300">
              {section.componentId}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onDuplicate}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-green-500/20 hover:border-green-400 transition-all duration-200"
          >
            <DocumentDuplicateIcon className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onRemove}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-red-500/20 hover:border-red-400 transition-all duration-200"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewAndSave;
