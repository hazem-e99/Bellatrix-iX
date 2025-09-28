import React, { useState, useEffect } from 'react';

const PopularIntegrations = ({ title, platforms }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/integration-data.json');
        const jsonData = await response.json();
        setDefaultData(jsonData.popularIntegrations);
      } catch (error) {
        console.error('Failed to load Integration data:', error);
        // Fallback data
        setDefaultData({
          title: "Popular Integrations",
          platforms: []
        });
      }
    };
    fetchData();
  }, []);

  // Use props if provided, otherwise fall back to default data with proper mapping
  const displayData = {
    title: title || defaultData?.title || "Popular Integrations",
    platforms: (platforms && platforms.length > 0) ? platforms : 
               (defaultData?.platforms && defaultData.platforms.length > 0) ? defaultData.platforms : 
               [
                 "Shopify", "Magento", "Salesforce", "HubSpot", "PayPal", "Stripe",
                 "Amazon", "eBay", "QuickBooks", "Xero", "Slack", "Microsoft Office"
               ]
  };
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">{displayData.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {displayData.platforms.map((platform, index) => (
          <div key={index} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold text-blue-800">{platform}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularIntegrations;