import { useState } from "react";
import {
  FaUserCircle,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Real profile and editable draft
  const [profile, setProfile] = useState({
    name: "Shanu Kumar",
    email: "shanu@example.com",
    phone: "+91-9876543210",
  });
  const [draftProfile, setDraftProfile] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDraftProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(draftProfile);
    setActiveTab("profile");
    toast.success("Profile updated successfully!", {
      duration: 3000,
      style: {
        background: "green", // green background
        color: "white",
        fontWeight: "bold",
        borderRadius: "10px",
      },
    });
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel your changes?")) {
      setDraftProfile(profile);
      setActiveTab("profile");
      toast.success("Profile updated successfully", {
        duration: 3000,
        style: {
          background: "green", // green background
          color: "white",
          fontWeight: "bold",
          borderRadius: "10px",
        },
      });
    }
  };

  const menuItems = [
    { id: "profile", icon: <FaUserCircle />, label: "Profile" },
    { id: "orders", icon: <FaShoppingCart />, label: "My Orders" },
    { id: "settings", icon: <FaCog />, label: "Settings" },
  ];

  const orders = [
    { id: 1, item: "Apples", date: "2025-04-25", amount: "₹150" },
    { id: 2, item: "Milk", date: "2025-04-24", amount: "₹50" },
    { id: 3, item: "Bread", date: "2025-04-23", amount: "₹40" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
      
        className={`fixed inset-y-0 left-0 bg-white shadow-lg z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
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
                Hello, {profile.name.split(" ")[0]}!
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
                    activeTab === item.id ? "bg-green-200 font-semibold" : ""
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Navbar */}
        <div className="flex items-center justify-between bg-white shadow-md p-4 md:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars size={24} />
          </button>
          <h1 className="text-xl font-semibold text-green-600">Dashboard</h1>
          <div></div>
        </div>

        {/* profile  Content */}

        <main className="flex-1 p-5 mt-4 md:mt-0 ">
          {activeTab === "profile" && (
            <div>
              <h1 className="text-2xl font-bold mb-4 text-green-600 my-12">
                Profile
              </h1>

              <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-2xl shadow-lg space-y-4 border border-green-300">
                <div className="flex items-center space-x-4">
                  <FaUserCircle className="text-5xl text-green-600" />
                  <div>
                    <h2 className="text-xl font-bold">{profile.name}</h2>
                    <p className="text-sm text-gray-700">{profile.email}</p>
                  </div>
                </div>

                <div className="border-t border-green-300 my-4"></div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-700">
                      Full Name:
                    </span>
                    <span>{profile.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-700">
                      Email Address:
                    </span>
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-700">
                      Phone Number:
                    </span>
                    <span>{profile.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* order section */}
          {activeTab === "orders" && (
  <div className="animate-fadeInUp">
    <h1 className="text-3xl font-bold mb-6 text-green-700 animate-slideDown">
      My Orders
    </h1>

    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl overflow-x-auto animate-fadeInSlow">

      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="px-4 md:px-6 py-3 text-left rounded-tl-2xl">#</th>
            <th className="px-4 md:px-6 py-3 text-left">Item</th>
            <th className="px-4 md:px-6 py-3 text-left">Date</th>
            <th className="px-4 md:px-6 py-3 text-left rounded-tr-2xl">Amount</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-green-100 hover:scale-[1.01] hover:shadow-md transition-all duration-300 ease-in-out"
            >
              <td className="px-4 md:px-6 py-4 font-semibold whitespace-nowrap">{order.id}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">{order.item}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">{order.date}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap font-semibold">{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  </div>
)}

{/* setting section */}

          {activeTab === "settings" && (
            <div className="animate-fadeInUp">
              <h1 className="text-2xl font-bold mb-4 text-green-600">
                Settings
              </h1>

              <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-2xl shadow-lg space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-green-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={draftProfile.name}
                    onChange={handleInputChange}
                    className="border-2 border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-green-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={draftProfile.email}
                    onChange={handleInputChange}
                    className="border-2 border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-green-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={draftProfile.phone}
                    onChange={handleInputChange}
                    className="border-2 border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  <button
                    onClick={handleSave}
                    className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition transform hover:scale-105"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="w-full md:w-auto bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition transform hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            
          )},
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
