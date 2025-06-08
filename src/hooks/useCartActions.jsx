import { useDispatch, useSelector } from "react-redux";
import {
  addToCartThunk,
  removeFromCartThunk,
  updateCartItemThunk,
} from "../features/cart/cartThunks";

import {
  addItem,
  removeItem as removeLocalItem,
  updateItemQuantity,
} from "../features/cart/cartSlice";

import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { useAuth } from "../context/AuthContext";

export const useCartActions = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCartItem = (id, variantUnitOrId) =>
    cartItems.find(
      (item) =>
        item.id === id &&
        ((item.selectedVariant.unit || item.selectedVariant.id) === variantUnitOrId)
    );

  const addOrUpdateItem = async (product, variant, quantity = 1) => {
    const existingItem = getCartItem(product._id, variant.unit);
    const newQuantity = (existingItem?.quantity || 0) + quantity;

    if (variant.stockQty && newQuantity > variant.stockQty) {
      return { success: false, message: "Not enough stock." };
    }

    setLoading(true);
    try {
      const payload = {
        productId: product._id,
        selectedVariant: {
          id: variant.id || variant.unit,
          unit: variant.unit,
          price: variant.price,
          stockQty: variant.stockQty,
        },
        quantity: newQuantity,
      };

      if (isAuthenticated) {
        // Optimistic update: update redux store before backend call
        dispatch(
          addItem({
            product,
            selectedVariant: {
              id: variant.id || variant.unit,
              unit: variant.unit,
              price: variant.price,
              stockQty: variant.stockQty,
            },
            quantity,
          })
        );

        // Then sync with backend
        await dispatch(addToCartThunk(payload)).unwrap();
      } else {
        // For guest, just update local store
        dispatch(
          addItem({
            product,
            selectedVariant: {
              id: variant.id || variant.unit,
              unit: variant.unit,
              price: variant.price,
              stockQty: variant.stockQty,
            },
            quantity,
          })
        );
      }

      return { success: true, newQuantity };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, variant, quantity) => {
    if (quantity < 1) return;

    setLoading(true);
    try {
      if (isAuthenticated) {
        await dispatch(
          updateCartItemThunk({ id, selectedVariant: variant, quantity })
        ).unwrap();
      } else {
        dispatch(
          updateItemQuantity({
            id,
            variantId: variant.id || variant.unit,
            quantity,
          })
        );
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedUpdateQuantity = useCallback(
    debounce((id, variant, qty) => {
      if (qty >= 1) {
        updateQuantity(id, variant, qty);
      }
    }, 400),
    [dispatch, isAuthenticated]
  );

  const removeItem = async (id, variantUnitOrId) => {
    setLoading(true);
    try {
      if (isAuthenticated) {
        await dispatch(
          removeFromCartThunk({ id, variantId: variantUnitOrId })
        ).unwrap();
      } else {
        dispatch(removeLocalItem({ id, variantId: variantUnitOrId }));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    cartItems,
    addOrUpdateItem,
    updateQuantity,
    debouncedUpdateQuantity,
    removeItem,
  };
};
