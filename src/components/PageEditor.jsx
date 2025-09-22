import React, { useState, useEffect } from 'react';
import { usePages } from '../hooks/usePages';

const PageEditor = ({ page, onSave, onCancel }) => {
  const { updatePageWithSlug, isSlugAvailable, generateUniqueSlug } = usePages();
  
  // Form state
  const [formData, setFormData] = useState({
    id: page?.id || null,
    name: page?.name || '',
    categoryId: page?.categoryId || '',
    slug: page?.slug || '',
    metaTitle: page?.metaTitle || '',
    metaDescription: page?.metaDescription || '',
    isHomepage: page?.isHomepage || false,
    isPublished: page?.isPublished || false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [slugChecking, setSlugChecking] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState(true);

  // Auto-generate slug when name changes
  useEffect(() => {
    if (formData.name && !formData.slug) {
      const generatedSlug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.name]);

  // Check slug availability
  useEffect(() => {
    const checkSlug = async () => {
      if (formData.slug && formData.slug.length > 0) {
        setSlugChecking(true);
        try {
          const available = await isSlugAvailable(formData.slug, formData.id);
          setSlugAvailable(available);
        } catch (error) {
          console.error('Error checking slug:', error);
          setSlugAvailable(false);
        } finally {
          setSlugChecking(false);
        }
      } else {
        setSlugAvailable(true);
      }
    };

    const timeoutId = setTimeout(checkSlug, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.slug, formData.id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle slug generation
  const handleGenerateSlug = async () => {
    if (formData.name) {
      try {
        const baseSlug = formData.name
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
        
        const uniqueSlug = await generateUniqueSlug(baseSlug, formData.id);
        setFormData(prev => ({ ...prev, slug: uniqueSlug }));
      } catch (error) {
        console.error('Error generating slug:', error);
      }
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Page name must be at least 2 characters long';
    }

    if (formData.name && formData.name.length > 100) {
      newErrors.name = 'Page name must be less than 100 characters';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }

    if (formData.slug && formData.slug.length > 200) {
      newErrors.slug = 'Slug must be less than 200 characters';
    }

    if (formData.metaTitle && formData.metaTitle.length > 60) {
      newErrors.metaTitle = 'Meta title must be less than 60 characters';
    }

    if (formData.metaDescription && formData.metaDescription.length > 160) {
      newErrors.metaDescription = 'Meta description must be less than 160 characters';
    }

    if (formData.slug && !slugAvailable && !slugChecking) {
      newErrors.slug = 'This slug is already in use';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await updatePageWithSlug(formData);
      onSave(formData);
    } catch (error) {
      console.error('Error updating page:', error);
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Handle preview
  const handlePreview = () => {
    // Open preview in new window/tab
    const previewUrl = `/preview/${formData.slug || formData.id}`;
    window.open(previewUrl, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Edit Page</h1>
              <p className="text-gray-600">Update page information and settings</p>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handlePreview}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Preview
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="page-form"
                disabled={loading || !slugAvailable || slugChecking}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <form id="page-form" onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Page Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter page name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                  Category ID *
                </label>
                <input
                  type="number"
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.categoryId ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter category ID"
                />
                {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                URL Slug
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.slug ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="page-url-slug"
                />
                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Generate
                </button>
              </div>
              {slugChecking && (
                <p className="mt-1 text-sm text-blue-600">Checking slug availability...</p>
              )}
              {!slugChecking && formData.slug && (
                <p className={`mt-1 text-sm ${slugAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {slugAvailable ? '✓ Slug is available' : '✗ Slug is already in use'}
                </p>
              )}
              {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
            </div>
          </div>

          {/* SEO Settings */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">SEO Settings</h2>
            
            <div>
              <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                id="metaTitle"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleInputChange}
                maxLength="60"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.metaTitle ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Page title for search engines"
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.metaTitle.length}/60 characters
              </p>
              {errors.metaTitle && <p className="mt-1 text-sm text-red-600">{errors.metaTitle}</p>}
            </div>

            <div>
              <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleInputChange}
                maxLength="160"
                rows="3"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.metaDescription ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Brief description of the page for search engines"
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.metaDescription.length}/160 characters
              </p>
              {errors.metaDescription && <p className="mt-1 text-sm text-red-600">{errors.metaDescription}</p>}
            </div>
          </div>

          {/* Page Settings */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Page Settings</h2>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isPublished" className="ml-2 text-sm text-gray-700">
                  Publish this page
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isHomepage"
                  name="isHomepage"
                  checked={formData.isHomepage}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isHomepage" className="ml-2 text-sm text-gray-700">
                  Set as homepage
                </label>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {errors.submit && (
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
                    <p>{errors.submit}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !slugAvailable || slugChecking}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageEditor;
