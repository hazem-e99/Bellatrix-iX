import React, { useState } from "react";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import SettingField from "../components/SettingField";
import SettingsGroupedView from "../components/SettingsGroupedView";
import useSettingsSync from "../hooks/useSettingsSync";
import { FOOTER_SETTINGS_MAP, validateField } from "../constants/settingsMap";
import { bulkUpdateSettings, searchSettings } from "../services/settingsApi";

/**
 * SettingsGeneral Page
 * Main page for managing footer settings with bulk operations
 */
const SettingsGeneral = () => {
  const [activeTab, setActiveTab] = useState("fields"); // 'fields' | 'grouped' | 'search'
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isBulkSaving, setIsBulkSaving] = useState(false);

  // Use settings sync hook
  const {
    settings,
    loading,
    initialLoad,
    lastFetchTime,
    getValue,
    getId,
    hasAnyDirty,
    updateLocalSetting,
    removeLocalSetting,
    refresh,
  } = useSettingsSync();

  /**
   * Handle search
   */
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setIsSearching(true);

    try {
      const response = await searchSettings(searchTerm);

      if (response.success && response.data) {
        setSearchResults(response.data);

        if (response.data.length === 0) {
          toast.info("No results found");
        } else {
          toast.success(`Found ${response.data.length} result(s)`);
        }
      } else {
        toast.error(response.message || "Search failed");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("An error occurred during search");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  /**
   * Handle bulk save
   * Collects all dirty fields and performs bulk update
   */
  const handleBulkSave = async () => {
    // Collect all settings that exist (have IDs)
    const settingsToUpdate = [];
    const validationErrors = [];

    FOOTER_SETTINGS_MAP.forEach((field) => {
      const settingId = getId(field.key);
      const currentValue = getValue(field.key);

      if (settingId) {
        // Validate field
        const validation = validateField(field.key, currentValue);
        if (!validation.isValid) {
          validationErrors.push(`${field.label}: ${validation.error}`);
        } else {
          settingsToUpdate.push({
            id: settingId,
            key: field.key,
            value: currentValue || "",
            description: field.description || "",
            category: field.category || "footer",
            isPublic:
              field.isPublicDefault !== undefined
                ? field.isPublicDefault
                : true,
            dataType: field.dataType || "string",
          });
        }
      }
    });

    // Check for validation errors
    if (validationErrors.length > 0) {
      toast.error(`Validation errors:\n${validationErrors.join("\n")}`);
      return;
    }

    // Check if there's anything to save
    if (settingsToUpdate.length === 0) {
      toast.info(
        "No existing settings to save. Please save individual fields first."
      );
      return;
    }

    setIsBulkSaving(true);

    try {
      const response = await bulkUpdateSettings(settingsToUpdate);

      if (response.success) {
        toast.success(
          `Successfully updated ${settingsToUpdate.length} setting(s)`
        );
        // Refresh to get latest data
        await refresh();
      } else {
        toast.error(response.message || "Bulk update failed");
      }
    } catch (error) {
      console.error("Bulk save error:", error);
      toast.error("An error occurred during bulk save");
    } finally {
      setIsBulkSaving(false);
    }
  };

  /**
   * Handle field save success
   */
  const handleFieldSaveSuccess = (settingData) => {
    updateLocalSetting(settingData.key, settingData);
  };

  /**
   * Handle field delete success
   */
  const handleFieldDeleteSuccess = (key) => {
    removeLocalSetting(key);
  };

  /**
   * Format last fetch time
   */
  const formatFetchTime = () => {
    if (!lastFetchTime) return "Never";
    return lastFetchTime.toLocaleTimeString();
  };

  /**
   * Render loading state
   */
  if (initialLoad) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Loading settings...
        </p>
      </div>
    );
  }

  /**
   * Render main content
   */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Footer Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your website footer configuration
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Last updated: {formatFetchTime()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Refresh Button */}
              <button
                onClick={() => refresh()}
                disabled={loading}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                title="Refresh settings"
              >
                <ArrowPathIcon
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>

              {/* Bulk Save Button */}
              <button
                onClick={handleBulkSave}
                disabled={!hasAnyDirty() || isBulkSaving || loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-semibold"
                title="Save all changes"
              >
                {isBulkSaving ? (
                  <>
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                      />
                    </svg>
                    Save All
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dirty Fields Indicator */}
          {hasAnyDirty() && (
            <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-yellow-600 dark:text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-sm text-yellow-800 dark:text-yellow-300">
                You have unsaved changes. Click "Save All" to update all
                settings.
              </span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("fields")}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors
                  ${
                    activeTab === "fields"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>Field Editor</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("search")}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors
                  ${
                    activeTab === "search"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <MagnifyingGlassIcon className="w-4 h-4" />
                  <span>Search</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("grouped")}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors
                  ${
                    activeTab === "grouped"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FolderIcon className="w-4 h-4" />
                  <span>Advanced View</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {/* Field Editor Tab */}
          {activeTab === "fields" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Footer Fields
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {FOOTER_SETTINGS_MAP.map((field) => (
                  <SettingField
                    key={field.key}
                    fieldDef={field}
                    existingValue={getValue(field.key)}
                    existingId={getId(field.key)}
                    onSaveSuccess={handleFieldSaveSuccess}
                    onDeleteSuccess={handleFieldDeleteSuccess}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Search Tab */}
          {activeTab === "search" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Search Settings
              </h2>

              {/* Search Bar */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search by key, value, or description..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching || !searchTerm.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <ArrowPathIcon className="w-4 h-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <MagnifyingGlassIcon className="w-4 h-4" />
                      Search
                    </>
                  )}
                </button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Results ({searchResults.length})
                  </h3>
                  <div className="space-y-2">
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-900 dark:text-white">
                                {result.key}
                              </span>
                              {result.isPublic && (
                                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">
                                  Public
                                </span>
                              )}
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                ID: {result.id}
                              </span>
                            </div>
                            {result.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {result.description}
                              </p>
                            )}
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded p-2 font-mono text-sm text-gray-900 dark:text-white">
                              {result.value || (
                                <span className="text-gray-400 italic">
                                  Empty
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.length === 0 && searchTerm && !isSearching && (
                <div className="mt-6 text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No results found for "{searchTerm}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Grouped View Tab */}
          {activeTab === "grouped" && (
            <div>
              <SettingsGroupedView />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsGeneral;
