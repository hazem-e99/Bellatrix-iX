import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';

export default function FeatureCards({ title, description, items }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <SectionWrapper bgColor="bg-gray-50">
      <h2 className="text-3xl font-bold mb-4 text-blue-800 text-center">{title}</h2>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl mx-auto">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl shadow-md p-12 flex flex-col items-center text-center border border-blue-100 hover:border-blue-400 hover:shadow-xl transition-all duration-[2500ms] animate-fade-in-up ${
              activeIdx === idx ? 'scale-105 z-10 shadow-2xl border-blue-400' : 'scale-100'
            }`}
            style={{ transition: 'transform 2.5s cubic-bezier(.4,1,.6,1), box-shadow 2.5s, border-color 2.5s' }}
          >
            <div className="text-3xl mb-4">{item.icon}</div>
            <div className="font-bold text-2xl text-blue-900 mb-4">{item.title}</div>
            <div className="text-gray-700 text-lg">{item.desc}</div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}