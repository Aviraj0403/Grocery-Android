import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../features/cartSlice"; // ✅ use new frontend action
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const hasVariants =
    Array.isArray(product?.variants) && product.variants.length > 0;
  const defaultVariant = hasVariants ? product.variants[0] : null;

  if (!product || !hasVariants) return null;

  const handleCardClick = () => navigate(`/product/${product._id}`);

  const [selectedUnit, setSelectedUnit] = useState(
    product.activeVariant || defaultVariant.unit
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const activeVariant =
    product.variants.find((v) => v.unit === selectedUnit) || defaultVariant;

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!activeVariant || activeVariant.stockQty === 0) {
      toast.error("Product variant not available or out of stock.");
      return;
    }

    try {
      setIsAdding(true);
      dispatch(
        addItem({
          product,
          // id: product._id,
          // name: product.name,
          // brand: product.brand,
          // image: product.images?.[0] || "/images/placeholder.png",
          selectedVariant: {
            id: activeVariant.id || activeVariant.unit,
            unit: activeVariant.unit,
            price: activeVariant.price,
            packaging: activeVariant.packaging,
            stockQty: activeVariant.stockQty,
          },
          quantity,
        })
      );
      toast.success("Added to cart!");
      setQuantity(1);
    } catch (err) {
      toast.error("Failed to add item.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "increment") {
        if (activeVariant.stockQty && prev < activeVariant.stockQty) {
          return prev + 1;
        }
        toast.error("Max stock reached");
        return prev;
      }
      return prev > 1 ? prev - 1 : 1;
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer"
    >
      <img
        src={
          !imgError
            ? product.images?.[0] || "/images/placeholder.png"
            : "/images/placeholder.png"
        }
        alt={product.name}
        onError={() => setImgError(true)}
        className="h-36 object-contain mx-auto mb-3"
      />

      <h3 className="text-sm font-semibold text-gray-800 truncate">
        {product.name}
      </h3>
      <p className="text-xs text-gray-500 mb-2">{product.brand}</p>

      <div className="mb-2">
        <select
          value={selectedUnit}
          onChange={(e) => {
            setSelectedUnit(e.target.value);
            setQuantity(1);
          }}
          className="w-full text-sm border rounded px-2 py-1 mb-2"
        >
          {product.variants.map((v) => (
            <option key={v.unit} value={v.unit}>
              {v.unit} — ₹{v.price}
            </option>
          ))}
        </select>

        <div className="flex items-center justify-between text-sm">
          <span className="text-green-700 font-bold">
            ₹{activeVariant.price}
          </span>
          {product.discount > 0 && (
            <span className="text-xs line-through text-gray-400">
              ₹
              {(
                activeVariant.price /
                (1 - product.discount / 100)
              ).toFixed(0)}
            </span>
          )}
        </div>

        <p
          className={`text-xs mt-1 ${
            activeVariant.stockQty > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {activeVariant.stockQty > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <button
          type="button"
          onClick={() => handleQuantityChange("decrement")}
          className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 text-xl font-bold"
        >
          –
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

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding || activeVariant.stockQty === 0}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
      >
        {isAdding ? "Adding…" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
