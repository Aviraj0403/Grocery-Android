import React, { useRef } from "react";
import { useLocation, Link } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;
  const receiptRef = useRef();

  if (!order) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-semibold mb-4">No order found.</h1>
        <Link to="/" className="text-green-600 hover:underline">Go to Home</Link>
      </div>
    );
  }

  const handlePrint = () => {
    const printContent = receiptRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload to reset React state after print
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-10" ref={receiptRef}>
      <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">Order Receipt</h1>
      
      <p className="mb-2">Order ID: <strong>{order.id}</strong></p>
      <p className="mb-2">
        Order Date: <strong>{new Date(order.orderDate).toLocaleString()}</strong>
      </p>
      <p className="mb-4">
        Payment Method: <strong>{order.paymentMethod?.toUpperCase() === "COD" ? "Cash on Delivery" : "Online Payment"}</strong>
      </p>

      <h2 className="text-xl font-semibold mb-3 border-b pb-1">Shipping Information</h2>
      <div className="mb-6 space-y-1">
        <p>{order.shipping?.fullName || "N/A"}</p>
        <p>
          {order.shipping?.street || "N/A"}
          {order.shipping?.addressLine2 ? `, ${order.shipping.addressLine2}` : ""}
          , {order.shipping?.city || "N/A"}
        </p>
        <p>
          {order.shipping?.postalCode || "N/A"}, {order.shipping?.country || "N/A"}
        </p>
        <p>Email: {order.shipping?.email || "N/A"}</p>
        <p>Phone: {order.shipping?.phoneNumber || "N/A"}</p> 
      </div>

      <h2 className="text-xl font-semibold mb-3 border-b pb-1">Order Summary</h2>
      <ul className="divide-y divide-gray-300 mb-4">
        {order.items?.map((item, idx) => (
          <li key={idx} className="py-2 flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{((item.selectedVariant?.price || item.price || 0) * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-1 mb-6 border-t pt-3">
        {order.discount > 0 ? (
          <>
            <div className="flex justify-between text-gray-500 line-through text-sm">
              <span>Original Total:</span>
              <span>₹{order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-700 font-semibold text-lg">
              <span>You Paid:</span>
              <span>₹{order.finalAmount.toFixed(2)}</span>
            </div>
            <p className="text-sm text-right text-green-600 italic">
              You saved ₹{order.discount.toFixed(2)}
            </p>
          </>
        ) : (
          <div className="flex justify-between text-green-700 font-semibold text-lg">
            <span>Total Amount:</span>
            <span>₹{order.totalAmount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Print Receipt
        </button>
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="text-green-600 hover:underline font-semibold">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
