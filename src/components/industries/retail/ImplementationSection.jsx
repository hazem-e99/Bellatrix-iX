import React from "react";
import SEO from "../../SEO";
import ImplementationStepper from "./ImplementationStepper";

const ImplementationSection = ({ data }) => {
  // Ensure data is safe and provide fallback
  const safeData = data || {};
  const implementationProcess = safeData.implementationProcess || {};
  const steps = implementationProcess.steps || [];
  
  // Default steps if none provided
  const defaultSteps = [
    {
      title: "Discovery & Assessment",
      desc: "Analyze current retail processes and requirements",
      benefits: ["Current state assessment", "Gap analysis", "Requirements documentation"]
    },
    {
      title: "Solution Design",
      desc: "Design NetSuite configuration for retail workflows",
      benefits: ["System architecture", "Process flows", "Integration design"]
    },
    {
      title: "Implementation",
      desc: "Deploy and configure NetSuite for your business",
      benefits: ["System setup", "Data migration", "User training"]
    },
    {
      title: "Go-Live & Support",
      desc: "Launch and provide ongoing support",
      benefits: ["Go-live support", "User adoption", "Ongoing optimization"]
    }
  ];
  
  const finalSteps = steps.length > 0 ? steps : defaultSteps;

  return (
    <section className="py-20 bg-white light-section">
      <SEO
        title="Retail Implementation Process | Oracle NetSuite E-commerce Setup"
        description="Proven Oracle NetSuite retail implementation process from discovery to go-live. Secure methodology for e-commerce and retail ERP implementation success."
        keywords="NetSuite retail implementation, e-commerce implementation process, retail implementation methodology, NetSuite e-commerce setup, Oracle ERP retail implementation"
        ogTitle="Retail Implementation Process | Oracle NetSuite E-commerce Setup"
        ogDescription="Comprehensive Oracle NetSuite retail implementation process designed for e-commerce and retail industry success."
        ogImage="/images/retail-implementation.jpg"
      />

      <div className="container mx-auto px-6 max-w-6xl">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Retail Implementation Built for All Industries
          </h2>
          <p className="text-xl text-gray-600">
            Streamline your entire NetSuite implementation lifecycle — from
            discovery to go-live — with a proven, secure methodology.
          </p>
        </header>
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Implementation Process
        </h3>
        {/* Implementation Process Stepper component */}
        <ImplementationStepper steps={finalSteps} />
      </div>
    </section>
  );
};

export default ImplementationSection;
