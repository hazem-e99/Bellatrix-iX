import React from 'react';

const PayrollCTA = ({ ctaData, onCtaClick }) => {
  // Default data in case props are not provided
  const defaultData = {
    title: "Ready to Transform Your Payroll Process?",
    description: "Join thousands of businesses that have automated their payroll and reduced processing time by 80%",
    buttonText: "Schedule a Demo"
  };

  // Use provided data or default data
  const data = ctaData || defaultData;

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:20px_20px]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-cyan-400/15 rounded-full blur-md animate-pulse delay-500"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center">
          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            {data.title}
          </h2>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
            {data.description}
          </p>

          {/* CTA Button */}
          <button
            onClick={onCtaClick}
            className="group relative bg-white text-blue-800 px-8 py-4 rounded-xl font-bold text-lg md:text-xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>{data.buttonText}</span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            
            {/* Button hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Additional Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">No setup fees</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">30-day money back guarantee</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">24/7 customer support</span>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm mb-4">Trusted by thousands of businesses worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-70">
              <div className="text-white/50 text-xs">✓ Fortune 500 Companies</div>
              <div className="text-white/50 text-xs">✓ SMEs</div>
              <div className="text-white/50 text-xs">✓ Startups</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-700/50 to-transparent"></div>
    </section>
  );
};

export default PayrollCTA;