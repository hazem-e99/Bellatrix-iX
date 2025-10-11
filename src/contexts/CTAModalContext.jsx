import React, { createContext, useContext, useState } from 'react';
import ContactModal from '../components/ContactModal';

const CTAModalContext = createContext();

export const useCTAModal = () => {
  const context = useContext(CTAModalContext);
  if (!context) {
    throw new Error('useCTAModal must be used within a CTAModalProvider');
  }
  return context;
};

export const CTAModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "Contact Us",
    subtitle: "Let's discuss your project requirements",
    icon: "📧"
  });

  const openCTAModal = (config = {}) => {
    setModalConfig({
      title: config.title || "Contact Us",
      subtitle: config.subtitle || "Let's discuss your project requirements",
      icon: config.icon || "📧"
    });
    setIsModalOpen(true);
  };

  const closeCTAModal = () => {
    setIsModalOpen(false);
  };

  const value = {
    isModalOpen,
    modalConfig,
    openCTAModal,
    closeCTAModal
  };

  return (
    <CTAModalContext.Provider value={value}>
      {children}
      <ContactModal
        isOpen={isModalOpen}
        onClose={closeCTAModal}
        title={modalConfig.title}
        subtitle={modalConfig.subtitle}
        icon={modalConfig.icon}
      />
    </CTAModalContext.Provider>
  );
};
