import React from 'react';
import { useCTAModal } from '../../contexts/CTAModalContext';

/**
 * Higher-Order Component that automatically converts any button component
 * to use the global CTA modal system
 */
const withCTAModal = (WrappedComponent, defaultModalConfig = {}) => {
  const WithCTAModalComponent = ({ 
    onClick, 
    modalConfig = {}, 
    isCTA = true,
    ...props 
  }) => {
    const { openCTAModal } = useCTAModal();

    const handleClick = (e) => {
      // If there's a custom onClick, call it first
      if (onClick) {
        onClick(e);
      }
      
      // If it's not prevented and this should be a CTA, open the modal
      if (!e.defaultPrevented && isCTA) {
        e.preventDefault();
        openCTAModal({
          ...defaultModalConfig,
          ...modalConfig
        });
      }
    };

    return (
      <WrappedComponent
        {...props}
        onClick={handleClick}
      />
    );
  };

  WithCTAModalComponent.displayName = `withCTAModal(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return WithCTAModalComponent;
};

export default withCTAModal;
