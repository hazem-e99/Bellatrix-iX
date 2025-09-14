import React from 'react';
import ImplementationStepper from './ImplementationStepper';

const ImplementationSection = ({ data }) => {
  return (
    <section className="py-20 bg-white light-section">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Retail Implementation Built for All Industries
          </h2>
          <p className="text-xl text-gray-600">
            Streamline your entire NetSuite implementation lifecycle — from discovery to 
            go-live — with a proven, secure methodology.
          </p>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Implementation Process
        </h3>
        {/* Implementation Process Stepper component */}
        <ImplementationStepper steps={data.implementationProcess.steps} />
      </div>
    </section>
  );
};

export default ImplementationSection;