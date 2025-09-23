import React from "react";
import { useSelector } from "react-redux";
import AdminLogin from "../components/Admin/AdminLogin";

const ProtectedRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);

  // If no token, show login page
  if (!token) {
    return <AdminLogin />;
  }

  // If token exists but no user data, we might want to fetch profile
  // For now, just render the children if we have a token
  return children;
};

export default ProtectedRoute;
