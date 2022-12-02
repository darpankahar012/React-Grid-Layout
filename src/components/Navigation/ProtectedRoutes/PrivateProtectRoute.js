import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PrivateProtectRoute = ({ component: Component, ...rest }) => {
  //check if user is loggin
  const user = useSelector((state) => state?.login);
  const { data } = user;
  return (
    <Route
      {...rest}
      render={() =>
        data.token ? <Component {...rest} /> : <Navigate to="/login" />
      }
    />
  );
};

export default PrivateProtectRoute;
