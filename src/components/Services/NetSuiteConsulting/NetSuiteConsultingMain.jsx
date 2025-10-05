import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../SEO";
import ContactForm from "../../ContactForm";
import Modal from "../../Modal";
import HeroSection from "./HeroSection";
import ConsultingServices from "./ConsultingServices";
import IndustryExpertise from "./IndustryExpertise";
import ConsultingProcess from "./ConsultingProcess";
import BenefitsSection from "./BenefitsSection";
import CtaSection from "./CtaSection";

const NetSuiteConsultingMain = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./data/netSuiteConsulting.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const handleIndustryClick = (link) => {
    navigate(link);
  };

  // Auto-rotate services showcase
  useEffect(() => {
    if (!data?.services?.items) return;

    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % data.services.items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        No data available
      </div>
    );

  return (
    <>
      <SEO 
        title="Oracle NetSuite Consulting Services | Expert ERP Implementation & Optimization"
        description="Professional Oracle NetSuite consulting services including implementation, customization, integration, and optimization. Expert ERP consultants for business transformation and growth."
        keywords="Oracle NetSuite consulting, NetSuite implementation, ERP consulting services, NetSuite customization, Oracle ERP consultants, business process optimization, NetSuite integration"
        ogTitle="Oracle NetSuite Consulting Services - Expert ERP Implementation"
        ogDescription="Transform your business with professional Oracle NetSuite consulting services. Expert implementation, customization, and optimization for enhanced operational efficiency."
        ogImage="/images/netsuite-consulting-services.jpg"
      />
      <main className="min-h-screen bg-gray-50">
        <HeroSection 
          title={data.hero.title}
          description={data.hero.description}
          ctaText={data.hero.ctaText}
          ctaIcon={data.hero.ctaIcon}
        />
      <section data-theme="light" >
        <ConsultingServices
          title={data.services.title}
          description={data.services.description}
          items={data.services.items}
          image={data.services.image}
          activeService={activeService}
          setActiveService={setActiveService}
        />
      </section>

      <section data-theme="dark" className="py-20 relative overflow-hidden" style={{ backgroundColor: "#001038" }}>
        <IndustryExpertise
          title={data.industries.title}
          description={data.industries.description}
          items={data.industries.items}
          handleIndustryClick={handleIndustryClick}
        />
      </section>

      <section data-theme="light" className="bg-gray-50 py-20">
        <ConsultingProcess
          title={data.process.title}
          description={data.process.description}
          image={data.process.image}
          steps={data.process.steps}
          openContactModal={openContactModal}
        />
      </section>

      <section data-theme="dark" className="py-20 relative overflow-hidden" style={{ backgroundColor: "#001038" }}>
        <BenefitsSection
          title={data.benefits.title}
          description={data.benefits.description}
          items={data.benefits.items}
        />
      </section>

      <section data-theme="light" className="bg-gray-50 py-20">
        <CtaSection
          title={data.cta.title}
          description={data.cta.description}
          features={data.cta.features}
          buttonText={data.cta.buttonText}
          openContactModal={openContactModal}
        />
      </section>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        title="Schedule Your Consultation"
        subtitle="Let's discuss your NetSuite consulting needs"
      >
        <ContactForm />
      </Modal>
      </main>
    </>
  );
};

export default NetSuiteConsultingMain;