// Test for visibility filtering logic
console.log("=== Testing Visibility Filtering Logic ===");

// Helper function (copied from EnhancedPageBuilder.jsx)
const getVisibleComponents = (components, isEditMode = true) => {
  if (!Array.isArray(components)) return [];

  return components.filter((component) => {
    // In edit mode, show all components
    if (isEditMode) {
      return true;
    }

    // In view mode, only show visible components
    // Handle both boolean and integer values for isVisible
    return component.isVisible === true || component.isVisible === 1;
  });
};

// Test data
const testComponents = [
  { id: 1, componentName: "Header", isVisible: true },
  { id: 2, componentName: "Hidden Section", isVisible: false },
  { id: 3, componentName: "Footer", isVisible: 1 },
  { id: 4, componentName: "Draft Content", isVisible: 0 },
  { id: 5, componentName: "Main Content", isVisible: true },
];

console.log("\nOriginal components:", testComponents.length);
console.log(
  "Components:",
  testComponents.map((c) => `${c.componentName} (visible: ${c.isVisible})`)
);

console.log("\n=== EDIT MODE (shows all) ===");
const editModeResults = getVisibleComponents(testComponents, true);
console.log("Filtered components:", editModeResults.length);
console.log(
  "Components:",
  editModeResults.map((c) => `${c.componentName} (visible: ${c.isVisible})`)
);

console.log("\n=== VIEW MODE (shows only visible) ===");
const viewModeResults = getVisibleComponents(testComponents, false);
console.log("Filtered components:", viewModeResults.length);
console.log(
  "Components:",
  viewModeResults.map((c) => `${c.componentName} (visible: ${c.isVisible})`)
);

console.log("\n=== Test Summary ===");
console.log(
  `✅ Edit Mode: ${
    editModeResults.length === 5 ? "PASS" : "FAIL"
  } - Should show all 5 components`
);
console.log(
  `✅ View Mode: ${
    viewModeResults.length === 3 ? "PASS" : "FAIL"
  } - Should show only 3 visible components`
);

// Expected hidden components in view mode
const hiddenInViewMode = testComponents
  .filter((c) => c.isVisible === false || c.isVisible === 0)
  .map((c) => c.componentName);

console.log(`Hidden in view mode: ${hiddenInViewMode.join(", ")}`);

console.log("\n🎉 Visibility filtering test completed!");
