import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  size = "default",
  showCloseButton = true,
  className = "",
  overlayClassName = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "max-w-md",
    default: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-7xl",
  };

  const MotionDiv = motion.div;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <MotionDiv
            className={`fixed inset-0 bg-black transition-opacity ${overlayClassName}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <MotionDiv
              className={`relative w-full ${sizeClasses[size]} bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl ${className}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              {...props}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  {title && (
                    <h2 className="text-xl font-semibold text-white">
                      {title}
                    </h2>
                  )}
                  {showCloseButton && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="h-8 w-8 text-white hover:bg-white/10"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6">{children}</div>
            </MotionDiv>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ModalHeader = ({ children, className = "" }) => (
  <div className={`border-b border-white/10 pb-4 mb-4 ${className}`}>
    {children}
  </div>
);

const ModalFooter = ({ children, className = "" }) => (
  <div
    className={`border-t border-white/10 pt-4 mt-4 flex justify-end space-x-2 ${className}`}
  >
    {children}
  </div>
);

export default Modal;
export { ModalHeader, ModalFooter };
