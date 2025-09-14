import React from 'react';

const FAQSection = ({ data, openFAQ, setOpenFAQ }) => {
  return (
    <section className="py-20 bg-white/90 animate-fade-in-up light-section">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">{data.faq.title}</h2>
        <div className="space-y-6">
          {data.faq.items.map((faq, idx) => (
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