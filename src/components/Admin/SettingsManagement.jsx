import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cog6ToothIcon,
  UserGroupIcon,
  PhotoIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import { Input, Textarea, Select } from "../ui/Input";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import Toast from "../ui/Toast";
import { useJsonData } from "../../hooks/useJsonData";
import Modal, { ModalFooter } from "../UI/Modal";

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
