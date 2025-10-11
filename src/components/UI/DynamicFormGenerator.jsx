import React, { useState, useEffect } from "react";
import { PlusIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Button from "../UI/Button";

/**
 * Dynamic Form Generator
 * Automatically generates form fields based on component schema definitions
 */
const DynamicFormGenerator = ({
  schema,
  data = {},
  onChange,
  componentType,
  className = ""
}) => {
  const [formData, setFormData] = useState(data);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (path, value) => {
    const updatedData = { ...formData };
    
    // Handle nested path updates (e.g., "ctaButton.text")
    const pathArray = path.split('.');
    let current = updatedData;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) {
        current[pathArray[i]] = {};
      }
      current = current[pathArray[i]];
    }
    
    current[pathArray[pathArray.length - 1]] = value;
    
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleArrayAdd = (path, defaultItem = {}) => {
    const updatedData = { ...formData };
    const pathArray = path.split('.');
    let current = updatedData;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) {
        current[pathArray[i]] = {};
      }
      current = current[pathArray[i]];
    }
    
    const arrayKey = pathArray[pathArray.length - 1];
    if (!current[arrayKey]) {
      current[arrayKey] = [];
    }
    
    current[arrayKey].push(defaultItem);
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleArrayRemove = (path, index) => {
    const updatedData = { ...formData };
    const pathArray = path.split('.');
    let current = updatedData;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]];
    }
    
    const arrayKey = pathArray[pathArray.length - 1];
    current[arrayKey].splice(index, 1);
    
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleArrayMove = (path, fromIndex, toIndex) => {
    const updatedData = { ...formData };
    const pathArray = path.split('.');
    let current = updatedData;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]];
    }
    
    const arrayKey = pathArray[pathArray.length - 1];
    const item = current[arrayKey][fromIndex];
    current[arrayKey].splice(fromIndex, 1);
    current[arrayKey].splice(toIndex, 0, item);
    
    setFormData(updatedData);
    onChange(updatedData);
  };

  const getValueByPath = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const createDefaultItem = (itemSchema) => {
    const defaultItem = {};
    
    if (itemSchema.type === "object" && itemSchema.properties) {
      Object.entries(itemSchema.properties).forEach(([key, prop]) => {
        if (prop.type === "string") {
          defaultItem[key] = "";
        } else if (prop.type === "array") {
          defaultItem[key] = [];
        } else if (prop.type === "object") {
          defaultItem[key] = {};
        }
      });
    }
    
    return defaultItem;
  };

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const renderField = (key, fieldSchema, basePath = "", level = 0) => {
    const fullPath = basePath ? `${basePath}.${key}` : key;
    const value = getValueByPath(formData, fullPath);
    const isRequired = fieldSchema.required;
    const fieldType = fieldSchema.formField || fieldSchema.type;

    // Base classes for form fields
    const inputClasses = "block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm";
    const labelClasses = "block text-sm font-medium text-gray-300 mb-2";

    switch (fieldType) {
      case "text":
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label} {isRequired && <span className="text-red-400">*</span>}
            </label>
            <input
              type="text"
              value={value || ""}
              onChange={(e) => handleChange(fullPath, e.target.value)}
              placeholder={fieldSchema.placeholder}
              className={inputClasses}
            />
          </div>
        );

      case "textarea":
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label} {isRequired && <span className="text-red-400">*</span>}
            </label>
            <textarea
              value={value || ""}
              onChange={(e) => handleChange(fullPath, e.target.value)}
              placeholder={fieldSchema.placeholder}
              rows={3}
              className={inputClasses}
            />
          </div>
        );

      case "select":
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label} {isRequired && <span className="text-red-400">*</span>}
            </label>
            <select
              value={value || ""}
              onChange={(e) => handleChange(fullPath, e.target.value)}
              className={inputClasses}
            >
              <option value="">Select {fieldSchema.label}</option>
              {fieldSchema.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case "media":
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label} {isRequired && <span className="text-red-400">*</span>}
            </label>
            <input
              type="url"
              value={value || ""}
              onChange={(e) => handleChange(fullPath, e.target.value)}
              placeholder={fieldSchema.placeholder}
              className={inputClasses}
            />
            <p className="text-xs text-gray-400">
              {fieldSchema.mediaType === "video" ? "Video URL (e.g., /Videos/video.mp4)" : "Image URL (e.g., /images/image.jpg)"}
            </p>
          </div>
        );

      case "tagList":
        const tags = Array.isArray(value) ? value : [];
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label} {isRequired && <span className="text-red-400">*</span>}
            </label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder={fieldSchema.placeholder}
                className={inputClasses}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    e.preventDefault();
                    const newTags = [...tags, e.target.value.trim()];
                    handleChange(fullPath, newTags);
                    e.target.value = '';
                  }
                }}
              />
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-300 border border-blue-400/30"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        const newTags = tags.filter((_, i) => i !== index);
                        handleChange(fullPath, newTags);
                      }}
                      className="ml-1 text-blue-300 hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-400">Press Enter to add tags</p>
          </div>
        );

      case "object":
        const isExpanded = expandedSections[fullPath] !== false;
        return (
          <div key={fullPath} className="space-y-3">
            <button
              type="button"
              onClick={() => toggleSection(fullPath)}
              className="flex items-center justify-between w-full p-3 bg-white/5 rounded-lg border border-white/10 text-gray-300 hover:bg-white/10 transition-all duration-200"
            >
              <span className="font-medium">{fieldSchema.label}</span>
              {isExpanded ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </button>
            {isExpanded && fieldSchema.properties && (
              <div className="pl-4 space-y-4 border-l-2 border-white/10">
                {Object.entries(fieldSchema.properties).map(([propKey, propSchema]) =>
                  renderField(propKey, propSchema, fullPath, level + 1)
                )}
              </div>
            )}
          </div>
        );

      case "array":
        const arrayValue = Array.isArray(value) ? value : [];
        const itemSchema = fieldSchema.items;
        const isArrayExpanded = expandedSections[fullPath] !== false;
        
        return (
          <div key={fullPath} className="space-y-3">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => toggleSection(fullPath)}
                className="flex items-center space-x-2 p-3 bg-white/5 rounded-lg border border-white/10 text-gray-300 hover:bg-white/10 transition-all duration-200"
              >
                <span className="font-medium">{fieldSchema.label} ({arrayValue.length})</span>
                {isArrayExpanded ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </button>
              <Button
                size="sm"
                onClick={() => handleArrayAdd(fullPath, createDefaultItem(itemSchema))}
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-400/30"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            
            {isArrayExpanded && (
              <div className="space-y-4">
                {arrayValue.map((item, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-300">
                        Item {index + 1}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {index > 0 && (
                          <Button
                            size="xs"
                            onClick={() => handleArrayMove(fullPath, index, index - 1)}
                            className="bg-gray-500/20 hover:bg-gray-500/30 text-gray-300"
                          >
                            ↑
                          </Button>
                        )}
                        {index < arrayValue.length - 1 && (
                          <Button
                            size="xs"
                            onClick={() => handleArrayMove(fullPath, index, index + 1)}
                            className="bg-gray-500/20 hover:bg-gray-500/30 text-gray-300"
                          >
                            ↓
                          </Button>
                        )}
                        <Button
                          size="xs"
                          onClick={() => handleArrayRemove(fullPath, index)}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-400/30"
                        >
                          <TrashIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {itemSchema.type === "string" ? (
                        <input
                          type="text"
                          value={item || ""}
                          onChange={(e) => {
                            const newArray = [...arrayValue];
                            newArray[index] = e.target.value;
                            handleChange(fullPath, newArray);
                          }}
                          className={inputClasses}
                          placeholder={`${fieldSchema.label} item`}
                        />
                      ) : itemSchema.properties ? (
                        Object.entries(itemSchema.properties).map(([propKey, propSchema]) =>
                          renderField(propKey, propSchema, `${fullPath}.${index}`, level + 1)
                        )
                      ) : null}
                    </div>
                  </div>
                ))}
                
                {arrayValue.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    No {fieldSchema.label.toLowerCase()} added yet.
                  </div>
                )}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label} {isRequired && <span className="text-red-400">*</span>}
            </label>
            <input
              type="text"
              value={value || ""}
              onChange={(e) => handleChange(fullPath, e.target.value)}
              placeholder={fieldSchema.placeholder}
              className={inputClasses}
            />
          </div>
        );
    }
  };

  if (!schema || !schema.properties) {
    return (
      <div className="p-4 text-center text-gray-400">
        No schema defined for this component
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Component Configuration
        </h3>
        <span className="text-sm text-gray-400">
          {componentType}
        </span>
      </div>
      
      <div className="space-y-6">
        {Object.entries(schema.properties).map(([key, fieldSchema]) =>
          renderField(key, fieldSchema)
        )}
      </div>
    </div>
  );
};

export default DynamicFormGenerator;