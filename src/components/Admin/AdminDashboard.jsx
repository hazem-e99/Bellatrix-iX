import React, { useState, useEffect, useCallback } from "react";
import {
  DocumentTextIcon,
  PencilIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  useDataFileList,
  useAdminJsonData,
  useRealTimeUpdates,
  useAdminSaveData,
} from "../../hooks/useAdminJsonServer.jsx";
import { getCacheManager } from "../../utils/cacheManager.js";
import { usePageDataSync } from "../../hooks/usePageDataSync.js";

// File List Component
const FileList = ({
  files,
  selectedFile,
  onFileSelect,
  loading,
  error,
  onRefresh,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <ArrowPathIcon className="w-6 h-6 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-300">Loading files...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
        <div className="flex items-center">
          <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
          <span className="ml-2 text-red-300">Error: {error}</span>
        </div>
        <button
          onClick={onRefresh}
          className="mt-2 text-sm text-red-400 hover:text-red-300 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Data Files</h2>
        <button
          onClick={onRefresh}
          className="p-1 text-gray-300 hover:text-white"
          title="Refresh file list"
        >
          <ArrowPathIcon className="w-4 h-4" />
        </button>
      </div>

      {files.length === 0 ? (
        <p className="text-gray-300 text-center py-8">No JSON files found</p>
      ) : (
        <div className="grid gap-2">
          {files.map((filename) => (
            <button
              key={filename}
              onClick={() => onFileSelect(filename)}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors text-left w-full ${
                selectedFile === filename
                  ? "border-blue-500 bg-blue-500/20 text-blue-300"
                  : "border-white/20 hover:border-white/30 hover:bg-white/5"
              }`}
            >
              <DocumentTextIcon className="w-5 h-5 flex-shrink-0 text-white/90" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate text-white">
                  {filename
                    .replace(".json", "")
                    .replace(/([A-Z])/g, " $1")
                    .trim()}
                </p>
                <p className="text-sm text-gray-400 truncate">{filename}</p>
              </div>
              {selectedFile === filename && (
                <PencilIcon className="w-4 h-4 text-blue-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Preview Component
const DataPreview = ({ data, filename }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!data) {
    return (
      <div className="p-4 bg-white/5 rounded-md">
        <p className="text-gray-300">No data to preview</p>
      </div>
    );
  }

  const jsonString = JSON.stringify(data, null, 2);
  const preview = isExpanded
    ? jsonString
    : jsonString.slice(0, 500) + (jsonString.length > 500 ? "..." : "");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-medium text-white">Preview: {filename}</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </div>
      <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto max-h-96">
        {preview}
      </pre>
    </div>
  );
};

// Main Editor Component
const DataEditor = ({ filename, data, onSave, loading, error }) => {
  const [editedData, setEditedData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setEditedData(JSON.parse(JSON.stringify(data))); // Deep clone
      setHasChanges(false);
    }
  }, [data]);

  const handleDataChange = useCallback((newData) => {
    setEditedData(newData);
    setHasChanges(true);
  }, []);

  const handleSave = useCallback(async () => {
    if (!hasChanges || !editedData) return;

    setSaving(true);
    try {
      const success = await onSave(editedData);
      if (success) {
        setHasChanges(false);
      }
    } finally {
      setSaving(false);
    }
  }, [editedData, hasChanges, onSave]);

  const handleReset = useCallback(() => {
    if (data) {
      setEditedData(JSON.parse(JSON.stringify(data)));
      setHasChanges(false);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <ArrowPathIcon className="w-6 h-6 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-300">Loading data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md">
        <div className="flex items-center">
          <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
          <span className="ml-2 text-red-300">Error: {error}</span>
        </div>
      </div>
    );
  }

  if (!editedData) {
    return (
      <div className="p-8 text-center text-gray-300">
        <DocumentTextIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p>Select a file to start editing</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Editing: {filename}
        </h2>

        <div className="flex items-center space-x-2">
          {hasChanges && (
            <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/30">
              Unsaved changes
            </span>
          )}

          <button
            onClick={handleReset}
            disabled={!hasChanges || saving}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-300 border border-white/20 rounded-md hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <XMarkIcon className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <ArrowPathIcon className="w-4 h-4 animate-spin" />
            ) : (
              <CheckIcon className="w-4 h-4" />
            )}
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white/10 border border-white/20 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          {filename} Configuration
        </h3>
        <textarea
          value={JSON.stringify(editedData, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              handleDataChange(parsed);
            } catch (error) {
              // Invalid JSON, don't update
            }
          }}
          rows={20}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
          placeholder="Enter JSON configuration..."
        />
      </div>
    </div>
  );
};

// Main Admin Dashboard Component
export const AdminDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' or 'preview'

  const {
    files,
    loading: filesLoading,
    error: filesError,
    refetch: refetchFiles,
  } = useDataFileList();
  const {
    data: selectedData,
    loading: dataLoading,
    error: dataError,
    refetch: refetchData,
  } = useAdminJsonData(selectedFile);

  const saveDataMutation = useAdminSaveData();
  const { syncAllPageData, syncPageData } = usePageDataSync();

  // Real-time updates
  useRealTimeUpdates(
    useCallback(
      (update) => {
        console.log("Received real-time update:", update);

        // If the updated file is currently selected, refetch it
        if (selectedFile && update.filename === selectedFile) {
          refetchData();
        }

        // Refresh file list to update any metadata
        refetchFiles();
      },
      [selectedFile, refetchData, refetchFiles]
    )
  );

  const handleFileSelect = useCallback((filename) => {
    setSelectedFile(filename);
    setActiveTab("editor");
  }, []);

  const handleSave = useCallback(
    async (newData) => {
      if (!selectedFile) return false;

      try {
        console.log("💾 Saving data...", { selectedFile, data: newData });

        // Save to JSON Server
        await saveDataMutation.mutateAsync({
          filename: selectedFile,
          data: newData,
        });

        console.log("✅ Data saved successfully");

        // Immediately sync the corresponding page data
        const endpointMap = {
          "hr.json": "hr",
          "payroll.json": "payroll",
          "homeData.json": "home",
          "Implementation.json": "Implementation",
          "training.json": "training",
          "netSuiteConsulting.json": "netsuite-consulting",
          "customization.json": "customization",
          "integration-data.json": "integration",
          "manufacturing-data.json": "manufacturing",
          "retail-data.json": "retail",
        };

        const endpoint = endpointMap[selectedFile];
        if (endpoint) {
          console.log(`🔄 Syncing page data for endpoint: ${endpoint}`);
          await syncPageData(endpoint);
          console.log(`✅ Page data synced for: ${endpoint}`);
        }

        return true;
      } catch (error) {
        console.error("❌ Error saving data:", error);
        return false;
      }
    },
    [selectedFile, saveDataMutation, syncPageData]
  );

  const handleForceRefresh = useCallback(async () => {
    try {
      console.log("🔄 Starting force refresh...");

      // Method 1: Use new sync system
      const syncSuccess = await syncAllPageData();

      // Method 2: Use cache manager as backup
      try {
        const cacheManager = getCacheManager();
        await cacheManager.forceRefreshAll();
      } catch (cacheError) {
        console.warn("Cache manager failed:", cacheError);
      }

      // Method 3: Refetch current admin data
      if (selectedFile) {
        refetchData();
      }

      if (syncSuccess) {
        console.log("✅ Force refresh completed successfully");
        alert("تم تحديث البيانات بنجاح! جرب الآن فتح الصفحات لرؤية التغييرات.");
      } else {
        console.warn("⚠️ Some data may not have refreshed properly");
        alert("تم التحديث لكن قد تحتاج لإعادة تحميل الصفحة يدوياً.");
      }
    } catch (error) {
      console.error("❌ Force refresh failed:", error);
      alert("حدث خطأ في التحديث. تأكد من أن الخوادم تعمل بشكل صحيح.");
    }
  }, [selectedFile, refetchData, syncAllPageData]);

  return (
    <div
      className="admin-component min-h-screen"
      style={{ backgroundColor: "#001038" }}
      data-dashboard="true"
    >
      {/* Header */}
      <div
        className="border-b border-white/10"
        style={{ backgroundColor: "#001038" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleForceRefresh}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                title="Force refresh all page data"
              >
                <ArrowPathIcon className="w-4 h-4" />
                <span>Force Refresh</span>
              </button>
              <span className="text-sm text-gray-300">
                Data Management System
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - File List */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white/10 border border-white/20 rounded-lg shadow p-6">
              <FileList
                files={files}
                selectedFile={selectedFile}
                onFileSelect={handleFileSelect}
                loading={filesLoading}
                error={filesError}
                onRefresh={refetchFiles}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-9">
            {selectedFile && (
              <div className="space-y-6">
                {/* Tab Navigation */}
                <div className="bg-white/10 border border-white/20 rounded-lg shadow">
                  <div className="border-b border-white/10">
                    <nav className="-mb-px flex space-x-8 px-6">
                      <button
                        onClick={() => setActiveTab("editor")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === "editor"
                            ? "border-blue-500 text-blue-400"
                            : "border-transparent text-gray-300 hover:text-white hover:border-white/30"
                        }`}
                      >
                        <PencilIcon className="w-4 h-4 inline mr-2" />
                        Editor
                      </button>
                      <button
                        onClick={() => setActiveTab("preview")}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === "preview"
                            ? "border-blue-500 text-blue-400"
                            : "border-transparent text-gray-300 hover:text-white hover:border-white/30"
                        }`}
                      >
                        <EyeIcon className="w-4 h-4 inline mr-2" />
                        Preview
                      </button>
                    </nav>
                  </div>

                  <div className="p-6">
                    {activeTab === "editor" ? (
                      <DataEditor
                        filename={selectedFile}
                        data={selectedData}
                        onSave={handleSave}
                        loading={dataLoading}
                        error={dataError}
                      />
                    ) : (
                      <DataPreview
                        data={selectedData}
                        filename={selectedFile}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {!selectedFile && (
              <div className="bg-white/10 border border-white/20 rounded-lg shadow p-12 text-center">
                <DocumentTextIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Welcome to Admin Dashboard
                </h3>
                <p className="text-gray-300">
                  Select a JSON file from the sidebar to start editing your
                  content.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
