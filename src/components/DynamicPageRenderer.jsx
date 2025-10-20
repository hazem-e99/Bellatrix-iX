import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import pagesAPI from "../lib/pagesAPI";
import { getComponentPathFromId, loadComponent } from "./componentMap";
import { normalizeProps, validateProps } from "../utils/normalizeProps";

const DynamicPageRenderer = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedComponents, setLoadedComponents] = useState({});

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use the new public API endpoint to fetch page by slug directly
        const response = await pagesAPI.getPublicPageBySlug(slug);

        // The API response is wrapped in an ApiResponse object with a 'data' property
        const pageData = response.data || response;
        setPageData(pageData);

        // Load components for each section (support both old sections format and new components format)
        let sectionsToRender = pageData.sections || pageData.components || [];

        // Filter by isVisible === true if property exists
        if (Array.isArray(sectionsToRender) && sectionsToRender.length > 0) {
          sectionsToRender = sectionsToRender.filter(
            (section) =>
              section.isVisible === undefined || section.isVisible === true
          );

          if (sectionsToRender.length > 0) {
            const componentPromises = sectionsToRender.map(
              async (section, index) => {
                // Handle new components format
                if (pageData.components) {
                  const componentPath = getComponentPathFromId(
                    section.componentType
                  );
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
                }

                // Handle old sections format
                const componentPath =
                  section.componentPath ||
                  getComponentPathFromId(section.componentId);
                if (componentPath) {
                  const Component = await loadComponent(componentPath);
                  return {
                    sectionId: section.uid,
                    Component,
                    sectionData: section,
                  };
                }
                return {
                  sectionId: section.uid,
                  Component: null,
                  sectionData: section,
                };
              }
            );

            const loadedComponents = await Promise.all(componentPromises);
            const componentMap = {};
            loadedComponents.forEach(
              ({ sectionId, Component, sectionData }) => {
                if (Component) {
                  componentMap[sectionId] = { Component, sectionData };
                }
              }
            );
            setLoadedComponents(componentMap);
          } else {
            setLoadedComponents({});
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }

    // Listen for page data updates from the admin dashboard
    const handlePageDataUpdate = (event) => {
      const { slug: updatedSlug } = event.detail;
      if (updatedSlug === slug) {
        console.log(`🔄 Page data updated for ${slug}, refreshing...`);
        fetchPage();
      }
    };

    window.addEventListener("pageDataUpdated", handlePageDataUpdate);

    // Cleanup event listener
    return () => {
      window.removeEventListener("pageDataUpdated", handlePageDataUpdate);
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The page "{slug}" could not be found.
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No page data available.</p>
        </div>
      </div>
    );
  }

  // Transform props function (keeping it simple for now)
  const transformProps = (componentId, props) => {
    // Return props as-is with fallbacks
    return {
      data: props,
      ...props,
    };
  };

  // Helper function to extract component data
  const extractComponentData = (component) => {
    let rawData = {};

    if (component.contentJson) {
      try {
        rawData =
          typeof component.contentJson === "string"
            ? JSON.parse(component.contentJson)
            : component.contentJson;
      } catch (err) {
        console.warn("Failed to parse contentJson:", err);
      }
    } else if (component.content && typeof component.content === "object") {
      rawData = component.content;
    }

    const normalizedData = normalizeProps(component.componentType, rawData);
    return normalizedData;
  };

  // Build safe props
  const buildSafeProps = (props) => {
    const commonArrayKeys = [
      "items",
      "list",
      "milestones",
      "services",
      "steps",
      "faqs",
      "features",
      "plans",
      "members",
      "values",
      "sections",
      "cases",
      "caseStudies",
      "benefits",
      "types",
      "programs",
    ];
    const safe = { ...(props || {}) };
    commonArrayKeys.forEach((key) => {
      if (safe[key] === undefined || safe[key] === null) safe[key] = [];
    });
    return safe;
  };

  // Render section with theme support
  const renderSection = (section, index) => {
    const sectionId = pageData.components ? `component-${index}` : section.uid;
    const componentData = loadedComponents[sectionId];

    // Get theme attribute from section.theme property
    const themeAttribute = section.theme === 1 ? "light" : "dark";

    if (componentData && componentData.Component) {
      const { Component } = componentData;

      if (pageData.components) {
        // New components format
        const normalizedProps = extractComponentData(section);
        const safeProps = buildSafeProps(normalizedProps);
        const propsToPass = {
          ...safeProps,
          renderIcon: safeProps.renderIcon || (() => null),
          openProgramModal: safeProps.openProgramModal || (() => {}),
          openFeatureModal: safeProps.openFeatureModal || (() => {}),
          onCtaClick: safeProps.onCtaClick || (() => {}),
        };

        return (
          <section key={sectionId} data-theme={themeAttribute}>
            <Component {...propsToPass} />
          </section>
        );
      } else {
        // Old sections format
        const transformedProps = transformProps(
          section.componentId,
          section.props
        );
        return (
          <section key={sectionId} data-theme={themeAttribute}>
            <Component {...transformedProps} />
          </section>
        );
      }
    }

    // Component not found fallback
    return (
      <section key={sectionId} data-theme={themeAttribute}>
        <div className="p-8 text-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Component Not Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {pageData.components ? section.componentType : section.componentId}
          </p>
        </div>
      </section>
    );
  };

  return (
    <div>
      {/* Render sections directly without any wrapper - let each component handle its own styling */}
      {(pageData.sections && pageData.sections.length > 0) ||
      (pageData.components && pageData.components.length > 0) ? (
        (pageData.components || pageData.sections).map((section, index) =>
          renderSection(section, index)
        )
      ) : (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No sections found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              This page doesn't have any sections yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicPageRenderer;
