import React from "react";
import SEO from "../../SEO";

const BenefitsSection = ({ title, description, items }) => {
  return (
    <>
      <SEO
        title="Oracle NetSuite Consulting Benefits | Measurable ERP ROI & Business Impact"
        description="Discover the measurable benefits of Oracle NetSuite consulting including improved efficiency, cost savings, enhanced visibility, streamlined operations, and significant ROI for your business."
        keywords="NetSuite consulting benefits, Oracle ERP ROI, NetSuite business impact, ERP efficiency gains, NetSuite cost savings, Oracle consulting value proposition"
        ogTitle="NetSuite Consulting Benefits - Measurable Oracle ERP ROI"
        ogDescription="Achieve measurable business results with Oracle NetSuite consulting. Proven benefits including efficiency gains, cost savings, and enhanced operational visibility."
        ogImage="/images/netsuite-consulting-benefits.jpg"
      />
      <section className="container mx-auto px-6 relative z-10">
        <header className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-inverse)] mb-4"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="text-lg text-[var(--color-text-inverse)] opacity-80 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((benefit, index) => (
            <article
              key={index}
              className="text-center p-6 bg-[var(--color-text-inverse)]/5 backdrop-blur-sm rounded-2xl border border-[var(--color-text-inverse)]/10 hover:bg-[var(--color-text-inverse)]/10 transition-all duration-300"
            >
              <div
                className="text-3xl font-bold text-[var(--color-accent-light)] mb-2"
                role="img"
                aria-label={`${benefit.metric} metric`}
              >
                {benefit.metric}
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-inverse)] mb-3">
                {benefit.title}
              </h3>
              <p className="text-[var(--color-text-inverse)] opacity-80 text-sm">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default BenefitsSection;
