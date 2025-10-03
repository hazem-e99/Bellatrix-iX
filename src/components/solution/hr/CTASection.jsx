import React from "react";

const CTASection = ({
  title,
  subtitle,
  description,
  ctaButton,
  features,
  trustedBy,
  onCtaClick,
}) => {
  console.log("🚀 [HRCTASection Fixed] Received props:", {
    title,
    subtitle,
    description,
    ctaButton,
    features,
    trustedBy,
  });

  // Use props DIRECTLY - no complex data processing or async fetching
  const finalData = {
    title: title || "Ready to Transform Your HR Operations?",
    subtitle: subtitle || "",
    description:
      description ||
      "Join 10,000+ companies that have automated their HR processes and reduced administrative workload by 70%",
    buttonText: ctaButton?.text || "Start Free Trial",
    buttonLink: ctaButton?.link || "/hr/trial",
    variant: ctaButton?.variant || "primary",
  };

  console.log("✅ [HRCTASection Fixed] Final data:", finalData);
  return (
    <section className="py-16 bg-gray-50 text-center animate-fade-in-up light-section">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">
          {finalData.title}
        </h2>
        {finalData.subtitle && (
          <h3 className="text-lg md:text-xl text-blue-600 mb-4 leading-relaxed">
            {finalData.subtitle}
          </h3>
        )}
        <p className="text-lg md:text-xl mb-8 text-gray-600">
          {finalData.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {finalData.buttonLink ? (
            <a
              href={finalData.buttonLink}
              className="inline-block border-2 border-blue-700 hover:border-blue-400 text-blue-700 hover:text-blue-900 font-semibold rounded-lg px-8 py-4 transition-all duration-200 shadow-lg text-lg hover:bg-blue-100"
            >
              {finalData.buttonText}
            </a>
          ) : (
            <button
              onClick={onCtaClick}
              className="inline-block border-2 border-blue-700 hover:border-blue-400 text-blue-700 hover:text-blue-900 font-semibold rounded-lg px-8 py-4 transition-all duration-200 shadow-lg text-lg hover:bg-blue-100"
            >
              {finalData.buttonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
