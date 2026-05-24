import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("ft_theme");
    return saved ? saved === "dark" : true; // default dark
  });

  useEffect(() => {
    localStorage.setItem("ft_theme", isDark ? "dark" : "light");
    document.body.style.background = isDark
      ? "linear-gradient(160deg,#0a061e 0%,#0f0a2e 60%,#130d38 100%)"
      : "linear-gradient(160deg,#f0f4ff 0%,#e8eeff 60%,#f5f0ff 100%)";
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
