import React from 'react';
import { integrationData } from '../../../data/integrationData';
import { mergeStringData } from '../../../utils/dataMerger';

const HeroSection = ({ title, subtitle }) => {
  // Fallback data for when no data is available
  const fallbackData = {
    title: "NetSuite Integration Services",
    subtitle: "Connect NetSuite with your existing systems for seamless data flow"
  };

  // Merge data with priority: props > defaultData > fallbackData
  const displayData = {
    title: mergeStringData(title, integrationData.hero.title, fallbackData.title),
    subtitle: mergeStringData(subtitle, integrationData.hero.subtitle, fallbackData.subtitle)
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