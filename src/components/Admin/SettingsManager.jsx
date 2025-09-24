import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Grid,
  Divider,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Download as ExportIcon,
  Upload as ImportIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const SettingsManager = () => {
  const [settings, setSettings] = useState({
    general: {
      siteName: "Bellatrix",
      siteDescription: "Oracle NetSuite Consultancy",
      adminEmail: "admin@bellatrix.com",
      timezone: "UTC",
    },
    api: {
      enableMockApi: true,
      autoSave: true,
      backupInterval: 24,
    },
    ui: {
      darkMode: false,
      compactMode: false,
      showPreview: true,
    },
    seo: {
      defaultTitle: "Bellatrix - Oracle NetSuite Consultancy",
      defaultDescription:
        "Professional NetSuite implementation and consulting services",
      defaultKeywords: "NetSuite, Oracle, ERP, Implementation, Consulting",
    },
  });

  const [saveStatus, setSaveStatus] = useState(null);
  const [dataFiles, setDataFiles] = useState([
    { name: "homeData.json", size: "15.2 KB", lastModified: "2024-01-15" },
    { name: "Implementation.json", size: "8.7 KB", lastModified: "2024-01-14" },
    { name: "training.json", size: "6.1 KB", lastModified: "2024-01-13" },
    {
      name: "netSuiteConsulting.json",
      size: "12.3 KB",
      lastModified: "2024-01-12",
    },
    { name: "customization.json", size: "9.8 KB", lastModified: "2024-01-11" },
  ]);

  const handleSettingChange = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSaveSettings = async () => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bellatrix-settings.json";
    link.click();
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          setSettings(importedSettings);
          setSaveStatus("imported");
          setTimeout(() => setSaveStatus(null), 3000);
        } catch {
          setSaveStatus("error");
          setTimeout(() => setSaveStatus(null), 3000);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDeleteDataFile = (fileName) => {
    if (window.confirm(`Are you sure you want to delete ${fileName}?`)) {
      setDataFiles((prev) => prev.filter((file) => file.name !== fileName));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gray-800 rounded-2xl border border-gray-600 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <Typography
                variant="h4"
                component="h1"
                className="text-white font-bold mb-2"
              >
                Settings
              </Typography>
              <Typography variant="body1" className="text-gray-300">
                Configure your admin dashboard and application settings
              </Typography>
            </div>
            <div className="flex space-x-3">
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                style={{ display: "none" }}
                id="import-settings"
              />
              <label htmlFor="import-settings">
                <Button
                  variant="outlined"
                  startIcon={<ImportIcon />}
                  component="span"
                  className="border-gray-600 text-gray-300 hover:border-green-400 hover:bg-gray-700 hover:text-green-400 rounded-xl"
                >
                  Import
                </Button>
              </label>
              <Button
                variant="outlined"
                startIcon={<ExportIcon />}
                onClick={handleExportData}
                className="border-gray-600 text-gray-300 hover:border-blue-400 hover:bg-gray-700 hover:text-blue-400 rounded-xl"
              >
                Export
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveSettings}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl px-6"
              >
                Save Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Save Status */}
        {saveStatus && (
          <Alert
            severity={
              saveStatus === "success" || saveStatus === "imported"
                ? "success"
                : "error"
            }
            className="rounded-xl"
            sx={{
              bgcolor:
                saveStatus === "success" || saveStatus === "imported"
                  ? "#065f46"
                  : "#7f1d1d",
              color: "white",
              "& .MuiAlert-icon": {
                color: "white",
              },
            }}
          >
            {saveStatus === "success" && "Settings saved successfully!"}
            {saveStatus === "imported" && "Settings imported successfully!"}
            {saveStatus === "error" &&
              "Error saving settings. Please try again."}
          </Alert>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* General Settings */}
            <Accordion
              defaultExpanded
              className="bg-gray-800 border border-gray-600 shadow-sm rounded-2xl mb-4"
              sx={{
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className="text-gray-300" />}
                className="border-b border-gray-700"
                sx={{
                  bgcolor: "#1f2937",
                  borderRadius: "1rem 1rem 0 0",
                }}
              >
                <Typography variant="h6" className="text-white font-semibold">
                  General Settings
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="bg-gray-800 p-6">
                <div className="space-y-6">
                  <TextField
                    label="Site Name"
                    fullWidth
                    value={settings.general.siteName}
                    onChange={(e) =>
                      handleSettingChange("general", "siteName", e.target.value)
                    }
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#374151",
                        "& fieldset": {
                          borderColor: "#4b5563",
                        },
                        "&:hover fieldset": {
                          borderColor: "#60a5fa",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#60a5fa",
                        },
                        "& input": {
                          color: "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#9ca3af",
                        "&.Mui-focused": {
                          color: "#60a5fa",
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Site Description"
                    fullWidth
                    multiline
                    rows={2}
                    value={settings.general.siteDescription}
                    onChange={(e) =>
                      handleSettingChange(
                        "general",
                        "siteDescription",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Admin Email"
                    fullWidth
                    type="email"
                    value={settings.general.adminEmail}
                    onChange={(e) =>
                      handleSettingChange(
                        "general",
                        "adminEmail",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Timezone"
                    fullWidth
                    value={settings.general.timezone}
                    onChange={(e) =>
                      handleSettingChange("general", "timezone", e.target.value)
                    }
                  />
                </div>
              </AccordionDetails>
            </Accordion>

            {/* API Settings */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">API & Data Settings</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="space-y-4">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.api.enableMockApi}
                        onChange={(e) =>
                          handleSettingChange(
                            "api",
                            "enableMockApi",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Enable Mock API"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.api.autoSave}
                        onChange={(e) =>
                          handleSettingChange(
                            "api",
                            "autoSave",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Auto-save Changes"
                  />
                  <TextField
                    label="Backup Interval (hours)"
                    type="number"
                    value={settings.api.backupInterval}
                    onChange={(e) =>
                      handleSettingChange(
                        "api",
                        "backupInterval",
                        parseInt(e.target.value)
                      )
                    }
                    fullWidth
                  />
                </div>
              </AccordionDetails>
            </Accordion>

            {/* UI Settings */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">User Interface</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="space-y-4">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.ui.darkMode}
                        onChange={(e) =>
                          handleSettingChange(
                            "ui",
                            "darkMode",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Dark Mode"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.ui.compactMode}
                        onChange={(e) =>
                          handleSettingChange(
                            "ui",
                            "compactMode",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Compact Mode"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.ui.showPreview}
                        onChange={(e) =>
                          handleSettingChange(
                            "ui",
                            "showPreview",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Show Preview Button"
                  />
                </div>
              </AccordionDetails>
            </Accordion>

            {/* SEO Settings */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">SEO Defaults</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="space-y-4">
                  <TextField
                    label="Default Page Title"
                    fullWidth
                    value={settings.seo.defaultTitle}
                    onChange={(e) =>
                      handleSettingChange("seo", "defaultTitle", e.target.value)
                    }
                  />
                  <TextField
                    label="Default Meta Description"
                    fullWidth
                    multiline
                    rows={3}
                    value={settings.seo.defaultDescription}
                    onChange={(e) =>
                      handleSettingChange(
                        "seo",
                        "defaultDescription",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Default Keywords"
                    fullWidth
                    value={settings.seo.defaultKeywords}
                    onChange={(e) =>
                      handleSettingChange(
                        "seo",
                        "defaultKeywords",
                        e.target.value
                      )
                    }
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12} md={4}>
            {/* System Information */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Information
                </Typography>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version</span>
                    <span className="font-mono">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Backup</span>
                    <span className="text-sm">2 hours ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data Files</span>
                    <span className="text-sm">{dataFiles.length} files</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage Used</span>
                    <span className="text-sm">2.3 MB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Files Management */}
            <Card className="mt-4">
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6">Data Files</Typography>
                  <IconButton size="small">
                    <RefreshIcon />
                  </IconButton>
                </div>

                <List dense>
                  {dataFiles.map((file, index) => (
                    <ListItem
                      key={index}
                      divider={index < dataFiles.length - 1}
                    >
                      <ListItemText
                        primary={file.name}
                        secondary={`${file.size} • ${file.lastModified}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          size="small"
                          color="error"
                          onClick={() => handleDeleteDataFile(file.name)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-4 bg-gray-800 border border-gray-600">
              <CardContent>
                <Typography variant="h6" gutterBottom className="text-white">
                  Quick Actions
                </Typography>
                <div className="space-y-2">
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => window.location.reload()}
                    className="border-gray-600 text-gray-300 hover:border-white/60 hover:text-white hover:bg-gray-700 rounded-xl"
                  >
                    Refresh Dashboard
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => localStorage.clear()}
                    className="border-gray-600 text-gray-300 hover:border-white/60 hover:text-white hover:bg-gray-700 rounded-xl"
                  >
                    Clear Cache
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      if (window.confirm("Reset all settings to default?")) {
                        // Reset logic here
                      }
                    }}
                    className="border-red-600 text-red-400 hover:border-red-500 hover:text-white hover:bg-red-600/10 rounded-xl"
                  >
                    Reset to Defaults
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SettingsManager;
