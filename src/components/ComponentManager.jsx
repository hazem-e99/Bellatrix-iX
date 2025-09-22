import React, { useState, useEffect } from 'react';
import { usePageComponents } from '../hooks/usePageComponents';

const ComponentManager = ({ page, onBack }) => {
  const {
    pageComponents,
    loading,
    error,
    fetchPageComponents,
    addComponentWithName,
    updateComponent,
    deletePageComponent,
    duplicateComponent,
    moveComponentUp,
    moveComponentDown,
    moveComponentToPosition,
    getComponentsSortedByOrder,
    getComponentStatistics,
    parseComponentContent,
    updateComponentContent,
    getContentPreview
  } = usePageComponents();

  // Local state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingComponent, setEditingComponent] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [componentType, setComponentType] = useState('text');
  const [searchTerm, setSearchTerm] = useState('');

  // Statistics
  const stats = getComponentStatistics();

  // Load components when page changes
  useEffect(() => {
    if (page?.id) {
      fetchPageComponents(page.id);
    }
  }, [page?.id]);

  // Handle component selection
  const handleComponentSelect = (componentId) => {
    setSelectedComponents(prev => 
      prev.includes(componentId) 
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const handleSelectAll = () => {
    const sortedComponents = getComponentsSortedByOrder();
    if (selectedComponents.length === sortedComponents.length) {
      setSelectedComponents([]);
    } else {
      setSelectedComponents(sortedComponents.map(component => component.id));
    }
  };

  // Handle add component
  const handleAddComponent = async (componentData) => {
    try {
      await addComponentWithName(page.id, {
        ...componentData,
        componentType,
        orderIndex: pageComponents.length
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding component:', error);
    }
  };

  // Handle edit component
  const handleEditComponent = (component) => {
    setEditingComponent(component);
  };

  // Handle update component
  const handleUpdateComponent = async (componentData) => {
    try {
      await updateComponent(editingComponent.id, componentData);
      setEditingComponent(null);
    } catch (error) {
      console.error('Error updating component:', error);
    }
  };

  // Handle delete component
  const handleDeleteComponent = async (componentId) => {
    if (window.confirm('Are you sure you want to delete this component?')) {
      try {
        await deletePageComponent(componentId);
        setSelectedComponents(prev => prev.filter(id => id !== componentId));
      } catch (error) {
        console.error('Error deleting component:', error);
      }
    }
  };

  // Handle duplicate component
  const handleDuplicateComponent = async (componentId) => {
    try {
      await duplicateComponent(componentId);
    } catch (error) {
      console.error('Error duplicating component:', error);
    }
  };

  // Handle move component
  const handleMoveComponent = async (componentId, direction) => {
    try {
      if (direction === 'up') {
        await moveComponentUp(componentId);
      } else if (direction === 'down') {
        await moveComponentDown(componentId);
      }
    } catch (error) {
      console.error('Error moving component:', error);
    }
  };

  // Handle bulk operations
  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedComponents.length} components?`)) {
      try {
        const results = await Promise.allSettled(
          selectedComponents.map(componentId => deletePageComponent(componentId))
        );
        console.log('Bulk delete results:', results);
        setSelectedComponents([]);
      } catch (error) {
        console.error('Error in bulk delete:', error);
      }
    }
  };

  // Filter components
  const filteredComponents = pageComponents.filter(component => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      (component.componentName && component.componentName.toLowerCase().includes(term)) ||
      (component.componentType && component.componentType.toLowerCase().includes(term)) ||
      (component.contentJson && component.contentJson.toLowerCase().includes(term))
    );
  });

  const sortedComponents = getComponentsSortedByOrder().filter(component => 
    filteredComponents.some(fc => fc.id === component.id)
  );

  // Render component list
  const renderComponentList = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Component Manager</h1>
          <p className="text-gray-600">Manage components for "{page?.name}"</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Pages
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Component
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-gray-600">Total Components</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">{stats.withNames}</div>
          <div className="text-gray-600">With Names</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600">{stats.withoutNames}</div>
          <div className="text-gray-600">Unnamed</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-purple-600">{stats.types.length}</div>
          <div className="text-gray-600">Component Types</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={componentType}
              onChange={(e) => setComponentType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="text">Text Component</option>
              <option value="image">Image Component</option>
              <option value="hero">Hero Section</option>
              <option value="card">Card Component</option>
              <option value="button">Button Component</option>
              <option value="form">Form Component</option>
              <option value="gallery">Gallery Component</option>
              <option value="video">Video Component</option>
            </select>
          </div>
          {selectedComponents.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete ({selectedComponents.length})
            </button>
          )}
        </div>
      </div>

      {/* Components List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedComponents.length === sortedComponents.length && sortedComponents.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedComponents.map((component, index) => (
                <tr key={component.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedComponents.includes(component.id)}
                      onChange={() => handleComponentSelect(component.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{component.orderIndex + 1}</span>
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleMoveComponent(component.id, 'up')}
                          disabled={index === 0}
                          className="text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => handleMoveComponent(component.id, 'down')}
                          disabled={index === sortedComponents.length - 1}
                          className="text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {component.componentName || 'Unnamed Component'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {component.componentType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="max-w-xs truncate">
                      {getContentPreview(component, 50)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditComponent(component)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDuplicateComponent(component.id)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Duplicate
                      </button>
                      <button
                        onClick={() => handleDeleteComponent(component.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedComponents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No components</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding a new component.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Component
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render add component form
  const renderAddForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Component</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const componentData = {
            componentType: formData.get('componentType'),
            componentName: formData.get('componentName'),
            contentJson: formData.get('contentJson')
          };
          handleAddComponent(componentData);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Component Type *</label>
              <select
                name="componentType"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="text">Text Component</option>
                <option value="image">Image Component</option>
                <option value="hero">Hero Section</option>
                <option value="card">Card Component</option>
                <option value="button">Button Component</option>
                <option value="form">Form Component</option>
                <option value="gallery">Gallery Component</option>
                <option value="video">Video Component</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Component Name</label>
              <input
                type="text"
                name="componentName"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter component name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content JSON *</label>
              <textarea
                name="contentJson"
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder='{"text": "Hello World", "style": "default"}'
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Component
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Render edit component form
  const renderEditForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Component</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const componentData = {
            componentType: formData.get('componentType'),
            componentName: formData.get('componentName'),
            contentJson: formData.get('contentJson')
          };
          handleUpdateComponent(componentData);
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Component Type *</label>
              <select
                name="componentType"
                defaultValue={editingComponent?.componentType}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="text">Text Component</option>
                <option value="image">Image Component</option>
                <option value="hero">Hero Section</option>
                <option value="card">Card Component</option>
                <option value="button">Button Component</option>
                <option value="form">Form Component</option>
                <option value="gallery">Gallery Component</option>
                <option value="video">Video Component</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Component Name</label>
              <input
                type="text"
                name="componentName"
                defaultValue={editingComponent?.componentName}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter component name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content JSON *</label>
              <textarea
                name="contentJson"
                defaultValue={editingComponent?.contentJson}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder='{"text": "Hello World", "style": "default"}'
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={() => setEditingComponent(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Component
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Render loading state
  if (loading && pageComponents.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading components...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {renderComponentList()}
      {showAddForm && renderAddForm()}
      {editingComponent && renderEditForm()}
    </div>
  );
};

export default ComponentManager;
