import React from "react";
import { motion } from "framer-motion";
import SEO from "../../SEO";
import { useComponentData } from "../../../utils/useComponentData";
import manufacturingData from "../../../../public/data/manufacturing-data.json";

const CaseStudies = ({ data }) => {
  // Merge props with default data from JSON
  const finalData = useComponentData("caseStudies", data, manufacturingData);

  console.log("🏭 [CaseStudies] Data merge:", {
    props: data,
    defaultData: manufacturingData.caseStudies,
    finalData: finalData,
    itemsCount: finalData.items?.length,
  });

  return (
    <section
      className="py-20 relative overflow-hidden animate-background-glow theme-bg-animated"
      style={{ backgroundColor: "var(--color-brand-dark-navy)" }}
    >
      <SEO
        title="Manufacturing Success Stories | Oracle NetSuite Case Studies"
        description="Real manufacturing success stories with Oracle NetSuite ERP. Discover how manufacturing companies achieved remarkable results with NetSuite implementations."
        keywords="manufacturing case studies, Oracle NetSuite success stories, manufacturing ERP results, NetSuite manufacturing implementations, manufacturing transformation"
        ogTitle="Manufacturing Success Stories | Oracle NetSuite Case Studies"
        ogDescription="Proven manufacturing success stories and case studies showcasing Oracle NetSuite ERP transformations in manufacturing operations."
        ogImage="/images/manufacturing-case-studies.jpg"
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
            Success <span className="text-cyan-400">Stories</span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Real manufacturing companies achieving remarkable results with
            NetSuite solutions.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {finalData.items?.map((study, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/10"
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
                    {study.company}
                  </h3>
                  <p className="text-cyan-300">{study.industry}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">Challenge:</h4>
                  <p className="text-gray-300 text-sm">{study.challenge}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">Solution:</h4>
                  <p className="text-gray-300 text-sm">{study.solution}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Results:</h4>
                  <div className="space-y-2">
                    {study.results.map((result, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-cyan-400"
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
                        <span className="text-gray-300 text-sm">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
