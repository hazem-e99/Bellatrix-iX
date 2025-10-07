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
  const [isDark, setIsDark] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("bellatrix-theme");
    const savedDarkMode = localStorage.getItem("bellatrix-dark-mode");

    if (savedTheme && (savedTheme === "default" || savedTheme === "purple")) {
      setTheme(savedTheme);
    }

    if (savedDarkMode) {
      setIsDark(savedDarkMode === "true");
    } else {
      // Check system preference for dark mode
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
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

  // Update document dark class and localStorage when dark mode changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("bellatrix-dark-mode", isDark.toString());
  }, [isDark]);

  const toggleTheme = (newTheme) => {
    if (
      typeof newTheme === "string" &&
      (newTheme === "default" || newTheme === "purple")
    ) {
      setTheme(newTheme);
    } else {
      // Legacy toggle for dark/light mode
      setIsDark(!isDark);
    }
  };

  const toggleColorTheme = () => {
    setTheme(theme === "default" ? "purple" : "default");
  };

  const value = {
    theme,
    isDark,
    toggleTheme,
    toggleColorTheme,
    setTheme,
    isDarkTheme: theme === "purple", // Helper for theme-specific logic
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
