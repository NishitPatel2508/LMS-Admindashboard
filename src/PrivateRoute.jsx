import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const accessToken = useSelector((state) => state.accessToken);
  debugger
  console.log(accessToken);

  return accessToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
