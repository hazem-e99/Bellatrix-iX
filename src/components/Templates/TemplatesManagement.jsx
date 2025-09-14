import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Card, Button, Badge } from '../UI';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  StarIcon,
  ClockIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const TemplatesManagement = () => {
  const { colors } = useTheme();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockTemplates = [
      {
        id: 1,
        name: 'Business Homepage',
        description: 'Professional homepage template with hero section, services, and testimonials',
        category: 'Landing',
        thumbnail: '/api/placeholder/400/300',
        lastModified: '2025-01-15T10:30:00Z',
        author: 'Design Team',
        usageCount: 25,
        isFavorite: true,
        status: 'active',
        fields: ['hero', 'services', 'testimonials', 'cta'],
      },
      {
        id: 2,
        name: 'Service Page',
        description: 'Dedicated service page with detailed features and pricing',
        category: 'Service',
        thumbnail: '/api/placeholder/400/300',
        lastModified: '2025-01-14T15:20:00Z',
        author: 'UI Designer',
        usageCount: 18,
        isFavorite: false,
        status: 'active',
        fields: ['header', 'features', 'pricing', 'faq'],
      },
      {
        id: 3,
        name: 'About Us',
        description: 'Company story template with team showcase and values',
        category: 'Corporate',
        thumbnail: '/api/placeholder/400/300',
        lastModified: '2025-01-13T09:15:00Z',
        author: 'Content Team',
        usageCount: 12,
        isFavorite: true,
        status: 'draft',
        fields: ['story', 'team', 'values', 'timeline'],
      },
      {
        id: 4,
        name: 'Product Showcase',
        description: 'Product-focused template with gallery and specifications',
        category: 'Product',
        thumbnail: '/api/placeholder/400/300',
        lastModified: '2025-01-12T14:45:00Z',
        author: 'Product Team',
        usageCount: 8,
        isFavorite: false,
        status: 'active',
        fields: ['gallery', 'specs', 'reviews', 'purchase'],
      },
      {
        id: 5,
        name: 'Contact Page',
        description: 'Contact form template with location map and office hours',
        category: 'Contact',
        thumbnail: '/api/placeholder/400/300',
        lastModified: '2025-01-11T11:30:00Z',
        author: 'Dev Team',
        usageCount: 35,
        isFavorite: false,
        status: 'active',
        fields: ['form', 'map', 'hours', 'social'],
      },
      {
        id: 6,
        name: 'Blog Template',
        description: 'Blog layout with article listing and sidebar widgets',
        category: 'Content',
        thumbnail: '/api/placeholder/400/300',
        lastModified: '2025-01-10T16:20:00Z',
        author: 'Content Team',
        usageCount: 22,
        isFavorite: true,
        status: 'active',
        fields: ['articles', 'sidebar', 'categories', 'search'],
      },
    ];
    
    setTemplates(mockTemplates);
    setLoading(false);
  };

  const categories = ['all', 'Landing', 'Service', 'Corporate', 'Product', 'Contact', 'Content'];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (templateId) => {
    setTemplates(prev => prev.map(template => 
      template.id === templateId 
        ? { ...template, isFavorite: !template.isFavorite }
        : template
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: 'success',
      draft: 'warning',
      archived: 'default',
    };
    return <Badge variant={variants[status]} size="sm">{status}</Badge>;
  };

  const TemplateCard = ({ template }) => (
    <Card hover className="group relative overflow-hidden">
      {/* Template Preview */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden mb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-16 h-16 ${colors.accent} rounded-2xl flex items-center justify-center shadow-lg`}>
            <span className="text-white font-bold text-xl">
              {template.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
            <EyeIcon className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
            <PencilIcon className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Favorite Toggle */}
        <button
          onClick={() => toggleFavorite(template.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
        >
          {template.isFavorite ? (
            <StarIconSolid className="w-5 h-5 text-yellow-500" />
          ) : (
            <StarIcon className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      {/* Template Info */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className={`${colors.text} font-semibold text-lg truncate`}>
              {template.name}
            </h3>
            <p className={`${colors.textSecondary} text-sm line-clamp-2`}>
              {template.description}
            </p>
          </div>
          {getStatusBadge(template.status)}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <Badge variant="purple" size="xs">{template.category}</Badge>
            <span className={`${colors.textSecondary} flex items-center`}>
              <ClockIcon className="w-4 h-4 mr-1" />
              {formatDate(template.lastModified)}
            </span>
          </div>
          <span className={`${colors.textSecondary}`}>
            {template.usageCount} uses
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className={`${colors.textSecondary} text-sm`}>
            by {template.author}
          </span>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="p-2">
              <DocumentDuplicateIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <PencilIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 text-red-600 hover:text-red-700">
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  const TemplateListItem = ({ template }) => (
    <Card className="group">
      <div className="flex items-center space-x-6">
        {/* Thumbnail */}
        <div className="w-24 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
          <div className={`w-8 h-8 ${colors.accent} rounded-lg flex items-center justify-center`}>
            <span className="text-white font-bold text-sm">
              {template.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3">
            <h3 className={`${colors.text} font-semibold`}>{template.name}</h3>
            {getStatusBadge(template.status)}
            <Badge variant="purple" size="xs">{template.category}</Badge>
            {template.isFavorite && <StarIconSolid className="w-4 h-4 text-yellow-500" />}
          </div>
          <p className={`${colors.textSecondary} text-sm mt-1 line-clamp-1`}>
            {template.description}
          </p>
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
            <span>by {template.author}</span>
            <span>{formatDate(template.lastModified)}</span>
            <span>{template.usageCount} uses</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="p-2">
            <EyeIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <DocumentDuplicateIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2 text-red-600 hover:text-red-700">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`${colors.text} text-2xl font-bold`}>Templates</h1>
          <p className={`${colors.textSecondary} text-sm`}>
            Design and manage reusable page templates
          </p>
        </div>
        <Button className="sm:w-auto">
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Filters and Controls */}
      <Card padding="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${colors.textSecondary}`} />
              <input
                type="text"
                placeholder="Search templates..."
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

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`
                px-4 py-2.5 rounded-lg border
                ${colors.surface} ${colors.border} ${colors.text}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200
              `}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="p-2"
            >
              <Squares2X2Icon className="w-5 h-5" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="p-2"
            >
              <ListBulletIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Templates Grid/List */}
      {loading ? (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <div className={`${viewMode === 'grid' ? 'aspect-video' : 'h-16'} bg-gray-200 dark:bg-gray-700 rounded-lg mb-4`}></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </Card>
          ))}
        </div>
      ) : filteredTemplates.length > 0 ? (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {filteredTemplates.map((template) => 
            viewMode === 'grid' ? (
              <TemplateCard key={template.id} template={template} />
            ) : (
              <TemplateListItem key={template.id} template={template} />
            )
          )}
        </div>
      ) : (
        <Card className="py-12">
          <div className="text-center space-y-4">
            <div className={`w-16 h-16 ${colors.secondary} rounded-full flex items-center justify-center mx-auto`}>
              <TemplateIcon className={`w-8 h-8 ${colors.textSecondary}`} />
            </div>
            <div>
              <p className={`${colors.text} font-medium`}>No templates found</p>
              <p className={`${colors.textSecondary} text-sm`}>
                {searchTerm || categoryFilter !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Create your first template to get started'
                }
              </p>
            </div>
            {!searchTerm && categoryFilter === 'all' && (
              <Button>
                <PlusIcon className="w-5 h-5 mr-2" />
                Create First Template
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default TemplatesManagement;