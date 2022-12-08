import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// import ProtectedRoute from "./ProtectedRoute";
import ExampleLayout from "../components/Grid/grid-layout";
import Login from "../components/Login/Login";
import { SuspenseFallbackLoader } from "../components/Loader";
import ProtectedRoute from "./ProtectedRoute";

function RoutesURL(props) {
  let load = SuspenseFallbackLoader();
  return (
    <Suspense fallback={load}>
      <Switch>
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <ProtectedRoute>
          <Route
            exact
            path="/"
            render={(props) => <ExampleLayout {...props} />}
          />
          {/* <Route exact path="*" render={(props) => <PageNotFound {...props} />} /> */}
          <Redirect from="*" to="/" />
        </ProtectedRoute>
      </Switch>
    </Suspense>
  );
}

export default RoutesURL;
