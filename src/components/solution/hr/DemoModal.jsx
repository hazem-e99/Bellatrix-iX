import React, { useState, useEffect } from "react";
import SEO from "../../SEO";

const DemoModal = ({
  showDemo,
  setShowDemo,
  demoImages,
  demoIdx,
  imgFade,
  handleDemoChange,
  nextDemo,
  prevDemo,
}) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/hr.json");
        const jsonData = await response.json();
        setDefaultData(jsonData.demoImages);
      } catch (error) {
        console.error("Failed to load HR data:", error);
        // Fallback data
        setDefaultData([
          "/images/Hr/hr-dashboard-1.png",
          "/images/Hr/hr-analytics-2.png",
          "/images/Hr/hr-onboarding-3.png",
        ]);
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const displayDemoImages = demoImages || defaultData || [
    "/images/Hr/hr-dashboard-1.png",
    "/images/Hr/hr-analytics-2.png",
    "/images/Hr/hr-onboarding-3.png",
  ];

  // Debug logging for real-time updates
  console.log("🎯 [HRDemoModal] Component received data:", {
    hasPropsData: !!demoImages,
    propsData: demoImages,
    hasDefaultData: !!defaultData,
    finalData: displayDemoImages,
    timestamp: new Date().toISOString()
  });
  if (!showDemo) return null;

  return (
    <>
      <SEO
        title="Oracle NetSuite HR Platform Demo | Interactive HR System Preview"
        description="Explore Oracle NetSuite HR platform with our interactive demo. See employee management, payroll automation, compliance features, and analytics in action."
        keywords="Oracle NetSuite HR demo, HR platform preview, NetSuite HR screenshots, employee management demo, HR system walkthrough"
        ogTitle="NetSuite HR Platform Demo - Interactive System Preview"
        ogDescription="Interactive Oracle NetSuite HR platform demo showcasing employee management, payroll, compliance, and analytics features."
        ogImage="/images/netsuite-hr-demo.jpg"
      />
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={() => setShowDemo(false)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
      >
        <article
          className="bg-[var(--color-bg-primary)] rounded-2xl shadow-2xl p-8 max-w-3xl w-full relative animate-fade-in-up"
          onClick={(e) => e.stopPropagation()}
          role="article"
          aria-label="HR Platform Demo"
        >
          <header className="relative mb-6">
            <h2 id="demo-modal-title" className="sr-only">
              Oracle NetSuite HR Platform Demo
            </h2>
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-[var(--color-bg-primary)]/70 hover:bg-[var(--color-error)]/10 shadow-md text-4xl text-[var(--color-text-secondary)] hover:text-[var(--color-error)] font-bold transition-all duration-200 focus:outline-none border border-[var(--color-border-primary)]"
              aria-label="Close Demo Modal"
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
          </header>
          <main className="flex flex-col items-center">
            <img
              src={displayDemoImages[demoIdx]}
              alt={`Oracle NetSuite HR Platform Demo Screenshot ${
                demoIdx + 1
              } - ${
                demoIdx === 0
                  ? "Dashboard Overview"
                  : demoIdx === 1
                  ? "Analytics and Reports"
                  : "Employee Management Interface"
              }`}
              className={`rounded-xl shadow-lg w-full h-96 object-cover mb-4 transition-opacity duration-300 ${
                imgFade ? "opacity-100" : "opacity-0"
              }`}
              style={{ maxWidth: "100%", maxHeight: "420px" }}
            />
            <div className="flex gap-6 items-center justify-center mt-2">
              <button
                onClick={prevDemo}
                className="bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/30 text-[var(--color-primary)] font-bold rounded-full w-10 h-10 flex items-center justify-center shadow transition-all disabled:opacity-40"
                disabled={displayDemoImages.length <= 1}
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
              <span className="text-[var(--color-text-secondary)] font-semibold">
                {demoIdx + 1} / {displayDemoImages.length}
              </span>
              <button
                onClick={nextDemo}
                className="bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/30 text-[var(--color-primary)] font-bold rounded-full w-10 h-10 flex items-center justify-center shadow transition-all disabled:opacity-40"
                disabled={displayDemoImages.length <= 1}
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
              {displayDemoImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDemoChange(idx)}
                  className={`w-3 h-3 rounded-full border-2 ${
                    demoIdx === idx
                      ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                      : "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30"
                  } transition-all`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </main>
        </article>
      </div>
    </>
  );
};

export default DemoModal;
