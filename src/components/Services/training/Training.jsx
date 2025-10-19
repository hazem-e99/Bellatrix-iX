// Training.jsx
import React, { useState, useEffect } from "react";
import SEO from "../../SEO";
import ContactForm from "../../ContactForm";
import Modal from "../../Modal";
import HeroSection from "./HeroSection";
import ProgramsSection from "./ProgramsSection";
import KeyModulesSection from "./KeyModulesSection";
import WhyChooseSection from "./WhyChooseSection";
import TrainingModals from "./TrainingModals";

const Training = ({ data: propsData = null }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // PRIORITIZE props data over fetched data for real-time preview
    if (propsData) {
      setData(propsData);
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch("data/training.json");
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchData();
  }, [propsData]);

  // Video protection handlers (same as original)
  useEffect(() => {
    // ... (same video protection code)
  }, []);

  // Removed unused openProgramModal

  // Removed unused closeProgramModal

  // Removed unused openContactModal

  // Removed unused closeContactModal

  // Removed unused openFeatureModal

  // Removed unused closeFeatureModal

  const renderIcon = (iconPath, className = "w-7 h-7 text-white") => {
    if (!iconPath || typeof iconPath !== "string") return null;
    const normalizedPath = iconPath.startsWith("M")
      ? iconPath.substring(1)
      : iconPath;
    const paths = normalizedPath.split(" M").filter(Boolean);

    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {paths.map((path, i) => (
          <path
            key={i}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={`M${path}`}
          />
        ))}
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        Error loading training data. Please try again later.
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Oracle NetSuite Training Services | Professional ERP Education & Certification Programs"
        description="Comprehensive Oracle NetSuite training programs including implementation, customization, and advanced ERP education. Expert-led courses for business transformation and skill development."
        keywords="Oracle NetSuite training, NetSuite education, ERP training programs, NetSuite certification, Oracle training courses, ERP skill development, NetSuite learning"
        ogTitle="Oracle NetSuite Training Services - Professional ERP Education Programs"
        ogDescription="Master Oracle NetSuite with comprehensive training programs. Expert-led education for implementation, customization, and advanced ERP management skills."
        ogImage="/images/netsuite-training-services.jpg"
      />
      <main className="custom-scrollbar" style={{ backgroundColor: "#001038" }}>
        {/* Hero Section */}
        <section data-theme="dark">
          <HeroSection
            heroContent={data.heroContent}
            backgroundVideo={data.backgroundVideo}
            ctaButton={data.ctaButton}
            renderIcon={renderIcon}
          />
        </section>

        {/* Programs Section */}
        <section data-theme="light">
          <ProgramsSection
            programsSection={data.programsSection}
            trainingPrograms={data.trainingPrograms}
            renderIcon={renderIcon}
          />
        </section>

        {/* Key Modules Section */}
        <section data-theme="dark">
          <KeyModulesSection
            keyModulesSection={data.keyModulesSection}
            keyModules={data.keyModules}
            renderIcon={renderIcon}
          />
        </section>

        {/* Why Choose Section */}
        <section data-theme="light">
          <WhyChooseSection
            whyChooseSection={data.whyChooseSection}
            trainingFeatures={data.trainingFeatures}
            renderIcon={renderIcon}
          />
        </section>
      </main>
    </>
  );
};

export default Training;
