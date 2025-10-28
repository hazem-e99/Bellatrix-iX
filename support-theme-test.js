/**
 * BellatrixSupportHero Theme Switcher Test
 *
 * Test script to verify theme switching functionality for Support Hero component
 */

console.log("🎨 BellatrixSupportHero Theme Test loaded!");

window.testSupportTheme = {
  // Test theme switching on Support page
  testSwitching: () => {
    console.log("🔄 Testing theme switching for BellatrixSupportHero...");

    let isBlue = true;
    const interval = setInterval(() => {
      if (isBlue) {
        document.documentElement.setAttribute("data-theme", "purple");
        console.log("� Switched to black/dark theme");
      } else {
        document.documentElement.removeAttribute("data-theme");
        console.log("💙 Switched to blue theme");
      }
      isBlue = !isBlue;
    }, 3000);

    setTimeout(() => {
      clearInterval(interval);
      document.documentElement.removeAttribute("data-theme");
      console.log("✅ Theme switching test completed");
    }, 15000);

    return interval;
  },

  // Check current CSS values
  checkSupportValues: () => {
    const root = document.documentElement;
    const style = getComputedStyle(root);

    console.log("🔍 Current Support Hero CSS Values:");
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
      "--color-brand-deep:",
      style.getPropertyValue("--color-brand-deep")
    );
    console.log(
      "--color-brand-navy:",
      style.getPropertyValue("--color-brand-navy")
    );
    console.log(
      "--color-cyan-300:",
      style.getPropertyValue("--color-cyan-300")
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

  // Manual theme controls
  setDark: () => {
    document.documentElement.setAttribute("data-theme", "purple");
    console.log("� Black/Dark theme activated!");
  },

  setBlue: () => {
    document.documentElement.removeAttribute("data-theme");
    console.log("💙 Blue theme activated!");
  },
};

console.log(`
📋 BellatrixSupportHero Testing Commands:
1. testSupportTheme.testSwitching() - Auto theme switching test
2. testSupportTheme.setDark() - Switch to black/dark theme
3. testSupportTheme.setBlue() - Switch to blue theme
4. testSupportTheme.checkSupportValues() - Check current CSS values

🎯 Elements to watch during theme switching:
✅ Header background color (should use background-glow animation)
✅ Floating gradient elements (3 decorative elements)
✅ CTA button background and border
✅ SVG pattern color
✅ All transitions should be smooth (0.6s)

Expected behavior:
- Blue theme: Navy/deep blue backgrounds with cyan accents
- Black/Dark theme: Black backgrounds with white text and gray accents
- Smooth animated transitions between colors
- Text automatically becomes white on dark backgrounds for readability
`);
