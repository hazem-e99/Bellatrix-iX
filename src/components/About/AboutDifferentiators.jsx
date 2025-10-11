import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AboutDifferentiators = ({ differentiators = [], data = {} }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/about.json");
        const jsonData = await response.json();
        setDefaultData(jsonData.differentiators);
      } catch (error) {
        console.error("Failed to load About data:", error);
        // Fallback data
        setDefaultData({
          title: "What Sets Us Apart",
          description:
            "Our unique combination of expertise, methodology, and commitment to excellence makes us the preferred choice for Oracle NetSuite implementations.",
          items: [],
        });
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const displayData = data || defaultData || {
    title: "What Sets Us Apart",
    description:
      "Our unique combination of expertise, methodology, and commitment to excellence makes us the preferred choice for Oracle NetSuite implementations.",
    items: [],
  };

  // Debug logging for real-time updates
  console.log("🎯 [AboutDifferentiators] Component received data:", {
    hasPropsData: !!data,
    propsData: data,
    hasDefaultData: !!defaultData,
    finalData: displayData,
    differentiatorsFromProps: differentiators,
    timestamp: new Date().toISOString()
  });

  const displayDifferentiators =
    differentiators.length > 0 ? differentiators : displayData.items;
  return (
    <section className="bg-gray-50 py-20 light-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              color: "var(--color-text-primary)",
              transition: "color 0.6s ease",
            }}
          >
            {displayData.title}
          </h2>
          <p
            className="text-lg leading-relaxed max-w-3xl mx-auto"
            style={{
              color: "var(--color-text-secondary)",
              transition: "color 0.6s ease",
            }}
          >
            {displayData.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.isArray(displayDifferentiators) &&
            displayDifferentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{
                    color: "var(--color-text-primary)",
                    transition: "color 0.6s ease",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="leading-relaxed mb-4"
                  style={{
                    color: "var(--color-text-secondary)",
                    transition: "color 0.6s ease",
                  }}
                >
                  {item.description}
                </p>
                <div
                  className="font-bold py-2 px-4 rounded-full text-sm"
                  style={{
                    backgroundColor: "var(--color-primary-bg)",
                    color: "var(--color-primary)",
                    transition: "all 0.6s ease",
                  }}
                >
                  {item.stats}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AboutDifferentiators;
