import React from 'react';

const PayrollPainPoints = ({ painPoints }) => (
  <section className="bg-gray-50 py-20 light-section">
    <div className="container mx-auto px-6 max-w-6xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 text-center">
        The Payroll <span className="text-blue-600">Challenges</span> We Solve
      </h2>
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <strong className="text-xl text-gray-800 block mb-6">
            Our system addresses the most common payroll challenges faced by businesses:
          </strong>
          <ul className="space-y-5">
            {painPoints?.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-lg text-gray-700">• {item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative group max-w-lg">
            {/* Background Effects */}
            <div className="absolute -inset-8 opacity-30 group-hover:opacity-60 transition-all duration-700">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-3xl blur-2xl"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/15 via-purple-500/20 to-cyan-500/15 rounded-2xl blur-xl"></div>
            </div>
            
            <div className="relative bg-white rounded-3xl p-6 backdrop-blur-md border border-gray-200 shadow-2xl">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Payroll automation illustration"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PayrollPainPoints;