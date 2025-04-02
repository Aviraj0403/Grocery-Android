import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import your AuthContext to get user role
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const { divRef, progressWidth } = useWindowContext();
  const { userRole } = useAuth(); // Get the user role from context

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
      {/* Conditionally render Sidebar based on user role */}
      {userRole === 'superAdmin' ? (
        <SuperAdminSidebar
          className={`lg:fixed absolute top-0 left-0 z-30 w-64 bg-white transition-transform duration-300 ease-in-out ${openSidebar ? "translate-x-0" : "-translate-x-full"}`}
          toggleSidebar={toggleSidebar} // Pass toggle function
        />
      ) : (
        <Sidebar
          className={`lg:fixed absolute top-0 left-0 z-30 w-64 bg-white transition-transform duration-300 ease-in-out ${openSidebar ? "translate-x-0" : "-translate-x-full"}`}
          toggleSidebar={toggleSidebar}
        />
      )}
      <div className={`flex flex-col flex-grow transition-all duration-300 ease-in-out ${openSidebar ? "lg:ml-64" : "ml-0"}`}>
        <Header toggleSidebar={toggleSidebar} openSidebar={openSidebar} />
        
        <div className="mt-[10vh]">
          <ProgressBar progressWidth={progressWidth} />
          <RouterCumb />
        </div>
        {/* Main outlet for dynamic routing */}
        <main ref={divRef ? divRef : null} className="flex-grow p-4 overflow-y-scroll bg-orange-100/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
