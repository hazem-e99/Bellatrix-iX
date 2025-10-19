import React, { useState, useEffect } from "react";
import SEO from "../../SEO";
import { useComponentData } from "../../../utils/useComponentData";
import manufacturingData from "../../../../public/data/manufacturing-data.json";

const SolutionsSection = (props) => {
  console.log("🏭 [SolutionsSection] ALL PROPS:", props);

  // Handle both flat and nested prop structures
  const title = props?.title || props?.data?.title;
  const subtitle = props?.subtitle || props?.data?.subtitle;
  const description = props?.description || props?.data?.description;
  const solutions =
    props?.solutions ||
    props?.items ||
    props?.data?.solutions ||
    props?.data?.items ||
    [];

  // Internal state management for pagination
  const [activeSolution, setActiveSolution] = useState(0);
  
  // Ensure activeSolution is within bounds
  const safeActiveSolution = Math.max(0, Math.min(activeSolution, solutions.length - 1));

  console.log("🏭 [SolutionsSection] Using data:", {
    title,
    subtitle,
    description,
    solutionsCount: solutions.length,
    hasTitle: !!title,
    hasSubtitle: !!subtitle,
    hasDescription: !!description,
    hasSolutions: solutions.length > 0,
    activeSolution,
    safeActiveSolution,
  });

  // Default data as fallback ONLY if no form data is provided
  const defaultData = {
    title: "NetSuite Solutions",
    subtitle: "Comprehensive manufacturing solutions",
    description:
      "Comprehensive manufacturing solutions that address every aspect of your operations, from planning to production to delivery.",
    solutions: [
      {
        title: "Production Management",
        description: "End-to-end production planning and execution",
        features: ["Work orders", "Routing", "Capacity planning"],
        benefits: "40% improvement in production efficiency",
      },
      {
        title: "Inventory Control",
        description: "Advanced inventory management capabilities",
        features: ["Multi-location", "Serial tracking", "Cycle counting"],
        benefits: "30% reduction in inventory costs",
      },
      {
        title: "Quality Assurance",
        description: "Comprehensive quality control systems",
        features: ["Quality gates", "Defect tracking", "Compliance reporting"],
        benefits: "99.5% quality achievement rate",
      },
    ],
  };

  // PRIORITIZE FORM DATA OVER DEFAULTS
  const finalTitle = title || defaultData.title;
  const finalSubtitle = subtitle || defaultData.subtitle;
  const finalDescription = description || defaultData.description;
  const finalSolutions =
    solutions.length > 0 ? solutions : defaultData.solutions;

  console.log("🏭 [SolutionsSection] FINAL DATA:", {
    finalTitle,
    finalSubtitle,
    finalDescription,
    finalSolutions,
    usingFormData:
      solutions.length > 0 || !!title || !!subtitle || !!description,
  });

  // Handle pagination dot clicks
  const handlePaginationClick = (index) => {
    console.log("🎯 [SOLUTIONS PAGINATION] Clicked dot:", index);
    setActiveSolution(index);
  };

  // Reset activeSolution when solutions change
  useEffect(() => {
    if (activeSolution >= finalSolutions.length && finalSolutions.length > 0) {
      setActiveSolution(0);
    }
  }, [finalSolutions.length, activeSolution]);

  // Auto-advance carousel (optional)
  useEffect(() => {
    if (finalSolutions.length > 1) {
      const interval = setInterval(() => {
        setActiveSolution((prev) => (prev + 1) % finalSolutions.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [finalSolutions.length]);

  console.log(
    "🏭 [SOLUTIONS PAGINATION] Active solution:",
    activeSolution,
    "Total:",
    finalSolutions.length
  );

  return (
    <section className="manufacturing-solutions bg-gray-50 py-20 light-section">
      <SEO
        title="Oracle NetSuite Manufacturing Solutions | Production Management ERP"
        description="Comprehensive Oracle NetSuite manufacturing solutions for production management, inventory control, and quality assurance. Streamline manufacturing operations."
        keywords="Oracle NetSuite manufacturing solutions, production management ERP, manufacturing inventory control, NetSuite manufacturing modules, ERP manufacturing software"
        ogTitle="Oracle NetSuite Manufacturing Solutions | Production Management ERP"
        ogDescription="Advanced Oracle NetSuite manufacturing solutions for comprehensive production management and operational optimization."
        ogImage="/images/manufacturing-solutions.jpg"
      />

      <div className="container mx-auto px-6">
        {/* Title and Subtitle */}
        <header className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            {finalTitle}
          </h2>
          {finalSubtitle && (
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {finalSubtitle}
            </p>
          )}
          {finalDescription && (
            <p className="text-base text-gray-500 leading-relaxed max-w-4xl mx-auto mt-4">
              {finalDescription}
            </p>
          )}
        </header>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image - Left Side */}
          <div className="flex-1 flex justify-center">
            <div className="relative group max-w-2xl">
              <div className="absolute -inset-8 opacity-30 group-hover:opacity-60 transition-all duration-700">
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-3xl blur-2xl"></div>
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/15 via-blue-500/20 to-cyan-500/15 rounded-2xl blur-xl"></div>
                <div className="absolute -inset-2 bg-gradient-to-tr from-white/10 via-blue-300/20 to-white/10 rounded-xl blur-lg"></div>
              </div>

              <div className="relative bg-gradient-to-br from-gray-900/10 via-blue-900/5 to-gray-900/10 rounded-3xl p-6 backdrop-blur-md border border-white/30 shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500">
                <div className="relative bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 rounded-2xl p-4 border border-white/20">
                  <img
                    src="https://i.pinimg.com/1200x/19/e6/91/19e6918482b92f0f7e31e68d376bf711.jpg"
                    alt="NetSuite Manufacturing Solutions"
                    className="w-full h-96 object-cover rounded-xl shadow-2xl brightness-105 contrast-110 saturate-105 group-hover:brightness-110 group-hover:contrast-115 group-hover:saturate-110 transition-all duration-500 filter drop-shadow-xl"
                  />

                  <div className="absolute inset-4 rounded-xl bg-gradient-to-tr from-blue-500/5 via-transparent via-transparent to-cyan-400/5 pointer-events-none"></div>
                  <div className="absolute inset-4 rounded-xl bg-gradient-to-bl from-transparent via-white/3 to-transparent pointer-events-none"></div>
                </div>

                <div className="absolute top-3 right-3">
                  <div className="relative">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-blue-400/30 rounded-full animate-ping"></div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6">
                  <div className="relative">
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full animate-pulse shadow-md"></div>
                    <div className="absolute -inset-1 w-5 h-5 bg-cyan-400/20 rounded-full animate-ping"></div>
                  </div>
                </div>

                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400/40 rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400/40 rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40 rounded-br-3xl"></div>
              </div>

              <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-bold opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  <span>NetSuite Expert</span>
                </div>
              </div>
            </div>
          </div>

          {/* Solutions Showcase - Right Side */}
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-bold text-gray-800">
              {(() => {
                const currentSolution = finalSolutions[safeActiveSolution];
                const title = currentSolution?.title;
                return typeof title === 'string' 
                  ? title 
                  : title?.title || 'Solution Title';
              })()}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {(() => {
                const currentSolution = finalSolutions[safeActiveSolution];
                const description = currentSolution?.description;
                return typeof description === 'string'
                  ? description
                  : description?.description || 'Solution Description';
              })()}
            </p>

            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">
                Key Features:
              </h4>
              {(() => {
                const currentSolution = finalSolutions[safeActiveSolution];
                const features = currentSolution?.features;
                
                // Ensure features is an array
                if (!Array.isArray(features)) {
                  return (
                    <div className="text-gray-500 text-sm">
                      No features available for this solution.
                    </div>
                  );
                }
                
                return features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-600">
                      {typeof feature === 'string' ? feature : feature?.name || feature?.title || 'Feature'}
                    </span>
                  </div>
                ));
              })()}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span className="text-blue-700 font-semibold">
                  Result: {(() => {
                    const currentSolution = finalSolutions[safeActiveSolution];
                    const benefits = currentSolution?.benefits;
                    return typeof benefits === 'string'
                      ? benefits
                      : benefits?.benefits || 'Improved Results';
                  })()}
                </span>
              </div>
            </div>

            {/* Solution Navigation */}
            {finalSolutions.length > 1 && (
              <div className="flex space-x-2 mt-6 justify-center">
                {finalSolutions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePaginationClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeSolution === index ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    aria-label={`Go to solution ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {finalSolutions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No solutions data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
