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
              color: "var(--color-text-primary)", // theme-aware text color
              margin: "0 0 20px",
              transition: "color 0.6s ease",
            }}
          >
            Why Choose{" "}
            <span
              style={{
                color: "var(--color-primary)",
                transition: "color 0.6s ease",
              }}
            >
              Bellatrix
            </span>{" "}
            for Support?
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
            <p
              style={{
                marginBottom: "25px",
                fontSize: "16px",
                lineHeight: "26px",
                color: "var(--color-text-secondary)", // theme-aware secondary text
                transition: "color 0.6s ease",
              }}
            >
              At Bellatrix, we strive to offer the highest level of quality when
              it comes to our solutions. Over the years, we have mastered the
              ins and outs of NetSuite. We've worked with companies in multiple
              verticals and are familiar with their best practices.
            </p>

            <ul
              style={{
                paddingLeft: "0",
                marginBottom: "30px",
                listStyle: "none",
              }}
            >
              <li
                style={{
                  position: "relative",
                  paddingLeft: "25px",
                  marginBottom: "12px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "var(--color-text-secondary)", // theme-aware text
                  transition: "color 0.6s ease",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "8px",
                    width: "8px",
                    height: "8px",
                    backgroundColor: "var(--color-primary)", // theme-aware primary color
                    borderRadius: "50%",
                    transition: "background-color 0.6s ease",
                  }}
                ></span>
                18 years of experience
              </li>
              <li
                style={{
                  position: "relative",
                  paddingLeft: "25px",
                  marginBottom: "12px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "var(--color-text-secondary)", // theme-aware text
                  transition: "color 0.6s ease",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "8px",
                    width: "8px",
                    height: "8px",
                    backgroundColor: "var(--color-primary-light)", // theme-aware primary light
                    borderRadius: "50%",
                    transition: "background-color 0.6s ease",
                  }}
                ></span>
                85 NetSuite Consultants
              </li>
              <li
                style={{
                  position: "relative",
                  paddingLeft: "25px",
                  marginBottom: "12px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "var(--color-text-secondary)", // theme-aware text
                  transition: "color 0.6s ease",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "8px",
                    width: "8px",
                    height: "8px",
                    backgroundColor: "var(--color-primary-dark)", // theme-aware primary dark
                    borderRadius: "50%",
                    transition: "background-color 0.6s ease",
                  }}
                ></span>
                800 Active Customers
              </li>
              <li
                style={{
                  position: "relative",
                  paddingLeft: "25px",
                  marginBottom: "12px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "var(--color-text-secondary)", // theme-aware text
                  transition: "color 0.6s ease",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "8px",
                    width: "8px",
                    height: "8px",
                    backgroundColor: "var(--color-active)", // theme-aware active color
                    borderRadius: "50%",
                    transition: "background-color 0.6s ease",
                  }}
                ></span>
                2500+ Completed Projects
              </li>
            </ul>

            <blockquote
              style={{
                borderLeft: "4px solid var(--color-primary)", // theme-aware border
                padding: "20px 25px",
                margin: "0",
                fontSize: "17px",
                fontStyle: "italic",
                backgroundColor: "var(--color-bg-primary)",
                borderRadius: "0 8px 8px 0",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                transition:
                  "border-color 0.6s ease, background-color 0.6s ease",
              }}
            >
              <p
                style={{
                  fontFamily: 'Georgia, "Times New Roman", Times, serif',
                  fontSize: "16px",
                  lineHeight: "26px",
                  margin: 0,
                  color: "var(--color-text-secondary)", // theme-aware text
                  transition: "color 0.6s ease",
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
                        color: "var(--color-primary)", // theme-aware primary color
                        textDecoration: "none",
                        transition: "all 0.3s ease-in-out",
                        borderBottom: "1px solid transparent",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.borderBottom = `1px solid var(--color-primary)`;
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
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  maxWidth: "500px",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  const glowElements = e.currentTarget.querySelectorAll(
                    ".glow-bg"
                  );
                  glowElements.forEach((el) => {
                    el.style.opacity = "0.6";
                  });
                }}
                onMouseLeave={(e) => {
                  const glowElements = e.currentTarget.querySelectorAll(
                    ".glow-bg"
                  );
                  glowElements.forEach((el) => {
                    el.style.opacity = "0.3";
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
                    transition: "all 0.7s ease-in-out",
                  }}
                >
                  {/* Multiple layered glows - theme-aware */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-24px",
                      left: "-24px",
                      right: "-24px",
                      bottom: "-24px",
                      background:
                        "linear-gradient(45deg, var(--color-primary)/0.2, var(--color-cyan-500)/0.3, var(--color-primary)/0.2)",
                      borderRadius: "24px",
                      filter: "blur(32px)",
                      transition: "background 0.6s ease",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      top: "-16px",
                      left: "-16px",
                      right: "-16px",
                      bottom: "-16px",
                      background:
                        "linear-gradient(135deg, var(--color-primary-light)/0.15, var(--color-primary-dark)/0.2, var(--color-cyan-500)/0.15)",
                      borderRadius: "16px",
                      filter: "blur(16px)",
                      transition: "background 0.6s ease",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      left: "-8px",
                      right: "-8px",
                      bottom: "-8px",
                      background:
                        "linear-gradient(225deg, var(--color-white)/0.1, var(--color-primary-light)/0.2, var(--color-white)/0.1)",
                      borderRadius: "12px",
                      filter: "blur(8px)",
                      transition: "background 0.6s ease",
                    }}
                  ></div>
                </div>

                {/* Professional Container with Multi-layer Design - theme-aware */}
                <div
                  style={{
                    position: "relative",
                    background:
                      "linear-gradient(135deg, var(--color-gray-900)/0.1, var(--color-primary)/0.05, var(--color-gray-900)/0.1)",
                    borderRadius: "24px",
                    padding: "24px",
                    backdropFilter: "blur(16px)",
                    border: "1px solid var(--color-white)/0.3",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    transition: "all 0.5s ease-in-out, background 0.6s ease",
                  }}
                >
                  {/* Inner glow container - theme-aware */}
                  <div
                    style={{
                      position: "relative",
                      background:
                        "linear-gradient(135deg, var(--color-white)/0.05, transparent, var(--color-primary)/0.05)",
                      borderRadius: "16px",
                      padding: "16px",
                      border: "1px solid var(--color-white)/0.2",
                      transition:
                        "background 0.6s ease, border-color 0.6s ease",
                    }}
                  >
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
                        transition: "all 0.5s ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.filter =
                          "brightness(1.1) contrast(1.15) saturate(1.1)";
                        e.target.style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.filter =
                          "brightness(1.05) contrast(1.1) saturate(1.05)";
                        e.target.style.transform = "scale(1)";
                      }}
                    />

                    {/* Professional overlay effects - theme-aware */}
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        right: "16px",
                        bottom: "16px",
                        borderRadius: "12px",
                        background:
                          "linear-gradient(225deg, var(--color-primary)/0.05, transparent, transparent, var(--color-cyan-500)/0.05)",
                        pointerEvents: "none",
                        transition: "background 0.6s ease",
                      }}
                    ></div>
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        right: "16px",
                        bottom: "16px",
                        borderRadius: "12px",
                        background:
                          "linear-gradient(315deg, transparent, var(--color-white)/0.03, transparent)",
                        pointerEvents: "none",
                        transition: "background 0.6s ease",
                      }}
                    ></div>
                  </div>

                  {/* Advanced Floating Tech Elements */}
                  <div
                    style={{ position: "absolute", top: "12px", right: "12px" }}
                  >
                    <div style={{ position: "relative" }}>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          background:
                            "linear-gradient(45deg, var(--color-primary-light), var(--color-cyan-500))",
                          borderRadius: "50%",
                          boxShadow: "0 0 20px var(--color-primary-light)/0.5",
                          animation: "pulse 2s infinite",
                          transition:
                            "background 0.6s ease, box-shadow 0.6s ease",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "16px",
                          height: "16px",
                          background: "var(--color-primary-light)/0.3",
                          borderRadius: "50%",
                          animation: "ping 2s infinite",
                          transition: "background 0.6s ease",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: "24px",
                      left: "24px",
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          background:
                            "linear-gradient(45deg, var(--color-cyan-500), var(--color-primary))",
                          borderRadius: "50%",
                          boxShadow: "0 0 16px var(--color-cyan-500)/0.5",
                          animation: "pulse 2s infinite",
                          transition:
                            "background 0.6s ease, box-shadow 0.6s ease",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          top: "-4px",
                          left: "-4px",
                          width: "20px",
                          height: "20px",
                          background: "var(--color-cyan-500)/0.2",
                          borderRadius: "50%",
                          animation: "ping 2s infinite",
                          transition: "background 0.6s ease",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div
                    style={{ position: "absolute", top: "50%", right: "24px" }}
                  >
                    <div style={{ position: "relative" }}>
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          background: "var(--color-white)/0.9",
                          borderRadius: "50%",
                          boxShadow: "0 0 12px var(--color-white)/0.5",
                          animation: "pulse 2s infinite",
                          transition:
                            "background 0.6s ease, box-shadow 0.6s ease",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          top: "-4px",
                          left: "-4px",
                          width: "16px",
                          height: "16px",
                          background: "var(--color-white)/0.2",
                          borderRadius: "50%",
                          animation: "ping 2s infinite",
                          transition: "background 0.6s ease",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div
                    style={{ position: "absolute", top: "25%", left: "32px" }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        background:
                          "linear-gradient(45deg, var(--color-blue-300), var(--color-cyan-500))",
                        borderRadius: "50%",
                        opacity: "0.7",
                        animation: "pulse 2s infinite",
                        transition: "background 0.6s ease",
                      }}
                    ></div>
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: "33%",
                      right: "48px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        background:
                          "linear-gradient(45deg, var(--color-white), var(--color-blue-300))",
                        borderRadius: "50%",
                        opacity: "0.8",
                        animation: "pulse 2s infinite",
                        transition: "background 0.6s ease",
                      }}
                    ></div>
                  </div>

                  {/* Professional corner accents - theme-aware */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "32px",
                      height: "32px",
                      borderTop: "2px solid var(--color-primary-light)/0.4",
                      borderLeft: "2px solid var(--color-primary-light)/0.4",
                      borderTopLeftRadius: "24px",
                      transition: "border-color 0.6s ease",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      width: "32px",
                      height: "32px",
                      borderTop: "2px solid var(--color-cyan-500)/0.4",
                      borderRight: "2px solid var(--color-cyan-500)/0.4",
                      borderTopRightRadius: "24px",
                      transition: "border-color 0.6s ease",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      width: "32px",
                      height: "32px",
                      borderBottom: "2px solid var(--color-primary-light)/0.4",
                      borderLeft: "2px solid var(--color-primary-light)/0.4",
                      borderBottomLeftRadius: "24px",
                      transition: "border-color 0.6s ease",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      width: "32px",
                      height: "32px",
                      borderBottom: "2px solid var(--color-cyan-500)/0.4",
                      borderRight: "2px solid var(--color-cyan-500)/0.4",
                      borderBottomRightRadius: "24px",
                      transition: "border-color 0.6s ease",
                    }}
                  ></div>

                  {/* Data visualization lines - theme-aware */}
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "25%",
                      width: "48px",
                      height: "2px",
                      background:
                        "linear-gradient(90deg, transparent, var(--color-primary-light)/0.5, transparent)",
                      transition: "background 0.6s ease",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "32px",
                      right: "25%",
                      width: "64px",
                      height: "2px",
                      background:
                        "linear-gradient(90deg, transparent, var(--color-cyan-500)/0.5, transparent)",
                      transition: "background 0.6s ease",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      top: "33%",
                      right: "8px",
                      width: "2px",
                      height: "32px",
                      background:
                        "linear-gradient(180deg, transparent, var(--color-primary-light)/0.5, transparent)",
                      transition: "background 0.6s ease",
                    }}
                  ></div>
                </div>

                {/* Professional Badge - theme-aware */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-12px",
                    right: "-12px",
                    background:
                      "linear-gradient(45deg, var(--color-primary), var(--color-cyan-500))",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                    fontSize: "14px",
                    fontWeight: "bold",
                    opacity: "0.9",
                    transition: "all 0.3s ease-in-out, background 0.6s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <svg
                      style={{ width: "16px", height: "16px" }}
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
