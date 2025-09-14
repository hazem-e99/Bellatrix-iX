import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const colors = {
    light: {
      primary: 'bg-blue-600',
      primaryHover: 'hover:bg-blue-700',
      secondary: 'bg-gray-100',
      surface: 'bg-white',
      background: 'bg-gray-50',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      shadow: 'shadow-sm',
      accent: 'bg-gradient-to-r from-blue-500 to-purple-600',
    },
    dark: {
      primary: 'bg-blue-500',
      primaryHover: 'hover:bg-blue-600',
      secondary: 'bg-gray-800',
      surface: 'bg-gray-900',
      background: 'bg-gray-950',
      text: 'text-gray-100',
      textSecondary: 'text-gray-400',
      border: 'border-gray-700',
      shadow: 'shadow-lg shadow-black/20',
      accent: 'bg-gradient-to-r from-blue-400 to-purple-500',
    }
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark ? colors.dark : colors.light,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};