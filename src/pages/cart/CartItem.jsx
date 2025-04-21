// src/components/Cart/CartItem.jsx
import React from "react";
import { FaTrash } from "react-icons/fa";
import { MdOutlineRemove, MdOutlineAdd } from "react-icons/md";

const CartItem = ({ item, onQtyChange, onRemove }) => {
  const { product, selectedVariant, quantity } = item;

  const handleIncrease = () => {
    onQtyChange(product._id, selectedVariant, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQtyChange(product._id, selectedVariant, quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove(product._id, selectedVariant);
  };

  return (
    <div className="flex items-start gap-4 border rounded-lg p-4 bg-white shadow-sm">
      {/* Image */}
      <img
  src={product?.images?.[0] || "/images/placeholder.png"}
  alt={product?.name || 'Product'}
  className="w-24 h-24 object-cover rounded-md"
/>


      {/* Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600">{selectedVariant.unit} - {selectedVariant.packaging}</p>
        <p className="text-green-600 font-bold mt-1">
          ₹{selectedVariant.price} × {quantity} = ₹
          {(selectedVariant.price * quantity).toFixed(2)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center mt-3 gap-2">
          <button
            onClick={handleDecrease}
            className="bg-gray-200 p-1 rounded-full hover:bg-gray-300"
          >
            <MdOutlineRemove size={20} />
          </button>
          <span className="px-2 text-sm font-medium">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="bg-gray-200 p-1 rounded-full hover:bg-gray-300"
          >
            <MdOutlineAdd size={20} />
          </button>
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={handleRemove}
        className="text-red-500 hover:text-red-600 ml-auto"
        title="Remove Item"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
