import React, { useEffect, useState } from "react";
import { FaChartLine, FaClipboardList, FaUser } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import AdminOrderDetails from "../../pages/Orders/AdminOrderDetails";
import {
  getTotalProducts,
  getTotalOrders,
  getTotalCustomers,
  getFilteredOrders,
} from "../../../services/orderApi";

const AdminDashboard = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleClose = () => setSelectedOrder(null);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsRes, ordersRes, usersRes, filteredOrdersRes] = await Promise.all([
          getTotalProducts(),    // { totalProducts: number }
          getTotalOrders(),      // { totalOrders: number }
          getTotalCustomers(),   // { totalUsers: number }
          getFilteredOrders({ range: "today" }), // { orders: [] }
        ]);

        setTotalProducts(productsRes.totalProducts || 0);
        setTotalOrders(ordersRes.totalOrders || 0);
        setTotalUsers(usersRes.totalUsers || 0);

        const ordersData = filteredOrdersRes.orders || [];
        setOrders(ordersData);

        const sales = ordersData.reduce(
          (sum, order) => sum + (order.totalAmount || 0),
          0
        );
        setTotalSales(sales);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <main className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Grocery Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <OverviewCard
          title="Total Sales"
          value={`₹${totalSales.toFixed(2)}`}
          icon={<FaChartLine />}
          color="#4CAF50"
        />
        <OverviewCard
          title="Total Orders"
          value={totalOrders}
          icon={<FaClipboardList />}
          color="#2196F3"
        />
        <OverviewCard
          title="Total Products"
          value={totalProducts}
          icon={<MdInventory />}
          color="#FF9800"
        />
        <OverviewCard
          title="Customers"
          value={totalUsers}
          icon={<FaUser />}
          color="#9C27B0"
        />
      </div>

      <section>
      <h2 className="text-xl font-semibold mb-4">Today’s Orders</h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length === 0 ? (
          <p>No orders today.</p>
        ) : (
          orders.map((order) => (
            <motion.div
              key={order._id}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedOrder({ ...order, source: "dashboard" })}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">
                  {order.user?.userName || order.shippingAddress?.fullName || "Unknown"}
                </h3>
                <span className="text-sm text-gray-500">
                  {dayjs(order.createdAt).format("MMM D, YYYY h:mm A")}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                Order ID: <span className="font-mono">{order._id.slice(0, 8)}...</span>
              </p>

              <p className="text-sm mb-3">
                Payment Method: <span className="font-medium">{order.paymentMethod}</span>
              </p>

              <div className="mb-3">
                <h4 className="text-sm font-semibold mb-1">Products:</h4>
                <ul className="list-disc list-inside max-h-32 overflow-auto text-sm text-gray-700">
                  {order.items.map(({ product, quantity, selectedVariant }, idx) => (
                    <li key={idx}>
                      {product.name} - {quantity} × ₹
                      {selectedVariant?.price || product.variants[0].price}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="font-bold text-lg mb-2">Total: ₹{order.totalAmount.toFixed(2)}</p>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                ${
                  order.paymentStatus === "Paid" && order.orderStatus !== "Cancelled"
                    ? "bg-green-100 text-green-800"
                    : order.orderStatus === "Cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.paymentStatus} / {order.orderStatus}
              </span>
            </motion.div>
          ))
        )}
      </div>

      {/* Show modal if an order is selected */}
      {selectedOrder && (
        <AdminOrderDetails order={selectedOrder} onClose={handleClose} />
      )}
    </section>
    </main>
  );
};

const OverviewCard = ({ title, value, icon, color }) => (
  <div
    className="p-4 rounded shadow flex items-center justify-between"
    style={{ backgroundColor: color, color: "#fff" }}
  >
    <div className="text-3xl">{icon}</div>
    <div className="text-right">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
