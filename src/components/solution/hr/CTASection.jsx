import React from "react";
import SEO from "../../SEO";

const CTASection = ({
  title,
  subtitle,
  description,
  ctaButton,
  features,
  trustedBy,
  onCtaClick,
}) => {
  console.log("🚀 [HRCTASection Fixed] Received props:", {
    title,
    subtitle,
    description,
    ctaButton,
    features,
    trustedBy,
  });

  // Use props DIRECTLY - no complex data processing or async fetching
  const finalData = {
    title: title || "Ready to Transform Your HR Operations?",
    subtitle: subtitle || "",
    description:
      description ||
      "Join 10,000+ companies that have automated their HR processes and reduced administrative workload by 70%",
    buttonText: ctaButton?.text || "Start Free Trial",
    buttonLink: ctaButton?.link || "/hr/trial",
    variant: ctaButton?.variant || "primary",
  };

  console.log("✅ [HRCTASection Fixed] Final data:", finalData);
  return (
    <>
      <SEO
        title={`Get Started with Oracle NetSuite HR | ${
          finalData.title || "Ready to Transform Your HR Operations?"
        }`}
        description={`${
          finalData.description ||
          "Ready to transform your HR operations with Oracle NetSuite? Join thousands of companies automating HR processes"
        } - Start your free trial today.`}
        keywords="Oracle NetSuite HR trial, get started NetSuite HR, HR platform demo, ERP HR implementation, NetSuite HR pricing, HR automation trial"
        ogTitle={`Get Started with NetSuite HR - ${
          finalData.title || "Transform Your HR Today"
        }`}
        ogDescription={`${(
          finalData.description ||
          "Start your Oracle NetSuite HR transformation today"
        ).substring(0, 120)}... Professional ERP HR solutions and support.`}
        ogImage="/images/netsuite-hr-cta.jpg"
      />
      <section className="py-16 bg-[var(--color-bg-secondary)] text-center animate-fade-in-up light-section">
        <div className="max-w-2xl mx-auto px-4">
          <header className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-primary-dark)]">
              {finalData.title}
            </h2>
            {finalData.subtitle && (
              <h3 className="text-lg md:text-xl text-[var(--color-primary)] mb-4 leading-relaxed">
                {finalData.subtitle}
              </h3>
            )}
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)]">
              {finalData.description}
            </p>
          </header>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {finalData.buttonLink ? (
              <a
                href={finalData.buttonLink}
                className="inline-block border-2 border-[var(--color-primary)] hover:border-[var(--color-primary-light)] text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold rounded-lg px-8 py-4 transition-all duration-200 shadow-lg text-lg hover:bg-[var(--color-primary)]/10"
              >
                {finalData.buttonText}
              </a>
            ) : (
              <button
                onClick={onCtaClick}
                className="inline-block border-2 border-[var(--color-primary)] hover:border-[var(--color-primary-light)] text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-semibold rounded-lg px-8 py-4 transition-all duration-200 shadow-lg text-lg hover:bg-[var(--color-primary)]/10"
              >
                {finalData.buttonText}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;
