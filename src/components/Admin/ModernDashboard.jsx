import React from "react";
import { motion } from "framer-motion";
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
} from "@heroicons/react/24/outline";
import Card, { CardContent, CardHeader, CardTitle } from "../ui/Card";
import Button from "../ui/Button";

const ModernDashboard = () => {
  // Mock data - replace with real data from your JSON server
  const stats = [
    {
      id: 1,
      name: "Total Pages",
      value: "24",
      change: "+12%",
      changeType: "increase",
      icon: DocumentTextIcon,
      color: "blue",
    },
    
    {
      id: 3,
      name: "Page Views",
      value: "1,234",
      change: "+8.2%",
      changeType: "increase",
      icon: EyeIcon,
      color: "green",
    },
    {
      id: 4,
      name: "Avg. Load Time",
      value: "1.2s",
      change: "-0.3s",
      changeType: "decrease",
      icon: ClockIcon,
      color: "orange",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Page created",
      item: "About Us",
      user: "Admin",
      time: "2 minutes ago",
      type: "create",
    },
    
    {
      id: 3,
      action: "Page published",
      item: "Services",
      user: "Admin",
      time: "3 hours ago",
      type: "publish",
    },
    {
      id: 4,
      action: "Settings changed",
      item: "Site Configuration",
      user: "Admin",
      time: "1 day ago",
      type: "settings",
    },
  ];

  const quickActions = [
    {
      id: 1,
      name: "Create New Page",
      description: "Add a new page to your site",
      icon: PlusIcon,
      action: "/admin/pages/new",
      color: "blue",
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
        bg: "bg-blue-100",
        text: "text-blue-600",
        border: "border-blue-200",
        icon: "bg-blue-600",
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        border: "border-purple-300",
        icon: "bg-purple-600",
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-600",
        border: "border-green-200",
        icon: "bg-green-600",
      },
      orange: {
        bg: "bg-orange-100",
        text: "text-orange-600",
        border: "border-orange-200",
        icon: "bg-orange-600",
      },
    };
    return colors[color] || colors.blue;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "create":
        return <PlusIcon className="h-4 w-4 text-green-500" />;
      case "update":
        return <DocumentTextIcon className="h-4 w-4 text-blue-500" />;
      case "publish":
        return (
          <ArrowTopRightOnSquareIcon className="h-4 w-4 text-purple-500" />
        );
      case "settings":
        return <ClockIcon className="h-4 w-4 text-orange-500" />;
      default:
        return <DocumentTextIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 text-white">
      {/* Welcome Section */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back! 👋
          </h2>
          <p className="text-gray-300 text-lg">
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
              <Card className="bg-white/10 border border-white/20 shadow transition-transform duration-200 hover:-translate-y-0.5">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        {stat.name}
                      </p>
                      <p className="text-3xl font-bold text-white mt-2">
                        {stat.value}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendIcon
                          className={`h-4 w-4 mr-1 ${
                            stat.changeType === "increase"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            stat.changeType === "increase"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-400 ml-2">
                          vs last month
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg bg-white/10 border border-white/20`}>
                      <IconComponent
                        className={`h-6 w-6 text-white/90`}
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
          <Card className="bg-white/10 border border-white/20 shadow">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
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
                        className="h-auto p-4 flex-col items-start space-y-2 w-full bg-white/10 hover:bg-white/10 border-white/20 text-white"
                      >
                        <div className={`p-2 rounded-lg bg-white/10 border border-white/20`}>
                          <IconComponent
                            className={`h-5 w-5 text-white/90`}
                          />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-white">
                            {action.name}
                          </div>
                          <div className="text-sm text-gray-300">
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
          <Card className="bg-white/10 border border-white/20 shadow">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-300">
                        {activity.item}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time} • by {activity.user}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <Button variant="ghost" className="w-full text-sm text-white hover:bg-white/10">
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
        <Card className="bg-white/10 border border-white/20 shadow">
          <CardHeader>
            <CardTitle className="text-white">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Website
                  </p>
                  <p className="text-xs text-gray-300">
                    Online & Operational
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Database
                  </p>
                  <p className="text-xs text-gray-300">
                    Connected
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Backup
                  </p>
                  <p className="text-xs text-gray-300">
                    Last: 2 hours ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ModernDashboard;
