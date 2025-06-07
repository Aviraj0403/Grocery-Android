import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-semibold mb-4">No order found.</h1>
        <Link to="/" className="text-green-600 hover:underline">Go to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Thank you for your order!</h1>
      <p className="mb-4">Order ID: <strong>{order.id}</strong></p>
      <p className="mb-4">Order Date: <strong>{new Date(order.orderDate).toLocaleString()}</strong></p>
      <p className="mb-4">Payment Method: <strong>{order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}</strong></p>
      <h2 className="text-xl font-semibold mb-3">Shipping Information:</h2>
      <div className="mb-6 space-y-1">
        <p>{order.shipping.fullName}</p>
        <p>{order.shipping.address}, {order.shipping.city}</p>
        <p>{order.shipping.postalCode}, {order.shipping.country}</p>
        <p>Email: {order.shipping.email}</p>
      </div>
      <h2 className="text-xl font-semibold mb-3">Order Summary:</h2>
      <ul className="divide-y divide-gray-300 mb-4">
        {order.items.map((item, idx) => (
          <li key={idx} className="py-2 flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{((item.selectedVariant?.price || 0) * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between font-semibold text-lg text-green-700 mb-6">
        <span>Total Amount:</span>
        <span>₹{order.totalAmount.toFixed(2)}</span>
      </div>
      <Link to="/" className="text-green-600 hover:underline font-semibold">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;
