import React from "react";
import { motion } from "framer-motion";

const FancyToggle = ({
  label,
  checked,
  onChange,
  disabled = false,
  size = "normal", // "small", "normal", "large"
  gradient = "purple", // "purple", "blue", "green", "red"
  className = "",
  description = null,
}) => {
  const sizeClasses = {
    small: { track: "h-4 w-7", thumb: "h-3 w-3", thumbPos: { off: 2, on: 16 } },
    normal: {
      track: "h-6 w-11",
      thumb: "h-5 w-5",
      thumbPos: { off: 2, on: 22 },
    },
    large: {
      track: "h-8 w-15",
      thumb: "h-7 w-7",
      thumbPos: { off: 2, on: 30 },
    },
  };

  const gradients = {
    purple: checked
      ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/40"
      : "bg-gray-600 hover:bg-gray-500",
    blue: checked
      ? "bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg shadow-blue-500/40"
      : "bg-gray-600 hover:bg-gray-500",
    green: checked
      ? "bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-500/40"
      : "bg-gray-600 hover:bg-gray-500",
    red: checked
      ? "bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/40"
      : "bg-gray-600 hover:bg-gray-500",
  };

  const currentSize = sizeClasses[size];
  const currentGradient = gradients[gradient];

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-3 cursor-pointer select-none group flex-1">
          {label && (
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
              {label}
            </span>
          )}
          <div
            className={`
              relative inline-flex ${
                currentSize.track
              } items-center rounded-full 
              transition-all duration-300 shadow-lg cursor-pointer
              ${currentGradient}
              ${
                disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-xl hover:scale-110"
              }
              ${checked ? "scale-105 shadow-2xl" : "scale-100"}
              ${checked && gradient === "blue" ? "shadow-blue-500/50" : ""}
              ${checked && gradient === "green" ? "shadow-green-500/50" : ""}
              ${checked && gradient === "purple" ? "shadow-purple-500/50" : ""}
            `}
            onClick={() => !disabled && onChange(!checked)}
          >
            <motion.span
              layout
              className={`
                inline-block ${
                  currentSize.thumb
                } rounded-full bg-white shadow-md
                ${disabled ? "" : "hover:scale-110"}
              `}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                duration: 0.3,
              }}
              animate={{
                x: checked ? currentSize.thumbPos.on : currentSize.thumbPos.off,
                scale: disabled ? 1 : 1,
              }}
              whileHover={{ scale: disabled ? 1 : 1.1 }}
              whileTap={{ scale: disabled ? 1 : 0.95 }}
            />

            {/* Ripple effect on toggle */}
            {checked && (
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.4, opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.8, ease: "easeOut", repeat: Infinity, repeatDelay: 2 }}
                style={{
                  background:
                    gradient === "purple"
                      ? "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)"
                      : gradient === "blue"
                      ? "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)"
                      : gradient === "green"
                      ? "radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)",
                }}
              />
            )}
          </div>
        </label>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          <motion.div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              checked
                ? gradient === "green"
                  ? "bg-green-400 shadow-green-400/50"
                  : gradient === "blue"
                  ? "bg-blue-400 shadow-blue-400/50"
                  : "bg-purple-400 shadow-purple-400/50"
                : "bg-gray-400"
            }`}
            animate={{
              scale: checked ? [1, 1.3, 1] : 1,
              boxShadow: checked ? "0 0 10px currentColor" : "none",
            }}
            transition={{ duration: 0.3 }}
          />
          <span
            className={`text-xs font-medium transition-colors duration-200 ${
              checked
                ? gradient === "green"
                  ? "text-green-400"
                  : gradient === "blue"
                  ? "text-blue-400"
                  : "text-purple-400"
                : "text-gray-400"
            }`}
          >
            {checked ? "ON" : "OFF"}
          </span>
        </div>
      </div>

      {description && (
        <motion.p
          className="text-xs text-gray-400 ml-0 opacity-70"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default FancyToggle;
