import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";

export default function FAQSection({ title, items }) {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <SectionWrapper bgColor="bg-white/90">
      <h2 className="text-3xl font-bold mb-10 text-blue-800 text-center">
        {title}
      </h2>
      <div className="space-y-6">
        {(items || []).map((faq, idx) => (
          <div key={idx} className="border-b border-blue-100 pb-4">
            <button
              className="w-full text-left flex justify-between items-center text-lg font-medium text-blue-900 focus:outline-none"
              onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
              aria-expanded={openFAQ === idx}
            >
              <span>{faq.q}</span>
              <span
                className={`ml-4 transition-transform ${
                  openFAQ === idx ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {openFAQ === idx && (
              <div className="mt-2 text-gray-700 animate-fade-in-up">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
