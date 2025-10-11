import React, { useState, useEffect } from "react";

const AboutMission = ({ data }) => {
  const [defaultData, setDefaultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/about.json");
        const jsonData = await response.json();
        setDefaultData(jsonData.mission);
      } catch (error) {
        console.error("Failed to load About data:", error);
        // Fallback data
        setDefaultData({
          title: "Our Mission",
          description:
            "To empower businesses with innovative technology solutions that transform operations, enhance productivity, and drive sustainable growth.",
          vision:
            "To be the global leader in business transformation consulting, helping organizations achieve their full potential through technology excellence.",
        });
      }
    };
    fetchData();
  }, []);

  // PRIORITIZE props data over default data for real-time preview
  const missionData = data || defaultData || {
    title: "Our Mission",
    description:
      "To empower businesses with innovative technology solutions that transform operations, enhance productivity, and drive sustainable growth.",
    vision:
      "To be the global leader in business transformation consulting, helping organizations achieve their full potential through technology excellence.",
  };

  // Debug logging for real-time updates
  console.log("🎯 [AboutMission] Component received data:", {
    hasPropsData: !!data,
    propsData: data,
    hasDefaultData: !!defaultData,
    finalData: missionData,
    timestamp: new Date().toISOString()
  });

  return (
    <section id="about-section" className="bg-gray-50 py-20 light-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{
              color: "var(--color-text-primary)",
              transition: "color 0.6s ease",
            }}
          >
            {missionData.title || "About Bellatrix"}
          </h2>
          {missionData.subtitle && (
            <p
              className="text-lg leading-relaxed max-w-3xl mx-auto mb-4"
              style={{
                color: "var(--color-text-secondary)",
                transition: "color 0.6s ease",
              }}
            >
              {missionData.subtitle}
            </p>
          )}
          <p
            className="text-lg leading-relaxed max-w-3xl mx-auto"
            style={{
              color: "var(--color-text-secondary)",
              transition: "color 0.6s ease",
            }}
          >
            {missionData.description || "We are a leading Oracle NetSuite consultancy dedicated to transforming businesses through innovative technology solutions and strategic digital transformation initiatives."}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image - Left Side */}
          <div className="flex-1 flex justify-center">
            <div className="relative group max-w-xl">
              <div className="absolute -inset-8 opacity-30 group-hover:opacity-60 transition-all duration-700">
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/20 via-cyan-500/30 to-blue-600/20 rounded-3xl blur-2xl"></div>
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/15 via-purple-500/20 to-cyan-500/15 rounded-2xl blur-xl"></div>
                <div className="absolute -inset-2 bg-gradient-to-tr from-white/10 via-blue-300/20 to-white/10 rounded-xl blur-lg"></div>
              </div>
              <div className="relative bg-gradient-to-br from-gray-900/10 via-blue-900/5 to-gray-900/10 rounded-3xl p-6 backdrop-blur-md border border-white/30 shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500">
                <div className="relative bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 rounded-2xl p-4 border border-white/20">
                  <img
                    src="/images/ourProServices.png"
                    alt="About Bellatrix - Professional Services"
                    className="w-full h-auto rounded-xl shadow-2xl brightness-105 contrast-110 saturate-105 group-hover:brightness-110 group-hover:contrast-115 group-hover:saturate-110 transition-all duration-500 filter drop-shadow-xl"
                  />
                  <div className="absolute inset-4 rounded-xl bg-gradient-to-tr from-blue-500/5 via-transparent via-transparent to-cyan-400/5 pointer-events-none"></div>
                  <div className="absolute inset-4 rounded-xl bg-gradient-to-bl from-transparent via-white/3 to-transparent pointer-events-none"></div>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="relative">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-blue-400/30 rounded-full animate-ping"></div>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="relative">
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full animate-pulse shadow-md"></div>
                    <div className="absolute -inset-1 w-5 h-5 bg-cyan-400/20 rounded-full animate-ping"></div>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400/40 rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400/40 rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40 rounded-br-3xl"></div>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-bold opacity-90 group-hover:opacity-100 transition-opacity duration-300">
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
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  <span>Industry Leader</span>
                </div>
              </div>
            </div>
          </div>
          {/* Content - Right Side */}
          <div className="flex-1 space-y-6">
            <h3
              className="text-3xl font-bold"
              style={{
                color: "var(--color-text-primary)",
                transition: "color 0.6s ease",
              }}
            >
              {missionData.title || "Our Mission"}
            </h3>
            <p
              className="leading-relaxed text-lg"
              style={{
                color: "var(--color-text-secondary)",
                transition: "color 0.6s ease",
              }}
            >
              {missionData.description || "To empower businesses worldwide with cutting-edge Oracle NetSuite solutions that drive operational excellence, enhance productivity, and accelerate growth. We believe in creating lasting partnerships that deliver measurable value and sustainable success."}
            </p>
            {missionData.vision && (
              <div className="mt-6 p-4 rounded-xl border" style={{
                backgroundColor: "var(--color-primary-bg)",
                borderColor: "var(--color-border-light)",
                transition: "all 0.6s ease",
              }}>
                <h4 className="text-lg font-semibold mb-2" style={{
                  color: "var(--color-text-primary)",
                  transition: "color 0.6s ease",
                }}>
                  Our Vision
                </h4>
                <p className="text-sm" style={{
                  color: "var(--color-text-secondary)",
                  transition: "color 0.6s ease",
                }}>
                  {missionData.vision}
                </p>
              </div>
            )}
            {missionData.additionalContent && (
              <div className="mt-4 p-4 rounded-xl border" style={{
                backgroundColor: "var(--color-primary-bg)",
                borderColor: "var(--color-border-light)",
                transition: "all 0.6s ease",
              }}>
                <p className="text-sm" style={{
                  color: "var(--color-text-secondary)",
                  transition: "color 0.6s ease",
                }}>
                  {missionData.additionalContent}
                </p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--color-primary-bg)",
                  borderColor: "var(--color-border-light)",
                  transition: "all 0.6s ease",
                }}
              >
                <div
                  className="text-2xl font-bold"
                  style={{
                    color: "var(--color-primary)",
                    transition: "color 0.6s ease",
                  }}
                >
                  500+
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "var(--color-text-secondary)",
                    transition: "color 0.6s ease",
                  }}
                >
                  Projects Completed
                </div>
              </div>
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--color-primary-bg)",
                  borderColor: "var(--color-border-light)",
                  transition: "all 0.6s ease",
                }}
              >
                <div
                  className="text-2xl font-bold"
                  style={{
                    color: "var(--color-primary)",
                    transition: "color 0.6s ease",
                  }}
                >
                  98%
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "var(--color-text-secondary)",
                    transition: "color 0.6s ease",
                  }}
                >
                  Client Satisfaction
                </div>
              </div>
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--color-primary-bg)",
                  borderColor: "var(--color-border-light)",
                  transition: "all 0.6s ease",
                }}
              >
                <div
                  className="text-2xl font-bold"
                  style={{
                    color: "var(--color-primary)",
                    transition: "color 0.6s ease",
                  }}
                >
                  15+
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "var(--color-text-secondary)",
                    transition: "color 0.6s ease",
                  }}
                >
                  Years Experience
                </div>
              </div>
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--color-primary-bg)",
                  borderColor: "var(--color-border-light)",
                  transition: "all 0.6s ease",
                }}
              >
                <div
                  className="text-2xl font-bold"
                  style={{
                    color: "var(--color-primary)",
                    transition: "color 0.6s ease",
                  }}
                >
                  50+
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "var(--color-text-secondary)",
                    transition: "color 0.6s ease",
                  }}
                >
                  Expert Team
                </div>
              </div>
            </div>
            
            {/* Mission Points Section */}
            {missionData.missionPoints && missionData.missionPoints.length > 0 && (
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4" style={{
                  color: "var(--color-text-primary)",
                  transition: "color 0.6s ease",
                }}>
                  Key Focus Areas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {missionData.missionPoints.map((point, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border flex items-start space-x-3"
                      style={{
                        backgroundColor: "var(--color-primary-bg)",
                        borderColor: "var(--color-border-light)",
                        transition: "all 0.6s ease",
                      }}
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm mb-1" style={{
                          color: "var(--color-text-primary)",
                          transition: "color 0.6s ease",
                        }}>
                          {point.title || point.label || `Point ${index + 1}`}
                        </h5>
                        <p className="text-xs" style={{
                          color: "var(--color-text-secondary)",
                          transition: "color 0.6s ease",
                        }}>
                          {point.description || point.text || point.content || "Mission point description"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
