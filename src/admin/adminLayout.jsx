import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./component"; // if directly from component/index.js
import { Sidebar } from "./component";
import { RouterCumb } from "./component";
import { useWindowContext } from "../context/windowContext";
import { ProgressBar} from "./component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const { divRef, progressWidth } = useWindowContext();

  const toggleSidebar = () => setOpenSidebar(prev => !prev);

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

      {/* Sidebar for all users */}
      <Sidebar
        className={`lg:fixed absolute top-0 left-0 z-30 w-64 bg-white transition-transform duration-300 ease-in-out ${
          openSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={`flex flex-col flex-grow transition-all duration-300 ease-in-out ${
          openSidebar ? "lg:ml-64" : "ml-0"
        }`}
      >
        <Header toggleSidebar={toggleSidebar} openSidebar={openSidebar} />

        <div className="mt-[10vh]">
          <ProgressBar progressWidth={progressWidth} />
          <RouterCumb />
        </div>

        <main
          ref={divRef || null}
          className="flex-grow p-4 overflow-y-scroll bg-orange-100/30"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
