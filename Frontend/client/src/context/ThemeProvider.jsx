import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme
      ? savedTheme === "dark": null;
  });


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      console.log("Dark mode enabled, class 'dark' added");
    } else {
      document.documentElement.classList.remove("dark");
      console.log("Dark mode disabled, class 'dark' removed");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);



  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      console.log("Toggling Dark Mode:", newMode);
      return newMode;
    });
  };


  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
