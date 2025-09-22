import React, { useState } from 'react';
import { pagesService } from '../services/pagesService';

const SimpleApiTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      // Test basic connection
      const response = await pagesService.getAllPages();
      setResult(`✅ Success! Got response: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      setResult(`❌ Error: ${error.message}\n\nDetails: ${JSON.stringify(error.response?.data || error, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Simple API Test</h1>
        
        <div className="mb-4">
          <button
            onClick={testApi}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test API Connection'}
          </button>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Result:</h3>
          <pre className="text-sm whitespace-pre-wrap overflow-x-auto">
            {result || 'Click the button to test API connection...'}
          </pre>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p><strong>API URL:</strong> http://bellatrix.runasp.net/api/Pages</p>
          <p><strong>Method:</strong> GET</p>
          <p><strong>Auth Token:</strong> {localStorage.getItem('authToken') ? 'Present' : 'Not Set'}</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleApiTest;
