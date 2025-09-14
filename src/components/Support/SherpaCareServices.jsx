import React from "react";

const SherpaCareServices = () => {
  return (
    <section className="w-full py-16 relative overflow-hidden animate-background-glow" style={{
      backgroundColor: '#001038',
      animation: 'background-glow 12s ease-in-out infinite'
    }}>
      {/* Ultra Creative Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-500/15 via-purple-500/20 to-cyan-500/15 rounded-2xl blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-tr from-white/10 via-blue-300/20 to-white/10 rounded-xl blur-lg"></div>
        <div className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-full blur-lg"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-br from-gray-800/90 via-gray-700/80 to-gray-800/90 rounded-3xl shadow-2xl hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-500 p-8 md:p-12 border border-gray-600/50 backdrop-blur-sm relative overflow-hidden group">
          {/* Creative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full opacity-20 transform translate-x-16 -translate-y-16 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-500/30 to-blue-500/30 rounded-full opacity-20 transform -translate-x-10 translate-y-10 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full opacity-15 transform -translate-x-8 -translate-y-8 group-hover:opacity-30 transition-opacity duration-500"></div>
          
          {/* Title */}
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-6">
              No matter what kind of assistance you are looking for, our team can help you.
            </h2>
            <p className="text-lg text-gray-300 text-center mb-10 max-w-2xl mx-auto leading-relaxed">
              Here are some of the ways Bellatrix helped other organizations:
            </p>

            {/* Service Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1 */}
              <div className="bg-gradient-to-br from-gray-700/90 via-gray-600/80 to-gray-700/90 rounded-xl shadow-lg p-6 border border-gray-500/50 hover:bg-gradient-to-br hover:from-gray-600/90 hover:via-gray-500/80 hover:to-gray-600/90 hover:border-blue-500/30 transition-all duration-300 group/card">
                <ul className="list-disc list-inside space-y-3 text-gray-200 text-base">
                  <li className="hover:text-blue-300 transition-colors duration-300">Ad hoc assistance</li>
                  <li className="hover:text-blue-300 transition-colors duration-300">Solution design</li>
                  <li className="hover:text-blue-300 transition-colors duration-300">Updates assistance</li>
                  <li className="hover:text-blue-300 transition-colors duration-300">Integrating Bellatrix with different tools</li>
                  <li className="hover:text-blue-300 transition-colors duration-300">Implementing eCommerce applications</li>
                </ul>
              </div>
              
              {/* Column 2 */}
              <div className="bg-gradient-to-br from-gray-700/90 via-gray-600/80 to-gray-700/90 rounded-xl shadow-lg p-6 border border-gray-500/50 hover:bg-gradient-to-br hover:from-gray-600/90 hover:via-gray-500/80 hover:to-gray-600/90 hover:border-blue-500/30 transition-all duration-300 group/card">
                <ul className="list-disc list-inside space-y-3 text-gray-200 text-base">
                  <li className="hover:text-blue-300 transition-colors duration-300">Creating workflows &amp; process mapping</li>
                  <li className="hover:text-blue-300 transition-colors duration-300">Developing custom KPI</li>
                  <li className="hover:text-blue-300 transition-colors duration-300">Writing custom scripts</li>
                  <li className="hover:text-blue-300 transition-colors duration-300">Designing portals and their modification</li>
                  <li className="hover:text-blue-300 transition-colors duration-300">Bellatrix Advanced Modules Implementation</li>
                </ul>
              </div>
              
              {/* Column 3 */}
              <div className="bg-gradient-to-br from-gray-700/90 via-gray-600/80 to-gray-700/90 rounded-xl shadow-lg p-6 border border-gray-500/50 hover:bg-gradient-to-br hover:from-gray-600/90 hover:via-gray-500/80 hover:to-gray-600/90 hover:border-blue-500/30 transition-all duration-300 group/card">
                <ul className="list-disc list-inside space-y-3 text-gray-200 text-base">
                  <li className="hover:text-blue-300 transition-colors duration-300">Customizing Bellatrix dashboards</li>
                  <li className="hover:text-blue-300 transition-colors duration-300">Customizing business processes</li>
                  <li className="hover:text-blue-300 transition-colors duration-300">Building reports and visualizations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SherpaCareServices;
