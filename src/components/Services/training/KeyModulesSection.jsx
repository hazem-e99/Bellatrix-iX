// KeyModulesSection.jsx
import React from 'react';
import ModuleCard from './ModuleCard';

const KeyModulesSection = ({ keyModulesSection, keyModules, renderIcon }) => {
    return (
        <div className="py-12 relative overflow-hidden animate-background-glow" style={{
            backgroundColor: '#001038',
            animation: 'background-glow 12s ease-in-out infinite'
        }}>
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* ... (keep all background effects) ... */}
            </div>
            
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
                        <ModuleCard 
                            key={index}
                            module={module}
                            index={index}
                            renderIcon={renderIcon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KeyModulesSection;