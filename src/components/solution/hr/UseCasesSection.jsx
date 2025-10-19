import React from "react";
import SEO from "../../SEO";

const UseCasesSection = ({ data = {} }) => {
  // اعتمد فقط على البيانات القادمة من props
  const title = data.title || "Who Is It For?";
  const description = data.description || "";
  const useCases = data.useCases || [];

  // Debug logging for real-time updates
  console.log("🎯 [HRUseCasesSection] Component received data:", {
    hasPropsData: !!(data && data.useCases),
    propsData: data,
    finalData: useCases,
    timestamp: new Date().toISOString(),
  });
  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords="Oracle NetSuite HR use cases, HR platform for small business, enterprise HR management, NetSuite HR for medium business, HR system benefits"
        ogTitle={title}
        ogDescription={description}
        ogImage="/images/netsuite-hr-use-cases.jpg"
      />
      <section className="py-20 bg-[var(--color-bg-secondary)] animate-fade-in-up light-section">
        <div className="max-w-6xl mx-auto px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-extrabold mb-3 text-[var(--color-primary-dark)]">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-[var(--color-text-secondary)] mb-3">
                {description}
              </p>
            )}
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
                  {u.description || "Use case description"}
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
