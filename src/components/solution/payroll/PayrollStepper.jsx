import React, { useState, useEffect, useMemo } from "react";
import SEO from "../../SEO";

const PayrollStepper = ({ steps = [], title }) => {
  const [current, setCurrent] = useState(0);
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/payroll.json");
        const data = await response.json();
        setDefaultData(data.coreWorkflow);
      } catch (error) {
        console.error("Failed to load payroll data:", error);
        setDefaultData({ steps: [] });
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const displaySteps = useMemo(
    () => (steps.length > 0 ? steps : defaultData?.steps || []),
    [steps, defaultData?.steps]
  );
  const displayTitle = title || defaultData?.title || "Payroll Process Steps";

  // Debug logging for real-time updates
  console.log("🎯 [PayrollStepper] Component received data:", {
    hasPropsData: steps.length > 0,
    propsData: { steps, title },
    hasDefaultData: !!defaultData,
    finalData: { displaySteps, displayTitle },
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    if (!displaySteps || displaySteps.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % displaySteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [displaySteps]);

  // Early return if no steps provided
  if (!displaySteps || displaySteps.length === 0) {
    return (
      <div className="w-full">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800">
            No workflow steps available to display.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`Oracle NetSuite Payroll Steps | ${
          displayTitle || "Payroll Process Workflow"
        }`}
        description={`${
          defaultData?.description ||
          "Step-by-step Oracle NetSuite payroll process workflow"
        } - Interactive payroll stepper with detailed process stages and benefits.`}
        keywords="Oracle NetSuite payroll steps, payroll workflow process, step-by-step payroll guide, NetSuite payroll implementation steps"
        ogTitle={`NetSuite Payroll Process Steps - ${
          displayTitle || "Interactive Workflow Guide"
        }`}
        ogDescription={`${(
          defaultData?.description ||
          "Oracle NetSuite interactive payroll process steps"
        ).substring(0, 120)}... Professional ERP payroll workflow.`}
        ogImage="/images/netsuite-payroll-steps.jpg"
      />
      <div className="w-full">
        {/* Title */}
        {displayTitle && (
          <header className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
              {displayTitle}
            </h2>
            {defaultData?.description && (
              <p className="text-lg text-[var(--color-text-muted)] max-w-3xl mx-auto">
                {defaultData.description}
              </p>
            )}
          </header>
        )}

        {/* Desktop Stepper */}
        <div className="hidden md:flex mb-12 relative">
          <div className="flex justify-between items-center w-full relative">
            <div className="absolute top-7 left-7 right-7 h-2 bg-[var(--color-border-secondary)] rounded-full z-0"></div>
            <div
              className="absolute top-7 left-7 h-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-full z-0 transition-all duration-500"
              style={{
                width: `${
                  7 + (current / (displaySteps.length - 1)) * (100 - 14)
                }%`,
              }}
            ></div>

            {displaySteps.map((step, idx) => (
              <div
                key={idx}
                className="z-10 flex flex-col items-center relative"
              >
                <button
                  onClick={() => setCurrent(idx)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300 border-2 shadow-lg
                  ${
                    idx <= current
                      ? "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-[var(--color-text-inverse)] border-[var(--color-primary)]"
                      : "bg-[var(--color-bg-primary)] text-[var(--color-text-muted)] border-[var(--color-border-secondary)]"
                  }`}
                >
                  {idx + 1}
                </button>
                <span
                  className={`text-sm font-medium max-w-[120px] text-center absolute top-16
                ${
                  idx <= current
                    ? "text-[var(--color-primary-dark)]"
                    : "text-[var(--color-text-muted)]"
                }`}
                >
                  {step?.title?.split(" ")[0] || `Step ${idx + 1}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Stepper */}
        <div className="flex md:hidden mb-6 overflow-x-auto pb-2">
          <div className="flex space-x-3">
            {displaySteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg border text-sm font-medium
                ${
                  idx === current
                    ? "bg-[var(--color-primary)] text-[var(--color-text-inverse)] border-[var(--color-primary)]"
                    : "bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] border-[var(--color-border-secondary)]"
                }`}
              >
                {step?.title?.split(" ")[0] || `Step ${idx + 1}`}
              </button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <article
          className="bg-[var(--color-bg-primary)] rounded-2xl shadow-lg p-6 border border-[var(--color-border-primary)]"
          role="article"
          aria-label={`Payroll step: ${
            displaySteps[current]?.stepTitle ||
            displaySteps[current]?.title ||
            `Step ${current + 1}`
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
                {displaySteps[current]?.stepTitle ||
                  displaySteps[current]?.title ||
                  `Step ${current + 1}`}
              </h3>
              <p className="text-lg text-[var(--color-text-secondary)] mb-6">
                {displaySteps[current]?.stepDescription ||
                  displaySteps[current]?.description ||
                  "No description available."}
              </p>

              {displaySteps[current]?.features &&
                Array.isArray(displaySteps[current].features) &&
                displaySteps[current].features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase mb-3">
                      Key Features
                    </h4>
                    <div className="space-y-2">
                      {displaySteps[current].features.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-[var(--color-text-muted)]"
                        >
                          <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full mr-3"></span>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-accent-light)] rounded-xl p-6 border border-[var(--color-border-secondary)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[var(--color-bg-primary)] rounded-lg p-4 border border-[var(--color-border-secondary)]">
                    <div className="flex items-center text-[var(--color-primary)] mb-2">
                      <span className="font-medium">Automated</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {displaySteps[current]?.automated ||
                        "Reduces manual work by 80%"}
                    </p>
                  </div>

                  <div className="bg-[var(--color-bg-primary)] rounded-lg p-4 border border-[var(--color-border-secondary)]">
                    <div className="flex items-center text-[var(--color-accent)] mb-2">
                      <span className="font-medium">Compliant</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {displaySteps[current]?.compliant ||
                        "Built-in regulatory compliance"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default PayrollStepper;
