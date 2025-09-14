import React from "react";

const CtaSection = ({ title, subtitle, buttonText }) => {
  return (
    <section className="py-16 bg-blue-800 text-white text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg md:text-xl mb-8">{subtitle}</p>
        <button className="bg-white text-blue-800 font-bold px-8 py-4 rounded-xl shadow-lg text-lg transition-all duration-300 hover:scale-105">
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default CtaSection;