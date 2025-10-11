import React, { useState, useEffect } from "react";
import SEO from "../../SEO";
import ContactForm from "../../ContactForm";
import Modal from "../../Modal";
import HeroSection from "./HeroSection";
import IndustryStats from "./IndustryStats";
import ChallengesSection from "./ChallengesSection";
import SolutionsSection from "./SolutionsSection";
import FeaturesSection from "./FeaturesSection";
import CaseStudiesSection from "./CaseStudiesSection";
import ImplementationSection from "./ImplementationSection";
import CTASection from "./CTASection";

const Retail = ({ data: propsData = null }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [activeSolution, setActiveSolution] = useState(0);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  // PRIORITIZE props data over fetched data for real-time preview
  useEffect(() => {
    if (propsData) {
      setPageData(propsData);
      setLoading(false);
      console.log("🎯 [Retail] Using props data:", propsData);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch("/data/retail-data.json");
        const data = await response.json();
        setPageData(data);
        setLoading(false);
        console.log("🎯 [Retail] Using fetched data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [propsData]);

  // Auto-rotate challenges and solutions
  useEffect(() => {
    if (!pageData) return;

    const challengeInterval = setInterval(() => {
      setActiveChallenge(
        (prev) => (prev + 1) % pageData.retailChallenges.length
      );
    }, 4000);

    const solutionInterval = setInterval(() => {
      setActiveSolution(
        (prev) => (prev + 1) % pageData.netSuiteSolutions.length
      );
    }, 5000);

    return () => {
      clearInterval(challengeInterval);
      clearInterval(solutionInterval);
    };
  }, [pageData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4 theme-spinner"
            style={{
              borderColor: "var(--color-brand-accent)",
              borderTopColor: "transparent",
              transition: "border-color 0.6s ease",
            }}
          ></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">
            Error loading content. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <SEO
        title="Oracle NetSuite Retail Solutions | Complete E-commerce & Retail Management"
        description="Transform your retail operations with Oracle NetSuite retail solutions. Comprehensive e-commerce, inventory management, and omnichannel retail platform for modern retailers."
        keywords="Oracle NetSuite retail, NetSuite e-commerce, retail management software, omnichannel retail, NetSuite retail solutions, e-commerce ERP, retail POS system"
        ogTitle="Oracle NetSuite Retail Solutions | Complete E-commerce & Retail Management"
        ogDescription="Complete Oracle NetSuite retail platform for e-commerce, inventory management, and omnichannel retail operations."
        ogImage="/images/retail-solutions.jpg"
        canonicalUrl="https://bellatrix.com/industries/retail"
      />

      <HeroSection data={pageData.hero} openContactModal={openContactModal} />

      <section className="light-section" data-theme="light">
        <IndustryStats data={pageData.industryStats} />
      </section>

      <section className="dark-section" data-theme="dark">
        <ChallengesSection
          data={pageData}
          activeChallenge={activeChallenge}
          setActiveChallenge={setActiveChallenge}
        />
      </section>

      <section className="light-section" data-theme="light">
        <SolutionsSection
          data={pageData}
          activeSolution={activeSolution}
          setActiveSolution={setActiveSolution}
        />
      </section>

      <section className="dark-section" data-theme="dark">
        <FeaturesSection data={pageData} />
      </section>

      <section className="light-section" data-theme="dark">
        <CaseStudiesSection data={pageData} />
      </section>

      <section className="dark-section" data-theme="light">
        <ImplementationSection data={pageData} />
      </section>

      <section className="cta-section" data-theme="light">
        <CTASection
          data={pageData.ctaSection}
          openContactModal={openContactModal}
        />
      </section>

      {/* Contact Modal */}
      <Modal isOpen={isContactModalOpen} onClose={closeContactModal}>
        <ContactForm onSuccess={closeContactModal} />
      </Modal>
    </main>
  );
};

export default Retail;
