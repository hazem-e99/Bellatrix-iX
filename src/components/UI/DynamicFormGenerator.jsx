import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Button from "../UI/Button";

/**
 * Dynamic Form Generator
 * Automatically generates form fields based on component schema definitions
 */
const DynamicFormGenerator = ({
  schema,
  data = {},
  onChange,
  onFieldChange,
  componentType,
  className = "",
}) => {
  const [formData, setFormData] = useState(data);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    console.log("🔄 [DynamicFormGenerator] Data prop changed:", {
      componentType,
      dataKeys: Object.keys(data),
      dataChanged: JSON.stringify(data) !== JSON.stringify(formData),
      currentFormData: formData,
      newData: data,
      dataType: typeof data,
      isEmpty: !data || Object.keys(data).length === 0,
    });

    // Only update if data is actually different and not empty
    if (
      data &&
      Object.keys(data).length > 0 &&
      JSON.stringify(data) !== JSON.stringify(formData)
    ) {
      console.log(
        "🔄 [DynamicFormGenerator] Updating form data from:",
        formData,
        "to:",
        data
      );
      setFormData(data);
    } else if (!data || Object.keys(data).length === 0) {
      console.log("⚠️ [DynamicFormGenerator] Empty or no data received:", {
        componentType,
        data,
        formData,
      });
    } else {
      console.log("🔄 [DynamicFormGenerator] Data unchanged:", {
        componentType,
        dataKeys: Object.keys(data),
        formDataKeys: Object.keys(formData),
      });
    }
  }, [data, componentType, formData]);

  const handleChange = (path, value) => {
    console.log("📝 [DynamicFormGenerator] handleChange:", {
      componentType,
      path,
      value,
      valueType: typeof value,
      isArray: Array.isArray(value),
      currentFormData: formData,
    });

    const updatedData = { ...formData };

    // Handle nested path updates (e.g., "ctaButton.text")
    const pathArray = path.split(".");
    let current = updatedData;

    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) {
        current[pathArray[i]] = {};
      }
      current = current[pathArray[i]];
    }

    current[pathArray[pathArray.length - 1]] = value;

    console.log("📝 [DynamicFormGenerator] Updated data:", {
      path,
      updatedData,
      changedField: current[pathArray[pathArray.length - 1]],
    });

    setFormData(updatedData);
    onChange(updatedData);

    // Also trigger field-specific change for immediate preview updates
    if (onFieldChange) {
      console.log("📝 [DynamicFormGenerator] Calling onFieldChange:", {
        path,
        value,
      });
      onFieldChange(path, value);
    }
  };

  const handleArrayAdd = (path, defaultItem = {}) => {
    const updatedData = { ...formData };
    const pathArray = path.split(".");
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
    const pathArray = path.split(".");
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
    const pathArray = path.split(".");
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
    return path.split(".").reduce((current, key) => current?.[key], obj);
  };

  const createDefaultItem = (itemSchema) => {
    // Add safety check for itemSchema
    if (!itemSchema) {
      console.warn(
        "⚠️ [DynamicFormGenerator] createDefaultItem: itemSchema is undefined"
      );
      return { title: "", description: "" };
    }

    // Handle different schema types
    if (itemSchema.type === "string") {
      return "";
    }

    if (itemSchema.type === "number") {
      return 0;
    }

    if (itemSchema.type === "boolean") {
      return false;
    }

    if (itemSchema.type === "array") {
      return [];
    }

    if (itemSchema.type === "object" && itemSchema.properties) {
      const defaultItem = {};

      Object.entries(itemSchema.properties).forEach(([key, prop]) => {
        // Recursively create default values for nested objects
        if (prop.type === "string") {
          defaultItem[key] = prop.placeholder || "";
        } else if (prop.type === "number") {
          defaultItem[key] = 0;
        } else if (prop.type === "boolean") {
          defaultItem[key] = false;
        } else if (prop.type === "array") {
          defaultItem[key] = [];
        } else if (prop.type === "object" && prop.properties) {
          // Recursively handle nested objects
          defaultItem[key] = createDefaultItem(prop);
        } else {
          defaultItem[key] = "";
        }
      });

      return defaultItem;
    }

    // Fallback for unknown types
    return { title: "", description: "" };
  };

  const toggleSection = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  // Render function specifically for array item fields
  const renderArrayItemField = (fieldName, fieldSchema, value, onChange) => {
    const isRequired = fieldSchema.required;
    const labelClasses = `block text-sm font-medium text-gray-300 mb-2 ${
      isRequired ? "text-white" : ""
    }`;
    const inputClasses = `w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-200 ${
      isRequired ? "border-white/40" : ""
    }`;

    switch (fieldSchema.formField) {
      case "text":
      case "email":
      case "url":
        return (
          <div className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <input
              type={fieldSchema.formField}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className={inputClasses}
              placeholder={fieldSchema.placeholder}
              required={isRequired}
            />
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <textarea
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className={inputClasses}
              rows="3"
              placeholder={fieldSchema.placeholder}
              required={isRequired}
            />
          </div>
        );

      case "number":
        return (
          <div className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <input
              type="number"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className={inputClasses}
              placeholder={fieldSchema.placeholder}
              required={isRequired}
            />
          </div>
        );

      case "select":
        return (
          <div className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <select
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className={inputClasses}
              required={isRequired}
            >
              <option value="">Select {fieldSchema.label}</option>
              {fieldSchema.options?.map((option) => {
                const optionValue =
                  typeof option === "object" ? option.value : option;
                const optionLabel =
                  typeof option === "object" ? option.label : option;
                return (
                  <option key={optionValue} value={optionValue}>
                    {optionLabel}
                  </option>
                );
              })}
            </select>
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => onChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-300">
              {fieldSchema.label}
            </label>
          </div>
        );

      case "media":
        return (
          <div className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className={inputClasses}
              placeholder={fieldSchema.placeholder || "Enter media URL"}
              required={isRequired}
            />
            <small className="text-xs text-gray-400">
              {fieldSchema.mediaType === "video" ? "Video URL" : "Image URL"}
            </small>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className={inputClasses}
              placeholder={fieldSchema.placeholder}
              required={isRequired}
            />
          </div>
        );
    }
  };

  const renderField = (key, fieldSchema, basePath = "", level = 0) => {
    // Add safety check for fieldSchema
    if (!fieldSchema) {
      console.warn(
        "⚠️ [DynamicFormGenerator] renderField: fieldSchema is undefined for key:",
        key
      );
      return (
        <div
          key={basePath ? `${basePath}.${key}` : key}
          className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <div className="text-red-400 text-sm font-medium">
            Error: No schema defined
          </div>
          <div className="text-red-300 text-xs mt-1">Field: {key}</div>
        </div>
      );
    }

    const fullPath = basePath ? `${basePath}.${key}` : key;
    const value = getValueByPath(formData, fullPath);
    const isRequired = fieldSchema.required;
    const fieldType = fieldSchema.formField || fieldSchema.type || "text";

    console.log("🔧 [RENDER FIELD] Field details:", {
      key,
      basePath,
      fullPath,
      value,
      fieldType,
      isRequired,
      level,
      componentType,
    });

    // Base classes for form fields
    const inputClasses =
      "block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm";
    const labelClasses = "block text-sm font-medium text-gray-300 mb-2";

    switch (fieldType) {
      case "text":
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}{" "}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <input
              type="text"
              value={value || ""}
              onChange={(e) => {
                console.log("📝 [TEXT INPUT CHANGE]", {
                  fullPath,
                  oldValue: value,
                  newValue: e.target.value,
                  componentType,
                });
                handleChange(fullPath, e.target.value);
              }}
              placeholder={fieldSchema.placeholder}
              className={inputClasses}
            />
          </div>
        );

      case "textarea":
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}{" "}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <textarea
              value={value || ""}
              onChange={(e) => {
                console.log("📝 [TEXTAREA CHANGE]", {
                  fullPath,
                  oldValue: value,
                  newValue: e.target.value,
                  componentType,
                });
                handleChange(fullPath, e.target.value);
              }}
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
              {fieldSchema.label}{" "}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <select
              value={value || ""}
              onChange={(e) => handleChange(fullPath, e.target.value)}
              className={inputClasses}
            >
              <option value="">Select {fieldSchema.label}</option>
              {fieldSchema.options?.map((option) => {
                // Handle both string and object option formats
                const optionValue =
                  typeof option === "object" ? option.value : option;
                const optionLabel =
                  typeof option === "object" ? option.label : option;
                return (
                  <option key={optionValue} value={optionValue}>
                    {optionLabel}
                  </option>
                );
              })}
            </select>
          </div>
        );

      case "media":
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}{" "}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <input
              type="url"
              value={value || ""}
              onChange={(e) => handleChange(fullPath, e.target.value)}
              placeholder={fieldSchema.placeholder}
              className={inputClasses}
            />
            <p className="text-xs text-gray-400">
              {fieldSchema.mediaType === "video"
                ? "Video URL (e.g., /Videos/video.mp4)"
                : "Image URL (e.g., /images/image.jpg)"}
            </p>
          </div>
        );

      case "tagList": {
        const tags = Array.isArray(value) ? value : [];
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}{" "}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder={fieldSchema.placeholder}
                className={inputClasses}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    e.preventDefault();
                    const newTags = [...tags, e.target.value.trim()];
                    handleChange(fullPath, newTags);
                    e.target.value = "";
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
      }

      case "object": {
        const isExpanded = expandedSections[fullPath] !== false;
        const objectValue = value || {};

        console.log("🔧 [OBJECT FIELD] Rendering object:", {
          fullPath,
          fieldLabel: fieldSchema.label,
          objectValue,
          hasProperties: !!fieldSchema.properties,
          properties: fieldSchema.properties
            ? Object.keys(fieldSchema.properties)
            : [],
        });

        return (
          <div key={fullPath} className="space-y-3">
            <button
              type="button"
              onClick={() => toggleSection(fullPath)}
              className="flex items-center justify-between w-full p-3 bg-white/5 rounded-lg border border-white/10 text-gray-300 hover:bg-white/10 transition-all duration-200"
            >
              <span className="font-medium">
                {fieldSchema.label}{" "}
                {isRequired && <span className="text-red-400">*</span>}
              </span>
              {isExpanded ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </button>
            {isExpanded && fieldSchema.properties && (
              <div className="pl-4 space-y-4 border-l-2 border-white/10 bg-white/5 rounded-lg p-4">
                {Object.entries(fieldSchema.properties).map(
                  ([propKey, propSchema]) => {
                    console.log("🔧 [OBJECT PROPERTY] Rendering property:", {
                      propKey,
                      propSchema,
                      currentPath: fullPath,
                      newPath: `${fullPath}.${propKey}`,
                      currentValue: objectValue[propKey],
                    });

                    return renderField(
                      propKey,
                      propSchema,
                      fullPath,
                      level + 1
                    );
                  }
                )}
              </div>
            )}
          </div>
        );
      }

      case "array": {
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
                <span className="font-medium">
                  {fieldSchema.label} ({arrayValue.length})
                </span>
                {isArrayExpanded ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </button>
              <Button
                size="sm"
                onClick={() => {
                  const defaultItem = createDefaultItem(itemSchema);
                  console.log("➕ [ARRAY ADD] Adding item with schema:", {
                    itemSchema,
                    defaultItem,
                    fullPath,
                  });
                  handleArrayAdd(fullPath, defaultItem);
                }}
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-400/30"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>

            {isArrayExpanded && (
              <div className="space-y-4">
                {arrayValue.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-300">
                        Item {index + 1}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {index > 0 && (
                          <Button
                            size="xs"
                            onClick={() =>
                              handleArrayMove(fullPath, index, index - 1)
                            }
                            className="bg-gray-500/20 hover:bg-gray-500/30 text-gray-300"
                          >
                            ↑
                          </Button>
                        )}
                        {index < arrayValue.length - 1 && (
                          <Button
                            size="xs"
                            onClick={() =>
                              handleArrayMove(fullPath, index, index + 1)
                            }
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
                      {itemSchema && itemSchema.type === "string" ? (
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
                      ) : itemSchema && itemSchema.properties ? (
                        Object.entries(itemSchema.properties).map(
                          ([propKey, propSchema]) => {
                            const itemFieldPath = `${fullPath}.${index}.${propKey}`;
                            const currentValue =
                              item && typeof item === "object"
                                ? item[propKey]
                                : undefined;

                            console.log(
                              "🔧 [ARRAY ITEM FIELD] Rendering field:",
                              {
                                itemIndex: index,
                                propKey,
                                itemFieldPath,
                                currentValue,
                                item,
                                propSchema,
                                fullPath,
                                arrayValue,
                                itemSchema: itemSchema.properties,
                              }
                            );

                            // Create a custom render function for array item fields
                            return (
                              <div key={propKey} className="space-y-2">
                                {renderArrayItemField(
                                  propKey,
                                  propSchema,
                                  currentValue,
                                  (newValue) => {
                                    const newArray = [...arrayValue];
                                    if (
                                      !newArray[index] ||
                                      typeof newArray[index] !== "object"
                                    ) {
                                      newArray[index] = {};
                                    }
                                    newArray[index] = {
                                      ...newArray[index],
                                      [propKey]: newValue,
                                    };
                                    handleChange(fullPath, newArray);
                                  }
                                )}
                              </div>
                            );
                          }
                        )
                      ) : (
                        <div className="text-center py-4 text-gray-400">
                          <div className="text-sm">
                            No schema defined for array items
                          </div>
                          <div className="text-xs mt-1">
                            Item Schema:{" "}
                            {itemSchema
                              ? JSON.stringify(itemSchema)
                              : "undefined"}
                          </div>
                        </div>
                      )}
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
      }

      case "checkbox":
        return (
          <div key={fullPath} className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={fullPath}
                checked={Boolean(value)}
                onChange={(e) => {
                  console.log("☑️ [CHECKBOX CHANGE]", {
                    fullPath,
                    oldValue: value,
                    newValue: e.target.checked,
                    componentType,
                  });
                  handleChange(fullPath, e.target.checked);
                }}
                className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor={fullPath}
                className="text-sm font-medium text-gray-300"
              >
                {fieldSchema.label}{" "}
                {isRequired && <span className="text-red-400">*</span>}
              </label>
            </div>
          </div>
        );

      case "number":
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}{" "}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <input
              type="number"
              value={value || ""}
              onChange={(e) => {
                const numValue =
                  e.target.value === "" ? "" : Number(e.target.value);
                console.log("🔢 [NUMBER CHANGE]", {
                  fullPath,
                  oldValue: value,
                  newValue: numValue,
                  componentType,
                });
                handleChange(fullPath, numValue);
              }}
              placeholder={fieldSchema.placeholder}
              className={inputClasses}
            />
          </div>
        );

      case "email":
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}{" "}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <input
              type="email"
              value={value || ""}
              onChange={(e) => {
                console.log("📧 [EMAIL CHANGE]", {
                  fullPath,
                  oldValue: value,
                  newValue: e.target.value,
                  componentType,
                });
                handleChange(fullPath, e.target.value);
              }}
              placeholder={fieldSchema.placeholder}
              className={inputClasses}
            />
          </div>
        );

      case "url":
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}{" "}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <input
              type="url"
              value={value || ""}
              onChange={(e) => {
                console.log("🔗 [URL CHANGE]", {
                  fullPath,
                  oldValue: value,
                  newValue: e.target.value,
                  componentType,
                });
                handleChange(fullPath, e.target.value);
              }}
              placeholder={fieldSchema.placeholder}
              className={inputClasses}
            />
          </div>
        );

      case "color":
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}{" "}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={value || "#000000"}
                onChange={(e) => {
                  console.log("🎨 [COLOR CHANGE]", {
                    fullPath,
                    oldValue: value,
                    newValue: e.target.value,
                    componentType,
                  });
                  handleChange(fullPath, e.target.value);
                }}
                className="w-12 h-10 rounded border border-white/20 bg-white/10"
              />
              <input
                type="text"
                value={value || ""}
                onChange={(e) => handleChange(fullPath, e.target.value)}
                placeholder={fieldSchema.placeholder}
                className={`${inputClasses} flex-1`}
              />
            </div>
          </div>
        );

      case "media-image":
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}{" "}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <input
              type="url"
              value={value || ""}
              onChange={(e) => {
                console.log("🖼️ [IMAGE CHANGE]", {
                  fullPath,
                  oldValue: value,
                  newValue: e.target.value,
                  componentType,
                });
                handleChange(fullPath, e.target.value);
              }}
              placeholder={fieldSchema.placeholder || "/images/example.jpg"}
              className={inputClasses}
            />
            <p className="text-xs text-gray-400">
              Image URL (e.g., /images/example.jpg or
              https://example.com/image.jpg)
            </p>
            {value && (
              <div className="mt-2">
                <img
                  src={value}
                  alt="Preview"
                  className="max-w-xs h-20 object-cover rounded border border-white/20"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        );

      case "media-video":
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}{" "}
              {isRequired && <span className="text-red-400">*</span>}
            </label>
            <input
              type="url"
              value={value || ""}
              onChange={(e) => {
                console.log("🎬 [VIDEO CHANGE]", {
                  fullPath,
                  oldValue: value,
                  newValue: e.target.value,
                  componentType,
                });
                handleChange(fullPath, e.target.value);
              }}
              placeholder={fieldSchema.placeholder || "/videos/example.mp4"}
              className={inputClasses}
            />
            <p className="text-xs text-gray-400">
              Video URL (e.g., /videos/example.mp4 or
              https://example.com/video.mp4)
            </p>
          </div>
        );

      default:
        return (
          <div key={fullPath} className="space-y-2">
            <label className={labelClasses}>
              {fieldSchema.label}{" "}
              {isRequired && <span className="text-red-400">*</span>}
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
    console.log("⚠️ [DynamicFormGenerator] No schema or properties:", {
      componentType,
      hasSchema: !!schema,
      hasProperties: !!(schema && schema.properties),
      schema: schema,
    });
    return (
      <div className="p-4 text-center text-gray-400">
        <div className="mb-2">No schema defined for this component</div>
        <div className="text-xs text-gray-500">Component: {componentType}</div>
        <div className="text-xs text-gray-500">
          Schema: {schema ? "exists" : "missing"}
        </div>
        <div className="text-xs text-gray-500">
          Properties: {schema && schema.properties ? "exists" : "missing"}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Component Configuration
        </h3>
        <span className="text-sm text-gray-400">{componentType}</span>
      </div>

      <div className="space-y-6">
        {(() => {
          const fieldEntries = Object.entries(schema.properties);
          console.log("🔧 [DynamicFormGenerator] Rendering fields:", {
            componentType,
            fieldCount: fieldEntries.length,
            fieldKeys: fieldEntries.map(([key]) => key),
            schemaProperties: schema.properties,
            formDataKeys: Object.keys(formData),
            hasItemsInData: "items" in formData,
            hasItemsInSchema: "items" in schema.properties,
          });

          return fieldEntries.map(([key, fieldSchema]) => {
            console.log("🔧 [DynamicFormGenerator] Rendering field:", {
              componentType,
              fieldKey: key,
              fieldSchema,
              fieldValue: getValueByPath(formData, key),
              hasItemsField: key === "items",
              isArrayField: fieldSchema.type === "array",
              formFieldType: fieldSchema.formField || fieldSchema.type,
              isInSchema: key in schema.properties,
              isInFormData: key in formData,
              isHidden: fieldSchema.hidden === true,
            });

            // Log warning for unexpected items field
            if (key === "items" && fieldSchema.type !== "array") {
              console.warn(
                "⚠️ [DynamicFormGenerator] Unexpected items field found:",
                {
                  componentType,
                  fieldSchema,
                  fieldType: fieldSchema.type,
                  formFieldType: fieldSchema.formField,
                }
              );
            }

            // Only render fields that exist in the schema
            if (!(key in schema.properties)) {
              console.warn(
                "⚠️ [DynamicFormGenerator] Field not in schema, skipping:",
                {
                  componentType,
                  fieldKey: key,
                  schemaKeys: Object.keys(schema.properties),
                }
              );
              return null;
            }

            // Skip hidden fields
            if (fieldSchema.hidden === true) {
              console.log(
                "👁️ [DynamicFormGenerator] Field is hidden, skipping:",
                {
                  componentType,
                  fieldKey: key,
                  fieldSchema,
                }
              );
              return null;
            }

            return renderField(key, fieldSchema);
          });
        })()}
      </div>
    </div>
  );
};

export default DynamicFormGenerator;
