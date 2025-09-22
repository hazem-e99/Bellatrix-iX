import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button
            icon={<PlusIcon className="h-4 w-4" />}
              onClick={() => navigate("/admin/pages/enhanced-create")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Enhanced Page Builder
          </Button>
          <Button
            variant="outline"
              onClick={() => navigate("/admin/pages/create")}
            className="hover:bg-blue-50 hover:border-blue-300"
          >
            Classic Create
          </Button>
          <Button
            variant="outline"
              onClick={() => setShowCreateModal(true)}
            className="hover:bg-blue-50 hover:border-blue-300"
          >
            Quick Create
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

      {/* Modern Search and Filter */}
      <Card className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm border border-white/20 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <DocumentTextIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  All Pages
                  <span className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm font-semibold rounded-full">
                    {filteredPages.length}
                  </span>
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Manage and organize your website pages</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-sm font-medium"
                />
              </div>
              
              <button
                onClick={fetchPages}
                className="group px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
                title="Refresh Pages"
              >
                <ArrowPathIcon className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {paginatedPages.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative mx-auto w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl transform rotate-6"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <DocumentTextIcon className="h-12 w-12 text-white" />
                </div>
                </div>
                
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {searchTerm ? "No pages found" : "No pages yet"}
                </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  {searchTerm
                  ? "Try adjusting your search criteria or create a new page with different content"
                  : "Get started by creating your first page to manage your website content"}
                </p>
                
                {!searchTerm && (
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center space-x-2"
                  >
                    <PlusIcon className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create First Page</span>
                  </button>
                  
                  <button
                    onClick={() => navigate("/admin/pages/enhanced-create")}
                    className="px-6 py-3 bg-white/80 hover:bg-white border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 rounded-xl font-semibold transition-all duration-200 hover:shadow-md flex items-center space-x-2"
                  >
                    <DocumentTextIcon className="h-5 w-5" />
                    <span>Enhanced Builder</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              {/* Modern Table Container with Glassmorphism */}
              <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl">
                    {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-gradient-to-r from-slate-50/95 to-blue-50/95 backdrop-blur-md border-b border-gray-200/50">
                  <div className="px-6 py-4">
                    {/* Desktop Header */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4">
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center">
                          <DocumentTextIcon className="h-4 w-4 mr-2 text-blue-600" />
                          Page Details
                        </h3>
                          </div>
                      <div className="col-span-2">
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center">
                          <CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />
                          Status
                        </h3>
                          </div>
                      <div className="col-span-2">
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-purple-600" />
                          Size
                        </h3>
                          </div>
                      <div className="col-span-2">
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-orange-600" />
                          Modified
                        </h3>
                          </div>
                      <div className="col-span-2 text-right">
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center justify-end">
                          <PencilIcon className="h-4 w-4 mr-2 text-indigo-600" />
                          Actions
                        </h3>
                          </div>
                    </div>
                    
                    {/* Mobile Header */}
                    <div className="lg:hidden">
                      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center">
                        <DocumentTextIcon className="h-4 w-4 mr-2 text-blue-600" />
                        Pages ({filteredPages.length})
                      </h3>
                    </div>
                  </div>
                </div>
                    
                    {/* Table Body */}
                <div className="divide-y divide-gray-100/50">
                  <AnimatePresence>
                    {paginatedPages.map((page, index) => (
                      <motion.div
                        key={page.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                        className={`group px-6 py-5 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 ${
                          index % 2 === 0 ? 'bg-white/40' : 'bg-gray-50/30'
                            }`}
                          >
                        {/* Desktop Layout */}
                        <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                            {/* Page Details */}
                          <div className="col-span-4">
                              <div className="flex items-center space-x-4">
                                <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                                  <DocumentTextIcon className="h-5 w-5 text-white" />
                                  </div>
                                {page.hasData && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                                )}
                                </div>
                                <div className="min-w-0 flex-1">
                                <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                                {page.name}
                                </h4>
                                <p className="text-xs text-gray-500 truncate">
                                {page.filename}
                                </p>
                                  {page.dataPreview && page.dataPreview.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {page.dataPreview.slice(0, 2).map((field, idx) => (
                                        <span
                                          key={idx}
                                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                        >
                                          {field}
                                        </span>
                                      ))}
                                    {page.dataPreview.length > 2 && (
                                      <span className="text-xs text-gray-400">
                                        +{page.dataPreview.length - 2} more
                                        </span>
                                      )}
                                  </div>
                                )}
                            </div>
                          </div>
                          </div>
                            
                            {/* Status */}
                          <div className="col-span-2">
                              <div className="flex items-center">
                          {page.hasData ? (
                                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                              Active
                                  </div>
                          ) : (
                                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200 shadow-sm">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                              Empty
                                  </div>
                          )}
                              </div>
                          </div>
                            
                            {/* Size */}
                          <div className="col-span-2">
                              <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                                  <DocumentTextIcon className="h-4 w-4 text-purple-600" />
                                </div>
                              <span className="text-sm font-medium text-gray-700">
                          {formatFileSize(page.size)}
                                </span>
                              </div>
                          </div>
                            
                            {/* Last Modified */}
                          <div className="col-span-2">
                              <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                                  <CalendarIcon className="h-4 w-4 text-orange-600" />
                                </div>
                              <span className="text-sm font-medium text-gray-700">
                          {formatDate(page.lastModified)}
                                </span>
                              </div>
                          </div>
                            
                            {/* Actions */}
                          <div className="col-span-2">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                              onClick={() => handleView(page)}
                                className="group/btn p-2 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md hover:scale-105"
                                  title="View Page"
                                >
                                <EyeIcon className="h-4 w-4" />
                              </button>
                              <button
                              onClick={() => handleEdit(page)}
                                className="group/btn p-2 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 text-indigo-600 hover:text-indigo-700 border border-indigo-200 hover:border-indigo-300 transition-all duration-200 hover:shadow-md hover:scale-105"
                                  title="Edit Page"
                                >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(page)}
                                className="group/btn p-2 rounded-lg bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 transition-all duration-200 hover:shadow-md hover:scale-105"
                                title="Delete Page"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Mobile Layout */}
                        <div className="lg:hidden space-y-4">
                          {/* Header with Icon and Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                  <DocumentTextIcon className="h-6 w-6 text-white" />
                                </div>
                                {page.hasData && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                                )}
                              </div>
                              <div>
                                <h4 className="text-base font-semibold text-gray-900">
                                  {page.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {page.filename}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleView(page)}
                                className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border border-blue-200 transition-all duration-200 hover:shadow-md"
                                title="View Page"
                              >
                                <EyeIcon className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(page)}
                                className="p-2 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 border border-indigo-200 transition-all duration-200 hover:shadow-md"
                                title="Edit Page"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button
                              onClick={() => handleDelete(page)}
                                className="p-2 rounded-lg bg-gradient-to-br from-red-50 to-red-100 text-red-600 border border-red-200 transition-all duration-200 hover:shadow-md"
                                  title="Delete Page"
                            >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                          </div>
                          </div>

                          {/* Status and Metadata */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center">
                                {page.hasData ? (
                                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                    Active
                                  </div>
                                ) : (
                                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200 shadow-sm">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                                    Empty
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                                  <DocumentTextIcon className="h-3 w-3 text-purple-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                  {formatFileSize(page.size)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Data Preview */}
                          {page.dataPreview && page.dataPreview.length > 0 && (
                            <div className="space-y-2">
                              <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Fields</h5>
                              <div className="flex flex-wrap gap-1">
                                {page.dataPreview.map((field, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    {field}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Last Modified */}
                          <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                              <CalendarIcon className="h-3 w-3 text-orange-600" />
                            </div>
                            <span className="text-sm text-gray-600">
                              Modified: {formatDate(page.lastModified)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          {/* Modern Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Showing <span className="font-semibold text-blue-600">{startIndex + 1}</span> to{" "}
                    <span className="font-semibold text-blue-600">
                        {Math.min(startIndex + ITEMS_PER_PAGE, filteredPages.length)}
                    </span>{" "}
                    of <span className="font-semibold text-gray-800">{filteredPages.length}</span> results
                  </span>
                    </div>
                  <div className="flex items-center space-x-3">
                  <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                    className="group p-2 rounded-xl bg-white/60 hover:bg-white/80 border border-gray-200 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:scale-105"
                    title="Previous Page"
                  >
                    <ChevronLeftIcon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            currentPage === pageNum
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                              : 'bg-white/60 hover:bg-white/80 text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    </div>
                    
                  <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                    className="group p-2 rounded-xl bg-white/60 hover:bg-white/80 border border-gray-200 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:scale-105"
                    title="Next Page"
                  >
                    <ChevronRightIcon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                  </button>
                </div>
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

// Enhanced View Page Modal Component
const ViewPageModal = ({ isOpen, onClose, page }) => {
  if (!page) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="xl"
    >
      {/* Modern Modal Header */}
      <div className="relative bg-gradient-to-r from-blue-50/90 to-indigo-50/90 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <EyeIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">View Page</h2>
            <p className="text-sm text-gray-600">{page.name}</p>
          </div>
          </div>
        </div>

      {/* Modal Content */}
      <div className="p-6 bg-gradient-to-br from-white/80 to-blue-50/30 backdrop-blur-sm">
        <div className="space-y-6">
          {/* Page Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <DocumentTextIcon className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700">Page Name</h3>
              </div>
              <p className="text-lg font-medium text-gray-800">{page.name}</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <DocumentTextIcon className="h-4 w-4 text-green-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700">Filename</h3>
              </div>
              <p className="text-lg font-medium text-gray-800">{page.filename}</p>
            </div>
          </div>

          {/* JSON Data Viewer */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
            <div className="p-4 border-b border-gray-200/50">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                <DocumentTextIcon className="h-4 w-4 mr-2 text-blue-600" />
                JSON Data Structure
              </h3>
              <p className="text-xs text-gray-500 mt-1">Complete data structure for this page</p>
            </div>
            <div className="p-4">
              <div className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 backdrop-blur-sm rounded-lg border border-gray-200/50 p-4 max-h-96 overflow-auto">
                <pre className="text-sm text-gray-800 font-mono leading-relaxed">
              {JSON.stringify(page.data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
        </div>
      </div>

      {/* Modern Modal Footer */}
      <div className="bg-gradient-to-r from-gray-50/90 to-blue-50/90 backdrop-blur-sm border-t border-gray-200/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Read-only view</span>
          </div>
          
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/80 hover:bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-800 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-md flex items-center space-x-2"
          >
            <EyeIcon className="h-4 w-4" />
            <span>Close</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Enhanced Dynamic Form Builder for JSON data
const buildFormFields = (data, onChange, prefix = "") => {
  const fields = [];

  Object.entries(data).forEach(([key, value]) => {
    const fieldKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      fields.push(
        <div key={fieldKey} className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            {key}
            <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">null</span>
          </label>
          <input
            type="text"
            value=""
            onChange={(e) => onChange(fieldKey, e.target.value)}
            placeholder="Enter value"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
        </div>
      );
    } else if (typeof value === "boolean") {
      fields.push(
        <div key={fieldKey} className="group">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/80 to-blue-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:border-blue-300 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <label className="text-sm font-semibold text-gray-700">
                {key}
              </label>
              <span className="text-xs text-gray-500 bg-green-100 text-green-700 px-2 py-0.5 rounded-full">boolean</span>
            </div>
            <div className="relative">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(fieldKey, e.target.checked)}
                className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
            </div>
          </div>
        </div>
      );
    } else if (typeof value === "string") {
      if (value.length > 100) {
        fields.push(
          <div key={fieldKey} className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              {key}
              <span className="ml-2 text-xs text-gray-500 bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">text</span>
            </label>
            <textarea
              value={value}
              onChange={(e) => onChange(fieldKey, e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Enter text content..."
            />
          </div>
        );
      } else {
        fields.push(
          <div key={fieldKey} className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              {key}
              <span className="ml-2 text-xs text-gray-500 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">string</span>
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(fieldKey, e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter value"
            />
          </div>
        );
      }
    } else if (typeof value === "number") {
      fields.push(
        <div key={fieldKey} className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
            {key}
            <span className="ml-2 text-xs text-gray-500 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">number</span>
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) =>
              onChange(fieldKey, parseFloat(e.target.value) || 0)
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter number"
          />
        </div>
      );
    } else if (Array.isArray(value)) {
      fields.push(
        <div key={fieldKey} className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
            {key}
            <span className="ml-2 text-xs text-gray-500 bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">array</span>
          </label>
          <div className="bg-gradient-to-r from-indigo-50/80 to-purple-50/80 backdrop-blur-sm rounded-xl border border-indigo-200/50 p-4">
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
              className="w-full rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm p-3 resize-none"
              placeholder="Enter JSON array..."
          />
          </div>
        </div>
      );
    } else if (typeof value === "object") {
      fields.push(
        <div
          key={fieldKey}
          className="group bg-gradient-to-r from-gray-50/80 to-blue-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6 hover:border-blue-300 transition-all duration-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
            <h4 className="text-sm font-semibold text-gray-800">
            {key}
          </h4>
            <span className="text-xs text-gray-500 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">object</span>
          </div>
          <div className="space-y-4 pl-4 border-l-2 border-blue-200/50">
            {buildFormFields(value, onChange, fieldKey)}
          </div>
        </div>
      );
    }
  });

  return fields;
};

// Enhanced Edit Page Modal Component
const EditPageModal = ({ isOpen, onClose, page, onSave, showToast }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const [jsonView, setJsonView] = useState('');

  useEffect(() => {
    if (page?.data) {
      setFormData(JSON.parse(JSON.stringify(page.data))); // Deep clone
      setJsonView(JSON.stringify(page.data, null, 2));
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
      const response = await fetch(
        `http://localhost:3001/api/pages/${page.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: dataToSave }),
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
      title=""
      size="xl"
    >
      {/* Modern Modal Header */}
      <div className="relative bg-gradient-to-r from-blue-50/90 to-indigo-50/90 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
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
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'form'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-600 hover:bg-white/80'
            }`}
          >
            <DocumentTextIcon className="h-4 w-4 inline mr-2" />
            Form Editor
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'json'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-600 hover:bg-white/80'
            }`}
          >
            <DocumentTextIcon className="h-4 w-4 inline mr-2" />
            JSON Editor
          </button>
        </div>
      </div>

      {/* Modal Content */}
      <div className="p-6 bg-gradient-to-br from-white/80 to-blue-50/30 backdrop-blur-sm">
        {activeTab === 'form' ? (
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
                <p className="text-xs text-gray-500 mt-1">Edit the raw JSON data for this page</p>
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
      <div className="bg-gradient-to-r from-gray-50/90 to-blue-50/90 backdrop-blur-sm border-t border-gray-200/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">
              {activeTab === 'form' ? 'Form-based editing' : 'Raw JSON editing'}
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
              className="group px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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

