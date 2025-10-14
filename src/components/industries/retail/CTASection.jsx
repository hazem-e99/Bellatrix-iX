import React from "react";
import SEO from "../../SEO";

const CTASection = ({
  title,
  subtitle,
  description,
  ctaButton,
  features,
  trustedBy,
  openContactModal,
}) => {
  console.log("🚀 [RetailCTASection Fixed] Received props:", {
    title,
    subtitle,
    description,
    ctaButton,
    features,
    trustedBy,
  });

  // Use props DIRECTLY - no complex data processing
  const finalData = {
    title: title || "Ready to Transform Your Retail Operations?",
    subtitle: subtitle || "",
    description:
      description ||
      "Join hundreds of retail companies that have unified their commerce operations and improved customer experience with NetSuite. Get started with a free consultation today.",
    buttonText: ctaButton?.text || "Get Started",
    buttonLink: ctaButton?.link || null,
    variant: ctaButton?.variant || "primary",
    features: features || [
      {
        title: "Free Assessment",
        description: "Comprehensive evaluation of your retail processes",
        icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      },
      {
        title: "Rapid Implementation",
        description: "Get up and running faster with our proven methodology",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
      },
      {
        title: "Ongoing Support",
        description: "Continuous optimization and support for your success",
        icon:
          "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      },
    ],
  };

  console.log("✅ [RetailCTASection Fixed] Final data:", finalData);
  return (
    <section className="bg-gray-50 py-20 light-section">
      <SEO
        title="Get Started with Oracle NetSuite Retail | Contact E-commerce Experts"
        description="Transform your retail business with Oracle NetSuite e-commerce solutions. Contact our retail experts for consultation and implementation services. Get started today."
        keywords="Oracle NetSuite retail contact, e-commerce consultation, NetSuite retail implementation, retail software experts, ERP retail services, e-commerce platform setup"
        ogTitle="Get Started with Oracle NetSuite Retail | Contact E-commerce Experts"
        ogDescription="Ready to transform your retail operations? Contact our Oracle NetSuite retail experts for personalized e-commerce consultation and implementation."
        ogImage="/images/retail-cta.jpg"
      />

      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl p-12 text-gray-800 text-center border border-gray-300">
          <div className="max-w-4xl mx-auto">
            <header>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                {finalData.title}
              </h2>
              {finalData.subtitle && (
                <h3 className="text-xl md:text-2xl text-gray-800 mb-4 leading-relaxed">
                  {typeof finalData.subtitle === 'string'
                    ? finalData.subtitle
                    : finalData.subtitle?.subtitle || finalData.subtitle?.title || 'Subtitle'}
                </h3>
              )}
              <p className="text-xl mb-8 leading-relaxed text-gray-700">
                {finalData.description}
              </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {finalData.features.map((feature, index) => (
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

            {finalData.buttonLink ? (
              <a
                href={finalData.buttonLink}
                className="inline-block bg-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-900"
              >
                {finalData.buttonText}
              </a>
            ) : (
              <button
                onClick={openContactModal}
                className="bg-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-900"
              >
                {finalData.buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
