import React from "react";
import { useParams } from "react-router-dom";
import { usePageData } from "../../hooks/usePageData";
import { useComponentLoader } from "../../hooks/useComponentLoader";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import PageSection from "./PageSection";

const DynamicPageRenderer = () => {
  const { slug } = useParams();
  const { pageData, loading, error } = usePageData(slug);
  const components = pageData?.components || pageData?.sections || [];
  const loadedComponents = useComponentLoader(components);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState slug={slug} />;
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

  const filteredComponents = components.filter(
    (section) => section.isVisible === true || section.isVisible === 1
  );

  if (filteredComponents.length === 0) {
    return <EmptyState />;
  }

  const isNewFormat = !!pageData.components;

  return (
    <div>
      {filteredComponents.map((section, index) => {
        const sectionId = isNewFormat ? `component-${index}` : section.uid;
        const componentData = loadedComponents[sectionId];

        return (
          <PageSection
            key={sectionId}
            section={section}
            index={index}
            componentData={componentData}
            isNewFormat={isNewFormat}
          />
        );
      })}
    </div>
  );
};

export default DynamicPageRenderer;

