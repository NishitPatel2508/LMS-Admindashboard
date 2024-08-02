import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { store } from "./app/store/store";
const PrivateRoute = ({ children }) => {
  // const accessToken = useSelector((state) => state.accessToken);

  const accessToken = store.getState()?.accessToken;
  console.log("atP", accessToken);
  // const accessT = localStorage.getItem("accessToken");
  // console.log(accessT);
  // debugger;

  return accessToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
