import React, { useState } from "react";
import ContactForm from "../components/ContactForm";
import Modal from "../components/Modal";
import { usePageData } from "../hooks/useJsonServerData.jsx";
import SolutionHorizontalStepper from "../components/Payroll/SolutionHorizontalStepper";
import FAQItem from "../components/Payroll/FAQItem";

export default function PayrollPage() {
  // Demo Modal states
  const [showDemo, setShowDemo] = useState(false);
  const [demoIdx, setDemoIdx] = useState(0);
  // Contact Modal states
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [imgFade, setImgFade] = useState(true);

  // Fetch payroll data from JSON Server
  const { data: payrollData, isLoading, error } = usePageData("payroll");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payroll information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading payroll data</p>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  const demoImages = payrollData?.demoImages || [
    "/images/Hr/hrS1.png",
    "/images/Hr/hrS2.jpeg",
  ];

  const handleDemoChange = (newIdx) => {
    setImgFade(false);
    setTimeout(() => {
      setDemoIdx(newIdx);
      setImgFade(true);
    }, 200);
  };
  const nextDemo = () => handleDemoChange((demoIdx + 1) % demoImages.length);
  const prevDemo = () =>
    handleDemoChange((demoIdx - 1 + demoImages.length) % demoImages.length);

  // Contact modal functions
  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  // Dynamic data from JSON Server or fallbacks
  const painPoints = payrollData?.painPoints?.items || [
    {
      text: "Delayed salary processing and errors",
      icon: "time",
    },
    {
      text: "Manual tax calculations and compliance risks",
      icon: "check",
    },
    {
      text: "Lack of visibility and transparency for employees",
      icon: "user",
    },
    {
      text: "Difficulty scaling payroll operations across geographies",
      icon: "globe",
    },
    {
      text: "Disconnected systems leading to data silos",
      icon: "connection",
    },
  ];

  // Icon mapping function
  const getIcon = (iconName) => {
    const iconMap = {
      time: (
        <svg
          className="w-5 h-5 text-red-500"
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
        </svg>
      ),
      check: (
        <svg
          className="w-5 h-5 text-red-500"
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
      ),
      user: (
        <svg
          className="w-5 h-5 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      globe: (
        <svg
          className="w-5 h-5 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      connection: (
        <svg
          className="w-5 h-5 text-red-500"
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
      ),
    };
    return iconMap[iconName] || null;
  };

  // Features data
  const features = payrollData?.features?.items || [
    {
      title: "Automated Payroll Runs",
      desc:
        "Set up payroll once and let it run automatically, with full audit trails.",
      icon: "lightning",
    },
    {
      title: "Tax & Compliance",
      desc:
        "Stay compliant with local tax laws and generate reports in one click.",
      icon: "check",
    },
    {
      title: "Employee Self-Service",
      desc: "Employees access payslips, tax docs, and leave balances anytime.",
      icon: "user",
    },
    {
      title: "Real-Time Analytics",
      desc: "Get instant insights into payroll costs, trends, and forecasts.",
      icon: "chart",
    },
    {
      title: "Multi-Country Support",
      desc:
        "Run payroll for teams in multiple countries, currencies, and languages.",
      icon: "globe",
    },
    {
      title: "Integrations",
      desc:
        "Connect with HR, time tracking, and accounting tools you already use.",
      icon: "connection",
    },
  ];

  // Feature icon mapping
  const getFeatureIcon = (iconName) => {
    const iconMap = {
      lightning: (
        <svg
          className="w-6 h-6 text-blue-600"
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
      ),
      check: (
        <svg
          className="w-6 h-6 text-blue-600"
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
      ),
      user: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      chart: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      globe: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      connection: (
        <svg
          className="w-6 h-6 text-blue-600"
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
      ),
    };
    return iconMap[iconName] || iconMap.lightning;
  };

  // FAQs data
  const faqs = payrollData?.faqs?.items || [
    {
      question: "Does this system support global payroll?",
      answer:
        "Yes, we support multi-country and multi-currency payroll operations.",
    },
    {
      question: "Can it integrate with our existing HR system?",
      answer: "Absolutely, we offer seamless integrations and open APIs.",
    },
    {
      question: "How long does implementation take?",
      answer: "Most companies are onboarded in less than 2 weeks.",
    },
    {
      question: "Is the platform secure?",
      answer:
        "Yes, we use bank-level encryption and comply with global security standards to protect your sensitive payroll data.",
    },
    {
      question: "Can employees access their payroll information?",
      answer:
        "Yes, through our employee self-service portal, staff can securely access their payslips, tax documents, and payment history.",
    },
  ];
  return (
    <div className="bg-gray-50 min-h-screen w-full ">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 flex items-center justify-center relative min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/payrollFinal.jpeg"
            alt="Payroll Dashboard Interface"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.log("Image failed to load:", e.target.src);
              e.target.style.backgroundColor = "var(--color-blue-800)";
            }}
            onLoad={() => console.log("Image loaded successfully")}
          />
          {/* Simple Light Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center">
            {/* Text Content */}
            <div className="flex flex-col items-center justify-center space-y-8">
              {/* Main Heading */}
              <h1
                className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] text-white drop-shadow-lg text-center"
                style={{
                  textShadow:
                    "0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)",
                }}
              >
                <span className="block mb-2">
                  {payrollData?.hero?.title?.split(" ").slice(0, 2).join(" ") ||
                    "Transform Your"}
                </span>
                <span className="block">
                  {payrollData?.hero?.title?.split(" ").slice(2).join(" ") ||
                    "Payroll Process"}
                </span>
              </h1>

              {/* Subtitle */}
              <div className="max-w-4xl mx-auto space-y-4">
                <p
                  className="text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium drop-shadow-md text-center"
                  style={{
                    textShadow:
                      "0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)",
                  }}
                >
                  {payrollData?.hero?.subtitle ||
                    "Streamline operations with our intelligent, automated payroll system"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="bg-gray-50 py-20 light-section">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 text-center">
            {payrollData?.painPoints?.title ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: payrollData.painPoints.title,
                }}
              />
            ) : (
              <>
                The Payroll <span className="text-blue-600">Struggles</span> We
                Eliminate
              </>
            )}
          </h2>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <strong className="text-xl text-gray-800 block mb-6">
                {payrollData?.painPoints?.description ||
                  "Our system addresses the most common payroll challenges faced by consultancy firms:"}
              </strong>
              <ul className="space-y-5">
                {painPoints.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-lg text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative group max-w-lg">
                {/* Advanced Background Effects */}
                <div className="absolute -inset-8 opacity-30 group-hover:opacity-60 transition-all duration-700">
                  {/* Multiple layered glows */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-3xl blur-2xl"></div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/15 via-purple-500/20 to-cyan-500/15 rounded-2xl blur-xl"></div>
                  <div className="absolute -inset-2 bg-gradient-to-tr from-white/10 via-blue-300/20 to-white/10 rounded-xl blur-lg"></div>
                </div>

                {/* Professional Container with Multi-layer Design */}
                <div className="relative bg-gradient-to-br from-gray-900/10 via-blue-900/5 to-gray-900/10 rounded-3xl p-6 backdrop-blur-md border border-white/30 shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500">
                  {/* Inner glow container */}
                  <div className="relative bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 rounded-2xl p-4 border border-white/20">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Payroll Implementation illustration showing digital payroll process"
                      className="w-full h-auto rounded-xl shadow-2xl brightness-105 contrast-110 saturate-105 group-hover:brightness-110 group-hover:contrast-115 group-hover:saturate-110 transition-all duration-500 filter drop-shadow-xl"
                    />

                    {/* Professional overlay effects */}
                    <div className="absolute inset-4 rounded-xl bg-gradient-to-tr from-blue-500/5 via-transparent to-cyan-400/5 pointer-events-none"></div>
                    <div className="absolute inset-4 rounded-xl bg-gradient-to-bl from-transparent via-white/3 to-transparent pointer-events-none"></div>
                  </div>

                  {/* Advanced Floating Tech Elements */}
                  <div className="absolute top-3 right-3">
                    <div className="relative">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse shadow-lg"></div>
                      <div className="absolute inset-0 w-4 h-4 bg-blue-400/30 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6">
                    <div className="relative">
                      <div className="w-3 h-3 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full animate-pulse shadow-md"></div>
                      <div className="absolute -inset-1 w-5 h-5 bg-cyan-400/20 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  <div className="absolute top-1/2 right-6">
                    <div className="relative">
                      <div className="w-2 h-2 bg-white/90 rounded-full animate-pulse shadow-sm"></div>
                      <div className="absolute -inset-1 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  <div className="absolute top-1/4 left-8">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full animate-pulse opacity-70"></div>
                  </div>

                  <div className="absolute bottom-1/3 right-12">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-white to-blue-200 rounded-full animate-pulse opacity-80"></div>
                  </div>

                  {/* Professional corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400/40 rounded-tl-3xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400/40 rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40 rounded-br-3xl"></div>

                  {/* Data visualization lines */}
                  <div className="absolute top-4 left-1/4 w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
                  <div className="absolute bottom-8 right-1/4 w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"></div>
                  <div className="absolute top-1/3 right-2 w-0.5 h-8 bg-gradient-to-b from-transparent via-blue-300/50 to-transparent"></div>
                </div>

                {/* Professional Badge */}
                <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-bold opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4"
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
                    <span>Problem Solved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 relative overflow-hidden animate-background-glow theme-bg-animated"
        style={{
          backgroundColor: "var(--color-brand-dark-navy)",
        }}
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10"></div>
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white text-center">
            {payrollData?.howItWorks?.title || "How Our Payroll System Works"}
          </h2>
          <div className="bg-gray-800 rounded-xl p-12 shadow-2xl max-w-6xl mx-auto border border-gray-600/50 backdrop-blur-sm hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
            {/* Creative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full opacity-20 transform translate-x-16 -translate-y-16 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 rounded-full opacity-20 transform -translate-x-10 translate-y-10 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full opacity-15 transform -translate-x-8 -translate-y-8 group-hover:opacity-30 transition-opacity duration-500"></div>

            {/* Floating Tech Elements */}
            <div className="absolute top-4 right-4">
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute inset-0 w-3 h-3 bg-blue-400/30 rounded-full animate-ping"></div>
              </div>
            </div>

            <div className="absolute bottom-4 left-4">
              <div className="relative">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full animate-pulse shadow-md"></div>
                <div className="absolute -inset-1 w-4 h-4 bg-cyan-400/20 rounded-full animate-ping"></div>
              </div>
            </div>

            <div className="absolute top-1/4 right-1/4">
              <div className="w-1.5 h-1.5 bg-white/70 rounded-full animate-pulse opacity-60"></div>
            </div>

            <div className="absolute bottom-1/3 left-1/3">
              <div className="w-1 h-1 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full animate-pulse opacity-50"></div>
            </div>

            {/* Data visualization lines */}
            <div className="absolute top-6 left-1/4 w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-300/40 to-transparent"></div>
            <div className="absolute bottom-6 right-1/4 w-20 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"></div>

            <div className="relative z-10">
              <p className="text-xl text-gray-300 leading-relaxed">
                {payrollData?.howItWorks?.description ||
                  "Our payroll process is simple: upload employee and contract details, sync timesheets and leave data, let the system run payroll automatically on schedule, approve via role-based access, execute payments through integrated bank APIs, and download payslips & compliance-ready reports—all in one platform."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Workflow Section */}
      <section className="py-20 bg-white light-section">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              {payrollData?.coreWorkflow?.title ||
                "Payroll System Built for All Industries"}
            </h2>
            <p className="text-xl text-gray-600">
              {payrollData?.coreWorkflow?.description ||
                "Streamline your entire payroll lifecycle — from onboarding to salary disbursement — with a secure, intuitive platform."}
            </p>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            {payrollData?.coreWorkflow?.subtitle || "Core Workflow"}
          </h3>
          {/* Core Workflow Stepper component */}
          <SolutionHorizontalStepper workflowData={payrollData?.coreWorkflow} />
        </div>
      </section>

      {/* Key Features */}
      <section
        className="py-20 relative overflow-hidden animate-background-glow theme-bg-animated"
        style={{
          backgroundColor: "var(--color-brand-dark-navy)",
        }}
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10"></div>
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white text-center">
            {payrollData?.features?.title ||
              "Key Features for Modern Consultancies"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, idx) => (
              <div
                key={idx}
                tabIndex={0}
                className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-600/50 hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-500 min-h-[200px] flex flex-col justify-center items-center text-center backdrop-blur-sm relative overflow-hidden group"
              >
                {/* Creative Background Elements */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full opacity-20 transform translate-x-8 -translate-y-8 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 rounded-full opacity-20 transform -translate-x-6 translate-y-6 group-hover:opacity-40 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  <div className="text-xl font-semibold mb-4 text-white group-hover:text-blue-300 transition-all duration-300">
                    {f.title}
                  </div>
                  <div className="text-gray-300 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowDemo(true)}
              className="bg-blue-700 hover:bg-blue-900 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-lg transition-all duration-300 hover:scale-105 focus:outline-none"
            >
              See a Live Demo
            </button>
          </div>
        </div>
        {/* Live Demo Modal */}
        {showDemo && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={() => setShowDemo(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl w-full relative animate-fade-in-up"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/70 hover:bg-red-100 shadow-md text-4xl text-gray-700 hover:text-red-600 font-bold transition-all duration-200 focus:outline-none border border-gray-200"
                aria-label="Close"
                tabIndex={0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-7 h-7 text-[#191970]"
                >
                  <circle cx="12" cy="12" r="11" fill="none" />
                  <line x1="8" y1="8" x2="16" y2="16" />
                  <line x1="16" y1="8" x2="8" y2="16" />
                </svg>
              </button>
              <div className="flex flex-col items-center">
                <img
                  src={demoImages[demoIdx]}
                  alt={`Demo ${demoIdx + 1}`}
                  className={`rounded-xl shadow-lg w-full h-96 object-cover mb-4 transition-opacity duration-300 ${
                    imgFade ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ maxWidth: "100%", maxHeight: "420px" }}
                />
                <div className="flex gap-6 items-center justify-center mt-2">
                  <button
                    onClick={prevDemo}
                    className="bg-blue-100 hover:bg-blue-300 text-blue-700 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow transition-all disabled:opacity-40"
                    disabled={demoImages.length <= 1}
                    aria-label="Previous image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M15.5 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <span className="text-gray-700 font-semibold">
                    {demoIdx + 1} / {demoImages.length}
                  </span>
                  <button
                    onClick={nextDemo}
                    className="bg-blue-100 hover:bg-blue-300 text-blue-700 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow transition-all disabled:opacity-40"
                    disabled={demoImages.length <= 1}
                    aria-label="Next image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M8.5 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
                {/* Dots */}
                <div className="flex gap-2 mt-4">
                  {demoImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDemoChange(idx)}
                      className={`w-3 h-3 rounded-full border-2 ${
                        demoIdx === idx
                          ? "bg-blue-700 border-blue-700"
                          : "bg-blue-100 border-blue-300"
                      } transition-all`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Why Perfect for Software Consultancy Firms */}
      <section className="min-h-screen flex items-center justify-center bg-gray-50 light-section">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col justify-center px-4 lg:px-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-800 leading-tight">
                {payrollData?.whyPerfect?.title ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: payrollData.whyPerfect.title,
                    }}
                  />
                ) : (
                  <>
                    Why It's <span className="text-blue-600">Perfect</span> for
                    Your Business
                  </>
                )}
              </h2>
              <ul className="space-y-4">
                {(
                  payrollData?.whyPerfect?.items || [
                    "Handles flexible work models (remote, hybrid, contract)",
                    "Built-in compliance for local and global operations",
                    "Reduces time spent on admin work by 70%",
                    "Supports dynamic teams with frequent changes",
                    "Scales with your business — from startup to enterprise",
                  ]
                ).map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0"
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
                    <span className="text-lg text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Content */}
            <div className="relative flex justify-center lg:justify-center px-4 lg:px-8">
              <div className="relative group max-w-md w-full">
                {/* Advanced Background Effects */}
                <div className="absolute -inset-4 opacity-30 group-hover:opacity-60 transition-all duration-700">
                  {/* Multiple layered glows */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-2xl blur-xl"></div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/15 via-purple-500/20 to-cyan-500/15 rounded-xl blur-lg"></div>
                  <div className="absolute -inset-1 bg-gradient-to-tr from-white/10 via-blue-300/20 to-white/10 rounded-lg blur-md"></div>
                </div>

                {/* Professional Container with Multi-layer Design */}
                <div className="relative bg-gradient-to-br from-gray-900/10 via-blue-900/5 to-gray-900/10 rounded-2xl p-3 backdrop-blur-md border border-white/30 shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500">
                  {/* Inner glow container */}
                  <div className="relative bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 rounded-xl p-2 border border-white/20">
                    <img
                      src="/images/p.jpg"
                      alt="Payroll Dashboard Interface"
                      className="w-full h-[300px] object-cover rounded-lg shadow-xl brightness-105 contrast-110 saturate-105 group-hover:brightness-110 group-hover:contrast-115 group-hover:saturate-110 transition-all duration-500 filter drop-shadow-lg"
                      onError={(e) => {
                        console.log("Image failed to load:", e.target.src);
                        e.target.style.backgroundColor =
                          "var(--color-blue-800)";
                      }}
                      onLoad={() => console.log("Image loaded successfully")}
                    />

                    {/* Professional overlay effects */}
                    <div className="absolute inset-2 rounded-lg bg-gradient-to-tr from-blue-500/5 via-transparent to-cyan-400/5 pointer-events-none"></div>
                    <div className="absolute inset-2 rounded-lg bg-gradient-to-bl from-transparent via-white/3 to-transparent pointer-events-none"></div>
                  </div>

                  {/* Advanced Floating Tech Elements */}
                  <div className="absolute top-2 right-2">
                    <div className="relative">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse shadow-md"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-blue-400/30 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <div className="relative">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full animate-pulse shadow-sm"></div>
                      <div className="absolute -inset-0.5 w-3 h-3 bg-cyan-400/20 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  <div className="absolute top-1/2 right-3">
                    <div className="relative">
                      <div className="w-1.5 h-1.5 bg-white/90 rounded-full animate-pulse shadow-sm"></div>
                      <div className="absolute -inset-0.5 w-2.5 h-2.5 bg-white/20 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  <div className="absolute top-1/4 left-4">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full animate-pulse opacity-70"></div>
                  </div>

                  <div className="absolute bottom-1/3 right-6">
                    <div className="w-1 h-1 bg-gradient-to-r from-white to-blue-200 rounded-full animate-pulse opacity-80"></div>
                  </div>

                  {/* Professional corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400/40 rounded-tl-2xl"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400/40 rounded-bl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/40 rounded-br-2xl"></div>

                  {/* Data visualization lines */}
                  <div className="absolute top-3 left-1/4 w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
                  <div className="absolute bottom-4 right-1/4 w-10 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"></div>
                  <div className="absolute top-1/3 right-1 w-0.5 h-6 bg-gradient-to-b from-transparent via-blue-300/50 to-transparent"></div>
                </div>

                {/* Professional Badge */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-1.5">
                    <svg
                      className="w-3 h-3"
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
                    <span>Perfect Solution</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section
        className="py-20 relative overflow-hidden animate-background-glow theme-bg-animated"
        style={{
          backgroundColor: "var(--color-brand-dark-navy)",
        }}
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10"></div>

          {/* Creative Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-gradient-to-r from-white/10 to-blue-300/10 rounded-full blur-lg animate-pulse delay-1500"></div>
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                {payrollData?.faqs?.title || "Common Questions"}
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {payrollData?.faqs?.description ||
                  "Get quick answers to the most frequently asked questions about our payroll system"}
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section id="contact" className="py-20 bg-gray-50 light-section">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
            {payrollData?.cta?.title ? (
              <span
                dangerouslySetInnerHTML={{ __html: payrollData.cta.title }}
              />
            ) : (
              <>
                Ready to Simplify Your{" "}
                <span className="text-blue-600">Payroll?</span>
              </>
            )}
          </h2>
          <p className="text-xl mb-10 text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {payrollData?.cta?.description ||
              "Get in touch for a personalized demo and see how our solution can transform your payroll process."}
          </p>
          <button
            onClick={openContactModal}
            className="inline-flex items-center px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {payrollData?.cta?.buttonText || "Request Now !"}
          </button>
        </div>
      </section>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        title="Schedule Your Consultation"
        subtitle="Let's discuss your NetSuite consulting needs"
      >
        <ContactForm onSuccess={closeContactModal} />
      </Modal>
    </div>
  );
}
