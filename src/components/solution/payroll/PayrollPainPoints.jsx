import React, { useState, useEffect } from "react";
import SEO from "../../SEO";

const PayrollPainPoints = ({ painPoints }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/payroll.json");
        const data = await response.json();
        setDefaultData(data.painPoints);
      } catch (error) {
        console.error("Failed to load payroll data:", error);
        setDefaultData({
          title:
            'The Payroll <span class="text-[var(--color-primary)]">Challenges</span> We Solve',
          description:
            "Our system addresses the most common payroll challenges faced by consultancy firms:",
          items: [],
        });
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const displayData = {
    title:
      defaultData?.title ||
      'The Payroll <span class="text-[var(--color-primary)]">Challenges</span> We Solve',
    description:
      defaultData?.description ||
      "Our system addresses the most common payroll challenges faced by businesses:",
    items: painPoints || defaultData?.items || [],
  };

  // Debug logging for real-time updates
  console.log("🎯 [PayrollPainPoints] Component received data:", {
    hasPropsData: !!painPoints,
    propsData: painPoints,
    hasDefaultData: !!defaultData,
    finalData: displayData,
    timestamp: new Date().toISOString()
  });

  return (
    <>
      <SEO
        title="Oracle NetSuite Payroll Challenges & Solutions | Common Payroll Problems"
        description="Discover common payroll challenges that Oracle NetSuite solves: compliance issues, manual processing errors, time-consuming calculations, and data integration problems."
        keywords="NetSuite payroll challenges, payroll problems solutions, Oracle ERP payroll issues, automated payroll benefits, payroll compliance solutions"
        ogTitle="NetSuite Payroll Solutions - Solving Common Payroll Challenges"
        ogDescription="Oracle NetSuite addresses critical payroll challenges including compliance, automation, accuracy, and integration. Professional ERP payroll problem-solving."
        ogImage="/images/netsuite-payroll-challenges.jpg"
      />
      <section className="bg-[var(--color-bg-secondary)] py-20 light-section">
        <div className="container mx-auto px-6 max-w-6xl">
          <header className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]"
              dangerouslySetInnerHTML={{ __html: displayData.title }}
            ></h2>
          </header>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <strong className="text-xl text-[var(--color-text-primary)] block mb-6">
                {displayData.description}
              </strong>
              <ul className="space-y-5">
                {displayData.items?.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-lg text-[var(--color-text-secondary)]">
                      {" "}
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative group max-w-lg">
                {/* Background Effects */}
                <div className="absolute -inset-8 opacity-30 group-hover:opacity-60 transition-all duration-700">
                  <div className="absolute -inset-6 bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--color-primary-light)]/30 to-[var(--color-primary)]/20 rounded-3xl blur-2xl"></div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-[var(--color-primary)]/15 via-[var(--color-primary-dark)]/20 to-[var(--color-primary-light)]/15 rounded-2xl blur-xl"></div>
                </div>

                <div className="relative bg-[var(--color-bg-primary)] rounded-3xl p-6 backdrop-blur-md border border-[var(--color-border-primary)] shadow-2xl">
                  <div className="bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-primary)]/10 rounded-2xl p-4 border border-[var(--color-primary)]/20">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                      alt="Oracle NetSuite Payroll Management Dashboard - Professional ERP payroll automation interface"
                      className="w-full h-auto rounded-xl shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PayrollPainPoints;
