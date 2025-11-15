/**
 * Route configuration for the application
 * Separated from App.jsx for better organization
 */

export const publicRoutes = [
  { path: "/", element: "LandingPage" },
  { path: "Home", element: "LandingPage" },
  { path: "Implementation", element: "MainServices" },
  { path: "Training", element: "MainServices" },
  { path: "netsuite-consulting", element: "MainServices" },
  { path: "customization", element: "MainServices" },
  { path: "integration", element: "MainServices" },
  { path: "Support", element: "MainServices" },
  { path: "about", element: "About" },
  { path: "HRSolution", element: "SolutionMain" },
  { path: "/hr", element: "HRPage" },
  { path: "/Payroll", element: "PayrollPage" },
  { path: "/industries/manufacturing", element: "Manufacturing" },
  { path: "/industries/retail", element: "Retail" },
];

export const adminRoutes = [
  { path: "", element: "ModernDashboard" },
  { path: "dashboard", element: "ModernDashboard" },
  { path: "auth-dashboard", element: "AuthDashboard" },
  { path: "pages", element: "PagesManagement" },
  { path: "pages/:pageId", element: "PagesManagement" },
  { path: "categories", element: "CategoriesManagement" },
  { path: "pages/enhanced-create", element: "EnhancedPageBuilder" },
  { path: "templates", element: "TemplatesManagement" },
  { path: "templates/:templateId", element: "TemplatesManagement" },
  { path: "messages", element: "MessagesPage" },
  { path: "settings", element: "SettingsManagement" },
];

export const legacyAdminRoutes = [
  { path: "", element: "AdminDashboard" },
  { path: "pages", element: "AdminDashboard" },
  { path: "pages/:pageId", element: "AdminDashboard" },
  { path: "templates", element: "AdminDashboard" },
  { path: "settings", element: "AdminDashboard" },
];

