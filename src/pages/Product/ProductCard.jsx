import React, { useState } from "react";
import { toast } from "react-toastify";
<<<<<<< Updated upstream
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCartActions } from "../../hooks/useCartActions";
import { useAuth } from "../../context/AuthContext"; // ✅ Import useAuth

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const hasVariants = Array.isArray(product?.variants) && product.variants.length > 0;
  const defaultVariant = hasVariants ? product.variants[0] : null;

  if (!product || !hasVariants) return null;

  const [selectedVariant, setSelectedVariant] = useState(
    product.activeVariant || defaultVariant.unit
  );
  const [isProcessing, setIsProcessing] = useState(false);
=======
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const defaultVariant = hasVariants ? product.variants[0] : null;

  const [selectedUnit, setSelectedUnit] = useState(product.activeVariant || defaultVariant?.unit || "");
  const activeVariant = hasVariants && product.variants.find((v) => v.unit === selectedUnit) || defaultVariant;
>>>>>>> Stashed changes

  const activeVariant = product.variants.find((v) => v.unit === selectedVariant) || defaultVariant;

<<<<<<< Updated upstream
  const { addOrUpdateItem, removeItem } = useCartActions();
  const { cartSyncing } = useAuth(); // ✅ Destructure from context

  const cartItems = useSelector((state) => state.cart.items);

  const getCartQuantity = (productId, unit) => {
    const item = cartItems.find(
      (i) => i.id === productId && i.selectedVariant.unit === unit
    );
    return item?.quantity || 0;
  };

  const quantity = getCartQuantity(product._id, selectedVariant);

  const handleCardClick = () => navigate(`/product/${product._id}`);

  const handleVariantSelect = (unit) => setSelectedVariant(unit);

  const handleAdd = async () => {
    if (activeVariant.stockQty <= quantity) {
      toast.error("Stock limit reached");
=======
  const handleAddToCart = async (e) => {
    e.stopPropagation(); // stop click going to detail page
    if (!activeVariant) {
      toast.error("Product variant not available.");
>>>>>>> Stashed changes
      return;
    }

    setIsProcessing(true);
    const result = await addOrUpdateItem(product, activeVariant, 1);
    if (!result.success) toast.error(result.message || "Failed to add item");
    setIsProcessing(false);
  };

<<<<<<< Updated upstream
  const handleRemove = async () => {
    if (quantity <= 0) return;

    setIsProcessing(true);
    await removeItem(product._id, activeVariant.unit);
    setIsProcessing(false);
  };

  const isDisabled = isProcessing || cartSyncing;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 relative">
      {/* Product image & name */}
      <div onClick={handleCardClick} className="cursor-pointer">
        <img
          src={!imgError ? product.images?.[0] || "/images/placeholder.png" : "/images/placeholder.png"}
          onError={() => setImgError(true)}
          alt={product.name}
          className="h-36 object-contain mx-auto mb-3 rounded"
        />
        <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
      </div>

      {/* Variant selector */}
      <div className="flex flex-wrap gap-2 mb-2">
        {product.variants.map((v) => (
          <button
            key={v.unit}
            onClick={() => handleVariantSelect(v.unit)}
            className={`border px-2 py-1 text-xs rounded-md ${
              selectedVariant === v.unit
                ? "bg-green-600 text-white border-green-600"
                : "text-gray-700 hover:border-green-400"
            }`}
          >
            {v.unit} – ₹{v.price}
          </button>
        ))}
      </div>

      {/* Price + Discount */}
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-green-700 font-bold">₹{activeVariant.price}</span>
        {product.discount > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-xs line-through text-gray-400">
              ₹{(activeVariant.price / (1 - product.discount / 100)).toFixed(0)}
            </span>
            <span className="bg-red-100 text-red-600 text-[11px] px-2 py-0.5 rounded-full font-semibold">
              {Math.round(product.discount)}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Stock status */}
      <p
        className={`text-xs mb-2 ${
          activeVariant.stockQty > 0 ? "text-green-600" : "text-red-500"
        }`}
=======
  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
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
          onClick={(e) => e.stopPropagation()}
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

      <button
        onClick={handleAddToCart}
        className="w-full bg-green-600 text-white text-sm py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        disabled={isAdding || activeVariant.stockQty === 0}
        aria-label="Add to cart"
>>>>>>> Stashed changes
      >
        {activeVariant.stockQty > 0 ? "In Stock" : "Out of Stock"}
      </p>

      {/* Quantity controls */}
      {quantity === 0 ? (
        <button
          onClick={handleAdd}
          disabled={isDisabled || activeVariant.stockQty === 0}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {cartSyncing ? "Syncing..." : "Add"}
        </button>
      ) : (
        <div className="flex justify-between items-center border border-green-600 rounded">
          <button
            onClick={handleRemove}
            disabled={isDisabled}
            className="w-1/3 text-xl font-bold py-1 text-green-600 hover:bg-green-100"
          >
            –
          </button>
          <span className="w-1/3 text-center font-medium">{quantity}</span>
          <button
            onClick={handleAdd}
            disabled={isDisabled}
            className="w-1/3 text-xl font-bold py-1 text-green-600 hover:bg-green-100"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
