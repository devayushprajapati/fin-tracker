import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute: wraps pages that require login
// If no session found in localStorage, redirect to /login
const ProtectedRoute = ({ children }) => {
  const session = localStorage.getItem("ft_session");
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
