import React, { useState } from 'react';

const PayrollFAQ = ({ faqData = {} }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const defaultFaqData = {
    title: "Frequently Asked Questions",
    items: [
      {
        q: "How secure is my payroll data?",
        a: "We use enterprise-grade security measures including 256-bit encryption, secure data centers, and compliance with SOC 2 standards to protect your sensitive payroll information."
      },
      {
        q: "Can I integrate with my existing systems?",
        a: "Yes, our payroll solution integrates with popular HR systems, accounting software, and time tracking tools through our robust API and pre-built connectors."
      },
      {
        q: "How long does implementation take?",
        a: "Implementation typically takes 2-4 weeks depending on your company size and complexity. Our team provides full support throughout the process."
      },
      {
        q: "Do you handle tax compliance?",
        a: "Absolutely. Our system automatically calculates taxes, generates tax forms, and ensures compliance with federal, state, and local tax regulations."
      }
    ]
  };

  const displayFaqData = {
    title: faqData.title || defaultFaqData.title,
    items: faqData.items || defaultFaqData.items
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 text-center">
          {displayFaqData.title}
        </h2>
        
        <div className="space-y-4">
          {displayFaqData.items.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-800">{item.q || "Question"}</span>
                <span className="ml-4 transform transition-transform duration-200">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{item.a || "Answer"}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PayrollFAQ;