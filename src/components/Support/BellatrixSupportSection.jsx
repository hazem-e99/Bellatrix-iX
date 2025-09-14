import React from "react";

// Component for each support card
const SupportCard = ({ title, items }) => (
  <div style={styles.card}>
    <h3 style={styles.cardTitle}>{title}</h3>
    <ul style={styles.list}>
      {items.map((item, index) => (
        <li key={index} style={styles.listItem}>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// Main component
const BellatrixSupportSection = () => {
  const adminSupport = [
    "Ongoing Bellatrix administration",
    "Maintain secure access",
    "Data cleansing and upload",
    "Data administration & maintenance",
    "Help with optimizing the usage of Bellatrix",
    "Monitor usage & transactions",
    "Provide support for your IT team on technical issues",
    "Create new users, roles",
    "Create Saved searches",
    "General support, analytics",
    "Upgrades and testing",
  ];

  const functionalSupport = [
    "End User Support",
    "Answer How To Questions",
    "Provide solutions for business requirements",
    "Train new users",
    "Help in performing functional tasks and transactions",
    "Help your IT team in resolving end user requests",
    "Help in running reports/ dashboards",
    "Help with using best practices of Bellatrix",
    "Monitor functional usage and transactions",
    "Year and month end processes",
  ];

  const developmentSupport = [
    "Create New reports",
    "Create New dashboards",
    "Create or manage automated processes with Bellatrix SuiteFlows",
    "Enhance Bellatrix functionality with scripting using Bellatrix SuiteScripts",
    "Create Forms",
    "Integrations",
    "Installation of Suite Bundle as required",
  ];

  return (
    <section style={styles.section}>
      {/* Background Pattern */}
      <div style={styles.backgroundPattern}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ color: "#93c5fd" }}>
            <pattern id="supportGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.3"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#supportGrid)" />
          </svg>
        </div>
      </div>

      <div style={styles.container}>
        <h2 style={styles.heading}>
          Your One-Stop-Shop for <span style={styles.headingSpan}>Bellatrix Support</span>
        </h2>
        <p style={styles.paragraph}>
          Your business, and how you run it, is very unique. So is your
          Bellatrix instance and required support. Our consultants are well
          versed in a multitude of different areas to ensure that regardless of
          the level of support that you require, we can assist you.
        </p>
        <p style={styles.paragraph}>
          Whether you're in need of functional support, administrator support,
          development support, or all the above, SherpaCare is the answer.
        </p>

        <div style={styles.cardsContainer}>
          <SupportCard title="Admin Support" items={adminSupport} />
          <SupportCard title="Functional Support" items={functionalSupport} />
          <SupportCard title="Development Support" items={developmentSupport} />
        </div>
      </div>
    </section>
  );
};

export default BellatrixSupportSection;

// === Styles ===
const styles = {
  section: {
    backgroundColor: "#001038",
    padding: "50px 0",
    color: "#ffffff",
    fontFamily: '"Gotham A", "Gotham B"',
    position: "relative",
    overflow: "hidden",
  },
  container: {
    maxWidth: "1220px",
    margin: "0 auto",
    padding: "0 15px",
    position: "relative",
    zIndex: 10,
  },
  heading: {
    fontSize: "36px",
    fontWeight: "900",
    textAlign: "center",
    marginBottom: "30px",
    letterSpacing: "-1px",
    color: "#ffffff",
    textTransform: "capitalize",
  },
  headingSpan: {
    color: "#22d3ee", // cyan-400
  },
  paragraph: {
    textAlign: "center",
    fontSize: "15px",
    lineHeight: "24px",
    marginBottom: "15px",
    color: "#d1d5db", // gray-300
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "20px",
    marginTop: "40px",
  },
  card: {
    flex: "1 1 calc(33.333% - 20px)",
    minWidth: "300px",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(4px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },
  cardHover: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "15px",
    letterSpacing: "-1px",
    borderBottom: "2px solid rgba(34, 211, 238, 0.3)", // cyan-400 with opacity
    paddingBottom: "10px",
    display: "inline-block",
    paddingLeft: "10px",
    paddingRight: "10px",
    color: "#22d3ee", // cyan-400
  },
  list: {
    margin: 0,
    listStyle: "disc",
    paddingLeft: "30px",
  },
  listItem: {
    marginBottom: "10px",
    display: "list-item",
    color: "#d1d5db", // gray-300
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.1,
    zIndex: 1,
  },
};
