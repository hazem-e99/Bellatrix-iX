import React from 'react';
import SectionWrapper from './SectionWrapper';

export default function CTASection({ title, description, buttonText }) {
  return (
    <SectionWrapper bgColor="bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">{title}</h2>
        <p className="text-lg md:text-xl mb-8 text-gray-600">{description}</p>
        <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-lg transition-all duration-300 hover:scale-105 focus:outline-none">
          {buttonText}
        </button>
      </div>
    </SectionWrapper>
  );
}