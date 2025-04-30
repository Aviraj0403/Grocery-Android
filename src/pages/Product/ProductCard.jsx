import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const defaultVariant = hasVariants ? product.variants[0] : null;

  const [selectedUnit, setSelectedUnit] = useState(product.activeVariant || defaultVariant?.unit || "");
  const [quantity, setQuantity] = useState(1); // 🆕 quantity state

  const activeVariant =
    hasVariants && product.variants.find((v) => v.unit === selectedUnit) || defaultVariant;

  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // stop click going to detail page
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
          quantity: quantity, // Use selected quantity
        })
      ).unwrap();
      toast.success("Added to cart!");
      setQuantity(1); // Reset after adding
    } catch (error) {
      toast.error(error?.message || "Add to cart failed.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "increment") {
        if (activeVariant.stock && prev < activeVariant.stock) {
          return prev + 1;
        } else {
          toast.error("Reached maximum stock limit!");
          return prev;
        }
      } else {
        return prev > 1 ? prev - 1 : 1;
      }
    });
  };

  if (!product || !hasVariants) {
    return (
      <div className="p-4 bg-white rounded shadow text-center text-gray-500">
        Product information unavailable.
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 p-4 cursor-pointer"
    >
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
          onChange={(e) => {
            setSelectedUnit(e.target.value);
            setQuantity(1); // Reset quantity when unit changes
          }}
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

        {"stockQty" in activeVariant && (
          <p
            className={`text-xs mt-1 ${
              activeVariant.stockQty > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {activeVariant.stockQty > 0 ? "In Stock" : "Out of Stock"}
          </p>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <button
          type="button"
          onClick={() => handleQuantityChange("decrement")}
          className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 text-xl font-bold"
        >
          -
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          type="button"
          onClick={() => handleQuantityChange("increment")}
          className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 text-xl font-bold"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-green-600 text-white text-sm py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        disabled={isAdding || activeVariant.stockQty === 0}
        aria-label="Add to cart"
      >
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
