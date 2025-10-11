import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContactForm from "../ContactForm";
import Modal from "../Modal";
import { usePageData } from "../../hooks/useJsonServerData.jsx";

const NetSuiteConsulting = ({ data: propsData = null }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const navigate = useNavigate();

  // PRIORITIZE props data over fetched data for real-time preview
  const { data: fetchedData, isLoading: loading, error } = usePageData(
    "netsuite-consulting"
  );
  const data = propsData || fetchedData;

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const handleIndustryClick = (link) => {
    navigate(link);
  };

  // Auto-rotate services showcase
  useEffect(() => {
    if (!data?.services?.items) return;

    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % data.services.items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        No data available
      </div>
    );

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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-full blur-2xl opacity-30"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-500/15 via-purple-500/20 to-cyan-500/15 rounded-full blur-xl opacity-40"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-white/10 via-blue-300/20 to-white/10 rounded-full blur-lg opacity-20"></div>

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                className="text-blue-300"
              >
                <pattern
                  id="consultingGrid"
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
                <rect width="100%" height="100%" fill="url(#consultingGrid)" />
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
              {data.hero.title}
            </h1>

            <p
              style={{
                fontSize: "20px",
                lineHeight: "30px",
                textAlign: "center",
                margin: 0,
              }}
              className="text-gray-300 animate-fade-in"
            >
              {data.hero.description}
            </p>

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
                      d={data.hero.ctaIcon}
                    />
                  </svg>
                  {data.hero.ctaText}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Consulting Services Section */}
      <section className="bg-gray-50 py-20 light-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
              dangerouslySetInnerHTML={{ __html: data.services.title }}
            />
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {data.services.description}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {data.services.items[activeService].title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {data.services.items[activeService].description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Key Features:
                  </h4>
                  {data.services.items[activeService].features.map(
                    (feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex space-x-2 mt-6 justify-center">
                {data.services.items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveService(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeService === index ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="relative group max-w-xl">
                <div className="absolute -inset-8 opacity-30 group-hover:opacity-60 transition-all duration-700">
                  <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-3xl blur-2xl"></div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/15 via-purple-500/20 to-cyan-500/15 rounded-2xl blur-xl"></div>
                </div>

                <div className="relative bg-gradient-to-br from-gray-900/10 via-blue-900/5 to-gray-900/10 rounded-3xl p-6 backdrop-blur-md border border-white/30 shadow-2xl">
                  <img
                    src={data.services.image}
                    alt="NetSuite Consulting Services"
                    className="w-full h-auto rounded-xl shadow-2xl brightness-105 contrast-110 saturate-105 group-hover:brightness-110 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Expertise Section */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: "#001038" }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              dangerouslySetInnerHTML={{ __html: data.industries.title }}
            />
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {data.industries.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.industries.items.map((industry, index) => (
              <div
                key={index}
                onClick={() => handleIndustryClick(industry.link)}
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">
                      {industry.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 mb-4">{industry.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white text-sm">
                      Key Solutions:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.solutions.map((solution, i) => (
                        <span
                          key={i}
                          className="bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full"
                        >
                          {solution}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting Process Section */}
      <section className="bg-gray-50 py-20 light-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
              dangerouslySetInnerHTML={{ __html: data.process.title }}
            />
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {data.process.description}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 flex justify-center">
              <div className="relative group max-w-lg">
                <div className="absolute -inset-8 opacity-30 group-hover:opacity-60 transition-all duration-700">
                  <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-3xl blur-2xl"></div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/15 via-purple-500/20 to-cyan-500/15 rounded-2xl blur-xl"></div>
                  <div className="absolute -inset-2 bg-gradient-to-tr from-white/10 via-blue-300/20 to-white/10 rounded-xl blur-lg"></div>
                </div>

                <div className="relative bg-gradient-to-br from-gray-900/10 via-blue-900/5 to-gray-900/10 rounded-3xl p-6 backdrop-blur-md border border-white/30 shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500">
                  <div className="relative bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 rounded-2xl p-4 border border-white/20">
                    <img
                      src={data.process.image}
                      alt="Consulting Process - Strategic NetSuite Solutions"
                      className="w-full h-auto rounded-xl shadow-2xl brightness-105 contrast-110 saturate-105 group-hover:brightness-110 group-hover:contrast-115 group-hover:saturate-110 transition-all duration-500 filter drop-shadow-xl"
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

                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400/40 rounded-tl-3xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400/40 rounded-bl-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40 rounded-br-3xl"></div>

                  <div className="absolute top-4 left-1/4 w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
                  <div className="absolute bottom-8 right-1/4 w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"></div>
                  <div className="absolute top-1/3 right-2 w-0.5 h-8 bg-gradient-to-b from-transparent via-blue-300/50 to-transparent"></div>
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Proven Process</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative">
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-300 via-blue-500 via-blue-700 to-blue-900"></div>

                <div className="space-y-6">
                  {data.process.steps.map((phase, index) => {
                    const bgColors = [
                      "bg-blue-300",
                      "bg-blue-500",
                      "bg-blue-700",
                      "bg-blue-800",
                      "bg-blue-900",
                    ];
                    return (
                      <div
                        key={index}
                        className="relative flex items-start group"
                      >
                        <div
                          className={`flex-shrink-0 w-12 h-12 ${bgColors[index]} rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10 group-hover:scale-110 transition-all duration-300`}
                        >
                          <span className="text-white font-bold text-sm">
                            {phase.step}
                          </span>
                        </div>
                        <div className="ml-6 flex-1">
                          <div className="bg-white p-4 rounded-xl border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-bold text-gray-800">
                                {phase.title}
                              </h3>
                              <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full">
                                {phase.duration}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {phase.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={openContactModal}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Consulting Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: "#001038" }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              dangerouslySetInnerHTML={{ __html: data.benefits.title }}
            />
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {data.benefits.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.benefits.items.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {benefit.metric}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20 light-section">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-xl">
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800"
                dangerouslySetInnerHTML={{ __html: data.cta.title }}
              />
              <p className="text-xl mb-8 leading-relaxed text-gray-600">
                {data.cta.description}
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {data.cta.features.map((feature, index) => (
                  <div className="text-center" key={index}>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-blue-600"
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
                    <h4 className="text-xl font-bold mb-2 text-gray-800">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={openContactModal}
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300"
              >
                {data.cta.buttonText}
              </button>
            </div>
          </div>
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
};

export default NetSuiteConsulting;
