import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("default");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("bellatrix-theme");
    if (savedTheme && (savedTheme === "default" || savedTheme === "purple")) {
      setTheme(savedTheme);
    }
  }, []);

  // Update document data-theme attribute and localStorage when theme changes
  useEffect(() => {
    if (theme === "purple") {
      document.documentElement.setAttribute("data-theme", "purple");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("bellatrix-theme", theme);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    if (newTheme === "default" || newTheme === "purple") {
      setTheme(newTheme);
    }
  };

  const value = {
    theme,
    toggleTheme,
    isDarkTheme: theme === "purple", // Helper for theme-specific logic
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
