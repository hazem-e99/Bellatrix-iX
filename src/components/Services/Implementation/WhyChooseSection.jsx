// components/Implementation/WhyChooseSection.jsx
import React, { useState, useEffect } from 'react';

const WhyChooseSection = ({ data = {} }) => {
    const [defaultData, setDefaultData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/Implementation.json');
                const jsonData = await response.json();
                setDefaultData(jsonData.whyChooseSection);
            } catch (error) {
                console.error('Failed to load Implementation data:', error);
                // Fallback data
                setDefaultData({
                    title: "Why Choose Bellatrix for Implementation?",
                    subtitle: "We bring years of expertise, proven methodologies, and cutting-edge solutions to ensure your implementation success",
                    image: "/Videos/implementation/whyChoese.jpg",
                    features: []
                });
            }
        };
        fetchData();
    }, []);

    // Use props if provided, otherwise fall back to default data
    const displayData = data && Object.keys(data).length > 0 ? data : (defaultData || {
        title: "Why Choose Bellatrix for Implementation?",
        subtitle: "We bring years of expertise, proven methodologies, and cutting-edge solutions to ensure your implementation success",
        image: "/Videos/implementation/whyChoese.jpg",
        features: []
    });
    
    return (
        <div className="py-12 relative overflow-hidden animate-background-glow" style={{
            backgroundColor: '#001038',
            animation: 'background-glow 12s ease-in-out infinite'
        }}>
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        {displayData.title}
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                        {displayData.subtitle}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Features Content - Left Side */}
                    <div className="flex-1">
                        <div className="bg-gradient-to-br from-gray-800/90 via-gray-700/80 to-gray-800/90 rounded-3xl p-8 border border-gray-600/50 shadow-2xl hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group backdrop-blur-sm">
                            {/* Creative Background Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full opacity-20 transform translate-x-16 -translate-y-16 group-hover:opacity-40 transition-opacity duration-500"></div>
                            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 rounded-full opacity-20 transform -translate-x-10 translate-y-10 group-hover:opacity-40 transition-opacity duration-500"></div>
                            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full opacity-15 transform -translate-x-8 -translate-y-8 group-hover:opacity-30 transition-opacity duration-500"></div>
                            
                            <div className="relative z-10 space-y-4">
                                {(displayData.features || []).map((feature, index) => {
                                    const bgGradients = [
                                        'from-blue-700 to-blue-900',
                                        'from-blue-800 to-blue-950',
                                        'from-blue-900 to-slate-900',
                                        'from-blue-600 to-blue-800'
                                    ];
                                    return (
                                        <div key={index} className="group/item hover:bg-gradient-to-r hover:from-gray-700/50 hover:to-transparent rounded-xl p-3 transition-all duration-300 hover:transform hover:translate-x-2">
                                            <div className="flex items-center">
                                                <div className="relative mr-3">
                                                    <div className={`w-7 h-7 bg-gradient-to-br ${bgGradients[index]} rounded-lg flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-all duration-300`}>
                                                        <span className="text-white font-bold text-xs">{feature.number}</span>
                                                    </div>
                                                    <div className={`absolute -inset-1 bg-gradient-to-r ${bgGradients[index]} rounded-lg blur opacity-30 group-hover/item:opacity-60 transition-opacity duration-300`}></div>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-white mb-1 group-hover/item:text-blue-300 transition-all duration-300">{feature.title}</h3>
                                                    <p className="text-sm text-gray-300">{feature.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Image - Right Side */}
                    <div className="flex-1 flex justify-center">
                        <div className="relative group">
                            {/* Glowing background effect */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-white/20 via-blue-300/30 to-white/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                            
                            {/* Image container with enhanced styling */}
                            <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/20 shadow-2xl">
                                <img 
                                    src={displayData.image} 
                                    alt="Why Choose Bellatrix - Digital Innovation & Technology" 
                                    className="w-full h-auto lg:max-w-md rounded-xl shadow-lg brightness-110 contrast-110 saturate-110 group-hover:scale-105 transition-all duration-500"
                                />
                                
                                {/* Overlay gradient for better contrast */}
                                <div className="absolute inset-4 rounded-xl bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none"></div>
                                
                                {/* Floating elements for tech feel */}
                                <div className="absolute top-2 right-2 w-3 h-3 bg-white/80 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-300/80 rounded-full animate-ping"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseSection;