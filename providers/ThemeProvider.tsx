"use client";

import * as React from "react";

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined,
);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    const root = window.document.documentElement;
    const isDark = root.classList.toggle("dark");

    setDarkMode(isDark);

    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  // dark mode check
  React.useEffect(() => {
    const root = window.document.documentElement;
    const initialDarkMode = localStorage.getItem("theme") === "dark";

    if (initialDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    setDarkMode(initialDarkMode);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export function useDarkMode() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useDarkMode must be used within a ThemeProvider");
  }
  return { darkMode: context.darkMode, toggleDarkMode: context.toggleDarkMode };
}
