import React from "react";
import SEO from "../../SEO";

const CaseStudiesSection = ({ data }) => {
  // Add defensive programming
  if (
    !data ||
    !data.caseStudies ||
    !Array.isArray(data.caseStudies) ||
    data.caseStudies.length === 0
  ) {
    return (
      <section
        className="py-20 relative overflow-hidden theme-bg-primary"
        style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Success <span className="text-cyan-400">Stories</span>
            </h2>
            <p className="text-gray-300">No case studies data available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-20 relative overflow-hidden theme-bg-primary"
      style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
    >
      <SEO
        title="Retail Success Stories | Oracle NetSuite E-commerce Case Studies"
        description="Real retail success stories with Oracle NetSuite e-commerce solutions. Discover how retail companies achieved remarkable growth with NetSuite implementations."
        keywords="retail case studies, Oracle NetSuite success stories, e-commerce success stories, retail transformation, NetSuite retail implementations, retail growth stories"
        ogTitle="Retail Success Stories | Oracle NetSuite E-commerce Case Studies"
        ogDescription="Proven retail success stories and case studies showcasing Oracle NetSuite e-commerce transformations in retail operations."
        ogImage="/images/retail-case-studies.jpg"
      />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="text-blue-300"
          >
            <pattern
              id="successGrid"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#successGrid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <header className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Success{" "}
            <span
              className="theme-highlight-text"
              style={{
                color: "var(--color-cyan-400)",
                transition: "color 0.6s ease",
              }}
            >
              Stories
            </span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Real retail companies achieving remarkable results with NetSuite
            commerce solutions.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {data.caseStudies.map((study, index) => (
            <article
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
            >
              <div className="relative h-48">
                <img
                  src={study.image}
                  alt={study.company}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">
                    {typeof study.company === 'string'
                      ? study.company
                      : study.company?.name || study.company?.title || 'Company Name'}
                  </h3>
                  <p
                    className="theme-accent-text"
                    style={{
                      color: "var(--color-cyan-300)",
                      transition: "color 0.6s ease",
                    }}
                  >
                    {typeof study.industry === 'string'
                      ? study.industry
                      : study.industry?.name || study.industry?.title || 'Industry'}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">Challenge:</h4>
                  <p className="text-gray-300 text-sm">
                    {typeof study.challenge === 'string'
                      ? study.challenge
                      : study.challenge?.challenge || study.challenge?.description || 'Challenge Description'}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">Solution:</h4>
                  <p className="text-gray-300 text-sm">
                    {typeof study.solution === 'string'
                      ? study.solution
                      : study.solution?.solution || study.solution?.description || 'Solution Description'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Results:</h4>
                  <div className="space-y-2">
                    {study.results.map((result, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 theme-check-icon"
                          style={{
                            color: "var(--color-cyan-400)",
                            transition: "color 0.6s ease",
                          }}
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
                        <span className="text-gray-300 text-sm">
                          {typeof result === 'string'
                            ? result
                            : result?.result || result?.name || result?.title || 'Result'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
