import React, { useState } from 'react';
import { usePages } from '../hooks/usePages';

/**
 * مثال لإنشاء صفحة مع مكونات باستخدام /api/Pages/with-components
 * Example for creating page with components using /api/Pages/with-components
 */

const CreatePageWithComponentsExample = () => {
  const { createPageWithComponents, loading } = usePages();
  
  const [pageData, setPageData] = useState({
    name: '',
    categoryId: 1,
    slug: '',
    metaTitle: '',
    metaDescription: '',
    isPublished: false
  });

  const [components, setComponents] = useState([
    {
      componentType: 'hero',
      componentName: 'Hero Section',
      contentJson: JSON.stringify({
        title: 'مرحباً بك',
        subtitle: 'نحن نقدم أفضل الخدمات',
        buttonText: 'ابدأ الآن',
        buttonLink: null
      }),
      orderIndex: 0
    },
    {
      componentType: 'text',
      componentName: 'Welcome Text',
      contentJson: JSON.stringify({
        text: 'نحن شركة رائدة في مجال التكنولوجيا',
        style: 'default'
      }),
      orderIndex: 1
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPageData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleComponentChange = (index, field, value) => {
    setComponents(prev => prev.map((comp, i) => 
      i === index ? { ...comp, [field]: value } : comp
    ));
  };

  const addComponent = () => {
    setComponents(prev => [...prev, {
      componentType: 'text',
      componentName: 'New Component',
      contentJson: JSON.stringify({ text: 'New component content' }),
      orderIndex: prev.length
    }]);
  };

  const removeComponent = (index) => {
    setComponents(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await createPageWithComponents(pageData, components);
      alert('تم إنشاء الصفحة مع المكونات بنجاح!');
      console.log('Created page with components:', result);
    } catch (error) {
      alert('خطأ في إنشاء الصفحة: ' + error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          إنشاء صفحة مع مكونات
        </h1>
        <p className="text-gray-600 mb-6">
          هذا المثال يستخدم endpoint: <code className="bg-gray-100 px-2 py-1 rounded">/api/Pages/with-components</code>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Page Data */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">بيانات الصفحة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم الصفحة *
                </label>
                <input
                  type="text"
                  name="name"
                  value={pageData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  معرف الفئة *
                </label>
                <input
                  type="number"
                  name="categoryId"
                  value={pageData.categoryId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رابط الصفحة
                </label>
                <input
                  type="text"
                  name="slug"
                  value={pageData.slug}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عنوان SEO
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={pageData.metaTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  وصف SEO
                </label>
                <textarea
                  name="metaDescription"
                  value={pageData.metaDescription}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={pageData.isPublished}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">نشر فوراً</span>
                </label>
              </div>
            </div>
          </div>

          {/* Components */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">مكونات الصفحة</h2>
              <button
                type="button"
                onClick={addComponent}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                إضافة مكون
              </button>
            </div>

            <div className="space-y-4">
              {components.map((component, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium">مكون #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeComponent(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      حذف
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        نوع المكون
                      </label>
                      <select
                        value={component.componentType}
                        onChange={(e) => handleComponentChange(index, 'componentType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="text">نص</option>
                        <option value="hero">Hero Section</option>
                        <option value="image">صورة</option>
                        <option value="card">بطاقة</option>
                        <option value="button">زر</option>
                        <option value="form">نموذج</option>
                        <option value="gallery">معرض</option>
                        <option value="video">فيديو</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        اسم المكون
                      </label>
                      <input
                        type="text"
                        value={component.componentName}
                        onChange={(e) => handleComponentChange(index, 'componentName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        محتوى JSON
                      </label>
                      <textarea
                        value={component.contentJson}
                        onChange={(e) => handleComponentChange(index, 'contentJson', e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري الإنشاء...' : 'إنشاء الصفحة مع المكونات'}
            </button>
          </div>
        </form>

        {/* API Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">معلومات API</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Endpoint:</strong> POST /api/Pages/with-components</p>
            <p><strong>Schema:</strong> CreatePageWithComponentsDTOcs</p>
            <p><strong>المكونات:</strong> NewPageComponentDTO[]</p>
            <p><strong>المطلوب:</strong> name, categoryId, componentType, contentJson</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePageWithComponentsExample;
