import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import "./PageComponentsEditor.css";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal, { ModalFooter } from "../UI/Modal";
import DynamicFormField from "../UI/DynamicFormField";
import Card, { CardContent } from "../UI/Card";
import FancyToggle from "../UI/FancyToggle";
import pagesAPI from "../../lib/pagesAPI";
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
import {
  parseJsonToFormFields,
  generateFormFieldsFromJson,
  updateJsonFromFormFields,
} from "../../utils/jsonFormUtils";
import { categorizeComponent, getComponentIcon } from "../../utils/componentHelpers";
import {
  ComponentCard,
  AddComponentModal,
  EditComponentModal,
} from "./PageComponentsEditor/index";

const PageComponentsEditor = ({
  pageId,
  pageName,
  onClose,
  onSave,
  showToast,
}) => {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [availableComponents, setAvailableComponents] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingComponent, setEditingComponent] = useState(null);

  // Load components and available components on mount
  useEffect(() => {
    console.log("PageComponentsEditor mounted with pageId:", pageId);
    loadComponents();
    loadAvailableComponents();
  }, [pageId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Add validation for component IDs
  useEffect(() => {
    console.log("🔍 [COMPONENTS STATE UPDATE]", {
      componentsCount: components.length,
      componentIds: components.map((c) => c.id),
      hasDuplicateIds:
        new Set(components.map((c) => c.id)).size !== components.length,
    });
  }, [components]);

  // Load available components from component map
  const loadAvailableComponents = async () => {
    try {
      // Lazy import to prevent circular deps when builder imports registry that imports components directory
      const { idToPathMap } = await import("../componentMap");

      // Build a generic list using keys; categorize by enhanced heuristics
      const items = Object.keys(idToPathMap).map((componentType) => {
        const path = idToPathMap[componentType];
        const category = categorizeComponent(componentType, path);
        const icon = getComponentIcon(componentType, category);

        return {
          id: componentType,
          name: componentType.replace(/([A-Z])/g, " $1").trim(), // Add spaces before capital letters
          description: `Component: ${componentType}`,
          icon,
          componentType,
          componentName: componentType,
          category,
        };
      });

      setAvailableComponents(items);
    } catch (e) {
      console.error("Failed to load component map", e);
      // Fallback to basic components
      setAvailableComponents([
        {
          id: "Generic",
          name: "Generic",
          componentType: "Generic",
          category: "layout",
          icon: "📄",
        },
        {
          id: "Hero",
          name: "Hero",
          componentType: "Hero",
          category: "layout",
          icon: "🎯",
        },
        {
          id: "Text",
          name: "Text",
          componentType: "Text",
          category: "content",
          icon: "📝",
        },
        {
          id: "Image",
          name: "Image",
          componentType: "Image",
          category: "media",
          icon: "🖼️",
        },
      ]);
    }
  };

  // categorizeComponent and getComponentIcon are now imported from utils/componentHelpers

  // Helper function to normalize order indices and ensure uniqueness
  const normalizeOrderIndices = (components) => {
    console.log(
      "🔧 [NORMALIZE] Input components:",
      components.map((c) => ({ id: c.id, order: c.orderIndex }))
    );

    // Sort components by their current orderIndex, then by ID as fallback
    const sorted = [...components].sort((a, b) => {
      if (a.orderIndex === b.orderIndex) {
        return a.id - b.id; // Use ID as tiebreaker
      }
      return (a.orderIndex || 0) - (b.orderIndex || 0);
    });

    // Reassign sequential order indices starting from 0
    const normalized = sorted.map((component, index) => ({
      ...component,
      orderIndex: index,
    }));

    console.log(
      "✅ [NORMALIZE] Normalized components:",
      normalized.map((c) => ({ id: c.id, order: c.orderIndex }))
    );
    return normalized;
  };

  // Function to repair order index conflicts in the database
  const repairOrderIndices = async () => {
    try {
      console.log("🔧 [REPAIR] Starting order index repair...");

      // First, let's diagnose the current state
      const orderDiagnosis = components.map((c) => ({
        id: c.id,
        name: c.componentName || c.componentType,
        order: c.orderIndex,
      }));
      console.log("📊 [DIAGNOSIS] Current component order:", orderDiagnosis);

      // Check for conflicts
      const orderCounts = {};
      components.forEach((c) => {
        const order = c.orderIndex || 0;
        orderCounts[order] = (orderCounts[order] || 0) + 1;
      });

      const conflicts = Object.entries(orderCounts).filter(
        ([, count]) => count > 1
      );

      if (conflicts.length === 0) {
        showToast(
          "No order conflicts found! Components are properly ordered.",
          "success"
        );
        return;
      }

      console.warn(
        "⚠️ [CONFLICTS DETECTED]:",
        conflicts.map(([order, count]) => `Order ${order}: ${count} components`)
      );

      const shouldProceed = window.confirm(
        `Found ${conflicts.length} order conflict(s). This will reassign order indices to fix the conflicts. Continue?`
      );

      if (!shouldProceed) {
        return;
      }

      setSaving(true);

      // Reload components to get current state from database
      const comps = await pagesAPI.getPageComponents(pageId);

      if (!comps || !Array.isArray(comps)) {
        throw new Error("Failed to load components for repair");
      }

      // Normalize the order indices
      const normalizedComponents = normalizeOrderIndices(comps);

      // Show the user what changes will be made
      const changes = [];
      normalizedComponents.forEach((norm) => {
        const original = comps.find((c) => c.id === norm.id);
        if (original && original.orderIndex !== norm.orderIndex) {
          changes.push({
            id: norm.id,
            name: norm.componentName || norm.componentType,
            from: original.orderIndex,
            to: norm.orderIndex,
          });
        }
      });

      console.log("� [REPAIR PLAN]:", changes);

      // Update each component with its new orderIndex
      for (const change of changes) {
        console.log(
          `🔧 [REPAIR] Updating component ${change.id} (${change.name}): ${change.from} → ${change.to}`
        );

        const component = normalizedComponents.find((c) => c.id === change.id);
        await pagesAPI.updatePageComponent(component.id, {
          id: component.id,
          pageId: pageId,
          componentType: component.componentType,
          componentName: component.componentName,
          contentJson: component.contentJson,
          orderIndex: change.to,
          isVisible:
            component.isVisible !== undefined ? component.isVisible : true,
          theme: component.theme !== undefined ? component.theme : 1,
        });
      }

      // Reload the components after repair
      await loadComponents(true);

      showToast(
        `Order indices repaired! Updated ${changes.length} component(s).`,
        "success"
      );
      console.log("✅ [REPAIR] Order index repair completed");
    } catch (error) {
      console.error("❌ [REPAIR ERROR]:", error);
      showToast("Error repairing order indices: " + error.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const loadComponents = async (forceRefresh = false) => {
    try {
      setLoading(true);
      console.log(
        "🔄 [LOAD COMPONENTS] Loading components, forceRefresh:",
        forceRefresh
      );

      // Add cache busting parameter
      const cacheBuster = forceRefresh ? `?t=${Date.now()}` : "";
      const comps = await pagesAPI.getPageComponents(pageId + cacheBuster);

      console.log("📦 [LOAD COMPONENTS] Raw API response:", comps);

      if (comps && Array.isArray(comps)) {
        console.log("🎯 [LOAD COMPONENTS] Extracted components:", comps.length);
        console.log(
          "🔍 [LOAD COMPONENTS] Component IDs:",
          comps.map((c) => c.id)
        );

        // Check for duplicate orderIndex values
        const orderIndices = comps.map((c) => c.orderIndex);
        const hasDuplicates =
          orderIndices.length !== new Set(orderIndices).size;

        if (hasDuplicates) {
          console.warn(
            "⚠️ [ORDER CONFLICT] Duplicate orderIndex detected, normalizing..."
          );
          const normalizedComponents = normalizeOrderIndices(comps);
          setComponents(normalizedComponents);
        } else {
          setComponents(comps);
        }
      } else {
        console.warn("⚠️ [LOAD COMPONENTS] No components found in response");
        setComponents([]);
      }
    } catch (error) {
      console.error("❌ [LOAD COMPONENTS ERROR]:", error);
      showToast("Error loading page components", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComponent = async (componentData) => {
    const MAX_RETRIES = 3;
    const tempId = `temp-${Date.now()}`;

    try {
      setSaving(true);

      // Always fetch the latest components to avoid stale data
      console.log(
        "🔄 [ADD COMPONENT] Fetching latest components for page:",
        pageId
      );
      const latestComponents = await pagesAPI.getPageComponents(pageId);

      // Calculate safe next order index
      const maxOrderIndex = latestComponents.length
        ? Math.max(...latestComponents.map((c) => c.orderIndex ?? 0))
        : -1;
      let nextOrderIndex = maxOrderIndex + 1;

      console.log(
        "🆕 [ADD COMPONENT] Calculated nextOrderIndex:",
        nextOrderIndex,
        "from",
        latestComponents.length,
        "existing components"
      );

      // Create optimistic UI item
      const optimisticItem = {
        id: tempId,
        pageId: parseInt(pageId),
        componentType: componentData.componentType || "Generic",
        componentName: componentData.componentName || "New Component",
        contentJson:
          typeof componentData.contentJson === "string"
            ? componentData.contentJson
            : JSON.stringify(
                componentData.contentJson || { title: "", content: "" }
              ),
        orderIndex: nextOrderIndex,
        isVisible:
          typeof componentData.isVisible === "boolean"
            ? componentData.isVisible
            : !!componentData.isVisible,
        theme: Number(componentData.theme) || 1,
        pending: true, // Mark as pending
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add optimistic item to UI immediately
      setComponents((prev) => [...prev, optimisticItem]);

      let created = null;
      let attempt = 0;

      // Retry logic for duplicate key errors
      while (attempt < MAX_RETRIES && !created) {
        try {
          const payload = {
            pageId: parseInt(pageId),
            componentType: optimisticItem.componentType,
            componentName: optimisticItem.componentName,
            contentJson:
              typeof optimisticItem.contentJson === "string"
                ? optimisticItem.contentJson
                : JSON.stringify(
                    optimisticItem.contentJson || { title: "", content: "" }
                  ),
            orderIndex: nextOrderIndex,
            isVisible:
              typeof optimisticItem.isVisible === "boolean"
                ? optimisticItem.isVisible
                : !!optimisticItem.isVisible,
            theme: Number(optimisticItem.theme) || 1,
          };

          console.log(
            `🚀 [ADD COMPONENT] Attempt ${
              attempt + 1
            }/${MAX_RETRIES} with payload:`,
            payload
          );

          created = await pagesAPI.createPageComponent(pageId, payload);

          // Replace optimistic item with real component
          setComponents((prev) =>
            prev.map((item) => (item.id === tempId ? created : item))
          );

          console.log(
            "✅ [ADD COMPONENT] Successfully created component:",
            created
          );
        } catch (err) {
          const errorMessage =
            err.response?.data?.message ||
            err.message ||
            JSON.stringify(err.response?.data);
          const isDuplicateKey =
            errorMessage?.includes("IX_PageComponents_PageId_OrderIndex") ||
            errorMessage?.includes("duplicate key") ||
            err.response?.data?.errorCode === 2601;

          console.error(`❌ [ADD COMPONENT] Attempt ${attempt + 1} failed:`, {
            error: errorMessage,
            isDuplicateKey,
            nextOrderIndex,
            response: err.response?.data,
          });

          if (isDuplicateKey && attempt < MAX_RETRIES - 1) {
            console.warn(
              "🔄 [RETRY] Duplicate order index detected, normalizing all order indices..."
            );

            // Refetch latest components
            const refreshedComponents = await pagesAPI.getPageComponents(
              pageId
            );
            // Normalize all order indices to be unique and sequential
            const normalized = refreshedComponents
              .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
              .map((c, idx) => ({ ...c, orderIndex: idx }));
            // Update all components in backend
            for (const comp of normalized) {
              await pagesAPI.updatePageComponent(comp.id, {
                ...comp,
                orderIndex: comp.orderIndex,
              });
            }
            // Recalculate nextOrderIndex
            nextOrderIndex = normalized.length;
            console.log(
              "🔄 [RETRY] Normalized all order indices. Next orderIndex:",
              nextOrderIndex
            );
            attempt++;
            continue;
          } else {
            throw err;
          }
        }
      }

      if (!created) {
        // Remove optimistic item if all retries failed
        setComponents((prev) => prev.filter((item) => item.id !== tempId));
        showToast(
          "Unable to add component after multiple attempts. Please try again.",
          "error"
        );
        return;
      }

      setShowAddModal(false);
      showToast("Component added successfully", "success");
      if (typeof onSave === "function") {
        onSave();
      }
    } catch (error) {
      console.error("❌ [ADD COMPONENT] Final error:", error);

      // Remove optimistic item on error
      setComponents((prev) => prev.filter((item) => item.id !== tempId));

      const errorMessage = error.response?.data?.message || error.message;
      showToast(`Error adding component: ${errorMessage}`, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateComponent = async (componentId, componentData) => {
    try {
      setSaving(true);

      // Find the current component to preserve its orderIndex
      const currentComponent = components.find(
        (comp) => comp.id === componentId
      );

      if (!currentComponent) {
        throw new Error("Component not found in local state");
      }

      // Validate orderIndex uniqueness if it's being changed
      let finalOrderIndex = currentComponent.orderIndex;
      if (
        componentData.orderIndex !== undefined &&
        componentData.orderIndex !== currentComponent.orderIndex
      ) {
        // Check if the new orderIndex conflicts with existing components
        const conflictingComponent = components.find(
          (comp) =>
            comp.id !== componentId &&
            comp.orderIndex === componentData.orderIndex
        );

        if (conflictingComponent) {
          console.warn(
            "🚨 [ORDER CONFLICT] OrderIndex conflict detected, reassigning..."
          );
          // Find the next available orderIndex
          const usedIndices = components
            .map((c) => c.orderIndex)
            .filter((idx) => idx !== currentComponent.orderIndex);
          let newIndex = 0;
          while (usedIndices.includes(newIndex)) {
            newIndex++;
          }
          finalOrderIndex = newIndex;
        } else {
          finalOrderIndex = componentData.orderIndex;
        }
      }

      // Prepare complete component data structure as expected by the API
      const updateData = {
        id: componentId, // Include component ID
        pageId: pageId, // Include page ID from props
        componentType:
          componentData.componentType || currentComponent.componentType,
        componentName:
          componentData.componentName || currentComponent.componentName,
        contentJson: componentData.contentJson || currentComponent.contentJson,
        orderIndex: finalOrderIndex, // Always include orderIndex to ensure consistency
        isVisible:
          componentData.isVisible !== undefined
            ? componentData.isVisible
            : currentComponent?.isVisible ?? true,
        theme:
          componentData.theme !== undefined
            ? componentData.theme
            : currentComponent?.theme ?? 1,
      };

      console.log("Updating component with data:", updateData);
      console.log(
        "🔍 [ORDER CHECK] Current orderIndex:",
        currentComponent.orderIndex,
        "→ New orderIndex:",
        finalOrderIndex
      );

      const updatedComponent = await pagesAPI.updatePageComponent(
        componentId,
        updateData
      );

      setComponents((prev) =>
        prev.map((comp) => (comp.id === componentId ? updatedComponent : comp))
      );
      setEditingComponent(null);
      showToast("Component updated successfully", "success");
    } catch (error) {
      console.error("Error updating component:", error);

      // Check if it's a duplicate key error and offer to repair
      if (
        error.message.includes("duplicate key") &&
        error.message.includes("OrderIndex")
      ) {
        const shouldRepair = window.confirm(
          "There's a conflict with component order. Would you like to automatically fix the order indices?"
        );
        if (shouldRepair) {
          await repairOrderIndices();
          return; // Exit early after repair
        }
      }

      showToast("Error updating component: " + error.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // Add validation before deletion
  const validateComponentDeletion = (componentId, components) => {
    const component = components.find((comp) => comp.id === componentId);

    if (!component) {
      return { isValid: false, message: "Component not found" };
    }

    console.log("🔍 [DELETE VALIDATION] Component to delete:", {
      id: component.id,
      type: component.componentType,
      order: component.orderIndex,
    });

    return { isValid: true, message: "Valid for deletion" };
  };

  const handleDeleteComponent = async (componentId) => {
    console.log(
      "🗑️ [DELETE COMPONENT] Deleting component with ID:",
      componentId
    );

    if (!componentId) {
      console.error("❌ [DELETE ERROR] No component ID provided");
      showToast("Cannot delete: No component ID", "error");
      return;
    }

    // Validate component exists before deletion
    const validation = validateComponentDeletion(componentId, components);

    if (!validation.isValid) {
      console.error("❌ [DELETE VALIDATION FAILED]:", validation.message);
      showToast(validation.message, "error");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this component?")) {
      return;
    }

    try {
      setLoading(true);

      // Use the correct endpoint - only component ID is needed
      await pagesAPI.deletePageComponent(componentId);
      console.log("✅ [DELETE SUCCESS] Component deleted from API");

      // Update local state immediately
      setComponents((prevComponents) => {
        const updatedComponents = prevComponents.filter(
          (comp) => comp.id !== componentId
        );
        console.log(
          "🔄 [STATE UPDATE] Components after deletion:",
          updatedComponents
        );
        return updatedComponents;
      });

      showToast("Component deleted successfully", "success");
    } catch (error) {
      console.error("❌ [DELETE ERROR] Failed to delete component:", error);

      // Show specific error message
      if (error.response?.status === 404) {
        showToast("Component not found", "error");
      } else if (error.response?.status === 500) {
        showToast("Server error while deleting component", "error");
      } else {
        showToast("Failed to delete component", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = components.findIndex((item) => item.id === active.id);
      const newIndex = components.findIndex((item) => item.id === over.id);

      const newComponents = arrayMove(components, oldIndex, newIndex);

      // Update orderIndex for all components
      const reorderedComponents = newComponents.map((comp, index) => ({
        ...comp,
        orderIndex: index + 1,
      }));

      // Optimistically update UI first
      setComponents(reorderedComponents);

      try {
        console.log(
          `Reordering components: ${reorderedComponents
            .map((comp) => comp.id)
            .join(", ")}`
        );

        await pagesAPI.reorderPageComponents(pageId, reorderedComponents);
        showToast("Components reordered successfully", "success");
      } catch (error) {
        console.error("Error reordering components:", error);

        // Show specific error message
        let errorMessage = "Error reordering components";
        if (error.message.includes("circular dependency")) {
          errorMessage =
            "Unable to reorder components due to a conflict. Please try again.";
        } else if (error.message.includes("not found")) {
          errorMessage =
            "One or more components could not be found. Please refresh and try again.";
        } else {
          errorMessage = `Error reordering components: ${error.message}`;
        }

        showToast(errorMessage, "error");

        // Revert on error by reloading components
        console.log("Reverting component order due to error...");
        await loadComponents();
      }
    }
  };

  // Instant update functions for theme and visibility
  const handleInstantVisibilityToggle = async (componentId, newVisibility) => {
    try {
      // Find the current component
      const currentComponent = components.find(
        (comp) => comp.id === componentId
      );
      if (!currentComponent) {
        showToast("Component not found", "error");
        return;
      }

      // Optimistically update UI first
      setComponents((prev) =>
        prev.map((comp) =>
          comp.id === componentId ? { ...comp, isVisible: newVisibility } : comp
        )
      );

      // Prepare complete update data
      const updateData = {
        ...currentComponent,
        isVisible: newVisibility,
      };

      // Send update to backend
      await pagesAPI.updatePageComponent(componentId, updateData);

      console.log("✅ [INSTANT UPDATE] Visibility updated:", {
        componentId,
        newVisibility,
        componentName: currentComponent.componentName,
      });
    } catch (error) {
      console.error("❌ [INSTANT UPDATE ERROR] Visibility:", error);

      // Revert the optimistic update on error
      setComponents((prev) =>
        prev.map((comp) =>
          comp.id === componentId
            ? { ...comp, isVisible: !newVisibility }
            : comp
        )
      );

      showToast("Failed to update visibility: " + error.message, "error");
    }
  };

  const handleInstantThemeToggle = async (componentId, newTheme) => {
    try {
      // Find the current component
      const currentComponent = components.find(
        (comp) => comp.id === componentId
      );
      if (!currentComponent) {
        showToast("Component not found", "error");
        return;
      }

      // Optimistically update UI first
      setComponents((prev) =>
        prev.map((comp) =>
          comp.id === componentId ? { ...comp, theme: newTheme } : comp
        )
      );

      // Prepare complete update data
      const updateData = {
        ...currentComponent,
        theme: newTheme,
      };

      // Send update to backend
      await pagesAPI.updatePageComponent(componentId, updateData);

      console.log("✅ [INSTANT UPDATE] Theme updated:", {
        componentId,
        newTheme: newTheme === 1 ? "light" : "dark",
        componentName: currentComponent.componentName,
      });
    } catch (error) {
      console.error("❌ [INSTANT UPDATE ERROR] Theme:", error);

      // Revert the optimistic update on error
      const revertTheme = newTheme === 1 ? 2 : 1;
      setComponents((prev) =>
        prev.map((comp) =>
          comp.id === componentId ? { ...comp, theme: revertTheme } : comp
        )
      );

      showToast("Failed to update theme: " + error.message, "error");
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
          <p className="text-xs text-gray-300">
            Manage components for "{pageName}"
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => loadComponents(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white flex items-center space-x-1 text-sm px-3 py-1"
            disabled={loading}
          >
            <ArrowPathIcon className="h-3 w-3" />
            <span>Force Refresh</span>
          </Button>
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
            <h3 className="text-lg font-medium text-white mb-2">
              No Components
            </h3>
            <p className="text-gray-300 mb-4">
              This page doesn't have any components yet.
            </p>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add First Component
            </Button>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={components.map((comp) => comp.id)}
              strategy={verticalListSortingStrategy}
            >
              {components.map((component, index) => {
                console.log(`🎨 [RENDER COMPONENT ${index}]`, {
                  id: component.id,
                  type: component.componentType,
                  order: component.orderIndex,
                });

                return (
                  <ComponentCard
                    key={component.id}
                    component={component}
                    index={index}
                    onEdit={() => setEditingComponent(component)}
                    onDelete={() => handleDeleteComponent(component.id)}
                    onVisibilityToggle={handleInstantVisibilityToggle}
                    onThemeToggle={handleInstantThemeToggle}
                    isReordering={saving}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Add Component Modal */}
      <AddComponentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddComponent}
        loading={saving}
        availableComponents={availableComponents}
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

// ComponentCard, AddComponentModal, and EditComponentModal are now imported from ./PageComponentsEditor/
// Old definitions removed - see src/components/Admin/PageComponentsEditor/ folder

export default PageComponentsEditor;
