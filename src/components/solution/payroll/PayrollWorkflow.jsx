import React, { useState, useEffect } from "react";
import SEO from "../../SEO";
import PayrollStepper from "./PayrollStepper";

const PayrollWorkflow = ({ workflowData = {} }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/payroll.json");
        const data = await response.json();
        setDefaultData(data.coreWorkflow);
      } catch (error) {
        console.error("Failed to load payroll data:", error);
        setDefaultData({
          title: "Payroll System Built for All Industries",
          description:
            "Streamline your entire payroll lifecycle — from onboarding to salary disbursement — with a secure, intuitive platform.",
          steps: [],
        });
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const displayData = {
    title: workflowData?.title || defaultData?.title || "Workflow",
    description:
      workflowData?.description ||
      defaultData?.description ||
      "Workflow description",
    steps: workflowData?.steps || defaultData?.steps || [],
  };

  // Debug logging for real-time updates
  console.log("🎯 [PayrollWorkflow] Component received data:", {
    hasPropsData: !!(workflowData && Object.keys(workflowData).length > 0),
    propsData: workflowData,
    hasDefaultData: !!defaultData,
    finalData: displayData,
    timestamp: new Date().toISOString()
  });

  return (
    <>
      <SEO
        title={`Oracle NetSuite Payroll Workflow | ${
          displayData.title || "Complete Payroll System"
        }`}
        description={`${
          displayData.description ||
          "Comprehensive Oracle NetSuite payroll workflow"
        } - Step-by-step payroll processing, automation, and ERP integration for streamlined operations.`}
        keywords="Oracle NetSuite payroll workflow, payroll system lifecycle, automated payroll steps, ERP payroll integration, NetSuite payroll management"
        ogTitle={`NetSuite Payroll Workflow - ${
          displayData.title || "Complete Payroll System"
        }`}
        ogDescription={`${(
          displayData.description ||
          "Oracle NetSuite complete payroll workflow system"
        ).substring(0, 120)}... Professional ERP payroll lifecycle management.`}
        ogImage="/images/netsuite-payroll-workflow.jpg"
      />
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="container mx-auto px-6 max-w-6xl">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--color-text-primary)]">
              {displayData.title}
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)]">
              {displayData.description}
            </p>
          </header>
          <PayrollStepper steps={displayData.steps} />
        </div>
      </section>
    </>
  );
};

export default PayrollWorkflow;
