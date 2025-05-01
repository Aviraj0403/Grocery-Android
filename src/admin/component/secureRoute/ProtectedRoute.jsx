// src/components/ProtectedRoute.jsx
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth }          from '../../../context/AuthContext'

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth()

  // while we’re checking token → show nothing (or a spinner)
  if (loading) return null

  // not logged in?
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // wrong role?
  if (allowedRoles && !allowedRoles.includes(user.roleType)) {
    return <Navigate to="/unauthorized" replace />
  }

  // OK!
  return <Outlet />
}

export default ProtectedRoute
