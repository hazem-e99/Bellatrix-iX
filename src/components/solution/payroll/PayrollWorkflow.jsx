import React, { useState, useEffect } from 'react';
import PayrollStepper from './PayrollStepper';

const PayrollWorkflow = ({ workflowData = {} }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/payroll.json');
        const data = await response.json();
        setDefaultData(data.coreWorkflow);
      } catch (error) {
        console.error('Failed to load payroll data:', error);
        setDefaultData({
          title: "Payroll System Built for All Industries",
          description: "Streamline your entire payroll lifecycle — from onboarding to salary disbursement — with a secure, intuitive platform.",
          steps: []
        });
      }
    };
    fetchData();
  }, []);

  // Use provided data or default data
  const displayData = {
    title: workflowData?.title || defaultData?.title || "Workflow",
    description: workflowData?.description || defaultData?.description || "Workflow description",
    steps: workflowData?.steps || defaultData?.steps || []
  };

  return (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          {displayData.title}
        </h2>
        <p className="text-xl text-gray-600">
          {displayData.description}
        </p>
      </div>
      <PayrollStepper steps={displayData.steps} />
    </div>
  </section>
  );
};

export default PayrollWorkflow;