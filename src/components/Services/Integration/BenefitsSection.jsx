import React from 'react';

const BenefitsSection = ({ title, items }) => {
  // Debug logging for received props
  console.log('🔗 [INTEGRATION BENEFITS COMPONENT] Received props:', {
    title,
    items,
    itemsType: typeof items,
    itemsLength: items?.length,
    firstItem: items?.[0],
    firstItemTitle: items?.[0]?.title
  });

  // Default data from JSON file
  const defaultData = {
    title: "Integration Benefits",
    items: [
      {
        title: "Automated Data Sync",
        description: "Eliminate manual data entry with real-time synchronization"
      },
      {
        title: "Improved Accuracy",
        description: "Reduce errors caused by manual data transfer"
      },
      {
        title: "Enhanced Productivity",
        description: "Save time and resources with automated processes"
      },
      {
        title: "Better Visibility",
        description: "Get a complete view of your business across all systems"
      },
      {
        title: "Scalable Solutions",
        description: "Integrations that grow with your business needs"
      },
      {
        title: "Cost Savings",
        description: "Reduce operational costs through automation"
      }
    ]
  };

  // Use props if provided, otherwise use default data
  const displayData = {
    title: title || defaultData.title,
    items: items && items.length > 0 ? items : defaultData.items
  };

  console.log('🔗 [INTEGRATION BENEFITS COMPONENT] Final display data:', {
    title: displayData.title,
    itemsCount: displayData.items.length,
    items: displayData.items,
    firstItemTitle: displayData.items[0]?.title,
    usingProps: items && items.length > 0
  });

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">{displayData.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayData.items.map((benefit, index) => {
          console.log(`🔗 [INTEGRATION BENEFITS RENDER] Benefit ${index}:`, {
            title: benefit.title,
            description: benefit.description,
            hasTitle: !!benefit.title,
            hasDescription: !!benefit.description
          });
          
          return (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BenefitsSection;