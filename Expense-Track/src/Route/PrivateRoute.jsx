import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token); 
      console.log(decoded); 
      return <Outlet context={{ userId: decoded.userId }} />;
    } catch (error) {
      console.error("Invalid token:", error);
      return <Navigate to="/signin" />;
    }
  }

  return <Navigate to="/signin" />;
};

export default PrivateRoute;
