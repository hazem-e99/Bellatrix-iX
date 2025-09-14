import React from 'react';

const PayrollPainPoints = ({ painPoints }) => (
  <section className="bg-gray-50 py-20 light-section">
    <div className="container mx-auto px-6 max-w-6xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 text-center">
        The Payroll <span className="text-blue-600">Struggles</span> We Eliminate
      </h2>
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <strong className="text-xl text-gray-800 block mb-6">
            Our system addresses the most common payroll challenges faced
            by consultancy firms:
          </strong>
          <ul className="space-y-5">
            {painPoints.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-lg text-gray-700">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative group max-w-lg">
            {/* Advanced Background Effects */}
            <div className="absolute -inset-8 opacity-30 group-hover:opacity-60 transition-all duration-700">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-3xl blur-2xl"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/15 via-purple-500/20 to-cyan-500/15 rounded-2xl blur-xl"></div>
              <div className="absolute -inset-2 bg-gradient-to-tr from-white/10 via-blue-300/20 to-white/10 rounded-xl blur-lg"></div>
            </div>
            <div className="relative bg-gradient-to-br from-gray-900/10 via-blue-900/5 to-gray-900/10 rounded-3xl p-6 backdrop-blur-md border border-white/30 shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500">
              <div className="relative bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 rounded-2xl p-4 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Payroll Implementation illustration showing digital payroll process"
                  className="w-full h-auto rounded-xl shadow-2xl brightness-105 contrast-110 saturate-105 group-hover:brightness-110 group-hover:contrast-115 group-hover:saturate-110 transition-all duration-500 filter drop-shadow-xl"
                />
                <div className="absolute inset-4 rounded-xl bg-gradient-to-tr from-blue-500/5 via-transparent via-transparent to-cyan-400/5 pointer-events-none"></div>
                <div className="absolute inset-4 rounded-xl bg-gradient-to-bl from-transparent via-white/3 to-transparent pointer-events-none"></div>
              </div>
              <div className="absolute top-3 right-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse shadow-lg"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-blue-400/30 rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="absolute bottom-6 left-6">
                <div className="relative">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full animate-pulse shadow-md"></div>
                  <div className="absolute -inset-1 w-5 h-5 bg-cyan-400/20 rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="absolute top-1/2 right-6">
                <div className="relative">
                  <div className="w-2 h-2 bg-white/90 rounded-full animate-pulse shadow-sm"></div>
                  <div className="absolute -inset-1 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="absolute top-1/4 left-8">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full animate-pulse opacity-70"></div>
              </div>
              <div className="absolute bottom-1/3 right-12">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-white to-blue-200 rounded-full animate-pulse opacity-80"></div>
              </div>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400/40 rounded-tl-3xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400/40 rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40 rounded-br-3xl"></div>
              <div className="absolute top-4 left-1/4 w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
              <div className="absolute bottom-8 right-1/4 w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"></div>
              <div className="absolute top-1/3 right-2 w-0.5 h-8 bg-gradient-to-b from-transparent via-blue-300/50 to-transparent"></div>
            </div>
            <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-bold opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Problem Solved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PayrollPainPoints; 