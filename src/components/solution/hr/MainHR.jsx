import React, { useState, useEffect } from "react";
import SEO from "../../SEO";
import HeroSection from "./HeroSection";
import BenefitsSection from "./BenefitsSection";
import ModulesSection from "./ModulesSection";
import UseCasesSection from "./UseCasesSection";
import PricingSection from "./PricingSection";
import CTASection from "./CTASection";
import FAQSection from "./FAQSection";
import DemoModal from "./DemoModal";

const HRSolution = ({ data: propsData = null }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeBenefitIdx, setActiveBenefitIdx] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [demoIdx, setDemoIdx] = useState(0);
  const [imgFade, setImgFade] = useState(true);

  useEffect(() => {
    // PRIORITIZE props data over fetched data for real-time preview
    if (propsData) {
      setData(propsData);
      setLoading(false);
      console.log("🎯 [MainHR] Using props data:", propsData);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch("/data/hr.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
        console.log("🎯 [MainHR] Using fetched data:", jsonData);
      } catch (e) {
        setError(e.message);
        console.error("Error fetching data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propsData]);

  const handleDemoChange = (newIdx) => {
    setImgFade(false);
    setTimeout(() => {
      setDemoIdx(newIdx);
      setImgFade(true);
    }, 200);
  };

  const nextDemo = () =>
    handleDemoChange((demoIdx + 1) % (data?.demoImages?.length || 1));
  const prevDemo = () =>
    handleDemoChange(
      (demoIdx - 1 + (data?.demoImages?.length || 1)) %
        (data?.demoImages?.length || 1)
    );

  // Animation for Benefits Cards
  useEffect(() => {
    if (!data?.features?.items) return;

    const interval = setInterval(() => {
      setActiveBenefitIdx((prev) => (prev + 1) % data.features.items.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [data?.features?.items]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-blue-800 text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-red-600 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-red-600 text-xl">No data available</div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Oracle NetSuite HR Management Solutions | Bellatrix Consulting"
        description="Transform your HR operations with Oracle NetSuite's comprehensive HR management platform. Employee management, payroll automation, compliance, and analytics in one solution."
        keywords="Oracle NetSuite HR, HR management system, employee management software, NetSuite human resources, ERP HR solutions, payroll automation, HR compliance"
        ogTitle="Oracle NetSuite HR Management - Complete Human Resources Solutions"
        ogDescription="Streamline HR operations with Oracle NetSuite's integrated HR management platform. Employee lifecycle management, payroll, compliance, and analytics."
        ogImage="/images/netsuite-hr-management.jpg"
      />
      <main className="bg-gradient-to-br from-blue-50 to-white min-h-screen text-slate-800">
        {/* Hero Section - Dark Theme */}
        <section data-theme="dark">
          <HeroSection data={data} />
        </section>

        {/* Benefits Section - Light Theme */}
        <section data-theme="light">
          <BenefitsSection
            data={data}
            activeBenefitIdx={activeBenefitIdx}
            onShowDemo={() => setShowDemo(true)}
          />
        </section>

        {/* Modules Section - Dark Theme */}
        <section data-theme="dark">
          <ModulesSection data={data} />
        </section>

        {/* Use Cases Section - Light Theme */}
        <section data-theme="light">
          <UseCasesSection data={data} />
        </section>

        {/* Pricing Section - Dark Theme */}
        <section data-theme="dark">
          <PricingSection data={data} />
        </section>

        {/* CTA Section - Light Theme */}
        <section data-theme="light">
          <CTASection data={data} />
        </section>

        {/* FAQ Section - Light Theme */}
        <section data-theme="light">
          <FAQSection data={data} openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} />
        </section>

        {/* Demo Modal */}
        <DemoModal
          showDemo={showDemo}
          setShowDemo={setShowDemo}
          demoImages={data.demoImages}
          demoIdx={demoIdx}
          imgFade={imgFade}
          handleDemoChange={handleDemoChange}
          nextDemo={nextDemo}
          prevDemo={prevDemo}
        />
      </main>

      <style>{`
        @keyframes video-enhance {
          0%, 100% { 
            filter: brightness(0.7) contrast(1.2) saturate(1.3) hue-rotate(10deg);
            transform: scale(1.05);
          }
          50% { 
            filter: brightness(0.8) contrast(1.3) saturate(1.4) hue-rotate(15deg);
            transform: scale(1.08);
          }
        }
      `}</style>
    </>
  );
};

export default HRSolution;
