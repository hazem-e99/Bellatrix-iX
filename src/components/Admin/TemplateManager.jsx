import React, { useState } from 'react';
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
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as DuplicateIcon,
  ViewModule as TemplateIcon,
} from '@mui/icons-material';
import { useAdmin } from '../../hooks/useAdmin';

const TemplateManager = () => {
  const { templates, api } = useAdmin();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    category: 'Section',
    type: '',
    fields: [],
    sections: [],
  });

  const pageTemplates = templates.filter(t => t.category === 'Page');
  const sectionTemplates = templates.filter(t => t.category === 'Section');

  const handleCreateTemplate = () => {
    setTemplateForm({
      name: '',
      description: '',
      category: tabValue === 0 ? 'Page' : 'Section',
      type: '',
      fields: [],
      sections: [],
    });
    setSelectedTemplate(null);
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setTemplateForm(template);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleSaveTemplate = async () => {
    try {
      if (isEditing && selectedTemplate) {
        await api.updateTemplate(selectedTemplate.id, templateForm);
      } else {
        await api.createTemplate(templateForm);
      }
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  const handleDeleteTemplate = async (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await api.deleteTemplate(templateId);
      } catch (error) {
        console.error('Error deleting template:', error);
      }
    }
  };

  const handleDuplicateTemplate = async (template) => {
    const duplicatedTemplate = {
      ...template,
      name: `${template.name} (Copy)`,
    };
    try {
      await api.createTemplate(duplicatedTemplate);
    } catch (error) {
      console.error('Error duplicating template:', error);
    }
  };

  const addField = () => {
    setTemplateForm({
      ...templateForm,
      fields: [...templateForm.fields, '']
    });
  };

  const updateField = (index, value) => {
    const newFields = [...templateForm.fields];
    newFields[index] = value;
    setTemplateForm({ ...templateForm, fields: newFields });
  };

  const removeField = (index) => {
    const newFields = templateForm.fields.filter((_, i) => i !== index);
    setTemplateForm({ ...templateForm, fields: newFields });
  };

  const addSection = () => {
    setTemplateForm({
      ...templateForm,
      sections: [...templateForm.sections, '']
    });
  };

  const updateSection = (index, value) => {
    const newSections = [...templateForm.sections];
    newSections[index] = value;
    setTemplateForm({ ...templateForm, sections: newSections });
  };

  const removeSection = (index) => {
    const newSections = templateForm.sections.filter((_, i) => i !== index);
    setTemplateForm({ ...templateForm, sections: newSections });
  };

  const renderTemplateCard = (template) => (
    <Grid item xs={12} sm={6} md={4} key={template.id}>
      <Card className="h-full flex flex-col bg-gray-800 border border-gray-600 hover:shadow-xl hover:shadow-gray-900/20 transition-all duration-300 rounded-2xl group">
        <CardContent className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <Typography variant="h6" component="h3" className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                {template.name}
              </Typography>
              <Chip
                label={template.category}
                size="small"
                className={template.category === 'Page' ? 'bg-blue-600 text-blue-100' : 'bg-purple-600 text-purple-100'}
              />
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl flex items-center justify-center ml-3">
              <TemplateIcon className="text-gray-300" />
            </div>
          </div>
          
          <Typography variant="body2" className="text-gray-300 mb-3 leading-relaxed">
            {template.description}
          </Typography>
          
          <div className="space-y-2">
            {template.type && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Type:</span>
                <span className="text-sm text-gray-300">{template.type}</span>
              </div>
            )}
            
            {template.fields && template.fields.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">Fields:</span>
                <div className="flex flex-wrap gap-1">
                  {template.fields.slice(0, 3).map((field, index) => (
                    <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      {field}
                    </span>
                  ))}
                  {template.fields.length > 3 && (
                    <span className="text-xs text-gray-400">+{template.fields.length - 3} more</span>
                  )}
                </div>
              </div>
            )}
            
            {template.sections && template.sections.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">Sections:</span>
                <div className="flex flex-wrap gap-1">
                  {template.sections.slice(0, 3).map((section, index) => (
                    <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      {section}
                    </span>
                  ))}
                  {template.sections.length > 3 && (
                    <span className="text-xs text-gray-400">+{template.sections.length - 3} more</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardActions className="justify-between p-4 border-t border-gray-700">
          <div className="flex gap-1">
            <IconButton 
              size="small" 
              onClick={() => handleEditTemplate(template)}
              className="text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-colors"
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={() => handleDuplicateTemplate(template)}
              className="text-gray-400 hover:text-emerald-400 hover:bg-gray-700 transition-colors"
            >
              <DuplicateIcon fontSize="small" />
            </IconButton>
          </div>
          <IconButton
            size="small"
            onClick={() => handleDeleteTemplate(template.id)}
            className="text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gray-800 rounded-2xl border border-gray-600 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="h4" component="h1" className="text-white font-bold mb-2">
                Template Management
              </Typography>
              <Typography variant="body1" className="text-gray-300">
                Manage page and section templates for your website
              </Typography>
            </div>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateTemplate}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl px-6"
            >
              New Template
            </Button>
          </div>
        </div>

        {/* Stats */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card className="bg-gray-800 border border-gray-600 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-1">
                <CardContent className="bg-gray-800 m-0 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography variant="h3" component="div" className="text-white font-bold mb-1">
                        {templates.length}
                      </Typography>
                      <Typography variant="body2" className="text-gray-300 font-medium">
                        Total Templates
                      </Typography>
                      <Typography variant="caption" className="text-blue-400 font-medium mt-2 block">
                        All categories combined
                      </Typography>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <TemplateIcon sx={{ fontSize: 28, color: 'white' }} />
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className="bg-gray-800 border border-gray-600 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-1">
                <CardContent className="bg-gray-800 m-0 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography variant="h3" component="div" className="text-white font-bold mb-1">
                        {pageTemplates.length}
                      </Typography>
                      <Typography variant="body2" className="text-gray-300 font-medium">
                        Page Templates
                      </Typography>
                      <Typography variant="caption" className="text-emerald-400 font-medium mt-2 block">
                        Full page layouts
                      </Typography>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <TemplateIcon sx={{ fontSize: 28, color: 'white' }} />
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className="bg-gray-800 border border-gray-600 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-1">
                <CardContent className="bg-gray-800 m-0 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Typography variant="h3" component="div" className="text-white font-bold mb-1">
                        {sectionTemplates.length}
                      </Typography>
                      <Typography variant="body2" className="text-gray-300 font-medium">
                        Section Templates
                      </Typography>
                      <Typography variant="caption" className="text-purple-400 font-medium mt-2 block">
                        Reusable components
                      </Typography>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <TemplateIcon sx={{ fontSize: 28, color: 'white' }} />
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Grid>
        </Grid>

        {/* Template Tabs */}
        <Card className="bg-gray-800 border border-gray-600 shadow-sm rounded-2xl overflow-hidden">
          <Box sx={{ borderBottom: 1, borderColor: '#374151' }}>
            <Tabs 
              value={tabValue} 
              onChange={(e, newValue) => setTabValue(newValue)}
              sx={{
                '& .MuiTab-root': {
                  color: '#9ca3af',
                  '&.Mui-selected': {
                    color: '#60a5fa',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#60a5fa',
                },
              }}
            >
              <Tab 
                label={`Page Templates (${pageTemplates.length})`} 
                className="text-gray-400"
              />
              <Tab 
                label={`Section Templates (${sectionTemplates.length})`} 
                className="text-gray-400"
              />
            </Tabs>
          </Box>
          
          <CardContent className="p-6 bg-gray-800">
            {tabValue === 0 && (
              <Grid container spacing={4}>
                {pageTemplates.length > 0 ? (
                  pageTemplates.map(renderTemplateCard)
                ) : (
                  <Grid item xs={12}>
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <TemplateIcon className="text-gray-400" sx={{ fontSize: 40 }} />
                      </div>
                      <Typography variant="h6" className="text-white font-semibold mb-2">
                        No page templates found
                      </Typography>
                      <Typography variant="body2" className="text-gray-400 mb-6">
                        Create your first page template to get started
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreateTemplate}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl px-6"
                      >
                        Create Page Template
                      </Button>
                    </div>
                  </Grid>
                )}
              </Grid>
            )}
            
            {tabValue === 1 && (
              <Grid container spacing={4}>
                {sectionTemplates.length > 0 ? (
                  sectionTemplates.map(renderTemplateCard)
                ) : (
                  <Grid item xs={12}>
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <TemplateIcon className="text-gray-400" sx={{ fontSize: 40 }} />
                      </div>
                      <Typography variant="h6" className="text-white font-semibold mb-2">
                        No section templates found
                      </Typography>
                      <Typography variant="body2" className="text-gray-400 mb-6">
                        Create your first section template to build reusable components
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreateTemplate}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl px-6"
                      >
                        Create Section Template
                      </Button>
                    </div>
                  </Grid>
                )}
              </Grid>
            )}
          </CardContent>
        </Card>
      </div>
    </div>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEditing ? 'Edit Template' : 'Create New Template'}
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4 pt-4">
            <TextField
              label="Template Name"
              fullWidth
              value={templateForm.name}
              onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
            />
            
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={templateForm.description}
              onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
            />
            
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={templateForm.category}
                onChange={(e) => setTemplateForm({ ...templateForm, category: e.target.value })}
              >
                <MenuItem value="Page">Page Template</MenuItem>
                <MenuItem value="Section">Section Template</MenuItem>
              </Select>
            </FormControl>
            
            {templateForm.category === 'Section' && (
              <TextField
                label="Section Type"
                fullWidth
                value={templateForm.type}
                onChange={(e) => setTemplateForm({ ...templateForm, type: e.target.value })}
                placeholder="e.g., hero, features, testimonials"
              />
            )}

            {/* Fields Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Typography variant="h6">Fields</Typography>
                <Button size="small" onClick={addField} startIcon={<AddIcon />}>
                  Add Field
                </Button>
              </div>
              {templateForm.fields.map((field, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <TextField
                    fullWidth
                    size="small"
                    value={field}
                    onChange={(e) => updateField(index, e.target.value)}
                    placeholder="Field name"
                  />
                  <IconButton size="small" onClick={() => removeField(index)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>

            {/* Sections (for page templates) */}
            {templateForm.category === 'Page' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Typography variant="h6">Sections</Typography>
                  <Button size="small" onClick={addSection} startIcon={<AddIcon />}>
                    Add Section
                  </Button>
                </div>
                {templateForm.sections.map((section, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <TextField
                      fullWidth
                      size="small"
                      value={section}
                      onChange={(e) => updateSection(index, e.target.value)}
                      placeholder="Section type"
                    />
                    <IconButton size="small" onClick={() => removeSection(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveTemplate}
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!templateForm.name}
          >
            {isEditing ? 'Save Changes' : 'Create Template'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TemplateManager;