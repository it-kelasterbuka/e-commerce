import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  // Tampilkan loading jika autentikasi sedang berlangsung
  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika pengguna tidak login, arahkan ke login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Jika pengguna bukan admin dan mencoba mengakses rute admin
  if (currentUser.role !== "admin") {
    return <Navigate to="/" />;
  }

  // Jika pengguna adalah admin, lanjutkan ke halaman yang diminta
  return <Outlet />;
};

export default ProtectedRoute;

// import React from "react";
// import useAuth from "../hooks/useAuth";
// import { Navigate } from "react-router-dom";
// import { Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
//   const { currentUser } = useAuth();
//   return currentUser ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
