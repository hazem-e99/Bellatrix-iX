import React from 'react';
import { PageProvider } from '../contexts/PageContext';
import PageManagement from '../components/PageManagement';
import SimpleApiTest from '../components/SimpleApiTest';

/**
 * مثال سريع لبدء استخدام نظام إدارة الصفحات
 * Quick Start Example for Page Management System
 */

// مثال 1: استخدام النظام كاملاً
export const FullPageManagement = () => {
  return (
    <PageProvider>
      <div className="min-h-screen bg-gray-50">
        <PageManagement />
      </div>
    </PageProvider>
  );
};

// مثال 2: اختبار الاتصال فقط
export const ApiTestOnly = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleApiTest />
    </div>
  );
};

// مثال 3: استخدام مخصص
export const CustomUsage = () => {
  return (
    <PageProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              نظام إدارة الصفحات - Page Management System
            </h1>
            
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">
                تعليمات الاستخدام - Usage Instructions
              </h2>
              <div className="text-sm text-blue-700 space-y-2">
                <p>1. تأكد من اتصال الإنترنت</p>
                <p>2. تحقق من صحة API URL: http://bellatrix.runasp.net</p>
                <p>3. إذا كان هناك مصادقة، تأكد من وجود التوكن</p>
                <p>4. استخدم مكونات الاختبار للتأكد من الاتصال</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">اختبار الاتصال</h3>
                <p className="text-gray-600 mb-4">اختبر الاتصال بالباك إند قبل البدء</p>
                <SimpleApiTest />
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">إدارة الصفحات</h3>
                <p className="text-gray-600 mb-4">نظام إدارة الصفحات الكامل</p>
                <PageManagement />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageProvider>
  );
};

// مثال 4: استخدام في Router
export const RouterIntegrationExample = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">مثال التكامل مع Router</h2>
      <div className="bg-white p-4 rounded-lg">
        <pre className="text-sm overflow-x-auto">
{`// في App.jsx أو ملف Router الرئيسي
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FullPageManagement, ApiTestOnly } from './examples/QuickStartExample';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/pages" element={<FullPageManagement />} />
        <Route path="/admin/test-api" element={<ApiTestOnly />} />
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
  const { usePages } = require('../hooks/usePages');
  
  return (
    <PageProvider>
      <DirectHooksComponent />
    </PageProvider>
  );
};

const DirectHooksComponent = () => {
  const {
    pages,
    loading,
    error,
    createPageWithSlug,
    fetchPages
  } = usePages();

  const handleCreateTestPage = async () => {
    try {
      await createPageWithSlug({
        name: 'Test Page from Hook',
        categoryId: 1,
        slug: 'test-page-from-hook',
        metaTitle: 'Test Page Title',
        metaDescription: 'Test page description',
        isPublished: false
      });
      alert('Page created successfully!');
    } catch (error) {
      alert('Error creating page: ' + error.message);
    }
  };

  const handleFetchPages = async () => {
    try {
      await fetchPages();
      alert('Pages fetched successfully!');
    } catch (error) {
      alert('Error fetching pages: ' + error.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">استخدام مباشر للـ Hooks</h2>
      
      <div className="mb-4 space-x-2">
        <button
          onClick={handleFetchPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Fetch Pages
        </button>
        <button
          onClick={handleCreateTestPage}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Create Test Page
        </button>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Status:</h3>
        <p>Loading: {loading ? 'Yes' : 'No'}</p>
        <p>Error: {error || 'None'}</p>
        <p>Pages Count: {pages.length}</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Pages:</h3>
        <pre className="text-sm overflow-x-auto">
          {JSON.stringify(pages, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default FullPageManagement;
