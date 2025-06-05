import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    for (let field in formData) {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate order placement
    console.log("Order placed!", formData, items);

    // Redirect or clear cart (based on real-world flow)
    navigate("/order-confirmation", { replace: true });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Shipping Details */}
        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <h2 className="text-xl font-medium">Shipping Information</h2>

          {[
            { name: "fullName", label: "Full Name" },
            { name: "email", label: "Email Address", type: "email" },
            { name: "address", label: "Street Address" },
            { name: "city", label: "City" },
            { name: "postalCode", label: "Postal Code" },
            { name: "country", label: "Country" },
          ].map(({ name, label, type = "text" }) => (
            <div key={name}>
              <label className="block mb-1 font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="border p-4 rounded-lg bg-gray-50 shadow h-fit">
          <h2 className="text-xl font-medium mb-4">Order Summary</h2>
          <ul className="divide-y mb-4">
            {items.map((item, idx) => (
              <li key={idx} className="py-2 flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mb-2">
            <span>Total Items:</span>
            <span>{totalQuantity}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Amount:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <Link
            to="/cart"
            className="block text-center mt-6 text-green-700 hover:underline"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
