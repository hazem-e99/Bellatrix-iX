import React from "react";
import SEO from "../../SEO";

const ChallengesSection = ({ data, activeChallenge, setActiveChallenge }) => {
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
            Retail <span className="text-cyan-400">Challenges</span>
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
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-4">
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
                      d={data.retailChallenges[activeChallenge].icon}
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {data.retailChallenges[activeChallenge].title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {data.retailChallenges[activeChallenge].description}
                </p>
                <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-blue-400"
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
                    <span className="text-blue-300 font-semibold">
                      Impact: {data.retailChallenges[activeChallenge].impact}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Navigation */}
            <div className="flex space-x-2 mt-6 justify-center">
              {data.retailChallenges.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveChallenge(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeChallenge === index ? "bg-blue-400" : "bg-gray-500"
                  }`}
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
