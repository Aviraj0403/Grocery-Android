// src/pages/CartPage.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateItemQuantity,
  removeItem,
} from "../../features/cartSlice"; // ✅ Updated actions
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount, loading } = useSelector(
    (state) => state.cart
  );

  const handleQtyChange = (productId, variant, qty) => {
    dispatch(
      updateItemQuantity({
        id: productId,
        variantId: variant.id || variant.unit,
        quantity: qty,
      })
    );
  };

  const handleRemove = (productId, variant) => {
    dispatch(
      removeItem({
        id: productId,
        variantId: variant.id || variant.unit,
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} height={120} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p>Your cart is empty!</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-full"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            {items.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onQtyChange={handleQtyChange}
                onRemove={handleRemove}
              />
            ))}
          </div>
          <div className="border p-4 rounded-lg bg-gray-50 h-fit shadow">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Total Items:</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Amount:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="block w-full text-center mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded-full"
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
