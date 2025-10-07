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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedColorTheme = localStorage.getItem("colorTheme");

    if (savedColorTheme) {
      setTheme(savedColorTheme);
    }

    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      // Check system preference
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    // Handle dark/light mode
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    // Handle color theme (default/purple)
    if (theme === "purple") {
      document.documentElement.setAttribute("data-theme", "purple");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("colorTheme", theme);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    if (typeof newTheme === "string") {
      // Named theme switching (default/purple)
      setTheme(newTheme);
    } else {
      // Legacy dark/light toggle
      setIsDark(!isDark);
    }
  };

  const toggleColorTheme = () => {
    setTheme(theme === "default" ? "purple" : "default");
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        theme,
        toggleTheme,
        toggleColorTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
