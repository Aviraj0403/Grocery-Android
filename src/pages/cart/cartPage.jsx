import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CartSummary from "./CartSummary"; // import the reusable component

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount, loading } = useSelector(
    (state) => state.cart
  );

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-900 text-center sm:text-left">
        Your Shopping Cart
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Skeleton key={i} height={140} borderRadius={8} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-24 sm:py-32 text-gray-500">
          <p className="text-lg sm:text-xl mb-4">Your cart is empty!</p>
          <Link
            to="/"
            className="inline-block bg-green-600 hover:bg-green-700 transition-colors text-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow-md text-sm sm:text-base"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4 sm:space-y-6">
            {items.map((item, idx) => (
              <CartItem key={idx} item={item} />
            ))}
          </div>

          {/* Order Summary using reusable component */}
          <CartSummary
            totalAmount={totalAmount}
            totalQuantity={totalQuantity}
            onClearCart={handleClearCart}
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;
