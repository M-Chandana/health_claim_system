import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🚫 If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 If role doesn’t match allowed roles → redirect to home
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Otherwise, allow access
  return children;
};

export default ProtectedRoute;
