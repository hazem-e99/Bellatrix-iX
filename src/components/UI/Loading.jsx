import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const { colors } = useTheme();
  
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`animate-spin ${sizes[size]} ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 50 50">
        <circle
          className={`${colors.textSecondary} opacity-25`}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <circle
          className="text-blue-500"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
          strokeLinecap="round"
          style={{
            animation: 'dash 2s ease-in-out infinite',
          }}
        />
      </svg>
      <style jsx>{`
        @keyframes dash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }
      `}</style>
    </div>
  );
};

export const LoadingScreen = ({ message = 'Loading...' }) => {
  const { colors } = useTheme();
  
  return (
    <div className={`min-h-screen ${colors.background} flex flex-col items-center justify-center`}>
      <div className="text-center space-y-6">
        <div className={`w-20 h-20 ${colors.accent} rounded-3xl flex items-center justify-center shadow-2xl`}>
          <span className="text-white font-bold text-2xl">B</span>
        </div>
        <div className="space-y-3">
          <LoadingSpinner size="lg" />
          <p className={`${colors.text} text-lg font-medium`}>{message}</p>
          <p className={`${colors.textSecondary} text-sm`}>Please wait while we load your content</p>
        </div>
      </div>
    </div>
  );
};

export const LoadingOverlay = ({ isVisible, message = 'Loading...' }) => {
  const { colors } = useTheme();
  
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`${colors.surface} rounded-2xl p-8 shadow-2xl border ${colors.border} max-w-sm w-full mx-4`}>
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" className="mx-auto" />
          <div>
            <p className={`${colors.text} font-medium`}>{message}</p>
            <p className={`${colors.textSecondary} text-sm mt-1`}>Please wait...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  className = '' 
}) => {
  const { colors } = useTheme();
  
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className={`w-16 h-16 ${colors.secondary} rounded-full flex items-center justify-center mx-auto mb-6`}>
        {Icon && <Icon className={`w-8 h-8 ${colors.textSecondary}`} />}
      </div>
      <div className="space-y-2">
        <h3 className={`${colors.text} text-lg font-semibold`}>{title}</h3>
        <p className={`${colors.textSecondary} text-sm max-w-md mx-auto`}>{description}</p>
      </div>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};