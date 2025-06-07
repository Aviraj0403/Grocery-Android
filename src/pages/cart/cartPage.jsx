import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartPage = () => {
  const { items, totalQuantity, totalAmount, loading } = useSelector(
    (state) => state.cart
  );

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Your Shopping Cart</h1>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Skeleton key={i} height={140} borderRadius={8} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-32 text-gray-500">
          <p className="text-xl mb-4">Your cart is empty!</p>
          <Link
            to="/"
            className="inline-block bg-green-600 hover:bg-green-700 transition-colors text-white px-8 py-3 rounded-full font-semibold shadow-md"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="md:col-span-2 space-y-6">
            {items.map((item, idx) => (
              <CartItem key={idx} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="sticky top-20 border rounded-lg p-6 bg-white shadow-lg h-fit">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>
            <div className="flex justify-between text-gray-700 mb-3">
              <span>Total Items</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="flex justify-between font-bold text-2xl text-green-700 border-t pt-3">
              <span>Total Amount</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="block mt-8 bg-green-600 hover:bg-green-700 transition-colors text-white text-center py-4 rounded-full font-semibold shadow-md"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
