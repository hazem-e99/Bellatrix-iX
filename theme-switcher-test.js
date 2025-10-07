/**
 * Theme Switcher Test Script
 *
 * استخدم هذا السكريبت في browser console لاختبار تبديل الثيم
 */

console.log("🎨 Theme Switcher Test Script loaded!");

// Test functions
window.testThemeSwitcher = {
  // Switch to purple theme
  activatePurple: () => {
    document.documentElement.setAttribute("data-theme", "purple");
    console.log("💜 Purple theme activated!");
    console.log("CSS Variables should now be:");
    console.log("--color-brand-dark-navy: #2e004f");
    console.log("--color-brand-variant: #3d006b");
    console.log("--color-brand-accent: #4b0082");
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
        window.testThemeSwitcher.activatePurple();
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

    const theme = root.getAttribute("data-theme");
    console.log("Current theme:", theme || "default (blue)");
  },
};

// Usage instructions
console.log(`
📋 Usage Instructions:
1. testThemeSwitcher.activatePurple() - Switch to purple theme
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
- Purple theme: Deep purples, light purples, and purple accents
`);
