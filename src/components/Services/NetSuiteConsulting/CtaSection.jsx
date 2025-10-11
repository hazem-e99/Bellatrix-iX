import React from "react";
import SEO from "../../SEO";
import CTAButton from "../../CTAButton";

const CtaSection = ({
  title,
  description,
  features,
  buttonText,
  openContactModal,
}) => {
  return (
    <>
      <SEO
        title="Start Oracle NetSuite Consulting | Expert ERP Implementation & Support"
        description="Ready to transform your business with Oracle NetSuite? Contact our expert consultants for comprehensive ERP implementation, customization, and ongoing support services."
        keywords="start NetSuite consulting, Oracle ERP consultation, NetSuite implementation contact, ERP consulting services, Oracle NetSuite experts, business transformation"
        ogTitle="Start NetSuite Consulting - Oracle ERP Expert Implementation"
        ogDescription="Begin your Oracle NetSuite transformation journey with expert consulting services. Professional ERP implementation and customization for business success."
        ogImage="/images/netsuite-consulting-contact.jpg"
      />
      <section className="container mx-auto px-6">
        <article className="bg-[var(--color-bg-primary)] rounded-3xl p-12 text-center border border-[var(--color-border-secondary)] shadow-xl">
          <header className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-text-primary)]"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p className="text-xl mb-8 leading-relaxed text-[var(--color-text-muted)]">
              {description}
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <div className="text-center" key={index}>
                <div className="w-16 h-16 bg-[var(--color-bg-secondary)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[var(--color-primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label={`${feature.title} icon`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={feature.icon}
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">
                  {feature.title}
                </h4>
                <p className="text-[var(--color-text-muted)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <CTAButton
            variant="primary"
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            modalConfig={{
              title: "NetSuite Consulting Consultation",
              subtitle: "Let's discuss your NetSuite consulting needs and how we can help",
              icon: "💼"
            }}
          >
            {buttonText}
          </CTAButton>
        </article>
      </section>
    </>
  );
};

export default CtaSection;
