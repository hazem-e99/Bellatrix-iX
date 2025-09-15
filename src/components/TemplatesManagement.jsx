import React, { useState, useMemo } from 'react';
import { Button, Card, Badge, Input, Modal } from './ui/components';
import { SearchInput, Pagination, ConfirmationDialog } from './ui/Interactive';
import { useModal, usePagination, useDebounce, useToast } from '../../hooks/useCommon';

const TemplatesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplates, setSelectedTemplates] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [draggedTemplate, setDraggedTemplate] = useState(null);
  
  const { isOpen: isPreviewOpen, openModal: openPreview, closeModal: closePreview } = useModal();
  const { isOpen: isEditOpen, openModal: openEdit, closeModal: closeEdit } = useModal();
  const { isOpen: isDeleteOpen, openModal: openDelete, closeModal: closeDelete } = useModal();
  const { isOpen: isDuplicateOpen, openModal: openDuplicate, closeModal: closeDuplicate } = useModal();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  const { addToast } = useToast();
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Mock templates data
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Modern Homepage',
      description: 'Clean and modern homepage design with hero section and features',
      category: 'landing',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      author: 'Design Team',
      version: '2.1',
      downloads: 1234,
      rating: 4.8,
      created: '2024-01-10T09:00:00Z',
      updated: '2024-01-15T14:30:00Z',
      tags: ['modern', 'hero', 'landing', 'responsive'],
      featured: true,
      status: 'published',
      fileSize: '2.3 MB',
      type: 'page'
    },
    {
      id: 2,
      name: 'E-commerce Product Grid',
      description: 'Responsive product grid layout with filtering and sorting',
      category: 'ecommerce',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      author: 'John Doe',
      version: '1.5',
      downloads: 892,
      rating: 4.6,
      created: '2024-01-12T11:15:00Z',
      updated: '2024-01-14T16:45:00Z',
      tags: ['ecommerce', 'grid', 'products', 'filtering'],
      featured: false,
      status: 'published',
      fileSize: '1.8 MB',
      type: 'component'
    },
    {
      id: 3,
      name: 'Contact Form Template',
      description: 'Professional contact form with validation and styling',
      category: 'forms',
      thumbnail: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h=300&fit=crop',
      author: 'Sarah Wilson',
      version: '3.0',
      downloads: 567,
      rating: 4.9,
      created: '2024-01-08T13:20:00Z',
      updated: '2024-01-16T10:15:00Z',
      tags: ['form', 'contact', 'validation', 'responsive'],
      featured: true,
      status: 'published',
      fileSize: '1.2 MB',
      type: 'component'
    },
    {
      id: 4,
      name: 'Blog Article Layout',
      description: 'Clean blog post layout with sidebar and related articles',
      category: 'blog',
      thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
      author: 'Mike Johnson',
      version: '1.0',
      downloads: 345,
      rating: 4.4,
      created: '2024-01-16T09:30:00Z',
      updated: '2024-01-16T09:30:00Z',
      tags: ['blog', 'article', 'sidebar', 'typography'],
      featured: false,
      status: 'draft',
      fileSize: '1.5 MB',
      type: 'page'
    },
    {
      id: 5,
      name: 'Dashboard Analytics',
      description: 'Analytics dashboard with charts and metrics cards',
      category: 'dashboard',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      author: 'Analytics Team',
      version: '2.3',
      downloads: 723,
      rating: 4.7,
      created: '2024-01-05T15:45:00Z',
      updated: '2024-01-13T12:00:00Z',
      tags: ['dashboard', 'analytics', 'charts', 'metrics'],
      featured: true,
      status: 'published',
      fileSize: '3.1 MB',
      type: 'page'
    },
    {
      id: 6,
      name: 'Pricing Table',
      description: 'Modern pricing table with multiple tiers and features',
      category: 'pricing',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      author: 'Marketing Team',
      version: '1.8',
      downloads: 456,
      rating: 4.5,
      created: '2024-01-11T10:20:00Z',
      updated: '2024-01-15T08:45:00Z',
      tags: ['pricing', 'table', 'comparison', 'features'],
      featured: false,
      status: 'published',
      fileSize: '0.9 MB',
      type: 'component'
    }
  ]);

  // Categories for filtering
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'landing', label: 'Landing Pages' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'forms', label: 'Forms' },
    { value: 'blog', label: 'Blog' },
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'pricing', label: 'Pricing' }
  ];

  // Filter and search logic
  const filteredTemplates = useMemo(() => {
    let filtered = templates;

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(template => template.category === filterCategory);
    }

    // Search filter
    if (debouncedSearch) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        template.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        template.author.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'updated' || sortBy === 'created') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    return filtered;
  }, [templates, filterCategory, debouncedSearch, sortBy, sortOrder]);

  // Pagination
  const itemsPerPage = viewMode === 'grid' ? 12 : 10;
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedTemplates,
    goToPage,
    hasNext,
    hasPrev
  } = usePagination(filteredTemplates, itemsPerPage);

  // Utility functions
  const getStatusColor = (status) => {
    const colors = {
      published: 'green',
      draft: 'gray',
      archived: 'red'
    };
    return colors[status] || 'gray';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  // Event handlers
  const handleSelectTemplate = (templateId) => {
    setSelectedTemplates(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTemplates.length === paginatedTemplates.length) {
      setSelectedTemplates([]);
    } else {
      setSelectedTemplates(paginatedTemplates.map(template => template.id));
    }
  };

  const handleBulkAction = (action) => {
    addToast(`${action} applied to ${selectedTemplates.length} templates`, 'success');
    setSelectedTemplates([]);
  };

  const handlePreview = (template) => {
    setSelectedTemplate(template);
    openPreview();
  };

  const handleEdit = (template) => {
    setSelectedTemplate(template);
    openEdit();
  };

  const handleDelete = (template) => {
    setSelectedTemplate(template);
    openDelete();
  };

  const handleDuplicate = (template) => {
    setSelectedTemplate(template);
    openDuplicate();
  };

  const confirmDelete = () => {
    setTemplates(prev => prev.filter(t => t.id !== selectedTemplate.id));
    addToast(`Template "${selectedTemplate.name}" deleted successfully`, 'success');
    setSelectedTemplate(null);
  };

  const confirmDuplicate = () => {
    const newTemplate = {
      ...selectedTemplate,
      id: Math.max(...templates.map(t => t.id)) + 1,
      name: `${selectedTemplate.name} (Copy)`,
      downloads: 0,
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };
    setTemplates(prev => [newTemplate, ...prev]);
    addToast(`Template "${selectedTemplate.name}" duplicated successfully`, 'success');
    setSelectedTemplate(null);
  };

  // Drag and drop handlers
  const handleDragStart = (e, template) => {
    setDraggedTemplate(template);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetTemplate) => {
    e.preventDefault();
    if (draggedTemplate && draggedTemplate.id !== targetTemplate.id) {
      addToast(`Moved "${draggedTemplate.name}" to position of "${targetTemplate.name}"`, 'info');
    }
    setDraggedTemplate(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Templates Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Browse, manage, and organize your design templates
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" onClick={() => addToast('Templates imported', 'info')}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Import
          </Button>
          <Button onClick={() => addToast('New template created', 'success')}>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Template
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
              placeholder="Search templates..."
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center space-x-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
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
              <option value="updated-desc">Recently Updated</option>
              <option value="updated-asc">Oldest Updated</option>
              <option value="created-desc">Recently Created</option>
              <option value="created-asc">Oldest Created</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="downloads-desc">Most Downloaded</option>
              <option value="rating-desc">Highest Rated</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
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
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedTemplates.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedTemplates.length} template{selectedTemplates.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('Export')}
              >
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('Archive')}
              >
                Archive
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

      {/* Templates Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedTemplates.map((template) => (
            <Card
              key={template.id}
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
              draggable
              onDragStart={(e) => handleDragStart(e, template)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, template)}
            >
              {/* Template Thumbnail */}
              <div className="relative">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePreview(template)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addToast('Template downloaded', 'success')}
                      className="bg-white/90 hover:bg-white"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </Button>
                  </div>
                </div>
                
                {/* Featured Badge */}
                {template.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="yellow">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Selection Checkbox */}
                <div className="absolute top-3 right-3">
                  <input
                    type="checkbox"
                    checked={selectedTemplates.includes(template.id)}
                    onChange={() => handleSelectTemplate(template.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-white/90"
                  />
                </div>

                {/* Status Badge */}
                <div className="absolute bottom-3 right-3">
                  <Badge variant={getStatusColor(template.status)}>
                    {template.status}
                  </Badge>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {template.name}
                  </h3>
                  <Badge variant="blue" className="ml-2">
                    {template.type}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {template.description}
                </p>

                {/* Rating and Downloads */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(template.rating)}
                    <span className="text-sm text-gray-500 ml-1">({template.rating})</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {template.downloads.toLocaleString()}
                  </div>
                </div>

                {/* Author and Version */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>by {template.author}</span>
                  <span>v{template.version}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 2 && (
                    <span className="text-xs text-gray-500">+{template.tags.length - 2}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">
                    Updated {formatDate(template.updated)}
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(template)}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDuplicate(template)}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(template)}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        // List View
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedTemplates.length === paginatedTemplates.length && paginatedTemplates.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedTemplates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedTemplates.includes(template.id)}
                        onChange={() => handleSelectTemplate(template.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {template.name}
                            {template.featured && (
                              <svg className="w-4 h-4 text-yellow-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{template.description}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            by {template.author} • v{template.version} • {template.fileSize}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="blue">{template.category}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {renderStars(template.rating).slice(0, 5)}
                        </div>
                        <span className="text-sm text-gray-600">({template.rating})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {template.downloads.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(template.updated)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreview(template)}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(template)}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDuplicate(template)}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(template)}
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
        title={`Preview: ${selectedTemplate?.name}`}
        size="xl"
      >
        {selectedTemplate && (
          <div className="space-y-6">
            {/* Template Preview Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={selectedTemplate.thumbnail}
                alt={selectedTemplate.name}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Template Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Template Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <Badge variant="blue">{selectedTemplate.category}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <Badge>{selectedTemplate.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Author:</span>
                    <span>{selectedTemplate.author}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Version:</span>
                    <span>v{selectedTemplate.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">File Size:</span>
                    <span>{selectedTemplate.fileSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Downloads:</span>
                    <span>{selectedTemplate.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rating:</span>
                    <div className="flex items-center">
                      {renderStars(selectedTemplate.rating).slice(0, 5)}
                      <span className="ml-1">({selectedTemplate.rating})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 text-sm mb-4">{selectedTemplate.description}</p>
                
                <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTemplate.tags.map((tag) => (
                    <Badge key={tag} variant="gray">{tag}</Badge>
                  ))}
                </div>

                <div className="text-sm text-gray-500">
                  <div>Created: {formatDate(selectedTemplate.created)}</div>
                  <div>Updated: {formatDate(selectedTemplate.updated)}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={closePreview}>
                Close
              </Button>
              <Button variant="outline" onClick={() => handleDuplicate(selectedTemplate)}>
                Duplicate
              </Button>
              <Button onClick={() => addToast('Template downloaded', 'success')}>
                Download
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={closeEdit}
        title={`Edit: ${selectedTemplate?.name}`}
        size="xl"
      >
        {selectedTemplate && (
          <div className="space-y-4">
            <Input
              label="Template Name"
              defaultValue={selectedTemplate.name}
              placeholder="Enter template name"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                defaultValue={selectedTemplate.description}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter template description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  defaultValue={selectedTemplate.category}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.slice(1).map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  defaultValue={selectedTemplate.type}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="page">Page</option>
                  <option value="component">Component</option>
                  <option value="layout">Layout</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked={selectedTemplate.featured}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                />
                <label className="text-sm font-medium text-gray-700">
                  Featured Template
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  defaultValue={selectedTemplate.status}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={closeEdit}>
                Cancel
              </Button>
              <Button onClick={() => {
                addToast('Template updated successfully', 'success');
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
        title="Delete Template"
        message={`Are you sure you want to delete "${selectedTemplate?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />

      {/* Duplicate Confirmation */}
      <ConfirmationDialog
        isOpen={isDuplicateOpen}
        onClose={closeDuplicate}
        onConfirm={confirmDuplicate}
        title="Duplicate Template"
        message={`Create a copy of "${selectedTemplate?.name}"?`}
        confirmText="Duplicate"
        type="info"
      />
    </div>
  );
};

export default TemplatesManagement;