import React from "react";
import SEO from "../../SEO";

const IndustryStats = ({ data }) => {
  // Accept both array and object with stats/items for live preview compatibility
  let stats = [];
  if (Array.isArray(data)) {
    stats = data;
  } else if (Array.isArray(data?.stats)) {
    stats = data.stats;
  } else if (Array.isArray(data?.items)) {
    stats = data.items;
  } else if (Array.isArray(data?.data)) {
    stats = data.data;
  } else if (Array.isArray(data?.data?.stats)) {
    stats = data.data.stats;
  }

  // Default stats if none provided
  const defaultStats = [
    {
      value: "85%",
      label: "Efficiency Improvement",
      description: "Average efficiency gain",
    },
    {
      value: "60%",
      label: "Cost Reduction",
      description: "Operational cost savings",
    },
    {
      value: "90%",
      label: "Accuracy Rate",
      description: "Data accuracy improvement",
    },
    {
      value: "75%",
      label: "Time Savings",
      description: "Process automation benefits",
    },
  ];

  const finalStats = stats.length > 0 ? stats : defaultStats;

  return (
    <section className="bg-white py-16">
      <SEO
        title="Retail Industry Statistics | Oracle NetSuite Performance Metrics"
        description="Discover proven retail industry statistics with Oracle NetSuite ERP. Real performance metrics showing growth and efficiency in retail operations and e-commerce."
        keywords="retail industry statistics, NetSuite retail metrics, e-commerce performance data, retail growth statistics, Oracle NetSuite retail results"
        ogTitle="Retail Industry Statistics | Oracle NetSuite Performance Metrics"
        ogDescription="Real retail performance data and industry statistics with Oracle NetSuite retail solutions."
        ogImage="/images/retail-stats.jpg"
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {finalStats.map((stat, index) => (
            <article key={index} className="text-center">
              <div
                className="text-4xl md:text-5xl font-bold mb-2 theme-stats-value"
                style={{
                  color: "var(--color-brand-accent)",
                  transition: "color 0.6s ease",
                }}
              >
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryStats;
