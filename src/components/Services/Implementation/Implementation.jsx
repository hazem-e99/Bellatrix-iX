// components/Implementation/Implementation.jsx
import React, { useState } from "react";
import SEO from "../../SEO";
import HeroSection from "./HeroSection";
import ProcessSection from "./ProcessSection";
import WhyChooseSection from "./WhyChooseSection";
import PricingSection from "./PricingSection";
import CtaSection from "./CtaSection";
import ImplementationModal from "./ImplementationModal";
import { usePageData } from "../../../hooks/useJsonServerData.jsx";

const Implementation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data from JSON Server
  const { data, isLoading: loading } = usePageData("Implementation");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error loading data
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Oracle NetSuite ERP Implementation Services | Bellatrix Technology Consulting"
        description="Leading Oracle NetSuite ERP implementation consultancy with 18+ years expertise. Transform your business operations with our proven methodology, certified consultants, and comprehensive support services."
        keywords="Oracle NetSuite implementation, ERP consulting services, NetSuite certified consultants, business transformation, ERP deployment, Oracle technology solutions, CRM implementation, IT consulting, enterprise software"
        ogTitle="Oracle NetSuite ERP Implementation Services | Bellatrix Technology Consulting"
        ogDescription="Expert Oracle NetSuite ERP implementation with proven methodology and certified consultants. Transform your business operations with comprehensive technology solutions."
        ogImage="/Videos/implementation/implementProcess.jpg"
      />
      <main>
        {/* Hero Section - Special case (dark with video background) */}
        <HeroSection data={data.heroSection} openModal={openModal} />

        {/* Process Section - Light Theme */}
        <ProcessSection data={data.processSection} />

        {/* Why Choose Section - Dark Theme */}
        <WhyChooseSection data={data.whyChooseSection} />

        {/* Pricing Section - Light Theme */}
        <PricingSection data={data.pricingSection} />

        {/* CTA Section - Dark Theme */}
        <CtaSection data={data.ctaSection} openModal={openModal} />
      </main>

      {/* Modal */}
      <ImplementationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={data.modalContent}
      />
    </>
  );
};

export default Implementation;
