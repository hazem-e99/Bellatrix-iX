import React, { useState, useEffect } from 'react';

const BenefitsSection = ({ data, activeBenefitIdx, onShowDemo }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/hr.json');
        const jsonData = await response.json();
        setDefaultData(jsonData.features);
      } catch (error) {
        console.error('Failed to load HR data:', error);
        // Fallback data
        setDefaultData({
          title: "Why Choose Our HR Solution?",
          description: "Discover the key advantages that make our HR platform the smart choice for modern businesses of all sizes and industries.",
          items: []
        });
      }
    };
    fetchData();
  }, []);

  // Use props if provided, otherwise fall back to default data
  const displayData = {
    features: data?.features || defaultData || {
      title: "Why Choose Our HR Solution?",
      description: "Discover the key advantages that make our HR platform the smart choice for modern businesses of all sizes and industries.",
      items: []
    }
  };
  return (
    <section className="py-20 bg-gray-50 animate-fade-in-up light-section">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-blue-800 text-center">{displayData.features.title}</h2>
        <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl mx-auto">{displayData.features.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {displayData.features.items.map((b, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl shadow-md p-12 flex flex-col items-center text-center border border-blue-100 hover:border-blue-400 hover:shadow-xl transition-all duration-[2500ms] animate-fade-in-up ${activeBenefitIdx === idx ? 'scale-105 z-10 shadow-2xl border-blue-400' : 'scale-100'}`}
              style={{ transition: 'transform 2.5s cubic-bezier(.4,1,.6,1), box-shadow 2.5s, border-color 2.5s' }}
            >
              <div className="text-4xl mb-4">{b.icon}</div>
              <div className="font-bold text-2xl text-blue-900 mb-4">{b.title}</div>
              <div className="text-gray-700 text-lg">{b.desc}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <button
            onClick={onShowDemo}
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-lg transition-all duration-300 hover:scale-105 focus:outline-none"
          >
            See a Live Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;