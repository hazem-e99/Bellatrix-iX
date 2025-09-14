import React from 'react';

const PayrollHero = () => (
  <section className="py-24 lg:py-32 flex items-center justify-center relative min-h-screen">
    {/* Background Image */}
    <div className="absolute inset-0">
      <img 
        src="/images/payrollFinal.jpeg" 
        alt="Payroll Dashboard Interface"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.backgroundColor = '#1e40af';
        }}
      />
      {/* Simple Light Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
    <div className="container mx-auto px-6 max-w-7xl relative z-10">
      <div className="text-center">
        <div className="flex flex-col items-center justify-center space-y-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] text-white drop-shadow-lg text-center" style={{textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)'}}>
            <span className="block mb-2">Transform Your</span>
            <span className="block">Payroll Process</span>
          </h1>
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium drop-shadow-md text-center" style={{textShadow: '0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)'}}>
              Streamline operations with our intelligent, automated payroll system
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PayrollHero; 