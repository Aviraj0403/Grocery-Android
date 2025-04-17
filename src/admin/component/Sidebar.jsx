import React from "react";
import {
  FaBoxOpen,
  FaPlusSquare,
  FaClipboardList,
  FaUsers,
  FaTags,
  FaChartBar,
  FaFileInvoiceDollar,
  FaCog,
} from "react-icons/fa";
import { MdDashboard, MdCategory, MdInventory2 } from "react-icons/md";
import { NavLink } from "react-router-dom";

function Sidebar({ className, toggleSidebar }) {
  return (
    <aside className={`${className} backdrop-blur-md text-gray-800 p-4 h-[89vh] mt-[10vh] overflow-y-scroll`}>
      {/* Close on mobile */}
      <div className="relative lg:hidden">
        <button onClick={toggleSidebar} className="text-red-500 hover:bg-red-500 hover:text-white rounded-md p-1">
          ✕
        </button>
      </div>

      {/* MAIN NAV */}
      <div className="px-2">
        <NavSection title="Main">
          <NavItem to="/admin" label="Dashboard" icon={<MdDashboard size={20} />} />
        </NavSection>

        {/* PRODUCT MANAGEMENT */}
        <NavSection title="Products">
          <NavItem to="adminProducts" label="All Products" icon={<FaBoxOpen size={20} />} />
          <NavItem to="addProduct" label="Add Product" icon={<FaPlusSquare size={20} />} />
          {/* <NavItem to="editProduct" label="Edit Product" icon={<FaPlusSquare size={20} />} /> */}
          <NavItem to="categories" label="Categories" icon={<MdCategory size={20} />} />
          {/* <NavItem to="inventory" label="Inventory" icon={<MdInventory2 size={20} />} /> */}
        </NavSection>

        {/* ORDERS */}
        <NavSection title="Orders">
          <NavItem to="orders" label="All Orders" icon={<FaClipboardList size={20} />} />
          {/* <NavItem to="returns" label="Returns / Refunds" icon={<FaFileInvoiceDollar size={20} />} /> */}
        </NavSection>

        {/* CUSTOMERS */}
        <NavSection title="Customers">
          <NavItem to="users" label="User List" icon={<FaUsers size={20} />} />
          {/* <NavItem to="feedback" label="Feedback" icon={<FaClipboardList size={20} />} /> */}
        </NavSection>

        {/* PROMOTIONS */}
        <NavSection title="Promotions">
          <NavItem to="coupons" label="Coupons" icon={<FaTags size={20} />} />
          <NavItem to="offers" label="Offers & Deals" icon={<FaTags size={20} />} />
        </NavSection>

        {/* REPORTS */}
        <NavSection title="Reports">
          <NavItem to="sales-report" label="Sales Report" icon={<FaChartBar size={20} />} />
          <NavItem to="inventory-report" label="Inventory Report" icon={<FaChartBar size={20} />} />
          {/* <NavItem to="gst-report" label="GST Report" icon={<FaFileInvoiceDollar size={20} />} /> */}
        </NavSection>

        {/* SETTINGS */}
        {/* <NavSection title="Settings"> */}
          {/* <NavItem to="settings" label="Settings" icon={<FaCog size={20} />} /> */}
        {/* </NavSection> */}
      </div>
    </aside>
  );
}

// Helper Components
const NavSection = ({ title, children }) => (
  <div className="mb-2">
    <h2 className="uppercase text-sm text-gray-400 px-2 mb-1">{title}</h2>
    <div className="flex flex-col">{children}</div>
  </div>
);

const NavItem = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `mb-1 px-4 py-2 rounded-md flex items-center gap-2 ${
        isActive ? "bg-gray-200 text-orange-400" : "hover:bg-gray-200"
      }`
    }
  >
    {icon} {label}
  </NavLink>
);

export default Sidebar;
