// FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ feature, renderIcon, openFeatureModal, index }) => {
    return (
        <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 p-8 animate-fade-in-up" style={{animationDelay: `${0.1 * (index + 1)}s`}}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500 rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 animate-bounce-subtle shadow-lg">
                    {renderIcon(feature.icon)}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.shortDescription}
                </p>
                <button 
                    onClick={() => openFeatureModal(feature)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-300 group-hover:translate-x-1 transform cursor-pointer hover:cursor-pointer"
                >
                    Learn More
                    <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default FeatureCard;