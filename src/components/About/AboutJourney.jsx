import React, { useState, useEffect } from "react";

const AboutJourney = ({ data = {} }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/about.json");
        const jsonData = await response.json();
        setDefaultData(jsonData.journey);
      } catch (error) {
        console.error("Failed to load About data:", error);
        // Fallback data
        setDefaultData({
          title: "Our Journey",
          description:
            "From humble beginnings to becoming a trusted Oracle NetSuite partner, our journey has been marked by innovation, growth, and unwavering commitment to excellence.",
          timeline: [],
        });
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const displayData = data || defaultData || {
    title: "Our Journey",
    description:
      "From humble beginnings to becoming a trusted Oracle NetSuite partner, our journey has been marked by innovation, growth, and unwavering commitment to excellence.",
    timeline: [],
  };

  // Debug logging for real-time updates
  console.log("🎯 [AboutJourney] Component received data:", {
    hasPropsData: !!data,
    propsData: data,
    hasDefaultData: !!defaultData,
    finalData: displayData,
    timestamp: new Date().toISOString()
  });
  return (
    <section
      className="py-20 relative overflow-hidden animate-background-glow theme-bg-animated"
      style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            style={{
              color: "var(--color-blue-300)",
              transition: "color 0.6s ease",
            }}
          >
            <pattern
              id="journeyGrid"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#journeyGrid)" />
          </svg>
        </div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {displayData.title}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {displayData.description}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-bold text-white">
              {displayData.beginningTitle || "The Beginning"}
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {displayData.beginningText || "Founded in 2008 with a vision to bridge the gap between complex enterprise software and real business needs. Our founders recognized that many businesses were struggling to fully leverage their technology investments."}
            </p>
            <h3 className="text-3xl font-bold text-white">
              {displayData.growthTitle || "Growth & Evolution"}
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {displayData.growthText || "Over the years, we've evolved from a small consulting firm to a comprehensive digital transformation partner, helping hundreds of organizations across various industries unlock their full potential."}
            </p>
            <div
              className="p-6 rounded-xl backdrop-blur-sm"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-primary)/0.2, var(--color-cyan-600)/0.2)",
                border: "1px solid var(--color-primary)/0.3",
                transition: "all 0.6s ease",
              }}
            >
              <h4
                className="font-bold mb-2"
                style={{
                  color: "var(--color-cyan-300)",
                  transition: "color 0.6s ease",
                }}
              >
                {displayData.todayTitle || "Today"}
              </h4>
              <p className="text-gray-300">
                {displayData.todayText || "We continue to innovate and expand our services, staying at the forefront of technology trends while maintaining our core values of excellence and integrity."}
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative group">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/20 shadow-2xl">
                <img
                  src={displayData.imageUrl || "/images/solution.jpg"}
                  alt="Our Journey - Digital Innovation"
                  className="w-full h-auto lg:max-w-md rounded-xl shadow-lg brightness-110 contrast-110 saturate-110 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-4 rounded-xl bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutJourney;
