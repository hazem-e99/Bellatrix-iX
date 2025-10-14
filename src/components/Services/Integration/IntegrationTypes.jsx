import React from "react";
import SEO from "../../SEO";
import { integrationData } from "../../../data/integrationData";
import { mergeStringData, mergeArrayData } from "../../../utils/dataMerger";

const IntegrationTypes = ({ title, items, types }) => {
  // Debug logging for received props
  console.log("🔗 [INTEGRATION TYPES COMPONENT] Received props:", {
    title,
    items,
    types,
    itemsType: typeof items,
    itemsLength: items?.length,
    typesType: typeof types,
    typesLength: types?.length,
  });

  // Handle types array conversion if provided
  const convertedTypes =
    types && Array.isArray(types) && types.length > 0
      ? types.map((type) => ({
          title: type,
          description: `Integration with ${type}`,
          icon: "🔌",
        }))
      : [];

  // Use props data first, then fallback to integrationData, then to hardcoded fallback
  const displayData = {
    title:
      title ||
      integrationData.integrationTypes?.title ||
      "Integration Solutions",
    items: items ||
      convertedTypes ||
      integrationData.integrationTypes?.items || [
        {
          title: "E-commerce Integration",
          description:
            "Connect NetSuite with Shopify, Magento, WooCommerce, and other platforms",
          icon: "🛒",
        },
        {
          title: "CRM Integration",
          description:
            "Integrate with Salesforce, HubSpot, and other CRM systems",
          icon: "👥",
        },
        {
          title: "Payment Gateway Integration",
          description:
            "Connect with PayPal, Stripe, Square, and other payment processors",
          icon: "💳",
        },
        {
          title: "Warehouse Management",
          description: "Integrate with WMS systems for inventory management",
          icon: "📦",
        },
        {
          title: "Banking & Financial",
          description:
            "Connect with banks and financial institutions for automated transactions",
          icon: "🏦",
        },
        {
          title: "Custom API Integration",
          description: "Build custom integrations with any third-party system",
          icon: "🔌",
        },
      ],
  };

  console.log("🔗 [INTEGRATION TYPES COMPONENT] Final display data:", {
    title: displayData.title,
    itemsCount: displayData.items.length,
    items: displayData.items,
    firstItemTitle: displayData.items[0]?.title,
    firstItemHasTitle: !!displayData.items[0]?.title,
  });

  return (
    <>
      <SEO
        title="Oracle NetSuite Integration Solutions | ERP System Connectivity Types"
        description="Comprehensive Oracle NetSuite integration solutions including e-commerce, CRM, payment gateway, and custom API integrations for enhanced business operations and data synchronization."
        keywords="Oracle NetSuite integration types, ERP integration solutions, e-commerce integration, CRM connectivity, NetSuite API integration, Oracle consulting services"
        ogTitle="NetSuite Integration Solutions - Oracle ERP Connectivity Services"
        ogDescription="Expert Oracle NetSuite integration solutions for e-commerce, CRM, payment systems, and custom applications. Professional ERP consulting for seamless business operations."
        ogImage="/images/netsuite-integration-types.jpg"
      />
      <section className="max-w-6xl mx-auto px-4">
        <header>
          <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">
            {displayData.title}
          </h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayData.items.map((integration, index) => {
            console.log(`🔗 [INTEGRATION TYPES RENDER] Item ${index}:`, {
              title: integration.title,
              description: integration.description,
              icon: integration.icon,
              hasTitle: !!integration.title,
            });

            return (
              <article
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="text-4xl mb-4"
                  role="img"
                  aria-label={`${typeof integration.title === 'string' ? integration.title : integration.title?.title || integration.title?.name || 'Integration'} icon`}
                >
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
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default IntegrationTypes;
