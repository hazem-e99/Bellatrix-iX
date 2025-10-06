import React from "react";

const ServicesContent = ({ title, items }) => {
  // Debug logging for received props
  console.log("🔧 [CUSTOMIZATION SERVICES COMPONENT] Received props:", {
    title,
    items,
    itemsType: typeof items,
    itemsLength: items?.length,
    firstItem: items?.[0],
    firstItemName: items?.[0]?.name,
    firstItemTitle: items?.[0]?.title,
  });

  // Default data fallback
  const defaultItems = [
    {
      name: "Workflows",
      title: "Workflows",
      description: "Automate approvals and processes",
      icon: "⚙️",
    },
    {
      name: "Scripts",
      title: "Scripts",
      description: "Server and client logic",
      icon: "💻",
    },
    {
      name: "UI",
      title: "UI",
      description: "Forms, fields, and dashboards",
      icon: "🎨",
    },
    {
      name: "Reports",
      title: "Reports",
      description: "Custom reporting and analytics",
      icon: "📊",
    },
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  console.log("🔧 [CUSTOMIZATION SERVICES COMPONENT] Final display data:", {
    title: title || "What We Customize",
    itemsCount: displayItems.length,
    items: displayItems,
    usingProps: items && items.length > 0,
  });

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-10 text-[var(--color-primary-dark)] text-center">
        {title || "What We Customize"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayItems.map((service, index) => {
          console.log(`🔧 [CUSTOMIZATION SERVICES RENDER] Service ${index}:`, {
            name: service.name,
            title: service.title,
            description: service.description,
            icon: service.icon,
            hasName: !!service.name,
            hasTitle: !!service.title,
          });

          return (
            <div
              key={index}
              className="bg-[var(--color-bg-primary)] rounded-xl shadow-lg p-6 border border-[var(--color-border-secondary)] hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-3">
                {service.name || service.title || `Service ${index + 1}`}
              </h3>
              <p className="text-[var(--color-text-muted)]">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesContent;
