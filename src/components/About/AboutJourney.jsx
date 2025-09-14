import React from 'react';

const AboutJourney = () => (
  <section className="py-20 relative overflow-hidden" style={{backgroundColor: '#001038'}}>
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-full h-full">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-blue-300">
          <pattern id="journeyGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#journeyGrid)" />
        </svg>
      </div>
    </div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Our <span className="text-cyan-400">Journey</span>
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
          From humble beginnings to becoming a trusted Oracle NetSuite partner, 
          our journey has been marked by innovation, growth, and unwavering commitment to excellence.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h3 className="text-3xl font-bold text-white">The Beginning</h3>
          <p className="text-gray-300 leading-relaxed text-lg">
            Founded in 2008 with a vision to bridge the gap between complex enterprise software 
            and real business needs. Our founders recognized that many businesses were struggling 
            to fully leverage their technology investments.
          </p>
          <h3 className="text-3xl font-bold text-white">Growth & Evolution</h3>
          <p className="text-gray-300 leading-relaxed text-lg">
            Over the years, we've evolved from a small consulting firm to a comprehensive 
            digital transformation partner, helping hundreds of organizations across various 
            industries unlock their full potential.
          </p>
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 p-6 rounded-xl border border-blue-400/30 backdrop-blur-sm">
            <h4 className="font-bold text-cyan-300 mb-2">Today</h4>
            <p className="text-gray-300">
              We continue to innovate and expand our services, staying at the forefront of 
              technology trends while maintaining our core values of excellence and integrity.
            </p>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative group">
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/20 shadow-2xl">
              <img 
                src="/images/solution.jpg" 
                alt="Our Journey - Digital Innovation" 
                className="w-full h-auto lg:max-w-md rounded-xl shadow-lg brightness-110 contrast-110 saturate-110 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-4 rounded-xl bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutJourney; 