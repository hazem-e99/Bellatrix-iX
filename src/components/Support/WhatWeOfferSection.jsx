import React from "react";
import SEO from "../SEO";

const WhatWeOfferSection = () => {
  return (
    <>
      <SEO
        title="What We Offer | Bellatrix ERP Support Value Propositions"
        description="Discover what Bellatrix offers: dedicated expert teams, flexible stop-anytime services, and certified ERP professionals for comprehensive support solutions."
        keywords="dedicated ERP team, certified Bellatrix professionals, flexible support services, stop anytime, comprehensive ERP solutions, expert support"
        ogTitle="What We Offer | Bellatrix ERP Support Value Propositions"
        ogDescription="Get dedicated expert teams, flexible services, and certified Bellatrix professionals for comprehensive ERP support solutions."
        ogImage="/public/supoortWhatWeOffer.png"
      />
      <section className="w-full bg-gray-50 py-16 light-section">
        <div className="max-w-6xl mx-auto px-4">
          <header className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What We <span className="text-blue-600">Offer</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Comprehensive support solutions designed to maximize your success
            </p>
          </header>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <article className="flex flex-col items-center text-center bg-white rounded-xl border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg p-8">
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
                A dedicated team of Bellatrix experts that know your instance
                will be assigned to you.
              </p>
            </article>

            {/* Card 2 */}
            <article className="flex flex-col items-center text-center bg-white rounded-xl border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg p-8">
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
                SherpaCare offers you the ability to stop your services when you
                feel confident.
              </p>
            </article>

            {/* Card 3 */}
            <article className="flex flex-col items-center text-center bg-white rounded-xl border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg p-8">
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
                Trust a team with certified Bellatrix expertise you can rely on.{" "}
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhatWeOfferSection;
