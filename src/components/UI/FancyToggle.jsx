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
      ? "bg-gradient-to-r from-gray-400 to-gray-600 shadow-lg shadow-gray-500/40"
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
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
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
                  : "bg-gray-400 shadow-gray-400/50"
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
                  : "text-gray-400"
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

// Modern visibility toggle with smooth animations and glow effects
export const VisibilityToggle = ({
  isVisible,
  onChange,
  disabled = false,
  size = "normal",
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      {/* Toggle Switch */}
      <div className="flex items-center space-x-3">
        <span
          className={`text-lg transition-all duration-300 ${
            !isVisible ? "opacity-100 scale-110" : "opacity-50 scale-95"
          }`}
        >
          ❌
        </span>
        <div className="relative">
          <FancyToggle
            checked={isVisible}
            onChange={onChange}
            disabled={disabled}
            size={size}
            gradient={isVisible ? "green" : "red"}
            className="min-w-0"
          />
          {/* Glow effect when visible */}
          {isVisible && (
            <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-30 animate-pulse pointer-events-none"></div>
          )}
        </div>
        <span
          className={`text-lg transition-all duration-300 ${
            isVisible ? "opacity-100 scale-110" : "opacity-50 scale-95"
          }`}
        >
          👁️
        </span>
      </div>

      {/* Status Label */}
      <div
        className={`text-xs font-medium transition-all duration-300 ${
          isVisible
            ? "text-green-400 drop-shadow-sm"
            : "text-red-400 drop-shadow-sm"
        }`}
      >
        {isVisible ? "👁️ Visible" : "❌ Hidden"}
      </div>
    </div>
  );
};

// Modern theme toggle with sun/moon icons and dynamic glow effects
export const ThemeToggle = ({
  theme,
  onChange,
  disabled = false,
  size = "normal",
  className = "",
}) => {
  const isLight = theme === 1;

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      {/* Toggle Switch */}
      <div className="flex items-center space-x-3">
        <span
          className={`text-lg transition-all duration-500 transform ${
            !isLight
              ? "opacity-100 scale-110 text-blue-300 drop-shadow-lg"
              : "opacity-50 scale-95 text-gray-400"
          }`}
        >
          🌙
        </span>
        <div className="relative">
          <FancyToggle
            checked={isLight}
            onChange={() => onChange(isLight ? 2 : 1)}
            disabled={disabled}
            size={size}
            gradient={isLight ? "blue" : "purple"}
            className="min-w-0"
          />
          {/* Dynamic glow effect */}
          {isLight ? (
            <div className="absolute inset-0 bg-yellow-300 rounded-full blur-lg opacity-20 animate-pulse pointer-events-none"></div>
          ) : (
            <div className="absolute inset-0 bg-gray-500 rounded-full blur-md opacity-25 animate-pulse pointer-events-none"></div>
          )}
        </div>
        <span
          className={`text-lg transition-all duration-500 transform ${
            isLight
              ? "opacity-100 scale-110 text-yellow-300 drop-shadow-lg"
              : "opacity-50 scale-95 text-gray-400"
          }`}
        >
          🌞
        </span>
      </div>

      {/* Theme Label */}
      <div
        className={`text-xs font-medium transition-all duration-300 ${
          isLight
            ? "text-yellow-400 drop-shadow-sm"
            : "text-gray-400 drop-shadow-sm"
        }`}
      >
        {isLight ? "🌞 Light" : "🌙 Dark"}
      </div>
    </div>
  );
};

// Combined component for both toggles with enhanced layout
export const ComponentToggles = ({
  isVisible,
  theme,
  onVisibilityChange,
  onThemeChange,
  disabled = false,
  size = "normal",
  layout = "horizontal", // "horizontal" or "vertical"
  className = "",
}) => {
  const containerClass =
    layout === "horizontal"
      ? "flex items-start justify-center space-x-8"
      : "flex flex-col space-y-6";

  return (
    <div className={`${containerClass} ${className}`}>
      {/* Visibility Section */}
      <div className="flex flex-col items-center space-y-2">
        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
          Visibility
        </label>
        <VisibilityToggle
          isVisible={isVisible}
          onChange={onVisibilityChange}
          disabled={disabled}
          size={size}
        />
      </div>

      {/* Theme Section */}
      <div className="flex flex-col items-center space-y-2">
        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
          Navbar Color Mode
        </label>
        <ThemeToggle
          theme={theme}
          onChange={onThemeChange}
          disabled={disabled}
          size={size}
        />
      </div>
    </div>
  );
};

export default FancyToggle;
