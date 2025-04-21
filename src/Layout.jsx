import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/footer.jsx";
import { ProgressBar } from "./admin";
import { RouterCumb } from "./admin"; // Optional breadcrumb
import { useWindowContext } from "./context/windowContext.jsx";

const Layout = () => {
  const { divRef, progressWidth } = useWindowContext();

  useEffect(() => {
    // Handle layout-specific effects here
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white-100/100">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Fixed Header */}
      <Header />

      {/* Main Content Area */}
      <div ref={divRef} className="flex-1 overflow-auto bg-white">
        <ProgressBar progressWidth={progressWidth} />
        {/* <RouterCumb /> */}
        <Outlet />
      </div>

      {/* Footer sits at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
