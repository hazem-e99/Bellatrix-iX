// KeyModulesSection.jsx
import React from "react";
import SEO from "../../SEO";
import ModuleCard from "./ModuleCard";

const KeyModulesSection = ({ keyModulesSection, keyModules, renderIcon }) => {
  return (
    <>
      <SEO
        title="Oracle NetSuite Training Modules | Comprehensive ERP Learning Curriculum"
        description="Explore key Oracle NetSuite training modules covering implementation, financials, inventory, CRM, and advanced customization for comprehensive ERP education and skill development."
        keywords="NetSuite training modules, Oracle ERP curriculum, NetSuite learning modules, ERP training courses, NetSuite education modules, Oracle training curriculum"
        ogTitle="NetSuite Training Modules - Comprehensive Oracle ERP Learning"
        ogDescription="Master Oracle NetSuite with structured training modules. Comprehensive curriculum covering all aspects of ERP implementation and management."
        ogImage="/images/netsuite-training-modules.jpg"
      />
      <section
        className="py-12 relative overflow-hidden animate-background-glow"
        style={{
          backgroundColor: "#001038",
        }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* ... (keep all background effects) ... */}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <header className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {keyModulesSection.title.split(" ")[0]}{" "}
              <span className="text-blue-400">
                {keyModulesSection.title.split(" ").slice(1).join(" ")}
              </span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {keyModulesSection.description}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyModules.map((module, index) => (
              <ModuleCard
                key={index}
                module={module}
                index={index}
                renderIcon={renderIcon}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default KeyModulesSection;
