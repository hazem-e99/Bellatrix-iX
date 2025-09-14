import React from "react";

const WhatWeOfferSection = () => {
  return (
    <section className="w-full bg-gray-50 py-16 light-section">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          What We <span className="text-blue-600">Offer</span>
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto text-center mb-12">
          Comprehensive support solutions designed to maximize your success
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center bg-white rounded-xl border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg p-8">
            <div className="flex items-center justify-center mb-6">
              <img
                src="/public/supoortWhatWeOffer.png"
                alt="Dedicated Team"
                className="w-32 h-32 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Dedicated Team
            </h3>
            <p className="text-gray-600 leading-relaxed">
              A dedicated team of Bellatrix experts that know your instance will be assigned to you.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center bg-white rounded-xl border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg p-8">
            <div className="flex items-center justify-center mb-6">
              <img
                src="/public/supoortWhatWeOffer2.png"
                alt="Stop Anytime"
                className="w-32 h-32 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Stop Anytime
            </h3>
            <p className="text-gray-600 leading-relaxed">
              SherpaCare offers you the ability to stop your services when you feel confident.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center bg-white rounded-xl border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg p-8">
            <div className="flex items-center justify-center mb-6">
              <img
                src="/public/supoortWhatWeOffer3.png"
                alt="Certified Bellatrix Partner"
                className="w-32 h-32 object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Certified Bellatrix Teams
            </h3>
            <p className="text-gray-600 leading-relaxed">
            Trust a team with certified Bellatrix expertise you can rely on.            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOfferSection;
