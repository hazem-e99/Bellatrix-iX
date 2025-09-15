import React, { useState } from "react";
import {
  Cog6ToothIcon,
  UserGroupIcon,
  LinkIcon,
  PhotoIcon,
  ShieldCheckIcon,
  KeyIcon,
  BellIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import { Input, Textarea, Select } from "../ui/Input";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import Toast from "../ui/Toast";

const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  // Settings state
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Bellatrix",
    siteDescription: "Professional business solutions and services",
    siteUrl: "https://bellatrix.com",
    adminEmail: "admin@bellatrix.com",
    timezone: "UTC",
    language: "en",
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
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

  const [integrationSettings, setIntegrationSettings] = useState({
    googleAnalytics: "",
    googleTagManager: "",
    facebookPixel: "",
    apiKeys: {
      emailService: "",
      paymentGateway: "",
      cloudStorage: "",
    },
    webhooks: [
      {
        id: 1,
        name: "Order Notifications",
        url: "https://api.example.com/orders",
        events: ["order.created"],
      },
      {
        id: 2,
        name: "User Registrations",
        url: "https://api.example.com/users",
        events: ["user.created"],
      },
    ],
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  });

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
      id: "integrations",
      name: "Integrations",
      icon: LinkIcon,
      description: "API keys and third-party services",
    },
  ];

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3000);
  };

  const handleSaveGeneral = () => {
    console.log("Saving general settings:", generalSettings);
    showToast("success", "General settings saved successfully");
  };

  const handleSavePermissions = () => {
    console.log("Saving permission settings:", permissionSettings);
    showToast("success", "Permission settings saved successfully");
  };

  const handleSaveIntegrations = () => {
    console.log("Saving integration settings:", integrationSettings);
    showToast("success", "Integration settings saved successfully");
  };

  const resetToDefaults = (section) => {
    if (section === "general") {
      setGeneralSettings({
        siteName: "Bellatrix",
        siteDescription: "Professional business solutions and services",
        siteUrl: "https://bellatrix.com",
        adminEmail: "admin@bellatrix.com",
        timezone: "UTC",
        language: "en",
        primaryColor: "#3B82F6",
        secondaryColor: "#10B981",
        logo: null,
        favicon: null,
      });
      showToast("info", "General settings reset to defaults");
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      {/* Site Information */}
      <Card className="dark:bg-gray-800 dark:border-gray-700 border-gray-300">
        <CardHeader>
          <CardTitle className="dark:text-white text-gray-900">Site Information</CardTitle>
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
              className="text-gray-900"
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
              className="text-gray-900"
            />
            <Select
              label="Timezone"
              value={generalSettings.timezone}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  timezone: e.target.value,
                })
              }
              options={[
                { value: "UTC", label: "UTC" },
                { value: "America/New_York", label: "Eastern Time" },
                { value: "America/Chicago", label: "Central Time" },
                { value: "America/Los_Angeles", label: "Pacific Time" },
              ]}
            />
            <Select
              label="Language"
              value={generalSettings.language}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  language: e.target.value,
                })
              }
              options={[
                { value: "en", label: "English" },
                { value: "es", label: "Spanish" },
                { value: "fr", label: "French" },
                { value: "de", label: "German" },
              ]}
            />
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
              className="text-gray-900"
            />
          </div>
        </CardContent>
      </Card>

      {/* Branding */}
      <Card className="dark:bg-gray-800 dark:border-gray-700 border-gray-300">
        <CardHeader>
          <CardTitle className="dark:text-white text-gray-900">Branding</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={generalSettings.primaryColor}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      primaryColor: e.target.value,
                    })
                  }
                  className="h-10 w-16 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                />
                <Input
                  value={generalSettings.primaryColor}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      primaryColor: e.target.value,
                    })
                  }
                  placeholder="#3B82F6"
                  className="flex-1 text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={generalSettings.secondaryColor}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      secondaryColor: e.target.value,
                    })
                  }
                  className="h-10 w-16 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                />
                <Input
                  value={generalSettings.secondaryColor}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      secondaryColor: e.target.value,
                    })
                  }
                  placeholder="#10B981"
                  className="flex-1 text-gray-900"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">
                Logo
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <PhotoIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                  Upload your logo (recommended: 200x50px)
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">
                Favicon
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <PhotoIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
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
    <div className="space-y-6">
      {/* Roles Management */}
      <Card className="dark:bg-gray-800 dark:border-gray-700 border-gray-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="dark:text-white text-gray-900">User Roles</CardTitle>
            <Button size="sm">Add Role</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {permissionSettings.roles.map((role) => (
              <div
                key={role.id}
                className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-700 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <ShieldCheckIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {role.name}
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        {role.users} user{role.users !== 1 ? "s" : ""} •{" "}
                        {role.permissions.length} permission
                        {role.permissions.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded"
                      >
                        {permission.replace("_", " ")}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="dark:bg-gray-800 dark:border-gray-700 border-gray-300">
        <CardHeader>
          <CardTitle className="dark:text-white text-gray-900">Security Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Require approval for new users
                </label>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  New user accounts must be approved by an administrator
                </p>
              </div>
              <button
                onClick={() =>
                  setPermissionSettings({
                    ...permissionSettings,
                    requireApproval: !permissionSettings.requireApproval,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  permissionSettings.requireApproval
                    ? "bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    permissionSettings.requireApproval
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Default Role for New Users"
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
              />
              <Input
                label="Session Timeout (hours)"
                type="number"
                value={permissionSettings.sessionTimeout}
                onChange={(e) =>
                  setPermissionSettings({
                    ...permissionSettings,
                    sessionTimeout: parseInt(e.target.value),
                  })
                }
                placeholder="24"
                className="text-gray-900"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end">
        <Button onClick={handleSavePermissions}>
          Save Permission Settings
        </Button>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      {/* Analytics */}
      <Card className="dark:bg-gray-800 dark:border-gray-700 border-gray-300">
        <CardHeader>
          <CardTitle className="dark:text-white text-gray-900">
            Analytics & Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="Google Analytics ID"
              value={integrationSettings.googleAnalytics}
              onChange={(e) =>
                setIntegrationSettings({
                  ...integrationSettings,
                  googleAnalytics: e.target.value,
                })
              }
              placeholder="G-XXXXXXXXXX"
              className="text-gray-900"
            />
            <Input
              label="Google Tag Manager ID"
              value={integrationSettings.googleTagManager}
              onChange={(e) =>
                setIntegrationSettings({
                  ...integrationSettings,
                  googleTagManager: e.target.value,
                })
              }
              placeholder="GTM-XXXXXXX"
              className="text-gray-900"
            />
            <Input
              label="Facebook Pixel ID"
              value={integrationSettings.facebookPixel}
              onChange={(e) =>
                setIntegrationSettings({
                  ...integrationSettings,
                  facebookPixel: e.target.value,
                })
              }
              placeholder="123456789012345"
              className="text-gray-900"
            />
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card className="dark:bg-gray-800 dark:border-gray-700 border-gray-300">
        <CardHeader>
          <CardTitle className="dark:text-white text-gray-900">API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="Email Service API Key"
              type="password"
              value={integrationSettings.apiKeys.emailService}
              onChange={(e) =>
                setIntegrationSettings({
                  ...integrationSettings,
                  apiKeys: {
                    ...integrationSettings.apiKeys,
                    emailService: e.target.value,
                  },
                })
              }
              placeholder="••••••••••••••••"
              icon={<KeyIcon className="h-4 w-4" />}
              className="text-gray-900"
            />
            <Input
              label="Payment Gateway API Key"
              type="password"
              value={integrationSettings.apiKeys.paymentGateway}
              onChange={(e) =>
                setIntegrationSettings({
                  ...integrationSettings,
                  apiKeys: {
                    ...integrationSettings.apiKeys,
                    paymentGateway: e.target.value,
                  },
                })
              }
              placeholder="••••••••••••••••"
              icon={<KeyIcon className="h-4 w-4" />}
              className="text-gray-900"
            />
            <Input
              label="Cloud Storage API Key"
              type="password"
              value={integrationSettings.apiKeys.cloudStorage}
              onChange={(e) =>
                setIntegrationSettings({
                  ...integrationSettings,
                  apiKeys: {
                    ...integrationSettings.apiKeys,
                    cloudStorage: e.target.value,
                  },
                })
              }
              placeholder="••••••••••••••••"
              icon={<KeyIcon className="h-4 w-4" />}
              className="text-gray-900"
            />
          </div>
        </CardContent>
      </Card>

      {/* Webhooks */}
      <Card className="dark:bg-gray-800 dark:border-gray-700 border-gray-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="dark:text-white text-gray-900">Webhooks</CardTitle>
            <Button size="sm">Add Webhook</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {integrationSettings.webhooks.map((webhook) => (
              <div
                key={webhook.id}
                className="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-700 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {webhook.name}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {webhook.url}
                  </p>
                  <div className="flex space-x-1 mt-1">
                    {webhook.events.map((event) => (
                      <span
                        key={event}
                        className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="dark:bg-gray-800 dark:border-gray-700 border-gray-300">
        <CardHeader>
          <CardTitle className="dark:text-white text-gray-900">
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(integrationSettings.notifications).map(
              ([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BellIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <label className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {key} Notifications
                      </label>
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        Receive notifications via {key}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setIntegrationSettings({
                        ...integrationSettings,
                        notifications: {
                          ...integrationSettings.notifications,
                          [key]: !value,
                        },
                      })
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end">
        <Button onClick={handleSaveIntegrations}>
          Save Integration Settings
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h2>
        <p className="text-gray-700 dark:text-gray-400">
          Configure your application settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
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
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-5 w-5" />
                  <span>{tab.name}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {tab.description}
                </div>
                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div
        key={activeTab}
      >
        {activeTab === "general" && renderGeneralSettings()}
        {activeTab === "permissions" && renderPermissionSettings()}
        {activeTab === "integrations" && renderIntegrationSettings()}
      </div>

      {/* Toast Notification */}
      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.show}
        onClose={() => setToast({ show: false, type: "", message: "" })}
      />
    </div>
  );
};

export default SettingsManagement;
