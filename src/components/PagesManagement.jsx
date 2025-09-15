import React, { useState, useMemo } from 'react';
import { Button, Card, Badge, Input, Modal } from './ui/components';
import { SearchInput, Pagination, ConfirmationDialog } from './ui/Interactive';
import { useModal, usePagination, useDebounce, useToast } from '../../hooks/useCommon';

const PagesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPages, setSelectedPages] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  
  const { isOpen: isPreviewOpen, openModal: openPreview, closeModal: closePreview } = useModal();
  const { isOpen: isEditOpen, openModal: openEdit, closeModal: closeEdit } = useModal();
  const { isOpen: isDeleteOpen, openModal: openDelete, closeModal: closeDelete } = useModal();
  const [selectedPage, setSelectedPage] = useState(null);
  
  const { addToast } = useToast();
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Mock pages data
  const [pages, setPages] = useState([
    {
      id: 1,
      title: 'Home Page',
      slug: 'home',
      status: 'published',
      author: 'John Doe',
      views: 1542,
      lastModified: '2024-01-15T10:30:00Z',
      createdAt: '2024-01-10T09:00:00Z',
      description: 'Main landing page for the website',
      template: 'home-template',
      featured: true,
      tags: ['landing', 'main', 'homepage']
    },
    {
      id: 2,
      title: 'About Us',
      slug: 'about',
      status: 'published',
      author: 'Sarah Wilson',
      views: 892,
      lastModified: '2024-01-14T14:20:00Z',
      createdAt: '2024-01-12T11:15:00Z',
      description: 'Company information and team details',
      template: 'about-template',
      featured: false,
      tags: ['company', 'team', 'info']
    },
    {
      id: 3,
      title: 'Services Overview',
      slug: 'services',
      status: 'draft',
      author: 'Mike Johnson',
      views: 0,
      lastModified: '2024-01-16T16:45:00Z',
      createdAt: '2024-01-16T16:00:00Z',
      description: 'Overview of all services offered',
      template: 'services-template',
      featured: false,
      tags: ['services', 'business', 'offerings']
    },
    {
      id: 4,
      title: 'Contact Form',
      slug: 'contact',
      status: 'published',
      author: 'Emily Davis',
      views: 234,
      lastModified: '2024-01-13T12:10:00Z',
      createdAt: '2024-01-11T08:30:00Z',
      description: 'Customer contact and inquiry form',
      template: 'contact-template',
      featured: true,
      tags: ['contact', 'form', 'customer']
    },
    {
      id: 5,
      title: 'Privacy Policy',
      slug: 'privacy',
      status: 'published',
      author: 'Legal Team',
      views: 156,
      lastModified: '2024-01-08T10:00:00Z',
      createdAt: '2024-01-05T14:20:00Z',
      description: 'Website privacy policy and data handling',
      template: 'legal-template',
      featured: false,
      tags: ['legal', 'privacy', 'policy']
    },
    {
      id: 6,
      title: 'Product Catalog',
      slug: 'products',
      status: 'review',
      author: 'Product Team',
      views: 567,
      lastModified: '2024-01-17T09:15:00Z',
      createdAt: '2024-01-15T13:45:00Z',
      description: 'Comprehensive product catalog and listings',
      template: 'catalog-template',
      featured: true,
      tags: ['products', 'catalog', 'shop']
    }
  ]);

  // Filter and search logic
  const filteredPages = useMemo(() => {
    let filtered = pages;

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(page => page.status === filterStatus);
    }

    // Search filter
    if (debouncedSearch) {
      filtered = filtered.filter(page =>
        page.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        page.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        page.author.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        page.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'lastModified' || sortBy === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    return filtered;
  }, [pages, filterStatus, debouncedSearch, sortBy, sortOrder]);

  // Pagination
  const itemsPerPage = 10;
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedPages,
    goToPage,
    hasNext,
    hasPrev
  } = usePagination(filteredPages, itemsPerPage);

  // Status color mapping
  const getStatusColor = (status) => {
    const colors = {
      published: 'green',
      draft: 'gray',
      review: 'yellow',
      archived: 'red'
    };
    return colors[status] || 'gray';
  };

  // Handle page actions
  const handleSelectPage = (pageId) => {
    setSelectedPages(prev =>
      prev.includes(pageId)
        ? prev.filter(id => id !== pageId)
        : [...prev, pageId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPages.length === paginatedPages.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(paginatedPages.map(page => page.id));
    }
  };

  const handleBulkAction = (action) => {
    addToast(`${action} applied to ${selectedPages.length} pages`, 'success');
    setSelectedPages([]);
  };

  const handlePreview = (page) => {
    setSelectedPage(page);
    openPreview();
  };

  const handleEdit = (page) => {
    setSelectedPage(page);
    openEdit();
  };

  const handleDelete = (page) => {
    setSelectedPage(page);
    openDelete();
  };

  const confirmDelete = () => {
    setPages(prev => prev.filter(p => p.id !== selectedPage.id));
    addToast(`Page "${selectedPage.title}" deleted successfully`, 'success');
    setSelectedPage(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pages Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your website pages, content, and publishing status
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" onClick={() => addToast('Import started', 'info')}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Import
          </Button>
          <Button onClick={() => addToast('New page created', 'success')}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Page
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search pages..."
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="review">Under Review</option>
            </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="lastModified-desc">Latest Modified</option>
              <option value="lastModified-asc">Oldest Modified</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="views-desc">Most Views</option>
              <option value="views-asc">Least Views</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedPages.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedPages.length} page{selectedPages.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('Publish')}
              >
                Publish
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('Draft')}
              >
                Move to Draft
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('Delete')}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Pages List/Grid */}
      {viewMode === 'table' ? (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPages.length === paginatedPages.length && paginatedPages.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modified
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedPages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedPages.includes(page.id)}
                        onChange={() => handleSelectPage(page.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {page.title}
                            {page.featured && (
                              <svg className="w-4 h-4 text-yellow-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">/{page.slug}</div>
                          <div className="text-xs text-gray-400 mt-1">{page.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusColor(page.status)}>
                        {page.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {page.author}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {page.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(page.lastModified)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreview(page)}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(page)}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(page)}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPages.map((page) => (
            <Card key={page.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedPages.includes(page.id)}
                    onChange={() => handleSelectPage(page.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                  />
                  <Badge variant={getStatusColor(page.status)}>
                    {page.status}
                  </Badge>
                </div>
                {page.featured && (
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">{page.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{page.description}</p>
              <div className="text-xs text-gray-500 mb-4">/{page.slug}</div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{page.author}</span>
                <span>{page.views.toLocaleString()} views</span>
              </div>
              
              <div className="text-xs text-gray-400 mb-4">
                Modified: {formatDate(page.lastModified)}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {page.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                  {page.tags.length > 2 && (
                    <span className="text-xs text-gray-500">+{page.tags.length - 2}</span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePreview(page)}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(page)}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={closePreview}
        title={`Preview: ${selectedPage?.title}`}
        size="xl"
      >
        {selectedPage && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900">Page Information</h3>
              <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">URL:</span>
                  <span className="ml-2">/{selectedPage.slug}</span>
                </div>
                <div>
                  <span className="text-gray-500">Template:</span>
                  <span className="ml-2">{selectedPage.template}</span>
                </div>
                <div>
                  <span className="text-gray-500">Author:</span>
                  <span className="ml-2">{selectedPage.author}</span>
                </div>
                <div>
                  <span className="text-gray-500">Views:</span>
                  <span className="ml-2">{selectedPage.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600">{selectedPage.description}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {selectedPage.tags.map((tag) => (
                  <Badge key={tag} variant="blue">{tag}</Badge>
                ))}
              </div>
            </div>
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500">Page content preview would be rendered here</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={closeEdit}
        title={`Edit: ${selectedPage?.title}`}
        size="xl"
      >
        {selectedPage && (
          <div className="space-y-4">
            <Input
              label="Page Title"
              defaultValue={selectedPage.title}
              placeholder="Enter page title"
            />
            <Input
              label="URL Slug"
              defaultValue={selectedPage.slug}
              placeholder="page-url-slug"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                defaultValue={selectedPage.description}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter page description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  defaultValue={selectedPage.status}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="review">Under Review</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template
                </label>
                <select
                  defaultValue={selectedPage.template}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="home-template">Home Template</option>
                  <option value="about-template">About Template</option>
                  <option value="services-template">Services Template</option>
                  <option value="contact-template">Contact Template</option>
                  <option value="legal-template">Legal Template</option>
                  <option value="catalog-template">Catalog Template</option>
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={selectedPage.featured}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
              />
              <label className="text-sm font-medium text-gray-700">
                Featured Page
              </label>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={closeEdit}>
                Cancel
              </Button>
              <Button onClick={() => {
                addToast('Page updated successfully', 'success');
                closeEdit();
              }}>
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmationDialog
        isOpen={isDeleteOpen}
        onClose={closeDelete}
        onConfirm={confirmDelete}
        title="Delete Page"
        message={`Are you sure you want to delete "${selectedPage?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default PagesManagement;