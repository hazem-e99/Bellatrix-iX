import React, { useState, useEffect } from 'react';

const CTASection = ({ data }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/hr.json');
        const jsonData = await response.json();
        setDefaultData(jsonData.cta);
      } catch (error) {
        console.error('Failed to load HR data:', error);
        // Fallback data
        setDefaultData({
          title: "Ready to Transform Your HR Operations?",
          description: "Join 10,000+ companies that have automated their HR processes and reduced administrative workload by 70%",
          buttonText: "Start Free Trial"
        });
      }
    };
    fetchData();
  }, []);

  // Use props if provided, otherwise fall back to default data
  const displayData = {
    cta: data?.cta || defaultData || {
      title: "Ready to Transform Your HR Operations?",
      description: "Join 10,000+ companies that have automated their HR processes and reduced administrative workload by 70%",
      buttonText: "Start Free Trial"
    }
  };
  return (
    <section className="py-16 bg-gray-50 text-center animate-fade-in-up light-section">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">{displayData.cta.title}</h2>
        <p className="text-lg md:text-xl mb-8 text-gray-600">{displayData.cta.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#demo" className="inline-block border-2 border-blue-700 hover:border-blue-400 text-blue-700 hover:text-blue-900 font-semibold rounded-lg px-8 py-4 transition-all duration-200 shadow-lg text-lg hover:bg-blue-100">{displayData.cta.buttonText}</a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;