import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Checkout from "../pages/Checkout";

const ProtectedCheckout = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika pengguna tidak login, arahkan ke login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Jika pengguna sudah login, lanjutkan ke halaman checkout
  return <Checkout />;
};

export default ProtectedCheckout;
