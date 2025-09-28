import React, { useState, useEffect } from 'react';

const HeroSection = ({ title, subtitle }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/integration-data.json');
        const jsonData = await response.json();
        setDefaultData(jsonData.hero);
      } catch (error) {
        console.error('Failed to load Integration data:', error);
        // Fallback data
        setDefaultData({
          title: "NetSuite Integration Services",
          subtitle: "Connect NetSuite with your existing systems for seamless data flow"
        });
      }
    };
    fetchData();
  }, []);

  // Use props if provided, otherwise fall back to default data
  const displayData = {
    title: title || defaultData?.title || "NetSuite Integration Services",
    subtitle: subtitle || defaultData?.subtitle || "Connect NetSuite with your existing systems for seamless data flow"
  };
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#191970] via-black to-blue-700 py-24 md:py-32 text-center flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-0"></div>
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-2xl">
          {displayData.title}
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
          {displayData.subtitle}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;