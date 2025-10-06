import React from "react";

const ProcessSection = ({ title, steps }) => {
  // Debug logging for received props
  console.log("🔧 [CUSTOMIZATION PROCESS COMPONENT] Received props:", {
    title,
    steps,
    stepsType: typeof steps,
    stepsLength: steps?.length,
    firstStep: steps?.[0],
  });

  // Default data fallback
  const defaultSteps = [
    {
      title: "Requirements",
      description: "Gather and analyze your needs",
      step: "01",
    },
    {
      title: "Design",
      description: "Create solution blueprint",
      step: "02",
    },
    {
      title: "Development",
      description: "Build and test customizations",
      step: "03",
    },
    {
      title: "Deployment",
      description: "Implement and train users",
      step: "04",
    },
  ];

  const displaySteps = steps && steps.length > 0 ? steps : defaultSteps;

  console.log("🔧 [CUSTOMIZATION PROCESS COMPONENT] Final display data:", {
    title: title || "Customization Process",
    stepsCount: displaySteps.length,
    steps: displaySteps,
    usingProps: steps && steps.length > 0,
  });

  return (
    <section className="py-20 bg-[var(--color-bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-[var(--color-primary-dark)] text-center">
          {title || "Customization Process"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {displaySteps.map((process, index) => {
            console.log(`🔧 [CUSTOMIZATION PROCESS RENDER] Step ${index}:`, {
              title: process.title,
              description: process.description,
              step: process.step,
              hasStep: !!process.step,
            });

            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[var(--color-primary)] text-[var(--color-text-inverse)] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step || String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-3">
                  {process.title}
                </h3>
                <p className="text-[var(--color-text-muted)]">
                  {process.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
