// FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ feature, renderIcon, openFeatureModal, index }) => {
    // Add null checks for feature data
    if (!feature) {
        return (
            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="text-center text-gray-500">
                    <p>Feature data unavailable</p>
                </div>
            </div>
        );
    }

    return (
        <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 p-6 animate-fade-in-up" style={{animationDelay: `${0.1 * (index + 1)}s`}}>
            <div className="relative z-10">
                {/* Icon - Blue square icon in top-left corner */}
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-md">
                    {renderIcon && renderIcon(feature.icon || "M12 4v16m8-8H4", "w-6 h-6 text-white")}
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title || "Feature Title"}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    {feature.shortDescription || feature.description || "Feature description"}
                </p>
                
                {/* Learn More Link */}
                <button 
                    onClick={() => openFeatureModal && openFeatureModal(feature)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-300 group-hover:translate-x-1 transform cursor-pointer"
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