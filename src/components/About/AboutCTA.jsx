import React from "react";

const AboutCTA = ({
  title,
  subtitle,
  description,
  ctaButton,
  features,
  trustedBy,
  onOpenContactModal,
}) => {
  console.log("🚀 [AboutCTASection Fixed] Received props:", {
    title,
    subtitle,
    description,
    ctaButton,
    features,
    trustedBy,
  });

  // Use props DIRECTLY - no complex data processing or async fetching
  const finalData = {
    title: title || "Ready to Build Something Great?",
    subtitle:
      subtitle ||
      "Let's collaborate to transform your business with innovative Oracle NetSuite solutions that drive growth, efficiency, and success.",
    description:
      description ||
      "Contact us today to discuss how we can help you optimize your operations and drive growth.",
    buttonText: ctaButton?.text || "Start Consultation",
    buttonLink: ctaButton?.link || "/about/contact",
    variant: ctaButton?.variant || "primary",
    features: features || [
      {
        title: "Quick Start",
        description: "Get started our consultation",
      },
      {
        title: "Expert Team",
        description: "Work with certified professionals",
      },
      {
        title: "Proven Results",
        description: "Join our success stories",
      },
    ],
  };

  console.log("✅ [AboutCTASection Fixed] Final data:", finalData);
  return (
    <section className="bg-gray-50 py-20 light-section">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl p-12 text-gray-800 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {finalData.title}
            </h2>
            <p className="text-xl mb-8 text-gray-600 leading-relaxed">
              {finalData.subtitle}
            </p>
            {finalData.description && (
              <p className="text-base md:text-lg text-gray-500 mb-8 leading-relaxed max-w-2xl mx-auto">
                {finalData.description}
              </p>
            )}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {finalData.features.map((feature, index) => (
                <div key={index} className="text-center">
                  <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
            {finalData.buttonLink ? (
              <a
                href={finalData.buttonLink}
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-700"
              >
                {finalData.buttonText}
              </a>
            ) : (
              <button
                onClick={onOpenContactModal}
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-700"
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

export default AboutCTA;
