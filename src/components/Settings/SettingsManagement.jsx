import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Card, Button, Badge } from '../UI';
import {
  CogIcon,
  SwatchIcon,
  UserGroupIcon,
  LinkIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

const SettingsManagement = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Bellatrix Admin',
      siteDescription: 'Professional business management platform',
      primaryColor: '#3B82F6',
      logo: null,
      timezone: 'UTC',
      language: 'en',
    },
    permissions: {
      defaultRole: 'viewer',
      allowRegistration: true,
      requireEmailVerification: true,
      sessionTimeout: 30,
    },
    integrations: {
      apiKey: '',
      webhookUrl: '',
      emailProvider: 'smtp',
      smtpHost: '',
      smtpPort: 587,
      smtpUsername: '',
      smtpPassword: '',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyReports: true,
      systemAlerts: true,
    },
  });
  
  const [unsavedChanges, setUnsavedChanges] = useState({});
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const tabs = [
    {
      id: 'general',
      name: 'General',
      icon: CogIcon,
      description: 'Basic site configuration',
    },
    {
      id: 'appearance',
      name: 'Appearance',
      icon: SwatchIcon,
      description: 'Themes and branding',
    },
    {
      id: 'permissions',
      name: 'Permissions',
      icon: UserGroupIcon,
      description: 'User roles and access',
    },
    {
      id: 'integrations',
      name: 'Integrations',
      icon: LinkIcon,
      description: 'APIs and services',
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: BellIcon,
      description: 'Email and alerts',
    },
    {
      id: 'security',
      name: 'Security',
      icon: ShieldCheckIcon,
      description: 'Safety and compliance',
    },
  ];

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
    
    setUnsavedChanges(prev => ({
      ...prev,
      [section]: true,
    }));
  };

  const saveSettings = async (section) => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUnsavedChanges(prev => ({
      ...prev,
      [section]: false,
    }));
    
    setSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const resetSection = (section) => {
    // Reset to default values (this would come from API)
    const defaults = {
      general: {
        siteName: 'Bellatrix Admin',
        siteDescription: 'Professional business management platform',
        primaryColor: '#3B82F6',
        logo: null,
        timezone: 'UTC',
        language: 'en',
      },
      // Add other defaults as needed
    };
    
    if (defaults[section]) {
      setSettings(prev => ({
        ...prev,
        [section]: defaults[section],
      }));
      setUnsavedChanges(prev => ({
        ...prev,
        [section]: true,
      }));
    }
  };

  const FormSection = ({ title, description, children, actions }) => (
    <div className="space-y-6">
      <div className="pb-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className={`${colors.text} text-lg font-semibold`}>{title}</h3>
        {description && (
          <p className={`${colors.textSecondary} text-sm mt-1`}>{description}</p>
        )}
      </div>
      <div className="space-y-6">
        {children}
      </div>
      {actions && (
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          {actions}
        </div>
      )}
    </div>
  );

  const FormField = ({ label, description, children, required = false }) => (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${colors.text}`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {description && (
        <p className={`text-xs ${colors.textSecondary}`}>{description}</p>
      )}
      {children}
    </div>
  );

  const renderGeneralSettings = () => (
    <FormSection
      title="General Settings"
      description="Configure basic site information and preferences"
      actions={[
        <Button
          key="save"
          onClick={() => saveSettings('general')}
          disabled={!unsavedChanges.general}
          loading={saving}
        >
          <CheckIcon className="w-4 h-4 mr-2" />
          Save Changes
        </Button>,
        <Button
          key="reset"
          variant="outline"
          onClick={() => resetSection('general')}
        >
          Reset to Default
        </Button>,
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Site Name" required>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
            className={`
              w-full px-3 py-2 border rounded-lg
              ${colors.surface} ${colors.border} ${colors.text}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            `}
          />
        </FormField>

        <FormField label="Primary Color">
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={settings.general.primaryColor}
              onChange={(e) => updateSetting('general', 'primaryColor', e.target.value)}
              className="w-12 h-10 rounded border-2 border-gray-300"
            />
            <input
              type="text"
              value={settings.general.primaryColor}
              onChange={(e) => updateSetting('general', 'primaryColor', e.target.value)}
              className={`
                flex-1 px-3 py-2 border rounded-lg
                ${colors.surface} ${colors.border} ${colors.text}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              `}
            />
          </div>
        </FormField>
      </div>

      <FormField 
        label="Site Description" 
        description="Brief description of your site for SEO and social sharing"
      >
        <textarea
          rows={3}
          value={settings.general.siteDescription}
          onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
          className={`
            w-full px-3 py-2 border rounded-lg resize-none
            ${colors.surface} ${colors.border} ${colors.text}
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          `}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Timezone">
          <select
            value={settings.general.timezone}
            onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
            className={`
              w-full px-3 py-2 border rounded-lg
              ${colors.surface} ${colors.border} ${colors.text}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            `}
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">London</option>
          </select>
        </FormField>

        <FormField label="Language">
          <select
            value={settings.general.language}
            onChange={(e) => updateSetting('general', 'language', e.target.value)}
            className={`
              w-full px-3 py-2 border rounded-lg
              ${colors.surface} ${colors.border} ${colors.text}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            `}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </FormField>
      </div>
    </FormSection>
  );

  const renderPermissionsSettings = () => (
    <FormSection
      title="User Permissions"
      description="Configure user roles and access controls"
      actions={[
        <Button
          key="save"
          onClick={() => saveSettings('permissions')}
          disabled={!unsavedChanges.permissions}
          loading={saving}
        >
          <CheckIcon className="w-4 h-4 mr-2" />
          Save Changes
        </Button>,
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Default Role" description="Role assigned to new users">
          <select
            value={settings.permissions.defaultRole}
            onChange={(e) => updateSetting('permissions', 'defaultRole', e.target.value)}
            className={`
              w-full px-3 py-2 border rounded-lg
              ${colors.surface} ${colors.border} ${colors.text}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            `}
          >
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </FormField>

        <FormField label="Session Timeout" description="Minutes before auto-logout">
          <input
            type="number"
            min="5"
            max="480"
            value={settings.permissions.sessionTimeout}
            onChange={(e) => updateSetting('permissions', 'sessionTimeout', parseInt(e.target.value))}
            className={`
              w-full px-3 py-2 border rounded-lg
              ${colors.surface} ${colors.border} ${colors.text}
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            `}
          />
        </FormField>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className={`${colors.text} font-medium`}>Allow User Registration</p>
            <p className={`${colors.textSecondary} text-sm`}>Let new users create accounts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.permissions.allowRegistration}
              onChange={(e) => updateSetting('permissions', 'allowRegistration', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className={`${colors.text} font-medium`}>Require Email Verification</p>
            <p className={`${colors.textSecondary} text-sm`}>Users must verify email before access</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.permissions.requireEmailVerification}
              onChange={(e) => updateSetting('permissions', 'requireEmailVerification', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </FormSection>
  );

  const renderIntegrationsSettings = () => (
    <FormSection
      title="API & Integrations"
      description="Configure external services and API connections"
      actions={[
        <Button
          key="save"
          onClick={() => saveSettings('integrations')}
          disabled={!unsavedChanges.integrations}
          loading={saving}
        >
          <CheckIcon className="w-4 h-4 mr-2" />
          Save Changes
        </Button>,
      ]}
    >
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-800 dark:text-yellow-200 font-medium text-sm">Security Notice</p>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              Keep your API keys secure. Never share them publicly or store them in client-side code.
            </p>
          </div>
        </div>
      </div>

      <FormField 
        label="API Key" 
        description="Your secret API key for external integrations"
      >
        <input
          type="password"
          value={settings.integrations.apiKey}
          onChange={(e) => updateSetting('integrations', 'apiKey', e.target.value)}
          placeholder="Enter your API key"
          className={`
            w-full px-3 py-2 border rounded-lg
            ${colors.surface} ${colors.border} ${colors.text}
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          `}
        />
      </FormField>

      <FormField 
        label="Webhook URL" 
        description="URL to receive real-time notifications"
      >
        <input
          type="url"
          value={settings.integrations.webhookUrl}
          onChange={(e) => updateSetting('integrations', 'webhookUrl', e.target.value)}
          placeholder="https://your-domain.com/webhook"
          className={`
            w-full px-3 py-2 border rounded-lg
            ${colors.surface} ${colors.border} ${colors.text}
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          `}
        />
      </FormField>

      <div className="space-y-4">
        <h4 className={`${colors.text} font-semibold`}>Email Configuration</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="SMTP Host">
            <input
              type="text"
              value={settings.integrations.smtpHost}
              onChange={(e) => updateSetting('integrations', 'smtpHost', e.target.value)}
              placeholder="smtp.gmail.com"
              className={`
                w-full px-3 py-2 border rounded-lg
                ${colors.surface} ${colors.border} ${colors.text}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              `}
            />
          </FormField>

          <FormField label="SMTP Port">
            <input
              type="number"
              value={settings.integrations.smtpPort}
              onChange={(e) => updateSetting('integrations', 'smtpPort', parseInt(e.target.value))}
              className={`
                w-full px-3 py-2 border rounded-lg
                ${colors.surface} ${colors.border} ${colors.text}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              `}
            />
          </FormField>
        </div>
      </div>
    </FormSection>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'permissions':
        return renderPermissionsSettings();
      case 'integrations':
        return renderIntegrationsSettings();
      case 'appearance':
        return (
          <div className={`${colors.textSecondary} text-center py-12`}>
            <SwatchIcon className="w-12 h-12 mx-auto mb-4" />
            <p>Appearance settings coming soon</p>
          </div>
        );
      case 'notifications':
        return (
          <div className={`${colors.textSecondary} text-center py-12`}>
            <BellIcon className="w-12 h-12 mx-auto mb-4" />
            <p>Notification settings coming soon</p>
          </div>
        );
      case 'security':
        return (
          <div className={`${colors.textSecondary} text-center py-12`}>
            <ShieldCheckIcon className="w-12 h-12 mx-auto mb-4" />
            <p>Security settings coming soon</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`${colors.text} text-2xl font-bold`}>Settings</h1>
          <p className={`${colors.textSecondary} text-sm`}>
            Configure your system preferences and integrations
          </p>
        </div>
        {Object.values(unsavedChanges).some(Boolean) && (
          <Badge variant="warning" className="sm:w-auto">
            Unsaved Changes
          </Badge>
        )}
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <CheckIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              <p className="text-green-800 dark:text-green-200 font-medium">
                Settings saved successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card padding="p-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const hasChanges = unsavedChanges[tab.id];
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors
                      ${isActive 
                        ? `${colors.primary} text-white` 
                        : `${colors.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-800`
                      }
                      ${tab.id === 'general' ? 'rounded-t-2xl' : ''}
                      ${tab.id === 'security' ? 'rounded-b-2xl' : ''}
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{tab.name}</span>
                        {hasChanges && (
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        )}
                      </div>
                      <p className={`text-xs truncate ${isActive ? 'text-blue-100' : colors.textSecondary}`}>
                        {tab.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card padding="p-8">
            {renderTabContent()}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;