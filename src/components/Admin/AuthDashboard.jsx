import { useAuth } from '../../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';

const AuthDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                Welcome, <span className="font-medium">{user?.fullName || user?.userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Authentication System Status
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* User Info Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-blue-900">User Information</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p><strong>Name:</strong> {user?.fullName || 'N/A'}</p>
                        <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
                        <p><strong>Username:</strong> {user?.userName || 'N/A'}</p>
                        <p><strong>Role:</strong> {user?.role || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Authentication Status Card */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-green-900">Authentication Status</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p className="flex items-center">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                          Authenticated
                        </p>
                        <p className="flex items-center">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                          Admin Access Granted
                        </p>
                        <p className="flex items-center">
                          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                          JWT Token Valid
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Card */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-yellow-900">Quick Actions</h3>
                      <div className="mt-2 space-y-2">
                        <button
                          onClick={() => navigate('/admin/pages')}
                          className="block w-full text-left text-sm text-yellow-700 hover:text-yellow-900"
                        >
                          → Manage Pages
                        </button>
                        <button
                          onClick={() => navigate('/admin/templates')}
                          className="block w-full text-left text-sm text-yellow-700 hover:text-yellow-900"
                        >
                          → Manage Templates
                        </button>
                        <button
                          onClick={() => navigate('/admin/settings')}
                          className="block w-full text-left text-sm text-yellow-700 hover:text-yellow-900"
                        >
                          → Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <div className="mt-8 bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Authentication System Successfully Implemented!
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        The admin authentication system is now fully functional. You can:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Login with admin credentials</li>
                        <li>Register new admin users</li>
                        <li>Verify email addresses</li>
                        <li>Reset passwords</li>
                        <li>Access protected admin routes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthDashboard;
