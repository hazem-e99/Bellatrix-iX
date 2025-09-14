import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
  Fab,
} from '@mui/material';
import {
  Pages as PagesIcon,
  ViewModule as SectionsIcon,
  Timeline as AnalyticsIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as PreviewIcon,
  Settings as SettingsIcon,
  ViewModule,
} from '@mui/icons-material';
import PageManager from '../../components/Admin/PageManager';
import TemplateManager from '../../components/Admin/TemplateManager';
import SettingsManager from '../../components/Admin/SettingsManager';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState([]);
  const [stats, setStats] = useState({
    totalPages: 0,
    totalSections: 0,
    lastUpdated: '',
  });

  // Load page data from JSON files
  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      // Simulate loading data from public/data files
      const dataFiles = [
        'homeData.json',
        'Implementation.json',
        'training.json',
        'netSuiteConsulting.json',
        'customization.json',
        'integration-data.json',
        'hr.json',
        'payroll.json',
        'manufacturing-data.json',
        'retail-data.json',
      ];

      const pages = dataFiles.map((file, index) => ({
        id: index + 1,
        name: file.replace('.json', '').replace('-data', '').replace(/([A-Z])/g, ' $1').trim(),
        fileName: file,
        status: 'Published',
        sections: Math.floor(Math.random() * 8) + 3, // Random number of sections
        lastModified: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
      }));

      setPageData(pages);
      setStats({
        totalPages: pages.length,
        totalSections: pages.reduce((sum, page) => sum + page.sections, 0),
        lastUpdated: new Date().toLocaleDateString(),
      });
    } catch (error) {
      console.error('Error loading page data:', error);
    }
  };

  const getCurrentView = () => {
    const path = location.pathname;
    if (path.includes('/pages')) return 'pages';
    if (path.includes('/templates')) return 'templates';
    if (path.includes('/settings')) return 'settings';
    return 'dashboard';
  };

  const renderDashboardOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="h4" className="text-slate-800 font-bold mb-2">
              Welcome back! 👋
            </Typography>
            <Typography variant="body1" className="text-slate-600">
              Here's what's happening with your content today.
            </Typography>
          </div>
          <div className="hidden md:block">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200">
              <Typography variant="caption" className="text-slate-500 font-medium">
                Last Login
              </Typography>
              <Typography variant="body2" className="text-slate-700 font-semibold">
                {new Date().toLocaleDateString()}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Typography variant="h3" className="text-slate-800 font-bold mb-1">
                    {stats.totalPages}
                  </Typography>
                  <Typography variant="body2" className="text-slate-600 font-medium">
                    Total Pages
                  </Typography>
                  <Typography variant="caption" className="text-green-600 font-medium mt-2 block">
                    ↗ 12% from last month
                  </Typography>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <PagesIcon sx={{ fontSize: 28, color: 'white' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Typography variant="h3" className="text-slate-800 font-bold mb-1">
                    {stats.totalSections}
                  </Typography>
                  <Typography variant="body2" className="text-slate-600 font-medium">
                    Total Sections
                  </Typography>
                  <Typography variant="caption" className="text-green-600 font-medium mt-2 block">
                    ↗ 8% from last week
                  </Typography>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <SectionsIcon sx={{ fontSize: 28, color: 'white' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Typography variant="h3" className="text-slate-800 font-bold mb-1">
                    98%
                  </Typography>
                  <Typography variant="body2" className="text-slate-600 font-medium">
                    Uptime
                  </Typography>
                  <Typography variant="caption" className="text-green-600 font-medium mt-2 block">
                    All systems operational
                  </Typography>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                  <AnalyticsIcon sx={{ fontSize: 28, color: 'white' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Typography variant="h3" className="text-slate-800 font-bold mb-1">
                    24
                  </Typography>
                  <Typography variant="body2" className="text-slate-600 font-medium">
                    Templates
                  </Typography>
                  <Typography variant="caption" className="text-blue-600 font-medium mt-2 block">
                    3 new this week
                  </Typography>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ViewModule sx={{ fontSize: 28, color: 'white' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Pages */}
      <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <div>
              <Typography variant="h6" className="text-slate-800 font-bold mb-1">
                Recent Pages
              </Typography>
              <Typography variant="body2" className="text-slate-600">
                Your latest content updates
              </Typography>
            </div>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/admin/pages')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl px-6 py-2"
            >
              New Page
            </Button>
          </Box>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-3">
            {pageData.slice(0, 5).map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                    {page.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 capitalize text-base">{page.name}</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      {page.sections} sections • Last modified: {page.lastModified}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Chip
                    label={page.status}
                    color={page.status === 'Published' ? 'success' : 'warning'}
                    size="small"
                    className={page.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}
                  />
                  <div className="flex items-center gap-1">
                    <IconButton 
                      size="small" 
                      title="Preview"
                      className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <PreviewIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      title="Edit" 
                      onClick={() => navigate(`/admin/pages/${page.id}`)}
                      className="hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      title="Delete" 
                      className="hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <Typography variant="h6" className="text-slate-800 font-bold mb-2">
                Quick Actions
              </Typography>
              <Typography variant="body2" className="text-slate-600">
                Common tasks to get you started
              </Typography>
            </div>
            <CardContent className="p-6">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className="h-16 border-2 border-dashed border-slate-300 text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl justify-start"
                    onClick={() => navigate('/admin/pages')}
                  >
                    <div className="text-left">
                      <div className="font-semibold">Create New Page</div>
                      <div className="text-xs opacity-70">Start building a new page</div>
                    </div>
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<SectionsIcon />}
                    className="h-16 border-2 border-dashed border-slate-300 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 rounded-xl justify-start"
                    onClick={() => navigate('/admin/templates')}
                  >
                    <div className="text-left">
                      <div className="font-semibold">Manage Templates</div>
                      <div className="text-xs opacity-70">Browse and edit templates</div>
                    </div>
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<SettingsIcon />}
                    className="h-16 border-2 border-dashed border-slate-300 text-slate-700 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 transition-all duration-200 rounded-xl justify-start"
                    onClick={() => navigate('/admin/settings')}
                  >
                    <div className="text-left">
                      <div className="font-semibold">Site Settings</div>
                      <div className="text-xs opacity-70">Configure your website</div>
                    </div>
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AnalyticsIcon />}
                    className="h-16 border-2 border-dashed border-slate-300 text-slate-700 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 transition-all duration-200 rounded-xl justify-start"
                    onClick={() => alert('Analytics coming soon!')}
                  >
                    <div className="text-left">
                      <div className="font-semibold">View Analytics</div>
                      <div className="text-xs opacity-70">Performance insights</div>
                    </div>
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Card className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <Typography variant="h6" className="text-slate-800 font-bold mb-2">
                System Status
              </Typography>
              <Typography variant="body2" className="text-slate-600">
                Everything is running smoothly
              </Typography>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-slate-700 font-medium">Data Files</span>
                  </div>
                  <Chip label="All Synced" color="success" size="small" className="bg-green-100 text-green-800" />
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700 font-medium">Last Backup</span>
                  </div>
                  <span className="text-sm text-slate-600 font-medium">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-violet-50 rounded-xl border border-violet-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    <span className="text-slate-700 font-medium">Templates</span>
                  </div>
                  <span className="text-sm text-slate-600 font-medium">12 available</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-slate-700 font-medium">Server Status</span>
                  </div>
                  <Chip label="Online" color="success" size="small" className="bg-green-100 text-green-800" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );

  const currentView = getCurrentView();

  return (
    <div className="min-h-screen">
      {currentView === 'dashboard' && renderDashboardOverview()}
      {currentView === 'pages' && <PageManager />}
      {currentView === 'templates' && <TemplateManager />}
      {currentView === 'settings' && <SettingsManager />}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: 'rgb(59 130 246)',
          boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
          '&:hover': {
            bgcolor: 'rgb(37 99 235)',
            boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.6)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
        onClick={() => navigate('/admin/pages')}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default AdminDashboard;