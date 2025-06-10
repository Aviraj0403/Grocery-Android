import React, { useRef } from "react";

const AdminOrderDetails = ({ order, onClose }) => {
    const receiptRef = useRef();
    const isFromDashboard = order?.source === "dashboard";

    if (!order) {
        return (
            <div className="max-w-xl mx-auto p-6 text-center">
                <h1 className="text-2xl font-semibold mb-4">No order selected.</h1>
                <button
                    onClick={onClose}
                    className="text-blue-600 hover:underline"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const handlePrint = () => {
        const printContent = receiptRef.current.innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // Reset React state after print
    };

    // Calculate final amount after discount
    const finalAmount = order.totalAmount - (order.discountAmount || 0);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50 overflow-auto">
            <div
                ref={receiptRef}
                className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative border border-gray-200"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                    aria-label="Close order details"
                    title="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Admin Order Receipt</h1>

                <section className="mb-6 text-gray-700 text-sm sm:text-base grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p><span className="font-semibold">Order ID:</span> {order._id}</p>
                        <p><span className="font-semibold">Order Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
                        <p><span className="font-semibold">Order Status:</span> <span className="capitalize">{order.orderStatus}</span></p>
                        <p><span className="font-semibold">Payment Status:</span> {order.paymentStatus}</p>
                        <p><span className="font-semibold">Payment Method:</span> {order.paymentMethod || 'N/A'}</p>
                    </div>

                    {!isFromDashboard && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2 border-b pb-1">Shipping Information</h2>
                            <p>{order.shipping?.fullName || "N/A"}</p>
                            <p>
                                {order.shipping?.addressLine1 || "N/A"}
                                {order.shipping?.addressLine2 ? `, ${order.shipping.addressLine2}` : ""}
                            </p>
                            <p>
                                {order.shipping?.city || "N/A"}, {order.shipping?.state || "N/A"} - {order.shipping?.pinCode || "N/A"}
                            </p>
                            <p>{order.shipping?.country || "N/A"}</p>
                            <p>Email: {order.user?.email || 'N/A'}</p>
                            <p>Phone: {order.shipping?.phone || "N/A"}</p>
                        </div>
                    )}

                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3 border-b pb-1">Items</h2>
                    <ul className="divide-y divide-gray-300 max-h-72 overflow-y-auto">
                        {order.items.map((item, idx) => (
                            <li key={idx} className="py-3 flex justify-between items-center text-gray-800">
                                <div>
                                    <p className="font-medium">{item.product?.name || item.name || 'Unknown product'}</p>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    {item.selectedVariant && (
                                        <p className="text-sm text-gray-500">
                                            Unit: {item.selectedVariant.unit || "N/A"}
                                        </p>
                                    )}


                                </div>
                                <div className="font-semibold text-right text-blue-600">
                                    ₹{((item.selectedVariant?.price || item.product?.price || 0) * item.quantity).toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="border-t pt-4 text-gray-700">
                    {order.discountAmount > 0 ? (
                        <>
                            <div className="flex justify-between text-gray-500 line-through text-sm mb-1">
                                <span>Original Total:</span>
                                <span>₹{order.totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-green-700 font-semibold text-lg mb-1">
                                <span>You Paid:</span>
                                <span>₹{finalAmount.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-right text-green-600 italic">
                                You saved ₹{order.discountAmount.toFixed(2)} {order.discountCode ? `(Code: ${order.discountCode})` : ''}
                            </p>
                        </>
                    ) : (
                        <div className="flex justify-between text-blue-700 font-semibold text-lg">
                            <span>Total Amount:</span>
                            <span>₹{order.totalAmount.toFixed(2)}</span>
                        </div>
                    )}
                </section>

                <div className="flex justify-center mt-8">
                    <button
                        onClick={handlePrint}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Print Receipt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderDetails;
