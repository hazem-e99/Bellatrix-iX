/**
 * Theme Switcher Test Script
 *
 * استخدم هذا السكريبت في browser console لاختبار تبديل الثيم
 */

console.log("🎨 Theme Switcher Test Script loaded!");

// Test functions
window.testThemeSwitcher = {
  // Switch to black/dark theme
  activateDark: () => {
    document.documentElement.setAttribute("data-theme", "purple");
    console.log("� Black/Dark theme activated!");
    console.log("CSS Variables should now be:");
    console.log("--color-brand-dark-navy: #0a0a0a");
    console.log("--color-brand-variant: #262626");
    console.log("--color-brand-accent: #333333");
    console.log("--color-text-primary: #ffffff (white text)");
    console.log("--color-bg-primary: #0a0a0a (black background)");
  },

  // Switch back to default (blue) theme
  activateBlue: () => {
    document.documentElement.removeAttribute("data-theme");
    console.log("💙 Blue (default) theme activated!");
    console.log("CSS Variables should now be:");
    console.log("--color-brand-dark-navy: #001038");
    console.log("--color-brand-variant: #001248");
    console.log("--color-brand-accent: #001458");
  },

  // Auto-switch demo
  demo: () => {
    let isBlue = true;
    const interval = setInterval(() => {
      if (isBlue) {
        window.testThemeSwitcher.activateDark();
      } else {
        window.testThemeSwitcher.activateBlue();
      }
      isBlue = !isBlue;
    }, 2000);

    console.log("🎭 Auto-switching demo started! Switching every 2 seconds...");
    console.log("To stop demo: clearInterval(" + interval + ")");

    // Auto-stop after 10 switches
    setTimeout(() => {
      clearInterval(interval);
      window.testThemeSwitcher.activateBlue();
      console.log("✅ Demo completed! Back to blue theme.");
    }, 20000);

    return interval;
  },

  // Check current computed values
  checkValues: () => {
    const root = document.documentElement;
    const style = getComputedStyle(root);

    console.log("🔍 Current CSS Variable Values:");
    console.log(
      "--color-brand-dark-navy:",
      style.getPropertyValue("--color-brand-dark-navy")
    );
    console.log(
      "--color-brand-variant:",
      style.getPropertyValue("--color-brand-variant")
    );
    console.log(
      "--color-brand-accent:",
      style.getPropertyValue("--color-brand-accent")
    );
    console.log(
      "--color-text-primary:",
      style.getPropertyValue("--color-text-primary")
    );
    console.log(
      "--color-bg-primary:",
      style.getPropertyValue("--color-bg-primary")
    );

    const theme = root.getAttribute("data-theme");
    console.log("Current theme:", theme || "default (blue)");
  },
};

// Usage instructions
console.log(`
📋 Usage Instructions:
1. testThemeSwitcher.activateDark() - Switch to black/dark theme
2. testThemeSwitcher.activateBlue() - Switch to blue theme  
3. testThemeSwitcher.demo() - Auto-switching demo
4. testThemeSwitcher.checkValues() - Check current values

🎯 Expected Theme-Aware Elements:
- HeroSection: Background animation, gradients, CTA button
- ChallengesSection: Icon gradients, impact boxes, navigation dots
- CaseStudiesSection: Highlight text and check icons  
- FeaturesSection: Icon gradients, feature dots, highlight text
- SolutionsSection: Primary text color
- IndustryStats: Value text color
- Loading spinner: Border color

🔄 All elements should smoothly transition (0.6s) between themes:
- Blue theme: Navy blues, cyans, and blue accents
- Black/Dark theme: Black backgrounds with white text, gray accents
- Text automatically becomes white on dark backgrounds for readability
`);
