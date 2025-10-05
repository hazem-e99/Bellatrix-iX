import React from "react";
import SEO from "../SEO";

const PayPerUseSection = () => {
  return (
    <>
      <SEO
        title="Pay Per Use Support | Cost-Effective Bellatrix ERP Support Hours"
        description="Only pay for the support hours you actually use with Bellatrix. Flexible ERP support pricing with monthly reviews and hour optimization strategies."
        keywords="pay per use support, flexible ERP pricing, hourly support rates, cost-effective support, support hour optimization, Bellatrix pricing model"
        ogTitle="Pay Per Use Support | Cost-Effective Bellatrix ERP Support Hours"
        ogDescription="Flexible support pricing model - only pay for hours you use with monthly reviews and optimization strategies for your Bellatrix system."
        ogImage="/images/Support/pay2.jpeg"
      />
      <section className="w-full bg-white py-16 light-section">
        <div className="max-w-6xl mx-auto px-4">
          <header className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 text-center">
              Only Pay for the Hours you Use
            </h2>
          </header>

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
    </>
  );
};

export default PayPerUseSection;
