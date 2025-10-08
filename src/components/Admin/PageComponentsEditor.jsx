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

  // Component categorization function (reused from EnhancedPageBuilder)
  const categorizeComponent = (componentType, path) => {
    const lowerType = componentType.toLowerCase();
    const lowerPath = (path || "").toLowerCase();

    // Hero components
    if (lowerType.includes("hero")) return "hero";

    // Layout components
    if (
      lowerType.includes("header") ||
      lowerType.includes("footer") ||
      lowerType.includes("navigation") ||
      lowerType.includes("nav") ||
      lowerType.includes("layout")
    )
      return "layout";

    // CTA components
    if (
      lowerType.includes("cta") ||
      lowerType.includes("calltoaction") ||
      lowerType.includes("contact") ||
      lowerType.includes("demo")
    )
      return "cta";

    // FAQ components
    if (lowerType.includes("faq") || lowerType.includes("questions"))
      return "faq";

    // Pricing components
    if (
      lowerType.includes("pricing") ||
      lowerType.includes("price") ||
      lowerType.includes("plan") ||
      lowerType.includes("subscription")
    )
      return "pricing";

    // About/Team components
    if (
      lowerType.includes("about") ||
      lowerType.includes("team") ||
      lowerType.includes("member") ||
      lowerType.includes("staff") ||
      lowerPath.includes("about/")
    )
      return "about";

    // Features/Benefits components
    if (
      lowerType.includes("feature") ||
      lowerType.includes("benefit") ||
      lowerType.includes("advantage")
    )
      return "features";

    // Testimonials/Reviews
    if (
      lowerType.includes("testimonial") ||
      lowerType.includes("review") ||
      lowerType.includes("feedback")
    )
      return "testimonials";

    // Solution components
    if (lowerPath.includes("solution/") || lowerType.includes("solution"))
      return "solution";

    // Services components
    if (lowerPath.includes("services/") || lowerType.includes("service"))
      return "services";

    // Industry components
    if (lowerPath.includes("industries/") || lowerType.includes("industry"))
      return "industry";

    // Portfolio/Gallery
    if (
      lowerType.includes("portfolio") ||
      lowerType.includes("gallery") ||
      lowerType.includes("showcase")
    )
      return "portfolio";

    // Blog/News
    if (
      lowerType.includes("blog") ||
      lowerType.includes("news") ||
      lowerType.includes("article")
    )
      return "blog";

    // Default to content
    return "content";
  };

  // Component icon function (reused from EnhancedPageBuilder)
  const getComponentIcon = (componentType, category) => {
    const type = componentType.toLowerCase();

    // Specific component icons
    if (type.includes("hero")) return "🎯";
    if (type.includes("header")) return "📋";
    if (type.includes("footer")) return "📄";
    if (type.includes("navigation") || type.includes("nav")) return "🧭";
    if (type.includes("sidebar")) return "📑";
    if (type.includes("image") || type.includes("gallery")) return "🖼️";
    if (type.includes("video")) return "🎥";
    if (type.includes("carousel") || type.includes("slider")) return "🎠";
    if (type.includes("form") || type.includes("contact")) return "📝";
    if (type.includes("button")) return "🔘";
    if (type.includes("modal")) return "🪟";
    if (type.includes("dropdown")) return "🔽";
    if (type.includes("table")) return "📊";
    if (type.includes("list")) return "📋";
    if (type.includes("grid")) return "⚏";
    if (type.includes("chart")) return "📈";
    if (type.includes("statistics") || type.includes("stats")) return "📊";
    if (type.includes("product") || type.includes("shop")) return "🛍️";
    if (type.includes("cart")) return "🛒";
    if (type.includes("checkout")) return "💳";
    if (type.includes("pricing")) return "💰";

    // Category-based icons
    switch (category) {
      case "hero":
        return "🎯";
      case "layout":
        return "📐";
      case "cta":
        return "📞";
      case "faq":
        return "❓";
      case "pricing":
        return "💰";
      case "about":
        return "👥";
      case "features":
        return "⭐";
      case "testimonials":
        return "💬";
      case "solution":
        return "🔧";
      case "services":
        return "🛠️";
      case "industry":
        return "🏭";
      case "portfolio":
        return "🖼️";
      case "blog":
        return "📝";
      case "content":
        return "📄";
      default:
        return "📄";
    }
  };

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
          componentData.contentJson ||
          JSON.stringify({ title: "", content: "" }),
        orderIndex: nextOrderIndex,
        isVisible: componentData.isVisible ?? true,
        theme: componentData.theme ?? 1,
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
            contentJson: optimisticItem.contentJson,
            orderIndex: nextOrderIndex,
            isVisible: optimisticItem.isVisible,
            theme: optimisticItem.theme,
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
              "🔄 [RETRY] Duplicate order index detected, refetching components..."
            );

            // Refetch latest components and recalculate order index
            const refreshedComponents = await pagesAPI.getPageComponents(
              pageId
            );
            const refreshedMax = refreshedComponents.length
              ? Math.max(...refreshedComponents.map((c) => c.orderIndex ?? 0))
              : -1;
            nextOrderIndex = refreshedMax + 1;

            console.log(
              "🔄 [RETRY] Recalculated nextOrderIndex:",
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
            onClick={repairOrderIndices}
            className="bg-yellow-600 hover:bg-yellow-700 text-white flex items-center space-x-1 text-sm px-3 py-1"
            disabled={loading || saving}
            title="Fix component order conflicts"
          >
            <Cog6ToothIcon className="h-3 w-3" />
            <span>Fix Order</span>
          </Button>
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

// Component Card with Structured Preview
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

// Add Component Modal with Enhanced Filtering
const AddComponentModal = ({
  isOpen,
  onClose,
  onSave,
  loading,
  availableComponents,
}) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    componentType: "",
    componentName: "",
    contentJson: JSON.stringify({}),
    isVisible: 1,
    theme: 1,
  });
  const [jsonData, setJsonData] = useState({});
  const [errors, setErrors] = useState({});

  // Dynamic category generation based on available components
  const categories = React.useMemo(() => {
    // Get components that match search term (if any)
    const searchFilteredComponents = searchTerm.trim()
      ? availableComponents.filter((comp) => {
          const search = searchTerm.toLowerCase().trim();
          return (
            comp.name.toLowerCase().includes(search) ||
            comp.componentType.toLowerCase().includes(search) ||
            comp.category.toLowerCase().includes(search) ||
            comp.description.toLowerCase().includes(search)
          );
        })
      : availableComponents;

    // Count components per category (considering search filter)
    const categoryCounts = {};
    searchFilteredComponents.forEach((comp) => {
      categoryCounts[comp.category] = (categoryCounts[comp.category] || 0) + 1;
    });

    // Start with "All Components"
    const dynamicCategories = [
      {
        id: "all",
        name: "All Components",
        icon: "📄",
        count: searchFilteredComponents.length,
      },
    ];

    // Extract unique categories from available components
    const uniqueCategories = [
      ...new Set(
        availableComponents
          .map((comp) => comp.category)
          .filter((category) => category && category !== "all")
      ),
    ];

    // Define category icons and display names
    const categoryConfig = {
      hero: { name: "Hero", icon: "🎯" },
      layout: { name: "Layout", icon: "📐" },
      cta: { name: "Call to Action", icon: "📞" },
      faq: { name: "FAQ", icon: "❓" },
      pricing: { name: "Pricing", icon: "💰" },
      about: { name: "About", icon: "👥" },
      features: { name: "Features", icon: "⭐" },
      testimonials: { name: "Testimonials", icon: "💬" },
      solution: { name: "Solution", icon: "🔧" },
      services: { name: "Services", icon: "🛠️" },
      industry: { name: "Industry", icon: "🏭" },
      portfolio: { name: "Portfolio", icon: "🖼️" },
      blog: { name: "Blog", icon: "📝" },
      content: { name: "Content", icon: "📄" },
    };

    // Add dynamic categories
    uniqueCategories.forEach((category) => {
      const config = categoryConfig[category] || { name: category, icon: "📄" };
      dynamicCategories.push({
        id: category,
        name: config.name,
        icon: config.icon,
        count: categoryCounts[category] || 0,
      });
    });

    return dynamicCategories;
  }, [availableComponents, searchTerm]);

  const filteredComponents = React.useMemo(() => {
    let filtered = availableComponents;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((comp) => comp.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (comp) =>
          comp.name.toLowerCase().includes(search) ||
          comp.componentType.toLowerCase().includes(search) ||
          comp.category.toLowerCase().includes(search) ||
          comp.description.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [availableComponents, selectedCategory, searchTerm]);

  const handleJsonFieldChange = (path, value) => {
    const updatedJsonData = updateJsonFromFormFields(jsonData, path, value);
    setJsonData(updatedJsonData);
    setFormData((prev) => ({
      ...prev,
      contentJson: JSON.stringify(updatedJsonData, null, 2),
    }));
  };

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
    setFormData((prev) => ({
      ...prev,
      componentType: component.componentType,
      componentName: component.name,
      isVisible: 1, // Default to visible
      theme: 1, // Default to light theme
    }));

    // Initialize with basic JSON structure based on component type
    const basicJson = getBasicJsonForComponent(component.componentType);
    setJsonData(basicJson);
    setFormData((prev) => ({
      ...prev,
      contentJson: JSON.stringify(basicJson, null, 2),
    }));
  };

  const getBasicJsonForComponent = (componentType) => {
    const type = componentType.toLowerCase();

    if (type.includes("hero")) {
      return {
        title: "",
        subtitle: "",
        description: "",
        imageUrl: "",
        buttonText: "",
        buttonUrl: "",
      };
    } else if (type.includes("cta")) {
      return {
        title: "",
        description: "",
        buttonText: "",
        buttonUrl: "",
        backgroundColor: "",
      };
    } else if (type.includes("pricing")) {
      return {
        title: "",
        subtitle: "",
        plans: [
          {
            name: "Basic",
            price: "",
            features: [],
            buttonText: "Get Started",
            buttonUrl: "",
          },
        ],
      };
    } else if (type.includes("faq")) {
      return {
        title: "",
        subtitle: "",
        questions: [{ question: "", answer: "" }],
      };
    } else if (type.includes("about") || type.includes("team")) {
      return {
        title: "",
        subtitle: "",
        description: "",
        members: [{ name: "", role: "", image: "", bio: "" }],
      };
    } else if (type.includes("feature") || type.includes("benefit")) {
      return {
        title: "",
        subtitle: "",
        features: [{ title: "", description: "", icon: "" }],
      };
    } else if (type.includes("testimonial")) {
      return {
        title: "",
        subtitle: "",
        testimonials: [
          { name: "", role: "", company: "", content: "", image: "" },
        ],
      };
    } else if (type.includes("solution") || type.includes("service")) {
      return {
        title: "",
        subtitle: "",
        description: "",
        features: [],
        benefits: [],
      };
    } else if (type.includes("industry")) {
      return {
        title: "",
        subtitle: "",
        description: "",
        challenges: [],
        solutions: [],
      };
    } else if (type.includes("image") || type.includes("gallery")) {
      return {
        imageUrl: "",
        alt: "",
        caption: "",
        width: "",
        height: "",
      };
    } else if (type.includes("form") || type.includes("contact")) {
      return {
        title: "",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          {
            name: "message",
            label: "Message",
            type: "textarea",
            required: true,
          },
        ],
      };
    } else if (type.includes("text") || type.includes("content")) {
      return {
        title: "",
        content: "",
        alignment: "left",
      };
    } else {
      return {
        title: "",
        content: "",
      };
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedComponent) {
      newErrors.component = "Please select a component type";
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
      setSelectedComponent(null);
      setFormData({
        componentType: "",
        componentName: "",
        contentJson: JSON.stringify({}),
      });
      setJsonData({});
      setErrors({});
      setSearchTerm("");
      setSelectedCategory("all");
    }
  };

  const dynamicFields = generateFormFieldsFromJson(
    jsonData,
    handleJsonFieldChange
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Component" size="xl">
      <div className="flex h-[80vh]">
        {/* Left Panel - Component Selection */}
        <div className="w-1/2 border-r border-white/20 p-4 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <DocumentTextIcon className="h-5 w-5 mr-2 text-blue-400" />
              Select Component Type
            </h3>

            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-white/20 bg-white/5 text-white placeholder:text-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white border-blue-500"
                      : "bg-white/10 text-gray-300 border-white/20 hover:bg-white/20"
                  }`}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Component Grid */}
            <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
              {filteredComponents.map((component) => (
                <Card
                  key={component.id}
                  className={`cursor-pointer transition-all duration-200 border ${
                    selectedComponent?.id === component.id
                      ? "bg-blue-600/20 border-blue-500 shadow-lg"
                      : "bg-white/10 border-white/20 hover:bg-white/15"
                  }`}
                  onClick={() => handleComponentSelect(component)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{component.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate">
                          {component.name}
                        </h4>
                        <p className="text-xs text-gray-300 truncate">
                          {component.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded">
                            {component.category}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">
                            {component.componentType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredComponents.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <DocumentTextIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No components found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Component Configuration */}
        <div className="w-1/2 p-4 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <DocumentTextIcon className="h-5 w-5 mr-2 text-green-400" />
              Configure Component
            </h3>

            {selectedComponent ? (
              <>
                {/* Selected Component Info */}
                <div className="bg-white/10 border border-white/20 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{selectedComponent.icon}</div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {selectedComponent.name}
                      </h4>
                      <p className="text-xs text-gray-300">
                        {selectedComponent.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Component Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">
                    Component Name
                  </label>
                  <Input
                    type="text"
                    value={formData.componentName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        componentName: e.target.value,
                      }))
                    }
                    placeholder="Enter component name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    maxLength={100}
                  />
                  {errors.componentName && (
                    <p className="text-sm text-red-400">
                      {errors.componentName}
                    </p>
                  )}
                </div>

                {/* Dynamic Content Fields */}
                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-white">
                    Content Fields
                  </h4>

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
                      <DocumentTextIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-300 text-sm">
                        No content fields configured
                      </p>
                    </div>
                  )}
                </div>

                {/* Raw JSON View (Collapsible) */}
                <div className="space-y-2">
                  <details className="group">
                    <summary className="cursor-pointer text-sm font-medium text-gray-300 hover:text-white flex items-center">
                      <DocumentTextIcon className="h-4 w-4 mr-2" />
                      Raw JSON View
                      <span className="ml-2 text-xs text-gray-400 group-open:rotate-90 transition-transform">
                        ▶
                      </span>
                    </summary>
                    <div className="mt-2">
                      <textarea
                        value={formData.contentJson}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            contentJson: e.target.value,
                          }));
                          try {
                            const parsed = JSON.parse(e.target.value);
                            setJsonData(parsed);
                          } catch {
                            // Invalid JSON, don't update jsonData
                          }
                        }}
                        rows={6}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
                        placeholder='{"title": "Example", "content": "..."}'
                      />
                      {errors.contentJson && (
                        <p className="text-sm text-red-400 mt-2">
                          {errors.contentJson}
                        </p>
                      )}
                    </div>
                  </details>

                  {/* Component Configuration Controls for Add Modal */}
                  {selectedComponent && (
                    <div className="space-y-3 border-t border-white/10 pt-4 mt-4">
                      <h3 className="text-md font-semibold text-white flex items-center">
                        <Cog6ToothIcon className="h-4 w-4 mr-2 text-purple-400" />
                        Component Configuration
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Visibility Toggle */}
                        <div>
                          <FancyToggle
                            label="Component Visible"
                            checked={
                              formData.isVisible === true ||
                              formData.isVisible === 1
                            }
                            onChange={(val) =>
                              setFormData((prev) => ({
                                ...prev,
                                isVisible: val, // Use boolean values for API compatibility
                              }))
                            }
                            gradient="green"
                            description="Toggle component visibility on the page"
                          />
                        </div>

                        {/* Theme Toggle */}
                        <div>
                          <FancyToggle
                            label="Light Theme"
                            checked={formData.theme === 1}
                            onChange={(val) =>
                              setFormData((prev) => ({
                                ...prev,
                                theme: val ? 1 : 2, // 1=light, 2=dark per ThemeMode enum
                              }))
                            }
                            gradient="blue"
                            description="Set component theme (light/dark)"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-gray-400">
                <DocumentTextIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h4 className="text-lg font-medium text-white mb-2">
                  Select a Component
                </h4>
                <p>
                  Choose a component type from the left panel to configure it
                </p>
              </div>
            )}
          </div>
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
          disabled={loading || !selectedComponent}
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
const EditComponentModal = ({
  isOpen,
  onClose,
  component,
  onSave,
  loading,
}) => {
  const [formData, setFormData] = useState({
    componentType: "",
    componentName: "",
    contentJson: "",
    isVisible: 1,
    theme: 1,
  });
  const [jsonData, setJsonData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (component) {
      const parsedJson = parseJsonToFormFields(component.contentJson);
      setFormData({
        componentType: component.componentType || "Generic",
        componentName: component.componentName || "",
        contentJson: component.contentJson || JSON.stringify({}),
        isVisible: component.isVisible ?? 1,
        theme: component.theme ?? 1,
      });
      setJsonData(parsedJson);
      setErrors({});
    }
  }, [component]);

  const handleJsonFieldChange = (path, value) => {
    const updatedJsonData = updateJsonFromFormFields(jsonData, path, value);
    setJsonData(updatedJsonData);
    setFormData((prev) => ({
      ...prev,
      contentJson: JSON.stringify(updatedJsonData, null, 2),
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

  const dynamicFields = generateFormFieldsFromJson(
    jsonData,
    handleJsonFieldChange
  );

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
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    componentType: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Generic" className="bg-gray-800 text-white">
                  Generic
                </option>
                <option value="Hero" className="bg-gray-800 text-white">
                  Hero
                </option>
                <option value="Text" className="bg-gray-800 text-white">
                  Text
                </option>
                <option value="Image" className="bg-gray-800 text-white">
                  Image
                </option>
                <option value="Gallery" className="bg-gray-800 text-white">
                  Gallery
                </option>
                <option value="Contact" className="bg-gray-800 text-white">
                  Contact
                </option>
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
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    componentName: e.target.value,
                  }))
                }
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
          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold text-white flex items-center">
              <DocumentTextIcon className="h-4 w-4 mr-2 text-green-400" />
              Content Fields
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  const fieldName = prompt("Enter field name:");
                  if (fieldName && fieldName.trim()) {
                    const newJsonData = { ...jsonData, [fieldName.trim()]: "" };
                    setJsonData(newJsonData);
                    setFormData((prev) => ({
                      ...prev,
                      contentJson: JSON.stringify(newJsonData, null, 2),
                    }));
                  }
                }}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs flex items-center space-x-1"
              >
                <PlusIcon className="h-3 w-3" />
                <span>Add Field</span>
              </button>
            </div>
          </div>

          {dynamicFields.length > 0 ? (
            <div className="space-y-4">
              {dynamicFields.map((field) => (
                <div key={field.key} className="relative">
                  <DynamicFormField
                    field={field}
                    onChange={handleJsonFieldChange}
                  />
                  <button
                    onClick={() => {
                      const newJsonData = { ...jsonData };
                      delete newJsonData[field.key];
                      setJsonData(newJsonData);
                      setFormData((prev) => ({
                        ...prev,
                        contentJson: JSON.stringify(newJsonData, null, 2),
                      }));
                    }}
                    className="absolute top-0 right-0 p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded"
                    title="Remove field"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white/5 rounded-lg border border-white/10">
              <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-white mb-2">
                No Content Fields
              </h4>
              <p className="text-gray-300 mb-4">
                This component doesn't have any content fields yet.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => {
                    const newJsonData = { title: "", content: "" };
                    setJsonData(newJsonData);
                    setFormData((prev) => ({
                      ...prev,
                      contentJson: JSON.stringify(newJsonData, null, 2),
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
                      buttonUrl: "",
                    };
                    setJsonData(newJsonData);
                    setFormData((prev) => ({
                      ...prev,
                      contentJson: JSON.stringify(newJsonData, null, 2),
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
                      questions: [{ question: "", answer: "" }],
                    };
                    setJsonData(newJsonData);
                    setFormData((prev) => ({
                      ...prev,
                      contentJson: JSON.stringify(newJsonData, null, 2),
                    }));
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm"
                >
                  Add FAQ Fields
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
              <span className="ml-2 text-xs text-gray-400 group-open:rotate-90 transition-transform">
                ▶
              </span>
            </summary>
            <div className="mt-2">
              <textarea
                value={formData.contentJson}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    contentJson: e.target.value,
                  }));
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
                <p className="text-sm text-red-400 mt-2">
                  {errors.contentJson}
                </p>
              )}
            </div>
          </details>
        </div>

        {/* Component Configuration Controls */}
        <div className="space-y-4 border-t border-white/10 pt-6">
          <h3 className="text-md font-semibold text-white flex items-center">
            <Cog6ToothIcon className="h-4 w-4 mr-2 text-purple-400" />
            Component Configuration
          </h3>

          <div className="bg-white/5 rounded-xl p-6 space-y-6 border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Visibility Toggle */}
              <div className="space-y-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <FancyToggle
                  label="Component Visible"
                  checked={
                    formData.isVisible === true || formData.isVisible === 1
                  }
                  onChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      isVisible: val, // Use boolean values for API compatibility
                    }))
                  }
                  gradient="green"
                  size="normal"
                  description="Control if this component appears on the live page"
                  className="w-full"
                />
                <div className="mt-2 text-xs text-gray-300 bg-white/5 rounded p-2">
                  <span className="font-medium">Preview: </span>
                  {formData.isVisible === true || formData.isVisible === 1 ? (
                    <span className="text-green-400">
                      ✓ Component will be shown
                    </span>
                  ) : (
                    <span className="text-red-400">
                      ✗ Component will be hidden
                    </span>
                  )}
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="space-y-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <FancyToggle
                  label="Light Theme"
                  checked={formData.theme === 1}
                  onChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      theme: val ? 1 : 2, // 1=light, 2=dark per ThemeMode enum
                    }))
                  }
                  gradient="blue"
                  size="normal"
                  description="Switch between light and dark theme styling"
                  className="w-full"
                />
                <div className="mt-2 text-xs text-gray-300 bg-white/5 rounded p-2">
                  <span className="font-medium">Preview: </span>
                  {formData.theme === 1 ? (
                    <span className="text-blue-400">☀️ Light theme active</span>
                  ) : (
                    <span className="text-gray-400">🌙 Dark theme active</span>
                  )}
                </div>
              </div>
            </div>

            {/* Live Preview Indicator */}
            <div className="flex items-center justify-center space-x-2 py-3 border-t border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">
                Changes apply instantly in preview
              </span>
            </div>
          </div>
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
