import React from 'react';
import { renderIcon } from './utils';

const WhyChooseTraining = ({ whyChooseSection, trainingFeatures, openFeatureModal }) => {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          {whyChooseSection.title.split(' ')[0]} <span className="text-blue-600">{whyChooseSection.title.split(' ').slice(1).join(' ')}</span>
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {whyChooseSection.description}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingFeatures.map((feature, index) => (
              <div key={feature.id} className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 p-8 animate-fade-in-up" style={{animationDelay: `${0.1 * (index + 1)}s`}}>
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
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          {/* Image content */}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseTraining;