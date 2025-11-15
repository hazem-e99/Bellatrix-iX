import React, { useState, useEffect } from "react";
import ContactForm from "../../components/ContactForm";
import Modal from "../../components/Modal";
import ImplementationStepper from "../../components/Industries/ImplementationStepper";

const Retail = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [activeSolution, setActiveSolution] = useState(0);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  // Auto-rotate challenges and solutions
  useEffect(() => {
    const challengeInterval = setInterval(() => {
      setActiveChallenge((prev) => (prev + 1) % retailChallenges.length);
    }, 4000);

    const solutionInterval = setInterval(() => {
      setActiveSolution((prev) => (prev + 1) % netSuiteSolutions.length);
    }, 5000);

    return () => {
      clearInterval(challengeInterval);
      clearInterval(solutionInterval);
    };
  }, []);

  const retailChallenges = [
    {
      title: "Omnichannel Inventory Management",
      description:
        "Managing inventory across multiple sales channels while maintaining real-time visibility and preventing stockouts",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      impact: "35% inventory discrepancies",
    },
    {
      title: "Customer Experience Consistency",
      description:
        "Delivering consistent customer experience across online, mobile, and physical store touchpoints",
      icon:
        "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      impact: "40% customer satisfaction issues",
    },
    {
      title: "Seasonal Demand Planning",
      description:
        "Accurately forecasting demand for seasonal products and managing inventory levels accordingly",
      icon:
        "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      impact: "25% excess seasonal inventory",
    },
    {
      title: "Price Optimization & Promotions",
      description:
        "Managing dynamic pricing strategies and promotional campaigns across multiple channels",
      icon:
        "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      impact: "20% margin erosion",
    },
  ];

  const netSuiteSolutions = [
    {
      title: "Omnichannel Commerce",
      description:
        "Unified commerce platform connecting online, mobile, and in-store experiences",
      features: [
        "Real-time inventory visibility",
        "Cross-channel order management",
        "Unified customer profiles",
        "Buy online, pick up in store",
        "Endless aisle capabilities",
      ],
      benefits: "45% improvement in inventory turnover",
    },
    {
      title: "Point of Sale (POS) Integration",
      description:
        "Seamlessly integrated POS system with real-time synchronization to back-office operations",
      features: [
        "Cloud-based POS system",
        "Mobile POS capabilities",
        "Real-time inventory updates",
        "Customer loyalty integration",
        "Multi-location management",
      ],
      benefits: "60% faster checkout process",
    },
    {
      title: "E-commerce Platform",
      description:
        "Native e-commerce solution with advanced merchandising and personalization",
      features: [
        "Responsive web design",
        "Product catalog management",
        "Personalized recommendations",
        "Advanced search & filtering",
        "Mobile commerce optimization",
      ],
      benefits: "50% increase in online conversion",
    },
    {
      title: "Customer Relationship Management",
      description:
        "360-degree customer view with advanced analytics and marketing automation",
      features: [
        "Unified customer database",
        "Purchase history tracking",
        "Loyalty program management",
        "Targeted marketing campaigns",
        "Customer service integration",
      ],
      benefits: "35% increase in customer retention",
    },
  ];

  const industryStats = [
    {
      value: "300+",
      label: "Retail Clients",
      description: "Successful implementations",
    },
    { value: "50%", label: "Sales Growth", description: "Average improvement" },
    {
      value: "40%",
      label: "Cost Reduction",
      description: "In operational costs",
    },
    { value: "99%", label: "Uptime", description: "System availability" },
  ];

  const caseStudies = [
    {
      company: "Fashion Forward Retail",
      industry: "Fashion & Apparel",
      challenge:
        "Managing inventory across 50+ stores and online channels with seasonal variations",
      solution:
        "NetSuite Omnichannel Commerce with advanced inventory management and demand planning",
      results: [
        "55% reduction in stockouts",
        "40% improvement in inventory turnover",
        "30% increase in cross-channel sales",
        "Real-time visibility across all channels",
      ],
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      company: "Electronics Plus",
      industry: "Consumer Electronics",
      challenge:
        "Complex product configurations and warranty management across multiple channels",
      solution:
        "NetSuite E-commerce with product configurator and service management",
      results: [
        "70% reduction in order errors",
        "45% faster product launches",
        "60% improvement in warranty processing",
        "Automated product configuration",
      ],
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const retailFeatures = [
    {
      title: "Inventory Management",
      description:
        "Real-time inventory tracking across all channels and locations",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      benefits: [
        "Real-time stock levels",
        "Automated reordering",
        "Multi-location tracking",
        "Demand forecasting",
      ],
    },
    {
      title: "Customer Management",
      description:
        "Comprehensive customer profiles and loyalty program management",
      icon:
        "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      benefits: [
        "360-degree customer view",
        "Loyalty programs",
        "Purchase history",
        "Personalized marketing",
      ],
    },
    {
      title: "Financial Management",
      description:
        "Complete financial oversight with retail-specific reporting",
      icon:
        "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      benefits: [
        "Real-time P&L",
        "Store performance",
        "Margin analysis",
        "Tax compliance",
      ],
    },
    {
      title: "Supply Chain",
      description: "End-to-end supply chain visibility and vendor management",
      icon:
        "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      benefits: [
        "Vendor management",
        "Purchase automation",
        "Drop shipping",
        "Supply chain analytics",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="py-12 relative overflow-hidden animate-background-glow"
        style={{
          backgroundColor: "var(--color-brand-dark-navy)",
          padding: "200px 0 100px",
          width: "100%",
          color: "white",
          fontSize: "15px",
          lineHeight: "24px",
          fontFamily: '"Gotham A", "Gotham B"',
        }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10"></div>

          {/* Floating elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-full blur-2xl opacity-30"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-500/15 via-purple-500/20 to-cyan-500/15 rounded-full blur-xl opacity-40"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-white/10 via-blue-300/20 to-white/10 rounded-full blur-lg opacity-20"></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                className="text-blue-300"
              >
                <pattern
                  id="retailGrid"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="1"
                    cy="1"
                    r="1"
                    fill="currentColor"
                    opacity="0.3"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#retailGrid)" />
              </svg>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: "1220px",
            margin: "0 auto",
            padding: "0 7.5px",
          }}
          className="relative z-10"
        >
          <div style={{ padding: "40px 15px 20px" }}>
            {/* Title */}
            <h1
              style={{
                fontWeight: "700",
                fontSize: "50px",
                lineHeight: "50px",
                textAlign: "center",
                letterSpacing: "-1px",
                margin: "0 0 13px",
              }}
              className="text-white animate-slide-up"
            >
              Retail Excellence
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: "20px",
                lineHeight: "30px",
                textAlign: "center",
                margin: 0,
              }}
              className="text-gray-300 animate-fade-in"
            >
              Transform your retail operations with integrated commerce
              solutions that unify online, mobile, and in-store experiences
              while optimizing inventory and enhancing customer satisfaction.
            </p>

            {/* CTA Button */}
            <div style={{ textAlign: "center" }}>
              <a
                href="#request-info"
                className="group relative inline-block min-w-[180px] min-h-[56px] font-bold text-sm uppercase leading-5 rounded-md px-4 py-4 mt-8 mb-0 no-underline transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white border-2 border-blue-500 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Talk to an Expert
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Stats Section */}
      <section className="bg-white py-16 light-section">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {industryStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retail Challenges Section */}
      <section
        className="py-20 relative overflow-hidden animate-background-glow theme-bg-animated"
        style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              className="text-blue-300"
            >
              <pattern
                id="challengesGrid"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#challengesGrid)" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Retail <span className="text-cyan-400">Challenges</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Modern retail faces complex challenges that require integrated
              solutions to deliver exceptional customer experiences and maintain
              profitability.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Challenges Showcase - Left Side */}
            <div className="flex-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={retailChallenges[activeChallenge].icon}
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {retailChallenges[activeChallenge].title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {retailChallenges[activeChallenge].description}
                  </p>
                  <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <span className="text-blue-300 font-semibold">
                        Impact: {retailChallenges[activeChallenge].impact}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenge Navigation */}
              <div className="flex space-x-2 mt-6 justify-center">
                {retailChallenges.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveChallenge(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeChallenge === index ? "bg-blue-400" : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Image - Right Side */}
            <div className="flex-1 flex justify-center">
              <div className="relative group max-w-xl">
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/20 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Retail Challenges"
                    className="w-full h-auto rounded-xl shadow-lg brightness-110 contrast-110 saturate-110 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NetSuite Solutions Section */}
      <section className="bg-gray-50 py-20 light-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              NetSuite <span className="text-blue-600">Solutions</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Comprehensive retail solutions that unify your commerce
              operations, from inventory management to customer experience
              optimization.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image - Left Side */}
            <div className="flex-1 flex justify-center">
              <div className="relative group max-w-xl">
                <div className="absolute -inset-8 opacity-30 group-hover:opacity-60 transition-all duration-700">
                  <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-3xl blur-2xl"></div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/15 via-blue-500/20 to-cyan-500/15 rounded-2xl blur-xl"></div>
                  <div className="absolute -inset-2 bg-gradient-to-tr from-white/10 via-blue-300/20 to-white/10 rounded-xl blur-lg"></div>
                </div>

                <div className="relative bg-gradient-to-br from-gray-900/10 via-blue-900/5 to-gray-900/10 rounded-3xl p-6 backdrop-blur-md border border-white/30 shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500">
                  <div className="relative bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 rounded-2xl p-4 border border-white/20">
                    <img
                      src="https://i.pinimg.com/736x/5d/33/74/5d33743cd85ff60ff425a2614a87503f.jpg"
                      alt="NetSuite Retail Solutions"
                      className="w-full h-110 object-cover rounded-xl shadow-2xl brightness-105 contrast-110 saturate-105 group-hover:brightness-110 group-hover:contrast-115 group-hover:saturate-110 transition-all duration-500 filter drop-shadow-xl"
                    />

                    <div className="absolute inset-4 rounded-xl bg-gradient-to-tr from-blue-500/5 via-transparent via-transparent to-cyan-400/5 pointer-events-none"></div>
                    <div className="absolute inset-4 rounded-xl bg-gradient-to-bl from-transparent via-white/3 to-transparent pointer-events-none"></div>
                  </div>

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

                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400/40 rounded-tl-3xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400/40 rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40 rounded-br-3xl"></div>
                </div>

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
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                    <span>NetSuite Expert</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions Showcase - Right Side */}
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-bold text-gray-800">
                {netSuiteSolutions[activeSolution].title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {netSuiteSolutions[activeSolution].description}
              </p>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Key Features:
                </h4>
                {netSuiteSolutions[activeSolution].features.map(
                  (feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  )
                )}
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <span className="text-blue-700 font-semibold">
                    Result: {netSuiteSolutions[activeSolution].benefits}
                  </span>
                </div>
              </div>

              {/* Solution Navigation */}
              <div className="flex space-x-2 mt-6 justify-center">
                {netSuiteSolutions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSolution(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeSolution === index ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retail Features Section */}
      <section
        className="py-20 relative overflow-hidden animate-background-glow theme-bg-animated"
        style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              className="text-blue-300"
            >
              <pattern
                id="featuresGrid"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#featuresGrid)" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Retail <span className="text-cyan-400">Features</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Comprehensive features designed specifically for retail operations
              and customer experience optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {retailFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={feature.icon}
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{feature.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section
        className="py-20 relative overflow-hidden animate-background-glow theme-bg-animated"
        style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              className="text-blue-300"
            >
              <pattern
                id="successGrid"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#successGrid)" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Success <span className="text-cyan-400">Stories</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Real retail companies achieving remarkable results with NetSuite
              commerce solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
              >
                <div className="relative h-48">
                  <img
                    src={study.image}
                    alt={study.company}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      {study.company}
                    </h3>
                    <p className="text-cyan-300">{study.industry}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-white mb-2">
                      Challenge:
                    </h4>
                    <p className="text-gray-300 text-sm">{study.challenge}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-white mb-2">Solution:</h4>
                    <p className="text-gray-300 text-sm">{study.solution}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Results:</h4>
                    <div className="space-y-2">
                      {study.results.map((result, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-cyan-400"
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
                          <span className="text-gray-300 text-sm">
                            {result}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process Section */}
      <section className="py-20 bg-white light-section">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Retail Implementation Built for All Industries
            </h2>
            <p className="text-xl text-gray-600">
              Streamline your entire NetSuite implementation lifecycle — from
              discovery to go-live — with a proven, secure methodology.
            </p>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Implementation Process
          </h3>
          {/* Implementation Process Stepper component */}
          <ImplementationStepper 
            steps={retailImplementationSteps.map(step => ({
              ...step,
              benefitsLabel: "Key Deliverables",
              detailsLabel: "Implementation Details"
            }))} 
            useCustomIcons={true} 
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20 light-section">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl p-12 text-gray-800 text-center border border-gray-300">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                Ready to Transform Your Retail Operations?
              </h2>
              <p className="text-xl mb-8 leading-relaxed text-gray-700">
                Join hundreds of retail companies that have unified their
                commerce operations and improved customer experience with
                NetSuite. Get started with a free consultation today.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md border border-gray-200">
                    <svg
                      className="w-8 h-8 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-gray-800">
                    Free Assessment
                  </h4>
                  <p className="text-gray-600">
                    Comprehensive evaluation of your retail processes
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md border border-gray-200">
                    <svg
                      className="w-8 h-8 text-gray-600"
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
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-gray-800">
                    Rapid Implementation
                  </h4>
                  <p className="text-gray-600">
                    Get up and running faster with our proven methodology
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md border border-gray-200">
                    <svg
                      className="w-8 h-8 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-gray-800">
                    Ongoing Support
                  </h4>
                  <p className="text-gray-600">
                    Continuous optimization and support for your success
                  </p>
                </div>
              </div>

              <button
                onClick={openContactModal}
                className="bg-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-900"
              >
                Schedule Retail Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        title="Schedule Your Retail Demo"
        subtitle="Let's discuss your retail challenges and solutions"
      >
        <div className="p-2">
          <ContactForm onSuccess={closeContactModal} />
        </div>
      </Modal>
    </div>
  );
};

// Retail-specific implementation steps
const retailImplementationSteps = [
    {
      title: "Discovery & Planning",
      desc:
        "Analyze current retail operations, systems, and customer journey requirements",
      details:
        "Comprehensive analysis of your existing retail operations, including process mapping, system evaluation, and requirements gathering. We identify gaps and opportunities for improvement.",
      icon: (
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      benefits: [
        "Current state assessment",
        "Gap analysis",
        "Implementation roadmap",
        "Process mapping",
      ],
    },
    {
      title: "System Design",
      desc:
        "Design NetSuite configuration for retail workflows and customer touchpoints",
      details:
        "Create a detailed blueprint for your NetSuite implementation, including system architecture, integration points, and customization requirements specific to retail processes.",
      icon: (
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      benefits: [
        "System architecture",
        "Process flows",
        "Integration design",
        "Custom requirements",
      ],
    },
    {
      title: "Configuration & Integration",
      desc:
        "Configure NetSuite modules and integrate with POS, e-commerce, and other systems",
      details:
        "Implementation of NetSuite configuration based on the approved design, including custom script development, workflow automation, and integration setup.",
      icon: (
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      benefits: [
        "Configured system",
        "Integrations",
        "Custom developments",
        "Workflow automation",
      ],
    },
    {
      title: "Testing & Training",
      desc:
        "Comprehensive testing and training for retail staff across all locations",
      details:
        "Thorough system testing including unit, integration, and user acceptance testing. Comprehensive training programs for all user groups to ensure smooth adoption.",
      icon: (
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
        </svg>
      ),
      benefits: [
        "Test results",
        "Training materials",
        "User documentation",
        "System validation",
      ],
    },
    {
      title: "Go-Live & Optimization",
      desc:
        "Production deployment with ongoing support and performance optimization",
      details:
        "Carefully managed production deployment with real-time monitoring, immediate support, and post-implementation optimization to ensure successful system adoption.",
      icon: (
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      benefits: [
        "Live system",
        "Support documentation",
        "Performance monitoring",
        "Optimization",
      ],
    },
];

export default Retail;
