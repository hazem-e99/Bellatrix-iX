import React, { useState, useEffect } from 'react';

const PayrollStepper = ({ steps }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="w-full">
      {/* Desktop Stepper */}
      <div className="hidden md:flex mb-12 relative">
        <div className="flex justify-between items-center w-full relative">
          <div className="absolute top-7 left-7 right-7 h-2 bg-gray-200 rounded-full z-0"></div>
          <div
            className="absolute top-7 left-7 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full z-0 transition-all duration-500"
            style={{ width: `${7 + (current / (steps.length - 1)) * (100 - 14)}%` }}
          ></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="z-10 flex flex-col items-center relative">
              <button
                onClick={() => setCurrent(idx)}
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300 border-2 shadow-lg
                  ${idx <= current 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-500 border-gray-300'
                  }`}
              >
                {idx + 1}
              </button>
              <span className={`text-sm font-medium max-w-[120px] text-center absolute top-16
                ${idx <= current ? 'text-blue-700' : 'text-gray-500'}`}>
                {step.title.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Stepper */}
      <div className="flex md:hidden mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-3">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg border text-sm font-medium
                ${idx === current 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 border-gray-200'
                }`}
            >
              {step.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {steps[current].title}
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              {steps[current].description}
            </p>
            
            {steps[current].details && Array.isArray(steps[current].details) && steps[current].details.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-600 uppercase mb-3">Key Features</h4>
                <div className="space-y-2">
                  {steps[current].details.map((detail, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center text-blue-600 mb-2">
                    <span className="font-medium">Automated</span>
                  </div>
                  <p className="text-sm text-gray-600">Reduces manual work by 80%</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center text-green-600 mb-2">
                    <span className="font-medium">Compliant</span>
                  </div>
                  <p className="text-sm text-gray-600">Built-in regulatory compliance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollStepper;