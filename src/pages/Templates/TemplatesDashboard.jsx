import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Button, 
  Card, 
  Badge, 
  Input, 
  Modal, 
  EmptyState 
} from '../../components/UI/components';
import { 
  getSharedComponents, 
  getCategoriesWithCounts, 
  filterComponents, 
  getComponentStats 
} from '../../utils/componentDiscovery';

const TemplatesDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('lastModified');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Get data
  const allComponents = getSharedComponents();
  const categories = getCategoriesWithCounts();
  const stats = getComponentStats();

  // Filter and sort components
  const filteredComponents = useMemo(() => {
    return filterComponents(allComponents, {
      category: selectedCategory,
      search: searchTerm,
      sortBy,
      sortOrder
    });
  }, [allComponents, selectedCategory, searchTerm, sortBy, sortOrder]);

  // Handle component actions
  const handleViewComponent = (component) => {
    setSelectedComponent(component);
    setIsPreviewOpen(true);
  };

  const handleEditComponent = (component) => {
    // Navigate to component editor (you can implement this)
    console.log('Edit component:', component);
    // navigate(`/admin/templates/edit/${component.id}`);
  };

  const handleDuplicateComponent = (component) => {
    console.log('Duplicate component:', component);
    // Implement duplication logic
  };

  // Render component card
  const renderComponentCard = (component, index) => (
    <motion.div
      key={component.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
    >
      <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300">
        {/* Component Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img
            src={component.thumbnail}
            alt={component.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleViewComponent(component)}
                className="bg-white/90 hover:bg-white text-gray-900"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditComponent(component)}
                className="bg-white/90 hover:bg-white text-gray-900"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Button>
            </div>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <Badge 
              variant={component.status === 'active' ? 'green' : 'gray'}
              className="capitalize"
            >
              {component.status}
            </Badge>
          </div>

          {/* Version Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="blue" className="text-xs">
              v{component.version}
            </Badge>
          </div>
        </div>

        {/* Component Info */}
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 line-clamp-1">
                {component.name}
              </h3>
              <Badge variant="purple" className="text-xs">
                {component.category}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {component.description}
          </p>

          {/* Variations */}
          <div className="mb-4">
            <div className="text-xs font-medium text-gray-500 mb-2">Variations:</div>
            <div className="flex flex-wrap gap-1">
              {component.variations.slice(0, 2).map((variation, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                >
                  {variation}
                </span>
              ))}
              {component.variations.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{component.variations.length - 2} more
                </span>
              )}
            </div>
          </div>

          {/* Usage */}
          <div className="mb-4">
            <div className="text-xs font-medium text-gray-500 mb-2">Used in:</div>
            <div className="flex flex-wrap gap-1">
              {component.usedIn.slice(0, 3).map((page, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {page}
                </span>
              ))}
              {component.usedIn.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{component.usedIn.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              <div>by {component.author}</div>
              <div>Updated {component.lastModified}</div>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDuplicateComponent(component)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  // Render list view item
  const renderListItem = (component, index) => (
    <motion.div
      key={component.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="p-4 hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300">
        <div className="flex items-center space-x-4">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <img
              src={component.thumbnail}
              alt={component.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {component.name}
              </h3>
              <Badge variant="purple" className="text-xs">
                {component.category}
              </Badge>
              <Badge variant={component.status === 'active' ? 'green' : 'gray'} className="text-xs">
                {component.status}
              </Badge>
            </div>
            <p className="text-xs text-gray-600 mb-2 line-clamp-1">
              {component.description}
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>by {component.author}</span>
              <span>v{component.version}</span>
              <span>Updated {component.lastModified}</span>
              <span>{component.usedIn.length} pages</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewComponent(component)}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditComponent(component)}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Component Templates
              </h1>
              <p className="text-gray-600">
                Browse and manage all shared/reusable components across your project
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button variant="outline">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Import Components
              </Button>
              <Button>
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Component
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Components</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.active}</div>
            <div className="text-sm text-gray-600">Active Components</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.categories}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.recentlyUpdated}</div>
            <div className="text-sm text-gray-600">Recently Updated</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={({ className }) => (
                  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center space-x-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="lastModified-desc">Recently Updated</option>
                <option value="lastModified-asc">Oldest Updated</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="category-asc">Category A-Z</option>
                <option value="version-desc">Latest Version</option>
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

        {/* Components Grid/List */}
        <div className="mb-8">
          {filteredComponents.length === 0 ? (
            <EmptyState
              icon={({ className }) => (
                <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
              title="No components found"
              description="Try adjusting your search or filter criteria"
            />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredComponents.map(renderComponentCard)}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredComponents.map(renderListItem)}
            </div>
          )}
        </div>

        {/* Component Preview Modal */}
        <Modal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          title={selectedComponent?.name}
          size="xl"
        >
          {selectedComponent && (
            <div className="space-y-6">
              {/* Component Image */}
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedComponent.thumbnail}
                  alt={selectedComponent.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Component Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Component Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <Badge variant="purple">{selectedComponent.category}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <Badge>{selectedComponent.type}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Author:</span>
                      <span>{selectedComponent.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Version:</span>
                      <span>v{selectedComponent.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <Badge variant={selectedComponent.status === 'active' ? 'green' : 'gray'}>
                        {selectedComponent.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Modified:</span>
                      <span>{selectedComponent.lastModified}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Usage & Variations</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                    <p className="text-sm text-gray-600">{selectedComponent.description}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Variations</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedComponent.variations.map((variation, idx) => (
                        <Badge key={idx} variant="gray" className="text-xs">
                          {variation}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Used In</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedComponent.usedIn.map((page, idx) => (
                        <Badge key={idx} variant="blue" className="text-xs">
                          {page}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedComponent.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                  Close
                </Button>
                <Button variant="outline" onClick={() => handleDuplicateComponent(selectedComponent)}>
                  Duplicate
                </Button>
                <Button onClick={() => handleEditComponent(selectedComponent)}>
                  Edit Component
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default TemplatesDashboard;