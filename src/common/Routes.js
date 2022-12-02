import React, { lazy, Suspense } from "react";
import {
  Routes,
  Route,
  //  Redirect
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import ExampleLayout from "../components/grid-layout";
import Login from "../components/Login/Login";
import { SuspenseFallbackLoader } from "../components/Loader";

// const DashBoardComponent = lazy(() => import("../components/DashBoard"));
// const ExamplePages = lazy(() => import("../components/ExamplePages"));
// const ForgotPassword = lazy(() => import("../components/forgotPassword"));

function RoutesURL(props) {
  let load = SuspenseFallbackLoader();
  return (
    <Suspense fallback={load}>
      <Routes>
        <ProtectedRoute>
          <Route
            exact
            path="/"
            render={(props) => <ExampleLayout {...props} />}
          />
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          {/* <Route exact path="*" render={(props) => <PageNotFound {...props} />} /> */}
        </ProtectedRoute>
      </Routes>
    </Suspense>
  );
}

export default RoutesURL;
