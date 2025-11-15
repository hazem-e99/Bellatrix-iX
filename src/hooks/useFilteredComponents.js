import { useMemo } from "react";

export const useFilteredComponents = (
  availableComponents,
  selectedCategory,
  searchTerm
) => {
  const filteredComponents = useMemo(() => {
    let filtered = availableComponents;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((comp) => comp.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (comp) =>
          comp.name.toLowerCase().includes(search) ||
          comp.componentType.toLowerCase().includes(search) ||
          comp.category.toLowerCase().includes(search) ||
          comp.description.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [availableComponents, selectedCategory, searchTerm]);

  return filteredComponents;
};

