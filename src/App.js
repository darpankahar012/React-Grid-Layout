import React, { Component, lazy, Suspense } from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SuspenseFallbackLoader } from "./components/Loader";
import ExampleLayout from "./components/grid-layout";
import Sidebar from "./components/Sidebar/Sidebar";
import Ticker from "./components/Ticker/Ticker";
import Header from "./components/Header/Header";
// import Main from './components/Main';

const Login = lazy(() => import("./components/Login/Login"));
const Main = lazy(() => import("./components/Main"));

function App() {
  toast.configure();
  let load = SuspenseFallbackLoader();
  return (
    <div>
      <Router>
        <Header />
        <Sidebar />
        <Suspense fallback={load}>
          <Switch>
            {/* <Route path="/" element={<ExampleLayout />} /> */}
            <Route
              exact
              path="/"
              render={(props) => <ExampleLayout {...props} />}
            />
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} />}
            />
            {/* <Route path="login" element={<Login />} /> */}
          </Switch>
        </Suspense>
        <Ticker />
      </Router>
    </div>
  );
}

export default App;
