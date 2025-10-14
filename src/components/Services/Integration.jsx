import React, { useEffect, useState } from 'react';

const Integration = ({ data: propsData = null }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // PRIORITIZE props data over fetched data for real-time preview
    if (propsData) {
      setData(propsData);
      setLoading(false);
      console.log("🎯 [Integration] Using props data:", propsData);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/data/integration-data.json');
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
        console.log("🎯 [Integration] Using fetched data:", jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [propsData]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Error loading data</div>;
  }

  return (
    <main className="bg-gradient-to-br from-blue-50 to-white min-h-screen text-slate-800">
      {/* Hero Section */}
      <section className="w-full min-h-screen bg-gradient-to-br from-[#191970] via-black to-blue-700 py-24 md:py-32 text-center flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-2xl">
            {data.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
            {data.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Integration Types */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">{data.integrationTypes.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.integrationTypes.items.map((integration, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">
                  {typeof integration.icon === 'string'
                    ? integration.icon
                    : integration.icon?.icon || integration.icon?.emoji || '🔌'}
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">
                  {typeof integration.title === 'string'
                    ? integration.title
                    : integration.title?.title || integration.title?.name || 'Integration Title'}
                </h3>
                <p className="text-gray-600">
                  {typeof integration.description === 'string'
                    ? integration.description
                    : integration.description?.description || integration.description?.desc || 'Integration Description'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">{data.benefits.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.benefits.items.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-800 mb-2">
                    {typeof benefit.title === 'string'
                      ? benefit.title
                      : benefit.title?.title || benefit.title?.name || 'Benefit Title'}
                  </h3>
                  <p className="text-gray-600">
                    {typeof benefit.description === 'string'
                      ? benefit.description
                      : benefit.description?.description || benefit.description?.desc || 'Benefit Description'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Integrations */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">{data.popularIntegrations.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {data.popularIntegrations.platforms.map((platform, index) => (
              <div key={index} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300">
                <div className="text-2xl font-bold text-blue-800">{platform}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.cta.title}</h2>
          <p className="text-lg md:text-xl mb-8">
            {typeof data.cta.subtitle === 'string'
              ? data.cta.subtitle
              : data.cta.subtitle?.subtitle || data.cta.subtitle?.title || 'CTA Subtitle'}
          </p>
          <button className="bg-white text-blue-800 font-bold px-8 py-4 rounded-xl shadow-lg text-lg transition-all duration-300 hover:scale-105">
            {data.cta.buttonText}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Integration;