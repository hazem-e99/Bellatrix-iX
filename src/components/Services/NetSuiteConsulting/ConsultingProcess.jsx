import React from "react";
import SEO from "../../SEO";

const ConsultingProcess = ({
  title,
  description,
  image,
  steps,
  openContactModal,
}) => {
  return (
    <>
      <SEO
        title="Oracle NetSuite Consulting Process | Proven ERP Implementation Methodology"
        description="Proven Oracle NetSuite consulting process with structured methodology for successful ERP implementation including discovery, design, development, testing, and go-live phases."
        keywords="NetSuite consulting process, Oracle ERP implementation methodology, NetSuite project phases, ERP consulting steps, NetSuite implementation timeline"
        ogTitle="NetSuite Consulting Process - Proven Oracle ERP Implementation"
        ogDescription="Structured Oracle NetSuite consulting process ensuring successful ERP implementation with proven methodology and expert guidance through every project phase."
        ogImage="/images/netsuite-consulting-process.jpg"
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

        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 flex justify-center">
            <div className="relative group max-w-lg">
              <div className="absolute -inset-8 opacity-30 group-hover:opacity-60 transition-all duration-700">
                <div className="absolute -inset-6 bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--color-accent-light)]/30 to-[var(--color-primary)]/20 rounded-3xl blur-2xl"></div>
                <div className="absolute -inset-4 bg-gradient-to-br from-[var(--color-primary-light)]/15 via-[var(--color-accent)]/20 to-[var(--color-accent-light)]/15 rounded-2xl blur-xl"></div>
                <div className="absolute -inset-2 bg-gradient-to-tr from-[var(--color-text-inverse)]/10 via-[var(--color-primary-light)]/20 to-[var(--color-text-inverse)]/10 rounded-xl blur-lg"></div>
              </div>

              <div className="relative bg-gradient-to-br from-[var(--color-text-primary)]/10 via-[var(--color-primary-dark)]/5 to-[var(--color-text-primary)]/10 rounded-3xl p-6 backdrop-blur-md border border-[var(--color-text-inverse)]/30 shadow-2xl group-hover:shadow-[var(--color-primary)]/20 transition-all duration-500">
                <div className="relative bg-gradient-to-br from-[var(--color-text-inverse)]/5 via-transparent to-[var(--color-primary)]/5 rounded-2xl p-4 border border-[var(--color-text-inverse)]/20">
                  <img
                    src={image}
                    alt="Oracle NetSuite Consulting Process - Strategic ERP Implementation Solutions"
                    className="w-full h-auto rounded-xl shadow-2xl brightness-105 contrast-110 saturate-105 group-hover:brightness-110 group-hover:contrast-115 group-hover:saturate-110 transition-all duration-500 filter drop-shadow-xl"
                  />{" "}
                  <div className="absolute inset-4 rounded-xl bg-gradient-to-tr from-[var(--color-primary)]/5 via-transparent via-transparent to-[var(--color-accent-light)]/5 pointer-events-none"></div>
                  <div className="absolute inset-4 rounded-xl bg-gradient-to-bl from-transparent via-[var(--color-text-inverse)]/3 to-transparent pointer-events-none"></div>
                </div>

                <div className="absolute top-3 right-3">
                  <div className="relative">
                    <div className="w-4 h-4 bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-accent-light)] rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-[var(--color-primary-light)]/30 rounded-full animate-ping"></div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6">
                  <div className="relative">
                    <div className="w-3 h-3 bg-gradient-to-r from-[var(--color-accent-light)] to-[var(--color-primary-light)] rounded-full animate-pulse shadow-md"></div>
                    <div className="absolute -inset-1 w-5 h-5 bg-[var(--color-accent-light)]/20 rounded-full animate-ping"></div>
                  </div>
                </div>

                <div className="absolute top-1/2 right-6">
                  <div className="relative">
                    <div className="w-2 h-2 bg-[var(--color-text-inverse)]/90 rounded-full animate-pulse shadow-sm"></div>
                    <div className="absolute -inset-1 w-4 h-4 bg-[var(--color-text-inverse)]/20 rounded-full animate-ping"></div>
                  </div>
                </div>

                <div className="absolute top-1/4 left-8">
                  <div className="w-2 h-2 bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-accent-light)] rounded-full animate-pulse opacity-70"></div>
                </div>

                <div className="absolute bottom-1/3 right-12">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-[var(--color-text-inverse)] to-[var(--color-primary-light)] rounded-full animate-pulse opacity-80"></div>
                </div>

                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-primary-light)]/40 rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--color-accent-light)]/40 rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--color-primary-light)]/40 rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-accent-light)]/40 rounded-br-3xl"></div>

                <div className="absolute top-4 left-1/4 w-12 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-primary-light)]/50 to-transparent"></div>
                <div className="absolute bottom-8 right-1/4 w-16 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-accent-light)]/50 to-transparent"></div>
                <div className="absolute top-1/3 right-2 w-0.5 h-8 bg-gradient-to-b from-transparent via-[var(--color-primary-light)]/50 to-transparent"></div>
              </div>

              <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-light)] text-[var(--color-text-inverse)] px-4 py-2 rounded-xl shadow-lg text-sm font-bold opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Proven Process</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[var(--color-primary-light)] via-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-brand-dark-navy)]"></div>

              <div className="space-y-6">
                {steps.map((phase, index) => {
                  const bgColors = [
                    "bg-[var(--color-primary-light)]",
                    "bg-[var(--color-primary)]",
                    "bg-[var(--color-primary-dark)]",
                    "bg-[var(--color-brand-variant)]",
                    "bg-[var(--color-brand-dark-navy)]",
                  ];
                  return (
                    <article
                      key={index}
                      className="relative flex items-start group"
                    >
                      <div
                        className={`flex-shrink-0 w-12 h-12 ${bgColors[index]} rounded-full flex items-center justify-center border-4 border-[var(--color-bg-primary)] shadow-lg z-10 group-hover:scale-110 transition-all duration-300`}
                      >
                        <span className="text-[var(--color-text-inverse)] font-bold text-sm">
                          {phase.step}
                        </span>
                      </div>
                      <div className="ml-6 flex-1">
                        <div className="bg-[var(--color-bg-primary)] p-4 rounded-xl border-2 border-[var(--color-border-secondary)] hover:border-[var(--color-primary-light)] hover:bg-[var(--color-bg-secondary)] transition-all duration-300 hover:shadow-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                              {phase.title}
                            </h3>
                            <span className="bg-[var(--color-bg-secondary)] text-[var(--color-primary)] text-xs font-semibold px-2 py-1 rounded-full">
                              {phase.duration}
                            </span>
                          </div>
                          <p className="text-sm text-[var(--color-text-muted)]">
                            {phase.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={openContactModal}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-[var(--color-text-inverse)] px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                aria-label="Start Your Oracle NetSuite Consulting Journey"
              >
                Start Your Consulting Journey
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConsultingProcess;
