import React from "react";

const BenefitsSection = ({ title, description, items }) => {
  return (
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((benefit, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="text-3xl font-bold text-cyan-400 mb-2">
              {benefit.metric}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {benefit.title}
            </h3>
            <p className="text-gray-300 text-sm">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;