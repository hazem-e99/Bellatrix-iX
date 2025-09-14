import React from "react";

const WhyChoeseBellatrix = () => {
  return (
    <div
      className="light-section"
      style={{
        backgroundColor: "rgb(249, 250, 251)", // bg-gray-50
        color: "rgb(31, 41, 55)", // text-gray-800
        fontSize: "15px",
        lineHeight: "24px",
        fontFamily: '"Gotham A", "Gotham B"',
        width: "100%",
        padding: "60px 0",
        margin: "0px",
      }}
    >
      <div
        style={{
          maxWidth: "1220px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {/* Title */}
        <div
          style={{
            width: "100%",
            padding: "0 15px 40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontWeight: "700",
              fontSize: "32px",
              lineHeight: "42px",
              textAlign: "center",
              letterSpacing: "-1px",
              color: "rgb(31, 41, 55)", // text-gray-800
              margin: "0 0 20px",
            }}
          >
            Why Choose <span style={{ color: "rgb(37, 99, 235)" }}>Bellatrix</span> for Support?
          </h2>
        </div>

        {/* Content Container */}
        <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
          {/* Left Column: Text + List + Quote */}
          <div
            style={{
              flex: "1",
              padding: "0 15px",
            }}
          >
            <p style={{ 
              marginBottom: "25px", 
              fontSize: "16px", 
              lineHeight: "26px",
              color: "rgb(75, 85, 99)" // text-gray-600
            }}>
              At Bellatrix, we strive to offer the highest level of quality
              when it comes to our solutions. Over the years, we have mastered the
              ins and outs of NetSuite. We've worked with companies in multiple
              verticals and are familiar with their best practices.
            </p>

            <ul style={{ 
              paddingLeft: "0", 
              marginBottom: "30px",
              listStyle: "none"
            }}>
              <li style={{
                position: "relative",
                paddingLeft: "25px",
                marginBottom: "12px",
                fontSize: "16px",
                lineHeight: "24px",
                color: "rgb(75, 85, 99)" // text-gray-600
              }}>
                <span style={{
                  position: "absolute",
                  left: "0",
                  top: "8px",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "rgb(37, 99, 235)", // bg-blue-600
                  borderRadius: "50%"
                }}></span>
                18 years of experience
              </li>
              <li style={{
                position: "relative",
                paddingLeft: "25px",
                marginBottom: "12px",
                fontSize: "16px",
                lineHeight: "24px",
                color: "rgb(75, 85, 99)" // text-gray-600
              }}>
                <span style={{
                  position: "absolute",
                  left: "0",
                  top: "8px",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "rgb(59, 130, 246)", // bg-blue-500
                  borderRadius: "50%"
                }}></span>
                85 NetSuite Consultants
              </li>
              <li style={{
                position: "relative",
                paddingLeft: "25px",
                marginBottom: "12px",
                fontSize: "16px",
                lineHeight: "24px",
                color: "rgb(75, 85, 99)" // text-gray-600
              }}>
                <span style={{
                  position: "absolute",
                  left: "0",
                  top: "8px",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "rgb(29, 78, 216)", // bg-blue-700
                  borderRadius: "50%"
                }}></span>
                800 Active Customers
              </li>
              <li style={{
                position: "relative",
                paddingLeft: "25px",
                marginBottom: "12px",
                fontSize: "16px",
                lineHeight: "24px",
                color: "rgb(75, 85, 99)" // text-gray-600
              }}>
                <span style={{
                  position: "absolute",
                  left: "0",
                  top: "8px",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "rgb(30, 58, 138)", // bg-blue-900
                  borderRadius: "50%"
                }}></span>
                2500+ Completed Projects
              </li>
            </ul>

            <blockquote
              style={{
                borderLeft: "4px solid rgb(37, 99, 235)", // border-blue-600
                padding: "20px 25px",
                margin: "0",
                fontSize: "17px",
                fontStyle: "italic",
                backgroundColor: "#fff",
                borderRadius: "0 8px 8px 0",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
              }}
            >
              <p
                style={{
                  fontFamily: 'Georgia, "Times New Roman", Times, serif',
                  fontSize: "16px",
                  lineHeight: "26px",
                  margin: 0,
                  color: "rgb(75, 85, 99)" // text-gray-600
                }}
              >
                <span style={{ fontSize: "18px" }}>
                  Don't take our word for it, check our{" "}
                  <strong>
                    <a
                      href="/testimonials"
                      target="_blank"
                      rel="noopener"
                      style={{
                        color: "rgb(37, 99, 235)", // text-blue-600
                        textDecoration: "none",
                        transition: "all 0.3s ease-in-out",
                        borderBottom: "1px solid transparent"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.borderBottom = "1px solid rgb(37, 99, 235)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.borderBottom = "1px solid transparent";
                      }}
                    >
                      client page
                    </a>
                  </strong>{" "}
                  to see how we supported, helped, and guided NetSuite users to
                  success.
                </span>
              </p>
            </blockquote>
          </div>

          {/* Right Column: Image */}
          <div
            style={{
              flex: "1",
              padding: "0 15px",
            }}
          >
            <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
              <div 
                style={{ 
                  position: "relative", 
                  maxWidth: "500px",
                  transition: "all 0.3s ease-in-out"
                }}
                onMouseEnter={(e) => {
                  const glowElements = e.currentTarget.querySelectorAll('.glow-bg');
                  glowElements.forEach(el => {
                    el.style.opacity = '0.6';
                  });
                }}
                onMouseLeave={(e) => {
                  const glowElements = e.currentTarget.querySelectorAll('.glow-bg');
                  glowElements.forEach(el => {
                    el.style.opacity = '0.3';
                  });
                }}
              >
                {/* Advanced Background Effects */}
                <div 
                  className="glow-bg"
                  style={{
                    position: "absolute",
                    top: "-32px",
                    left: "-32px",
                    right: "-32px",
                    bottom: "-32px",
                    opacity: "0.3",
                    transition: "all 0.7s ease-in-out"
                  }}
                >
                  {/* Multiple layered glows */}
                  <div style={{
                    position: "absolute",
                    top: "-24px",
                    left: "-24px",
                    right: "-24px",
                    bottom: "-24px",
                    background: "linear-gradient(45deg, rgba(37, 99, 235, 0.2), rgba(6, 182, 212, 0.3), rgba(37, 99, 235, 0.2))",
                    borderRadius: "24px",
                    filter: "blur(32px)"
                  }}></div>
                  <div style={{
                    position: "absolute",
                    top: "-16px",
                    left: "-16px",
                    right: "-16px",
                    bottom: "-16px",
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.15))",
                    borderRadius: "16px",
                    filter: "blur(16px)"
                  }}></div>
                  <div style={{
                    position: "absolute",
                    top: "-8px",
                    left: "-8px",
                    right: "-8px",
                    bottom: "-8px",
                    background: "linear-gradient(225deg, rgba(255, 255, 255, 0.1), rgba(59, 130, 246, 0.2), rgba(255, 255, 255, 0.1))",
                    borderRadius: "12px",
                    filter: "blur(8px)"
                  }}></div>
                </div>
                
                {/* Professional Container with Multi-layer Design */}
                <div style={{
                  position: "relative",
                  background: "linear-gradient(135deg, rgba(17, 24, 39, 0.1), rgba(37, 99, 235, 0.05), rgba(17, 24, 39, 0.1))",
                  borderRadius: "24px",
                  padding: "24px",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: "all 0.5s ease-in-out"
                }}>
                  {/* Inner glow container */}
                  <div style={{
                    position: "relative",
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent, rgba(37, 99, 235, 0.05))",
                    borderRadius: "16px",
                    padding: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}>
                    <img 
                      src="https://i.pinimg.com/736x/35/81/47/3581470fff3844922bc4865f41268080.jpg" 
                      alt="Industry Leaders - Strategic NetSuite Solutions" 
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "400px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        filter: "brightness(1.05) contrast(1.1) saturate(1.05)",
                        transition: "all 0.5s ease-in-out"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.filter = "brightness(1.1) contrast(1.15) saturate(1.1)";
                        e.target.style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.filter = "brightness(1.05) contrast(1.1) saturate(1.05)";
                        e.target.style.transform = "scale(1)";
                      }}
                    />
                    
                    {/* Professional overlay effects */}
                    <div style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      right: "16px",
                      bottom: "16px",
                      borderRadius: "12px",
                      background: "linear-gradient(225deg, rgba(37, 99, 235, 0.05), transparent, transparent, rgba(6, 182, 212, 0.05))",
                      pointerEvents: "none"
                    }}></div>
                    <div style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      right: "16px",
                      bottom: "16px",
                      borderRadius: "12px",
                      background: "linear-gradient(315deg, transparent, rgba(255, 255, 255, 0.03), transparent)",
                      pointerEvents: "none"
                    }}></div>
                  </div>
                  
                  {/* Advanced Floating Tech Elements */}
                  <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                    <div style={{ position: "relative" }}>
                      <div style={{
                        width: "16px",
                        height: "16px",
                        background: "linear-gradient(45deg, rgb(59, 130, 246), rgb(6, 182, 212))",
                        borderRadius: "50%",
                        boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                        animation: "pulse 2s infinite"
                      }}></div>
                      <div style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "16px",
                        height: "16px",
                        background: "rgba(59, 130, 246, 0.3)",
                        borderRadius: "50%",
                        animation: "ping 2s infinite"
                      }}></div>
                    </div>
                  </div>
                  
                  <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
                    <div style={{ position: "relative" }}>
                      <div style={{
                        width: "12px",
                        height: "12px",
                        background: "linear-gradient(45deg, rgb(6, 182, 212), rgb(37, 99, 235))",
                        borderRadius: "50%",
                        boxShadow: "0 0 16px rgba(6, 182, 212, 0.5)",
                        animation: "pulse 2s infinite"
                      }}></div>
                      <div style={{
                        position: "absolute",
                        top: "-4px",
                        left: "-4px",
                        width: "20px",
                        height: "20px",
                        background: "rgba(6, 182, 212, 0.2)",
                        borderRadius: "50%",
                        animation: "ping 2s infinite"
                      }}></div>
                    </div>
                  </div>
                  
                  <div style={{ position: "absolute", top: "50%", right: "24px" }}>
                    <div style={{ position: "relative" }}>
                      <div style={{
                        width: "8px",
                        height: "8px",
                        background: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "50%",
                        boxShadow: "0 0 12px rgba(255, 255, 255, 0.5)",
                        animation: "pulse 2s infinite"
                      }}></div>
                      <div style={{
                        position: "absolute",
                        top: "-4px",
                        left: "-4px",
                        width: "16px",
                        height: "16px",
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "50%",
                        animation: "ping 2s infinite"
                      }}></div>
                    </div>
                  </div>
                  
                  <div style={{ position: "absolute", top: "25%", left: "32px" }}>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      background: "linear-gradient(45deg, rgb(147, 197, 253), rgb(6, 182, 212))",
                      borderRadius: "50%",
                      opacity: "0.7",
                      animation: "pulse 2s infinite"
                    }}></div>
                  </div>
                  
                  <div style={{ position: "absolute", bottom: "33%", right: "48px" }}>
                    <div style={{
                      width: "6px",
                      height: "6px",
                      background: "linear-gradient(45deg, rgb(255, 255, 255), rgb(147, 197, 253))",
                      borderRadius: "50%",
                      opacity: "0.8",
                      animation: "pulse 2s infinite"
                    }}></div>
                  </div>
                  
                  {/* Professional corner accents */}
                  <div style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "32px",
                    height: "32px",
                    borderTop: "2px solid rgba(59, 130, 246, 0.4)",
                    borderLeft: "2px solid rgba(59, 130, 246, 0.4)",
                    borderTopLeftRadius: "24px"
                  }}></div>
                  <div style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    width: "32px",
                    height: "32px",
                    borderTop: "2px solid rgba(6, 182, 212, 0.4)",
                    borderRight: "2px solid rgba(6, 182, 212, 0.4)",
                    borderTopRightRadius: "24px"
                  }}></div>
                  <div style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    width: "32px",
                    height: "32px",
                    borderBottom: "2px solid rgba(59, 130, 246, 0.4)",
                    borderLeft: "2px solid rgba(59, 130, 246, 0.4)",
                    borderBottomLeftRadius: "24px"
                  }}></div>
                  <div style={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    width: "32px",
                    height: "32px",
                    borderBottom: "2px solid rgba(6, 182, 212, 0.4)",
                    borderRight: "2px solid rgba(6, 182, 212, 0.4)",
                    borderBottomRightRadius: "24px"
                  }}></div>
                  
                  {/* Data visualization lines */}
                  <div style={{
                    position: "absolute",
                    top: "16px",
                    left: "25%",
                    width: "48px",
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)"
                  }}></div>
                  <div style={{
                    position: "absolute",
                    bottom: "32px",
                    right: "25%",
                    width: "64px",
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), transparent)"
                  }}></div>
                  <div style={{
                    position: "absolute",
                    top: "33%",
                    right: "8px",
                    width: "2px",
                    height: "32px",
                    background: "linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.5), transparent)"
                  }}></div>
                </div>
                
                {/* Professional Badge */}
                <div style={{
                  position: "absolute",
                  bottom: "-12px",
                  right: "-12px",
                  background: "linear-gradient(45deg, rgb(37, 99, 235), rgb(6, 182, 212))",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                  fontSize: "14px",
                  fontWeight: "bold",
                  opacity: "0.9",
                  transition: "opacity 0.3s ease-in-out"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Industry Leaders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoeseBellatrix;
