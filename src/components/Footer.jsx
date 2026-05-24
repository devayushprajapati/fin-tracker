import React from "react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { isDark } = useTheme();
  return (
    <footer style={{ marginTop:"40px", paddingTop:"20px", paddingBottom:"20px", borderTop:`1px solid ${isDark?"#1a1550":"#e2e8f0"}`, textAlign:"center" }}>
      <p style={{ fontSize:"13px", color: isDark?"#3d3366":"#94a3b8" }}>
        Built using <span style={{ color:"#6366f1", fontWeight:600 }}>React.js</span> &amp; <span style={{ color:"#6366f1", fontWeight:600 }}>Tailwind CSS</span>
      </p>
    </footer>
  );
};
export default Footer;
