import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const SectionEditor = ({ section, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    fields: {},
  });

  useEffect(() => {
    if (section) {
      setFormData({
        name: section.name || '',
        type: section.type || '',
        description: section.description || '',
        fields: section.fields || {},
      });
    }
  }, [section]);

  const handleSave = () => {
    const updatedSection = {
      ...section,
      ...formData,
    };
    onSave(updatedSection);
  };

  const handleFieldChange = (fieldPath, value) => {
    const pathArray = fieldPath.split('.');
    const updatedFields = { ...formData.fields };
    
    let current = updatedFields;
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) {
        current[pathArray[i]] = {};
      }
      current = current[pathArray[i]];
    }
    current[pathArray[pathArray.length - 1]] = value;
    
    setFormData({ ...formData, fields: updatedFields });
  };

  const renderFieldEditor = (key, value, path = '') => {
    const fullPath = path ? `${path}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return (
        <Accordion key={fullPath}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" className="capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="space-y-3">
              {Object.entries(value).map(([subKey, subValue]) => 
                renderFieldEditor(subKey, subValue, fullPath)
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={fullPath} className="space-y-2">
          <div className="flex items-center justify-between">
            <Typography variant="subtitle2" className="capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </Typography>
            <IconButton
              size="small"
              onClick={() => {
                const newArray = [...value, ''];
                handleFieldChange(fullPath, newArray);
              }}
            >
              <AddIcon />
            </IconButton>
          </div>
          {value.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {typeof item === 'object' ? (
                <div className="flex-1 p-3 border border-gray-200 rounded">
                  <Typography variant="caption" color="text.secondary">
                    Object {index + 1}
                  </Typography>
                  {Object.entries(item).map(([objKey, objValue]) => (
                    <TextField
                      key={objKey}
                      label={objKey}
                      fullWidth
                      size="small"
                      margin="dense"
                      value={objValue || ''}
                      onChange={(e) => {
                        const newArray = [...value];
                        newArray[index] = { ...newArray[index], [objKey]: e.target.value };
                        handleFieldChange(fullPath, newArray);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  value={item || ''}
                  onChange={(e) => {
                    const newArray = [...value];
                    newArray[index] = e.target.value;
                    handleFieldChange(fullPath, newArray);
                  }}
                  placeholder={`${key} ${index + 1}`}
                />
              )}
              <IconButton
                size="small"
                color="error"
                onClick={() => {
                  const newArray = value.filter((_, i) => i !== index);
                  handleFieldChange(fullPath, newArray);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      );
    }

    // Simple field types
    const isLongText = typeof value === 'string' && value.length > 100;
    
    return (
      <TextField
        key={fullPath}
        label={key.replace(/([A-Z])/g, ' $1').trim()}
        fullWidth
        multiline={isLongText}
        rows={isLongText ? 4 : 1}
        value={value || ''}
        onChange={(e) => handleFieldChange(fullPath, e.target.value)}
        margin="normal"
        variant="outlined"
      />
    );
  };

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="md" fullWidth>
      <DialogTitle>Edit Section: {section?.name}</DialogTitle>
      <DialogContent>
        <div className="space-y-4 pt-4">
          {/* Basic Section Info */}
          <TextField
            label="Section Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          
          <FormControl fullWidth>
            <InputLabel>Section Type</InputLabel>
            <Select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <MenuItem value="hero">Hero</MenuItem>
              <MenuItem value="features">Features</MenuItem>
              <MenuItem value="services">Services</MenuItem>
              <MenuItem value="testimonials">Testimonials</MenuItem>
              <MenuItem value="pricing">Pricing</MenuItem>
              <MenuItem value="cta">Call to Action</MenuItem>
              <MenuItem value="about">About</MenuItem>
              <MenuItem value="process">Process</MenuItem>
              <MenuItem value="industries">Industries</MenuItem>
              <MenuItem value="solutions">Solutions</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          {/* Section Fields */}
          <div className="border-t border-gray-200 pt-4">
            <Typography variant="h6" gutterBottom>
              Section Content
            </Typography>
            
            {formData.fields && Object.keys(formData.fields).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(formData.fields).map(([key, value]) => 
                  renderFieldEditor(key, value)
                )}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Typography variant="body2" color="text.secondary">
                  No fields to edit
                </Typography>
              </div>
            )}
          </div>

          {/* JSON Preview */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">JSON Preview</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                component="pre"
                sx={{
                  backgroundColor: '#f5f5f5',
                  padding: 2,
                  borderRadius: 1,
                  overflow: 'auto',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                }}
              >
                {JSON.stringify(formData.fields, null, 2)}
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Save Section
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SectionEditor;