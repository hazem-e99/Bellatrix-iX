import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AboutMilestones = ({ milestones = [], data = {} }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/about.json");
        const jsonData = await response.json();
        setDefaultData(jsonData.milestones);
      } catch (error) {
        console.error("Failed to load About data:", error);
        // Fallback data
        setDefaultData({
          title: "Our Milestones",
          description:
            "Key achievements and milestones that mark our journey of growth, innovation, and commitment to excellence.",
          items: [],
        });
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const displayData = data || defaultData || {
    title: "Our Milestones",
    description:
      "Key achievements and milestones that mark our journey of growth, innovation, and commitment to excellence.",
    items: [],
  };

  // Debug logging for real-time updates
  console.log("🎯 [AboutMilestones] Component received data:", {
    hasPropsData: !!data,
    propsData: data,
    hasDefaultData: !!defaultData,
    finalData: displayData,
    milestonesFromProps: milestones,
    timestamp: new Date().toISOString()
  });

  const displayMilestones =
    milestones.length > 0 ? milestones : displayData.items;
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
              id="milestonesGrid"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#milestonesGrid)" />
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
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(displayMilestones) &&
              displayMilestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold mb-2"
                      style={{
                        color: "var(--color-cyan-400)",
                        transition: "color 0.6s ease",
                      }}
                    >
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMilestones;
