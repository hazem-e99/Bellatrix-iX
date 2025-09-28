// components/Implementation/PricingSection.jsx
import React, { useState, useEffect } from 'react';

const PricingSection = ({ data = {} }) => {
    const [defaultData, setDefaultData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/Implementation.json');
                const jsonData = await response.json();
                setDefaultData(jsonData.pricingSection);
            } catch (error) {
                console.error('Failed to load Implementation data:', error);
                // Fallback data
                setDefaultData({
                    title: "Implementation Pricing",
                    subtitle: "Choose the perfect implementation plan that fits your business needs and budget",
                    plans: [],
                    additionalInfo: {
                        note: "All plans include free consultation and project scoping",
                        contactText: "Need a custom solution? Contact our team for personalized pricing"
                    }
                });
            }
        };
        fetchData();
    }, []);

    // Use props if provided, otherwise fall back to default data
    const displayData = data && Object.keys(data).length > 0 ? data : (defaultData || {
        title: "Implementation Pricing",
        subtitle: "Choose the perfect implementation plan that fits your business needs and budget",
        plans: [],
        additionalInfo: {
            note: "All plans include free consultation and project scoping",
            contactText: "Need a custom solution? Contact our team for personalized pricing"
        }
    });
    return (
        <div className="bg-gray-50 py-12 light-section">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                        {displayData.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        {displayData.subtitle}
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {displayData.plans.map((plan, index) => (
                        <div key={index} className={`bg-white rounded-2xl p-8 border-2 ${plan.isPopular ? 'border-blue-500 hover:border-blue-600 transform scale-105' : 'border-gray-200 hover:border-blue-300'} transition-all duration-300 relative`}>
                            {plan.isPopular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">Most Popular</span>
                                </div>
                            )}
                            
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 mb-6">{plan.description}</p>
                                <div className="mb-6">
                                    <span className={`text-4xl font-bold ${plan.isPopular ? 'text-blue-600' : 'text-gray-800'}`}>{plan.price}</span>
                                    <span className="text-gray-600 ml-2">{plan.priceNote}</span>
                                </div>
                            </div>
                            
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <button className={`w-full ${plan.isPopular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white py-3 rounded-lg font-semibold transition-all duration-300`}>
                                {plan.ctaText}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">{displayData.additionalInfo.note}</p>
                    <p className="text-sm text-gray-500">{displayData.additionalInfo.contactText.split('Contact our team')[0]}<span className="text-blue-600 font-semibold cursor-pointer hover:underline">Contact our team</span>{displayData.additionalInfo.contactText.split('Contact our team')[1]}</p>
                </div>
            </div>
        </div>
    );
};

export default PricingSection;