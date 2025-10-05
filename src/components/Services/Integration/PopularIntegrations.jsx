import React from "react";
import SEO from "../../SEO";
import { integrationData } from "../../../data/integrationData";
import { mergeStringData, mergeArrayData } from "../../../utils/dataMerger";

const PopularIntegrations = ({ title, platforms }) => {
  // Fallback data for when no data is available
  const fallbackData = {
    title: "Popular Integrations",
    platforms: [
      "Shopify",
      "Magento",
      "Salesforce",
      "HubSpot",
      "PayPal",
      "Stripe",
      "Amazon",
      "eBay",
      "QuickBooks",
      "Xero",
      "Slack",
      "Microsoft Office",
    ],
  };

  // Merge data with priority: props > defaultData > fallbackData
  const displayData = {
    title: mergeStringData(
      title,
      integrationData.popularIntegrations.title,
      fallbackData.title
    ),
    platforms: mergeArrayData(
      platforms,
      integrationData.popularIntegrations.platforms,
      fallbackData.platforms
    ),
  };

  return (
    <>
      <SEO
        title="Popular Oracle NetSuite Integrations | Leading Platform Connectivity"
        description="Explore the most popular Oracle NetSuite integrations including Shopify, Magento, Salesforce, HubSpot, PayPal, Stripe, Amazon, eBay, QuickBooks, and Microsoft Office for enhanced business operations."
        keywords="popular NetSuite integrations, Oracle NetSuite platforms, Shopify NetSuite integration, Salesforce NetSuite connectivity, e-commerce ERP integration, CRM NetSuite integration"
        ogTitle="Popular NetSuite Integrations - Oracle ERP Platform Connectivity"
        ogDescription="Connect Oracle NetSuite with leading business platforms including Shopify, Salesforce, PayPal, Amazon, and more. Professional integration services for seamless operations."
        ogImage="/images/popular-netsuite-integrations.jpg"
      />
      <section className="max-w-6xl mx-auto px-4">
        <header>
          <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">
            {displayData.title}
          </h2>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {displayData.platforms.map((platform, index) => (
            <article
              key={index}
              className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <h3
                className="text-2xl font-bold text-blue-800"
                title={`${platform} NetSuite Integration`}
              >
                {platform}
              </h3>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default PopularIntegrations;
