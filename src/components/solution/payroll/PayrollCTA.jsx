import React from "react";
import SEO from "../../SEO";
import {
  getVariantClasses,
  validateVariant,
} from "../../../utils/variantSystem";
import { smartRender } from "../../../utils/htmlSanitizer";

const PayrollCTA = ({
  title,
  subtitle,
  description,
  ctaButton,
  features,
  trustedBy,
  onCtaClick,
}) => {
  console.log("🚀 [PayrollCTA Fixed] Received props:", {
    title,
    subtitle,
    description,
    ctaButton,
    features,
    trustedBy,
  });

  // Use props DIRECTLY - no complex data processing or async fetching
  const finalData = {
    title: title || "Ready to Simplify Your Payroll?",
    subtitle: subtitle || "",
    description: description || "",
    buttonText: ctaButton?.text || "Start Free Trial",
    buttonLink: ctaButton?.link || "/payroll/trial",
    variant: validateVariant(ctaButton?.variant || "primary"),
    // Normalize features so component can safely map over them
    features: (function normalizeFeatures(input) {
      if (Array.isArray(input)) {
        return input.map((f) => {
          if (typeof f === "string") return f;
          if (!f) return "";
          return f.title || f.text || f.description || String(f);
        });
      }
      if (typeof input === "string") {
        return input
          .split(/[;\n,]+/)
          .map((s) => s.trim())
          .filter(Boolean);
      }
      if (input && typeof input === "object") {
        // object -> take values as strings (fallback)
        return Object.values(input).map((v) => String(v));
      }
      return [
        "No setup fees",
        "30-day money back guarantee",
        "24/7 customer support",
      ];
    })(features),
    trustedBy: trustedBy || ["Fortune 500 Companies", "SMEs", "Startups"],
  };

  // Extra debug showing normalized features
  console.log("✅ [PayrollCTA Fixed] Final data:", {
    ...finalData,
    features: finalData.features,
    trustedBy: finalData.trustedBy,
  });

  // Check if title and description contain HTML and render accordingly
  const titleHTML = smartRender(finalData.title);
  const descriptionHTML = smartRender(finalData.description);

  return (
    <>
      <SEO
        title={`Get Started with Oracle NetSuite Payroll | ${
          finalData.title || "Ready to Simplify Your Payroll?"
        }`}
        description={`${
          finalData.description ||
          "Ready to transform your payroll operations with Oracle NetSuite? Start your free trial today"
        } - Expert implementation support and comprehensive ERP payroll solutions.`}
        keywords="Oracle NetSuite payroll trial, get started NetSuite payroll, payroll system demo, ERP payroll implementation, NetSuite payroll pricing"
        ogTitle={`Get Started with NetSuite Payroll - ${
          finalData.title || "Transform Your Payroll Today"
        }`}
        ogDescription={`${(
          finalData.description ||
          "Start your Oracle NetSuite payroll transformation today"
        ).substring(
          0,
          120
        )}... Professional ERP payroll solutions and support.`}
        ogImage="/images/netsuite-payroll-cta.jpg"
      />
      <section className="py-20 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-accent)]"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:20px_20px]"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-[var(--color-accent)]/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-[var(--color-accent-light)]/15 rounded-full blur-md animate-pulse delay-500"></div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <header className="text-center">
            {/* Main Title - Fixed HTML rendering */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[var(--color-text-inverse)] leading-tight"
              {...(titleHTML
                ? { dangerouslySetInnerHTML: titleHTML }
                : { children: finalData.title })}
            />

            {/* Subtitle */}
            {finalData.subtitle && (
              <h3 className="text-lg md:text-xl text-[var(--color-text-inverse)] opacity-80 mb-4 leading-relaxed max-w-2xl mx-auto">
                {finalData.subtitle}
              </h3>
            )}

            {/* Description - Fixed HTML rendering */}
            <p
              className="text-xl md:text-2xl text-[var(--color-text-inverse)] opacity-90 mb-10 leading-relaxed max-w-3xl mx-auto"
              {...(descriptionHTML
                ? { dangerouslySetInnerHTML: descriptionHTML }
                : { children: finalData.description })}
            />

            {/* CTA Button - Enhanced to support both onClick and navigation */}
            {finalData.buttonLink ? (
              <a
                href={finalData.buttonLink}
                onClick={onCtaClick}
                className={`group relative px-8 py-4 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 inline-block ${getVariantClasses(
                  finalData.variant
                )}`}
              >
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>{finalData.buttonText}</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>

                {/* Button hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-secondary)] to-[var(--color-accent-light)] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            ) : (
              <button
                onClick={onCtaClick}
                className={`group relative px-8 py-4 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 ${getVariantClasses(
                  finalData.variant
                )}`}
              >
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>{finalData.buttonText}</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>

                {/* Button hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-secondary)] to-[var(--color-accent-light)] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            )}

            {/* Additional Benefits - Dynamic from form data */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-[var(--color-text-inverse)]/80">
              {finalData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-5 h-5 text-[var(--color-accent)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Trust indicators - Dynamic from form data */}
            <div className="mt-8 pt-8 border-t border-[var(--color-text-inverse)]/20">
              <p className="text-[var(--color-text-inverse)]/60 text-sm mb-4">
                Trusted by thousands of businesses worldwide
              </p>
              <div className="flex justify-center items-center space-x-8 opacity-70">
                {finalData.trustedBy.map((company, index) => (
                  <div
                    key={index}
                    className="text-[var(--color-text-inverse)]/50 text-xs"
                  >
                    ✓ {company}
                  </div>
                ))}
              </div>
            </div>
          </header>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--color-primary-dark)]/50 to-transparent"></div>
      </section>
    </>
  );
};

export default PayrollCTA;
