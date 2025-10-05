import React from "react";
import SEO from "../SEO";
import SupportSecondSec from "./SupportSecondSec";
import SherpaCareServices from "./SherpaCareServices";
import WhatWeOfferSection from "./WhatWeOfferSection";
import DedicatedTeamSection from "./DedicatedTeamSection";
import PrePackagedSection from "./PrePackagedSection";
import BellatrixSupportSection from "./BellatrixSupportSection";
import PayPerUseSection from "./PayPerUseSection";
import CustomerSupport from "./CustomerSupport";
import WhyChoeseBellatrix from "./WhyChoeseBellatrix";
import BellatrixSupportHero from "./BellatrixSupportHero";

const Support = () => {
  return (
    <>
      <SEO
        title="Bellatrix Support Services | Oracle NetSuite ERP Support & Consulting"
        description="Comprehensive Bellatrix support services with 85+ certified professionals. Get expert Oracle NetSuite ERP support, 24/7 assistance, and flexible pricing solutions."
        keywords="Bellatrix support, Oracle NetSuite support, ERP consulting, certified professionals, 24/7 support, flexible pricing, implementation support, customization"
        ogTitle="Bellatrix Support Services | Oracle NetSuite ERP Support & Consulting"
        ogDescription="Professional Bellatrix support with certified experts, flexible pricing, and comprehensive ERP solutions for your business success."
        ogImage="/images/Support/bellatrix-support-main.jpg"
      />
      <main>
        <BellatrixSupportHero />
        <SupportSecondSec />
        <SherpaCareServices />
        <WhatWeOfferSection />
        <DedicatedTeamSection />
        <PrePackagedSection />
        <BellatrixSupportSection />
        <PayPerUseSection />
        <CustomerSupport />
        <WhyChoeseBellatrix />
      </main>
    </>
  );
};

export default Support;
