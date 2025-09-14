import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Tooltip,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as PreviewIcon,
  FileCopy as DuplicateIcon,
  Download as ExportIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useAdmin } from '../../hooks/useAdmin';
import SectionBuilder from './SectionBuilder';

const PageManager = () => {
  const navigate = useNavigate();
  const { pageId } = useParams();
  const { pages, templates, loading, api } = useAdmin();
  
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [pageForm, setPageForm] = useState({
    name: '',
    fileName: '',
    template: '',
    status: 'Draft',
    seo: {
      title: '',
      description: '',
      keywords: '',
    },
  });

  useEffect(() => {
    if (pageId && pages.length > 0) {
      const page = pages.find(p => p.id === parseInt(pageId));
      if (page) {
        setSelectedPage(page);
        setIsEditing(true);
        setPageForm(page);
      }
    }
  }, [pageId, pages]);

  const handleCreatePage = () => {
    setPageForm({
      name: '',
      fileName: '',
      template: '',
      status: 'Draft',
      seo: {
        title: '',
        description: '',
        keywords: '',
      },
    });
    setSelectedPage(null);
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleEditPage = (page) => {
    setSelectedPage(page);
    setPageForm(page);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleSavePage = async () => {
    try {
      const fileName = pageForm.fileName || pageForm.name.toLowerCase().replace(/\s+/g, '') + '.json';
      const pageData = {
        ...pageForm,
        fileName,
      };

      if (isEditing && selectedPage) {
        await api.updatePage(selectedPage.id, pageData);
      } else {
        await api.createPage(pageData);
      }

      setOpenDialog(false);
      navigate('/admin/pages');
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  const handleDeletePage = async (pageId) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        await api.deletePage(pageId);
      } catch (error) {
        console.error('Error deleting page:', error);
      }
    }
  };

  const handleDuplicatePage = async (page) => {
    const duplicatedPage = {
      ...page,
      name: `${page.name} (Copy)`,
      fileName: `${page.fileName.replace('.json', '')}_copy.json`,
      status: 'Draft',
    };
    try {
      await api.createPage(duplicatedPage);
    } catch (error) {
      console.error('Error duplicating page:', error);
    }
  };

  const pageTemplates = templates.filter(t => t.category === 'Page');

  if (loading) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Loading pages...
        </Typography>
        <LinearProgress />
      </Box>
    );
  }

  // If editing a specific page, show the section builder
  if (pageId && selectedPage) {
    return <SectionBuilder page={selectedPage} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="h4" className="text-slate-800 font-bold mb-2">
                Page Management
              </Typography>
              <Typography variant="body1" className="text-slate-600">
                Create, edit, and organize your website pages
              </Typography>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => api.fetchPages()}
                className="border-slate-300 text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 rounded-xl"
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreatePage}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl px-6"
              >
                New Page
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Typography variant="h3" className="text-slate-800 font-bold mb-1">
                      {pages.length}
                    </Typography>
                    <Typography variant="body2" className="text-slate-600 font-medium">
                      Total Pages
                    </Typography>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Typography variant="h6" className="text-white font-bold">
                      📄
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Typography variant="h3" className="text-slate-800 font-bold mb-1">
                      {pages.filter(p => p.status === 'Published').length}
                    </Typography>
                    <Typography variant="body2" className="text-slate-600 font-medium">
                      Published
                    </Typography>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Typography variant="h6" className="text-white font-bold">
                      ✅
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Typography variant="h3" className="text-slate-800 font-bold mb-1">
                      {pages.filter(p => p.status === 'Draft').length}
                    </Typography>
                    <Typography variant="body2" className="text-slate-600 font-medium">
                      Drafts
                    </Typography>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Typography variant="h6" className="text-white font-bold">
                      ✏️
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Typography variant="h3" className="text-slate-800 font-bold mb-1">
                      {pageTemplates.length}
                    </Typography>
                    <Typography variant="body2" className="text-slate-600 font-medium">
                      Templates
                    </Typography>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Typography variant="h6" className="text-white font-bold">
                      🎨
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Pages Grid */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h6" className="text-slate-800 font-bold mb-2">
                  All Pages
                </Typography>
                <Typography variant="body2" className="text-slate-600">
                  Manage your website pages and content
                </Typography>
              </div>
              <div className="flex items-center gap-3">
                <Typography variant="body2" className="text-slate-500">
                  {pages.length} {pages.length === 1 ? 'page' : 'pages'}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleCreatePage}
                  className="border-slate-300 text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 rounded-lg"
                >
                  Add Page
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <Grid container spacing={4}>
              {pages.map((page) => (
                <Grid item xs={12} sm={6} lg={4} key={page.id}>
                  <Card className="h-full flex flex-col hover:shadow-lg hover:border-blue-200 transition-all duration-300 rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50">
                    <CardContent className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Typography variant="h6" className="text-slate-800 font-bold mb-1 capitalize line-clamp-1">
                            {page.name}
                          </Typography>
                          <Typography variant="body2" className="text-slate-500 text-sm">
                            {page.fileName}
                          </Typography>
                        </div>
                        <Chip
                          label={page.status}
                          size="small"
                          className={`ml-2 ${
                            page.status === 'Published' 
                              ? 'bg-green-100 text-green-800 border-green-200' 
                              : 'bg-amber-100 text-amber-800 border-amber-200'
                          }`}
                        />
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-slate-600">
                          <span className="w-2 h-2 bg-violet-400 rounded-full mr-2"></span>
                          Template: {page.template || 'Default'}
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                          Modified: {new Date(page.lastModified).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {page.status === 'Published' && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                            🌐 Live
                          </span>
                        )}
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          📄 Page
                        </span>
                      </div>
                    </CardContent>
                    
                    <CardActions className="px-6 pb-6 pt-0">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1">
                          <Tooltip title="Preview Page">
                            <IconButton 
                              size="small" 
                              onClick={() => window.open('/', '_blank')}
                              className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <PreviewIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Page">
                            <IconButton 
                              size="small" 
                              onClick={() => navigate(`/admin/pages/${page.id}`)}
                              className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Duplicate Page">
                            <IconButton 
                              size="small" 
                              onClick={() => handleDuplicatePage(page)}
                              className="text-slate-600 hover:text-violet-600 hover:bg-violet-50 rounded-lg"
                            >
                              <DuplicateIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </div>
                        <Tooltip title="Delete Page">
                          <IconButton
                            size="small"
                            onClick={() => handleDeletePage(page.id)}
                            className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>

      {pages.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-center py-16 px-6">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Typography variant="h3" className="text-slate-400">
                📄
              </Typography>
            </div>
            <Typography variant="h5" className="text-slate-800 font-bold mb-3">
              No pages found
            </Typography>
            <Typography variant="body1" className="text-slate-600 mb-8 max-w-md mx-auto">
              Get started by creating your first page. You can choose from our templates or start from scratch.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreatePage}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl px-8 py-3"
              >
                Create Your First Page
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/admin/templates')}
                className="border-slate-300 text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 rounded-xl px-8 py-3"
              >
                Browse Templates
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          className: "rounded-2xl"
        }}
      >
        <DialogTitle className="border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Typography variant="h6" className="text-white font-bold">
                {isEditing ? '✏️' : '📄'}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="text-slate-800 font-bold">
                {isEditing ? 'Edit Page' : 'Create New Page'}
              </Typography>
              <Typography variant="body2" className="text-slate-600">
                {isEditing ? 'Update page settings and content' : 'Add a new page to your website'}
              </Typography>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4 pt-4">
            <TextField
              label="Page Name"
              fullWidth
              value={pageForm.name}
              onChange={(e) => setPageForm({ ...pageForm, name: e.target.value })}
              placeholder="e.g., About Us, Services, Contact"
            />
            
            <TextField
              label="File Name"
              fullWidth
              value={pageForm.fileName}
              onChange={(e) => setPageForm({ ...pageForm, fileName: e.target.value })}
              placeholder="e.g., about.json, services.json"
              helperText="File name for storing page data (auto-generated if empty)"
            />
            
            <FormControl fullWidth>
              <InputLabel>Template</InputLabel>
              <Select
                value={pageForm.template}
                onChange={(e) => setPageForm({ ...pageForm, template: e.target.value })}
              >
                <MenuItem value="">Default</MenuItem>
                {pageTemplates.map((template) => (
                  <MenuItem key={template.id} value={template.name}>
                    {template.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={pageForm.status}
                onChange={(e) => setPageForm({ ...pageForm, status: e.target.value })}
              >
                <MenuItem value="Draft">Draft</MenuItem>
                <MenuItem value="Published">Published</MenuItem>
              </Select>
            </FormControl>

            {/* SEO Section */}
            <Typography variant="h6" className="mt-6">
              SEO Settings
            </Typography>
            
            <TextField
              label="Meta Title"
              fullWidth
              value={pageForm.seo.title}
              onChange={(e) => setPageForm({
                ...pageForm,
                seo: { ...pageForm.seo, title: e.target.value }
              })}
            />
            
            <TextField
              label="Meta Description"
              fullWidth
              multiline
              rows={3}
              value={pageForm.seo.description}
              onChange={(e) => setPageForm({
                ...pageForm,
                seo: { ...pageForm.seo, description: e.target.value }
              })}
            />
            
            <TextField
              label="Keywords"
              fullWidth
              value={pageForm.seo.keywords}
              onChange={(e) => setPageForm({
                ...pageForm,
                seo: { ...pageForm.seo, keywords: e.target.value }
              })}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
        </DialogContent>
        <DialogActions className="border-t border-slate-100 bg-slate-50 p-6 gap-3">
          <Button 
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            className="border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-100 rounded-xl px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSavePage}
            variant="contained"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl px-8"
            disabled={!pageForm.name}
          >
            {isEditing ? 'Update Page' : 'Create Page'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add page"
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
        onClick={handleCreatePage}
      >
        <AddIcon />
      </Fab>
      </div>
    </div>
  );
};

export default PageManager;