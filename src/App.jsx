import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import MainServices from "./components/Services/MainServices";
import About from "./pages/About";
// import HRSolution from "./pages/HrPage/HR";
import HRPage from "./pages/HrPage/HR";
import SolutionMain from "./components/solution/SolutionMain";
import Support from "./components/Support/Support";
import Manufacturing from "./pages/Industries/Manufacturing";
import Retail from "./pages/Industries/Retail";
import IndustryMain from "./components/industries/IndustryMain";
import PayrollPage from "./pages/Payroll";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminLayout from "./components/Admin/AdminLayout";
import ModernAdminLayout from "./components/Admin/ModernAdminLayout";
import ModernDashboard from "./components/Admin/ModernDashboard";
import PagesManagement from "./components/Admin/PagesManagement";
import TemplatesManagement from "./components/Admin/TemplatesManagement";
import TemplatesDashboard from "./pages/Templates/TemplatesDashboard";
import SettingsManagement from "./components/Admin/SettingsManagement";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Routes>
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
          <Route path="/industries/manufacturing" element={<Manufacturing />} />
          <Route path="/industries/retail" element={<Retail />} />

          {/* 
          <Route path="Support" element={<Support />} />
          <Route path="industries/manufacturing" element={<IndustryMain />} />
          <Route path="industries/retail" element={<IndustryMain />} />
          Add more industry routes as needed, all handled by IndustryMain 
          */}
        </Route>

        {/* Modern Admin Routes */}
        <Route path="/admin/*" element={<ModernAdminLayout />}>
          <Route index element={<ModernDashboard />} />
          <Route path="dashboard" element={<ModernDashboard />} />
          <Route path="pages" element={<PagesManagement />} />
          <Route path="pages/:pageId" element={<PagesManagement />} />
          <Route path="templates" element={<TemplatesDashboard />} />
          <Route path="templates-management" element={<TemplatesManagement />} />
          <Route
            path="templates/:templateId"
            element={<TemplatesDashboard />}
          />
          <Route path="settings" element={<SettingsManagement />} />
        </Route>

        {/* Legacy Admin Routes (keep for compatibility) */}
        <Route path="/admin-legacy/*" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="pages" element={<AdminDashboard />} />
          <Route path="pages/:pageId" element={<AdminDashboard />} />
          <Route path="templates" element={<AdminDashboard />} />
          <Route path="settings" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
