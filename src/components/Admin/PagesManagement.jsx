import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
import ModernPageEditor from "./ModernPageEditor";
import Modal, { ModalFooter } from "../ui/Modal";
import Toast from "../ui/Toast";
import pagesAPI from "../../lib/pagesAPI";

const PagesManagement = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [showViewModal, setShowViewModal] = useState(false);
  const [operationLoading, setOperationLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  const ITEMS_PER_PAGE = 10;

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
      console.log("Fetching pages...");
      const data = await pagesAPI.getPages();
      console.log("Pages API response:", data);
      console.log("Data type:", typeof data);
      console.log("Is array:", Array.isArray(data));
      setPages(data);
    } catch (err) {
      console.error("Fetch pages error:", err);
      setError(err.message);
      showToast("Error fetching pages: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Fetch single page data
  const fetchPageData = async (pageId) => {
    try {
      return await pagesAPI.getPageById(pageId);
    } catch (err) {
      showToast("Error fetching page data: " + err.message, "error");
      return null;
    }
  };

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  // Filter and paginate pages
  const filteredPages = pages.filter(
    (page) =>
      (page.title &&
        page.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (page.slug &&
        page.slug.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (page.categoryName &&
        page.categoryName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedPages = [...filteredPages].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    const getVal = (p, key) => {
      if (key === "createdAt") return new Date(p.createdAt || 0).getTime();
      if (key === "title") return (p.title || "").toLowerCase();
      if (key === "slug") return (p.slug || "").toLowerCase();
      if (key === "categoryName") return (p.categoryName || "").toLowerCase();
      if (key === "componentCount") return Number(p.componentCount || 0);
      return p[key];
    };
    const av = getVal(a, sortBy);
    const bv = getVal(b, sortBy);
    if (av < bv) return -1 * dir;
    if (av > bv) return 1 * dir;
    return 0;
  });

  const totalPages = Math.ceil(sortedPages.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPages = sortedPages.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Handle page operations
  const handleView = async (page) => {
    const fullPageData = await fetchPageData(page.id);
    if (fullPageData) {
      setSelectedPage(fullPageData);
      setShowViewModal(true);
    }
  };

  const handleEdit = async (page) => {
    const fullPageData = await fetchPageData(page.id);
    if (fullPageData) {
      setSelectedPage(fullPageData);
      setShowEditModal(true);
    }
  };

  const handleDelete = (page) => {
    setSelectedPage(page);
    setShowDeleteModal(true);
  };

  const handleToggleSort = (key) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    const pageIds = paginatedPages.map((p) => p.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    setSelectedIds(allSelected ? selectedIds.filter((id) => !pageIds.includes(id)) : Array.from(new Set([...selectedIds, ...pageIds])));
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    try {
      setOperationLoading(true);
      for (const id of selectedIds) {
        await pagesAPI.deletePage(id);
      }
      showToast(`Deleted ${selectedIds.length} page(s)`, "success");
      setSelectedIds([]);
      await fetchPages();
    } catch (err) {
      showToast("Error deleting selected pages: " + err.message, "error");
    } finally {
      setOperationLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!selectedPage) return;

    try {
      setOperationLoading(true);
      await pagesAPI.deletePage(selectedPage.id);

      showToast(
        `Page "${
          selectedPage.title || selectedPage.slug
        }" deleted successfully`,
        "success"
      );
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
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Pages Management</h2>
          <p className="text-gray-300">Manage your website pages and content</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button
            icon={<PlusIcon className="h-4 w-4" />}
            onClick={() => navigate("/admin/pages/enhanced-create")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Enhanced Page Builder
          </Button>
          
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/10 border border-white/20 shadow transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-white/10 border border-white/20 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-white/90" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Total Pages</p>
                <p className="text-2xl font-bold text-white">
                  {pages.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border border-white/20 shadow transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-white/10 border border-white/20 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-white/90" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">Published</p>
                <p className="text-2xl font-bold text-white">
                  {pages.filter((p) => p.isPublished).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border border-white/20 shadow transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-white/10 border border-white/20 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-white/90" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">
                  Last Created
                </p>
                <p className="text-sm font-bold text-white">
                  {pages.length > 0
                    ? formatDate(
                        Math.max(
                          ...pages.map((p) => new Date(p.createdAt || 0))
                        )
                      )
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/10 border border-white/20 shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <DocumentTextIcon className="h-4 w-4 text-white/90" />
              </div>
              <CardTitle className="text-lg font-semibold text-white">All Pages</CardTitle>
              <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/90 border border-white/20">{filteredPages.length}</span>
              </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9 pr-3 py-2 text-sm border border-white/20 bg-white/5 text-white placeholder:text-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline" onClick={fetchPages} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <ArrowPathIcon className="h-4 w-4 mr-1" />
                Refresh
              </Button>
              {selectedIds.length > 0 && (
                <Button variant="destructive" onClick={handleBulkDelete} loading={operationLoading} className="bg-red-600 hover:bg-red-700">
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Delete Selected ({selectedIds.length})
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {sortedPages.length === 0 ? (
            <div className="text-center py-16 text-gray-300">No pages found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5 text-gray-300 border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3 text-left w-10">
                      <input
                        type="checkbox"
                        onChange={handleToggleSelectAll}
                        checked={paginatedPages.length > 0 && paginatedPages.every((p) => selectedIds.includes(p.id))}
                        className="rounded border-white/30 bg-white/10 text-blue-400 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left cursor-pointer select-none" onClick={() => handleToggleSort("title")}>
                      <div className="inline-flex items-center gap-1">
                          <span className="text-white">Title</span>
                        {sortBy === "title" && <span className="text-xs text-gray-400">{sortDir === "asc" ? "▲" : "▼"}</span>}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left cursor-pointer select-none" onClick={() => handleToggleSort("slug")}> <span className="text-white">Slug</span> {sortBy === "slug" && <span className="text-xs text-gray-400">{sortDir === "asc" ? "▲" : "▼"}</span>}</th>
                    <th className="px-4 py-3 text-left cursor-pointer select-none" onClick={() => handleToggleSort("categoryName")}> <span className="text-white">Category</span> {sortBy === "categoryName" && <span className="text-xs text-gray-400">{sortDir === "asc" ? "▲" : "▼"}</span>}</th>
                    <th className="px-4 py-3 text-left text-white">Published</th>
                    <th className="px-4 py-3 text-left text-white">Homepage</th>
                    <th className="px-4 py-3 text-left cursor-pointer select-none" onClick={() => handleToggleSort("componentCount")}><span className="text-white">Components</span> {sortBy === "componentCount" && <span className="text-xs text-gray-400">{sortDir === "asc" ? "▲" : "▼"}</span>}</th>
                    <th className="px-4 py-3 text-left cursor-pointer select-none" onClick={() => handleToggleSort("createdAt")}><span className="text-white">Created</span> {sortBy === "createdAt" && <span className="text-xs text-gray-400">{sortDir === "asc" ? "▲" : "▼"}</span>}</th>
                    <th className="px-4 py-3 text-right text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {paginatedPages.map((page) => (
                    <tr key={page.id || page.slug} className="hover:bg-white/5">
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(page.id)}
                          onChange={() => handleToggleSelect(page.id)}
                          className="rounded border-white/30 bg-white/10 text-blue-400 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2 min-w-[12rem]">
                          <div className="w-7 h-7 rounded-md bg-white/10 border border-white/20 flex items-center justify-center">
                                <DocumentTextIcon className="h-4 w-4 text-white/90" />
                              </div>
                          <div className="truncate">
                            <div className="font-medium text-white truncate">{page.title || page.slug}</div>
                            <div className="text-xs text-gray-400 truncate">ID: {page.id}</div>
                              </div>
                            </div>
                      </td>
                      <td className="px-4 py-2 text-gray-300 font-mono">/{page.slug}</td>
                      <td className="px-4 py-2 text-gray-300">{page.categoryName || "Uncategorized"}</td>
                      <td className="px-4 py-2">
                            {page.isPublished ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">Yes</span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">No</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                            {page.isHomepage ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">Yes</span>
                        ) : (
                          <span className="text-xs text-gray-400">No</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">{page.componentCount || 0}</span>
                      </td>
                      <td className="px-4 py-2 text-gray-300">
                                {formatDate(page.createdAt)}
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleView(page)} className="p-2 rounded-md border border-white/20 hover:bg-white/10 text-white" title="View">
                                <EyeIcon className="h-4 w-4" />
                              </button>
                          <button onClick={() => handleEdit(page)} className="p-2 rounded-md border border-white/20 hover:bg-white/10 text-white" title="Edit">
                                <PencilIcon className="h-4 w-4" />
                              </button>
                          <button onClick={() => handleDelete(page)} className="p-2 rounded-md border border-white/20 hover:bg-white/10 text-red-400" title="Delete">
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="text-gray-300">
                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, sortedPages.length)}</span> of <span className="font-medium">{sortedPages.length}</span>
                </div>
              <div className="flex items-center gap-2">
                  <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  className="p-2 rounded-md border border-white/20 text-white disabled:opacity-50 disabled:text-gray-400"
                  >
                  <ChevronLeftIcon className="h-4 w-4" />
                  </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-md border ${currentPage === pageNum ? "bg-white/20 text-white border-white/30" : "border-white/20 text-white/80"}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  className="p-2 rounded-md border border-white/20 text-white disabled:opacity-50 disabled:text-gray-400"
                  >
                  <ChevronRightIcon className="h-4 w-4" />
                  </button>
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
                This action cannot be undone. The page "{selectedPage?.title}"
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

// Enhanced View Page Modal Component (Live demo preview)
const ViewPageModal = ({ isOpen, onClose, page }) => {
  if (!page) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="xl">
      <div className="relative bg-gray-50 border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow">
            <EyeIcon className="h-6 w-6 text-white" />
          </div>
          <div>
              <h2 className="text-xl font-bold text-gray-800">Page Preview</h2>
              <p className="text-sm text-gray-600">/{page.slug}</p>
          </div>
        </div>
          <div className="flex items-center gap-2">
            <a
              href={`/${page.slug}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-white/80 hover:bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-800 rounded-xl font-semibold text-sm transition-all duration-200"
            >
              Open in new tab
            </a>
          <button
            onClick={onClose}
              className="px-4 py-2 bg-white/80 hover:bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-800 rounded-xl font-semibold text-sm transition-all duration-200"
          >
              Close
          </button>
          </div>
        </div>
      </div>

      <div className="p-0 bg-white">
        <div className="h-[80vh]">
          <iframe
            title="page-preview"
            src={`/${page.slug}`}
            className="w-full h-full border-0 bg-white"
          />
        </div>
      </div>
    </Modal>
  );
};

// Enhanced Edit Page Modal Component
const EditPageModal = ({ isOpen, onClose, page, onSave, showToast }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const [jsonView, setJsonView] = useState("");

  useEffect(() => {
    if (page?.data) {
      setFormData(JSON.parse(JSON.stringify(page.data))); // Deep clone
      setJsonView(JSON.stringify(page.data, null, 2));
    }
  }, [page]);

  const handleJsonChange = (value) => {
    setJsonView(value);
    try {
      const parsed = JSON.parse(value);
      setFormData(parsed);
    } catch {
      // Invalid JSON, don't update formData
    }
  };

  const handleSave = async (dataToSave = formData) => {
    if (!page) return;

    try {
      setLoading(true);
      await pagesAPI.updatePage(page.id, dataToSave);
      showToast(
        `Page "${page.title || page.slug}" updated successfully`,
        "success"
      );
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
    <Modal isOpen={isOpen} onClose={onClose} title="" size="xl">
      {/* Modern Modal Header */}
      <div className="relative bg-gray-50 border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow">
            <PencilIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Edit Page</h2>
            <p className="text-sm text-gray-600">{page.name}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-4 flex space-x-1 bg-white/60 backdrop-blur-sm rounded-lg p-1 border border-gray-200/50">
          <button
            onClick={() => setActiveTab("form")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "form"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600 hover:text-blue-600 hover:bg-white/80"
            }`}
          >
            <DocumentTextIcon className="h-4 w-4 inline mr-2" />
            Form Editor
          </button>
          <button
            onClick={() => setActiveTab("json")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "json"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-600 hover:text-blue-600 hover:bg-white/80"
            }`}
          >
            <DocumentTextIcon className="h-4 w-4 inline mr-2" />
            JSON Editor
          </button>
        </div>
      </div>

      {/* Modal Content */}
      <div className="p-6 bg-white">
        {activeTab === "form" ? (
          <div className="h-[600px]">
            <ModernPageEditor
              pageData={formData}
              onSave={async (updatedData) => {
                setFormData(updatedData);
                setJsonView(JSON.stringify(updatedData, null, 2));
                await handleSave(updatedData);
              }}
              isLoading={loading}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
              <div className="p-4 border-b border-gray-200/50">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                  <DocumentTextIcon className="h-4 w-4 mr-2 text-blue-600" />
                  JSON Data Editor
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Edit the raw JSON data for this page
                </p>
              </div>
              <div className="p-4">
                <textarea
                  value={jsonView}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  rows={15}
                  className="w-full rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm p-4 resize-none"
                  placeholder="Enter JSON data..."
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modern Modal Footer */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">
              {activeTab === "form" ? "Form-based editing" : "Raw JSON editing"}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 bg-white/80 hover:bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-800 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="group px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <ArrowPathIcon className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Quick Create modal removed

export default PagesManagement;


