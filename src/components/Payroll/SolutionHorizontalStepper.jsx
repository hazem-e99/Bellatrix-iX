import React, { useState, useEffect } from "react";

function SolutionHorizontalStepper({ workflowData }) {
  const steps = workflowData?.steps || [
    {
      title: "Employee data import",
      desc: "Easily onboard and manage employee records in one place.",
      details:
        "Import employee data from spreadsheets or integrated HR systems. Supports bulk uploads and data validation with real-time error checking.",
      benefits: [
        "Bulk import from Excel/CSV",
        "Data validation",
        "Duplicate detection",
        "HR system integration",
      ],
    },
    {
      title: "Time & attendance sync",
      desc: "Integrate timesheets and attendance for accurate payroll.",
      details:
        "Syncs with your time tracking tools to ensure accurate hours and leave data for every employee. Supports multiple time tracking systems.",
      benefits: [
        "Real-time sync",
        "Multiple time systems",
        "Leave management",
        "Overtime calculation",
      ],
    },
    {
      title: "Salary & tax auto-calculation",
      desc: "Automate salary, tax, and deduction calculations.",
      details:
        "Calculates gross and net pay, taxes, and deductions automatically based on your rules and local compliance. Handles complex tax scenarios.",
      benefits: [
        "Auto tax calculation",
        "Compliance built-in",
        "Deduction management",
        "Bonus processing",
      ],
    },
    {
      title: "Approval workflows",
      desc: "Streamline approvals with role-based access.",
      details:
        "Multi-level approval flows for payroll runs, with notifications and audit trails. Customizable approval hierarchies.",
      benefits: [
        "Multi-level approval",
        "Email notifications",
        "Audit trails",
        "Role-based access",
      ],
    },
    {
      title: "Payment execution",
      desc: "Execute payments securely through integrated bank APIs.",
      details:
        "Initiate salary payments directly from the platform with secure, bank-level integrations. Supports multiple payment methods.",
      benefits: [
        "Bank API integration",
        "Multiple payment methods",
        "Secure transactions",
        "Payment tracking",
      ],
    },
    {
      title: "Payslip generation & reporting",
      desc: "Generate payslips and compliance-ready reports instantly.",
      details:
        "Employees get digital payslips; admins get downloadable, compliance-ready reports. Customizable templates and automated distribution.",
      benefits: [
        "Digital payslips",
        "Custom templates",
        "Auto distribution",
        "Compliance reports",
      ],
    },
  ];

  // Default icons for stepper steps
  const getStepIcon = (index) => {
    const icons = [
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        />
      </svg>,
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>,
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>,
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>,
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>,
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>,
    ];
    return icons[index] || icons[0];
  };

  const [current, setCurrent] = useState(0);

  // Auto-progression functionality - runs automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="w-full">
      {/* Step indicators - Desktop */}
      <div className="hidden md:flex mb-20 relative">
        <div className="flex justify-between items-center w-full relative">
          {/* Progress bar */}
          <div className="absolute top-7 left-7 right-7 h-2 bg-gray-200 rounded-full z-0"></div>
          <div
            className="absolute top-7 left-7 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full z-0 transition-all duration-500 ease-in-out"
            style={{
              width: `${7 + (current / (steps.length - 1)) * (100 - 14)}%`,
            }}
          ></div>
          {/* Step circles */}
          {steps.map((step, idx) => (
            <div key={idx} className="z-10 flex flex-col items-center relative">
              <button
                onClick={() => setCurrent(idx)}
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300 border-2 shadow-lg hover:scale-105
                  ${
                    idx <= current
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-600 shadow-blue-200"
                      : "bg-white text-gray-500 border-gray-300 hover:border-gray-400"
                  }`}
              >
                {idx <= current ? (
                  <div className="text-white">{getStepIcon(idx)}</div>
                ) : (
                  <span className="font-semibold">{idx + 1}</span>
                )}
              </button>
              <span
                className={`text-sm font-medium max-w-[140px] text-center transition-colors duration-300 leading-tight absolute top-16
                ${idx <= current ? "text-blue-700" : "text-gray-500"}`}
              >
                {step?.title || `Step ${idx + 1}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step indicators - Mobile */}
      <div className="flex md:hidden mb-6 overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex space-x-3">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`flex-shrink-0 px-4 py-3 rounded-lg border text-sm font-medium whitespace-nowrap transition-all duration-300 flex items-center space-x-2
                ${
                  idx === current
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-600 shadow-lg"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
            >
              <span className="text-xs">{idx + 1}</span>
              <span>{step.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
          <div className="lg:w-2/5">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {steps[current]?.title || "Step Title"}
            </h3>
            <p className="text-lg font-medium text-gray-700 mb-6">
              {steps[current]?.desc || "Step description"}
            </p>

            {/* Key Benefits */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                Key Benefits
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {(steps[current]?.benefits || []).map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation controls - Desktop */}
            <div className="hidden md:flex mt-6">
              <button
                onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
                disabled={current === 0}
                className={`mr-3 p-3 rounded-full border-2 transition-all duration-200 ${
                  current === 0
                    ? "text-gray-300 border-gray-200 cursor-not-allowed"
                    : "text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  setCurrent((prev) => Math.min(steps.length - 1, prev + 1))
                }
                disabled={current === steps.length - 1}
                className={`p-3 rounded-full border-2 transition-all duration-200 ${
                  current === steps.length - 1
                    ? "text-gray-300 border-gray-200 cursor-not-allowed"
                    : "text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="lg:w-3/5">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 border border-blue-100">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                How It Works
              </h4>
              <p className="text-gray-700 leading-relaxed mb-6">
                {steps[current]?.details || "Step details not available"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center text-blue-600 mb-2">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span className="font-medium">Automated</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Fully automated process with minimal manual intervention
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center text-green-600 mb-2">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium">Reliable</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    99.9% uptime with enterprise-grade security
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation controls */}
      <div className="flex justify-center mt-6 md:hidden">
        <button
          onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
          disabled={current === 0}
          className={`mr-3 p-3 rounded-full border-2 transition-all duration-200 ${
            current === 0
              ? "text-gray-300 border-gray-200 cursor-not-allowed"
              : "text-gray-600 border-gray-300 hover:bg-gray-50"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="flex items-center px-4 text-sm text-gray-500 font-medium">
          {current + 1} of {steps.length}
        </span>
        <button
          onClick={() =>
            setCurrent((prev) => Math.min(steps.length - 1, prev + 1))
          }
          disabled={current === steps.length - 1}
          className={`p-3 rounded-full border-2 transition-all duration-200 ${
            current === steps.length - 1
              ? "text-gray-300 border-gray-200 cursor-not-allowed"
              : "text-gray-600 border-gray-300 hover:bg-gray-50"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SolutionHorizontalStepper;

