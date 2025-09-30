import React from 'react';
import { integrationData } from '../../../data/integrationData';
import { mergeStringData } from '../../../utils/dataMerger';

const CtaSection = ({ title, subtitle, buttonText }) => {
  // Fallback data for when no data is available
  const fallbackData = {
    title: "Ready to Integrate?",
    subtitle: "Let's connect your systems and streamline your business operations.",
    buttonText: "Start Integration"
  };

  // Merge data with priority: props > defaultData > fallbackData
  const displayData = {
    title: mergeStringData(title, integrationData.cta.title, fallbackData.title),
    subtitle: mergeStringData(subtitle, integrationData.cta.subtitle, fallbackData.subtitle),
    buttonText: mergeStringData(buttonText, integrationData.cta.buttonText, fallbackData.buttonText)
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