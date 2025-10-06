import React, { useState, useEffect } from "react";
import SEO from "../../SEO";

const UseCasesSection = ({ data = {} }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/hr.json");
        const jsonData = await response.json();
        setDefaultData(jsonData.useCases);
      } catch (error) {
        console.error("Failed to load HR data:", error);
        // Fallback data
        setDefaultData([
          {
            title: "Small Businesses",
            desc:
              "Streamline HR processes for growing teams with automated workflows and compliance tracking.",
          },
          {
            title: "Medium Enterprises",
            desc:
              "Scale your HR operations with advanced analytics and performance management tools.",
          },
        ]);
      }
    };
    fetchData();
  }, []);

  // Use props if provided, otherwise fall back to default data
  const useCases = data.useCases || defaultData || [];
  return (
    <>
      <SEO
        title="Oracle NetSuite HR Use Cases | Who Benefits from Our HR Platform"
        description="Discover who benefits from Oracle NetSuite HR platform: small businesses, medium enterprises, large corporations. HR solutions for every organization size and industry."
        keywords="Oracle NetSuite HR use cases, HR platform for small business, enterprise HR management, NetSuite HR for medium business, HR system benefits"
        ogTitle="NetSuite HR Use Cases - Perfect for Every Business Size"
        ogDescription="Oracle NetSuite HR platform serves small businesses, medium enterprises, and large corporations with scalable HR management solutions."
        ogImage="/images/netsuite-hr-use-cases.jpg"
      />
      <section className="py-20 bg-[var(--color-bg-secondary)] animate-fade-in-up light-section">
        <div className="max-w-6xl mx-auto px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-3 text-[var(--color-primary-dark)]">
              Who Is It{" "}
              <span className="text-[var(--color-primary)]">For?</span>
            </h2>
            <div className="mx-auto w-16 h-1 bg-[var(--color-primary)] rounded-full"></div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {useCases.map((u, idx) => (
              <article
                key={idx}
                className="bg-[var(--color-bg-primary)] rounded-3xl shadow p-10 flex flex-col items-center text-center border border-[var(--color-border-primary)] animate-fade-in-up transition-transform duration-500 hover:scale-105 hover:-rotate-1 hover:shadow-[var(--color-primary)]/40 hover:shadow-2xl cursor-pointer"
                style={{ willChange: "transform" }}
                role="article"
                aria-label={`HR Use Case: ${u.title || "Use Case"}`}
              >
                <h3 className="font-bold text-xl text-[var(--color-primary-dark)] mb-3">
                  {u.title || "Use Case"}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-base">
                  {u.desc || "Use case description"}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default UseCasesSection;
