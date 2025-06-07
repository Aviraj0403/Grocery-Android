import { useSelector, useDispatch } from 'react-redux';
import {
  addToCartThunk,
  removeFromCartThunk,
  updateCartItemThunk,
  clearCartThunk,
  fetchBackendCart
} from '../features/cart/cartThunks';
import { useEffect, useState } from 'react';

export function useCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  
  // UI state for loading/error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch backend cart on mount or refresh
  useEffect(() => {
    setLoading(true);
    dispatch(fetchBackendCart())
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const addItem = async (item) => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(addToCartThunk(item)).unwrap();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (item) => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(removeFromCartThunk(item)).unwrap();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (item) => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(updateCartItemThunk(item)).unwrap();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(clearCartThunk()).unwrap();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    cartItems,
    loading,
    error,
    addItem,
    removeItem,
    updateItem,
    clearCart,
  };
}
