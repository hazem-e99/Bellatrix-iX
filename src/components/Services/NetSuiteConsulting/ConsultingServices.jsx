import React from "react";
import SEO from "../../SEO";

const ConsultingServices = ({
  title,
  description,
  items,
  image,
  activeService,
  setActiveService,
}) => {
  return (
    <>
      <SEO
        title="Oracle NetSuite Consulting Services | Comprehensive ERP Solutions Portfolio"
        description="Comprehensive Oracle NetSuite consulting services including implementation, customization, integration, training, and ongoing support for optimal ERP performance and business growth."
        keywords="NetSuite consulting services, Oracle ERP implementation, NetSuite customization, ERP integration services, NetSuite training, Oracle consulting portfolio"
        ogTitle="NetSuite Consulting Services - Comprehensive Oracle ERP Solutions"
        ogDescription="Expert Oracle NetSuite consulting services portfolio including implementation, customization, integration, and training for business transformation success."
        ogImage="/images/netsuite-consulting-services-portfolio.jpg"
      />
      <section className="container mx-auto px-6">
        <header className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-4"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <article className="flex-1">
            <div className="bg-[var(--color-bg-primary)] rounded-2xl shadow-xl p-8 border border-[var(--color-border-secondary)]">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
                  {items[activeService].title}
                </h3>
                <p className="text-[var(--color-text-muted)] mb-6">
                  {items[activeService].description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">
                  Key Features:
                </h4>
                {items[activeService].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className="w-2 h-2 bg-[var(--color-primary)] rounded-full"
                      role="img"
                      aria-label="Feature indicator"
                    ></div>
                    <span className="text-[var(--color-text-secondary)]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2 mt-6 justify-center">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeService === index
                      ? "bg-[var(--color-primary)]"
                      : "bg-[var(--color-border-secondary)]"
                  }`}
                  aria-label={`View service ${index + 1}`}
                />
              ))}
            </div>
          </article>

          <div className="flex-1 flex justify-center">
            <div className="relative group max-w-xl">
              <div className="absolute -inset-8 opacity-30 group-hover:opacity-60 transition-all duration-700">
                <div className="absolute -inset-6 bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--color-accent-light)]/30 to-[var(--color-primary)]/20 rounded-3xl blur-2xl"></div>
                <div className="absolute -inset-4 bg-gradient-to-br from-[var(--color-primary-light)]/15 via-[var(--color-accent)]/20 to-[var(--color-accent-light)]/15 rounded-2xl blur-xl"></div>
              </div>

              <div className="relative bg-gradient-to-br from-[var(--color-text-primary)]/10 via-[var(--color-primary-dark)]/5 to-[var(--color-text-primary)]/10 rounded-3xl p-6 backdrop-blur-md border border-[var(--color-text-inverse)]/30 shadow-2xl">
                <img
                  src={image}
                  alt="Oracle NetSuite Consulting Services - Professional ERP Implementation"
                  className="w-full h-auto rounded-xl shadow-2xl brightness-105 contrast-110 saturate-105 group-hover:brightness-110 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConsultingServices;
