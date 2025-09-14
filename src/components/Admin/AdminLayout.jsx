import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Pages as PagesIcon,
  ViewModule as TemplatesIcon,
  Settings as SettingsIcon,
  AccountCircle,
  ExitToApp,
  Home as HomeIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExitAdmin = () => {
    navigate('/');
    handleProfileMenuClose();
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchor(null);
  };

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/admin',
      active: location.pathname === '/admin' || location.pathname === '/admin/',
      description: 'Overview & Analytics',
    },
    {
      text: 'Pages',
      icon: <PagesIcon />,
      path: '/admin/pages',
      active: location.pathname.startsWith('/admin/pages'),
      description: 'Content Management',
    },
    {
      text: 'Templates',
      icon: <TemplatesIcon />,
      path: '/admin/templates',
      active: location.pathname.startsWith('/admin/templates'),
      description: 'Design Templates',
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/admin/settings',
      active: location.pathname.startsWith('/admin/settings'),
      description: 'System Configuration',
    },
  ];

  const getCurrentPageTitle = () => {
    const activeItem = menuItems.find(item => item.active);
    return activeItem ? activeItem.text : 'Dashboard';
  };

  const drawer = (
    <div className="h-full bg-white border-r border-slate-200">
      {/* Logo Section */}
      <div className="px-6 py-8 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <div>
            <Typography variant="h6" className="text-slate-800 font-semibold text-lg">
              Bellatrix
            </Typography>
            <Typography variant="caption" className="text-slate-500 font-medium">
              Admin Panel
            </Typography>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 py-6">
        <Typography variant="caption" className="text-slate-400 font-semibold uppercase tracking-wider px-3 mb-4 block">
          Navigation
        </Typography>
        
        <List className="space-y-2">
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                className={`rounded-xl mx-2 transition-all duration-200 ${
                  item.active
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm border border-blue-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
                sx={{
                  minHeight: 56,
                  px: 3,
                  py: 1.5,
                  borderRadius: '12px',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 2.5,
                    color: item.active ? '#1d4ed8' : '#64748b',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <div>
                      <Typography variant="body1" className={`font-medium ${item.active ? 'text-blue-700' : 'text-slate-700'}`}>
                        {item.text}
                      </Typography>
                      <Typography variant="caption" className={`${item.active ? 'text-blue-600' : 'text-slate-500'}`}>
                        {item.description}
                      </Typography>
                    </div>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>

      {/* Quick Actions */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
          <Typography variant="caption" className="text-slate-600 font-semibold block mb-3">
            Quick Actions
          </Typography>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors w-full text-left p-2 rounded-lg hover:bg-white"
            >
              <HomeIcon fontSize="small" />
              <span className="text-sm font-medium">View Live Site</span>
            </button>
            <button className="flex items-center space-x-2 text-slate-600 hover:text-green-600 transition-colors w-full text-left p-2 rounded-lg hover:bg-white">
              <SearchIcon fontSize="small" />
              <span className="text-sm font-medium">Search Content</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Top Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          bgcolor: 'white',
          borderBottom: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.05)',
        }}
      >
        <Toolbar className="py-3">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' }, color: '#64748b' }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Page Title */}
          <div className="flex-1">
            <Typography variant="h5" className="text-slate-800 font-semibold">
              {getCurrentPageTitle()}
            </Typography>
            <Typography variant="body2" className="text-slate-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <IconButton
              size="large"
              aria-label="notifications"
              onClick={handleNotificationMenuOpen}
              className="text-slate-600 hover:text-slate-800"
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Profile */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <Typography variant="body2" className="text-slate-700 font-medium">
                  Admin User
                </Typography>
                <Typography variant="caption" className="text-slate-500">
                  Super Admin
                </Typography>
              </div>
              <IconButton
                size="large"
                aria-label="account menu"
                onClick={handleProfileMenuOpen}
              >
                <Avatar 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                >
                  A
                </Avatar>
              </IconButton>
            </div>
          </div>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 220,
                boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
              }
            }}
          >
            <div className="px-4 py-3 border-b border-slate-100">
              <Typography variant="body2" className="text-slate-700 font-medium">
                Admin User
              </Typography>
              <Typography variant="caption" className="text-slate-500">
                admin@bellatrix.com
              </Typography>
            </div>
            <MenuItem onClick={handleProfileMenuClose} className="py-3">
              <ListItemIcon>
                <AccountCircle fontSize="small" className="text-slate-600" />
              </ListItemIcon>
              <span className="text-slate-700">Profile Settings</span>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleExitAdmin} className="py-3 text-red-600">
              <ListItemIcon>
                <ExitToApp fontSize="small" className="text-red-600" />
              </ListItemIcon>
              <span>Exit Admin Panel</span>
            </MenuItem>
          </Menu>

          {/* Notifications Menu */}
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 320,
                maxHeight: 400,
                boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
              }
            }}
          >
            <div className="px-4 py-3 border-b border-slate-100">
              <Typography variant="h6" className="text-slate-800 font-semibold">
                Notifications
              </Typography>
            </div>
            <div className="py-2">
              <MenuItem className="px-4 py-3 hover:bg-slate-50">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <Typography variant="body2" className="text-slate-700 font-medium">
                      New page created
                    </Typography>
                    <Typography variant="caption" className="text-slate-500">
                      Homepage updated 5 minutes ago
                    </Typography>
                  </div>
                </div>
              </MenuItem>
              <MenuItem className="px-4 py-3 hover:bg-slate-50">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <Typography variant="body2" className="text-slate-700 font-medium">
                      Template saved
                    </Typography>
                    <Typography variant="caption" className="text-slate-500">
                      Hero section template updated
                    </Typography>
                  </div>
                </div>
              </MenuItem>
              <MenuItem className="px-4 py-3 hover:bg-slate-50">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <Typography variant="body2" className="text-slate-700 font-medium">
                      System backup
                    </Typography>
                    <Typography variant="caption" className="text-slate-500">
                      Daily backup completed
                    </Typography>
                  </div>
                </div>
              </MenuItem>
            </div>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              border: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              border: 'none',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: '#f8fafc',
        }}
      >
        <Toolbar />
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
};

export default AdminLayout;