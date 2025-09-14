import React from 'react';
import { usePageData } from '../hooks/useJsonServerData.jsx';

// Example of how to integrate real-time data updates in a user page
const ExampleHRPage = () => {
  // Use the real-time data hook for the HR page
  const { data: hrData, isLoading: loading, error } = usePageData('hr');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error loading page: {error}</div>
      </div>
    );
  }

  if (!hrData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">No data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {hrData.hero && (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {hrData.hero.bgVideo && (
            <video
              autoPlay
              muted
              loop
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={hrData.hero.bgVideo} type="video/mp4" />
            </video>
          )}
          
          <div className={`absolute inset-0 ${hrData.hero.bgColor || 'bg-black/50'}`}></div>
          
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {hrData.hero.title}
            </h1>
            {hrData.hero.subtitle && (
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {hrData.hero.subtitle}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      {hrData.features && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {hrData.features.title}
              </h2>
              {hrData.features.description && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {hrData.features.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hrData.features.items?.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modules Section */}
      {hrData.modules && hrData.modules.length > 0 && (
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Our Modules
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hrData.modules.map((module, index) => (
                <div
                  key={index}
                  className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-4">{module.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {module.title}
                  </h3>
                  <p className="text-gray-600">
                    {module.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {hrData.pricing && hrData.pricing.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Choose Your Plan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {hrData.pricing.map((plan, index) => (
                <div
                  key={index}
                  className={`p-8 rounded-xl border-2 ${
                    plan.isPopular
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium text-center mb-4">
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.priceNote && (
                      <span className="text-gray-600 ml-2">{plan.priceNote}</span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features?.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      plan.isPopular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {plan.ctaText || 'Get Started'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {hrData.cta && (
        <section className="py-20 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-4xl font-bold text-white mb-4">
              {hrData.cta.title}
            </h2>
            {hrData.cta.description && (
              <p className="text-xl text-blue-100 mb-8">
                {hrData.cta.description}
              </p>
            )}
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              {hrData.cta.buttonText || 'Get Started'}
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default ExampleHRPage;