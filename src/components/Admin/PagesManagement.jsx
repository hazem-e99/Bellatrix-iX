import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import { Input } from "../ui/Input";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import Modal, { ModalFooter } from "../ui/Modal";
import Toast from "../ui/Toast";

const PagesManagement = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [operationLoading, setOperationLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const ITEMS_PER_PAGE = 6;

  // Show toast notification
  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  }, []);

  // Fetch pages from API
  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:3001/api/pages");
      if (!response.ok) throw new Error("Failed to fetch pages");
      const data = await response.json();
      setPages(data);
    } catch (err) {
      setError(err.message);
      showToast("Error fetching pages: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Fetch single page data
  const fetchPageData = async (pageName) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/pages/${pageName}`
      );
      if (!response.ok) throw new Error("Failed to fetch page data");
      return await response.json();
    } catch (err) {
      showToast("Error fetching page data: " + err.message, "error");
      return null;
    }
  };

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  // Filter and paginate pages
  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPages = filteredPages.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Handle page operations
  const handleView = async (page) => {
    const fullPageData = await fetchPageData(page.name);
    if (fullPageData) {
      setSelectedPage(fullPageData);
      setShowViewModal(true);
    }
  };

  const handleEdit = async (page) => {
    const fullPageData = await fetchPageData(page.name);
    if (fullPageData) {
      setSelectedPage(fullPageData);
      setShowEditModal(true);
    }
  };

  const handleDelete = (page) => {
    setSelectedPage(page);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedPage) return;

    try {
      setOperationLoading(true);
      const response = await fetch(
        `http://localhost:3001/api/pages/${selectedPage.name}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete page");

      showToast(`Page "${selectedPage.name}" deleted successfully`, "success");
      await fetchPages(); // Refresh the list
      setShowDeleteModal(false);
      setSelectedPage(null);
    } catch (err) {
      showToast("Error deleting page: " + err.message, "error");
    } finally {
      setOperationLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <ArrowPathIcon className="h-5 w-5 animate-spin text-blue-500" />
          <span className="text-gray-600 dark:text-gray-400">
            Loading pages...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Error Loading Pages
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button onClick={fetchPages} variant="outline">
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Pages Management
          </h2>
          <p className="text-gray-600">
            Manage your website pages and content
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            icon={<PlusIcon className="h-4 w-4" />}
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create New Page
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg">
                <DocumentTextIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Pages
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {pages.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg">
                <CheckCircleIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  With Data
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {pages.filter((p) => p.hasData).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Last Updated
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {pages.length > 0
                    ? formatDate(
                        Math.max(
                          ...pages.map((p) => new Date(p.lastModified || 0))
                        )
                      )
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white border border-gray-200 shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <CardTitle className="text-gray-800">All Pages ({filteredPages.length})</CardTitle>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                icon={<MagnifyingGlassIcon className="h-4 w-4" />}
                className="w-64"
              />
              <Button variant="outline" onClick={fetchPages} className="hover:bg-blue-50 hover:border-blue-300">
                <ArrowPathIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {paginatedPages.length === 0 ? (
            <div className="text-center py-12">
              <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No pages found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "Get started by creating your first page"}
              </p>
              {!searchTerm && (
                <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create First Page
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Page
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Last Modified
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {paginatedPages.map((page, index) => (
                      <motion.tr
                        key={page.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-blue-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-800">
                                {page.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {page.filename}
                              </div>
                              {page.dataPreview &&
                                page.dataPreview.length > 0 && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    Fields: {page.dataPreview.join(", ")}
                                  </div>
                                )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {page.hasData ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircleIcon className="h-3 w-3 mr-1" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                              <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                              Empty
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatFileSize(page.size)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(page.lastModified)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleView(page)}
                              className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(page)}
                              className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(page)}
                              className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredPages.length)} of{" "}
                {filteredPages.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="hover:bg-blue-50 hover:border-blue-300"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-700 px-3 py-1 bg-blue-50 rounded-md">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="hover:bg-blue-50 hover:border-blue-300"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Modal */}
      <ViewPageModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        page={selectedPage}
      />

      {/* Edit Modal */}
      <EditPageModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        page={selectedPage}
        onSave={fetchPages}
        showToast={showToast}
      />

      {/* Create Modal */}
      <CreatePageModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={fetchPages}
        showToast={showToast}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Page"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Are you sure you want to delete this page?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                This action cannot be undone. The page "{selectedPage?.name}"
                and all its data will be permanently removed.
              </p>
            </div>
          </div>
        </div>
        <ModalFooter>
          <Button
            variant="outline"
            onClick={() => setShowDeleteModal(false)}
            disabled={operationLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={confirmDelete}
            loading={operationLoading}
          >
            {operationLoading ? "Deleting..." : "Delete Page"}
          </Button>
        </ModalFooter>
      </Modal>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

// View Page Modal Component
const ViewPageModal = ({ isOpen, onClose, page }) => {
  if (!page) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`View Page: ${page.name}`}
      size="lg"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Page Name
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {page.name}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Filename
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {page.filename}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            JSON Data
          </label>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 max-h-96 overflow-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              {JSON.stringify(page.data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// Dynamic Form Builder for JSON data
const buildFormFields = (data, onChange, prefix = "") => {
  const fields = [];

  Object.entries(data).forEach(([key, value]) => {
    const fieldKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      fields.push(
        <div key={fieldKey}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {key}
          </label>
          <Input
            value=""
            onChange={(e) => onChange(fieldKey, e.target.value)}
            placeholder="Enter value"
          />
        </div>
      );
    } else if (typeof value === "boolean") {
      fields.push(
        <div key={fieldKey} className="flex items-center">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(fieldKey, e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {key}
          </label>
        </div>
      );
    } else if (typeof value === "string") {
      if (value.length > 100) {
        fields.push(
          <div key={fieldKey}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {key}
            </label>
            <textarea
              value={value}
              onChange={(e) => onChange(fieldKey, e.target.value)}
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        );
      } else {
        fields.push(
          <div key={fieldKey}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {key}
            </label>
            <Input
              value={value}
              onChange={(e) => onChange(fieldKey, e.target.value)}
            />
          </div>
        );
      }
    } else if (typeof value === "number") {
      fields.push(
        <div key={fieldKey}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {key}
          </label>
          <Input
            type="number"
            value={value}
            onChange={(e) =>
              onChange(fieldKey, parseFloat(e.target.value) || 0)
            }
          />
        </div>
      );
    } else if (Array.isArray(value)) {
      fields.push(
        <div key={fieldKey}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {key} (Array)
          </label>
          <textarea
            value={JSON.stringify(value, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                onChange(fieldKey, parsed);
              } catch {
                // Invalid JSON, don't update
              }
            }}
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
          />
        </div>
      );
    } else if (typeof value === "object") {
      fields.push(
        <div
          key={fieldKey}
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
        >
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            {key}
          </h4>
          <div className="space-y-4">
            {buildFormFields(value, onChange, fieldKey)}
          </div>
        </div>
      );
    }
  });

  return fields;
};

// Edit Page Modal Component
const EditPageModal = ({ isOpen, onClose, page, onSave, showToast }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page?.data) {
      setFormData(JSON.parse(JSON.stringify(page.data))); // Deep clone
    }
  }, [page]);

  const handleFieldChange = (fieldPath, value) => {
    setFormData((prev) => {
      const newData = { ...prev };
      const keys = fieldPath.split(".");
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!(keys[i] in current)) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleSave = async () => {
    if (!page) return;

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3001/api/pages/${page.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: formData }),
        }
      );

      if (!response.ok) throw new Error("Failed to update page");

      showToast(`Page "${page.name}" updated successfully`, "success");
      await onSave(); // Refresh the pages list
      onClose();
    } catch (err) {
      showToast("Error updating page: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (!page) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Page: ${page.name}`}
      size="lg"
    >
      <div className="space-y-6">
        <div className="max-h-96 overflow-y-auto space-y-4">
          {buildFormFields(formData, handleFieldChange)}
        </div>
      </div>
      <ModalFooter>
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSave} loading={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// Create Page Modal Component
const CreatePageModal = ({ isOpen, onClose, onSave, showToast }) => {
  const [pageName, setPageName] = useState("");
  const [pageData, setPageData] = useState(
    '{\n  "title": "",\n  "content": "",\n  "description": ""\n}'
  );
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!pageName.trim()) {
      showToast("Please enter a page name", "error");
      return;
    }

    try {
      const parsedData = JSON.parse(pageData);
      setLoading(true);

      const response = await fetch("http://localhost:3001/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: pageName,
          data: parsedData,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create page");
      }

      showToast(`Page "${pageName}" created successfully`, "success");
      await onSave(); // Refresh the pages list
      onClose();
      setPageName("");
      setPageData(
        '{\n  "title": "",\n  "content": "",\n  "description": ""\n}'
      );
    } catch (err) {
      if (err instanceof SyntaxError) {
        showToast("Invalid JSON format", "error");
      } else {
        showToast("Error creating page: " + err.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Page" size="lg">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Page Name
          </label>
          <Input
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            placeholder="e.g., about, contact, services"
          />
          <p className="mt-1 text-xs text-gray-500">
            Use lowercase letters, numbers, and hyphens only. Will be saved as{" "}
            {pageName || "page-name"}.json
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Initial Data (JSON)
          </label>
          <textarea
            value={pageData}
            onChange={(e) => setPageData(e.target.value)}
            rows={10}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
            placeholder="Enter JSON data for the page"
          />
        </div>
      </div>
      <ModalFooter>
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleCreate} loading={loading}>
          {loading ? "Creating..." : "Create Page"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PagesManagement;
