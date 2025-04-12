import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/userContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, userRole } = useAuth();
  
  // Debugging logs
  console.log('Checking protected route...');
  console.log('Is logged in:', isLoggedIn);
  console.log('User role:', userRole);

  // Redirect if not logged in
  if (!isLoggedIn) {
    console.log('Redirecting to login: not logged in.');
    return <Navigate to="/" replace />;
  }

  // Check if user role is allowed
  if (allowedRoles.includes(userRole)) {
    console.log("Super admin loginn");
    
    return <Outlet/>;
  }

  console.log('Redirecting to login: role not allowed.');
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
