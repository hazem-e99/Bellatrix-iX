import React, { useState, useEffect } from 'react';

const PayrollFAQ = ({ faqData = {} }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/payroll.json');
        const data = await response.json();
        setDefaultData(data.faqs);
      } catch (error) {
        console.error('Failed to load payroll data:', error);
        // Fallback data
        setDefaultData({
          title: "Frequently Asked Questions",
          items: [
            {
              question: "How secure is my payroll data?",
              answer: "We use enterprise-grade security measures including 256-bit encryption, secure data centers, and compliance with SOC 2 standards to protect your sensitive payroll information."
            },
            {
              question: "Can I integrate with my existing systems?",
              answer: "Yes, our payroll solution integrates with popular HR systems, accounting software, and time tracking tools through our robust API and pre-built connectors."
            }
          ]
        });
      }
    };
    fetchData();
  }, []);

  // Use provided data or default data
  const displayFaqData = {
    title: faqData.title || defaultData?.title || "Frequently Asked Questions",
    items: faqData.items || defaultData?.items || []
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
                <span className="text-lg font-medium text-gray-800">{item.question || item.q || "Question"}</span>
                <span className="ml-4 transform transition-transform duration-200">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{item.answer || item.a || "Answer"}</p>
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