import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <header>
        <h1>Admin Panel</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/admin" end>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/users">Users</NavLink>
            </li>
            <li>
              <NavLink to="/admin/orders">Orders</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {/* Nested admin routes will be rendered here */}
        <Outlet />
      </main>
      <footer>
        <small>© {new Date().getFullYear()} Admin Panel</small>
      </footer>
    </div>
  );
};

export default AdminLayout;
