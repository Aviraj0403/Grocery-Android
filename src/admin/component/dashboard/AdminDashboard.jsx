import React, { useState, useMemo } from "react";
import { FaChartLine, FaClipboardList, FaUser } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

// Mock data
const mockOrders = [
  { id: 1, customer: "Tiwari", total: 1500, status: "Paid" },
  { id: 2, customer: "Bob", total: 800, status: "Pending" },
  { id: 3, customer: "Charlie", total: 2200, status: "Paid" },
];

const products = [
  { id: 1, name: "Apples", price: 100 },
  { id: 2, name: "Bananas", price: 50 },
  { id: 3, name: "Milk", price: 60 },
  { id: 4, name: "Rice", price: 120 },
];

const customers = ["Alice", "Bob", "Charlie", "David"];

function AdminDashboard() {
  const totalSales = useMemo(() => mockOrders.reduce((sum, order) => sum + order.total, 0), []);
  const totalOrders = mockOrders.length;
  const totalProducts = products.length;
  const totalCustomers = customers.length;

  return (
    <main className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Grocery Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <OverviewCard title="Total Sales" value={`₹${totalSales}`} icon={<FaChartLine />} color="#4CAF50" />
        <OverviewCard title="Total Orders" value={totalOrders} icon={<FaClipboardList />} color="#2196F3" />
        <OverviewCard title="Total Products" value={totalProducts} icon={<MdInventory />} color="#FF9800" />
        <OverviewCard title="Customers" value={totalCustomers} icon={<FaUser />} color="#9C27B0" />
      </div>

      {/* Today's Orders */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Today’s Orders</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          {mockOrders.map(order => (
            <motion.div
              key={order.id}
              className="bg-white p-4 rounded shadow border border-gray-200"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <Typography variant="h6">Customer: {order.customer}</Typography>
              <Typography variant="body1">Total: ₹{order.total}</Typography>
              <Typography variant="body1" color={order.status === "Paid" ? "green" : "orange"}>
                Status: {order.status}
              </Typography>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Chart Placeholder */}
      {/* <div className="mt-8">
        <BookingChart title="Sales Report" url="#" />
      </div> */}
    </main>
  );
}

// Overview Card Component
const OverviewCard = ({ title, value, icon, color }) => (
  <div className="p-4 rounded shadow flex items-center justify-between" style={{ backgroundColor: color, color: "#fff" }}>
    <div className="text-3xl">{icon}</div>
    <div className="text-right">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
