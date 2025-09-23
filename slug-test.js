import { pageUtils } from "./src/services/pagesService.js";

// Test slug generation
console.log("Single character slug 'h':", pageUtils.generateSlug("h"));

// Test validation with simple slug from screenshot
const testPage = {
  name: "HR Department",
  categoryId: 1,
  slug: "h",
};

// Check validation
const validationResult = pageUtils.validatePageData(testPage);
console.log("Validation result:", validationResult);
console.log("Is valid:", validationResult.length === 0);
console.log("Page data:", testPage);
