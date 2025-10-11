import React, { useState, useEffect } from "react";
import SEO from "../../SEO";

const ModulesSection = ({ data = {} }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/hr.json");
        const jsonData = await response.json();
        setDefaultData(jsonData.modules);
      } catch (error) {
        console.error("Failed to load HR data:", error);
        // Fallback data
        setDefaultData([
          {
            icon: "👥",
            title: "Employee Management",
            desc:
              "Comprehensive employee records, profiles, and lifecycle management from onboarding to offboarding.",
          },
          {
            icon: "💰",
            title: "Payroll Processing",
            desc:
              "Automated payroll calculations, tax deductions, and salary disbursements with compliance features.",
          },
        ]);
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const modules = data.modules || defaultData || [];

  // Debug logging for real-time updates
  console.log("🎯 [HRModulesSection] Component received data:", {
    hasPropsData: !!(data && data.modules),
    propsData: data,
    hasDefaultData: !!defaultData,
    finalData: modules,
    timestamp: new Date().toISOString()
  });
  return (
    <>
      <SEO
        title="Oracle NetSuite HR Modules | Complete HR Platform Components"
        description="Explore Oracle NetSuite HR platform modules: employee management, payroll processing, compliance tracking, analytics, and more. Modular HR solutions for every business need."
        keywords="Oracle NetSuite HR modules, HR platform components, employee management module, payroll processing, HR compliance, NetSuite HR features"
        ogTitle="NetSuite HR Platform Modules - Complete HR Management Components"
        ogDescription="Modular Oracle NetSuite HR platform covering employee management, payroll, compliance, and analytics. Choose components that fit your business needs."
        ogImage="/images/netsuite-hr-modules.jpg"
      />
      <section
        className="py-20 animate-fade-in-up relative"
        style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)]/10 via-transparent to-[var(--color-primary)]/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-inverse)]">
              Product Modules
            </h2>
            <p className="text-lg text-[var(--color-text-light)] max-w-2xl mx-auto">
              Our platform is built from modular components to cover every
              aspect of HR, payroll, and compliance—choose what fits your
              business best.
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {modules.map((m, idx) => (
              <article
                key={idx}
                className="bg-[var(--color-text-inverse)]/5 backdrop-blur-sm rounded-2xl shadow-2xl p-10 flex flex-col items-center text-center border border-[var(--color-text-inverse)]/10 hover:border-[var(--color-primary)] hover:shadow-[var(--color-primary)]/20 hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
                role="article"
                aria-label={`HR Module: ${m.title || "Module"}`}
              >
                <div
                  className="text-4xl mb-4"
                  role="img"
                  aria-label={`${m.title || "Module"} icon`}
                >
                  {m.icon || "🔧"}
                </div>
                <h3 className="font-bold text-xl text-[var(--color-text-inverse)] mb-3">
                  {m.title || "Module"}
                </h3>
                <p className="text-[var(--color-text-light)] text-base">
                  {m.desc || "Module description"}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ModulesSection;
