import React, { useState, useEffect } from "react";
import SEO from "../../SEO";

const FAQSection = ({ data, openFAQ, setOpenFAQ }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/hr.json");
        const jsonData = await response.json();
        setDefaultData(jsonData.faq);
      } catch (error) {
        console.error("Failed to load HR data:", error);
        // Fallback data
        setDefaultData({
          title: "Frequently Asked Questions",
          items: [
            {
              q: "Is my employee data secure and compliant?",
              a:
                "Yes. We use enterprise-grade 256-bit encryption, regular security audits, and are fully GDPR, SOC 2, and ISO 27001 compliant.",
            },
            {
              q:
                "Can I integrate with my existing payroll and accounting software?",
              a:
                "Absolutely. We offer pre-built integrations with all major payroll providers and accounting software.",
            },
          ],
        });
      }
    };
    fetchData();
  }, []);

  // Use props if provided, otherwise fall back to default data
  const displayData = {
    faq: data?.faq ||
      defaultData || {
        title: "Frequently Asked Questions",
        items: [],
      },
  };
  return (
    <>
      <SEO
        title={`Oracle NetSuite HR FAQ | ${
          displayData.faq.title || "Frequently Asked Questions"
        }`}
        description="Get answers to common Oracle NetSuite HR questions: security, compliance, integration, implementation, pricing, and support. Expert HR solution guidance available."
        keywords="Oracle NetSuite HR FAQ, HR platform questions, NetSuite HR security, ERP HR integration, HR compliance answers, HR implementation questions"
        ogTitle={`NetSuite HR FAQ - ${
          displayData.faq.title || "Common Questions Answered"
        }`}
        ogDescription="Find answers to frequently asked questions about Oracle NetSuite HR solutions, security, compliance, and implementation. Expert guidance available."
        ogImage="/images/netsuite-hr-faq.jpg"
      />
      <section className="py-20 bg-white/90 animate-fade-in-up light-section">
        <div className="max-w-4xl mx-auto px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-bold text-blue-800">
              {displayData.faq.title}
            </h2>
          </header>
          <div className="space-y-6">
            {displayData.faq.items.map((faq, idx) => (
              <article
                key={idx}
                className="border-b border-blue-100 pb-4"
                role="article"
                aria-label={`FAQ: ${faq.q || "Question"}`}
              >
                <button
                  className="w-full text-left flex justify-between items-center text-lg font-medium text-blue-900 focus:outline-none"
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  aria-expanded={openFAQ === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span>{faq.q}</span>
                  <span
                    className={`ml-4 transition-transform ${
                      openFAQ === idx ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>
                {openFAQ === idx && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="mt-2 text-gray-700 animate-fade-in-up"
                  >
                    {faq.a}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
