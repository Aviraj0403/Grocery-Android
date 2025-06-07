import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateCartItemThunk, removeFromCartThunk } from "../../features/cart/cartThunks";
import debounce from "lodash.debounce";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const variant = item.selectedVariant || {};
  const variantId = variant.id || variant.unit;
  const image =
  item.image || (item.images?.length > 0 ? item.images[0] : "/placeholder.jpg");

  const [localQty, setLocalQty] = useState(item.quantity);

  const debouncedUpdate = useCallback(
    debounce((qty) => {
      if (qty < 1) return;
      dispatch(
        updateCartItemThunk({
          id: item.id,
          selectedVariant: variant,
          quantity: qty,
        })
      );
    }, 400),
    [dispatch, item.id, variant]
  );

  useEffect(() => {
    setLocalQty(item.quantity);
  }, [item.quantity]);

  const increaseQty = () => {
    const newQty = localQty + 1;
    setLocalQty(newQty);
    debouncedUpdate(newQty);
  };

  const decreaseQty = () => {
    if (localQty > 1) {
      const newQty = localQty - 1;
      setLocalQty(newQty);
      debouncedUpdate(newQty);
    } else {
      // Use productId here instead of id to match thunk expectations
      dispatch(removeFromCartThunk({ id: item.id, variantId }));
    }
  };

  const removeItem = () => {
    dispatch(removeFromCartThunk({ id: item.id, variantId }));
  };

  return (
    <div className="flex items-center gap-6 p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden border">
        <img
          src={image}
          alt={item.name || item.product?.name || "Product"}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900">{item.name || item.product?.name}</h3>
        <p className="text-gray-500 mt-1">{variant.unit}</p>
        <p className="mt-2 text-green-700 font-semibold text-lg">₹{variant.price?.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={decreaseQty}
          className="w-9 h-9 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold transition"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-8 text-center font-medium text-gray-800">{localQty}</span>
        <button
          onClick={increaseQty}
          className="w-9 h-9 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold transition"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className="text-right font-bold text-lg text-green-600 w-24">
        ₹{(variant.price * localQty).toFixed(2)}
      </div>

      <button
        onClick={removeItem}
        className="ml-4 text-red-600 hover:text-red-800 transition"
        aria-label="Remove item"
        title="Remove item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
