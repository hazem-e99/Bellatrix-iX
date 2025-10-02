import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Toast = ({
  type = "info",
  title,
  message,
  isVisible = false,
  onClose,
  autoClose = true,
  duration = 5000,
  position = "top-right",
}) => {
  const [isShowing, setIsShowing] = React.useState(isVisible);

  React.useEffect(() => {
    setIsShowing(isVisible);

    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        setIsShowing(false);
        setTimeout(() => onClose && onClose(), 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, duration, onClose]);

  const typeConfig = {
    success: {
      icon: CheckCircleIcon,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      titleColor: "text-green-800",
      messageColor: "text-green-700",
    },
    error: {
      icon: XCircleIcon,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-600",
      titleColor: "text-red-800",
      messageColor: "text-red-700",
    },
    warning: {
      icon: ExclamationTriangleIcon,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-600",
      titleColor: "text-yellow-800",
      messageColor: "text-yellow-700",
    },
    info: {
      icon: InformationCircleIcon,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      titleColor: "text-blue-800",
      messageColor: "text-blue-700",
    },
  };

  const config = typeConfig[type] || typeConfig.info;
  const IconComponent = config.icon;

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  const MotionDiv = motion.div;

  return (
    <AnimatePresence>
      {isShowing && (
        <MotionDiv
          className={`fixed z-50 ${positionClasses[position] || positionClasses["top-right"]} max-w-sm w-full`}
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div
            className={`${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-4`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <IconComponent className={`h-5 w-5 ${config.iconColor}`} />
              </div>
              <div className="ml-3 w-0 flex-1">
                {title && (
                  <p className={`text-sm font-medium ${config.titleColor}`}>
                    {title}
                  </p>
                )}
                {message && (
                  <p
                    className={`text-sm ${config.messageColor} ${
                      title ? "mt-1" : ""
                    }`}
                  >
                    {message}
                  </p>
                )}
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className={`inline-flex ${config.iconColor} hover:${config.titleColor} focus:outline-none`}
                  onClick={() => {
                    setIsShowing(false);
                    setTimeout(() => onClose && onClose(), 300);
                  }}
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

// Toast Container for managing multiple toasts
const ToastContainer = ({ toasts = [], removeToast }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          {...toast}
          isVisible={true}
          onClose={() => removeToast(toast.id)}
          position={`top-right`}
          style={{ top: `${1 + index * 5}rem` }}
        />
      ))}
    </div>
  );
};

export default Toast;
export { ToastContainer };
