import React from 'react';

const PayrollHowItWorks = () => (
  <section className="py-20 relative overflow-hidden animate-background-glow" style={{
    backgroundColor: '#001038',
    animation: 'background-glow 12s ease-in-out infinite'
  }}>
    {/* Decorative Background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10"></div>
    </div>
    <div className="container mx-auto px-6 max-w-6xl relative z-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white text-center">
        How Our Payroll System Works
      </h2>
      <div className="bg-gradient-to-br from-gray-800/90 via-gray-700/80 to-gray-800/90 rounded-xl p-12 shadow-2xl max-w-6xl mx-auto border border-gray-600/50 backdrop-blur-sm hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
        {/* Creative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full opacity-20 transform translate-x-16 -translate-y-16 group-hover:opacity-40 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 rounded-full opacity-20 transform -translate-x-10 translate-y-10 group-hover:opacity-40 transition-opacity duration-500"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full opacity-15 transform -translate-x-8 -translate-y-8 group-hover:opacity-30 transition-opacity duration-500"></div>
        {/* Floating Tech Elements */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse shadow-lg"></div>
            <div className="absolute inset-0 w-3 h-3 bg-blue-400/30 rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="relative">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full animate-pulse shadow-md"></div>
            <div className="absolute -inset-1 w-4 h-4 bg-cyan-400/20 rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="absolute top-1/4 right-1/4">
          <div className="w-1.5 h-1.5 bg-white/70 rounded-full animate-pulse opacity-60"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/3">
          <div className="w-1 h-1 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full animate-pulse opacity-50"></div>
        </div>
        {/* Data visualization lines */}
        <div className="absolute top-6 left-1/4 w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-300/40 to-transparent"></div>
        <div className="absolute bottom-6 right-1/4 w-20 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"></div>
        <div className="relative z-10">
          <p className="text-xl text-gray-300 leading-relaxed">
            Our payroll process is simple: upload employee and contract
            details, sync timesheets and leave data, let the system run
            payroll automatically on schedule, approve via role-based access,
            execute payments through integrated bank APIs, and download
            payslips & compliance-ready reports—all in one platform.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default PayrollHowItWorks; 