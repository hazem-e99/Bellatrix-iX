import { useRef, useCallback } from "react";
import pagesAPI from "../lib/pagesAPI";

export const useAutoSave = (pageData, showToast) => {
  const autoSaveTimeoutRef = useRef(null);

  const debouncedAutoSave = useCallback(
    (componentIndex, componentData) => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      autoSaveTimeoutRef.current = setTimeout(() => {
        const component = pageData.components[componentIndex];
        if (!component?.id || !pageData.id) {
          console.log(
            "⚠️ [AUTO-SAVE] Skipping auto-save - component or page not saved yet"
          );
          return;
        }

        const updateData = {
          id: component.id,
          pageId: pageData.id,
          componentType: component.componentType,
          componentName: component.componentName || "",
          contentJson: JSON.stringify(componentData, null, 2),
          orderIndex:
            component.orderIndex !== undefined
              ? component.orderIndex
              : componentIndex,
          isVisible: Boolean(
            component.isVisible === true || component.isVisible === 1
          ),
          theme: component.theme || 1,
        };

        pagesAPI
          .updatePageComponent(component.id, updateData)
          .then(() => {
            console.log("✅ [AUTO-SAVE] Component saved successfully");
          })
          .catch((error) => {
            console.error("❌ [AUTO-SAVE] Failed to save component:", error);
          });
      }, 1500);
    },
    [pageData.components, pageData.id]
  );

  return { debouncedAutoSave };
};

