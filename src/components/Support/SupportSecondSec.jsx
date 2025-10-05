import React from "react";
import SEO from "../SEO";

const SupportSecondSec = () => {
  return (
    <>
      <SEO
        title="Empower Your Business | Bellatrix ERP Support Excellence"
        description="Empower your business with Bellatrix support from 85+ certified professionals. 18 years of ERP implementation, customization, and development expertise."
        keywords="Bellatrix certified professionals, ERP implementation expertise, business empowerment, 18 years experience, system optimization, return on investment"
        ogTitle="Empower Your Business | Bellatrix ERP Support Excellence"
        ogDescription="Professional Bellatrix support with 85+ certified experts to maximize your ERP investment and business confidence."
        ogImage="/images/Support/HeroSection.png"
      />
      <section className="w-full bg-gray-50 py-16 light-section">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image Section */}
          <div className="order-2 md:order-1">
            <img
              src="/images/Support/HeroSection.png"
              alt="Bellatrix Support Services - Professional ERP implementation and customization expertise"
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Text Section */}
          <article className="order-1 md:order-2">
            <header>
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
                Empower Your Business with Bellatrix Support
              </h2>
            </header>
            <p className="text-lg text-gray-700 mb-4">
              Our Bellatrix Support service was built to empower your
              organization to use Bellatrix with confidence. Our in-house team
              of 85+ Bellatrix certified professionals are ready to support you
              to maximize the return on your Bellatrix investment.
            </p>
            <p className="text-lg text-gray-700">
              With our 18 years of implementation, customization, and
              development within Bellatrix, rest assured we have the expertise
              to not only answer your questions, but to proactively improve your
              Bellatrix instance.
            </p>
          </article>
        </div>
      </section>
    </>
  );
};
export default SupportSecondSec;
