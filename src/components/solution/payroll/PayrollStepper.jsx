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

  // Use provided steps or default data
  const displaySteps = useMemo(
    () => (steps.length > 0 ? steps : defaultData?.steps || []),
    [steps, defaultData?.steps]
  );
  const displayTitle = title || defaultData?.title || "Payroll Process Steps";

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
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {displayTitle}
            </h2>
            {defaultData?.description && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {defaultData.description}
              </p>
            )}
          </header>
        )}

        {/* Desktop Stepper */}
        <div className="hidden md:flex mb-12 relative">
          <div className="flex justify-between items-center w-full relative">
            <div className="absolute top-7 left-7 right-7 h-2 bg-gray-200 rounded-full z-0"></div>
            <div
              className="absolute top-7 left-7 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full z-0 transition-all duration-500"
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
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-500 border-gray-300"
                  }`}
                >
                  {idx + 1}
                </button>
                <span
                  className={`text-sm font-medium max-w-[120px] text-center absolute top-16
                ${idx <= current ? "text-blue-700" : "text-gray-500"}`}
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
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                {step?.title?.split(" ")[0] || `Step ${idx + 1}`}
              </button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <article
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          role="article"
          aria-label={`Payroll step: ${
            displaySteps[current]?.title || `Step ${current + 1}`
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {displaySteps[current]?.title || `Step ${current + 1}`}
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                {displaySteps[current]?.desc ||
                  displaySteps[current]?.description ||
                  "No description available."}
              </p>

              {displaySteps[current]?.benefits &&
                Array.isArray(displaySteps[current].benefits) &&
                displaySteps[current].benefits.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-600 uppercase mb-3">
                      Key Features
                    </h4>
                    <div className="space-y-2">
                      {displaySteps[current].benefits.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center text-blue-600 mb-2">
                      <span className="font-medium">Automated</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Reduces manual work by 80%
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center text-green-600 mb-2">
                      <span className="font-medium">Compliant</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Built-in regulatory compliance
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
