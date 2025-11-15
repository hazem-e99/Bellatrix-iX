import { useState, useEffect } from "react";
import { getComponentPathFromId, loadComponent } from "../components/componentMap";

export const useComponentLoader = (components) => {
  const [loadedComponents, setLoadedComponents] = useState({});

  useEffect(() => {
    const loadComponents = async () => {
      if (!components || components.length === 0) {
        setLoadedComponents({});
        return;
      }

      const visibleComponents = components.filter(
        (section) => section.isVisible === true || section.isVisible === 1
      );

      if (visibleComponents.length === 0) {
        setLoadedComponents({});
        return;
      }

      const componentPromises = visibleComponents.map(async (section, index) => {
        const componentPath = getComponentPathFromId(section.componentType);
        if (componentPath) {
          const Component = await loadComponent(componentPath);
          return {
            sectionId: `component-${index}`,
            Component,
            sectionData: section,
          };
        }
        return {
          sectionId: `component-${index}`,
          Component: null,
          sectionData: section,
        };
      });

      const loaded = await Promise.all(componentPromises);
      const componentMap = {};
      loaded.forEach(({ sectionId, Component, sectionData }) => {
        if (Component) {
          componentMap[sectionId] = { Component, sectionData };
        }
      });
      setLoadedComponents(componentMap);
    };

    loadComponents();
  }, [components]);

  return loadedComponents;
};

