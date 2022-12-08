import React from "react";
import Header from "../components/Headers/Header";
import Ticker from "../components/Ticker/Ticker";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function Layout({ children }) {
  const location = useLocation();
  var PathsArrays = ["/login", "/forgotPassword"];
  return (
    <>
      {!PathsArrays.includes(location.pathname) ? (
        <>
          <Header />
          <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
              {children}
              <Ticker />
            </div>
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default Layout;
