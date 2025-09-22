import React from 'react';

const ModulesSection = ({ data = {} }) => {
  const defaultModules = [
    {
      icon: "👥",
      title: "Employee Management",
      desc: "Comprehensive employee records, profiles, and lifecycle management from onboarding to offboarding."
    },
    {
      icon: "💰",
      title: "Payroll Processing",
      desc: "Automated payroll calculations, tax deductions, and salary disbursements with compliance features."
    },
    {
      icon: "📅",
      title: "Time & Attendance",
      desc: "Track work hours, manage schedules, and monitor attendance with advanced reporting capabilities."
    },
    {
      icon: "📋",
      title: "Performance Management",
      desc: "Set goals, conduct reviews, and track performance metrics to drive employee development."
    },
    {
      icon: "🏖️",
      title: "Leave Management",
      desc: "Streamlined leave requests, approvals, and balance tracking with policy enforcement."
    },
    {
      icon: "📊",
      title: "HR Analytics",
      desc: "Detailed insights and reports on HR metrics, trends, and workforce analytics."
    }
  ];

  const modules = data.modules || defaultModules;
  return (
    <section className="py-20 animate-fade-in-up relative" style={{ backgroundColor: '#001038' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Product Modules</h2>
        <p className="text-lg text-gray-300 mb-10 text-center max-w-2xl mx-auto">Our platform is built from modular components to cover every aspect of HR, payroll, and compliance—choose what fits your business best.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {modules.map((m, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl p-10 flex flex-col items-center text-center border border-white/10 hover:border-blue-500 hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
              <div className="text-4xl mb-4">{m.icon || "🔧"}</div>
              <div className="font-bold text-xl text-white mb-3">{m.title || "Module"}</div>
              <div className="text-gray-300 text-base">{m.desc || "Module description"}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;