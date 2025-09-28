// components/Implementation/CtaSection.jsx
import React, { useState, useEffect } from 'react';

const CtaSection = ({ data = {}, openModal }) => {
    const [defaultData, setDefaultData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/Implementation.json');
                const jsonData = await response.json();
                setDefaultData(jsonData.ctaSection);
            } catch (error) {
                console.error('Failed to load Implementation data:', error);
                // Fallback data
                setDefaultData({
                    title: "Ready for a Seamless NetSuite Implementation?",
                    subtitle: "Transform your business operations with our expert NetSuite implementation services. Let's turn your vision into reality with proven methodologies and dedicated support.",
                    ctaButton: "Get Started Today",
                    features: [
                        {
                            title: "Quick Response",
                            description: "Get a detailed proposal within 24 hours",
                            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        },
                        {
                            title: "Proven Success",
                            description: "99.9% implementation success rate",
                            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        },
                        {
                            title: "Expert Support",
                            description: "Dedicated team of certified professionals",
                            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        }
                    ]
                });
            }
        };
        fetchData();
    }, []);

    // Use props if provided, otherwise fall back to default data
    const displayData = data && Object.keys(data).length > 0 ? data : (defaultData || {
        title: "Ready for a Seamless NetSuite Implementation?",
        subtitle: "Transform your business operations with our expert NetSuite implementation services.",
        ctaButton: "Get Started Today",
        features: []
    });
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
                        {displayData.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
                        {displayData.subtitle}
                    </p>
                    
                    {/* CTA Button */}
                    <div className="mb-16">
                        <button 
                            onClick={openModal}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                        >
                            {displayData.ctaButton}
                        </button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {displayData.features.map((feature, index) => {
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