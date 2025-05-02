// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  console.log("user", user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;
