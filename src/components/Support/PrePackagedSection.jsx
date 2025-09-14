import React from "react";

const PrePackagedSection = () => {
  return (
    <section
      className="light-section"
      style={{
        backgroundColor: "#f7f7f7",
        padding: "60px 25px 50px 25px",
        margin: "100px auto",
        borderRadius: "15px",
        boxShadow:
          "0px 4px 16px rgba(0, 0, 0, 0.1), 0px 8px 32px rgba(0, 0, 0, 0.05)",
        opacity: 0.9,
        color: "#000",
        textAlign: "center",
        fontFamily: '"Gotham A", "Gotham B"',
        width: "80%",
    
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 15px" }}>
        <h2
          style={{
            fontSize: "30px",
            marginBottom: "40px",
            letterSpacing: "-1px",
            fontWeight:"bold",
            textTransform:"uppercase",
            fontFamily:"Gotham A , san-saif",
          }}  
        >
          Pre-Packaged, Yet Flexible
        </h2>
        <p style={{ fontSize: "19px", lineHeight: "1.6" }}>
          By leveraging our 18 years of experience, we’ve come up with the
          perfect package that allows you to rely on our expertise to schedule
          the required resources while keeping you in control over how the
          resources are spent, and for what.
        </p>
      </div>
    </section>
  );
};

export default PrePackagedSection;
