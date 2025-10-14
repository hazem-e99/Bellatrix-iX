import React from "react";
import SEO from "../../SEO";
import { useComponentData } from "../../../utils/useComponentData";
import manufacturingData from "../../../../public/data/manufacturing-data.json";

const CTASection = ({
  title,
  subtitle,
  description,
  ctaButton,
  features,
  trustedBy,
  openContactModal,
}) => {
  // Merge props with default data from JSON
  const propsData = {
    title,
    subtitle,
    description,
    ctaButton,
    features,
    trustedBy,
  };
  const finalData = useComponentData("cta", propsData, manufacturingData);

  console.log("🏭 [CTASection] Data merge:", {
    props: propsData,
    defaultData: manufacturingData.cta,
    finalData: finalData,
  });

  // Use merged data with fallbacks
  const mergedData = {
    title:
      finalData.title || title || "Transform Your Manufacturing Operations",
    subtitle: finalData.subtitle || subtitle || "",
    description:
      finalData.description ||
      description ||
      "Join hundreds of manufacturing companies that have optimized their operations with our solutions.",
    buttonText: finalData.buttonText || ctaButton?.text || "Get Started",
    buttonLink:
      finalData.buttonLink || ctaButton?.link || null,
    variant: finalData.variant || ctaButton?.variant || "primary",
    features: finalData.features ||
      features || [
        {
          title: "Streamlined Operations",
          description: "Optimize your manufacturing processes",
          icon:
            "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
        },
        {
          title: "Real-time Insights",
          description: "Get actionable data for better decisions",
          icon:
            "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        },
        {
          title: "Expert Support",
          description: "24/7 support from industry experts",
          icon:
            "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
      ],
  };

  console.log("✅ [ManufacturingCTASection Fixed] Final data:", mergedData);
  return (
    <section className="bg-gray-50 py-20 light-section">
      <SEO
        title="Get Started with Oracle NetSuite Manufacturing | Contact Manufacturing ERP Experts"
        description="Transform your manufacturing operations with Oracle NetSuite ERP. Contact our manufacturing experts for consultation and implementation services. Get started today."
        keywords="Oracle NetSuite manufacturing contact, manufacturing ERP consultation, NetSuite manufacturing implementation, manufacturing software experts, ERP manufacturing services"
        ogTitle="Get Started with Oracle NetSuite Manufacturing | Contact Manufacturing ERP Experts"
        ogDescription="Ready to transform your manufacturing operations? Contact our Oracle NetSuite manufacturing experts for personalized consultation and implementation."
        ogImage="/images/manufacturing-cta.jpg"
      />

      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl p-12 text-gray-800 text-center border border-gray-300">
          <div className="max-w-4xl mx-auto">
            <header>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                {mergedData.title}
              </h2>
              {mergedData.subtitle && (
                <h3 className="text-xl md:text-2xl text-gray-800 mb-4 leading-relaxed">
                  {typeof mergedData.subtitle === 'string'
                    ? mergedData.subtitle
                    : mergedData.subtitle?.subtitle || mergedData.subtitle?.title || 'Subtitle'}
                </h3>
              )}
              <p className="text-xl mb-8 leading-relaxed text-gray-700">
                {mergedData.description}
              </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {mergedData.features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md border border-gray-200">
                    <svg
                      className="w-8 h-8 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={feature.icon}
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-gray-800">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">
                    {typeof feature.description === 'string'
                      ? feature.description
                      : feature.description?.description || feature.description?.desc || 'Feature Description'}
                  </p>
                </div>
              ))}
            </div>

            {mergedData.buttonLink ? (
              <a
                href={mergedData.buttonLink}
                className="inline-block bg-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-900"
              >
                {mergedData.buttonText}
              </a>
            ) : (
              <button
                onClick={openContactModal}
                className="bg-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-900"
              >
                {mergedData.buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
