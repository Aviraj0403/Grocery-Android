import React, { useEffect, useState } from 'react';
import axios from '../../../utils/Axios';
import toast from 'react-hot-toast';

const AdminOrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/getAllOrders');
      setOrders(res.data.orders || []);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/updateOrderStatus/${id}`, { orderStatus: status });
      toast.success('Order status updated');
      fetchOrders();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await axios.delete(`/deleteOrder/${id}`);
      toast.success('Order deleted');
      setOrders(orders.filter(order => order._id !== id));
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Table view for desktop */}
          <div className="hidden sm:block overflow-x-auto bg-white shadow rounded">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Payment</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} className="border-t">
                    <td className="px-4 py-2">{order._id.slice(0, 8)}...</td>
                    <td className="px-4 py-2">{order.user?.userName || 'Guest'}</td>
                    <td className="px-4 py-2">₹{order.totalAmount}</td>
                    <td className="px-4 py-2">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">{order.paymentStatus}</td>
                    <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for mobile */}
          <div className="space-y-4 sm:hidden">
            {orders.map(order => (
              <div key={order._id} className="bg-white p-4 rounded shadow text-sm space-y-2">
                <div><strong>Order ID:</strong> {order._id.slice(0, 10)}...</div>
                <div><strong>User:</strong> {order.user?.userName || 'Guest'}</div>
                <div><strong>Total:</strong> ₹{order.totalAmount}</div>
                <div><strong>Payment:</strong> {order.paymentStatus}</div>
                <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
                <div>
                  <label className="block text-xs text-gray-500">Status:</label>
                  <select
                    value={order.orderStatus}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="w-full border rounded px-2 py-1 mt-1"
                  >
                    {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="text-red-600 hover:underline text-right block mt-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrderManager;
