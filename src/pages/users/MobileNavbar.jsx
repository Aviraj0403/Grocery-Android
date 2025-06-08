import React from 'react';
import { FaBars } from 'react-icons/fa';

const MobileNavbar = ({ sidebarOpen, setSidebarOpen }) => (
  <div className="flex items-center justify-between bg-white shadow-md p-4 md:hidden">
    <button onClick={() => setSidebarOpen(!sidebarOpen)}>
      <FaBars size={24} />
    </button>
    <h1 className="text-xl font-semibold text-green-600">Dashboard</h1>
    <div></div>
  </div>
);

export default MobileNavbar;
