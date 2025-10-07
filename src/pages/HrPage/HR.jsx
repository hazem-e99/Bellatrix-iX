import React, { useState, useEffect } from "react";
import { usePageData } from "../../hooks/useJsonServerData.jsx";

export default function HRSolution() {
  // Fetch HR data from JSON Server
  const { data, isLoading, error } = usePageData("hr");

  // Debug logging
  console.log("🔍 HR Page - Data loaded:", {
    isLoading,
    hasData: !!data,
    title: data?.hero?.title,
    subtitle: data?.hero?.subtitle,
    timestamp: new Date().toISOString(),
  });

  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeBenefitIdx, setActiveBenefitIdx] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [demoIdx, setDemoIdx] = useState(0);
  const [imgFade, setImgFade] = useState(true);

  const handleDemoChange = (newIdx) => {
    setImgFade(false);
    setTimeout(() => {
      setDemoIdx(newIdx);
      setImgFade(true);
    }, 200);
  };

  const nextDemo = () =>
    handleDemoChange((demoIdx + 1) % (data?.demoImages?.length || 1));
  const prevDemo = () =>
    handleDemoChange(
      (demoIdx - 1 + (data?.demoImages?.length || 1)) %
        (data?.demoImages?.length || 1)
    );

  // Animation for Benefits Cards
  useEffect(() => {
    if (!data?.features?.items) return;

    const interval = setInterval(() => {
      setActiveBenefitIdx((prev) => (prev + 1) % data.features.items.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [data?.features?.items]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-800 text-xl">Loading HR information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <p className="text-red-600 mb-4 text-xl">Error loading HR data</p>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-red-600 text-xl">No data available</div>
      </div>
    );
  }

  return (
    <>
      <main className="bg-gradient-to-br from-blue-50 to-white min-h-screen text-slate-800">
        {/* Hero Section */}
        <section
          className={`w-full min-h-screen ${data.hero.bgColor} py-24 md:py-32 text-center flex flex-col items-center justify-center relative overflow-hidden`}
        >
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              controlsList="nodownload nofullscreen noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              onDrop={(e) => e.preventDefault()}
              className="absolute inset-0 w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[8s] ease-in-out pointer-events-none"
              style={{
                filter:
                  "brightness(0.7) contrast(1.2) saturate(1.3) hue-rotate(10deg)",
                animation: "video-enhance 20s ease-in-out infinite",
                userSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              <source src={data.hero.bgVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          <div className="max-w-3xl mx-auto px-4 relative z-10 animate-fade-in-up">
            <div className="accent-bar mx-auto mb-4" aria-hidden="true"></div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-2xl">
              {data.hero.title}
              <span className="text-xs text-yellow-300 block mt-2 opacity-75">
                Last Fetch: {new Date().toLocaleTimeString()}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
              {data.hero.subtitle}
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-gray-50 animate-fade-in-up light-section">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-blue-800 text-center">
              {data.features.title}
            </h2>
            <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl mx-auto">
              {data.features.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {data.features.items.map((b, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl shadow-md p-12 flex flex-col items-center text-center border border-blue-100 hover:border-blue-400 hover:shadow-xl transition-all duration-[2500ms] animate-fade-in-up ${
                    activeBenefitIdx === idx
                      ? "scale-105 z-10 shadow-2xl border-blue-400"
                      : "scale-100"
                  }`}
                  style={{
                    transition:
                      "transform 2.5s cubic-bezier(.4,1,.6,1), box-shadow 2.5s, border-color 2.5s",
                  }}
                >
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <div className="font-bold text-2xl text-blue-900 mb-4">
                    {b.title}
                  </div>
                  <div className="text-gray-700 text-lg">{b.desc}</div>
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
                    src={data.demoImages[demoIdx]}
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
                      disabled={data.demoImages.length <= 1}
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
                      {demoIdx + 1} / {data.demoImages.length}
                    </span>
                    <button
                      onClick={nextDemo}
                      className="bg-blue-100 hover:bg-blue-300 text-blue-700 font-bold rounded-full w-10 h-10 flex items-center justify-center shadow transition-all disabled:opacity-40"
                      disabled={data.demoImages.length <= 1}
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
                    {data.demoImages.map((_, idx) => (
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

        {/* Product Features by Module */}
        <section
          className="py-20 animate-fade-in-up relative animate-background-glow theme-bg-animated"
          style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-white text-center">
              Product Modules
            </h2>
            <p className="text-lg text-gray-300 mb-10 text-center max-w-2xl mx-auto">
              Our platform is built from modular components to cover every
              aspect of HR, payroll, and compliance—choose what fits your
              business best.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {data.modules.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl p-10 flex flex-col items-center text-center border border-white/10 hover:border-blue-500 hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
                >
                  <div className="text-4xl mb-4">{m.icon}</div>
                  <div className="font-bold text-xl text-white mb-3">
                    {m.title}
                  </div>
                  <div className="text-gray-300 text-base">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-gray-50 animate-fade-in-up light-section">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-extrabold mb-3 text-blue-800 text-center">
              Who Is It <span className="text-blue-600">For?</span>
            </h2>
            <div className="mx-auto mb-10 w-16 h-1 bg-blue-600 rounded-full"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {data.useCases.map((u, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl shadow p-10 flex flex-col items-center text-center border border-gray-200 animate-fade-in-up transition-transform duration-500 hover:scale-105 hover:-rotate-1 hover:shadow-blue-200/40 hover:shadow-2xl cursor-pointer"
                  style={{ willChange: "transform" }}
                >
                  <div className="font-bold text-xl text-blue-800 mb-3">
                    {u.title}
                  </div>
                  <div className="text-gray-600 text-base">{u.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Pricing Section (Full Details) */}
        <section
          className="py-12 relative animate-background-glow theme-bg-animated"
          style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Implementation <span className="text-blue-400">Pricing</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Choose the perfect implementation plan that fits your business
                needs and budget
              </p>
            </div>
            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {data.pricing.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border-2 ${
                    plan.isPopular
                      ? "border-blue-400 hover:border-blue-600 transform scale-105"
                      : "border-white/10 hover:border-blue-300"
                  } transition-all duration-300 relative`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-300 mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span
                        className={`text-4xl font-bold ${
                          plan.isPopular ? "text-blue-400" : "text-white"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span className="text-gray-300 ml-2">
                        {plan.priceNote}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-400 mr-3"
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
                        <span className="text-gray-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full ${
                      plan.isPopular
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-600 hover:bg-gray-700"
                    } text-white py-3 rounded-lg font-semibold transition-all duration-300`}
                  >
                    {plan.ctaText}
                  </button>
                </div>
              ))}
            </div>
            {/* Additional Info */}
            <div className="text-center mt-12">
              <p className="text-gray-300 mb-4">
                All plans include free consultation and project scoping
              </p>
              <p className="text-sm text-gray-400">
                Need a custom solution?{" "}
                <span className="text-blue-400 font-semibold cursor-pointer hover:underline">
                  Contact our team for personalized pricing
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Strong CTA Block */}
        <section className="py-16 bg-gray-50 text-center animate-fade-in-up light-section">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">
              {data.cta.title}
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-600">
              {data.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#demo"
                className="inline-block border-2 border-blue-700 hover:border-blue-400 text-blue-700 hover:text-blue-900 font-semibold rounded-lg px-8 py-4 transition-all duration-200 shadow-lg text-lg hover:bg-blue-100"
              >
                {data.cta.buttonText}
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-white/90 animate-fade-in-up light-section">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">
              {data.faq.title}
            </h2>
            <div className="space-y-6">
              {data.faq.items.map((faq, idx) => (
                <div key={idx} className="border-b border-blue-100 pb-4">
                  <button
                    className="w-full text-left flex justify-between items-center text-lg font-medium text-blue-900 focus:outline-none"
                    onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                    aria-expanded={openFAQ === idx}
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`ml-4 transition-transform ${
                        openFAQ === idx ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openFAQ === idx && (
                    <div className="mt-2 text-gray-700 animate-fade-in-up">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
      </main>

      <style>{`
        @keyframes video-enhance {
          0%, 100% { 
            filter: brightness(0.7) contrast(1.2) saturate(1.3) hue-rotate(10deg);
            transform: scale(1.05);
          }
          50% { 
            filter: brightness(0.8) contrast(1.3) saturate(1.4) hue-rotate(15deg);
            transform: scale(1.08);
          }
        }
      `}</style>
    </>
  );
}
