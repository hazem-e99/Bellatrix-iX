import React from "react";

const DedicatedTeamSection = () => {
  return (
    <section
      style={{
        backgroundColor: "#001038",
        padding: "60px 0",
        fontFamily: '"Gotham A", "Gotham B"',
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Pattern */}
      <div style={{
        position: "absolute",
        inset: "0",
        opacity: "0.1"
      }}>
        <div style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%"
        }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" style={{color: "#60A5FA"}}>
            <pattern id="dedicatedGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#dedicatedGrid)" />
          </svg>
        </div>
      </div>

      <div style={{ maxWidth: "1220px", margin: "0 auto", padding: "0 15px", position: "relative", zIndex: "10" }}>
        {/* Section Title */}
        <h2
          style={{
            fontSize: "30px",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "50px",
            lineHeight: "40px",
            letterSpacing: "-1px",
            color: "white"
          }}
        >
          Your Own Dedicated Team of <span style={{color: "#22D3EE"}}>Bellatrix</span>
        </h2>

        {/* Content Layout */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "50px",
            justifyContent: "space-between",
          }}
        >
          {/* Text Content with Bullet Points */}
          <div style={{ flex: "1", maxWidth: "50%" }}>
            <ul 
              style={{ 
                listStyle: "none", 
                padding: "0", 
                margin: "0",
                fontSize: "16px",
                lineHeight: "1.8"
              }}
            >
              <li style={{ 
                marginBottom: "20px",
                position: "relative",
                paddingLeft: "25px",
                display: "flex",
                alignItems: "flex-start"
              }}>
                <span style={{
                  content: "",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#22D3EE",
                  borderRadius: "50%",
                  position: "absolute",
                  left: "0",
                  top: "12px"
                }}></span>
                <span style={{color: "#D1D5DB"}}>A team will be assigned to you that is familiar with your organization, how you do things, and most importantly, your goals for your Bellatrix system</span>
              </li>
              
              <li style={{ 
                marginBottom: "20px",
                position: "relative",
                paddingLeft: "25px",
                display: "flex",
                alignItems: "flex-start"
              }}>
                <span style={{
                  content: "",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#22D3EE",
                  borderRadius: "50%",
                  position: "absolute",
                  left: "0",
                  top: "12px"
                }}></span>
                <span style={{color: "#D1D5DB"}}>A committed team familiar with your Bellatrix environment</span>
              </li>
              
              <li style={{ 
                marginBottom: "20px",
                position: "relative",
                paddingLeft: "25px",
                display: "flex",
                alignItems: "flex-start"
              }}>
                <span style={{
                  content: "",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#22D3EE",
                  borderRadius: "50%",
                  position: "absolute",
                  left: "0",
                  top: "12px"
                }}></span>
                <span style={{color: "#D1D5DB"}}>Experienced professionals, including a project lead and solution consultants</span>
              </li>
              
              <li style={{ 
                marginBottom: "20px",
                position: "relative",
                paddingLeft: "25px",
                display: "flex",
                alignItems: "flex-start"
              }}>
                <span style={{
                  content: "",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#22D3EE",
                  borderRadius: "50%",
                  position: "absolute",
                  left: "0",
                  top: "12px"
                }}></span>
                <span style={{color: "#D1D5DB"}}>Structured collaboration to avoid knowledge silos</span>
              </li>
              
              <li style={{ 
                marginBottom: "0",
                position: "relative",
                paddingLeft: "25px",
                display: "flex",
                alignItems: "flex-start"
              }}>
                <span style={{
                  content: "",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#22D3EE",
                  borderRadius: "50%",
                  position: "absolute",
                  left: "0",
                  top: "12px"
                }}></span>
                <span style={{color: "#D1D5DB"}}>Access to the collective expertise of a broad team of Bellatrix specialists</span>
              </li>
            </ul>
          </div>

          {/* Image */}
          <div style={{ flex: "1", maxWidth: "50%", textAlign: "center" }}>
            <div style={{
              position: "relative",
              background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              borderRadius: "16px",
              padding: "16px",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)"
            }}>
              <img
                src="/public/images/Support/team.jpeg"
                alt="ERP Implementation Team"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  brightness: "1.1",
                  contrast: "1.1",
                  saturate: "1.1"
                }}
              />
              <div style={{
                position: "absolute",
                inset: "16px",
                borderRadius: "12px",
                background: "linear-gradient(to top right, rgba(34, 211, 238, 0.05), transparent, rgba(34, 211, 238, 0.05))",
                pointerEvents: "none"
              }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DedicatedTeamSection;
