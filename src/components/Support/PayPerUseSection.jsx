import React from "react";

const PayPerUseSection = () => {
  return (
    <section className="w-full bg-white py-16 light-section">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-10 text-center">
          Only Pay for the Hours you Use
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <div className="order-1 md:order-1">
            <p className="text-lg text-gray-700 mb-4">
              Stop paying a lot of money for support that you may not use! How
              many real hours do you get to take advantage of in your support
              contract? If you don't use them, do you lose them?
            </p>
            <p className="text-lg text-gray-700">
              Our approach is different. Our monthly reviews focus on the
              realignment of time/hours not used and outlines new ways to
              leverage unused support hours in order to optimize your system.
            </p>
          </div>

          {/* Image Section */}
          <div className="order-2 md:order-2">
            <img
              alt="Bellatrix dashboard"
              src="/images/Support/pay2.jpeg"
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayPerUseSection;
