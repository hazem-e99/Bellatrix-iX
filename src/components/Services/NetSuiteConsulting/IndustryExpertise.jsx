import React from "react";
import SEO from "../../SEO";

const IndustryExpertise = ({
  title,
  description,
  items,
  handleIndustryClick,
}) => {
  return (
    <>
      <SEO
        title="Oracle NetSuite Industry Expertise | Specialized ERP Solutions by Sector"
        description="Specialized Oracle NetSuite industry expertise across manufacturing, retail, healthcare, financial services, and technology sectors with tailored ERP solutions for industry-specific challenges."
        keywords="NetSuite industry expertise, Oracle ERP by industry, NetSuite manufacturing, NetSuite retail, NetSuite healthcare, industry-specific ERP solutions, vertical market expertise"
        ogTitle="NetSuite Industry Expertise - Specialized Oracle ERP Solutions"
        ogDescription="Expert Oracle NetSuite consulting across multiple industries. Specialized ERP solutions for manufacturing, retail, healthcare, financial services, and technology sectors."
        ogImage="/images/netsuite-industry-expertise.jpg"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((industry, index) => (
            <article
              key={index}
              onClick={() => handleIndustryClick(industry.link)}
              className="bg-[var(--color-text-inverse)]/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-[var(--color-text-inverse)]/10 hover:bg-[var(--color-text-inverse)]/10 transition-all duration-300 group cursor-pointer hover:scale-105"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={industry.image}
                  alt={`Oracle NetSuite ${industry.name} Industry Solutions`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-dark-navy)]/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-[var(--color-text-inverse)]">
                    {industry.name}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[var(--color-text-inverse)] opacity-80 mb-4">
                  {industry.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-[var(--color-text-inverse)] text-sm">
                    Key Solutions:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {industry.solutions.map((solution, i) => (
                      <span
                        key={i}
                        className="bg-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-xs px-2 py-1 rounded-full"
                      >
                        {solution}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default IndustryExpertise;
