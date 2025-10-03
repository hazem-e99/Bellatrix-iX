import React from "react";
import { motion } from "framer-motion";

// Utility function to combine class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

const getButtonClasses = (variant = "default", size = "default") => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    outline:
      "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:ring-gray-500",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
    ghost: "text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-500",
    link:
      "text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500",
    success:
      "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500",
    warning:
      "bg-yellow-600 text-white hover:bg-yellow-700 focus-visible:ring-yellow-500",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-8",
    icon: "h-10 w-10",
  };

  return cn(baseClasses, variants[variant], sizes[size]);
};

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? motion.div : motion.button;

    return (
      <Component
        className={cn(getButtonClasses(variant, size), className)}
        ref={ref}
        disabled={loading || props.disabled}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {loading && (
          <motion.div
            className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
        {icon && !loading && <span className="mr-2">{icon}</span>}
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;
