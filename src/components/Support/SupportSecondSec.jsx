import React from "react";

const SupportSecondSec = () => {
  return (
    <section className="w-full bg-gray-50 py-16 light-section">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <div className="order-2 md:order-1">
          <img 
            src="/images/Support/HeroSection.png" 
            alt="Bellatrix Support Services" 
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="order-1 md:order-2">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">Empower Your Business with Bellatrix Support</h2>
          <p className="text-lg text-gray-700 mb-4">
            Our Bellatrix Support service was built to empower your organization to use Bellatrix with confidence. Our in-house team of 85+ Bellatrix certified professionals are ready to support you to maximize the return on your Bellatrix investment.
          </p>
          <p className="text-lg text-gray-700">
            With our 18 years of implementation, customization, and development within Bellatrix, rest assured we have the expertise to not only answer your questions, but to proactively improve your Bellatrix instance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportSecondSec;
