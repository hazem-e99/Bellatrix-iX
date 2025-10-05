import React from "react";
import SEO from "../../SEO";
import ImplementationStepper from "./ImplementationStepper";
import { useComponentData } from "../../../utils/useComponentData";
import manufacturingData from "../../../../public/data/manufacturing-data.json";

const ImplementationProcess = ({ data }) => {
  // Merge props with default data from JSON
  const finalData = useComponentData(
    "implementationProcess",
    data,
    manufacturingData
  );

  console.log("🏭 [ImplementationProcess] Data merge:", {
    props: data,
    defaultData: manufacturingData.implementationProcess,
    finalData: finalData,
    stepsCount: finalData.steps?.length,
  });

  return (
    <section className="py-20 bg-white light-section">
      <SEO
        title="Manufacturing Implementation Process | Oracle NetSuite ERP Methodology"
        description="Proven Oracle NetSuite manufacturing implementation process from discovery to go-live. Secure methodology for manufacturing ERP implementation success."
        keywords="NetSuite manufacturing implementation, ERP implementation process, manufacturing implementation methodology, NetSuite manufacturing setup, Oracle ERP implementation"
        ogTitle="Manufacturing Implementation Process | Oracle NetSuite ERP Methodology"
        ogDescription="Comprehensive Oracle NetSuite manufacturing implementation process designed for manufacturing industry success."
        ogImage="/images/manufacturing-implementation.jpg"
      />

      <div className="container mx-auto px-6 max-w-6xl">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Manufacturing Implementation Built for All Industries
          </h2>
          <p className="text-xl text-gray-600">
            Streamline your entire NetSuite implementation lifecycle — from
            discovery to go-live — with a proven, secure methodology.
          </p>
        </header>
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Implementation Process
        </h3>
        <ImplementationStepper implementationProcess={finalData.steps} />
      </div>
    </section>
  );
};

export default ImplementationProcess;
