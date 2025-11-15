import { useState } from "react";
import Button from "../../../UI/Button";
import DynamicFormGenerator from "../../../UI/DynamicFormGenerator";

const ComponentFormRenderer = ({
  component,
  index,
  componentSchemas,
  getAboutComponentSchema,
  getGeneralComponentSchema,
  generateDynamicSchema,
  validateAndFormatJSON,
  onUpdate,
}) => {
  const [viewMode, setViewMode] = useState(component.viewMode || "form");

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    onUpdate(index, "viewMode", mode);
  };

  const componentSchema =
    componentSchemas[component.componentType] ||
    getAboutComponentSchema(component.componentType) ||
    getGeneralComponentSchema(component.componentType);

  if (viewMode === "json") {
    return (
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-300">
            Content Configuration
          </label>
          <div className="flex bg-white/10 rounded-lg p-1">
            <button
              type="button"
              onClick={() => handleViewModeChange("form")}
              className="px-3 py-1 text-xs rounded-md transition-all text-gray-400 hover:text-white"
            >
              Form View
            </button>
            <button
              type="button"
              onClick={() => handleViewModeChange("json")}
              className="px-3 py-1 text-xs rounded-md transition-all bg-blue-500 text-white"
            >
              JSON View
            </button>
          </div>
        </div>
        <textarea
          rows={6}
          value={component.contentJson || "{}"}
          onChange={(e) => onUpdate(index, "contentJson", e.target.value)}
          placeholder='{"title": "Example Title", "description": "Example Description"}'
          className="block w-full rounded-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-blue-400 focus:ring-blue-400/20 shadow-sm font-mono text-sm resize-none"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-400">Enter valid JSON data for this component</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const formatted = validateAndFormatJSON(component.contentJson || "{}");
              onUpdate(index, "contentJson", formatted);
            }}
            className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-200 text-xs px-2 py-1"
          >
            Format JSON
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-300">
          Content Configuration
        </label>
        <div className="flex bg-white/10 rounded-lg p-1">
          <button
            type="button"
            onClick={() => handleViewModeChange("form")}
            className="px-3 py-1 text-xs rounded-md transition-all bg-blue-500 text-white"
          >
            Form View
          </button>
          <button
            type="button"
            onClick={() => handleViewModeChange("json")}
            className="px-3 py-1 text-xs rounded-md transition-all text-gray-400 hover:text-white"
          >
            JSON View
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4">
        {componentSchema ? (
          <DynamicFormGenerator
            schema={componentSchema.schema}
            data={
              component.contentJson
                ? JSON.parse(component.contentJson)
                : componentSchema.defaultData || {}
            }
            onChange={(formData) => {
              onUpdate(index, "contentJson", JSON.stringify(formData, null, 2));
            }}
            onFieldChange={(field, value) => {
              const currentData = component.contentJson
                ? JSON.parse(component.contentJson)
                : {};
              const updated = { ...currentData, [field]: value };
              onUpdate(index, "contentJson", JSON.stringify(updated, null, 2));
            }}
            componentType={component.componentType}
          />
        ) : (
          <DynamicFormGenerator
            schema={
              generateDynamicSchema(
                component.contentJson ? JSON.parse(component.contentJson) : {},
                component.componentType
              ).schema
            }
            data={component.contentJson ? JSON.parse(component.contentJson) : {}}
            onChange={(formData) => {
              onUpdate(index, "contentJson", JSON.stringify(formData, null, 2));
            }}
            componentType={component.componentType}
            className="text-white [&_label]:text-gray-300"
          />
        )}
      </div>
    </div>
  );
};

export default ComponentFormRenderer;

