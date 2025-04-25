import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);

  // Ensure product.variants exists and is not empty
  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const defaultVariant = hasVariants ? product.variants[0] : null;

  const [selectedUnit, setSelectedUnit] = useState(product.activeVariant || defaultVariant?.unit || "");

  const activeVariant =
    hasVariants && product.variants.find((v) => v.unit === selectedUnit) || defaultVariant;

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!activeVariant) {
      toast.error("Product variant not available.");
      return;
    }

    try {
      setIsAdding(true);
      await dispatch(
        addToCart({
          productId: product._id,
          selectedVariant: {
            unit: activeVariant.unit,
            price: activeVariant.price,
            packaging: activeVariant.packaging,
          },
          quantity: 1,
        })
      ).unwrap();
      toast.success("Added to cart!");
    } catch (error) {
      toast.error(error?.message || "Add to cart failed.");
    } finally {
      setIsAdding(false);
    }
  };

  if (!product || !hasVariants) {
    return (
      <div className="p-4 bg-white rounded shadow text-center text-gray-500">
        Product information unavailable.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 p-4">
      <img
        src={!imgError ? (product.images?.[0] || "/images/placeholder.png") : "/images/placeholder.png"}
        alt={product.name}
        onError={() => setImgError(true)}
        className="h-36 object-contain mx-auto mb-3"
      />

      <h3 className="text-sm font-semibold text-gray-800 truncate" title={product.name}>
        {product.name}
      </h3>
      <p className="text-xs text-gray-500 mb-2">{product.brand}</p>

      <div className="mb-2">
        <select
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          className="text-sm border rounded px-2 py-1 w-full mb-2"
          aria-label="Select variant"
        >
          {product.variants.map((variant) => (
            <option key={variant.unit} value={variant.unit}>
              {variant.unit} - ₹{variant.price}
            </option>
          ))}
        </select>

        <div className="flex items-center justify-between text-sm">
          <span className="text-green-700 font-bold">₹{activeVariant?.price}</span>
          {product.discount > 0 && (
            <span className="text-xs line-through text-gray-400">
              ₹{(activeVariant?.price / (1 - product.discount / 100)).toFixed(0)}
            </span>
          )}
        </div>

        {"stock" in activeVariant && (
          <p
            className={`text-xs mt-1 ${
              activeVariant.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {activeVariant.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-green-600 text-white text-sm py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        disabled={isAdding || activeVariant.stock === 0}
        aria-label="Add to cart"
      >
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
