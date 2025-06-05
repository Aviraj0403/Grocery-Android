import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, mergeCart } from '../features/cartSlice';
import * as cartApi from '../services/cartApi';

export const useCartSync = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const syncCart = async () => {
      if (user) {
        try {
          // Sync guest cart items to backend
          for (let item of cart.items) {
            const payload = {
              productId: item.id,
              selectedVariant: item.selectedVariant,
              quantity: item.quantity,
            };
            await cartApi.addToCart(payload);
          }

          // Fetch backend cart after syncing
          const res = await cartApi.getUserCart();
          const backendCart = res.data.cart.items || [];

          // Merge backend cart into local cart state
          dispatch(mergeCart({ items: backendCart }));

          // Clear guest cart (local state)
          dispatch(clearCart());
        } catch (err) {
          console.error('Cart sync failed:', err);
        }
      }
    };

    syncCart();
  }, [user]);
};
