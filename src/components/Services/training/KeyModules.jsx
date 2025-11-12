import React from 'react';
import { renderIcon } from './utils';

const KeyModules = ({ keyModulesSection, keyModules }) => {
  return (
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          {keyModulesSection.title.split(' ')[0]} <span className="text-blue-400">{keyModulesSection.title.split(' ').slice(1).join(' ')}</span>
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
          {keyModulesSection.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {keyModules.map((module, index) => (
          <div key={index} className="group relative overflow-hidden bg-gray-800 rounded-3xl p-6 border border-gray-600/50 shadow-2xl hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
            <div className="relative z-10">
              <div className={`w-12 h-12 bg-gradient-to-br ${
                index % 4 === 0 ? 'from-blue-500 to-blue-600' :
                index % 4 === 1 ? 'from-blue-400 to-blue-500' :
                index % 4 === 2 ? 'from-blue-600 to-blue-700' :
                'from-blue-700 to-blue-800'
              } rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                {renderIcon(module.icon, "w-6 h-6 text-white")}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {module.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {module.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyModules;