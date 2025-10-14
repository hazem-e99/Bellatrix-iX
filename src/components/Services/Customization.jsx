import React, { useState, useEffect } from "react";

const Customization = ({ data: propsData = null }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // PRIORITIZE props data over fetched data for real-time preview
    if (propsData) {
      setPageData(propsData);
      setLoading(false);
      console.log("🎯 [Customization] Using props data:", propsData);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch("./data/customization.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPageData(data);
        console.log("🎯 [Customization] Using fetched data:", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propsData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>No data available</div>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-br from-blue-50 to-white min-h-screen text-slate-800">
      {/* Hero Section */}
      <section className="w-full min-h-screen bg-gradient-to-br from-[#191970] via-black to-blue-700 py-24 md:py-32 text-center flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-2xl">
            {pageData.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
            {pageData.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">
            {pageData.services.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageData.services.items.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">
                  {typeof service.icon === 'string'
                    ? service.icon
                    : service.icon?.icon || service.icon?.emoji || '⚙️'}
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">
                  {typeof service.title === 'string'
                    ? service.title
                    : service.title?.title || service.title?.name || 'Service Title'}
                </h3>
                <p className="text-gray-600">
                  {typeof service.description === 'string'
                    ? service.description
                    : service.description?.description || service.description?.desc || 'Service Description'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">
            {pageData.process.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {pageData.process.steps.map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">
                  {typeof process.title === 'string'
                    ? process.title
                    : process.title?.title || process.title?.name || 'Process Title'}
                </h3>
                <p className="text-gray-600">
                  {typeof process.description === 'string'
                    ? process.description
                    : process.description?.description || process.description?.desc || 'Process Description'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {pageData.cta.title}
          </h2>
          <p className="text-lg md:text-xl mb-8">
            {typeof pageData.cta.subtitle === 'string'
              ? pageData.cta.subtitle
              : pageData.cta.subtitle?.subtitle || pageData.cta.subtitle?.title || 'CTA Subtitle'}
          </p>
          <button className="bg-white text-blue-800 font-bold px-8 py-4 rounded-xl shadow-lg text-lg transition-all duration-300 hover:scale-105">
            {pageData.cta.buttonText}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Customization;
