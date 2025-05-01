// src/pages/Unauthorized.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="mb-6">You don’t have permission to view this page.</p>
      <Link to="/" className="text-green-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  )
}
