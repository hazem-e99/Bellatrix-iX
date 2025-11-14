import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Button from "./ui/Button";
import Card, { CardContent, CardHeader, CardTitle } from "./ui/Card";

/**
 * AdminsList Component
 * Displays a list of administrators
 *
 * Note: This is a placeholder component with mock data
 * TODO: Replace with actual API call when endpoint is available
 */
const AdminsList = ({ refreshTrigger }) => {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Mock data for admins
   * TODO: Replace with actual API call
   */
  const mockAdmins = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      username: "johndoe",
      role: 1, // SuperAdmin
      roleName: "Super Admin",
      createdAt: "2024-01-15T10:30:00",
      isVerified: true,
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      username: "janesmith",
      role: 2, // Admin
      roleName: "Admin",
      createdAt: "2024-02-20T14:45:00",
      isVerified: true,
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.j@example.com",
      username: "mikej",
      role: 2, // Admin
      roleName: "Admin",
      createdAt: "2024-03-10T09:15:00",
      isVerified: false,
    },
  ];

  /**
   * Fetch admins list
   * TODO: Implement actual API call when endpoint is available
   */
  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // TODO: Replace with actual API call
      // const response = await api.get('/Users/admins');
      // setAdmins(response.data);

      setAdmins(mockAdmins);
    } catch (error) {
      console.error("❌ [AdminsList] Error fetching admins:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [refreshTrigger]);

  /**
   * Filter admins by search term
   */
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Get role badge color
   */
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 1:
        return "from-red-500/20 to-red-600/20 border-red-400/30 text-red-300";
      case 2:
        return "from-blue-500/20 to-blue-600/20 border-blue-400/30 text-blue-300";
      case 3:
        return "from-gray-500/20 to-gray-600/20 border-gray-400/30 text-gray-300";
      default:
        return "from-gray-500/20 to-gray-600/20 border-gray-400/30 text-gray-300";
    }
  };

  /**
   * Format date
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-white text-xl font-bold">
                Administrators List
              </CardTitle>
              <p className="text-gray-400 text-sm mt-1">
                {filteredAdmins.length} admin
                {filteredAdmins.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[250px]"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-gray-400">
              <svg
                className="animate-spin h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Loading admins...</span>
            </div>
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className="text-center py-12">
            <UserGroupIcon className="mx-auto h-12 w-12 text-gray-500" />
            <p className="mt-2 text-gray-400">No admins found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                    Username
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                    Joined
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map((admin, index) => (
                  <motion.tr
                    key={admin.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/30 flex items-center justify-center">
                          <span className="text-purple-300 font-semibold text-sm">
                            {admin.firstName[0]}
                            {admin.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {admin.firstName} {admin.lastName}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4">
                      <span className="text-gray-300 text-sm">
                        {admin.email}
                      </span>
                    </td>

                    {/* Username */}
                    <td className="px-4 py-4">
                      <span className="text-gray-300 text-sm">
                        @{admin.username}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-4">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-gradient-to-r ${getRoleBadgeColor(
                          admin.role
                        )}`}
                      >
                        <ShieldCheckIcon className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          {admin.roleName}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      {admin.isVerified ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full">
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <span className="text-xs font-medium text-green-300">
                            Verified
                          </span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 border border-yellow-400/30 rounded-full">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                          <span className="text-xs font-medium text-yellow-300">
                            Pending
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Joined Date */}
                    <td className="px-4 py-4">
                      <span className="text-gray-400 text-sm">
                        {formatDate(admin.createdAt)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            console.log("Edit admin:", admin.id);
                            // TODO: Implement edit functionality
                          }}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Edit admin"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            console.log("Delete admin:", admin.id);
                            // TODO: Implement delete functionality
                          }}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete admin"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Note about mock data */}
        <div className="mt-6 bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
          <p className="text-xs text-yellow-300 font-medium mb-1">
            ⚠️ Development Note:
          </p>
          <p className="text-xs text-gray-400">
            This table currently displays mock data. The API does not have a
            users/admins list endpoint yet. Once the backend provides an
            endpoint like{" "}
            <code className="text-yellow-300">/api/Users/admins</code> or
            <code className="text-yellow-300"> /api/Account/users</code>, this
            component will be updated to fetch real data.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminsList;
