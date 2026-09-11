import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);

  // If there is no token, redirect to login page immediately
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render child components seamlessly
  return <Outlet />;
};