import React from 'react';
import { useDispatch } from 'react-redux';
import { updateItemQuantity, removeItem } from '../../features/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const variant = item.selectedVariant || {};
  const variantId = variant.id || variant.unit;

  // Fallback for nested image if flat `item.image` not available
  // const image =
  //   item.image ||
  //   item.product?.images?.[0] ||
  //   '/placeholder.jpg';
const image = item.images && item.images.length > 0 ? item.images[0] : '/placeholder.jpg';

  const increaseQty = () => {
    dispatch(updateItemQuantity({ id: item.id, variantId, quantity: item.quantity + 1 }));
  };

  const decreaseQty = () => {
    if (item.quantity > 1) {
      dispatch(updateItemQuantity({ id: item.id, variantId, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ id: item.id, variantId }));
    }
  };

  return (
    <div className="flex items-center justify-between border p-4 rounded-md shadow-sm bg-white">
      {/* Image */}
      <div className="w-20 h-20 rounded overflow-hidden mr-4">
        <img
          src={image}
          alt={item.name || item.product?.name || 'Product'}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-lg font-medium">{item.name || item.product?.name}</h3>
        <p className="text-sm text-gray-500">{variant.unit}</p>
        <p className="text-sm font-semibold mt-1">₹{variant.price?.toFixed(2)}</p>
      </div>

      {/* Quantity Control */}
      <div className="flex items-center gap-2">
        <button onClick={decreaseQty} className="w-7 h-7 text-xl font-bold bg-gray-200 rounded">−</button>
        <span className="w-6 text-center">{item.quantity}</span>
        <button onClick={increaseQty} className="w-7 h-7 text-xl font-bold bg-gray-200 rounded">+</button>
      </div>

      {/* Total */}
      <div className="text-right w-20 font-bold text-lg text-green-600">
        ₹{(variant.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
