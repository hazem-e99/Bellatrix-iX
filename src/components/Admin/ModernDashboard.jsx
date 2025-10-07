import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  DocumentTextIcon,
  EyeIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UsersIcon,
  CalendarIcon,
  PlusIcon,
  ArrowTopRightOnSquareIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import Button from "../ui/Button";
import dashboardAPI from "../../lib/dashboardAPI";
import toast from "react-hot-toast";

const ModernDashboard = () => {
  const navigate = useNavigate();
  
  // State for dashboard data
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    recentActivity: [],
    systemStatus: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all dashboard data in parallel
        const [statsData, recentMessages, recentPages, systemStatus] = await Promise.all([
          dashboardAPI.getDashboardStats(),
          dashboardAPI.getRecentContactMessages(5),
          dashboardAPI.getRecentPages(5),
          dashboardAPI.getSystemStatus()
        ]);

        // Transform stats data into the format expected by the UI
  const stats = [
    {
      id: 1,
      name: "Total Pages",
            value: statsData.pages.total.toString(),
            change: "+12%", // This would need historical data to calculate
      changeType: "increase",
      icon: DocumentTextIcon,
      color: "blue",
    },
          {
            id: 2,
            name: "Published Pages",
            value: statsData.pages.published.toString(),
            change: "+8%",
      changeType: "increase",
      icon: EyeIcon,
      color: "green",
    },
          {
            id: 3,
            name: "Total Media",
            value: statsData.media.totalMedia?.toString() || "0",
            change: "+5%",
            changeType: "increase",
            icon: DocumentTextIcon,
            color: "purple",
          },
    {
      id: 4,
            name: "Contact Messages",
            value: statsData.contact.totalMessages?.toString() || "0",
            change: "+15%",
            changeType: "increase",
            icon: UsersIcon,
      color: "orange",
    },
  ];

        // Transform recent activity from messages and pages
  const recentActivity = [
          ...recentMessages.map((message, index) => ({
            id: `msg-${message.id || index}`,
            action: "New message received",
            item: message.subject || message.name || "Contact Form",
            user: message.name || "Anonymous",
            time: formatTimeAgo(message.createdAt || new Date()),
            type: "message",
          })),
          ...recentPages.map((page, index) => ({
            id: `page-${page.id || index}`,
            action: page.isPublished ? "Page published" : "Page created",
            item: page.name || page.title || "Untitled Page",
      user: "Admin",
            time: formatTimeAgo(page.createdAt || new Date()),
            type: page.isPublished ? "publish" : "create",
          })),
        ].slice(0, 5); // Limit to 5 most recent activities

        setDashboardData({
          stats,
          recentActivity,
          systemStatus
        });

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message || "Failed to load dashboard data");
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Helper function to format time ago
  const formatTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMinutes = Math.floor((now - past) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  // Helper function to handle quick action clicks
  const handleQuickAction = (action) => {
    switch (action.id) {
      case 1: // Create New Page
        navigate("/admin/pages/enhanced-create");
        toast.success("Redirecting to page creation...");
        break;
      case 2: // Manage Pages
        navigate("/admin/pages");
        toast.success("Opening pages management...");
        break;
      case 3: // View Site
        window.open("/", "_blank");
        toast.success("Opening site in new tab...");
        break;
      case 4: // Analytics
        // For now, show a message since analytics page might not exist yet
        toast("Analytics feature coming soon!", {
          icon: "ℹ️",
          duration: 3000,
        });
        break;
      default:
        console.log("Unknown action:", action);
    }
  };

  const quickActions = [
    {
      id: 1,
      name: "Create New Page",
      description: "Add a new page to your site",
      icon: PlusIcon,
      action: "/admin/pages/enhanced-create",
      color: "blue",
    },
    {
      id: 2,
      name: "Manage Pages",
      description: "Edit and organize your pages",
      icon: DocumentTextIcon,
      action: "/admin/pages",
      color: "purple",
    },
    {
      id: 3,
      name: "View Site",
      description: "Preview your live website",
      icon: ArrowTopRightOnSquareIcon,
      action: "/",
      color: "green",
    },
    {
      id: 4,
      name: "Analytics",
      description: "View detailed statistics",
      icon: ArrowTrendingUpIcon,
      action: "/admin/analytics",
      color: "orange",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-[var(--color-primary-bg)]",
        text: "text-[var(--color-primary)]",
        border: "border-[var(--color-border-primary)]",
        icon: "bg-[var(--color-primary)]",
      },
      purple: {
        bg: "bg-[var(--tw-purple-100)]",
        text: "text-[var(--tw-purple-700)]",
        border: "border-[var(--tw-purple-300)]",
        icon: "bg-[var(--tw-purple-600)]",
      },
      green: {
        bg: "bg-[var(--tw-green-100)]",
        text: "text-[var(--tw-green-600)]",
        border: "border-[var(--tw-green-100)]",
        icon: "bg-[var(--tw-green-600)]",
      },
      orange: {
        bg: "bg-[var(--tw-yellow-100)]",
        text: "text-[var(--tw-yellow-600)]",
        border: "border-[var(--tw-yellow-100)]",
        icon: "bg-[var(--tw-yellow-600)]",
      },
    };
    return colors[color] || colors.blue;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "create":
        return <PlusIcon className="h-4 w-4 text-[var(--tw-green-500)]" />;
      case "update":
        return <DocumentTextIcon className="h-4 w-4 text-[var(--color-primary)]" />;
      case "publish":
        return (
          <ArrowTopRightOnSquareIcon className="h-4 w-4 text-[var(--tw-purple-500)]" />
        );
      case "message":
        return <UsersIcon className="h-4 w-4 text-[var(--color-primary)]" />;
      case "settings":
        return <ClockIcon className="h-4 w-4 text-[var(--tw-yellow-500)]" />;
      default:
        return <DocumentTextIcon className="h-4 w-4 text-[var(--color-text-muted)]" />;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6 text-white">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-text-inverse)] mb-2">
            Welcome back! 👋
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Loading your dashboard...
          </p>
        </div>
        
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-[var(--color-white-10)] border border-[var(--color-white-20)] shadow animate-pulse">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-[var(--color-white-20)] rounded w-20"></div>
                    <div className="h-8 bg-[var(--color-white-20)] rounded w-16"></div>
                    <div className="h-3 bg-[var(--color-white-20)] rounded w-24"></div>
                  </div>
                  <div className="h-12 w-12 bg-[var(--color-white-20)] rounded-lg"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6 text-white">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-text-inverse)] mb-2">
            Welcome back! 👋
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            There was an error loading your dashboard.
          </p>
        </div>
        
        <Card className="bg-[var(--tw-red-500)]/10 border border-[var(--tw-red-500)]/20 shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-[var(--tw-red-400)]" />
              <div>
                <h3 className="text-lg font-medium text-[var(--tw-red-400)]">Error Loading Dashboard</h3>
                <p className="text-[var(--tw-red-300)]">{error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="mt-3 bg-[var(--tw-red-600)] hover:bg-[var(--tw-red-700)] text-[var(--color-text-inverse)]"
                >
                  Retry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { stats, recentActivity, systemStatus } = dashboardData;

  return (
    <div className="space-y-6 text-white">
      {/* Welcome Section */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-[var(--color-text-inverse)] mb-2">
            Welcome back! 👋
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Here's what's happening with your website today.
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const colorClasses = getColorClasses(stat.color);
          const IconComponent = stat.icon;
          const TrendIcon =
            stat.changeType === "increase"
              ? ArrowTrendingUpIcon
              : ArrowTrendingDownIcon;

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-[var(--color-white-10)] border border-[var(--color-white-20)] shadow transition-transform duration-200 hover:-translate-y-0.5">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                        {stat.name}
                      </p>
                      <p className="text-3xl font-bold text-[var(--color-text-inverse)] mt-2">
                        {stat.value}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendIcon
                          className={`h-4 w-4 mr-1 ${
                            stat.changeType === "increase"
                              ? "text-[var(--tw-green-500)]"
                              : "text-[var(--tw-red-500)]"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            stat.changeType === "increase"
                              ? "text-[var(--tw-green-400)]"
                              : "text-[var(--tw-red-400)]"
                          }`}
                        >
                          {stat.change}
                        </span>
                        <span className="text-sm text-[var(--color-text-light)] ml-2">
                          vs last month
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg bg-[var(--color-white-10)] border border-[var(--color-white-20)]`}>
                      <IconComponent
                        className={`h-6 w-6 text-[var(--color-text-inverse)]/90`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-[var(--color-white-10)] border border-[var(--color-white-20)] shadow">
            <CardHeader>
              <CardTitle className="text-[var(--color-text-inverse)]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => {
                  const colorClasses = getColorClasses(action.color);
                  const IconComponent = action.icon;

                  return (
                    <motion.div
                      key={action.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                         className="h-auto p-4 flex-col items-start space-y-2 w-full bg-[var(--color-white-10)] hover:bg-[var(--color-white-20)] border-[var(--color-white-20)] text-[var(--color-text-inverse)] transition-all duration-200"
                         onClick={() => handleQuickAction(action)}
                      >
                        <div className={`p-2 rounded-lg bg-[var(--color-white-10)] border border-[var(--color-white-20)]`}>
                          <IconComponent
                            className={`h-5 w-5 text-[var(--color-text-inverse)]/90`}
                          />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-[var(--color-text-inverse)]">
                            {action.name}
                          </div>
                          <div className="text-sm text-[var(--color-text-secondary)]">
                            {action.description}
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-[var(--color-white-10)] border border-[var(--color-white-20)] shadow">
            <CardHeader>
              <CardTitle className="text-[var(--color-text-inverse)]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[var(--color-white-10)] transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--color-text-inverse)]">
                        {activity.action}
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {activity.item}
                      </p>
                      <p className="text-xs text-[var(--color-text-light)] mt-1">
                        {activity.time} • by {activity.user}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--color-white-10)]">
                <Button variant="ghost" className="w-full text-sm text-[var(--color-text-inverse)] hover:bg-[var(--color-white-10)]">
                  View all activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-[var(--color-white-10)] border border-[var(--color-white-20)] shadow">
          <CardHeader>
            <CardTitle className="text-[var(--color-text-inverse)]">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {systemStatus && Object.entries(systemStatus).map(([key, status]) => {
                if (key === 'lastChecked') return null;
                
                const getStatusColor = (status) => {
                  switch (status.status) {
                    case 'online':
                    case 'connected':
                      return 'bg-[var(--tw-green-500)]';
                    case 'error':
                      return 'bg-[var(--tw-red-500)]';
                    case 'unknown':
                      return 'bg-[var(--tw-yellow-500)]';
                    default:
                      return 'bg-[var(--color-text-muted)]';
                  }
                };

                const getStatusIcon = (status) => {
                  switch (status.status) {
                    case 'online':
                    case 'connected':
                      return <CheckCircleIcon className="h-4 w-4 text-[var(--tw-green-400)]" />;
                    case 'error':
                      return <ExclamationTriangleIcon className="h-4 w-4 text-[var(--tw-red-400)]" />;
                    default:
                      return <ClockIcon className="h-4 w-4 text-[var(--tw-yellow-400)]" />;
                  }
                };

                return (
                  <div key={key} className="flex items-center space-x-3">
                    <div className={`h-3 w-3 ${getStatusColor(status)} rounded-full animate-pulse`}></div>
                <div>
                      <p className="text-sm font-medium text-[var(--color-text-inverse)] capitalize">
                        {key}
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                        {status.message}
                  </p>
                </div>
              </div>
                );
              })}
                </div>
            {systemStatus?.lastChecked && (
              <div className="mt-4 pt-4 border-t border-[var(--color-white-10)]">
                <p className="text-xs text-[var(--color-text-light)]">
                  Last checked: {new Date(systemStatus.lastChecked).toLocaleString()}
                  </p>
                </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ModernDashboard;
