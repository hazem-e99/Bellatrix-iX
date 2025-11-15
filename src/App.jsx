import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import MainServices from "./components/Services/MainServices";
import About from "./pages/About";
import HRPage from "./pages/HrPage/HR";
import SolutionMain from "./components/solution/SolutionMain";
import Manufacturing from "./pages/Industries/Manufacturing";
import Retail from "./pages/Industries/Retail";
import PayrollPage from "./pages/Payroll";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminLayout from "./components/Admin/AdminLayout";
import ModernAdminLayout from "./components/Admin/ModernAdminLayout";
import ModernDashboard from "./components/Admin/ModernDashboard";
import PagesManagement from "./components/Admin/PagesManagement/index";
import CategoriesManagement from "./components/Admin/CategoriesManagement";
import EnhancedPageBuilder from "./components/Admin/EnhancedPageBuilder";
import TemplatesManagement from "./components/Admin/TemplatesManagement";
import SettingsManagement from "./components/Admin/SettingsManagement";
import MessagesPage from "./pages/Admin/MessagesPage";
import DynamicPageRenderer from "./components/DynamicPageRenderer/index";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { CTAModalProvider } from "./contexts/CTAModalContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoutes from "./routes/AuthRoutes";
import AuthDashboard from "./components/Admin/AuthDashboard";
import { toastConfig } from "./config/toast";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CTAModalProvider>
          <Toaster {...toastConfig} />
          <Routes>
            {/* Authentication Routes */}
            <Route path="/auth/*" element={<AuthRoutes />} />

            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="Home" element={<LandingPage />} />
              <Route path="Implementation" element={<MainServices />} />
              <Route path="Training" element={<MainServices />} />
              <Route path="netsuite-consulting" element={<MainServices />} />
              <Route path="customization" element={<MainServices />} />
              <Route path="integration" element={<MainServices />} />
              <Route path="Support" element={<MainServices />} />
              <Route path="about" element={<About />} />
              <Route path="HRSolution" element={<SolutionMain />} />
              <Route path="/hr" element={<HRPage />} />
              {/* <Route path="Payroll" element={<SolutionMain />} /> */}
              <Route path="/Payroll" element={<PayrollPage />} />
              <Route
                path="/industries/manufacturing"
                element={<Manufacturing />}
              />
              <Route path="/industries/retail" element={<Retail />} />

              {/* Dynamic Page Routes - This should be last to catch all dynamic pages */}
              <Route path="/:slug" element={<DynamicPageRenderer />} />

              {/* 
            <Route path="Support" element={<Support />} />
            <Route path="industries/manufacturing" element={<IndustryMain />} />
            <Route path="industries/retail" element={<IndustryMain />} />
            Add more industry routes as needed, all handled by IndustryMain 
            */}
            </Route>

            {/* Protected Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <ModernAdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<ModernDashboard />} />
              <Route path="dashboard" element={<ModernDashboard />} />
              <Route path="auth-dashboard" element={<AuthDashboard />} />
              <Route path="pages" element={<PagesManagement />} />
              <Route path="pages/:pageId" element={<PagesManagement />} />
              <Route path="categories" element={<CategoriesManagement />} />
              <Route
                path="pages/enhanced-create"
                element={<EnhancedPageBuilder />}
              />
              <Route path="templates" element={<TemplatesManagement />} />
              <Route
                path="templates/:templateId"
                element={<TemplatesManagement />}
              />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="settings" element={<SettingsManagement />} />
            </Route>

            {/* Legacy Admin Routes (keep for compatibility) - Also Protected */}
            <Route
              path="/admin-legacy/*"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="pages" element={<AdminDashboard />} />
              <Route path="pages/:pageId" element={<AdminDashboard />} />
              <Route path="templates" element={<AdminDashboard />} />
              <Route path="settings" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </CTAModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
