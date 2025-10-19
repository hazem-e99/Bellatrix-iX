import React, { useState, useEffect } from "react";
import SEO from "../../SEO";

const BenefitsSection = ({ data, activeBenefitIdx, onShowDemo }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/hr.json");
        const jsonData = await response.json();
        setDefaultData(jsonData.features);
      } catch (error) {
        console.error("Failed to load HR data:", error);
        // Fallback data
        setDefaultData({
          title: "Why Choose Our HR Solution?",
          description:
            "Discover the key advantages that make our HR platform the smart choice for modern businesses of all sizes and industries.",
          items: [],
        });
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const displayData = {
    features: data?.features ||
      defaultData || {
        title: "Why Choose Our HR Solution?",
        description:
          "Discover the key advantages that make our HR platform the smart choice for modern businesses of all sizes and industries.",
        items: [],
      },
  };

  // Debug logging for real-time updates
  console.log("🎯 [HRBenefitsSection] Component received data:", {
    hasPropsData: !!(data && data.features),
    propsData: data,
    hasDefaultData: !!defaultData,
    finalData: displayData,
    timestamp: new Date().toISOString(),
  });
  return (
    <>
      <SEO
        title={`Oracle NetSuite HR Benefits | ${
          displayData.features.title || "Why Choose Our HR Solution?"
        }`}
        description={`${
          displayData.features.description ||
          "Discover key advantages of Oracle NetSuite HR platform"
        } - Employee management, automation, compliance, and analytics benefits.`}
        keywords="Oracle NetSuite HR benefits, HR platform advantages, employee management benefits, HR automation features, NetSuite HR system benefits"
        ogTitle={`NetSuite HR Benefits - ${
          displayData.features.title || "HR Platform Advantages"
        }`}
        ogDescription={`${(
          displayData.features.description ||
          "Oracle NetSuite HR platform key benefits and advantages"
        ).substring(0, 120)}... Professional ERP HR solutions.`}
        ogImage="/images/netsuite-hr-benefits.jpg"
      />
      <section className="py-20 bg-[var(--color-bg-secondary)] animate-fade-in-up light-section">
        <div className="max-w-6xl mx-auto px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-[var(--color-primary-dark)]">
              {displayData.features.title}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {displayData.features.description}
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {displayData.features.items.map((b, idx) => (
              <article
                key={idx}
                className={`bg-[var(--color-bg-primary)] rounded-2xl shadow-md p-12 flex flex-col items-center text-center border border-[var(--color-primary)]/20 hover:border-[var(--color-primary)] hover:shadow-xl transition-all duration-[2500ms] animate-fade-in-up ${
                  activeBenefitIdx === idx
                    ? "scale-105 z-10 shadow-2xl border-[var(--color-primary)]"
                    : "scale-100"
                }`}
                style={{
                  transition:
                    "transform 2.5s cubic-bezier(.4,1,.6,1), box-shadow 2.5s, border-color 2.5s",
                }}
                role="article"
                aria-label={`HR Benefit: ${b.title || "HR Feature"}`}
              >
                <div
                  className="text-4xl mb-4"
                  role="img"
                  aria-label={`${b.title || "HR Feature"} icon`}
                >
                  {b.icon}
                </div>
                <h3 className="font-bold text-2xl text-[var(--color-primary-dark)] mb-4">
                  {b.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-lg">
                  {b.desc || b.description}
                </p>
              </article>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <button
              onClick={onShowDemo}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-[var(--color-text-inverse)] font-bold px-8 py-4 rounded-xl shadow-lg text-lg transition-all duration-300 hover:scale-105 focus:outline-none"
            >
              See a Live Demo
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BenefitsSection;
