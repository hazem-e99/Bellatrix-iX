import React from 'react';
import { useCTAModal } from '../contexts/CTAModalContext';
import { getVariantClasses, validateVariant } from '../utils/variantSystem';

const CTAButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  modalConfig = {},
  href,
  onClick,
  disabled = false,
  icon,
  ...props 
}) => {
  const { openCTAModal } = useCTAModal();

  // Validate and get variant classes
  const validatedVariant = validateVariant(variant);
  const variantClasses = getVariantClasses(validatedVariant);

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  // Base classes
  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold rounded-lg
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    hover:scale-105 hover:shadow-lg
    ${sizeClasses[size]}
    ${variantClasses}
    ${className}
  `.trim();

  const handleClick = (e) => {
    if (disabled) return;
    
    // If there's a custom onClick, call it first
    if (onClick) {
      onClick(e);
    }
    
    // If it's not prevented by the custom onClick and no href, open the modal
    if (!e.defaultPrevented && !href) {
      e.preventDefault();
      openCTAModal(modalConfig);
    }
  };

  // If href is provided, render as link
  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        onClick={handleClick}
        disabled={disabled}
        {...props}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </a>
    );
  }

  // Render as button
  return (
    <button
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default CTAButton;
