import React from "react";
import SEO from "../../SEO";

const PayrollCTA = ({
  title,
  subtitle,
  description,
  ctaButton,
  onCtaClick,
}) => {
  console.log("🚀 [PayrollCTA Simple] Received props:", {
    title,
    subtitle,
    description,
    ctaButton,
  });

  // Use props DIRECTLY - simple structure matching payroll page
  const finalData = {
    title: title || "Ready to Simplify Your Payroll?",
    subtitle: subtitle || "",
    description: description || "Get in touch for a personalized demo and see how our solution can transform your payroll process.",
    buttonText: ctaButton?.text || "Request Now !",
    buttonLink: ctaButton?.link || "/contact",
  };

  console.log("✅ [PayrollCTA Simple] Final data:", finalData);

  return (
    <>
      <SEO
        title="Payroll CTA - Ready to Simplify Your Payroll"
        description="Get in touch for a personalized demo and see how our solution can transform your payroll process."
        keywords="payroll demo, payroll consultation, payroll solution, payroll transformation"
        ogTitle="Ready to Simplify Your Payroll?"
        ogDescription="Get in touch for a personalized demo and see how our solution can transform your payroll process."
        ogImage="/images/payroll-cta.jpg"
      />
      
      {/* Contact/CTA Section - Exact match to payroll page */}
      <section id="contact" className="py-20 bg-gray-50 light-section">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
            {finalData.title.includes("Payroll") ? (
              <>
                Ready to Simplify Your{" "}
                <span className="text-blue-600">Payroll?</span>
              </>
            ) : (
              finalData.title
            )}
          </h2>
          
          {finalData.subtitle && (
            <p className="text-xl mb-4 text-gray-700 font-medium">
              {finalData.subtitle}
            </p>
          )}
          
          <p className="text-xl mb-10 text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {finalData.description}
          </p>
          
          <button
            onClick={onCtaClick}
            className="inline-flex items-center px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {finalData.buttonText}
          </button>
        </div>
      </section>
    </>
  );
};

export default PayrollCTA;
