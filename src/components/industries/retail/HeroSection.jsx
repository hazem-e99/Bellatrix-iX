import React from "react";
import SEO from "../../SEO";

const HeroSection = ({ data: propsData, openContactModal }) => {
  // PRIORITIZE props data over default data for real-time preview
  const data = propsData || {
    title: "Retail Solutions",
    subtitle: "Transform your retail operations",
    description: "Comprehensive NetSuite solutions for retail businesses"
  };

  // Debug logging for real-time updates
  console.log("🎯 [RetailHeroSection] Component received data:", {
    hasPropsData: !!propsData,
    propsData: propsData,
    finalData: data,
    timestamp: new Date().toISOString()
  });
  return (
    <header
      className="py-12 relative overflow-hidden animate-background-glow theme-bg-animated text-white"
      style={{
        padding: "200px 0 100px",
        width: "100%",
        fontSize: "15px",
        lineHeight: "24px",
        fontFamily: '"Gotham A", "Gotham B"',
      }}
    >
      <SEO
        title="Oracle NetSuite Retail Platform | E-commerce & Omnichannel Solutions"
        description="Modern Oracle NetSuite retail platform for e-commerce, POS, inventory management, and omnichannel retail operations. Transform your retail business today."
        keywords="Oracle NetSuite retail platform, e-commerce solutions, omnichannel retail, NetSuite POS, retail inventory management, retail ERP system"
        ogTitle="Oracle NetSuite Retail Platform | E-commerce & Omnichannel Solutions"
        ogDescription="Comprehensive Oracle NetSuite retail platform for modern e-commerce and omnichannel retail operations."
        ogImage="/images/retail-hero.jpg"
      />
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlays */}
        <div className="absolute inset-0 theme-gradient-overlay"></div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-2xl opacity-30 theme-floating-element-1"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full blur-xl opacity-40 theme-floating-element-2"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full blur-lg opacity-20 theme-floating-element-3"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              className="theme-pattern-color"
              style={{
                color: "var(--color-cyan-300)",
                transition: "color 0.6s ease",
              }}
            >
              <pattern
                id="retailGrid"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#retailGrid)" />
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
          {/* Title */}
          <h1
            style={{
              fontWeight: "700",
              fontSize: "50px",
              lineHeight: "50px",
              textAlign: "center",
              letterSpacing: "-1px",
              margin: "0 0 13px",
            }}
            className="text-white animate-slide-up"
          >
            {data.title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "20px",
              lineHeight: "30px",
              textAlign: "center",
              margin: 0,
            }}
            className="text-gray-300 animate-fade-in"
          >
            {data.description}
          </p>

          {/* CTA Button */}
          <div style={{ textAlign: "center" }}>
            <a
              href="#request-info"
              onClick={(e) => {
                e.preventDefault();
                openContactModal();
              }}
              className="theme-cta-button"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {data.ctaText}
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-brand-accent)/0.2, var(--color-brand-variant)/0.2)",
                }}
              ></div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
