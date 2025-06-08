import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/footer.jsx";
import ScrollToTop from "./components/ScrollToTop";
import { ProgressBar } from "./admin";
// import { RouterCumb } from "./admin";
import { useWindowContext } from "./context/windowContext.jsx";
// import { useCartSync } from "./hooks/useCartSync"; // ✅ Import hook

const Layout = () => {
  const { divRef, progressWidth } = useWindowContext();

  // useCartSync(); 

  useEffect(() => {
    // Handle layout-specific effects here
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white-100/100">
      <ToastContainer  position="top-center" />
       {/* <AuthListener /> */}
      <Header />
      <div ref={divRef} className="flex-1 overflow-auto bg-white">
        <ProgressBar progressWidth={progressWidth} />
        <ScrollToTop />
        {/* <RouterCumb /> */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
