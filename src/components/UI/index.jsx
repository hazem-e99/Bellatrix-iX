import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick,
  padding = 'p-6',
  ...props 
}) => {
  const { colors } = useTheme();
  
  const baseClasses = `
    ${colors.surface} ${colors.border} ${colors.shadow}
    border rounded-2xl transition-all duration-300
    ${hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
    ${padding} ${className}
  `;

  return (
    <div 
      className={baseClasses.trim()} 
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  loading = false,
  icon,
  iconPosition = 'left',
  ...props 
}) => {
  const { colors } = useTheme();
  
  const variants = {
    primary: `${colors.primary} ${colors.primaryHover} text-white`,
    secondary: `${colors.secondary} ${colors.text} hover:bg-gray-200 dark:hover:bg-gray-700`,
    outline: `border-2 ${colors.border} ${colors.text} hover:bg-gray-50 dark:hover:bg-gray-800`,
    ghost: `${colors.text} hover:bg-gray-100 dark:hover:bg-gray-800`,
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    rounded-lg font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]} ${sizes[size]} ${className}
  `;

  const renderContent = () => (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && iconPosition === 'left' && !loading && icon}
      {children}
      {icon && iconPosition === 'right' && !loading && icon}
    </>
  );

  return (
    <button 
      className={baseClasses.trim()} 
      disabled={loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'sm',
  className = '',
  ...props 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1 text-sm',
  };

  const baseClasses = `
    inline-flex items-center font-medium rounded-full
    ${variants[variant]} ${sizes[size]} ${className}
  `;

  return (
    <span className={baseClasses.trim()} {...props}>
      {children}
    </span>
  );
};