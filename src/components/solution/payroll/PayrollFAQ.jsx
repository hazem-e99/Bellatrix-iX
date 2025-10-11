import React, { useState, useEffect } from "react";
import SEO from "../../SEO";

const PayrollFAQ = ({ faqData = {} }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/payroll.json");
        const data = await response.json();
        setDefaultData(data.faqs);
      } catch (error) {
        console.error("Failed to load payroll data:", error);
        // Fallback data
        setDefaultData({
          title: "Frequently Asked Questions",
          items: [
            {
              question: "How secure is my payroll data?",
              answer:
                "We use enterprise-grade security measures including 256-bit encryption, secure data centers, and compliance with SOC 2 standards to protect your sensitive payroll information.",
            },
            {
              question: "Can I integrate with my existing systems?",
              answer:
                "Yes, our payroll solution integrates with popular HR systems, accounting software, and time tracking tools through our robust API and pre-built connectors.",
            },
          ],
        });
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const displayFaqData = {
    title: faqData.title || defaultData?.title || "Frequently Asked Questions",
    items: faqData.items || defaultData?.items || [],
  };

  // Debug logging for real-time updates
  console.log("🎯 [PayrollFAQ] Component received data:", {
    hasPropsData: !!(faqData && Object.keys(faqData).length > 0),
    propsData: faqData,
    hasDefaultData: !!defaultData,
    finalData: displayFaqData,
    timestamp: new Date().toISOString()
  });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <SEO
        title={`Oracle NetSuite Payroll FAQ | ${
          displayFaqData.title || "Frequently Asked Questions"
        }`}
        description="Get answers to common Oracle NetSuite payroll questions: security, integration, compliance, pricing, and implementation. Expert payroll solution guidance and support."
        keywords="Oracle NetSuite payroll FAQ, payroll system questions, NetSuite payroll security, ERP payroll integration, payroll compliance answers"
        ogTitle={`NetSuite Payroll FAQ - ${
          displayFaqData.title || "Common Questions Answered"
        }`}
        ogDescription="Find answers to frequently asked questions about Oracle NetSuite payroll solutions, security, integration, and implementation. Expert guidance available."
        ogImage="/images/netsuite-payroll-faq.jpg"
      />
      <section className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="container mx-auto px-6 max-w-4xl">
          <header className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              {displayFaqData.title}
            </h2>
          </header>

          <div className="space-y-4">
            {displayFaqData.items.map((item, index) => (
              <article
                key={index}
                className="bg-[var(--color-bg-primary)] rounded-lg shadow-md border border-[var(--color-border-primary)] overflow-hidden"
                role="article"
                aria-label={`FAQ: ${item.question || item.q || "Question"}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-medium text-[var(--color-text-primary)]">
                    {item.question || item.q || "Question"}
                  </span>
                  <span className="ml-4 transform transition-transform duration-200">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <div id={`faq-answer-${index}`} className="px-6 pb-4">
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                      {item.answer || item.a || "Answer"}
                    </p>
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

export default PayrollFAQ;
