import React from 'react';

const CTASection = ({ data }) => {
  return (
    <section className="py-16 bg-gray-50 text-center animate-fade-in-up light-section">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">{data.cta.title}</h2>
        <p className="text-lg md:text-xl mb-8 text-gray-600">{data.cta.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#demo" className="inline-block border-2 border-blue-700 hover:border-blue-400 text-blue-700 hover:text-blue-900 font-semibold rounded-lg px-8 py-4 transition-all duration-200 shadow-lg text-lg hover:bg-blue-100">{data.cta.buttonText}</a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;