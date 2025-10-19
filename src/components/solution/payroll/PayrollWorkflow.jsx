import React from "react";
import SEO from "../../SEO";
import PayrollStepper from "./PayrollStepper";

const PayrollWorkflow = ({ workflowData = {} }) => {
  // اعتمد فقط على البيانات القادمة من props
  const displayData = {
    title: workflowData?.title || "Payroll System Workflow",
    description: workflowData?.description || "Streamline your entire payroll lifecycle with our comprehensive workflow solution.",
    steps: workflowData?.steps || [],
  };

  // Debug logging for real-time updates
  console.log("🎯 [PayrollWorkflow] Component received data:", {
    hasPropsData: !!(workflowData && Object.keys(workflowData).length > 0),
    propsData: workflowData,
    finalData: displayData,
    timestamp: new Date().toISOString(),
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
      
      <section className="py-20 bg-white light-section">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              {displayData.title}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {displayData.description}
            </p>
          </div>
          
          <PayrollStepper 
            steps={displayData.steps}
            title={displayData.title}
            description={displayData.description}
          />
        </div>
      </section>
    </>
  );
};

export default PayrollWorkflow;