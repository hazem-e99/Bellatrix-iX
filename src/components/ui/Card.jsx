import React from "react";
import { motion } from "framer-motion";

const Card = ({
  children,
  className = "",
  hover = true,
  padding = "default",
  shadow = "default",
  ...props
}) => {
  const baseClasses =
    "bg-white/10 rounded-xl border border-white/20 transition-all duration-200";

  const paddingClasses = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    default: "shadow-md",
    lg: "shadow-lg",
  };

  const hoverClasses = hover ? "hover:shadow-lg hover:-translate-y-1" : "";

  const cardClasses = [
    baseClasses,
    paddingClasses[padding],
    shadowClasses[shadow],
    hoverClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const MotionComponent = motion.div;

  return (
    <MotionComponent
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -4 } : {}}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

const CardHeader = ({ children, className = "" }) => (
  <div className={`border-b border-white/10 pb-4 mb-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-white ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-300 mt-1 ${className}`}>{children}</p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const CardFooter = ({ children, className = "" }) => (
  <div className={`border-t border-white/10 pt-4 mt-4 ${className}`}>
    {children}
  </div>
);

export default Card;
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
