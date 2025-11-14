import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cog6ToothIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  FolderOpenIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import SettingField from "../components/SettingField";
import SettingsGroupedView from "../components/SettingsGroupedView";
import useSettingsSync from "../hooks/useSettingsSync";
import { FOOTER_SETTINGS_MAP } from "../constants/settingsMap";
import {
  bulkUpdateSettings,
  createSetting,
  getPublicSettings,
} from "../services/settingsApi";

/**
 * FooterSettings Component
 * Main page for managing footer settings with tabs and bulk operations
 */
const FooterSettings = () => {
  // Tabs
  const [activeTab, setActiveTab] = useState("fields");

  // Custom hook for settings management
  const {
    loading,
    getAllFieldSettings,
    updateLocalSetting,
    removeLocalSetting,
    refresh,
    clearDirty,
    dirtyFields,
    markDirty,
  } = useSettingsSync();

  // Footer settings with current values
  const [footerSettings, setFooterSettings] = useState([]);

  // Bulk save state
  const [isBulkSaving, setIsBulkSaving] = useState(false);

  /**
   * Load footer settings when data changes
   */
  useEffect(() => {
    if (!loading) {
      const settings = getAllFieldSettings();
      setFooterSettings(settings);
    }
  }, [loading, getAllFieldSettings]);

  /**
   * Handle single field save success
   */
  const handleFieldSaveSuccess = (updatedSetting) => {
    console.log("📥 [FooterSettings] Received save success:", updatedSetting);
    
    // updatedSetting is the SettingDTO returned from API
    if (updatedSetting && updatedSetting.key) {
      updateLocalSetting(updatedSetting.key, updatedSetting);
      // Refresh footer settings
      const settings = getAllFieldSettings();
      setFooterSettings(settings);
      console.log("✅ [FooterSettings] Field saved and UI refreshed");
    } else {
      console.error("❌ [FooterSettings] Invalid updatedSetting received:", updatedSetting);
    }
  };

  /**
   * Handle single field delete success
   */
  const handleFieldDeleteSuccess = (key) => {
    removeLocalSetting(key);
    // Refresh footer settings
    const settings = getAllFieldSettings();
    setFooterSettings(settings);
  };

  /**
   * Handle bulk save
   * - Items with ID → PUT /api/Settings/bulk
   * - Items without ID → POST /api/Settings (individually)
   */
  const handleBulkSave = async () => {
    const dirtyKeysArray = Array.from(dirtyFields);

    if (dirtyKeysArray.length === 0) {
      toast.error("No changes to save");
      return;
    }

    setIsBulkSaving(true);

    try {
      const itemsToUpdate = [];
      const itemsToCreate = [];

      // Categorize dirty items
      footerSettings.forEach((item) => {
        if (dirtyKeysArray.includes(item.fieldDef.key)) {
          const fieldDef = item.fieldDef;
          const currentValue = item.existingValue || "";

          if (item.existingId) {
            // Has ID → update
            itemsToUpdate.push({
              id: item.existingId,
              key: fieldDef.key,
              value: currentValue,
              description: fieldDef.description || "",
              category: fieldDef.category || "footer",
              isPublic:
                fieldDef.isPublicDefault !== undefined
                  ? fieldDef.isPublicDefault
                  : true,
              dataType: fieldDef.dataType || "string",
            });
          } else {
            // No ID → create
            itemsToCreate.push({
              key: fieldDef.key,
              value: currentValue,
              description: fieldDef.description || "",
              category: fieldDef.category || "footer",
              isPublic:
                fieldDef.isPublicDefault !== undefined
                  ? fieldDef.isPublicDefault
                  : true,
              dataType: fieldDef.dataType || "string",
            });
          }
        }
      });

      let successCount = 0;
      let failCount = 0;

      // 1️⃣ Bulk update existing items
      if (itemsToUpdate.length > 0) {
        try {
          const bulkResponse = await bulkUpdateSettings(itemsToUpdate);
          if (bulkResponse.success) {
            successCount += itemsToUpdate.length;
          } else {
            failCount += itemsToUpdate.length;
            toast.error(`Bulk update failed: ${bulkResponse.message}`);
          }
        } catch (err) {
          console.error("Bulk update error:", err);
          failCount += itemsToUpdate.length;
          toast.error("Bulk update failed");
        }
      }

      // 2️⃣ Create new items individually
      if (itemsToCreate.length > 0) {
        for (const payload of itemsToCreate) {
          try {
            const createResponse = await createSetting(payload);
            if (createResponse.success && createResponse.data) {
              successCount++;
              updateLocalSetting(createResponse.data.key, createResponse.data);
            } else {
              failCount++;
            }
          } catch (err) {
            console.error(`Create error for ${payload.key}:`, err);
            failCount++;
          }
        }
      }

      // 3️⃣ Refresh data from API
      await refresh();

      // 4️⃣ Clear dirty flags
      clearDirty();

      // 5️⃣ Show result
      if (failCount === 0) {
        toast.success(
          `Successfully saved ${successCount} ${
            successCount === 1 ? "setting" : "settings"
          }`
        );
      } else {
        toast.error(
          `Saved ${successCount}, failed ${failCount}. Check console for details.`
        );
      }

      // Reload footer settings
      const settings = getAllFieldSettings();
      setFooterSettings(settings);
    } catch (err) {
      console.error("Bulk save error:", err);
      toast.error("An error occurred during bulk save");
    } finally {
      setIsBulkSaving(false);
    }
  };

  /**
   * Handle refresh button
   */
  const handleRefresh = async () => {
    await refresh();
    const settings = getAllFieldSettings();
    setFooterSettings(settings);
    toast.success("Settings refreshed");
  };

  /**
   * Render loading state
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading footer settings...</p>
        </div>
      </div>
    );
  }

  /**
   * Main render
   */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2">
              Footer Settings
            </h1>
            <p className="text-gray-400">
              Manage footer content, contact information, and social media links
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={handleRefresh}
              className="border border-gray-600 hover:border-gray-500"
            >
              <ArrowPathIcon className="w-5 h-5" />
            </Button>

            <Button
              onClick={handleBulkSave}
              disabled={dirtyFields.size === 0 || isBulkSaving}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isBulkSaving ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  Save All ({dirtyFields.size})
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white/5 backdrop-blur-sm p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab("fields")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "fields"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Cog6ToothIcon className="w-5 h-5" />
            Footer Fields
            <span className="px-2 py-0.5 text-xs rounded-full bg-white/20">
              {FOOTER_SETTINGS_MAP.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("advanced")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "advanced"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <FolderOpenIcon className="w-5 h-5" />
            Advanced View
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "fields" && (
            <motion.div
              key="fields"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">
                    Footer Field Settings
                  </CardTitle>
                  <p className="text-gray-400 mt-2">
                    Configure individual footer settings. Changes are tracked
                    and can be saved all at once.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {footerSettings.map((item) => (
                      <SettingField
                        key={item.fieldDef.key}
                        fieldDef={item.fieldDef}
                        existingValue={item.existingValue}
                        existingId={item.existingId}
                        onSaveSuccess={handleFieldSaveSuccess}
                        onDeleteSuccess={handleFieldDeleteSuccess}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "advanced" && (
            <motion.div
              key="advanced"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">
                    Advanced Settings View
                  </CardTitle>
                  <p className="text-gray-400 mt-2">
                    Browse all settings grouped by category. Uses GET
                    /api/Settings/grouped endpoint.
                  </p>
                </CardHeader>
                <CardContent>
                  <SettingsGroupedView />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm"
        >
          <p>
            Settings are loaded from{" "}
            <code className="bg-white/10 px-2 py-1 rounded text-blue-400">
              GET /api/Settings/public
            </code>
          </p>
          <p className="mt-1">
            Bulk updates use{" "}
            <code className="bg-white/10 px-2 py-1 rounded text-blue-400">
              PUT /api/Settings/bulk
            </code>{" "}
            and{" "}
            <code className="bg-white/10 px-2 py-1 rounded text-blue-400">
              POST /api/Settings
            </code>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FooterSettings;
