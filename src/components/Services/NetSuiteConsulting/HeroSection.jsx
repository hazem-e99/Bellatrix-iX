import React from "react";
import SEO from "../../SEO";
import CTAButton from "../../CTAButton";

const HeroSection = ({ title, description, ctaText, ctaIcon }) => {
  return (
    <>
      <SEO
        title="Oracle NetSuite Consulting Hero | Expert ERP Implementation Services"
        description="Leading Oracle NetSuite consulting services with proven expertise in ERP implementation, customization, and business transformation for enhanced operational efficiency and growth."
        keywords="Oracle NetSuite consulting hero, NetSuite ERP implementation, Oracle consulting experts, ERP business transformation, NetSuite customization services"
        ogTitle="Oracle NetSuite Consulting Services - Expert ERP Implementation"
        ogDescription="Transform your business with expert Oracle NetSuite consulting services. Professional ERP implementation and customization for operational excellence."
        ogImage="/images/netsuite-consulting-hero.jpg"
      />
      <header
        className="py-12 relative overflow-hidden animate-background-glow"
        style={{
          backgroundColor: "var(--color-brand-dark-navy)",
          padding: "200px 0 100px",
          width: "100%",
          color: "var(--color-text-inverse)",
          fontSize: "15px",
          lineHeight: "24px",
          fontFamily: '"Gotham A", "Gotham B"',
        }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)]/10 via-transparent to-[var(--color-primary)]/10"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--color-accent-light)]/30 to-[var(--color-primary)]/20 rounded-full blur-2xl opacity-30"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-[var(--color-primary-light)]/15 via-[var(--color-accent)]/20 to-[var(--color-accent-light)]/15 rounded-full blur-xl opacity-40"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-r from-[var(--color-text-inverse)]/10 via-[var(--color-primary-light)]/20 to-[var(--color-text-inverse)]/10 rounded-full blur-lg opacity-20"></div>

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                className="text-[var(--color-primary-light)]"
              >
                <pattern
                  id="consultingGrid"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="1"
                    cy="1"
                    r="1"
                    fill="currentColor"
                    opacity="0.3"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#consultingGrid)" />
              </svg>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: "1220px",
            margin: "0 auto",
            padding: "0 7.5px",
          }}
          className="relative z-10"
        >
          <div style={{ padding: "40px 15px 20px" }}>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "50px",
                lineHeight: "50px",
                textAlign: "center",
                letterSpacing: "-1px",
                margin: "0 0 13px",
              }}
              className="text-[var(--color-text-inverse)] animate-slide-up"
            >
              {title}
            </h1>

            <p
              style={{
                fontSize: "20px",
                lineHeight: "30px",
                textAlign: "center",
                margin: 0,
              }}
              className="text-[var(--color-text-inverse)] opacity-80 animate-fade-in"
            >
              {description}
            </p>

            <div style={{ textAlign: "center" }}>
              <CTAButton
                variant="primary"
                size="lg"
                className="group relative min-w-[180px] min-h-[56px] font-bold text-sm uppercase leading-5 rounded-md mt-8 mb-0 transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-light)] hover:to-[var(--color-primary)] text-[var(--color-text-inverse)] border-2 border-[var(--color-primary-light)] hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--color-primary)]/25"
                modalConfig={{
                  title: "NetSuite Consulting Request",
                  subtitle: "Let's discuss your NetSuite consulting needs and create a customized solution",
                  icon: "💼"
                }}
                icon={
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={ctaIcon}
                    />
                  </svg>
                }
              >
                {ctaText}
              </CTAButton>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeroSection;
