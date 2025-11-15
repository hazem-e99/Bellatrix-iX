import React, { useState, useEffect } from "react";
import {
  PencilIcon,
  TrashIcon,
  ArrowPathIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ComponentCard = ({
  component,
  index,
  onEdit,
  onDelete,
  isReordering = false,
  onVisibilityToggle,
  onThemeToggle,
}) => {
  const [contentPreview, setContentPreview] = useState([]);
  const [expandedPreview, setExpandedPreview] = useState(false);

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

  useEffect(() => {
    try {
      const content = JSON.parse(component.contentJson || "{}");
      const previewItems = Object.entries(content)
        .slice(0, expandedPreview ? undefined : 3)
        .map(([key, value]) => ({
          key,
          value:
            typeof value === "object"
              ? Array.isArray(value)
                ? `[${value.length} items]`
                : "{object}"
              : String(value).substring(0, 50),
        }));
      setContentPreview(previewItems);
    } catch {
      setContentPreview([{ key: "error", value: "Invalid JSON content" }]);
    }
  }, [component.contentJson, expandedPreview]);

  const renderPreviewValue = (item) => {
    const { key, value } = item;

    if (key === "error") {
      return <span className="text-red-400 font-mono text-xs">{value}</span>;
    }

    return (
      <div className="flex items-center space-x-2 text-xs">
        <span className="text-blue-400 font-medium min-w-0 flex-shrink-0">
          {key}:
        </span>
        <span className="text-gray-300 font-mono truncate">{value}</span>
      </div>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white/10 border border-white/20 rounded-lg p-3 hover:bg-white/15 transition-colors ${
        isReordering ? "opacity-50 pointer-events-none" : ""
      } ${isDragging ? "shadow-lg border-blue-400" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs font-medium text-gray-300 bg-white/10 px-2 py-1 rounded flex-shrink-0">
              #{index + 1}
            </span>
            <h3 className="text-md font-semibold text-white truncate">
              {component.componentName || "Unnamed Component"}
            </h3>
            <span className="text-xs text-gray-400 bg-blue-500/20 px-2 py-1 rounded flex-shrink-0">
              {component.componentType}
            </span>
            <small className="component-id text-gray-500 text-xs font-mono">
              ID: {component.id}
            </small>
            {component.pending && (
              <span className="text-xs text-orange-400 bg-orange-500/20 px-2 py-1 rounded animate-pulse flex-shrink-0 flex items-center space-x-1">
                <ArrowPathIcon className="w-3 h-3 animate-spin" />
                <span>Saving...</span>
              </span>
            )}
            {isReordering && (
              <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded animate-pulse flex-shrink-0">
                Reordering...
              </span>
            )}
          </div>

          {/* Structured Content Preview */}
          <div className="space-y-1">
            {contentPreview.length > 0 ? (
              <>
                <div className="bg-white/5 rounded p-2 space-y-1">
                  {contentPreview.map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      {renderPreviewValue(item)}
                    </div>
                  ))}
                </div>

                {/* Show More/Less Button */}
                {Object.keys(JSON.parse(component.contentJson || "{}")).length >
                  3 && (
                  <button
                    onClick={() => setExpandedPreview(!expandedPreview)}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                  >
                    <span>
                      {expandedPreview
                        ? "Show Less"
                        : `Show ${
                            Object.keys(
                              JSON.parse(component.contentJson || "{}")
                            ).length - 3
                          } More`}
                    </span>
                    <span
                      className={`transform transition-transform ${
                        expandedPreview ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                )}
              </>
            ) : (
              <div className="bg-white/5 rounded p-2">
                <span className="text-gray-400 text-xs">No content fields</span>
              </div>
            )}
          </div>

          {/* Quick Controls for Theme and Visibility */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
            <div className="flex items-center space-x-3">
              {/* Visibility Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    onVisibilityToggle &&
                    onVisibilityToggle(
                      component.id,
                      !(
                        component.isVisible === true ||
                        component.isVisible === 1
                      )
                    )
                  }
                  disabled={isReordering}
                  className={`w-4 h-4 rounded border transition-colors ${
                    component.isVisible === true || component.isVisible === 1
                      ? "bg-green-500 border-green-500 text-white"
                      : "bg-gray-600 border-gray-500 text-gray-400"
                  } ${
                    isReordering
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:scale-110"
                  }`}
                  title={`Component is ${
                    component.isVisible === true || component.isVisible === 1
                      ? "visible"
                      : "hidden"
                  }`}
                >
                  {component.isVisible === true || component.isVisible === 1
                    ? "✓"
                    : "✗"}
                </button>
                <span className="text-xs text-gray-400">
                  {component.isVisible === true || component.isVisible === 1
                    ? "Visible"
                    : "Hidden"}
                </span>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    onThemeToggle &&
                    onThemeToggle(component.id, component.theme === 1 ? 2 : 1)
                  }
                  disabled={isReordering}
                  className={`w-6 h-4 rounded-full border transition-colors flex items-center ${
                    component.theme === 1
                      ? "bg-yellow-400 border-yellow-500 justify-end"
                      : "bg-gray-600 border-gray-500 justify-start"
                  } ${
                    isReordering
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:scale-105"
                  }`}
                  title={`Theme: ${component.theme === 1 ? "Light" : "Dark"}`}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all ${
                      component.theme === 1 ? "bg-white" : "bg-gray-300"
                    }`}
                  />
                </button>
                <span className="text-xs text-gray-400">
                  {component.theme === 1 ? "☀️ Light" : "🌙 Dark"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded cursor-grab active:cursor-grabbing"
            title="Drag to reorder"
          >
            <Bars3Icon className="h-4 w-4" />
          </div>

          {/* Action buttons */}
          <button
            onClick={onEdit}
            disabled={isReordering}
            className={`p-1 rounded ${
              isReordering
                ? "text-gray-500 cursor-not-allowed"
                : "text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
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
                ? "text-gray-500 cursor-not-allowed"
                : "text-red-400 hover:text-red-300 hover:bg-red-500/10"
            }`}
            title={`Delete component ID: ${component.id}`}
          >
            <TrashIcon className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;

