import React from 'react';
import { motion } from 'framer-motion';
import { useComponentData } from '../../../utils/useComponentData';
import manufacturingData from '../../../../public/data/manufacturing-data.json';

const ChallengesSection = ({ data, activeChallenge, setActiveChallenge }) => {
  // Merge props with default data from JSON
  const finalData = useComponentData('challenges', data, manufacturingData);

  console.log('🏭 [ChallengesSection] Data merge:', {
    props: data,
    defaultData: manufacturingData.challenges,
    finalData: finalData,
    itemsCount: finalData.items?.length,
    activeChallenge: activeChallenge
  });

  // Use default activeChallenge if not provided
  const safeActiveChallenge = activeChallenge || 0;
  const safeSetActiveChallenge = setActiveChallenge || (() => {});

  return (
    <div className="py-20 relative overflow-hidden" style={{backgroundColor: '#001038'}}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" viewBox="0 0 100 100" className="text-blue-300">
            <pattern id="challengesGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#challengesGrid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Manufacturing <span className="text-cyan-400">Challenges</span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Modern manufacturing faces complex challenges that require integrated solutions 
            to maintain competitiveness and operational efficiency.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Challenges Showcase - Left Side */}
          <div className="flex-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/10">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={finalData.items?.[safeActiveChallenge]?.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {finalData.items?.[safeActiveChallenge]?.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {finalData.items?.[safeActiveChallenge]?.description}
                </p>
                <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-blue-300 font-semibold">Impact: {finalData.items?.[safeActiveChallenge]?.impact}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Navigation */}
            <div className="flex space-x-2 mt-6 justify-center">
              {finalData.items?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => safeSetActiveChallenge(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    safeActiveChallenge === index ? 'bg-blue-400' : 'bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="flex-1 flex justify-center">
            <div className="relative group max-w-xl">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-4 backdrop-blur-sm border border-white/20 shadow-2xl">
                <img 
                  src="https://i.pinimg.com/736x/c4/80/65/c4806594c1156f008c99c34514da447c.jpg" 
                  alt="Manufacturing Challenges" 
                  className="w-full h-auto rounded-xl shadow-lg brightness-110 contrast-110 saturate-110 group-hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesSection;