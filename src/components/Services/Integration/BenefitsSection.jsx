import React from "react";
import SEO from "../../SEO";

const BenefitsSection = ({ title, items }) => {
  // Debug logging for received props
  console.log("🔗 [INTEGRATION BENEFITS COMPONENT] Received props:", {
    title,
    items,
    itemsType: typeof items,
    itemsLength: items?.length,
    firstItem: items?.[0],
    firstItemTitle: items?.[0]?.title,
  });

  // Default data from JSON file
  const defaultData = {
    title: "Integration Benefits",
    items: [
      {
        title: "Automated Data Sync",
        description:
          "Eliminate manual data entry with real-time synchronization",
      },
      {
        title: "Improved Accuracy",
        description: "Reduce errors caused by manual data transfer",
      },
      {
        title: "Enhanced Productivity",
        description: "Save time and resources with automated processes",
      },
      {
        title: "Better Visibility",
        description: "Get a complete view of your business across all systems",
      },
      {
        title: "Scalable Solutions",
        description: "Integrations that grow with your business needs",
      },
      {
        title: "Cost Savings",
        description: "Reduce operational costs through automation",
      },
    ],
  };

  // Use props if provided, otherwise use default data
  const displayData = {
    title: title || defaultData.title,
    items: items && items.length > 0 ? items : defaultData.items,
  };

  console.log("🔗 [INTEGRATION BENEFITS COMPONENT] Final display data:", {
    title: displayData.title,
    itemsCount: displayData.items.length,
    items: displayData.items,
    firstItemTitle: displayData.items[0]?.title,
    usingProps: items && items.length > 0,
  });

  return (
    <>
      <SEO
        title="Oracle NetSuite Integration Benefits | ERP System Advantages & ROI"
        description="Discover the key benefits of Oracle NetSuite integration including automated data sync, improved accuracy, enhanced productivity, better visibility, scalable solutions, and significant cost savings."
        keywords="NetSuite integration benefits, Oracle ERP advantages, automated data sync, business productivity, ERP ROI, NetSuite consulting benefits, integration cost savings"
        ogTitle="NetSuite Integration Benefits - Oracle ERP System Advantages"
        ogDescription="Maximize your business potential with Oracle NetSuite integration benefits. Automated processes, improved accuracy, enhanced productivity, and measurable ROI for your enterprise."
        ogImage="/images/netsuite-integration-benefits.jpg"
      />
      <section className="max-w-6xl mx-auto px-4">
        <header>
          <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">
            {displayData.title}
          </h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayData.items.map((benefit, index) => {
            console.log(`🔗 [INTEGRATION BENEFITS RENDER] Benefit ${index}:`, {
              title: benefit.title,
              description: benefit.description,
              hasTitle: !!benefit.title,
              hasDescription: !!benefit.description,
            });

            return (
              <article key={index} className="flex items-start space-x-4">
                <div
                  className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1"
                  role="img"
                  aria-label="Checkmark"
                >
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default BenefitsSection;
