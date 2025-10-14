import React from "react";
import SEO from "../../SEO";

const ChallengesSection = ({ data, activeChallenge, setActiveChallenge }) => {
  // Ensure data is safe and provide fallback
  const safeData = data || {};
  const retailChallenges = safeData.retailChallenges || [];
  
  // Default challenges if none provided
  const defaultChallenges = [
    {
      title: "Omnichannel Complexity",
      description: "Managing multiple sales channels and touchpoints",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      impact: "High"
    },
    {
      title: "Inventory Management",
      description: "Real-time inventory tracking across channels",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      impact: "High"
    },
    {
      title: "Customer Experience",
      description: "Delivering consistent experiences across all touchpoints",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      impact: "Medium"
    }
  ];
  
  const finalChallenges = retailChallenges.length > 0 ? retailChallenges : defaultChallenges;
  const safeActiveChallenge = Math.min(activeChallenge || 0, finalChallenges.length - 1);

  return (
    <section
      className="py-20 relative overflow-hidden theme-bg-primary"
      style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
    >
      <SEO
        title="Retail Challenges | Oracle NetSuite Solutions for Modern Retail"
        description="Overcome retail challenges with Oracle NetSuite solutions. Address omnichannel complexity, inventory management, customer experience, and profitability issues."
        keywords="retail challenges, omnichannel retail, retail inventory management, customer experience retail, Oracle NetSuite retail solutions, retail profitability"
        ogTitle="Retail Challenges | Oracle NetSuite Solutions for Modern Retail"
        ogDescription="Comprehensive Oracle NetSuite solutions to address critical retail challenges and modern commerce complexities."
        ogImage="/images/retail-challenges.jpg"
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
              id="challengesGrid"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#challengesGrid)" />
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
              Challenges
            </span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Modern retail faces complex challenges that require integrated
            solutions to deliver exceptional customer experiences and maintain
            profitability.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Challenges Showcase - Left Side */}
          <div className="flex-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
              <div className="mb-6">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 theme-icon-gradient"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-brand-accent), var(--color-brand-variant))",
                    transition: "background 0.6s ease",
                  }}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={finalChallenges[safeActiveChallenge]?.icon || "M13 10V3L4 14h7v7l9-11h-7z"}
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {typeof finalChallenges[safeActiveChallenge]?.title === 'string'
                    ? finalChallenges[safeActiveChallenge]?.title
                    : finalChallenges[safeActiveChallenge]?.title?.title || 'Challenge Title'}
                </h3>
                <p className="text-gray-300 mb-4">
                  {typeof finalChallenges[safeActiveChallenge]?.description === 'string'
                    ? finalChallenges[safeActiveChallenge]?.description
                    : finalChallenges[safeActiveChallenge]?.description?.description || 'Challenge Description'}
                </p>
                <div
                  className="rounded-lg p-4 theme-impact-box"
                  style={{
                    backgroundColor: "var(--color-brand-deep)/0.2",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "var(--color-brand-accent)/0.3",
                    transition:
                      "background-color 0.6s ease, border-color 0.6s ease",
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 theme-icon-color"
                      style={{
                        color: "var(--color-brand-accent)",
                        transition: "color 0.6s ease",
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <span
                      className="font-semibold theme-impact-text"
                      style={{
                        color: "var(--color-brand-variant)",
                        transition: "color 0.6s ease",
                      }}
                    >
                      Impact: {finalChallenges[safeActiveChallenge]?.impact || 'High'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Navigation */}
            <div className="flex space-x-2 mt-6 justify-center">
              {finalChallenges.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveChallenge(index)}
                  className="w-3 h-3 rounded-full transition-all duration-300 theme-nav-dot"
                  style={{
                    backgroundColor:
                      activeChallenge === index
                        ? "var(--color-brand-accent)"
                        : "var(--color-gray-500)",
                    transition: "background-color 0.6s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="flex-1 flex justify-center">
            <div className="relative group max-w-xl">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Retail Challenges"
                  className="w-full h-auto rounded-xl shadow-lg brightness-110 contrast-110 saturate-110 group-hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
