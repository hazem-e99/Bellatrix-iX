import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Card, Button, Badge } from '../UI';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const PagesManagement = () => {
  const { colors } = useTheme();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPages, setSelectedPages] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockPages = [
      {
        id: 1,
        title: 'Home Page',
        fileName: 'homeData.json',
        status: 'published',
        lastModified: '2025-01-15T10:30:00Z',
        author: 'Admin User',
        views: 1250,
        sections: 6,
      },
      {
        id: 2,
        title: 'About Us',
        fileName: 'about.json',
        status: 'draft',
        lastModified: '2025-01-14T15:20:00Z',
        author: 'Content Manager',
        views: 890,
        sections: 4,
      },
      {
        id: 3,
        title: 'HR Solutions',
        fileName: 'hr.json',
        status: 'published',
        lastModified: '2025-01-13T09:15:00Z',
        author: 'Admin User',
        views: 2100,
        sections: 8,
      },
      {
        id: 4,
        title: 'Payroll Management',
        fileName: 'payroll.json',
        status: 'published',
        lastModified: '2025-01-12T14:45:00Z',
        author: 'Content Manager',
        views: 1560,
        sections: 7,
      },
      {
        id: 5,
        title: 'Implementation Services',
        fileName: 'Implementation.json',
        status: 'review',
        lastModified: '2025-01-11T11:30:00Z',
        author: 'Designer',
        views: 340,
        sections: 5,
      },
    ];
    
    setPages(mockPages);
    setLoading(false);
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectPage = (pageId) => {
    setSelectedPages(prev => {
      const newSelection = prev.includes(pageId) 
        ? prev.filter(id => id !== pageId)
        : [...prev, pageId];
      setShowBulkActions(newSelection.length > 0);
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    if (selectedPages.length === filteredPages.length) {
      setSelectedPages([]);
      setShowBulkActions(false);
    } else {
      setSelectedPages(filteredPages.map(page => page.id));
      setShowBulkActions(true);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      published: 'success',
      draft: 'default',
      review: 'warning',
      archived: 'error',
    };
    return <Badge variant={variants[status]} size="sm">{status}</Badge>;
  };

  const PageRow = ({ page, isSelected, onSelect }) => (
    <tr className={`
      ${colors.surface} hover:bg-gray-50 dark:hover:bg-gray-800/50 
      transition-colors duration-150 border-b ${colors.border}
      ${isSelected ? 'bg-blue-50 dark:bg-blue-950/20' : ''}
    `}>
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(page.id)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {page.title.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className={`${colors.text} font-medium`}>{page.title}</p>
            <p className={`${colors.textSecondary} text-sm`}>{page.fileName}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        {getStatusBadge(page.status)}
      </td>
      <td className="px-6 py-4">
        <div>
          <p className={`${colors.text} text-sm`}>{formatDate(page.lastModified)}</p>
          <p className={`${colors.textSecondary} text-xs`}>by {page.author}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className={`${colors.text} text-sm`}>{page.views.toLocaleString()}</p>
      </td>
      <td className="px-6 py-4">
        <p className={`${colors.text} text-sm`}>{page.sections} sections</p>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            title="Preview"
          >
            <EyeIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            title="Edit"
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            title="Duplicate"
          >
            <DocumentDuplicateIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-red-600 hover:text-red-700"
            title="Delete"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`${colors.text} text-2xl font-bold`}>Pages Management</h1>
          <p className={`${colors.textSecondary} text-sm`}>
            Manage and organize your content pages
          </p>
        </div>
        <Button className="sm:w-auto">
          <PlusIcon className="w-5 h-5 mr-2" />
          Create New Page
        </Button>
      </div>

      {/* Filters and Search */}
      <Card padding="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textSecondary}`} />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`
                  w-full pl-10 pr-4 py-2.5 rounded-lg border
                  ${colors.surface} ${colors.border} ${colors.text}
                  placeholder-gray-500 dark:placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200
                `}
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`
                  appearance-none pl-4 pr-10 py-2.5 rounded-lg border
                  ${colors.surface} ${colors.border} ${colors.text}
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200
                `}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="review">In Review</option>
                <option value="archived">Archived</option>
              </select>
              <FunnelIcon className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textSecondary} pointer-events-none`} />
            </div>
          </div>

          {/* Export Button */}
          <Button variant="outline">
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            Export
          </Button>
        </div>

        {/* Bulk Actions */}
        {showBulkActions && (
          <div className={`
            mt-4 p-4 rounded-lg border-2 border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800
            animate-in slide-in-from-top-2 duration-300
          `}>
            <div className="flex items-center justify-between">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                {selectedPages.length} page{selectedPages.length !== 1 ? 's' : ''} selected
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Publish
                </Button>
                <Button variant="outline" size="sm">
                  <DocumentDuplicateIcon className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
                <Button variant="danger" size="sm">
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSelectedPages([]);
                    setShowBulkActions(false);
                  }}
                >
                  <XMarkIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Pages Table */}
      <Card padding="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${colors.secondary}`}>
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedPages.length === filteredPages.length && filteredPages.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className={`px-6 py-4 text-left ${colors.text} font-semibold`}>Page</th>
                <th className={`px-6 py-4 text-left ${colors.text} font-semibold`}>Status</th>
                <th className={`px-6 py-4 text-left ${colors.text} font-semibold`}>Last Modified</th>
                <th className={`px-6 py-4 text-left ${colors.text} font-semibold`}>Views</th>
                <th className={`px-6 py-4 text-left ${colors.text} font-semibold`}>Sections</th>
                <th className={`px-6 py-4 text-left ${colors.text} font-semibold`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className={`${colors.surface} border-b ${colors.border}`}>
                    <td className="px-6 py-4">
                      <div className="animate-pulse w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="animate-pulse w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        <div className="space-y-2">
                          <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                          <div className="animate-pulse h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="animate-pulse w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : filteredPages.length > 0 ? (
                filteredPages.map((page) => (
                  <PageRow
                    key={page.id}
                    page={page}
                    isSelected={selectedPages.includes(page.id)}
                    onSelect={handleSelectPage}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className={`w-16 h-16 ${colors.secondary} rounded-full flex items-center justify-center`}>
                        <DocumentIcon className={`w-8 h-8 ${colors.textSecondary}`} />
                      </div>
                      <div>
                        <p className={`${colors.text} font-medium`}>No pages found</p>
                        <p className={`${colors.textSecondary} text-sm`}>
                          {searchTerm || statusFilter !== 'all' 
                            ? 'Try adjusting your search or filters' 
                            : 'Create your first page to get started'
                          }
                        </p>
                      </div>
                      {!searchTerm && statusFilter === 'all' && (
                        <Button>
                          <PlusIcon className="w-5 h-5 mr-2" />
                          Create First Page
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      {filteredPages.length > 0 && (
        <div className="flex items-center justify-between">
          <p className={`${colors.textSecondary} text-sm`}>
            Showing {filteredPages.length} of {pages.length} pages
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagesManagement;