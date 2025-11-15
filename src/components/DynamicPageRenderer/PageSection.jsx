import ComponentNotFound from "./ComponentNotFound";
import { extractComponentData, buildSafeProps } from "../../utils/componentDataExtractor";

const PageSection = ({ section, index, componentData, isNewFormat = false }) => {
  const sectionId = isNewFormat ? `component-${index}` : section.uid;
  const themeAttribute = section.theme === 1 ? "light" : "dark";

  if (!componentData || !componentData.Component) {
    return (
      <section key={sectionId} data-theme={themeAttribute}>
        <ComponentNotFound
          componentType={section.componentType}
          componentId={section.componentId}
        />
      </section>
    );
  }

  const { Component } = componentData;

  if (isNewFormat) {
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
  }

  const transformedProps = {
    data: section.props,
    ...section.props,
  };

  return (
    <section key={sectionId} data-theme={themeAttribute}>
      <Component {...transformedProps} />
    </section>
  );
};

export default PageSection;

