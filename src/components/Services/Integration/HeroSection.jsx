import React from "react";
import SEO from "../../SEO";
import { integrationData } from "../../../data/integrationData";
import { mergeStringData } from "../../../utils/dataMerger";

const HeroSection = ({ title: propsTitle, subtitle: propsSubtitle, data }) => {
  // PRIORITIZE props data over default data for real-time preview
  const fallbackData = {
    title: "NetSuite Integration Services",
    subtitle: "Connect NetSuite with your existing systems for seamless data flow",
  };

  const displayData = {
    title: propsTitle || data?.title || integrationData.hero.title || fallbackData.title,
    subtitle: propsSubtitle || data?.subtitle || integrationData.hero.subtitle || fallbackData.subtitle,
  };

  // Debug logging for real-time updates
  console.log("🎯 [IntegrationHeroSection] Component received data:", {
    hasPropsTitle: !!propsTitle,
    propsTitle: propsTitle,
    hasPropsSubtitle: !!propsSubtitle,
    propsSubtitle: propsSubtitle,
    hasData: !!data,
    data: data,
    finalDisplayData: displayData,
    timestamp: new Date().toISOString()
  });

  return (
    <>
      <SEO
        title="NetSuite Integration Services Hero | Oracle ERP System Connectivity"
        description="Transform your business operations with expert NetSuite integration services. Connect Oracle ERP systems with CRM, e-commerce platforms, and third-party applications for streamlined workflows."
        keywords="NetSuite integration services, Oracle ERP connectivity, NetSuite consulting, ERP system integration, Oracle NetSuite hero, business transformation"
        ogTitle="NetSuite Integration Services - Oracle ERP Connectivity Solutions"
        ogDescription="Professional NetSuite integration services connecting Oracle ERP systems with your business applications for enhanced operational efficiency and data synchronization."
        ogImage="/images/netsuite-integration-hero.jpg"
      />
      <header className="w-full min-h-screen bg-gradient-to-br from-[#191970] via-black to-blue-700 py-24 md:py-32 text-center flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-2xl">
            {displayData.title}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
            {displayData.subtitle}
          </p>
        </div>
      </header>
    </>
  );
};

export default HeroSection;
