// src/components/cart/CartSummary.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CartSummary = ({ total, onClearCart }) => {
  return (
    <div className="mt-6 p-4 border-t bg-white shadow rounded-md">
      <div className="flex justify-between text-lg font-semibold mb-4">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onClearCart}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Clear Cart
        </button>
        <Link
          to="/checkout"
          className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
