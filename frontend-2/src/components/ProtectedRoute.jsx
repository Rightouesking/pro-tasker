import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../context/AuthContext'

const ProtectedRoute = () => {
  const { currentUser, loading } = useUser()

  if (loading) return <p>Loading...</p>
  if (!currentUser) return <Navigate to="/login" />

  return <Outlet />
}

export default ProtectedRoute
