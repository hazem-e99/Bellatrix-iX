import React from 'react';
import { integrationData } from '../../../data/integrationData';
import { mergeStringData, mergeArrayData } from '../../../utils/dataMerger';

const IntegrationTypes = ({ title, items, types }) => {
  // Fallback data for when no data is available
  const fallbackData = {
    title: "Integration Solutions",
    items: [
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

  // Handle types array conversion if provided
  const convertedTypes = types && Array.isArray(types) && types.length > 0 
    ? types.map(type => ({
        title: type,
        description: `Integration with ${type}`,
        icon: "🔌"
      }))
    : [];

  // Merge data with priority: props > defaultData > fallbackData
  const displayData = {
    title: mergeStringData(title, integrationData.integrationTypes.title, fallbackData.title),
    items: mergeArrayData(items, integrationData.integrationTypes.items, convertedTypes.length > 0 ? convertedTypes : fallbackData.items)
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