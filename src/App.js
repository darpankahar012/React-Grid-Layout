import React, { Component, lazy, Suspense } from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import { BrowserRouter as Router } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SuspenseFallbackLoader } from "./components/Loader";
import ExampleLayout from "./components/Grid/grid-layout";
import Sidebar from "./components/Sidebar/Sidebar";
import Ticker from "./components/Ticker/Ticker";
import Header from "./components/Headers/Header";
// import Main from './components/Main';
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
// import "./styles.css";
import GridLayout from "./components/sandBoxGrid/GridLayout";
import Layout from "./common/Layout";
import RoutesURL from "./common/Routes";

const Login = lazy(() => import("./components/Login/Login"));
const Main = lazy(() => import("./components/Main"));

function App() {
  toast.configure();
  let load = SuspenseFallbackLoader();

  let layouts = {
    lg: [
      {
        w: 8,
        h: 2,
        x: 0,
        y: 0,
        i: "graph1",
      },
      {
        w: 4,
        h: 2,
        x: 8,
        y: 0,
        i: "graph2",
      },
      {
        w: 5,
        h: 2,
        x: 0,
        y: 0,
        i: "graph3",
      },
      {
        w: 3,
        h: 2,
        x: 5,
        y: 0,
        i: "graph4",
      },
      {
        w: 4,
        h: 2,
        x: 9,
        y: 2,
        i: "graph5",
      },
      {
        w: 3,
        h: 2,
        x: 3,
        y: 2,
        i: "graph6",
      },
      {
        w: 3,
        h: 2,
        x: 0,
        y: 2,
        i: "graph7",
      },
    ],
    md: [
      {
        w: 6,
        h: 2,
        x: 0,
        y: 0,
        i: "graph1",
      },
      {
        w: 4,
        h: 2,
        x: 6,
        y: 0,
        i: "graph2",
      },
      {
        w: 3,
        h: 2,
        x: 0,
        y: 0,
        i: "graph3",
      },
      {
        w: 3,
        h: 2,
        x: 3,
        y: 0,
        i: "graph4",
      },
      {
        w: 4,
        h: 2,
        x: 6,
        y: 2,
        i: "graph5",
      },
      {
        w: 3,
        h: 2,
        x: 3,
        y: 2,
        i: "graph6",
      },
      {
        w: 3,
        h: 2,
        x: 0,
        y: 2,
        i: "graph7",
      },
    ],
    sm: [
      {
        w: 6,
        h: 2,
        x: 0,
        y: 0,
        i: "graph1",
      },
      {
        w: 3,
        h: 2,
        x: 0,
        y: 0,
        i: "graph2",
      },
      {
        w: 3,
        h: 2,
        x: 3,
        y: 0,
        i: "graph3",
      },
      {
        w: 3,
        h: 2,
        x: 0,
        y: 0,
        i: "graph4",
      },
      {
        w: 3,
        h: 2,
        x: 3,
        y: 2,
        i: "graph5",
      },
      {
        w: 3,
        h: 2,
        x: 0,
        y: 2,
        i: "graph6",
      },
      {
        w: 3,
        h: 2,
        x: 3,
        y: 2,
        i: "graph7",
      },
    ],
    xs: [
      {
        w: 4,
        h: 2,
        x: 0,
        y: 0,
        i: "graph1",
      },
      {
        w: 4,
        h: 2,
        x: 0,
        y: 0,
        i: "graph2",
      },
      {
        w: 4,
        h: 2,
        x: 0,
        y: 0,
        i: "graph3",
      },
      {
        w: 4,
        h: 2,
        x: 0,
        y: 0,
        i: "graph4",
      },
      {
        w: 4,
        h: 2,
        x: 0,
        y: 2,
        i: "graph5",
      },
      {
        w: 4,
        h: 2,
        x: 0,
        y: 2,
        i: "graph6",
      },
      {
        w: 4,
        h: 2,
        x: 0,
        y: 2,
        i: "graph7",
      },
    ],
    undefined: [
      {
        w: 6,
        h: 2,
        x: 0,
        y: 0,
        i: "graph1",
        moved: false,
        static: false,
      },
      {
        w: 4,
        h: 2,
        x: 6,
        y: 0,
        i: "graph2",
        moved: false,
        static: false,
      },
      {
        w: 3,
        h: 2,
        x: 0,
        y: 2,
        i: "graph3",
        moved: false,
        static: false,
      },
      {
        w: 3,
        h: 2,
        x: 3,
        y: 2,
        i: "graph4",
        moved: false,
        static: false,
      },
      {
        w: 4,
        h: 2,
        x: 6,
        y: 2,
        i: "graph5",
        moved: false,
        static: false,
      },
      {
        w: 3,
        h: 2,
        x: 3,
        y: 4,
        i: "graph6",
        moved: false,
        static: false,
      },
      {
        w: 3,
        h: 2,
        x: 0,
        y: 4,
        i: "graph7",
        moved: false,
        static: false,
      },
    ],
  };
  let data = [
    "graph1",
    "graph2",
    "graph3",
    "graph4",
    "graph5",
    "graph6",
    "graph7",
  ];



  return (
    <div>
      <Router>
        <Layout>
          <RoutesURL />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
