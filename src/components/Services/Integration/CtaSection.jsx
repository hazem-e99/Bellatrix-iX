import React, { useState, useEffect } from 'react';

const CtaSection = ({ title, subtitle, buttonText }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/integration-data.json');
        const jsonData = await response.json();
        setDefaultData(jsonData.cta);
      } catch (error) {
        console.error('Failed to load Integration data:', error);
        // Fallback data
        setDefaultData({
          title: "Ready to Integrate?",
          subtitle: "Let's connect your systems and streamline your business operations.",
          buttonText: "Start Integration"
        });
      }
    };
    fetchData();
  }, []);

  // Use props if provided, otherwise fall back to default data
  const displayData = {
    title: title || defaultData?.title || "Ready to Integrate?",
    subtitle: subtitle || defaultData?.subtitle || "Let's connect your systems and streamline your business operations.",
    buttonText: buttonText || defaultData?.buttonText || "Start Integration"
  };
  return (
    <div className="max-w-2xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{displayData.title}</h2>
      <p className="text-lg md:text-xl mb-8">{displayData.subtitle}</p>
      <button className="bg-white text-blue-800 font-bold px-8 py-4 rounded-xl shadow-lg text-lg transition-all duration-300 hover:scale-105">
        {displayData.buttonText}
      </button>
    </div>
  );
};

export default CtaSection;