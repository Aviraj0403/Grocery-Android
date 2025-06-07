import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const savedAddressesMock = [
  {
    id: "1",
    label: "Home",
    fullName: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    city: "Mumbai",
    postalCode: "400001",
    country: "India",
  },
  {
    id: "2",
    label: "Office",
    fullName: "John Doe",
    email: "john.doe@office.com",
    address: "456 Business Rd",
    city: "Pune",
    postalCode: "411001",
    country: "India",
  },
];

const CheckoutPage = () => {
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [savedAddresses, setSavedAddresses] = useState(savedAddressesMock);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod"); // default COD
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!selectedAddressId) {
      setFormData({
        fullName: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
      });
    } else {
      const addr = savedAddresses.find((a) => a.id === selectedAddressId);
      if (addr) {
        setFormData({
          fullName: addr.fullName,
          email: addr.email,
          address: addr.address,
          city: addr.city,
          postalCode: addr.postalCode,
          country: addr.country,
        });
        setErrors({});
      }
    }
  }, [selectedAddressId, savedAddresses]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    for (let field in formData) {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      } else {
        if (field === "email" && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Invalid email address";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mockOnlinePayment = () => {
    return new Promise((resolve) => {
      // Simulate a payment popup & success after 2 seconds
      setTimeout(() => {
        resolve(true); // payment success
      }, 2000);
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsProcessing(true);

    if (paymentMethod === "online") {
      const paymentSuccess = await mockOnlinePayment();
      if (!paymentSuccess) {
        alert("Payment failed. Please try again.");
        setIsProcessing(false);
        return;
      }
    }

    // Create order object (send to backend in real app)
    const order = {
      id: Date.now().toString(),
      items,
      totalQuantity,
      totalAmount,
      shipping: formData,
      paymentMethod,
      orderDate: new Date().toISOString(),
      status: paymentMethod === "cod" ? "Pending" : "Paid",
    };

    console.log("Order placed!", order);

    setIsProcessing(false);

    // Navigate to order confirmation with order data
    navigate("/order-confirmation", { state: { order } });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8 text-gray-900">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shipping Details */}
        <form
          onSubmit={handlePlaceOrder}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Information</h2>

          {/* Saved Address Selector */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Select Saved Address</label>
            <select
              value={selectedAddressId}
              onChange={(e) => setSelectedAddressId(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">-- Use a new address --</option>
              {savedAddresses.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Address Fields */}
          {[
            { name: "fullName", label: "Full Name" },
            { name: "email", label: "Email Address", type: "email" },
            { name: "address", label: "Street Address" },
            { name: "city", label: "City" },
            { name: "postalCode", label: "Postal Code" },
            { name: "country", label: "Country" },
          ].map(({ name, label, type = "text" }) => (
            <div key={name}>
              <label className="block mb-1 font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors[name] ? "border-red-500" : "border-gray-300"
                }`}
                disabled={!!selectedAddressId} // disable if address selected
              />
              {errors[name] && (
                <p className="text-red-600 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* Payment Method */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Payment Method</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span>Cash on Delivery</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                <span>Online Payment</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg font-semibold transition disabled:opacity-60"
          >
            {isProcessing
              ? paymentMethod === "online"
                ? "Processing Payment..."
                : "Placing Order..."
              : "Place Order"}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Order Summary</h2>

          <ul className="divide-y divide-gray-300 mb-6 max-h-80 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
            ) : (
              items.map((item, idx) => (
                <li key={idx} className="py-3 flex justify-between text-gray-800">
                  <span className="truncate max-w-xs">
                    {item.name} x {item.quantity}
                  </span>
                  <span>
                    ₹
                    {(
                      (item.selectedVariant?.price || 0) * item.quantity
                    ).toFixed(2)}
                  </span>
                </li>
              ))
            )}
          </ul>

          <div className="flex justify-between mb-2 text-gray-700">
            <span>Total Items:</span>
            <span>{totalQuantity}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg text-green-700">
            <span>Total Amount:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>

          <Link
            to="/cart"
            className="block mt-8 text-center text-green-700 hover:underline font-medium"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
