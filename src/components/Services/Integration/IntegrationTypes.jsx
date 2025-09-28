import React, { useState, useEffect } from 'react';

const IntegrationTypes = ({ title, items, types }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/integration-data.json');
        const jsonData = await response.json();
        setDefaultData(jsonData.integrationTypes);
      } catch (error) {
        console.error('Failed to load Integration data:', error);
        // Fallback data
        setDefaultData({
          title: "Integration Solutions",
          items: []
        });
      }
    };
    fetchData();
  }, []);

  // Use props if provided, otherwise fall back to default data with proper mapping
  const displayData = {
    title: title || defaultData?.title || "Integration Solutions",
    items: (items && items.length > 0) ? items : 
           (types && types.length > 0) ? types.map(type => ({
             title: type,
             description: `Integration with ${type}`,
             icon: "🔌"
           })) : 
           (defaultData?.items && defaultData.items.length > 0) ? defaultData.items : 
           [
             {
               title: "E-commerce Integration",
               description: "Connect NetSuite with Shopify, Magento, WooCommerce, and other platforms",
               icon: "🛒"
             },
             {
               title: "CRM Integration",
               description: "Integrate with Salesforce, HubSpot, and other CRM systems",
               icon: "👥"
             },
             {
               title: "Payment Gateway Integration",
               description: "Connect with PayPal, Stripe, Square, and other payment processors",
               icon: "💳"
             },
             {
               title: "Warehouse Management",
               description: "Integrate with WMS systems for inventory management",
               icon: "📦"
             },
             {
               title: "Banking & Financial",
               description: "Connect with banks and financial institutions for automated transactions",
               icon: "🏦"
             },
             {
               title: "Custom API Integration",
               description: "Build custom integrations with any third-party system",
               icon: "🔌"
             }
           ]
  };
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">{displayData.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayData.items.map((integration, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4">{integration.icon}</div>
            <h3 className="text-xl font-bold text-blue-800 mb-3">{integration.title}</h3>
            <p className="text-gray-600">{integration.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationTypes;