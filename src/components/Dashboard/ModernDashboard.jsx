import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Card, Button, Badge } from '../UI';
import {
  DocumentTextIcon,
  TemplateIcon,
  UsersIcon,
  ChartBarIcon,
  ClockIcon,
  PencilIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';

const ModernDashboard = () => {
  const { colors } = useTheme();
  const [stats, setStats] = useState({
    totalPages: 0,
    totalTemplates: 0,
    totalUsers: 0,
    pageViews: 0,
    loading: true,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [quickActions, setQuickActions] = useState([]);

  useEffect(() => {
    // Simulate loading data
    const loadDashboardData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalPages: 24,
        totalTemplates: 8,
        totalUsers: 156,
        pageViews: 12584,
        loading: false,
      });

      setRecentActivity([
        {
          id: 1,
          action: 'Page Updated',
          target: 'Home Page',
          user: 'Admin User',
          time: '2 minutes ago',
          type: 'update',
        },
        {
          id: 2,
          action: 'Template Created',
          target: 'Service Template',
          user: 'Designer',
          time: '1 hour ago',
          type: 'create',
        },
        {
          id: 3,
          action: 'Settings Modified',
          target: 'System Configuration',
          user: 'Admin User',
          time: '3 hours ago',
          type: 'config',
        },
        {
          id: 4,
          action: 'Page Published',
          target: 'About Us',
          user: 'Content Manager',
          time: '5 hours ago',
          type: 'publish',
        },
      ]);

      setQuickActions([
        { title: 'Create New Page', icon: DocumentTextIcon, href: '/admin/pages/new' },
        { title: 'Design Template', icon: TemplateIcon, href: '/admin/templates/new' },
        { title: 'View Analytics', icon: ChartBarIcon, href: '/admin/analytics' },
        { title: 'Manage Users', icon: UsersIcon, href: '/admin/users' },
      ]);
    };

    loadDashboardData();
  }, []);

  const MetricCard = ({ title, value, change, icon: Icon, color, trend }) => (
    <Card hover className="relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`${colors.textSecondary} text-sm font-medium`}>{title}</p>
          <div className="flex items-baseline mt-2">
            {stats.loading ? (
              <div className="animate-pulse h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            ) : (
              <p className={`${colors.text} text-3xl font-bold`}>{value.toLocaleString()}</p>
            )}
            {change && (
              <div className={`ml-2 flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend === 'up' ? (
                  <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
                )}
                <span>{change}%</span>
              </div>
            )}
          </div>
          <p className={`${colors.textSecondary} text-xs mt-1`}>
            {trend === 'up' ? '↗' : '↘'} from last month
          </p>
        </div>
        <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center shadow-lg`}>
          {Icon && <Icon className="w-8 h-8 text-white" />}
        </div>
      </div>
      
      {/* Animated background gradient */}
      <div className={`absolute inset-0 ${color} opacity-5 transform rotate-12 scale-150`}></div>
    </Card>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityColor = (type) => {
      switch (type) {
        case 'update': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        case 'create': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'config': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
        case 'publish': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      }
    };

    return (
      <div className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
        <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type).includes('blue') ? 'bg-blue-500' : 
          getActivityColor(activity.type).includes('green') ? 'bg-green-500' :
          getActivityColor(activity.type).includes('purple') ? 'bg-purple-500' : 'bg-yellow-500'}`}></div>
        <div className="flex-1 min-w-0">
          <p className={`${colors.text} text-sm font-medium`}>{activity.action}</p>
          <p className={`${colors.textSecondary} text-sm truncate`}>
            {activity.target} • by {activity.user}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={activity.type === 'update' ? 'info' : activity.type === 'create' ? 'success' : 'default'} size="xs">
            {activity.action.split(' ')[1] || activity.type}
          </Badge>
          <span className={`${colors.textSecondary} text-xs`}>{activity.time}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className={`${colors.accent} rounded-3xl p-8 text-white relative overflow-hidden`}>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
          <p className="text-blue-100 text-lg">
            Here's what's happening with your content management system today.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <EyeIcon className="w-5 h-5 mr-2" />
              View Site
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <ChartBarIcon className="w-5 h-5 mr-2" />
              Analytics
            </Button>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 right-20 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Pages"
          value={stats.totalPages}
          change={12}
          trend="up"
          icon={DocumentTextIcon}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <MetricCard
          title="Templates"
          value={stats.totalTemplates}
          change={8}
          trend="up"
          icon={TemplateIcon}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <MetricCard
          title="Active Users"
          value={stats.totalUsers}
          change={-3}
          trend="down"
          icon={UsersIcon}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <MetricCard
          title="Page Views"
          value={stats.pageViews}
          change={24}
          trend="up"
          icon={ChartBarIcon}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card>
            <div className="mb-6">
              <h3 className={`${colors.text} text-lg font-semibold`}>Quick Actions</h3>
              <p className={`${colors.textSecondary} text-sm`}>Common tasks and shortcuts</p>
            </div>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`
                    w-full flex items-center space-x-4 p-4 rounded-xl border
                    ${colors.border} hover:bg-gray-50 dark:hover:bg-gray-800
                    transition-all duration-200 hover:shadow-md hover:-translate-y-0.5
                    group
                  `}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`${colors.text} font-medium`}>{action.title}</p>
                    <p className={`${colors.textSecondary} text-sm`}>Create and manage content</p>
                  </div>
                  <div className={`${colors.textSecondary} group-hover:text-blue-500 transition-colors`}>
                    →
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className={`${colors.text} text-lg font-semibold`}>Recent Activity</h3>
                <p className={`${colors.textSecondary} text-sm`}>Latest changes and updates</p>
              </div>
              <Button variant="ghost" size="sm">
                <ClockIcon className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
            
            <div className="space-y-1">
              {recentActivity.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
            
            {recentActivity.length === 0 && (
              <div className="text-center py-12">
                <ClockIcon className={`w-12 h-12 ${colors.textSecondary} mx-auto mb-4`} />
                <p className={`${colors.textSecondary} text-sm`}>No recent activity</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* System Status */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`${colors.text} text-lg font-semibold mb-2`}>System Status</h3>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`${colors.textSecondary} text-sm`}>All Systems Operational</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className={`${colors.textSecondary} text-sm`}>Last Backup: 2 hours ago</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className={`${colors.textSecondary} text-sm`}>Updates Available</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <PencilIcon className="w-4 h-4 mr-2" />
            Manage
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ModernDashboard;