import React from "react";
import Header from "../components/Header/Header";
// import Footer from "./Footer";
// import { useLocation } from "react-router-dom";
// import Sidebar from "./Sidebar";

function Layout({ children }) {
  // const location = useLocation();
  // var PathsArrays = ["/login", "/forgotPassword"];
  return (
    <>
      {/* {!PathsArrays.includes(location?.pathname) ? (
        <> */}
          <Header />
          <div className="container-fluid page-body-wrapper">
            {/* <Sidebar /> */}
            <div className="main-panel">
              {children}
              {/* <Footer /> */}
            </div>
          </div>
        {/* </>
      ) : (
        <>{children}</>
      )} */}
    </>
  );
}

export default Layout;
