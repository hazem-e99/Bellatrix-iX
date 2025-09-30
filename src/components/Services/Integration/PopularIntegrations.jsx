import React from 'react';
import { integrationData } from '../../../data/integrationData';
import { mergeStringData, mergeArrayData } from '../../../utils/dataMerger';

const PopularIntegrations = ({ title, platforms }) => {
  // Fallback data for when no data is available
  const fallbackData = {
    title: "Popular Integrations",
    platforms: [
      "Shopify", "Magento", "Salesforce", "HubSpot", "PayPal", "Stripe",
      "Amazon", "eBay", "QuickBooks", "Xero", "Slack", "Microsoft Office"
    ]
  };

  // Merge data with priority: props > defaultData > fallbackData
  const displayData = {
    title: mergeStringData(title, integrationData.popularIntegrations.title, fallbackData.title),
    platforms: mergeArrayData(platforms, integrationData.popularIntegrations.platforms, fallbackData.platforms)
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