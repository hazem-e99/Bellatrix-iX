import React, { useState, useEffect } from "react";
import {
  ArrowPathIcon,
  FolderIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { getSettingsGrouped } from "../services/settingsApi";

/**
 * SettingsGroupedView Component
 * Displays settings grouped by category (read-only advanced view)
 */
const SettingsGroupedView = () => {
  const [groupedSettings, setGroupedSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  /**
   * Fetch grouped settings on mount
   */
  useEffect(() => {
    fetchGroupedSettings();
  }, []);

  /**
   * Fetch settings grouped by category
   */
  const fetchGroupedSettings = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getSettingsGrouped();

      if (response.success && response.data) {
        setGroupedSettings(response.data);
        // Auto-expand first category
        if (response.data.length > 0) {
          setExpandedCategories(new Set([response.data[0].category]));
        }
      } else {
        setError(response.message || "Failed to load grouped settings");
        toast.error("Failed to load grouped settings");
      }
    } catch (err) {
      console.error("Error fetching grouped settings:", err);
      setError(err.message || "An error occurred");
      toast.error("An error occurred while loading settings");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggle category expansion
   */
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  /**
   * Format date string
   */
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  /**
   * Render loading state
   */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ArrowPathIcon className="w-8 h-8 text-blue-600 animate-spin mb-3" />
        <p className="text-gray-600 dark:text-gray-400">
          Loading grouped settings...
        </p>
      </div>
    );
  }

  /**
   * Render error state
   */
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <p className="text-red-600 dark:text-red-400 mb-3">{error}</p>
        <button
          onClick={fetchGroupedSettings}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  /**
   * Render empty state
   */
  if (!groupedSettings || groupedSettings.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
        <FolderIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 dark:text-gray-400">No settings found</p>
      </div>
    );
  }

  /**
   * Render grouped settings
   */
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cog6ToothIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Settings by Category
          </h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {groupedSettings.length}{" "}
          {groupedSettings.length === 1 ? "category" : "categories"}
        </span>
      </div>

      {/* Category Groups */}
      {groupedSettings.map((group) => {
        const isExpanded = expandedCategories.has(group.category);
        const settingsCount = group.settings?.length || 0;

        return (
          <div
            key={group.category}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(group.category)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FolderIcon
                  className={`w-5 h-5 transition-transform ${
                    isExpanded ? "rotate-0" : "-rotate-90"
                  }`}
                />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {group.category || "Uncategorized"}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {settingsCount}{" "}
                    {settingsCount === 1 ? "setting" : "settings"}
                  </p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Settings List */}
            {isExpanded && group.settings && group.settings.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {group.settings.map((setting) => (
                    <div
                      key={setting.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left Column */}
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
                                {setting.key}
                              </span>
                              {setting.isPublic && (
                                <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">
                                  Public
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              ID: {setting.id}
                            </span>
                          </div>

                          {setting.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {setting.description}
                            </p>
                          )}

                          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                            <p>
                              Type:{" "}
                              <span className="font-mono">
                                {setting.dataType || "string"}
                              </span>
                            </p>
                            <p>Created: {formatDate(setting.createdAt)}</p>
                            {setting.updatedAt && (
                              <p>Updated: {formatDate(setting.updatedAt)}</p>
                            )}
                          </div>
                        </div>

                        {/* Right Column - Value */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                            Value
                          </label>
                          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded p-3 font-mono text-sm text-gray-900 dark:text-gray-100 break-words">
                            {setting.value || (
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
          </div>
        );
      })}

      {/* Refresh Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={fetchGroupedSettings}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default SettingsGroupedView;
