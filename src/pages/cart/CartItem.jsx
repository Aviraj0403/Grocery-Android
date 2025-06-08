import React, { useState, useEffect } from "react";
import { useCartActions } from "../../hooks/useCartActions"; // Adjust path if needed

const CartItem = ({ item }) => {
  const { debouncedUpdateQuantity, removeItem } = useCartActions();

  const variant = item.selectedVariant || {};
  const variantId = variant.id || variant.unit;
  const image =
    item.image ||
    (item.images?.length > 0 ? item.images[0] : "/placeholder.jpg");

  const [localQty, setLocalQty] = useState(item.quantity);

  useEffect(() => {
    setLocalQty(item.quantity);
  }, [item.quantity]);

  const increaseQty = () => {
    const newQty = localQty + 1;
    setLocalQty(newQty);
    debouncedUpdateQuantity(item.id, variant, newQty);
  };

  const decreaseQty = () => {
    if (localQty > 1) {
      const newQty = localQty - 1;
      setLocalQty(newQty);
      debouncedUpdateQuantity(item.id, variant, newQty);
    } else {
      removeItem(item.id, variantId);
    }
  };

  const handleRemove = () => {
    removeItem(item.id, variantId);
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="w-20 h-20 rounded border overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={item.name || "Product"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-[150px]">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {item.name}
        </h3>
        <p className="text-xs text-gray-500">{variant.unit}</p>
        <p className="mt-1 text-green-700 font-semibold text-sm">
          ₹{variant.price?.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2 border rounded-full px-2 py-1">
        <button
          onClick={decreaseQty}
          className="w-6 h-6 flex justify-center items-center rounded-full bg-gray-100 hover:bg-gray-200 text-base font-bold"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-6 text-center text-sm text-gray-800">{localQty}</span>
        <button
          onClick={increaseQty}
          className="w-6 h-6 flex justify-center items-center rounded-full bg-gray-100 hover:bg-gray-200 text-base font-bold"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Price */}
      <div className="text-green-700 font-semibold text-sm w-20 text-right">
        ₹{(variant.price * localQty).toFixed(2)}
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 ml-auto sm:ml-2"
        aria-label="Remove item"
        title="Remove item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
