import React from 'react';

const UseCasesSection = ({ data }) => {
  return (
    <section className="py-20 bg-gray-50 animate-fade-in-up light-section">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold mb-3 text-blue-800 text-center">
          Who Is It <span className="text-blue-600">For?</span>
        </h2>
        <div className="mx-auto mb-10 w-16 h-1 bg-blue-600 rounded-full"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {data.useCases.map((u, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow p-10 flex flex-col items-center text-center border border-gray-200 animate-fade-in-up transition-transform duration-500 hover:scale-105 hover:-rotate-1 hover:shadow-blue-200/40 hover:shadow-2xl cursor-pointer"
              style={{ willChange: 'transform' }}
            >
              <div className="font-bold text-xl text-blue-800 mb-3">{u.title}</div>
              <div className="text-gray-600 text-base">{u.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;