import React from 'react';
import { FaUserCircle, FaShoppingCart, FaCog, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';

const menuItems = [
  { id: 'profile', icon: <FaUserCircle />, label: 'Profile' },
  { id: 'orders', icon: <FaShoppingCart />, label: 'My Orders' },
  { id: 'addresses', icon: <FaHome />, label: 'Addresses' },   // <-- Added Addresses tab here
  { id: 'settings', icon: <FaCog />, label: 'Settings' },
];

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, userName, logout }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white shadow-lg z-50 w-64 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static`}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="p-4 space-y-6 relative">
          <button
            className="absolute top-4 right-4 text-2xl md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <IoMdClose />
          </button>
          <div className="flex flex-col items-center space-y-2 mt-8 md:mt-0">
            <FaUserCircle className="text-5xl text-green-500" />
            <h2 className="text-lg font-semibold">
              Hello, {(userName || 'User').split(' ')[0]}!
            </h2>
          </div>
          <nav className="flex flex-col gap-2 mt-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full hover:bg-green-100 ${
                  activeTab === item.id ? 'bg-green-200 font-semibold' : ''
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4">
          <Link to="/login">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white w-full"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
