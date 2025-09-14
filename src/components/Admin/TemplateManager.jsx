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
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
        <CardContent className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <Typography variant="h6" component="h3">
              {template.name}
            </Typography>
            <Chip
              label={template.category}
              color={template.category === 'Page' ? 'primary' : 'secondary'}
              size="small"
            />
          </div>
          
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {template.description}
          </Typography>
          
          {template.type && (
            <Typography variant="caption" color="text.secondary" display="block">
              Type: {template.type}
            </Typography>
          )}
          
          {template.fields && template.fields.length > 0 && (
            <Typography variant="caption" color="text.secondary" display="block">
              Fields: {template.fields.join(', ')}
            </Typography>
          )}
          
          {template.sections && template.sections.length > 0 && (
            <Typography variant="caption" color="text.secondary" display="block">
              Sections: {template.sections.join(', ')}
            </Typography>
          )}
        </CardContent>
        
        <CardActions className="justify-between">
          <div>
            <IconButton size="small" onClick={() => handleEditTemplate(template)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => handleDuplicateTemplate(template)}>
              <DuplicateIcon />
            </IconButton>
          </div>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDeleteTemplate(template.id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            Template Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage page and section templates
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateTemplate}
          className="bg-blue-600 hover:bg-blue-700"
        >
          New Template
        </Button>
      </div>

      {/* Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h4" component="div">
                    {templates.length}
                  </Typography>
                  <Typography variant="body2">Total Templates</Typography>
                </div>
                <TemplateIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h4" component="div">
                    {pageTemplates.length}
                  </Typography>
                  <Typography variant="body2">Page Templates</Typography>
                </div>
                <TemplateIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h4" component="div">
                    {sectionTemplates.length}
                  </Typography>
                  <Typography variant="body2">Section Templates</Typography>
                </div>
                <TemplateIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Template Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label={`Page Templates (${pageTemplates.length})`} />
            <Tab label={`Section Templates (${sectionTemplates.length})`} />
          </Tabs>
        </Box>
        
        <CardContent>
          {tabValue === 0 && (
            <Grid container spacing={3}>
              {pageTemplates.length > 0 ? (
                pageTemplates.map(renderTemplateCard)
              ) : (
                <Grid item xs={12}>
                  <div className="text-center py-12">
                    <Typography variant="h6" gutterBottom>
                      No page templates found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Create your first page template
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleCreateTemplate}
                      className="mt-4 bg-blue-600 hover:bg-blue-700"
                    >
                      Create Page Template
                    </Button>
                  </div>
                </Grid>
              )}
            </Grid>
          )}
          
          {tabValue === 1 && (
            <Grid container spacing={3}>
              {sectionTemplates.length > 0 ? (
                sectionTemplates.map(renderTemplateCard)
              ) : (
                <Grid item xs={12}>
                  <div className="text-center py-12">
                    <Typography variant="h6" gutterBottom>
                      No section templates found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Create your first section template
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleCreateTemplate}
                      className="mt-4 bg-blue-600 hover:bg-blue-700"
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