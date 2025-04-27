import { useState } from "react";
import { FaUserCircle, FaShoppingCart, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();

  const orders = [
    { id: 1, item: "Apples", date: "2025-04-25", amount: "₹150" },
    { id: 2, item: "Milk", date: "2025-04-24", amount: "₹50" },
    { id: 3, item: "Bread", date: "2025-04-23", amount: "₹40" },
  ];

  const menuItems = [
    { id: "profile", icon: <FaUserCircle />, label: "Profile" },
    { id: "orders", icon: <FaShoppingCart />, label: "My Orders" },
    { id: "settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 bg-white shadow-lg z-50 w-64 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-0
        `}
      >
        <div className="flex flex-col h-full justify-between">

          {/* Top section */}
          <div className="p-4 space-y-6">
            {/* Profile section */}
            <div className="flex flex-col items-center space-y-2">
              <FaUserCircle className="text-5xl text-green-500" />
              <h2 className="text-lg font-semibold">Hello, Shanu!</h2>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 mt-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false); // auto close on mobile
                  }}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full hover:bg-green-100 ${
                    activeTab === item.id ? "bg-green-200 font-semibold" : ""
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Logout */}
          <div className="p-4">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white w-full"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        
        {/* Mobile Top Navbar */}
        <div className="flex items-center justify-between bg-white shadow-md p-4 md:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-semibold text-green-600">Dashboard</h1>
          <div></div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 mt-4 md:mt-0">
          {activeTab === "profile" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Profile</h1>
              <div className="bg-white p-6 rounded-lg shadow">
                <p><strong>Name:</strong> Shanu Kumar</p>
                <p><strong>Email:</strong> shanu@example.com</p>
                <p><strong>Phone:</strong> +91-9876543210</p>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">My Orders</h1>
              <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
                <table className="w-full min-w-[400px] text-left">
                  <thead>
                    <tr>
                      <th className="py-2">#</th>
                      <th className="py-2">Item</th>
                      <th className="py-2">Date</th>
                      <th className="py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-t">
                        <td className="py-2">{order.id}</td>
                        <td className="py-2">{order.item}</td>
                        <td className="py-2">{order.date}</td>
                        <td className="py-2">{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Settings</h1>
              <div className="bg-white p-6 rounded-lg shadow">
                <p>Update your account settings here.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
