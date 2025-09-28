import React, { useState, useEffect } from 'react';

const FAQSection = ({ data, openFAQ, setOpenFAQ }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/hr.json');
        const jsonData = await response.json();
        setDefaultData(jsonData.faq);
      } catch (error) {
        console.error('Failed to load HR data:', error);
        // Fallback data
        setDefaultData({
          title: "Frequently Asked Questions",
          items: [
            {
              q: "Is my employee data secure and compliant?",
              a: "Yes. We use enterprise-grade 256-bit encryption, regular security audits, and are fully GDPR, SOC 2, and ISO 27001 compliant."
            },
            {
              q: "Can I integrate with my existing payroll and accounting software?",
              a: "Absolutely. We offer pre-built integrations with all major payroll providers and accounting software."
            }
          ]
        });
      }
    };
    fetchData();
  }, []);

  // Use props if provided, otherwise fall back to default data
  const displayData = {
    faq: data?.faq || defaultData || {
      title: "Frequently Asked Questions",
      items: []
    }
  };
  return (
    <section className="py-20 bg-white/90 animate-fade-in-up light-section">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">{displayData.faq.title}</h2>
        <div className="space-y-6">
          {displayData.faq.items.map((faq, idx) => (
            <div key={idx} className="border-b border-blue-100 pb-4">
              <button
                className="w-full text-left flex justify-between items-center text-lg font-medium text-blue-900 focus:outline-none"
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                aria-expanded={openFAQ === idx}
              >
                <span>{faq.q}</span>
                <span className={`ml-4 transition-transform ${openFAQ === idx ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openFAQ === idx && (
                <div className="mt-2 text-gray-700 animate-fade-in-up">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;