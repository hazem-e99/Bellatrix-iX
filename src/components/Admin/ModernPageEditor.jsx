import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from '../UI/Button';
import Card from '../UI/Card';
import { Input } from '../UI/Input';
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
  Cog6ToothIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

const ModernPageEditor = ({ pageData, onSave, isLoading = false }) => {
  const [components, setComponents] = useState([]);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [changedComponents, setChangedComponents] = useState(new Set());
  const [notification, setNotification] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Initialize components from pageData
  useEffect(() => {
    if (pageData?.components) {
      const comps = pageData.components.map((comp, idx) => ({
        id: `comp-${idx}-${comp.componentType}`,
        ...comp,
        orderIndex: typeof comp.orderIndex === 'number' ? comp.orderIndex : idx,
      }));
      setComponents(comps);
    }
  }, [pageData]);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems.map((item, index) => ({
          ...item,
          orderIndex: index
        }));
      });
      
      setChangedComponents(new Set(components.map(c => c.id)));
      showNotification('Components reordered - remember to save!', 'info');
    }
  };

  const toggleCardExpansion = (componentId) => {
    setExpandedCards(prev => {
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
    setComponents(prev => 
      prev.map(comp => 
        comp.id === componentId 
          ? { ...comp, contentJson: JSON.stringify(newContent) }
          : comp
      )
    );
    setChangedComponents(prev => new Set([...prev, componentId]));
  };

  const saveComponent = async (componentId) => {
    try {
      const updatedPageData = {
        ...pageData,
        components: components.map(comp => ({
          componentType: comp.componentType,
          componentName: comp.componentName,
          contentJson: comp.contentJson,
          orderIndex: comp.orderIndex,
        }))
      };
      
      await onSave(updatedPageData);
      setChangedComponents(prev => {
        const newSet = new Set(prev);
        newSet.delete(componentId);
        return newSet;
      });
      showNotification('Component saved successfully!', 'success');
      
      // Trigger a page refresh hint for the public page
      if (pageData.slug) {
        window.dispatchEvent(new CustomEvent('pageDataUpdated', { 
          detail: { slug: pageData.slug, timestamp: Date.now() } 
        }));
      }
    } catch (error) {
      showNotification('Failed to save component', 'error');
    }
  };

  const saveAllComponents = async () => {
    try {
      const updatedPageData = {
        ...pageData,
        components: components.map(comp => ({
          componentType: comp.componentType,
          componentName: comp.componentName,
          contentJson: comp.contentJson,
          orderIndex: comp.orderIndex,
        }))
      };
      
      await onSave(updatedPageData);
      setChangedComponents(new Set());
      showNotification('All components saved successfully!', 'success');
      
      // Trigger a page refresh hint for the public page
      if (pageData.slug) {
        // Dispatch a custom event that the public page can listen to
        window.dispatchEvent(new CustomEvent('pageDataUpdated', { 
          detail: { slug: pageData.slug, timestamp: Date.now() } 
        }));
      }
    } catch (error) {
      showNotification('Failed to save page', 'error');
    }
  };

  const duplicateComponent = (componentId) => {
    const component = components.find(c => c.id === componentId);
    if (component) {
      const newComponent = {
        ...component,
        id: `comp-${Date.now()}-${component.componentType}`,
        componentName: `${component.componentName} (Copy)`,
        orderIndex: components.length,
      };
      setComponents(prev => [...prev, newComponent]);
      setExpandedCards(prev => new Set([...prev, newComponent.id]));
      setChangedComponents(prev => new Set([...prev, newComponent.id]));
      showNotification('Component duplicated!', 'success');
    }
  };

  const deleteComponent = (componentId) => {
    if (window.confirm('Are you sure you want to delete this component?')) {
      setComponents(prev => prev.filter(c => c.id !== componentId));
      setExpandedCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(componentId);
        return newSet;
      });
      setChangedComponents(prev => {
        const newSet = new Set(prev);
        newSet.delete(componentId);
        return newSet;
      });
      showNotification('Component deleted!', 'info');
    }
  };

  if (!pageData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">No page data available</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50"
          >
            <div className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
              notification.type === 'success' ? 'bg-green-600 text-white' :
              notification.type === 'error' ? 'bg-red-600 text-white' :
              'bg-blue-600 text-white'
            }`}>
              {notification.type === 'success' && <CheckIcon className="w-5 h-5" />}
              {notification.type === 'error' && <ExclamationTriangleIcon className="w-5 h-5" />}
              {notification.type === 'info' && <InformationCircleIcon className="w-5 h-5" />}
              <span>{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit Page: {pageData.name || 'Untitled'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Drag components to reorder • Click to edit • {components.length} components
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
              disabled={isLoading || changedComponents.size === 0}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <CheckIcon className="w-4 h-4" />
              )}
              Save Page ({changedComponents.size})
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Editor */}
        <div className="w-1/2 p-6 overflow-y-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={components.map(c => c.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {components.length === 0 ? (
                  <div className="text-center py-12">
                    <Cog6ToothIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No Components Found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      This page doesn't have any components to edit yet.
                    </p>
                  </div>
                ) : (
                  components
                    .sort((a, b) => a.orderIndex - b.orderIndex)
                    .map((component) => (
                      <ComponentCard
                        key={component.id}
                        component={component}
                        isExpanded={expandedCards.has(component.id)}
                        hasChanges={changedComponents.has(component.id)}
                        onToggleExpansion={() => toggleCardExpansion(component.id)}
                        onUpdateContent={updateComponentContent}
                        onSave={() => saveComponent(component.id)}
                        onDuplicate={() => duplicateComponent(component.id)}
                        onDelete={() => deleteComponent(component.id)}
                      />
                    ))
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2 bg-gray-100 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
          <div className="sticky top-0 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Live Preview</h2>
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
  onDuplicate,
  onDelete
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
      console.error('Error parsing contentJson:', error);
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
    onSave();
    setLocalChanges(false);
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      className="relative"
    >
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 shadow-sm hover:shadow-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <button
              {...attributes}
              {...listeners}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors cursor-grab active:cursor-grabbing"
            >
              <Bars3Icon className="w-5 h-5 text-gray-400" />
            </button>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                {component.componentName}
                {(hasChanges || localChanges) && (
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" title="Unsaved changes" />
                )}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{component.componentType}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onDuplicate}
              className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <DocumentDuplicateIcon className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onDelete}
              className="border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
            {(hasChanges || localChanges) && (
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </Button>
            )}
            <button
              onClick={onToggleExpansion}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
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
                <DynamicForm
                  data={contentData}
                  onChange={handleFieldChange}
                />
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
  const renderField = (key, value, path = '') => {
    const fieldPath = path ? `${path}.${key}` : key;
    
    if (Array.isArray(value)) {
      return (
        <div key={key} className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const newItem = typeof value[0] === 'object' 
                  ? Object.keys(value[0] || {}).reduce((acc, k) => ({ ...acc, [k]: '' }), {})
                  : '';
                onChange(fieldPath, [...value, newItem]);
              }}
              className="text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <PlusIcon className="w-3 h-3 mr-1" />
              Add {key.slice(0, -1)}
            </Button>
          </div>
          <div className="space-y-2 pl-4 border-l border-gray-200 dark:border-gray-600">
            {value.map((item, index) => (
              <div key={index} className="flex items-start gap-2 group">
                <div className="flex-1">
                  {typeof item === 'object' ? (
                    <div className="space-y-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
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
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
                  className="opacity-0 group-hover:opacity-100 transition-opacity border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <TrashIcon className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (typeof value === 'object' && value !== null) {
      return (
        <div key={key} className="space-y-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <div className="space-y-2 pl-4 border-l border-gray-200 dark:border-gray-600">
            {Object.entries(value).map(([subKey, subValue]) =>
              renderField(subKey, subValue, fieldPath)
            )}
          </div>
        </div>
      );
    }
    
    // Handle different input types based on key names and values
    const getInputType = (key, value) => {
      if (key.toLowerCase().includes('email')) return 'email';
      if (key.toLowerCase().includes('url') || key.toLowerCase().includes('link')) return 'url';
      if (key.toLowerCase().includes('image') || key.toLowerCase().includes('src')) return 'url';
      if (typeof value === 'number') return 'number';
      return 'text';
    };
    
    const isTextarea = key.toLowerCase().includes('description') || 
                      key.toLowerCase().includes('content') ||
                      (typeof value === 'string' && value.length > 50);
    
    return (
      <div key={key} className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </label>
        {isTextarea ? (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(fieldPath, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
          />
        ) : (
          <Input
            type={getInputType(key, value)}
            value={value || ''}
            onChange={(e) => onChange(fieldPath, e.target.value)}
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
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

    const baseClasses = "mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm";

    switch (component.componentType) {
      case 'PayrollHeroSection':
        return (
          <div key={component.id} className={`${baseClasses} text-center`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{content.title}</h1>
              <p className="text-xl text-blue-600 dark:text-blue-400">{content.subtitle}</p>
              <p className="text-gray-600 dark:text-gray-300">{content.description}</p>
              {content.ctaButton && (
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  {content.ctaButton.text}
                </Button>
              )}
            </motion.div>
          </div>
        );

      case 'ServiceGrid':
        return (
          <div key={component.id} className={baseClasses}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{content.title}</h2>
                <p className="text-lg text-blue-600 dark:text-blue-400">{content.subtitle}</p>
                <p className="text-gray-600 dark:text-gray-300">{content.description}</p>
              </div>
              {content.services && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{service.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        );

      case 'HRModulesSection':
        return (
          <div key={component.id} className={baseClasses}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{content.title}</h2>
                <p className="text-lg text-blue-600 dark:text-blue-400">{content.subtitle}</p>
                <p className="text-gray-600 dark:text-gray-300">{content.description}</p>
              </div>
              {content.features && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {content.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <span className="text-3xl block mb-2">{feature.icon}</span>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        );

      case 'PayrollFAQSection':
        return (
          <div key={component.id} className={baseClasses}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{content.title}</h2>
                <p className="text-lg text-blue-600 dark:text-blue-400">{content.subtitle}</p>
              </div>
              {content.faqs && (
                <div className="space-y-4">
                  {content.faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
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
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{component.componentName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Preview for {component.componentType}</p>
            <pre className="text-xs text-gray-500 dark:text-gray-400 mt-4 overflow-auto max-h-40 bg-gray-50 dark:bg-gray-700 p-3 rounded">
              {JSON.stringify(content, null, 2)}
            </pre>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {components.length === 0 ? (
        <div className="text-center py-12">
          <EyeIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Preview Available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Add components to see them previewed here.
          </p>
        </div>
      ) : (
        components
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map(renderComponentPreview)
      )}
    </div>
  );
};

// Helper function to set value at nested path
const setValueAtPath = (obj, path, value) => {
  const keys = path.split('.');
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

export default ModernPageEditor;
