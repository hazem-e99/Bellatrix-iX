import React from "react";

const ProcessSection = ({ title, steps }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {(steps || []).map((process, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {process.step}
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-3">
                {process.title}
              </h3>
              <p className="text-gray-600">{process.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;