import React from 'react';
import ImplementationStepper from './ImplementationStepper';
import { useComponentData } from '../../../utils/useComponentData';
import manufacturingData from '../../../../public/data/manufacturing-data.json';

const ImplementationProcess = ({ data }) => {
  // Merge props with default data from JSON
  const finalData = useComponentData('implementationProcess', data, manufacturingData);

  console.log('🏭 [ImplementationProcess] Data merge:', {
    props: data,
    defaultData: manufacturingData.implementationProcess,
    finalData: finalData,
    stepsCount: finalData.steps?.length
  });

  return (
    <div className="py-20 bg-white light-section">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Manufacturing Implementation Built for All Industries
          </h2>
          <p className="text-xl text-gray-600">
            Streamline your entire NetSuite implementation lifecycle — from discovery to 
            go-live — with a proven, secure methodology.
          </p>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Implementation Process
        </h3>
        <ImplementationStepper implementationProcess={finalData.steps} />
      </div>
    </div>
  );
};

export default ImplementationProcess;