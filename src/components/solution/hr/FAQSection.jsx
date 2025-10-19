import React, { useState, useEffect } from "react";
import SEO from "../../SEO";

const FAQSection = ({ data, openFAQ, setOpenFAQ }) => {
  // استخدم useState داخلي إذا لم يتم تمرير setOpenFAQ
  const [internalOpenFAQ, setInternalOpenFAQ] = useState(null);
  const isControlled = typeof setOpenFAQ === "function";
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

  // PRIORITIZE props data over default data for real-time preview
  // Handle different data structures from dynamic schema generator
  let faqData;

  if (data?.faq) {
    // Standard structure: { faq: { title, items } }
    faqData = data.faq;
  } else if (data?.title && data?.faqItems) {
    // Dynamic schema structure: { title, faqItems }
    faqData = {
      title: data.title,
      items: data.faqItems || [],
    };
  } else if (data?.items) {
    // Direct items structure: { items }
    faqData = {
      title: data.title || "Frequently Asked Questions",
      items: data.items || [],
    };
  } else if (defaultData) {
    // Use default data
    faqData = defaultData;
  } else {
    // Ultimate fallback
    faqData = {
      title: "Frequently Asked Questions",
      items: [],
    };
  }

  const displayData = { faq: faqData };

  // Debug logging for real-time updates
  console.log("🎯 [HRFAQSection] Component received data:", {
    hasPropsData: !!(data && data.faq),
    propsData: data,
    hasDefaultData: !!defaultData,
    finalData: displayData,
    timestamp: new Date().toISOString(),
  });
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
      <section className="py-20 bg-[var(--color-bg-primary)]/90 animate-fade-in-up light-section">
        <div className="max-w-4xl mx-auto px-4">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)]">
              {displayData.faq.title}
            </h2>
          </header>
          <div className="space-y-6">
            {(displayData.faq?.items || []).map((faq, idx) => (
              <article
                key={idx}
                className="border-b border-[var(--color-primary)]/20 pb-4"
                role="article"
                aria-label={`FAQ: ${faq.q || "Question"}`}
              >
                <button
                  className="w-full text-left flex justify-between items-center text-lg font-medium text-[var(--color-primary-dark)] focus:outline-none"
                  onClick={() => {
                    if (isControlled) {
                      setOpenFAQ(openFAQ === idx ? null : idx);
                    } else {
                      setInternalOpenFAQ(internalOpenFAQ === idx ? null : idx);
                    }
                  }}
                  aria-expanded={
                    isControlled ? openFAQ === idx : internalOpenFAQ === idx
                  }
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span>{faq.q}</span>
                  <span>{faq.q || "(No question provided)"}</span>
                  <span
                    className={`ml-4 transition-transform ${
                      openFAQ === idx ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>
                {(isControlled ? openFAQ === idx : internalOpenFAQ === idx) && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="mt-2 text-[var(--color-text-secondary)] animate-fade-in-up"
                  >
                    {faq.a || "(No answer provided)"}
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
