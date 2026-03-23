import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/logic/useAuth";

const AdminProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
