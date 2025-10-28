import React from "react";
import SEO from "../../SEO";

const FeaturesSection = ({ data }) => {
  // Add defensive programming
  if (
    !data ||
    !data.retailFeatures ||
    !Array.isArray(data.retailFeatures) ||
    data.retailFeatures.length === 0
  ) {
    return (
      <section
        className="py-20 relative overflow-hidden theme-bg-primary"
        style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Retail <span className="text-cyan-400">Features</span>
            </h2>
            <p className="text-gray-300">No features data available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-20 relative overflow-hidden theme-bg-primary"
      style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
    >
      <SEO
        title="Retail Features | Oracle NetSuite E-commerce & POS Capabilities"
        description="Explore comprehensive Oracle NetSuite retail features for e-commerce, POS, inventory management, customer experience, and omnichannel retail operations."
        keywords="Oracle NetSuite retail features, e-commerce features, POS system features, retail inventory features, omnichannel retail capabilities, NetSuite commerce features"
        ogTitle="Retail Features | Oracle NetSuite E-commerce & POS Capabilities"
        ogDescription="Comprehensive Oracle NetSuite retail features designed for modern e-commerce and retail operations optimization."
        ogImage="/images/retail-features.jpg"
      />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="text-blue-300"
          >
            <pattern
              id="featuresGrid"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#featuresGrid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <header className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Retail{" "}
            <span
              className="theme-highlight-text"
              style={{
                color: "var(--color-cyan-400)",
                transition: "color 0.6s ease",
              }}
            >
              Features
            </span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Comprehensive features designed specifically for retail operations
            and customer experience optimization.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.retailFeatures.map((feature, index) => (
            <article
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 theme-feature-icon"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-brand-accent), var(--color-brand-variant))",
                    transition: "background 0.6s ease",
                  }}
                >
                  <svg
                    className="w-6 h-6 text-white"
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
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {typeof feature.title === "string"
                      ? feature.title
                      : feature.title?.title ||
                        feature.title?.name ||
                        "Feature Title"}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {typeof feature.description === "string"
                      ? feature.description
                      : feature.description?.description ||
                        feature.description?.desc ||
                        "Feature Description"}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {(feature.benefits || []).map((benefit, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full theme-feature-dot"
                          style={{
                            backgroundColor: "var(--color-cyan-400)",
                            transition: "background-color 0.6s ease",
                          }}
                        ></div>
                        <span className="text-sm text-gray-300">
                          {typeof benefit === "string"
                            ? benefit
                            : benefit?.benefit ||
                              benefit?.name ||
                              benefit?.title ||
                              "Benefit"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
