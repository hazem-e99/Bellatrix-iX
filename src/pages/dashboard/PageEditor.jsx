import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../../components/UI/Button";
import { Card } from "../../components/UI/Card";
import { Input } from "../../components/UI/Input";
import { usePageEditorAPI, debounce } from "../../hooks/usePageEditor";
import pagesAPI from "../../lib/pagesAPI";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon,
  Bars3Icon,
  EyeIcon,
  PencilIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const PageEditor = () => {
  const [components, setComponents] = useState([]);
  const [pageMeta, setPageMeta] = useState({ name: "", slug: "" });
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [notification, setNotification] = useState(null);
  const [changedComponents, setChangedComponents] = useState(new Set());

  const {
    saveComponent: apiSaveComponent,
    saveAllComponents: apiSaveAll,
  } = usePageEditorAPI();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Debounced auto-save function
  const debouncedAutoSave = useCallback((componentId, content) => {
    const debouncedFn = debounce(() => {
      // Auto-save functionality can be implemented here
      console.log("Auto-saving component:", componentId, content);
    }, 2000);
    debouncedFn();
  }, []);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Load page from API
  useEffect(() => {
    const page = searchParams.get("page") || "homeData";
    const load = async () => {
      try {
        // Try to search for the page by slug/name first
        const searchResults = await pagesAPI.searchPages(page);
        const foundPage = searchResults.find(
          (p) => p.slug === page || p.name === page
        );

        let pageData;
        if (foundPage) {
          pageData = await pagesAPI.getPageById(foundPage.id);
        } else {
          // Fallback: get all pages and find match
          const allPages = await pagesAPI.getPages();
          const pageMatch = allPages.find(
            (p) => p.slug === page || p.name === page
          );
          if (pageMatch) {
            pageData = await pagesAPI.getPageById(pageMatch.id);
          } else {
            throw new Error("Page not found");
          }
        }

        const comps = (pageData.components || []).map((c, idx) => ({
          // Ensure each item has a stable id for DnD; fall back to name+index
          id: `${c.componentType}-${idx}`,
          ...c,
          orderIndex: typeof c.orderIndex === "number" ? c.orderIndex : idx,
        }));
        setComponents(comps);
        setPageMeta({
          name: pageData.title || pageData.name || page,
          slug: pageData.slug || page,
        });
      } catch {
        showNotification("Could not load page data", "error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [searchParams]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems.map((item, index) => ({
          ...item,
          orderIndex: index,
        }));
      });
    }
  };

  const toggleCardExpansion = (componentId) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(componentId)) {
        newSet.delete(componentId);
      } else {
        newSet.add(componentId);
      }
      return newSet;
    });
  };

  const updateComponentContent = (componentId, newContent) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === componentId
          ? { ...comp, contentJson: JSON.stringify(newContent) }
          : comp
      )
    );
    setChangedComponents((prev) => new Set([...prev, componentId]));
    debouncedAutoSave(componentId, newContent);
  };

  const saveComponent = async (componentId) => {
    try {
      const pageId = pageMeta.slug || pageMeta.name;
      const updatedPage = {
        name: pageMeta.name,
        slug: pageMeta.slug,
        components,
      };
      await apiSaveComponent(pageId, updatedPage);
      setChangedComponents((prev) => {
        const newSet = new Set(prev);
        newSet.delete(componentId);
        return newSet;
      });
      showNotification("Component saved successfully!", "success");
    } catch {
      showNotification("Failed to save component", "error");
    }
  };

  const saveAllComponents = async () => {
    setSaving(true);
    try {
      const pageId = pageMeta.slug || pageMeta.name;
      await apiSaveAll(pageId, components);
      setChangedComponents(new Set());
      showNotification("All components saved successfully!", "success");
    } catch {
      showNotification("Failed to save page", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50"
          >
            <div
              className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
                notification.type === "success"
                  ? "bg-green-600 text-white"
                  : notification.type === "error"
                  ? "bg-red-600 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {notification.type === "success" && (
                <CheckIcon className="w-5 h-5" />
              )}
              {notification.type === "error" && (
                <ExclamationTriangleIcon className="w-5 h-5" />
              )}
              {notification.type === "info" && (
                <InformationCircleIcon className="w-5 h-5" />
              )}
              <span>{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Page Editor</h1>
            <p className="text-gray-400 text-sm">
              Drag components to reorder • Click to edit
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={previewMode ? "default" : "outline"}
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2"
            >
              <EyeIcon className="w-4 h-4" />
              {previewMode ? "Edit Mode" : "Preview"}
            </Button>
            <Button
              onClick={saveAllComponents}
              disabled={saving}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              {saving ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <CheckIcon className="w-4 h-4" />
              )}
              Save Page
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-screen">
        {/* Left Panel - Editor */}
        <div className="w-1/2 p-6 overflow-y-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={components.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {components.map((component) => (
                  <ComponentCard
                    key={component.id}
                    component={component}
                    isExpanded={expandedCards.has(component.id)}
                    hasChanges={changedComponents.has(component.id)}
                    onToggleExpansion={() => toggleCardExpansion(component.id)}
                    onUpdateContent={updateComponentContent}
                    onSave={saveComponent}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2 bg-gray-800 border-l border-gray-700">
          <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Live Preview</h2>
          </div>
          <div className="p-6">
            <PreviewPanel components={components} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sortable Component Card
const ComponentCard = ({
  component,
  isExpanded,
  hasChanges,
  onToggleExpansion,
  onUpdateContent,
  onSave,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [contentData, setContentData] = useState({});
  const [localChanges, setLocalChanges] = useState(false);

  useEffect(() => {
    try {
      setContentData(JSON.parse(component.contentJson));
    } catch (error) {
      console.error("Error parsing contentJson:", error);
      setContentData({});
    }
  }, [component.contentJson]);

  const handleFieldChange = (path, value) => {
    const newData = { ...contentData };
    setValueAtPath(newData, path, value);
    setContentData(newData);
    setLocalChanges(true);
    onUpdateContent(component.id, newData);
  };

  const handleSave = () => {
    onSave(component.id);
    setLocalChanges(false);
  };

  return (
    <motion.div ref={setNodeRef} style={style} layout className="relative">
      <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <button
              {...attributes}
              {...listeners}
              className="p-1 hover:bg-gray-700 rounded transition-colors cursor-grab active:cursor-grabbing"
            >
              <Bars3Icon className="w-5 h-5 text-gray-400" />
            </button>
            <div>
              <h3 className="font-semibold text-white flex items-center gap-2">
                {component.componentName}
                {(hasChanges || localChanges) && (
                  <span
                    className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
                    title="Unsaved changes"
                  />
                )}
              </h3>
              <p className="text-sm text-gray-400">{component.componentType}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {(hasChanges || localChanges) && (
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Save
              </Button>
            )}
            <button
              onClick={onToggleExpansion}
              className="p-2 hover:bg-gray-700 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-4">
                <DynamicForm data={contentData} onChange={handleFieldChange} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

// Dynamic Form Component
const DynamicForm = ({ data, onChange }) => {
  const renderField = (key, value, path = "") => {
    const fieldPath = path ? `${path}.${key}` : key;

    if (Array.isArray(value)) {
      return (
        <div key={key} className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const newItem =
                  typeof value[0] === "object"
                    ? Object.keys(value[0] || {}).reduce(
                        (acc, k) => ({ ...acc, [k]: "" }),
                        {}
                      )
                    : "";
                onChange(fieldPath, [...value, newItem]);
              }}
              className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <PlusIcon className="w-3 h-3 mr-1" />
              Add {key.slice(0, -1)}
            </Button>
          </div>
          <div className="space-y-2 pl-4 border-l border-gray-600">
            {value.map((item, index) => (
              <div key={index} className="flex items-start gap-2 group">
                <div className="flex-1">
                  {typeof item === "object" ? (
                    <div className="space-y-2 p-3 bg-gray-700 rounded-lg">
                      {Object.entries(item).map(([subKey, subValue]) =>
                        renderField(subKey, subValue, `${fieldPath}.${index}`)
                      )}
                    </div>
                  ) : (
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newArray = [...value];
                        newArray[index] = e.target.value;
                        onChange(fieldPath, newArray);
                      }}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder={`${key.slice(0, -1)} ${index + 1}`}
                    />
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newArray = value.filter((_, i) => i !== index);
                    onChange(fieldPath, newArray);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                >
                  <TrashIcon className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <div key={key} className="space-y-3">
          <label className="text-sm font-medium text-gray-300 capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </label>
          <div className="space-y-2 pl-4 border-l border-gray-600">
            {Object.entries(value).map(([subKey, subValue]) =>
              renderField(subKey, subValue, fieldPath)
            )}
          </div>
        </div>
      );
    }

    // Handle different input types based on key names
    const getInputType = (key, value) => {
      if (key.toLowerCase().includes("email")) return "email";
      if (
        key.toLowerCase().includes("url") ||
        key.toLowerCase().includes("link")
      )
        return "url";
      if (
        key.toLowerCase().includes("image") ||
        key.toLowerCase().includes("src")
      )
        return "url";
      if (typeof value === "number") return "number";
      return "text";
    };

    const isTextarea =
      key.toLowerCase().includes("description") ||
      key.toLowerCase().includes("content") ||
      (typeof value === "string" && value.length > 50);

    return (
      <div key={key} className="space-y-2">
        <label className="text-sm font-medium text-gray-300 capitalize">
          {key.replace(/([A-Z])/g, " $1").trim()}
        </label>
        {isTextarea ? (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(fieldPath, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder={`Enter ${key
              .replace(/([A-Z])/g, " $1")
              .trim()
              .toLowerCase()}`}
          />
        ) : (
          <Input
            type={getInputType(key, value)}
            value={value || ""}
            onChange={(e) => onChange(fieldPath, e.target.value)}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Enter ${key
              .replace(/([A-Z])/g, " $1")
              .trim()
              .toLowerCase()}`}
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {Object.entries(data).map(([key, value]) => renderField(key, value))}
    </div>
  );
};

// Preview Panel Component
const PreviewPanel = ({ components }) => {
  const renderComponentPreview = (component) => {
    let content;
    try {
      content = JSON.parse(component.contentJson);
    } catch {
      content = {};
    }

    const baseClasses =
      "mb-8 p-6 bg-gray-800 rounded-lg border border-gray-700";

    switch (component.componentType) {
      case "PayrollHeroSection":
        return (
          <div key={component.id} className={`${baseClasses} text-center`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-bold text-white">{content.title}</h1>
              <p className="text-xl text-blue-400">{content.subtitle}</p>
              <p className="text-gray-300">{content.description}</p>
              {content.ctaButton && (
                <Button className="bg-blue-600 hover:bg-blue-700">
                  {content.ctaButton.text}
                </Button>
              )}
            </motion.div>
          </div>
        );

      case "ServiceGrid":
        return (
          <div key={component.id} className={baseClasses}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">
                  {content.title}
                </h2>
                <p className="text-lg text-blue-400">{content.subtitle}</p>
                <p className="text-gray-300">{content.description}</p>
              </div>
              {content.services && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.icon}</span>
                        <div>
                          <h3 className="font-semibold text-white">
                            {service.name}
                          </h3>
                          <p className="text-sm text-gray-300">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        );

      case "HRModulesSection":
        return (
          <div key={component.id} className={baseClasses}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">
                  {content.title}
                </h2>
                <p className="text-lg text-blue-400">{content.subtitle}</p>
                <p className="text-gray-300">{content.description}</p>
              </div>
              {content.features && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {content.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-700 rounded-lg text-center hover:bg-gray-600 transition-colors"
                    >
                      <span className="text-3xl block mb-2">
                        {feature.icon}
                      </span>
                      <h3 className="font-semibold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        );

      default:
        return (
          <div key={component.id} className={`${baseClasses} text-center`}>
            <h3 className="text-lg font-medium text-white">
              {component.componentName}
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              Preview for {component.componentType}
            </p>
            <pre className="text-xs text-gray-500 mt-4 overflow-auto max-h-40">
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {components
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map(renderComponentPreview)}
    </div>
  );
};

// Helper function to set value at nested path
const setValueAtPath = (obj, path, value) => {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
};

export default PageEditor;
