// components/Implementation/CtaSection.jsx
import React from 'react';

const CtaSection = ({ data, openModal }) => {
    return (
        <div className="relative py-16 overflow-hidden" style={{backgroundColor: '#001038'}}>
            {/* Simple Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-blue-300">
                        <pattern id="simpleGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3"/>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#simpleGrid)" />
                    </svg>
                </div>
            </div>

            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10"></div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        {data.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
                        {data.subtitle}
                    </p>
                    
                    {/* CTA Button */}
                    <div className="mb-16">
                        <button 
                            onClick={openModal}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                        >
                            {data.ctaButton}
                        </button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {data.features.map((feature, index) => {
                            const bgColors = ['bg-blue-600', 'bg-blue-700', 'bg-blue-800'];
                            return (
                                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                                    <div className={`w-12 h-12 ${bgColors[index]} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-300 text-sm">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CtaSection;