import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCart, clearCartState } from '../features/cartSlice';

export const useCartSync = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const syncCart = async () => {
      if (user && cart.items.length > 0) {
        // Merge guest cart to backend cart
        for (let item of cart.items) {
          const payload = {
            productId: item.product._id,
            selectedVariant: item.selectedVariant,
            quantity: item.quantity,
          };
          await dispatch(addToCart(payload));
        }

        // Fetch updated server cart
        await dispatch(fetchCart());
        dispatch(clearCartState()); // Clear guest cart after sync
      } else if (user) {
        // If logged in and no guest items, just fetch
        dispatch(fetchCart());
      }
    };

    syncCart();
  }, [user]);
};
