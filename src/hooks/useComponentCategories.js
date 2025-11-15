import { useMemo } from "react";

export const useComponentCategories = (availableComponents, searchTerm) => {
  const categories = useMemo(() => {
    const searchFilteredComponents = searchTerm.trim()
      ? availableComponents.filter((comp) => {
          const search = searchTerm.toLowerCase().trim();
          return (
            comp.name.toLowerCase().includes(search) ||
            comp.componentType.toLowerCase().includes(search) ||
            comp.category.toLowerCase().includes(search) ||
            comp.description.toLowerCase().includes(search)
          );
        })
      : availableComponents;

    const categoryCounts = {};
    searchFilteredComponents.forEach((comp) => {
      categoryCounts[comp.category] = (categoryCounts[comp.category] || 0) + 1;
    });

    const dynamicCategories = [
      {
        id: "all",
        name: "All Components",
        icon: "📦",
        count: searchFilteredComponents.length,
      },
    ];

    const uniqueCategories = [
      ...new Set(
        availableComponents
          .map((comp) => comp.category)
          .filter((category) => category && category !== "all")
      ),
    ];

    const categoryConfig = {
      layout: { name: "Layout", icon: "🎯" },
      content: { name: "Content", icon: "📝" },
      pricing: { name: "Pricing", icon: "💰" },
      faq: { name: "FAQ", icon: "❓" },
      cta: { name: "Call to Action", icon: "🚀" },
      about: { name: "About", icon: "👥" },
      hero: { name: "Hero", icon: "🌟" },
      solution: { name: "Solution", icon: "⚡" },
      services: { name: "Services", icon: "🔧" },
      industry: { name: "Industry", icon: "🏭" },
      features: { name: "Features", icon: "✨" },
      testimonials: { name: "Testimonials", icon: "💬" },
      contact: { name: "Contact", icon: "📞" },
      team: { name: "Team", icon: "👥" },
      portfolio: { name: "Portfolio", icon: "🎨" },
      blog: { name: "Blog", icon: "📰" },
      footer: { name: "Footer", icon: "🔗" },
      header: { name: "Header", icon: "📋" },
      navigation: { name: "Navigation", icon: "🧭" },
    };

    const sortedCategories = uniqueCategories.sort(
      (a, b) => (categoryCounts[b] || 0) - (categoryCounts[a] || 0)
    );

    sortedCategories.forEach((categoryId) => {
      const config = categoryConfig[categoryId] || {
        name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
        icon: "📄",
      };

      dynamicCategories.push({
        id: categoryId,
        name: config.name,
        icon: config.icon,
        count: categoryCounts[categoryId] || 0,
      });
    });

    return dynamicCategories;
  }, [availableComponents, searchTerm]);

  return categories;
};

