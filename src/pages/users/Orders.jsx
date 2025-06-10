import React, { useEffect, useState } from 'react';
import { getUserOrders, getUserOrderById } from '../../services/orderApi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Orders = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      setLoading(true);
      getUserOrders()
        .then((data) => {
          setOrders(data || []);
        })
        .catch(() => {
          toast.error('Failed to fetch orders');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, authLoading]);

  const handleOrderClick = (orderId) => {
    setDetailsLoading(true);
    getUserOrderById(orderId)
      .then((data) => {
        setSelectedOrder(data);
      })
      .catch(() => {
        toast.error('Failed to fetch order details');
      })
      .finally(() => {
        setDetailsLoading(false);
      });
  };

  if (authLoading) return <p>Checking authentication...</p>;
  if (loading) return <p>Loading your orders...</p>;

  if (!orders.length) {
    return (
      <section>
        <h2 className="text-2xl font-semibold text-green-600 mb-4">My Orders</h2>
        <p>No orders found.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold text-green-600 mb-4">My Orders</h2>
      <div className="bg-white p-6 rounded-2xl shadow-xl overflow-x-auto bg-gradient-to-r from-green-100 to-yellow-100">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left rounded-tl-2xl">#</th>
              <th className="px-4 py-3 text-left">Item</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left rounded-tr-2xl">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order, idx) => (
              <tr
                key={order._id}
                className="hover:bg-green-100 cursor-pointer"
                onClick={() => handleOrderClick(order._id)}
              >
                <td className="px-4 py-4 font-semibold">{idx + 1}</td>
                <td className="px-4 py-4">
                  {order.items && order.items.length > 0 ? (
                    order.items[0].product
                      ? order.items[0].product.name
                      : `Variant @ ₹${order.items[0].selectedVariant.price}`
                  ) : (
                    'No items'
                  )}
                </td>
                <td className="px-4 py-4">
                  {order.placedAt
                    ? new Date(order.placedAt).toLocaleDateString()
                    : order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="px-4 py-4 font-semibold">
                  ₹{(order.totalAmount - (order.discountAmount || 0)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Show order details below the table */}
        {detailsLoading && <p>Loading order details...</p>}

        {selectedOrder && !detailsLoading && (
           <section className="mt-8 p-6 bg-white rounded-xl shadow-md border border-green-200 max-w-4xl mx-auto">
    <h3 className="text-2xl font-bold text-green-700 mb-4 border-b border-green-300 pb-2">
      Order Details
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
      {/* Left Column */}
      <div>
        <p><span className="font-semibold text-green-600">Order ID:</span> {selectedOrder._id}</p>
        <p><span className="font-semibold text-green-600">Status:</span> <span className={`inline-block px-2 py-1 rounded text-white ${
          selectedOrder.orderStatus === 'Delivered' ? 'bg-green-600' :
          selectedOrder.orderStatus === 'Pending' ? 'bg-yellow-500' :
          'bg-gray-500'
        }`}>{selectedOrder.orderStatus}</span></p>
        <p><span className="font-semibold text-green-600">Payment Status:</span> {selectedOrder.paymentStatus}</p>
        <p><span className="font-semibold text-green-600">Payment Method:</span> {selectedOrder.paymentMethod}</p>
      </div>

      {/* Right Column */}
      <div>
        <p className="font-semibold text-green-600 mb-1">Shipping Address:</p>
        <address className="not-italic text-gray-800 leading-relaxed">
          {selectedOrder.shippingAddress.fullName}<br />
          {selectedOrder.shippingAddress.addressLine1}<br />
          {selectedOrder.shippingAddress.addressLine2 && (<>{selectedOrder.shippingAddress.addressLine2}<br /></>)}
          {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pinCode}<br />
          {selectedOrder.shippingAddress.country}
        </address>
      </div>
    </div>

    <div className="mt-6">
      <h4 className="text-lg font-semibold text-green-700 mb-2 border-b border-green-300 pb-1">
        Items
      </h4>
      <ul className="divide-y divide-green-200">
        {selectedOrder.items.map((item, i) => (
          <li key={i} className="py-3 flex justify-between items-center">
            <div>
              <p className="font-medium">
                {item.product ? item.product.name : 'Unnamed product'}
              </p>
              <p className="text-sm text-gray-600">
                Unit: {item.selectedVariant.unit}, Packaging: {item.selectedVariant.packaging}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">Qty: {item.quantity}</p>
              <p className="text-green-700 font-bold">₹{(item.selectedVariant.price * item.quantity).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-6 border-t border-green-300 pt-4 flex justify-end space-x-6 text-gray-800 font-semibold text-lg">
      <p>
        Total: <span className="text-green-700">₹{selectedOrder.totalAmount.toFixed(2)}</span>
      </p>
      {selectedOrder.discountAmount > 0 && (
        <p className="text-red-600">
          Discount: -₹{selectedOrder.discountAmount.toFixed(2)}
        </p>
      )}
    </div>
  </section>
        )}
      </div>
    </section>
  );
};

export default Orders;
