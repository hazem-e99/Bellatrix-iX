import React from 'react';
import { PageProvider } from '../contexts/PageContext';
import PageManagement from '../components/PageManagement';
import SimpleApiTest from '../components/SimpleApiTest';

/**
 * مثال للاستخدام مع REST API فقط
 * Example for REST API only usage
 */

// مثال 1: النظام الكامل
export const FullRestApiSystem = () => {
  return (
    <PageProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">نظام إدارة الصفحات</h1>
            <p className="text-gray-600">معتمد على REST API الحقيقي</p>
          </div>
          <PageManagement />
        </div>
      </div>
    </PageProvider>
  );
};

// مثال 2: اختبار الاتصال فقط
export const ApiConnectionTest = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">اختبار اتصال API</h1>
          <p className="text-gray-600">تأكد من الاتصال بالباك إند قبل البدء</p>
        </div>
        <SimpleApiTest />
      </div>
    </div>
  );
};

// مثال 3: استخدام مخصص مع معلومات إضافية
export const CustomRestApiUsage = () => {
  return (
    <PageProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">إدارة الصفحات</h1>
                <p className="text-gray-600">نظام متكامل لإدارة صفحات الموقع</p>
              </div>
              <div className="text-sm text-gray-500">
                <div>API: http://bellatrix.runasp.net</div>
                <div>الحالة: متصل</div>
              </div>
            </div>
          </div>

          {/* API Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">معلومات API</h2>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Base URL:</strong> http://bellatrix.runasp.net</p>
              <p><strong>المصادقة:</strong> JWT Token (إذا مطلوب)</p>
              <p><strong>التنسيق:</strong> JSON</p>
              <p><strong>الطريقة:</strong> REST API</p>
            </div>
          </div>

          {/* Main Content */}
          <PageManagement />
        </div>
      </div>
    </PageProvider>
  );
};

// مثال 4: استخدام في Router
export const RouterIntegration = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">تكامل مع Router</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <pre className="text-sm overflow-x-auto">
{`// في App.jsx أو ملف Router الرئيسي
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FullRestApiSystem, ApiConnectionTest } from './examples/RestApiOnlyExample';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/pages" element={<FullRestApiSystem />} />
        <Route path="/admin/test-api" element={<ApiConnectionTest />} />
        <Route path="/admin/custom" element={<CustomRestApiUsage />} />
        {/* مسارات أخرى */}
      </Routes>
    </Router>
  );
}`}
        </pre>
      </div>
    </div>
  );
};

// مثال 5: استخدام مباشر للـ hooks
export const DirectHooksUsage = () => {
  return (
    <PageProvider>
      <DirectHooksComponent />
    </PageProvider>
  );
};

const DirectHooksComponent = () => {
  const { usePages } = require('../hooks/usePages');
  
  const {
    pages,
    loading,
    error,
    createPageWithSlug,
    fetchPages,
    deletePage,
    togglePagePublication
  } = usePages();

  const handleCreateTestPage = async () => {
    try {
      await createPageWithSlug({
        name: 'صفحة تجريبية من Hook',
        categoryId: 1,
        slug: 'test-page-from-hook',
        metaTitle: 'صفحة تجريبية',
        metaDescription: 'صفحة للاختبار من خلال Hook',
        isPublished: false
      });
      alert('تم إنشاء الصفحة بنجاح!');
    } catch (error) {
      alert('خطأ في إنشاء الصفحة: ' + error.message);
    }
  };

  const handleFetchPages = async () => {
    try {
      await fetchPages();
      alert('تم جلب الصفحات بنجاح!');
    } catch (error) {
      alert('خطأ في جلب الصفحات: ' + error.message);
    }
  };

  const handleDeletePage = async (pageId) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الصفحة؟')) {
      try {
        await deletePage(pageId);
        alert('تم حذف الصفحة بنجاح!');
      } catch (error) {
        alert('خطأ في حذف الصفحة: ' + error.message);
      }
    }
  };

  const handleTogglePublication = async (pageId) => {
    try {
      await togglePagePublication(pageId);
      alert('تم تغيير حالة النشر!');
    } catch (error) {
      alert('خطأ في تغيير حالة النشر: ' + error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">استخدام مباشر للـ Hooks</h2>
      
      {/* Actions */}
      <div className="mb-6 space-x-2">
        <button
          onClick={handleFetchPages}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'جاري التحميل...' : 'جلب الصفحات'}
        </button>
        <button
          onClick={handleCreateTestPage}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          إنشاء صفحة تجريبية
        </button>
      </div>

      {/* Status */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">الحالة:</h3>
        <p>التحميل: {loading ? 'نعم' : 'لا'}</p>
        <p>الخطأ: {error || 'لا يوجد'}</p>
        <p>عدد الصفحات: {pages.length}</p>
      </div>

      {/* Pages List */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">الصفحات:</h3>
        {pages.length === 0 ? (
          <p className="text-gray-500">لا توجد صفحات</p>
        ) : (
          <div className="space-y-2">
            {pages.map(page => (
              <div key={page.id} className="bg-white p-3 rounded border">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{page.name}</h4>
                    <p className="text-sm text-gray-600">Slug: {page.slug}</p>
                    <p className="text-sm text-gray-600">
                      الحالة: {page.isPublished ? 'منشورة' : 'مسودة'}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleTogglePublication(page.id)}
                      className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                    >
                      {page.isPublished ? 'إلغاء النشر' : 'نشر'}
                    </button>
                    <button
                      onClick={() => handleDeletePage(page.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FullRestApiSystem;
