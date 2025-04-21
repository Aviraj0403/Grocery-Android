import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cartSlice';
import { toast } from 'react-toastify';
import { FaCartPlus } from 'react-icons/fa';

const AddToCartButton = ({ productId, selectedVariant, quantity = 1 }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!productId || !selectedVariant) {
      toast.error("Product or variant missing!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        productId,
        selectedVariant,
        quantity
      };
      await dispatch(addToCart(payload)).unwrap();
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium transition ${
        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
      }`}
    >
      <FaCartPlus />
      {loading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
