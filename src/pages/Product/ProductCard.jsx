import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const activeVariant =
    product.variants.find((v) => v.unit === product.activeVariant) || product.variants[0];

  const handleAddToCart = async () => {
    try {
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
      toast.error(error || "Add to cart failed.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 p-4">
      <img
        src={product.images?.[0] || "/images/placeholder.png"}
        alt={product.name}
        className="h-36 object-contain mx-auto mb-3"
      />
      <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
      <p className="text-xs text-gray-500 mb-2">{product.brand}</p>

      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-green-700 font-bold">₹{activeVariant?.price}</span>
        {product.discount > 0 && (
          <span className="text-xs line-through text-gray-400">
            ₹{(activeVariant?.price / (1 - product.discount / 100)).toFixed(0)}
          </span>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-green-600 text-white text-sm py-2 rounded hover:bg-green-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
