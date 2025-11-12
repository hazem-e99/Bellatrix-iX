import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cog6ToothIcon,
  UserGroupIcon,
  PhotoIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import { Input, Textarea, Select } from "../ui/Input";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import Toast from "../ui/Toast";
import { useJsonData } from "../../hooks/useJsonData";
import Modal, { ModalFooter } from "../UI/Modal";
import api from "../../lib/api";

const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  // Settings state
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Bellatrix",
    siteDescription: "Professional business solutions and services",
    siteUrl: "https://bellatrix.com",
    adminEmail: "admin@bellatrix.com",
    clientTheme: "light",
    adminTheme: "light",
    logo: null,
    favicon: null,
  });

  const [permissionSettings, setPermissionSettings] = useState({
    roles: [
      {
        id: 1,
        name: "Administrator",
        permissions: ["read", "write", "delete", "manage_users"],
        users: 1,
      },
      { id: 2, name: "Editor", permissions: ["read", "write"], users: 3 },
      { id: 3, name: "Viewer", permissions: ["read"], users: 5 },
    ],
    defaultRole: "Viewer",
    requireApproval: true,
    sessionTimeout: 24,
  });

  // Footer settings state
  const [footerSettings, setFooterSettings] = useState({
    company_name: "",
    company_tagline: "",
    company_address: "",
    company_email: "",
    company_phone: "",
    footer_link_1_label: "",
    footer_link_1_url: "",
    footer_link_2_label: "",
    footer_link_2_url: "",
    footer_link_3_label: "",
    footer_link_3_url: "",
    footer_service_1: "",
    footer_service_2: "",
    footer_service_3: "",
    footer_service_4: "",
    footer_service_5: "",
    social_facebook: "",
    social_twitter: "",
    social_linkedin: "",
  });

  const [footerLoading, setFooterLoading] = useState(false);
  const [footerErrors, setFooterErrors] = useState({});

  // Role modal state
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [roleForm, setRoleForm] = useState({ name: "", permissions: [] });

  const availablePermissions = ["read", "write", "delete", "manage_users"];

  const openAddRole = () => {
    setEditingRoleId(null);
    setRoleForm({ name: "", permissions: [] });
    setIsRoleModalOpen(true);
  };

  const openEditRole = (role) => {
    setEditingRoleId(role.id);
    setRoleForm({ name: role.name, permissions: [...role.permissions] });
    setIsRoleModalOpen(true);
  };

  const closeRoleModal = () => {
    setIsRoleModalOpen(false);
  };

  const togglePermissionInForm = (perm) => {
    setRoleForm((prev) => {
      const has = prev.permissions.includes(perm);
      return {
        ...prev,
        permissions: has
          ? prev.permissions.filter((p) => p !== perm)
          : [...prev.permissions, perm],
      };
    });
  };

  const saveRoleFromForm = () => {
    const name = roleForm.name.trim();
    if (!name) {
      showToast("error", "Role name is required");
      return;
    }

    setPermissionSettings((prev) => {
      let nextRoles;
      if (editingRoleId != null) {
        nextRoles = prev.roles.map((r) =>
          r.id === editingRoleId ? { ...r, name, permissions: roleForm.permissions } : r
        );
        showToast("success", "Role updated");
      } else {
        const nextId = prev.roles.length ? Math.max(...prev.roles.map((r) => r.id)) + 1 : 1;
        nextRoles = [
          ...prev.roles,
          { id: nextId, name, permissions: roleForm.permissions, users: 0 },
        ];
        showToast("success", "Role added");
      }
      return { ...prev, roles: nextRoles };
    });

    setIsRoleModalOpen(false);
  };

  // Removed integrations state

  // Fetch footer settings from backend
  const fetchFooterSettings = async () => {
    try {
      setFooterLoading(true);
      const response = await api.get("/Settings/category/footer");
      
      if (response.data?.success && response.data?.data) {
        const settings = response.data.data;
        const footerData = {};
        
        // Map backend data to state
        settings.forEach((setting) => {
          if (setting.key && setting.value !== null) {
            footerData[setting.key] = setting.value;
          }
        });
        
        setFooterSettings((prev) => ({ ...prev, ...footerData }));
      }
    } catch (error) {
      console.error("Error fetching footer settings:", error);
      showToast("error", "Failed to load footer settings");
    } finally {
      setFooterLoading(false);
    }
  };

  // Save footer settings to backend
  const saveFooterSettings = async () => {
    // Validate required fields
    const errors = {};
    if (!footerSettings.company_name?.trim()) {
      errors.company_name = "Company name is required";
    }
    if (!footerSettings.company_email?.trim()) {
      errors.company_email = "Company email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(footerSettings.company_email)) {
      errors.company_email = "Invalid email format";
    }

    // Validate URLs
    const urlFields = [
      "footer_link_1_url",
      "footer_link_2_url",
      "footer_link_3_url",
      "social_facebook",
      "social_twitter",
      "social_linkedin",
    ];
    
    urlFields.forEach((field) => {
      const value = footerSettings[field];
      if (value && value.trim() && !isValidUrl(value)) {
        errors[field] = "Invalid URL format";
      }
    });

    if (Object.keys(errors).length > 0) {
      setFooterErrors(errors);
      showToast("error", "Please fix validation errors");
      return false;
    }

    setFooterErrors({});

    try {
      setFooterLoading(true);

      console.log("💾 Starting save operation with footer settings:", footerSettings);

      // Fetch existing settings to get IDs
      const existingResponse = await api.get("/Settings/category/footer");
      const existingSettings = existingResponse.data?.success ? existingResponse.data.data : [];
      console.log("📂 Existing settings from database:", existingSettings);
      const existingMap = new Map(existingSettings.map((s) => [s.key, s]));

      // Prepare settings to update (only non-empty values with existing IDs)
      const settingsToUpdate = [];
      const settingsToCreate = [];

      Object.entries(footerSettings).forEach(([key, value]) => {
        console.log(`🔍 Processing field: ${key}, value: "${value}"`);
        
        // Skip empty values for optional fields
        const isRequired = key === "company_name" || key === "company_email";
        const isEmpty = !value || (typeof value === 'string' && !value.trim());
        
        if (isEmpty && !isRequired) {
          console.log(`⏭️ Skipping empty optional field: ${key}`);
          return; // Skip empty optional fields
        }

        // Trim the value and ensure it's not empty (backend requirement: minLength: 1)
        const trimmedValue = value ? String(value).trim() : "";
        
        // Skip if value is empty after trimming (backend validation)
        if (!trimmedValue) {
          console.log(`⚠️ Skipping ${key} - empty value after trim`);
          return;
        }

        const existing = existingMap.get(key);
        const settingData = {
          key,
          value: trimmedValue,
          description: getFooterFieldDescription(key),
          category: "footer",
          isPublic: true,
          dataType: "string",
        };

        if (existing) {
          console.log(`📝 Marking ${key} for UPDATE (ID: ${existing.id})`);
          // Update existing setting - only if value changed
          if (existing.value !== trimmedValue) {
            console.log(`   Old value: "${existing.value}" -> New value: "${trimmedValue}"`);
            settingsToUpdate.push({
              ...settingData,
              id: existing.id,
            });
          } else {
            console.log(`   ⏭️ Skipping - value unchanged`);
          }
        } else if (trimmedValue) {
          console.log(`➕ Marking ${key} for CREATE`);
          // Only create new settings if they have a value
          settingsToCreate.push(settingData);
        } else {
          console.log(`⚠️ Skipping ${key} - no existing record and no value`);
        }
      });

      console.log(`\n📊 Summary: ${settingsToUpdate.length} to update, ${settingsToCreate.length} to create\n`);

      // Track operation counts for appropriate toast message
      let updatedCount = 0;
      let createdCount = 0;
      let autoUpdatedCount = 0;

      // Update existing settings individually
      if (settingsToUpdate.length > 0) {
        console.log("🔄 Updating existing settings:", settingsToUpdate);
        
        const updateResults = await Promise.allSettled(
          settingsToUpdate.map((setting) => api.put("/Settings", setting))
        );
        
        // Count successful updates
        updatedCount = updateResults.filter(
          (result) => result.status === "fulfilled"
        ).length;

        // Log any update failures
        updateResults.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(`❌ Failed to update setting ${settingsToUpdate[index].key}:`, result.reason);
            console.error(`   Request payload was:`, settingsToUpdate[index]);
          } else {
            console.log(`✅ Successfully updated: ${settingsToUpdate[index].key}`);
            console.log(`   Response:`, result.value?.data);
          }
        });
      }

      // Create new settings individually (backend doesn't have bulk create)
      if (settingsToCreate.length > 0) {
        console.log("➕ Creating new settings:", settingsToCreate);
        
        const createResults = await Promise.allSettled(
          settingsToCreate.map((setting) => api.post("/Settings", setting))
        );

        // Count successful creations
        createdCount = createResults.filter(
          (result) => result.status === "fulfilled"
        ).length;

        // Handle any "key already exists" errors by converting to PUT requests
        const failedSettings = createResults
          .map((result, index) => ({
            result,
            setting: settingsToCreate[index],
          }))
          .filter(({ result }) => result.status === "rejected");

        for (const { result, setting } of failedSettings) {
          const errorMessage = result.reason?.response?.data?.message || "";
          
          if (errorMessage.includes("Setting key already exists")) {
            console.log(`🔄 Setting ${setting.key} already exists, updating instead...`);
            try {
              // Fetch the existing setting to get its ID
              const existingResponse = await api.get(`/Settings/key/${setting.key}`);
              
              if (existingResponse.data?.success && existingResponse.data.data) {
                const existingId = existingResponse.data.data.id;
                
                console.log(`📝 Updating existing setting ${setting.key} with ID: ${existingId}`);
                
                // Perform PUT request to update the existing record
                await api.put("/Settings", {
                  id: existingId,
                  key: setting.key,
                  value: setting.value,
                  description: setting.description,
                  category: setting.category,
                  isPublic: setting.isPublic,
                  dataType: setting.dataType,
                });
                
                autoUpdatedCount++;
                console.log(`✅ Auto-updated existing setting: ${setting.key}`);
              }
            } catch (updateError) {
              console.error(`❌ Failed to auto-update setting ${setting.key}:`, updateError);
              showToast("error", "Failed to save footer settings. Please try again.");
              throw updateError; // Re-throw to be caught by outer catch block
            }
          } else {
            // If it's not a "key already exists" error, throw it
            console.error(`❌ Failed to create setting ${setting.key}:`, result.reason);
            showToast("error", "Failed to save footer settings. Please try again.");
            throw result.reason;
          }
        }
      }

      // Show appropriate success message based on operations performed
      console.log(`\n🎯 Final counts: updated=${updatedCount}, created=${createdCount}, autoUpdated=${autoUpdatedCount}`);
      
      if (autoUpdatedCount > 0) {
        showToast("success", "Existing setting updated successfully");
      } else if (createdCount > 0 && updatedCount > 0) {
        showToast("success", "Footer settings saved and updated successfully");
      } else if (updatedCount > 0) {
        showToast("success", "Footer settings updated successfully");
      } else if (createdCount > 0) {
        showToast("success", "Footer settings saved successfully");
      } else {
        console.warn("⚠️ No settings were updated or created!");
        showToast("success", "Footer settings processed successfully");
      }

      // Refetch to update state with latest data
      console.log("🔄 Refetching footer settings...");
      await fetchFooterSettings();
      console.log("✅ Save operation completed successfully");
      return true;
    } catch (error) {
      console.error("Error saving footer settings:", error);
      // Only show error toast if not already shown in the inner catch blocks
      if (!error.message?.includes("Failed to save footer settings")) {
        showToast("error", "Failed to save footer settings. Please try again.");
      }
      return false;
    } finally {
      setFooterLoading(false);
    }
  };

  // Helper function to validate URLs
  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  // Helper function to get field descriptions
  const getFooterFieldDescription = (key) => {
    const descriptions = {
      company_name: "Company name displayed in footer",
      company_tagline: "Company tagline/slogan",
      company_address: "Company physical address",
      company_email: "Contact email address",
      company_phone: "Contact phone number",
      footer_link_1_label: "First quick link text",
      footer_link_1_url: "First quick link URL",
      footer_link_2_label: "Second quick link text",
      footer_link_2_url: "Second quick link URL",
      footer_link_3_label: "Third quick link text",
      footer_link_3_url: "Third quick link URL",
      footer_service_1: "First service name",
      footer_service_2: "Second service name",
      footer_service_3: "Third service name",
      footer_service_4: "Fourth service name",
      footer_service_5: "Fifth service name",
      social_facebook: "Facebook profile URL",
      social_twitter: "Twitter profile URL",
      social_linkedin: "LinkedIn profile URL",
    };
    return descriptions[key] || "";
  };

  // Load footer settings on component mount
  useEffect(() => {
    if (activeTab === "footer") {
      fetchFooterSettings();
    }
  }, [activeTab]);

  // Persistence: load and save settings.json via admin API
  const { data: persistedSettings, updateData } = useJsonData("settings.json");

  useEffect(() => {
    if (persistedSettings && typeof persistedSettings === "object") {
      if (persistedSettings.generalSettings) {
        setGeneralSettings((prev) => ({ ...prev, ...persistedSettings.generalSettings }));
      }
      if (persistedSettings.permissionSettings) {
        setPermissionSettings((prev) => ({ ...prev, ...persistedSettings.permissionSettings }));
      }
      // Removed integration settings merge
    }
  }, [persistedSettings]);

  const saveAllSettings = async () => {
    if (!updateData) return false;
    const payload = {
      generalSettings,
      permissionSettings,
    };
    try {
      const ok = await updateData(payload, "settings.json");
      return ok;
    } catch {
      return false;
    }
  };

  const tabs = [
    {
      id: "general",
      name: "General",
      icon: Cog6ToothIcon,
      description: "Site configuration and branding",
    },
    {
      id: "permissions",
      name: "Permissions",
      icon: UserGroupIcon,
      description: "User roles and access control",
    },
    {
      id: "footer",
      name: "Footer Information",
      icon: BuildingOfficeIcon,
      description: "Manage footer content and links",
    },
    // Removed integrations tab
  ];

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3000);
  };

  const handleSaveGeneral = async () => {
    const ok = await saveAllSettings();
    showToast(ok ? "success" : "error", ok ? "General settings saved successfully" : "Failed to save settings");
  };

  const handleSavePermissions = async () => {
    const ok = await saveAllSettings();
    showToast(ok ? "success" : "error", ok ? "Permission settings saved successfully" : "Failed to save settings");
  };

  // Removed integrations save handler

  const resetToDefaults = (section) => {
    if (section === "general") {
      setGeneralSettings({
        siteName: "Bellatrix",
        siteDescription: "Professional business solutions and services",
        siteUrl: "https://bellatrix.com",
        adminEmail: "admin@bellatrix.com",
        clientTheme: "light",
        adminTheme: "light",
        logo: null,
        favicon: null,
      });
      showToast("info", "General settings reset to defaults");
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      {/* Site Information */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Site Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Site Name"
              value={generalSettings.siteName}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  siteName: e.target.value,
                })
              }
              placeholder="Enter site name"
            />
            <Input
              label="Admin Email"
              type="email"
              value={generalSettings.adminEmail}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  adminEmail: e.target.value,
                })
              }
              placeholder="admin@example.com"
            />
            {/* Timezone removed */}
            {/* Language removed */}
          </div>
          <div className="mt-4">
            <Textarea
              label="Site Description"
              value={generalSettings.siteDescription}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  siteDescription: e.target.value,
                })
              }
              placeholder="Brief description of your website"
              rows={3}
            />
          </div>
          <div className="mt-4">
            <Input
              label="Site URL"
              value={generalSettings.siteUrl}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  siteUrl: e.target.value,
                })
              }
              placeholder="https://yoursite.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Branding / Theme */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Client Theme"
              value={generalSettings.clientTheme}
              className="bg-white/5 border-white/20 text-white dark:bg-white/10 dark:border-white/20 dark:text-white focus-visible:ring-blue-500"
              optionClassName="bg-gray-900 text-white dark:bg-gray-800 dark:text-white"
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  clientTheme: e.target.value,
                })
              }
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
            />
            <Select
              label="Admin Dashboard Theme"
              value={generalSettings.adminTheme}
              className="bg-white/5 border-white/20 text-white dark:bg-white/10 dark:border-white/20 dark:text-white focus-visible:ring-blue-500"
              optionClassName="bg-gray-900 text-white dark:bg-gray-800 dark:text-white"
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  adminTheme: e.target.value,
                })
              }
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-[oklch(0.75_0.02_260.29)] dark:text-gray-300 mb-2">
                Logo
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <PhotoIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Upload your logo (recommended: 200x50px)
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[oklch(0.75_0.02_260.29)] dark:text-gray-300 mb-2">
                Favicon
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <PhotoIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Upload favicon (recommended: 32x32px)
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => resetToDefaults("general")}>
          Reset to Defaults
        </Button>
        <Button onClick={handleSaveGeneral}>Save General Settings</Button>
      </div>
    </div>
  );

  const renderPermissionSettings = () => (
    <div className="space-y-8">
      {/* Roles Management */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
                <ShieldCheckIcon className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-white text-xl font-bold">User Roles</CardTitle>
                <p className="text-gray-300 text-sm mt-1">Manage user permissions and access levels</p>
              </div>
            </div>
            <Button 
              size="sm" 
              onClick={openAddRole}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/25"
            >
              <UserGroupIcon className="h-4 w-4 mr-2" />
              Add Role
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {permissionSettings.roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative overflow-hidden bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:from-white/15 hover:to-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                        <ShieldCheckIcon className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">
                          {role.name}
                        </h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-2 text-sm text-gray-300">
                            <UserGroupIcon className="h-4 w-4" />
                            <span>{role.users} user{role.users !== 1 ? "s" : ""}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-300">
                            <ShieldCheckIcon className="h-4 w-4" />
                            <span>{role.permissions.length} permission{role.permissions.length !== 1 ? "s" : ""}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Permission Badges */}
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, permIndex) => (
                        <motion.span
                          key={permission}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: permIndex * 0.05 }}
                          className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 rounded-full border border-blue-400/30 hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-200"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                          {permission.replace("_", " ")}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => openEditRole(role)}
                      className="text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-400/30 transition-all duration-200"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-400/30 transition-all duration-200"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Permission Settings */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-lg">
              <Cog6ToothIcon className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <CardTitle className="text-white text-xl font-bold">Permission Settings</CardTitle>
              <p className="text-gray-300 text-sm mt-1">Configure default permissions and security settings</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-white font-medium">Require Admin Approval for New Users</span>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  permissionSettings.requireApproval ? "bg-blue-600" : "bg-gray-600"
                }`}
                onClick={() =>
                  setPermissionSettings({
                    ...permissionSettings,
                    requireApproval: !permissionSettings.requireApproval,
                  })
                }
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    permissionSettings.requireApproval ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Default Role for New Users</label>
                <Select
                  value={permissionSettings.defaultRole}
                  onChange={(e) =>
                    setPermissionSettings({
                      ...permissionSettings,
                      defaultRole: e.target.value,
                    })
                  }
                  options={permissionSettings.roles.map((role) => ({
                    value: role.name,
                    label: role.name,
                  }))}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Session Timeout (hours)</label>
                <Input
                  type="number"
                  value={permissionSettings.sessionTimeout}
                  onChange={(e) =>
                    setPermissionSettings({
                      ...permissionSettings,
                      sessionTimeout: parseInt(e.target.value),
                    })
                  }
                  placeholder="24"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSavePermissions}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/25 px-8 py-3"
        >
          Save Permission Settings
        </Button>
      </div>
    </div>
  );

  const renderFooterSettings = () => (
    <div className="space-y-8">
      {/* Company Information */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
              <BuildingOfficeIcon className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-white text-xl font-bold">Company Information</CardTitle>
              <p className="text-gray-300 text-sm mt-1">Manage company details displayed in footer</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Company Name <span className="text-red-400">*</span>
              </label>
              <Input
                value={footerSettings.company_name}
                onChange={(e) => setFooterSettings({ ...footerSettings, company_name: e.target.value })}
                placeholder="Bellatrix"
                className={`bg-white/5 border-white/20 text-white ${footerErrors.company_name ? "border-red-500" : ""}`}
              />
              {footerErrors.company_name && (
                <p className="text-red-400 text-xs mt-1">{footerErrors.company_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Company Email <span className="text-red-400">*</span>
              </label>
              <Input
                type="email"
                value={footerSettings.company_email}
                onChange={(e) => setFooterSettings({ ...footerSettings, company_email: e.target.value })}
                placeholder="info@bellatrix.com"
                className={`bg-white/5 border-white/20 text-white ${footerErrors.company_email ? "border-red-500" : ""}`}
              />
              {footerErrors.company_email && (
                <p className="text-red-400 text-xs mt-1">{footerErrors.company_email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Company Phone</label>
              <Input
                type="tel"
                value={footerSettings.company_phone}
                onChange={(e) => setFooterSettings({ ...footerSettings, company_phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Company Address</label>
              <Input
                value={footerSettings.company_address}
                onChange={(e) => setFooterSettings({ ...footerSettings, company_address: e.target.value })}
                placeholder="123 Business St, City, State"
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-300">Company Tagline</label>
              <Textarea
                value={footerSettings.company_tagline}
                onChange={(e) => setFooterSettings({ ...footerSettings, company_tagline: e.target.value })}
                placeholder="Your company slogan or description"
                rows={2}
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg">
              <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div>
              <CardTitle className="text-white text-xl font-bold">Quick Links</CardTitle>
              <p className="text-gray-300 text-sm mt-1">Configure footer navigation links</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Link {num} Label</label>
                  <Input
                    value={footerSettings[`footer_link_${num}_label`]}
                    onChange={(e) => setFooterSettings({ ...footerSettings, [`footer_link_${num}_label`]: e.target.value })}
                    placeholder={`Link ${num}`}
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Link {num} URL</label>
                  <Input
                    value={footerSettings[`footer_link_${num}_url`]}
                    onChange={(e) => setFooterSettings({ ...footerSettings, [`footer_link_${num}_url`]: e.target.value })}
                    placeholder="https://example.com"
                    className={`bg-white/5 border-white/20 text-white ${footerErrors[`footer_link_${num}_url`] ? "border-red-500" : ""}`}
                  />
                  {footerErrors[`footer_link_${num}_url`] && (
                    <p className="text-red-400 text-xs mt-1">{footerErrors[`footer_link_${num}_url`]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg">
              <Cog6ToothIcon className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <CardTitle className="text-white text-xl font-bold">Services</CardTitle>
              <p className="text-gray-300 text-sm mt-1">List your key services</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Service {num}</label>
                <Input
                  value={footerSettings[`footer_service_${num}`]}
                  onChange={(e) => setFooterSettings({ ...footerSettings, [`footer_service_${num}`]: e.target.value })}
                  placeholder={`Service ${num}`}
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-lg">
              <svg className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <CardTitle className="text-white text-xl font-bold">Social Media Links</CardTitle>
              <p className="text-gray-300 text-sm mt-1">Connect your social media profiles</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Facebook URL</label>
              <Input
                value={footerSettings.social_facebook}
                onChange={(e) => setFooterSettings({ ...footerSettings, social_facebook: e.target.value })}
                placeholder="https://facebook.com/yourpage"
                className={`bg-white/5 border-white/20 text-white ${footerErrors.social_facebook ? "border-red-500" : ""}`}
              />
              {footerErrors.social_facebook && (
                <p className="text-red-400 text-xs mt-1">{footerErrors.social_facebook}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Twitter URL</label>
              <Input
                value={footerSettings.social_twitter}
                onChange={(e) => setFooterSettings({ ...footerSettings, social_twitter: e.target.value })}
                placeholder="https://twitter.com/yourhandle"
                className={`bg-white/5 border-white/20 text-white ${footerErrors.social_twitter ? "border-red-500" : ""}`}
              />
              {footerErrors.social_twitter && (
                <p className="text-red-400 text-xs mt-1">{footerErrors.social_twitter}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">LinkedIn URL</label>
              <Input
                value={footerSettings.social_linkedin}
                onChange={(e) => setFooterSettings({ ...footerSettings, social_linkedin: e.target.value })}
                placeholder="https://linkedin.com/company/yourcompany"
                className={`bg-white/5 border-white/20 text-white ${footerErrors.social_linkedin ? "border-red-500" : ""}`}
              />
              {footerErrors.social_linkedin && (
                <p className="text-red-400 text-xs mt-1">{footerErrors.social_linkedin}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={() => setFooterSettings({
            company_name: "",
            company_tagline: "",
            company_address: "",
            company_email: "",
            company_phone: "",
            footer_link_1_label: "",
            footer_link_1_url: "",
            footer_link_2_label: "",
            footer_link_2_url: "",
            footer_link_3_label: "",
            footer_link_3_url: "",
            footer_service_1: "",
            footer_service_2: "",
            footer_service_3: "",
            footer_service_4: "",
            footer_service_5: "",
            social_facebook: "",
            social_twitter: "",
            social_linkedin: "",
          })}
          disabled={footerLoading}
          className="text-gray-300 hover:text-white border-white/20"
        >
          Reset to Defaults
        </Button>
        <Button 
          onClick={saveFooterSettings}
          disabled={footerLoading}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/25 px-8 py-3"
        >
          {footerLoading ? "Saving..." : "Save Footer Settings"}
        </Button>
      </div>
    </div>
  );

  // Removed integration settings renderer

  return (
    <div className="space-y-6 text-white">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Settings
        </h2>
        <p className="text-gray-300">
          Configure your application settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/10">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative py-4 px-1 font-medium text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-5 w-5" />
                  <span>{tab.name}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {tab.description}
                </div>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    layoutId="activeTab"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="[&_input]:bg-white/5 [&_input]:border-white/20 [&_input]:text-white [&_textarea]:bg-white/5 [&_textarea]:border-white/20 [&_textarea]:text-white">
          {activeTab === "general" && renderGeneralSettings()}
          {activeTab === "permissions" && renderPermissionSettings()}
          {activeTab === "footer" && renderFooterSettings()}
          {/* integrations tab removed */}
        </div>
      </motion.div>

      {/* Toast Notification */}
      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.show}
        onClose={() => setToast({ show: false, type: "", message: "" })}
      />

      {/* Add/Edit Role Modal */}
      <Modal isOpen={isRoleModalOpen} onClose={closeRoleModal} title={editingRoleId != null ? "Edit Role" : "Add Role"}>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Role Name</label>
            <Input
              placeholder="Enter role name"
              value={roleForm.name}
              onChange={(e) => setRoleForm((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-white/5 border-white/20 text-white placeholder-gray-400"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Permissions</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availablePermissions.map((perm) => {
                const checked = roleForm.permissions.includes(perm);
                return (
                  <motion.label 
                    key={perm} 
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                      checked 
                        ? 'bg-blue-500/20 border-blue-400/50 text-blue-300' 
                        : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => togglePermissionInForm(perm)}
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        checked 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-white/30 bg-transparent'
                      }`}>
                        {checked && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </motion.svg>
                        )}
                      </div>
                    </div>
                    <span className="capitalize font-medium">{perm.replace("_", " ")}</span>
                  </motion.label>
                );
              })}
            </div>
          </div>
        </div>

        <ModalFooter className="mt-8">
          <Button 
            variant="ghost" 
            onClick={closeRoleModal}
            className="text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20"
          >
            Cancel
          </Button>
          <Button 
            onClick={saveRoleFromForm}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/25"
          >
            {editingRoleId != null ? "Save Changes" : "Add Role"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SettingsManagement;
