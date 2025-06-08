// src/features/cart/cartThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserCart,
  addToCart,
  removeCartItem as removeFromCart,
  updateCartItem,
  clearCart as clearCartBackend,
} from '../../services/cartApi';

import {
  mergeCart,
  setCart,
  removeItem,
  clearCart,
  updateItemQuantity,
} from './cartSlice';

/**
 * 🔁 Sync local guest cart with backend on login
 */
export const syncCartOnLogin = createAsyncThunk(
  'cart/syncOnLogin',
  async (_, { dispatch, getState }) => {
    const { cart } = getState();
    const localItems = cart.items || [];

    try {
      const res = await getUserCart();
      const backendItems = res.data.cartItems || [];

      const promises = [];

      for (const item of localItems) {
        const productId = item.id;
        const variant = item.selectedVariant;
        const variantId = variant.id || variant.unit;

        const exists = backendItems.find(
          (i) =>
            (i.id || i.productId) === productId &&
            ((i.selectedVariant?.id || i.selectedVariant?.unit) === variantId)
        );

        if (!exists) {
          // Add to backend cart expects entire variant object here
          promises.push(
            addToCart({
              productId,
              selectedVariant: variant,
              quantity: item.quantity,
            })
          );
        }
      }

      await Promise.all(promises);
      const finalCart = await getUserCart();
      dispatch(setCart({ items: finalCart.data.cartItems }));
    } catch (err) {
      console.error('❌ Failed to sync cart on login:', err);
    }
  }
);

/**
 * 📥 Fetch cart from backend on refresh or token restore
 */
export const fetchBackendCart = createAsyncThunk(
  'cart/fetchBackendCart',
  async (_, { dispatch }) => {
    try {
      const response = await getUserCart();
      dispatch(setCart({ items: response.data.cartItems }));
    } catch (err) {
      console.error('❌ Fetch backend cart error:', err);
    }
  }
);

/**
 * ➕ Add item to backend + merge with Redux
 * Note: backend expects full selectedVariant object here
 */
export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async (item, { dispatch }) => {
    try {
      // Use productId from item (not id)
      const payload = {
        productId: item.productId,  // fix here!
        selectedVariant: item.selectedVariant,
        quantity: item.quantity,
      };

      const res = await addToCart(payload);
      dispatch(mergeCart({ items: res.data.cartItems }));
      return res.data;
    } catch (err) {
      console.error("❌ Add to cart failed:", err);
      throw err;
    }
  }
);


/**
 * ➖ Remove item from backend + Redux
 */
export const removeFromCartThunk = createAsyncThunk(
  'cart/removeFromCart',
  async (item, { dispatch }) => {
    try {
      const payload = {
        productId: item.id, // <- Rename from `item.productId`
        unit: item.variantId, // <- Because your controller uses `unit`
      };

      await removeFromCart(payload);
      dispatch(removeItem({ id: item.id, variantId: item.variantId }));
    } catch (err) {
      console.error('❌ Remove from cart failed:', err);
    }
  }
);


/**
 * 🔄 Update item quantity in backend + Redux
 * Note: backend expects productId, unit, quantity
 */
export const updateCartItemThunk = createAsyncThunk(
  'cart/updateCartItem',
  async (item, { dispatch }) => {
    try {
      const payload = {
        productId: item.id,
        unit: item.selectedVariant.unit,   // send only unit string here
        quantity: item.quantity,
      };

      await updateCartItem(payload);

      dispatch(updateItemQuantity({
        id: item.id,
        variantId: item.selectedVariant.id || item.selectedVariant.unit,
        quantity: item.quantity,
      }));
    } catch (err) {
      console.error('❌ Update cart item failed:', err);
      throw err;
    }
  }
);

/**
 * 🧹 Clear entire cart from backend + Redux
 */
export const clearCartThunk = createAsyncThunk(
  'cart/clearCart',
  async (_, { dispatch }) => {
    try {
      await clearCartBackend();
      dispatch(clearCart());
    } catch (err) {
      console.error('❌ Clear cart failed:', err);
    }
  }
);
