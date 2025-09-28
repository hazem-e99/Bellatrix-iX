import React, { useState, useEffect } from "react";

const PayrollHowItWorks = ({ data }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/payroll.json');
        const jsonData = await response.json();
        setDefaultData(jsonData.howItWorks);
      } catch (error) {
        console.error('Failed to load payroll data:', error);
        setDefaultData({
          title: "How Our Payroll System Works",
          description: "Our payroll process is simple and automated."
        });
      }
    };
    fetchData();
  }, []);

  // Use props if provided, otherwise fall back to default data
  const sectionData = data && typeof data === "object" ? data : (defaultData || {});
  const steps = Array.isArray(sectionData.steps) ? sectionData.steps : [];

  return (
    <section
      className="py-20 relative overflow-hidden animate-background-glow"
      style={{
        backgroundColor: "#001038",
        animation: "background-glow 12s ease-in-out infinite",
      }}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Title */}
        {sectionData.title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white text-center">
            {sectionData.title}
          </h2>
        )}

        <div className="bg-gradient-to-br from-gray-800/90 via-gray-700/80 to-gray-800/90 rounded-xl p-12 shadow-2xl max-w-6xl mx-auto border border-gray-600/50 backdrop-blur-sm hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
          {/* Background Effects */}
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

          {/* Data visualization lines */}
          <div className="absolute top-6 left-1/4 w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-300/40 to-transparent"></div>
          <div className="absolute bottom-6 right-1/4 w-20 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"></div>

          <div className="relative z-10">
            {/* Description */}
            {sectionData.description && (
              <p className="text-xl text-gray-300 leading-relaxed mb-10">
                {sectionData.description}
              </p>
            )}

            {/* Steps List */}
            {steps.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8 mt-10">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-900/70 border border-gray-700/50 p-6 rounded-lg shadow-md hover:shadow-blue-500/20 transition"
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {step.title || ""}
                    </h3>
                    <p className="text-gray-300 text-base">
                      {step.description || ""}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayrollHowItWorks;
