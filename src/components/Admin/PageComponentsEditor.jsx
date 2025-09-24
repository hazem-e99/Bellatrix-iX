import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal, { ModalFooter } from "../ui/Modal";
import DynamicFormField from "../ui/DynamicFormField";
import pagesAPI from "../../lib/pagesAPI";
import { 
  parseJsonToFormFields, 
  generateFormFieldsFromJson, 
  updateJsonFromFormFields 
} from "../../utils/jsonFormUtils";

const PageComponentsEditor = ({ pageId, pageName, onClose, onSave, showToast }) => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingComponent, setEditingComponent] = useState(null);
  const [errors, setErrors] = useState({});

  // Load components on mount
  useEffect(() => {
    loadComponents();
  }, [pageId]);

  const loadComponents = async () => {
    try {
      setLoading(true);
      const comps = await pagesAPI.getPageComponents(pageId);
      setComponents(comps);
    } catch (error) {
      console.error("Error loading components:", error);
      showToast("Error loading page components", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComponent = async (componentData) => {
    try {
      setSaving(true);
      const newComponent = await pagesAPI.createPageComponent(pageId, {
        ...componentData,
        orderIndex: components.length + 1
      });
      
      setComponents(prev => [...prev, newComponent]);
      setShowAddModal(false);
      showToast("Component added successfully", "success");
    } catch (error) {
      console.error("Error adding component:", error);
      showToast("Error adding component: " + error.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateComponent = async (componentId, componentData) => {
    try {
      setSaving(true);
      const updatedComponent = await pagesAPI.updatePageComponent(componentId, componentData);
      
      setComponents(prev => 
        prev.map(comp => comp.id === componentId ? updatedComponent : comp)
      );
      setEditingComponent(null);
      showToast("Component updated successfully", "success");
    } catch (error) {
      console.error("Error updating component:", error);
      showToast("Error updating component: " + error.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteComponent = async (componentId) => {
    if (!window.confirm("Are you sure you want to delete this component?")) {
      return;
    }

    try {
      setSaving(true);
      await pagesAPI.deletePageComponent(componentId);
      
      setComponents(prev => prev.filter(comp => comp.id !== componentId));
      showToast("Component deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting component:", error);
      showToast("Error deleting component: " + error.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = async (fromIndex, toIndex) => {
    // Show loading state
    setSaving(true);
    
    const newComponents = [...components];
    const [movedComponent] = newComponents.splice(fromIndex, 1);
    newComponents.splice(toIndex, 0, movedComponent);

    // Update orderIndex for all components
    const reorderedComponents = newComponents.map((comp, index) => ({
      ...comp,
      orderIndex: index + 1
    }));

    // Optimistically update UI first
    setComponents(reorderedComponents);

    try {
      console.log(`Reordering components: ${reorderedComponents.map(comp => comp.id).join(', ')}`);
      
      await pagesAPI.reorderPageComponents(pageId, reorderedComponents);
      showToast("Components reordered successfully", "success");
    } catch (error) {
      console.error("Error reordering components:", error);
      
      // Show specific error message
      let errorMessage = "Error reordering components";
      if (error.message.includes("circular dependency")) {
        errorMessage = "Unable to reorder components due to a conflict. Please try again.";
      } else if (error.message.includes("not found")) {
        errorMessage = "One or more components could not be found. Please refresh and try again.";
      } else {
        errorMessage = `Error reordering components: ${error.message}`;
      }
      
      showToast(errorMessage, "error");
      
      // Revert on error by reloading components
      console.log("Reverting component order due to error...");
      await loadComponents();
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <ArrowPathIcon className="h-5 w-5 animate-spin text-blue-500" />
          <span className="text-gray-300">Loading components...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Page Components</h2>
          <p className="text-xs text-gray-300">Manage components for "{pageName}"</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1 text-sm px-3 py-1"
          >
            <PlusIcon className="h-3 w-3" />
            <span>Add</span>
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-sm px-3 py-1"
          >
            Close
          </Button>
        </div>
      </div>

      {/* Components List */}
      <div className="space-y-4">
        {components.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Components</h3>
            <p className="text-gray-300 mb-4">This page doesn't have any components yet.</p>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add First Component
            </Button>
          </div>
        ) : (
          components.map((component, index) => (
            <ComponentCard
              key={component.id}
              component={component}
              index={index}
              onEdit={() => setEditingComponent(component)}
              onDelete={() => handleDeleteComponent(component.id)}
              onMoveUp={index > 0 ? () => handleReorder(index, index - 1) : null}
              onMoveDown={index < components.length - 1 ? () => handleReorder(index, index + 1) : null}
              isReordering={saving}
            />
          ))
        )}
      </div>

      {/* Add Component Modal */}
      <AddComponentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddComponent}
        loading={saving}
      />

      {/* Edit Component Modal */}
      <EditComponentModal
        isOpen={!!editingComponent}
        onClose={() => setEditingComponent(null)}
        component={editingComponent}
        onSave={(data) => handleUpdateComponent(editingComponent.id, data)}
        loading={saving}
      />
    </div>
  );
};

// Component Card
const ComponentCard = ({ component, index, onEdit, onDelete, onMoveUp, onMoveDown, isReordering = false }) => {
  const [contentPreview, setContentPreview] = useState("");

  useEffect(() => {
    try {
      const content = JSON.parse(component.contentJson || "{}");
      setContentPreview(JSON.stringify(content, null, 2).substring(0, 100) + "...");
    } catch {
      setContentPreview("Invalid JSON content");
    }
  }, [component.contentJson]);

  return (
    <div className={`bg-white/10 border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-colors ${
      isReordering ? 'opacity-50 pointer-events-none' : ''
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-300 bg-white/10 px-2 py-1 rounded">
              #{index + 1}
            </span>
            <h3 className="text-md font-semibold text-white">
              {component.componentName || "Unnamed Component"}
            </h3>
            <span className="text-xs text-gray-400 bg-blue-500/20 px-2 py-1 rounded">
              {component.componentType}
            </span>
            {isReordering && (
              <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded animate-pulse">
                Reordering...
              </span>
            )}
          </div>
          <p className="text-xs text-gray-300 mt-1">
            <span className="font-mono text-xs bg-white/5 px-2 py-1 rounded">
              {contentPreview}
            </span>
          </p>
        </div>
        
        <div className="flex items-center space-x-1">
          {/* Reorder buttons */}
          {onMoveUp && !isReordering && (
            <button
              onClick={onMoveUp}
              className="p-1 text-gray-300 hover:text-white hover:bg-white/10 rounded"
              title="Move up"
            >
              <ArrowUpIcon className="h-3 w-3" />
            </button>
          )}
          {onMoveDown && !isReordering && (
            <button
              onClick={onMoveDown}
              className="p-1 text-gray-300 hover:text-white hover:bg-white/10 rounded"
              title="Move down"
            >
              <ArrowDownIcon className="h-3 w-3" />
            </button>
          )}
          
          {/* Action buttons */}
          <button
            onClick={onEdit}
            disabled={isReordering}
            className={`p-1 rounded ${
              isReordering 
                ? 'text-gray-500 cursor-not-allowed' 
                : 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/10'
            }`}
            title="Edit component"
          >
            <PencilIcon className="h-3 w-3" />
          </button>
          <button
            onClick={onDelete}
            disabled={isReordering}
            className={`p-1 rounded ${
              isReordering 
                ? 'text-gray-500 cursor-not-allowed' 
                : 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
            }`}
            title="Delete component"
          >
            <TrashIcon className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Add Component Modal
const AddComponentModal = ({ isOpen, onClose, onSave, loading }) => {
  const [formData, setFormData] = useState({
    componentType: "Generic",
    componentName: "",
    contentJson: JSON.stringify({})
  });
  const [jsonData, setJsonData] = useState({});
  const [errors, setErrors] = useState({});

  const handleJsonFieldChange = (path, value) => {
    const updatedJsonData = updateJsonFromFormFields(jsonData, path, value);
    setJsonData(updatedJsonData);
    setFormData(prev => ({
      ...prev,
      contentJson: JSON.stringify(updatedJsonData, null, 2)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.componentType || formData.componentType.length > 50) {
      newErrors.componentType = "Component type must be 1-50 characters";
    }

    if (formData.componentName && formData.componentName.length > 100) {
      newErrors.componentName = "Component name must not exceed 100 characters";
    }

    if (!formData.contentJson || formData.contentJson.trim().length === 0) {
      newErrors.contentJson = "Content JSON is required";
    } else {
      try {
        JSON.parse(formData.contentJson);
      } catch {
        newErrors.contentJson = "Invalid JSON format";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      setFormData({
        componentType: "Generic",
        componentName: "",
        contentJson: JSON.stringify({})
      });
      setJsonData({});
      setErrors({});
    }
  };

  const dynamicFields = generateFormFieldsFromJson(jsonData, handleJsonFieldChange);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Component" size="lg">
      <div className="space-y-4 max-h-[70vh] overflow-y-auto">
        {/* Basic Component Info */}
        <div className="space-y-3">
          <h3 className="text-md font-semibold text-white flex items-center">
            <DocumentTextIcon className="h-4 w-4 mr-2 text-blue-400" />
            Component Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Component Type *
              </label>
              <select
                value={formData.componentType}
                onChange={(e) => setFormData(prev => ({ ...prev, componentType: e.target.value }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Generic" className="bg-gray-800 text-white">Generic</option>
                <option value="Hero" className="bg-gray-800 text-white">Hero</option>
                <option value="Text" className="bg-gray-800 text-white">Text</option>
                <option value="Image" className="bg-gray-800 text-white">Image</option>
                <option value="Gallery" className="bg-gray-800 text-white">Gallery</option>
                <option value="Contact" className="bg-gray-800 text-white">Contact</option>
              </select>
              {errors.componentType && (
                <p className="text-sm text-red-400">{errors.componentType}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Component Name
              </label>
              <Input
                type="text"
                value={formData.componentName}
                onChange={(e) => setFormData(prev => ({ ...prev, componentName: e.target.value }))}
                placeholder="Enter component name"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                maxLength={100}
              />
              {errors.componentName && (
                <p className="text-sm text-red-400">{errors.componentName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Content Fields */}
        <div className="space-y-3">
          <h3 className="text-md font-semibold text-white flex items-center">
            <DocumentTextIcon className="h-4 w-4 mr-2 text-green-400" />
            Content Fields
          </h3>
          
          {dynamicFields.length > 0 ? (
            <div className="space-y-4">
              {dynamicFields.map((field) => (
                <DynamicFormField
                  key={field.key}
                  field={field}
                  onChange={handleJsonFieldChange}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white/5 rounded-lg border border-white/10">
              <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-white mb-2">No Content Fields</h4>
              <p className="text-gray-300 mb-4">Add some content fields to get started.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => {
                    const newJsonData = { title: "", content: "" };
                    setJsonData(newJsonData);
                    setFormData(prev => ({
                      ...prev,
                      contentJson: JSON.stringify(newJsonData, null, 2)
                    }));
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                >
                  Add Basic Fields
                </button>
                <button
                  onClick={() => {
                    const newJsonData = { 
                      title: "", 
                      subtitle: "", 
                      description: "",
                      imageUrl: "",
                      buttonText: "",
                      buttonUrl: ""
                    };
                    setJsonData(newJsonData);
                    setFormData(prev => ({
                      ...prev,
                      contentJson: JSON.stringify(newJsonData, null, 2)
                    }));
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                >
                  Add Hero Fields
                </button>
                <button
                  onClick={() => {
                    const newJsonData = { 
                      title: "", 
                      items: [
                        { title: "", description: "" }
                      ]
                    };
                    setJsonData(newJsonData);
                    setFormData(prev => ({
                      ...prev,
                      contentJson: JSON.stringify(newJsonData, null, 2)
                    }));
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm"
                >
                  Add List Fields
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Raw JSON View (Collapsible) */}
        <div className="space-y-2">
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-gray-300 hover:text-white flex items-center">
              <DocumentTextIcon className="h-4 w-4 mr-2" />
              Raw JSON View
              <span className="ml-2 text-xs text-gray-400 group-open:rotate-90 transition-transform">▶</span>
            </summary>
            <div className="mt-2">
              <textarea
                value={formData.contentJson}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, contentJson: e.target.value }));
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setJsonData(parsed);
                  } catch {
                    // Invalid JSON, don't update jsonData
                  }
                }}
                rows={8}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
                placeholder='{"title": "Example", "content": "..."}'
              />
              {errors.contentJson && (
                <p className="text-sm text-red-400 mt-2">{errors.contentJson}</p>
              )}
            </div>
          </details>
        </div>
      </div>

      <ModalFooter>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={loading}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-sm px-3 py-1"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1 text-sm px-3 py-1"
        >
          {loading ? (
            <>
              <ArrowPathIcon className="h-3 w-3 animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <CheckCircleIcon className="h-3 w-3" />
              <span>Add Component</span>
            </>
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// Edit Component Modal
const EditComponentModal = ({ isOpen, onClose, component, onSave, loading }) => {
  const [formData, setFormData] = useState({
    componentType: "",
    componentName: "",
    contentJson: ""
  });
  const [jsonData, setJsonData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (component) {
      const parsedJson = parseJsonToFormFields(component.contentJson);
      setFormData({
        componentType: component.componentType || "Generic",
        componentName: component.componentName || "",
        contentJson: component.contentJson || JSON.stringify({})
      });
      setJsonData(parsedJson);
      setErrors({});
    }
  }, [component]);

  const handleJsonFieldChange = (path, value) => {
    const updatedJsonData = updateJsonFromFormFields(jsonData, path, value);
    setJsonData(updatedJsonData);
    setFormData(prev => ({
      ...prev,
      contentJson: JSON.stringify(updatedJsonData, null, 2)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.componentType || formData.componentType.length > 50) {
      newErrors.componentType = "Component type must be 1-50 characters";
    }

    if (formData.componentName && formData.componentName.length > 100) {
      newErrors.componentName = "Component name must not exceed 100 characters";
    }

    if (!formData.contentJson || formData.contentJson.trim().length === 0) {
      newErrors.contentJson = "Content JSON is required";
    } else {
      try {
        JSON.parse(formData.contentJson);
      } catch {
        newErrors.contentJson = "Invalid JSON format";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  if (!component) return null;

  const dynamicFields = generateFormFieldsFromJson(jsonData, handleJsonFieldChange);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Component" size="lg">
      <div className="space-y-4 max-h-[70vh] overflow-y-auto">
        {/* Basic Component Info */}
        <div className="space-y-3">
          <h3 className="text-md font-semibold text-white flex items-center">
            <DocumentTextIcon className="h-4 w-4 mr-2 text-blue-400" />
            Component Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Component Type *
              </label>
              <select
                value={formData.componentType}
                onChange={(e) => setFormData(prev => ({ ...prev, componentType: e.target.value }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Generic" className="bg-gray-800 text-white">Generic</option>
                <option value="Hero" className="bg-gray-800 text-white">Hero</option>
                <option value="Text" className="bg-gray-800 text-white">Text</option>
                <option value="Image" className="bg-gray-800 text-white">Image</option>
                <option value="Gallery" className="bg-gray-800 text-white">Gallery</option>
                <option value="Contact" className="bg-gray-800 text-white">Contact</option>
              </select>
              {errors.componentType && (
                <p className="text-sm text-red-400">{errors.componentType}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Component Name
              </label>
              <Input
                type="text"
                value={formData.componentName}
                onChange={(e) => setFormData(prev => ({ ...prev, componentName: e.target.value }))}
                placeholder="Enter component name"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                maxLength={100}
              />
              {errors.componentName && (
                <p className="text-sm text-red-400">{errors.componentName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Content Fields */}
        <div className="space-y-3">
          <h3 className="text-md font-semibold text-white flex items-center">
            <DocumentTextIcon className="h-4 w-4 mr-2 text-green-400" />
            Content Fields
          </h3>
          
          {dynamicFields.length > 0 ? (
            <div className="space-y-4">
              {dynamicFields.map((field) => (
                <DynamicFormField
                  key={field.key}
                  field={field}
                  onChange={handleJsonFieldChange}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white/5 rounded-lg border border-white/10">
              <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-white mb-2">No Content Fields</h4>
              <p className="text-gray-300 mb-4">This component doesn't have any content fields yet.</p>
              <button
                onClick={() => {
                  const newJsonData = { title: "", content: "" };
                  setJsonData(newJsonData);
                  setFormData(prev => ({
                    ...prev,
                    contentJson: JSON.stringify(newJsonData, null, 2)
                  }));
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
              >
                Add Basic Fields
              </button>
            </div>
          )}
        </div>

        {/* Raw JSON View (Collapsible) */}
        <div className="space-y-2">
          <details className="group">
            <summary className="cursor-pointer text-sm font-medium text-gray-300 hover:text-white flex items-center">
              <DocumentTextIcon className="h-4 w-4 mr-2" />
              Raw JSON View
              <span className="ml-2 text-xs text-gray-400 group-open:rotate-90 transition-transform">▶</span>
            </summary>
            <div className="mt-2">
              <textarea
                value={formData.contentJson}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, contentJson: e.target.value }));
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setJsonData(parsed);
                  } catch {
                    // Invalid JSON, don't update jsonData
                  }
                }}
                rows={8}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
                placeholder='{"title": "Example", "content": "..."}'
              />
              {errors.contentJson && (
                <p className="text-sm text-red-400 mt-2">{errors.contentJson}</p>
              )}
            </div>
          </details>
        </div>
      </div>

      <ModalFooter>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={loading}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-sm px-3 py-1"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1 text-sm px-3 py-1"
        >
          {loading ? (
            <>
              <ArrowPathIcon className="h-3 w-3 animate-spin" />
              <span>Updating...</span>
            </>
          ) : (
            <>
              <CheckCircleIcon className="h-3 w-3" />
              <span>Update Component</span>
            </>
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PageComponentsEditor;
