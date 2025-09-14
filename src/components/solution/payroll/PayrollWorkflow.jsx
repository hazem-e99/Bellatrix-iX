import React from 'react';
import PayrollStepper from './PayrollStepper';

const PayrollWorkflow = ({ workflowData }) => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          {workflowData.title}
        </h2>
        <p className="text-xl text-gray-600">
          {workflowData.description}
        </p>
      </div>
      <PayrollStepper steps={workflowData.steps} />
    </div>
  </section>
);

export default PayrollWorkflow;