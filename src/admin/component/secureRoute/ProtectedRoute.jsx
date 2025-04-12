import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  // If there is no logged in user, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If allowedRoles are provided, check if the current user's role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  // If everything is okay, render the nested routes/components
  return <Outlet />;
};

export default ProtectedRoute;
