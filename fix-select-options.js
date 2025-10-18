/**
 * Script to fix all select field options in generalComponentSchemas.js
 * Converts simple string arrays to proper option objects with labels
 */

// Common button variants mapping
const buttonVariants = {
  primary: "Primary Button",
  secondary: "Secondary Button",
  outline: "Outline Button",
  ghost: "Ghost Button",
};

// Common background colors mapping
const backgroundColors = {
  white: "White",
  "light-gray": "Light Gray",
  gray: "Gray",
  dark: "Dark",
  blue: "Blue",
  transparent: "Transparent",
  "#ffffff": "White",
  "#f8f9fa": "Light Gray",
};

// Common layout options
const layoutOptions = {
  grid: "Grid Layout",
  list: "List Layout",
  card: "Card Layout",
  masonry: "Masonry Layout",
};

// Common animation types
const animationTypes = {
  fade: "Fade Animation",
  slide: "Slide Animation",
  bounce: "Bounce Animation",
  none: "No Animation",
};

// Training levels
const trainingLevels = {
  Beginner: "Beginner Level",
  Intermediate: "Intermediate Level",
  Advanced: "Advanced Level",
  Expert: "Expert Level",
};

// Training formats
const trainingFormats = {
  "In-Person": "In-Person Training",
  Virtual: "Virtual Training",
  Hybrid: "Hybrid Training",
  "Self-Paced": "Self-Paced Learning",
};

// System types for migration
const systemTypes = {
  ERP: "ERP System",
  CRM: "CRM System",
  Accounting: "Accounting Software",
  "E-commerce": "E-commerce Platform",
  Database: "Database System",
  Spreadsheet: "Spreadsheet Files",
  Other: "Other System",
};

// Priority levels
const priorityLevels = {
  Critical: "Critical Priority",
  High: "High Priority",
  Medium: "Medium Priority",
  Low: "Low Priority",
};

// Complexity levels
const complexityLevels = {
  Simple: "Simple Complexity",
  Medium: "Medium Complexity",
  Complex: "Complex",
  "Very Complex": "Very Complex",
  Low: "Low Complexity",
  High: "High Complexity",
  "Very High": "Very High Complexity",
};

// Frequency options
const frequencyOptions = {
  "Real-time": "Real-time Updates",
  Hourly: "Every Hour",
  Daily: "Daily",
  Weekly: "Weekly",
  Monthly: "Monthly",
  Quarterly: "Quarterly",
  Annually: "Annually",
  "On-Demand": "On-Demand Only",
};

// Audience types
const audienceTypes = {
  Executive: "Executive Level",
  Management: "Management Level",
  Operations: "Operations Team",
  Finance: "Finance Team",
  Sales: "Sales Team",
  "All Users": "All Users",
};

// Report types
const reportTypes = {
  Financial: "Financial Reports",
  Sales: "Sales Reports",
  Inventory: "Inventory Reports",
  Customer: "Customer Reports",
  Employee: "Employee Reports",
  Custom: "Custom Reports",
  Operational: "Operational Reports",
};

// Export formats
const exportFormats = {
  PDF: "PDF Format",
  Excel: "Excel Format",
  CSV: "CSV Format",
  Word: "Word Format",
};

// Chart types for visualization
const chartTypes = {
  "Line Chart": "Line Chart",
  "Bar Chart": "Bar Chart",
  "Pie Chart": "Pie Chart",
  "Scatter Plot": "Scatter Plot",
  Gauge: "Gauge Chart",
  Heatmap: "Heat Map",
  Funnel: "Funnel Chart",
  Treemap: "Tree Map",
  Table: "Data Table",
};

// Interactive features
const interactiveFeatures = {
  "Drill-down": "Drill-down Capability",
  Filters: "Interactive Filters",
  "Date Range": "Date Range Selection",
  "Hover Details": "Hover Details",
  Export: "Export Function",
  Annotations: "Add Annotations",
};

// Business impact levels
const businessImpactLevels = {
  High: "High Impact",
  Medium: "Medium Impact",
  Low: "Low Impact",
};

// KPI categories
const kpiCategories = {
  Financial: "Financial Metrics",
  Sales: "Sales Metrics",
  Operations: "Operations Metrics",
  Customer: "Customer Metrics",
  HR: "Human Resources",
  Marketing: "Marketing Metrics",
  "Supply Chain": "Supply Chain Metrics",
};

// Development methodologies
const developmentMethodologies = {
  Agile: "Agile Development",
  Waterfall: "Waterfall Method",
  Hybrid: "Hybrid Approach",
  DevOps: "DevOps Methodology",
};

console.log("✅ Option mappings defined for fixing select fields");

export {
  buttonVariants,
  backgroundColors,
  layoutOptions,
  animationTypes,
  trainingLevels,
  trainingFormats,
  systemTypes,
  priorityLevels,
  complexityLevels,
  frequencyOptions,
  audienceTypes,
  reportTypes,
  exportFormats,
  chartTypes,
  interactiveFeatures,
  businessImpactLevels,
  kpiCategories,
  developmentMethodologies,
};
