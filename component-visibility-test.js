/**
 * Component Visibility Test
 * 
 * This test demonstrates how the isVisible property affects component rendering
 * in different modes (Edit vs View).
 */

// Mock component data to test visibility
const mockPageData = {
  components: [
    {
      id: 1,
      componentType: "HeroSection",
      componentName: "Hero Section",
      isVisible: true,  // Will show in both modes
      theme: 1,
      contentJson: JSON.stringify({
        title: "Welcome Hero",
        subtitle: "This component is visible"
      })
    },
    {
      id: 2,
      componentType: "FeaturesSection", 
      componentName: "Features Section",
      isVisible: false, // Will only show in edit mode
      theme: 2,
      contentJson: JSON.stringify({
        title: "Hidden Features",
        subtitle: "This component is hidden in view mode"
      })
    },
    {
      id: 3,
      componentType: "CTASection",
      componentName: "CTA Section", 
      isVisible: true,  // Will show in both modes
      theme: 1,
      contentJson: JSON.stringify({
        title: "Call to Action",
        subtitle: "This component is visible"
      })
    },
    {
      id: 4,
      componentType: "TestimonialSection",
      componentName: "Testimonial Section",
      isVisible: false, // Will only show in edit mode
      theme: 2,
      contentJson: JSON.stringify({
        title: "Hidden Testimonials", 
        subtitle: "This component is hidden in view mode"
      })
    }
  ]
};

// Simulate the visibility filtering logic
function testVisibilityFiltering() {
  console.log("🧪 Testing Component Visibility Filtering");
  console.log("=" .repeat(50));
  
  const components = mockPageData.components;
  console.log(`📊 Total components: ${components.length}`);
  
  // Test Edit Mode (should show all components)
  console.log("\n🔧 EDIT MODE - Show All Components:");
  const editModeComponents = components; // In edit mode, show all
  editModeComponents.forEach((comp, index) => {
    console.log(`  ${index + 1}. ${comp.componentName} (isVisible: ${comp.isVisible}) ✅ RENDERED`);
  });
  console.log(`📈 Edit Mode Result: ${editModeComponents.length}/${components.length} components rendered`);
  
  // Test View Mode (should only show visible components)
  console.log("\n👁️ VIEW MODE - Show Only Visible Components:");
  const viewModeComponents = components.filter(comp => comp.isVisible === true || comp.isVisible === 1);
  viewModeComponents.forEach((comp, index) => {
    console.log(`  ${index + 1}. ${comp.componentName} (isVisible: ${comp.isVisible}) ✅ RENDERED`);
  });
  
  // Show hidden components
  const hiddenComponents = components.filter(comp => !(comp.isVisible === true || comp.isVisible === 1));
  hiddenComponents.forEach((comp) => {
    console.log(`  ❌ ${comp.componentName} (isVisible: ${comp.isVisible}) HIDDEN`);
  });
  
  console.log(`📈 View Mode Result: ${viewModeComponents.length}/${components.length} components rendered`);
  
  // Summary
  console.log("\n📋 SUMMARY:");
  console.log(`✅ Visible Components (show in both modes): ${viewModeComponents.length}`);
  console.log(`❌ Hidden Components (edit mode only): ${hiddenComponents.length}`);
  console.log(`🔧 Edit Mode Total: ${editModeComponents.length} components`);
  console.log(`👁️ View Mode Total: ${viewModeComponents.length} components`);
  
  return {
    totalComponents: components.length,
    visibleInBothModes: viewModeComponents.length,
    editModeOnly: hiddenComponents.length,
    editModeTotal: editModeComponents.length,
    viewModeTotal: viewModeComponents.length
  };
}

// Run the test
if (typeof window !== 'undefined') {
  // Browser environment
  window.testComponentVisibility = testVisibilityFiltering;
  console.log("🎯 Component Visibility Test loaded! Run testComponentVisibility() in console.");
} else {
  // Node.js environment
  testVisibilityFiltering();
}

export { testVisibilityFiltering, mockPageData };