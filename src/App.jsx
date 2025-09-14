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

// Modern Admin Components
import AdminLayout from "./components/Layout/AdminLayout";
import ModernDashboard from "./components/Dashboard/ModernDashboard";
import PagesManagement from "./components/Pages/PagesManagement";
import TemplatesManagement from "./components/Templates/TemplatesManagement";
import SettingsManagement from "./components/Settings/SettingsManagement";
import { NotificationProvider } from "./components/UI/Notifications";
function App() {
  return (
    <NotificationProvider>
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
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ModernDashboard />} />
          <Route path="pages" element={<PagesManagement />} />
          <Route path="pages/:pageId" element={<PagesManagement />} />
          <Route path="templates" element={<TemplatesManagement />} />
          <Route path="templates/:templateId" element={<TemplatesManagement />} />
          <Route path="settings" element={<SettingsManagement />} />
          <Route path="analytics" element={<div className="p-8 text-center">Analytics Coming Soon</div>} />
          <Route path="users" element={<div className="p-8 text-center">User Management Coming Soon</div>} />
          <Route path="notifications" element={<div className="p-8 text-center">Notifications Coming Soon</div>} />
        </Route>
      </Routes>
    </NotificationProvider>
  );
}

export default App;
