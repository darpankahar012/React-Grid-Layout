import { Route, Redirect, useLocation } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem("access_token") ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        );
      }}
    />
  );
};
