import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar, RouterCumb, ProgressBar, Footer } from "./component";
import { useWindowContext } from "../context/windowContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const { divRef, progressWidth } = useWindowContext();

  const toggleSidebar = () => setOpenSidebar((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      setOpenSidebar(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden select-none">
      <ToastContainer />

      {/* Sidebar */}
      <Sidebar
        className={`lg:fixed absolute top-0 left-0 z-30 w-64 bg-white transition-transform duration-300 ease-in-out ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
        toggleSidebar={toggleSidebar}
      />

      {/* Main layout content area */}
      <div
        className={`flex flex-col flex-grow min-h-screen transition-all duration-300 ease-in-out ${
          openSidebar ? "lg:ml-64" : "ml-0"
        }`}
      >
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} openSidebar={openSidebar} />

        {/* Progress bar and breadcrumbs */}
        <div className="mt-[10vh]">
          <ProgressBar progressWidth={progressWidth} />
          <RouterCumb />
        </div>

        {/* Main content */}
        <main
          ref={divRef || null}
          className="flex-grow p-4 overflow-y-auto bg-orange-100/30"
        >
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
