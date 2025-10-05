import React, { useState, useEffect } from "react";
import SEO from "../../SEO";

const PricingSection = ({ data = {} }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/hr.json");
        const jsonData = await response.json();
        setDefaultData(jsonData.pricing);
      } catch (error) {
        console.error("Failed to load HR data:", error);
        // Fallback data
        setDefaultData([
          {
            name: "Essential",
            price: "$2,500",
            period: "one-time implementation",
            description:
              "Perfect for small teams getting started with HR automation",
            features: [
              "Basic system analysis & configuration",
              "Standard implementation setup",
            ],
            isPopular: false,
          },
        ]);
      }
    };
    fetchData();
  }, []);

  // Use props if provided, otherwise fall back to default data
  const pricing = data.pricing || defaultData || [];
  return (
    <>
      <SEO
        title="Oracle NetSuite HR Pricing | Implementation Plans & Cost"
        description="Explore Oracle NetSuite HR implementation pricing plans. Flexible pricing options for small businesses to enterprises. Get the perfect plan for your HR needs and budget."
        keywords="Oracle NetSuite HR pricing, HR implementation cost, NetSuite HR plans, HR platform pricing, ERP HR implementation pricing"
        ogTitle="NetSuite HR Pricing - Implementation Plans for Every Business"
        ogDescription="Flexible Oracle NetSuite HR pricing plans for businesses of all sizes. Professional implementation with transparent costs and expert support."
        ogImage="/images/netsuite-hr-pricing.jpg"
      />
      <section
        className="py-12 relative"
        style={{ backgroundColor: "#001038" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <header className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Implementation <span className="text-blue-400">Pricing</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Choose the perfect implementation plan that fits your business
              needs and budget
            </p>
          </header>
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <article
                key={index}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border-2 ${
                  plan.isPopular
                    ? "border-blue-400 hover:border-blue-600 transform scale-105"
                    : "border-white/10 hover:border-blue-300"
                } transition-all duration-300 relative`}
                role="article"
                aria-label={`Pricing Plan: ${plan.name || "Plan"}`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <header className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name || "Plan"}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {plan.description || "Plan description"}
                  </p>
                  <div className="mb-6">
                    <span
                      className={`text-4xl font-bold ${
                        plan.isPopular ? "text-blue-400" : "text-white"
                      }`}
                    >
                      {plan.price || "$0"}
                    </span>
                    <span className="text-gray-300 ml-2">
                      {plan.period || ""}
                    </span>
                  </div>
                </header>
                <ul className="space-y-4 mb-8" role="list">
                  {(plan.features || []).map((feature, i) => (
                    <li key={i} className="flex items-center" role="listitem">
                      <svg
                        className="w-5 h-5 text-green-400 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full ${
                    plan.isPopular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-600 hover:bg-gray-700"
                  } text-white py-3 rounded-lg font-semibold transition-all duration-300`}
                >
                  {plan.ctaText || "Get Started"}
                </button>
              </article>
            ))}
          </div>
          {/* Additional Info */}
          <footer className="text-center mt-12">
            <p className="text-gray-300 mb-4">
              All plans include free consultation and project scoping
            </p>
            <p className="text-sm text-gray-400">
              Need a custom solution?{" "}
              <span className="text-blue-400 font-semibold cursor-pointer hover:underline">
                Contact our team for personalized pricing
              </span>
            </p>
          </footer>
        </div>
      </section>
    </>
  );
};

export default PricingSection;
