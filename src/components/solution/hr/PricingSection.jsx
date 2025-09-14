import React from 'react';

const PricingSection = ({ data }) => {
  return (
    <section className="py-12 relative" style={{ backgroundColor: '#001038' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Implementation <span className="text-blue-400">Pricing</span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Choose the perfect implementation plan that fits your business needs and budget
          </p>
        </div>
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.pricing.map((plan, index) => (
            <div key={index} className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border-2 ${plan.isPopular ? 'border-blue-400 hover:border-blue-600 transform scale-105' : 'border-white/10 hover:border-blue-300'} transition-all duration-300 relative`}>
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.isPopular ? 'text-blue-400' : 'text-white'}`}>{plan.price}</span>
                  <span className="text-gray-300 ml-2">{plan.priceNote}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full ${plan.isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white py-3 rounded-lg font-semibold transition-all duration-300`}>
                {plan.ctaText}
              </button>
            </div>
          ))}
        </div>
        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">All plans include free consultation and project scoping</p>
          <p className="text-sm text-gray-400">Need a custom solution? <span className="text-blue-400 font-semibold cursor-pointer hover:underline">Contact our team for personalized pricing</span></p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;