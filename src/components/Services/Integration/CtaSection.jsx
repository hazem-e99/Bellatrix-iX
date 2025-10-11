import React from "react";
import SEO from "../../SEO";
import { integrationData } from "../../../data/integrationData";
import { mergeStringData } from "../../../utils/dataMerger";
import { smartRender } from "../../../utils/htmlSanitizer";
import CTAButton from "../../CTAButton";

const CtaSection = ({ title, subtitle, buttonText }) => {
  // Fallback data for when no data is available
  const fallbackData = {
    title: "Ready to Integrate?",
    subtitle:
      "Let's connect your systems and streamline your business operations.",
    buttonText: "Start Integration",
  };

  // Merge data with priority: props > defaultData > fallbackData
  const displayData = {
    title: mergeStringData(
      title,
      integrationData.cta.title,
      fallbackData.title
    ),
    subtitle: mergeStringData(
      subtitle,
      integrationData.cta.subtitle,
      fallbackData.subtitle
    ),
    buttonText: mergeStringData(
      buttonText,
      integrationData.cta.buttonText,
      fallbackData.buttonText
    ),
  };

  // Check if title and subtitle contain HTML and render accordingly
  const titleHTML = smartRender(displayData.title);
  const subtitleHTML = smartRender(displayData.subtitle);

  return (
    <>
      <SEO
        title="Start Oracle NetSuite Integration | Professional ERP Consulting Services"
        description="Ready to integrate your Oracle NetSuite ERP system? Contact our expert consultants for seamless business operations, enhanced productivity, and streamlined data management solutions."
        keywords="NetSuite integration consultation, Oracle ERP consulting, start NetSuite integration, ERP system consultation, Oracle NetSuite experts, integration services contact"
        ogTitle="Start NetSuite Integration - Oracle ERP Consulting Services"
        ogDescription="Begin your Oracle NetSuite integration journey with professional consulting services. Expert guidance for seamless ERP connectivity and enhanced business operations."
        ogImage="/images/netsuite-integration-consultation.jpg"
      />
      <article className="max-w-2xl mx-auto px-4">
        <header>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            {...(titleHTML
              ? { dangerouslySetInnerHTML: titleHTML }
              : { children: displayData.title })}
          />
          <p
            className="text-lg md:text-xl mb-8"
            {...(subtitleHTML
              ? { dangerouslySetInnerHTML: subtitleHTML }
              : { children: displayData.subtitle })}
          />
        </header>
        <CTAButton
          variant="primary"
          size="lg"
          className="rounded-xl shadow-lg hover:scale-105"
          modalConfig={{
            title: "NetSuite Integration Consultation",
            subtitle: "Let's discuss your integration needs and requirements",
            icon: "🔗"
          }}
        >
          {displayData.buttonText}
        </CTAButton>
      </article>
    </>
  );
};

export default CtaSection;
